<?php


namespace App\Controller;


use App\Entity\FriendRequest;
use App\Entity\User;
use App\Service\UserService;
use App\Utils\Response\MyJsonResponse;
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
     * @Route("/admin")
     */
    public function admin(){
        return new JsonResponse("It's ok");
    }

    /**
     * @Route("/getUser", methods={"GET"})
     */
    public function getCurrentUser(){
        return new MyJsonResponse($this->userService->getCurrentUserData());
    }

    /**
     * @Route("/updateUser", methods={"PUT"})
     * @param Request $request
     * @return JsonResponse
     */
    public function updateUser(Request $request){
        $this->userService->updateCurrentUser($request);
        $this->getDoctrine()->getManager()->flush();
        return new MyJsonResponse(true);
    }

    /**
     * @Route("/acceptFriendRequest", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function acceptFriendRequest(Request $request){
        $this->userService->addFriendToCurrentUser($request);
        $this->getDoctrine()->getManager()->flush();
        return new MyJsonResponse(true);

    }

    /**
     * @Route("/removeFriend", methods={"POST"})
     * @param Request $request
     * @return JsonResponse
     */
    public function removeFriend(Request $request){
        $this->userService->removeFriendFromCurrentUser($request);
        $this->getDoctrine()->getManager()->flush();
        return new JsonResponse(true);
    }

    /**
     * @Route("/sendFriendRequest", methods={"POST"})
     * @param Request $request
     * @return MyJsonResponse
     */
    public function sendFriendRequest(Request $request){
        $friendRequest = $this->userService->createFriendRequest($request);
        $em = $this->getDoctrine()->getManager();
        $em->persist($friendRequest);
        $em->flush();
        return new MyJsonResponse(true);
    }

    /**
     * @Route("/rejectFriendRequest", methods={"POST"})
     * @param Request $request
     * @return MyJsonResponse
     */
    public function rejectFriendRequest(Request $request){
        $this->userService->rejectFriendRequest($request);
        $this->getDoctrine()->getManager()->flush();
        return new MyJsonResponse(true);
    }




}