<?php


namespace App\Service;


use App\Entity\FriendRequest;
use App\Entity\User;
use App\Utils\Struct\UserResponseStruct;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Exception\MissingMandatoryParametersException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;

class UserService
{

    private $passwordEncoder;
    private $security;
    private $em;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder, Security $security, EntityManagerInterface $em)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->security= $security;
        $this->em = $em;
    }

    public function registerUser(Request $request){
        $user = new User();
        $content = json_decode($request->getContent(), true);

        if (!isset($content['username']) || !isset($content['email']) || !isset($content['password'])){
            throw new MissingMandatoryParametersException('Nie zostały podane wszystkie parametry');
        }
        $user->setUsername($content['username'])
            ->setEmail($content['email'])
            ->setPassword($this->passwordEncoder->encodePassword($user, $content['password']))
            ->addRole(User::ROLE_USER);
        return $user;
    }

    /**
     * @return UserResponseStruct
     */
    public function getCurrentUserData(){
        /** @var User $user */
        $user = $this->security->getUser();
        return UserResponseStruct::mapFromUser($user);
    }

    /**
     * @param Request $request
     */
    public function updateCurrentUser(Request $request){
        /** @var User $user */
        $user = $this->security->getUser();
        $content = json_decode($request->getContent(), true);
        if(isset($content['email'])){
            $user->setEmail($content['email']);
        }
        if (isset($content['password'])){
            $user->setPassword($this->passwordEncoder->encodePassword($user, $content['password']));
        }
    }

    public function addFriendToCurrentUser(Request $request){
        $content = json_decode($request->getContent(), true);
        $friendRequestId = $content->friendRequestId;
        $friendRequest = $this->em->getRepository(FriendRequest::class)->find($friendRequestId);
        $friend = $friendRequest->getFriend();
        $this->em->remove($friendRequest);
        /** @var User $user */
        $user = $this->security->getUser();
        $user->addMyFriend($friend);
        $friend->addMyFriend($user);
    }

    public function removeFriendFromCurrentUser(Request $request){
        $friend = $this->getFriendFromRequest($request);
        /** @var User $user */
        $user = $this->security->getUser();
        $user->removeMyFriend($friend);
        $friend->removeMyFriend($user);
    }

    public function createFriendRequest(Request $request)
    {
        $friend = $this->getFriendFromRequest($request);
        $friendRequest = new FriendRequest();
        /** @noinspection PhpParamsInspection */
        $friendRequest->setUser($this->security->getUser());
        $friendRequest->setFriend($friend);
        $friendRequest->setDate(new \DateTime());
        return $friendRequest;


    }


    public function rejectFriendRequest(Request $request)
    {
        $content = json_decode($request->getContent(), true);
        $friendRequestId = $content->friendRequestId;
        $friendRequest = $this->em->getRepository(FriendRequest::class)->find($friendRequestId);
        $friend = $friendRequest->getFriend();
        $this->em->remove($friendRequest);
    }


    private function getFriendFromRequest(Request $request): User{
        $content = json_decode($request->getContent(), true);
        $friendId = $content->friendId;
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return $this->em->getRepository(User::class)->find($friendId);

    }
}