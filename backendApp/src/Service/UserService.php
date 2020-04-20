<?php


namespace App\Service;


use App\Entity\FriendRequest;
use App\Entity\User;
use App\Utils\Struct\FriendRequestResponseStruct;
use App\Utils\Struct\FriendResponseStruct;
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
        $content = json_decode($request->getContent());
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
        $content = json_decode($request->getContent());
        $friendName = $content->friendName;
        $friend = $this->em->getRepository(User::class)->findOneBy(['username' => $friendName]);
        $friendRequest = new FriendRequest();
        /** @noinspection PhpParamsInspection */
        $friendRequest->setUser($this->security->getUser());
        /** @noinspection PhpParamsInspection */
        $friendRequest->setFriend($friend);
        $friendRequest->setDate(new \DateTime());
        return $friendRequest;


    }


    public function rejectFriendRequest(Request $request)
    {
        $content = json_decode($request->getContent());
        $friendRequestId = $content->friendRequestId;
        $friendRequest = $this->em->getRepository(FriendRequest::class)->find($friendRequestId);
        $this->em->remove($friendRequest);
    }

    public function getFriendList(){
        /** @var User $user */
        $user = $this->security->getUser();
        $friendList = $user->getMyFriends();
        $responseList = [];
        foreach ($friendList as $friend){
            $responseList[] = FriendResponseStruct::mapFromFriend($friend);
        }
        return $responseList;
    }

    public function getFriendRequestList(){
        /** @var User $user */
        $user = $this->security->getUser();
        $requests = $user->getFriendRequests();
        $responseList = [];
        foreach ($requests as $request){
            $responseList[] = FriendRequestResponseStruct::mapFromFriendRequest($request);
        }
        return $responseList;

    }


    private function getFriendFromRequest(Request $request): User{
        $content = json_decode($request->getContent());
        $friendId = $content->friendId;
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return $this->em->getRepository(User::class)->find($friendId);

    }

}