<?php

namespace App\Security;

use App\Entity\User;
use App\Utils\Response\MyJsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Guard\JWTTokenAuthenticator;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;
use Symfony\Component\Security\Guard\AuthenticatorInterface;
use Symfony\Component\Security\Guard\Token\GuardTokenInterface;

class UserAuthenticator extends AbstractGuardAuthenticator
{
    private $em;
    private $urlGenerator;
    private $passwordEncoder;
    private $security;

    private const LOGIN_ROUTE = "user_login";

    public function __construct(EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, UserPasswordEncoderInterface $passwordEncoder, Security $security)
    {
        $this->em = $em;
        $this->urlGenerator = $urlGenerator;
        $this->passwordEncoder = $passwordEncoder;
        $this->security = $security;
    }

    public function supports(Request $request)
    {
        if ($this->security->getUser()){
            return false;
        }
        return self::LOGIN_ROUTE === $request->attributes->get('_route')
            && $request->isMethod('POST');
    }

    public function getCredentials(Request $request)
    {
        return json_decode($request->getContent(), true);
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        if(null === $credentials || !isset($credentials['username']) || !isset($credentials['password'])){
            throw new CustomUserMessageAuthenticationException('Nie podano wymaganych danych');
        }

        $user = $this->em->getRepository(User::class)->findOneBy(['username' => $credentials['username']]);

        if(!$user){
            throw new CustomUserMessageAuthenticationException("Nie znaleziono loginu");
        }

        return $user;

    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        if(!$this->passwordEncoder->isPasswordValid($user, $credentials['password']))
            throw new CustomUserMessageAuthenticationException("Nieprawidłowe hasło");
        return true;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new JsonResponse($exception->getMessage());
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
//        $newToken = $this->jwtTokenGenerator->createAuthenticatedToken()
        return new JsonResponse(true);
    }

    public function start(Request $request, AuthenticationException $authException = null)
    {
        return new MyJsonResponse(null, 'Auth required', 401);
    }


    /**
     * @inheritDoc
     */
    public function supportsRememberMe()
    {
        return false;
    }
}
