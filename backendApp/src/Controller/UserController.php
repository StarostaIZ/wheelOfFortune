<?php


namespace App\Controller;


use App\Service\UserService;
use App\Utils\Response\CustomResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

/**
 * Class UserController
 * @package App\Controller
 * @IsGranted("ROLE_USER")
 */
class UserController extends AbstractController
{

    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @Route("/getUser", methods={"GET"})
     */
    public function getCurrentUser(){
        $response = new CustomResponse();
        $response->data = $this->userService->getCurrentUserData();
        return new JsonResponse($response);
    }

    /**
     * @Route("/updateUser", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    public function updateUser(Request $request){
        $response = new CustomResponse();
        $this->userService->updateCurrentUser($request);
        $this->getDoctrine()->getManager()->flush();
        $response->data = true;
        return new JsonResponse($response);
    }



}