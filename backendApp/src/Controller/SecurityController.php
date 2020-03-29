<?php


namespace App\Controller;


use App\Entity\User;
use App\Service\GuestService;
use App\Service\UserService;
use App\Utils\Response\CustomResponse;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Exception\MissingMandatoryParametersException;

class SecurityController extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @Route("/login", name="user_login", methods={"POST"})
     * @param Request $request
     */
    public function login(Request $request) {

    }

    /**
     * @Route("/logout", methods={"POST"})
     */
    public function logout(){

    }

    /**
     * @Route("/loginGuest")
     * @param GuestService $guestService
     * @return RedirectResponse
     */
    public function loginGuest(GuestService $guestService){
        $user = $guestService->createGuest();
        $this->em->persist($user);
        $this->em->flush();
        return $this->redirectToRoute("user_login", ['request' => new Request([], ['username' => $user->getUsername(), 'password' => 'default'])], 307);

    }

    /**
     * @Route("/register", methods={"POST"})
     * @param Request $request
     * @param UserService $userService
     * @return JsonResponse
     */
    public function register(Request $request, UserService $userService){
        $response = new CustomResponse();

        try {
            $user = $userService->registerUser($request);
        }catch (MissingMandatoryParametersException $exception){
            $response->error=$exception->getMessage();
            return new JsonResponse($response);
        }

        try {
            $this->em->persist($user);
            $this->em->flush();
        }catch (UniqueConstraintViolationException $exception){
            $response->error = 'Użytkownik o takiej nazwie już istnieje';
            return new JsonResponse($response);
        }
        $response->data = true;
        return new JsonResponse($response);

    }

}