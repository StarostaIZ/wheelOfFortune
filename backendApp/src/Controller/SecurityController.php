<?php


namespace App\Controller;


use App\Entity\User;
use App\Service\GuestService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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
     * @Route("/logout")
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

}