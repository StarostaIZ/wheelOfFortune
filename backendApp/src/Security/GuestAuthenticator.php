<?php

namespace App\Security;

use App\Entity\User;
use App\Service\GuestService;
use App\Utils\Response\CustomResponse;
use App\Utils\Struct\GuestResponseStruct;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\AbstractGuardAuthenticator;

class GuestAuthenticator extends AbstractGuardAuthenticator
{
    private $em;
    private $urlGenerator;
    private $passwordEncoder;
    private $guestService;

    private const LOGIN_ROUTE = "guest_login";

    public function __construct(EntityManagerInterface $em, UrlGeneratorInterface $urlGenerator, UserPasswordEncoderInterface $passwordEncoder, GuestService $guestService)
    {
        $this->em = $em;
        $this->urlGenerator = $urlGenerator;
        $this->passwordEncoder = $passwordEncoder;
        $this->guestService = $guestService;
    }

    public function supports(Request $request)
    {
        return self::LOGIN_ROUTE === $request->attributes->get('_route')
            && $request->isMethod('POST');
    }

    public function getCredentials(Request $request)
    {
        return [];
    }

    public function getUser($credentials, UserProviderInterface $userProvider)
    {

        $user = $this->guestService->createGuest();
        $this->em->persist($user);
        $this->em->flush();
        return $user;

    }

    public function checkCredentials($credentials, UserInterface $user)
    {
        return true;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new JsonResponse($exception->getMessage());
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        $response = new CustomResponse();
        /** @var UserInterface $user */
        $user = $token->getUser();
        $response->data = GuestResponseStruct::mapFromUser($user);
        return new JsonResponse($response);
    }

    public function start(Request $request, AuthenticationException $authException = null)
    {
        $response = new CustomResponse();
        $response->error = 'Auth required';
        return new JsonResponse($response, 401);
    }


    /**
     * @inheritDoc
     */
    public function supportsRememberMe()
    {
        return false;
    }
}
