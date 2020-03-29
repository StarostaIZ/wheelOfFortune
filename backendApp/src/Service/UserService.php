<?php


namespace App\Service;


use App\Entity\User;
use App\Utils\Struct\UserResponseStruct;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Exception\MissingMandatoryParametersException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Csrf\TokenStorage\TokenStorageInterface;

class UserService
{

    private $passwordEncoder;
    private $security;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder, Security $security)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->security= $security;
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
}