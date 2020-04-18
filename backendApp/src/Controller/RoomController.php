<?php


namespace App\Controller;


use App\Entity\Room;
use App\Entity\User;
use App\Service\RoomService;
use App\Utils\Response\MyJsonResponse;
use App\Utils\Struct\RoomResponseStruct;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class RoomController
 * @package App\Controller
 * @IsGranted("ROLE_USER")
 */
class RoomController extends AbstractController
{
    /** @var RoomService $roomService */
    private $roomService;

    private $em;

    public function __construct(RoomService $roomService, EntityManagerInterface $em)
    {
        $this->roomService = $roomService;
        $this->em = $em;
    }

    /**
     * @Route("/roomList")
     */
    public function roomList(){
        return new MyJsonResponse($this->roomService->getRoomList());
    }

    /**
     * @Route("/createRoom")
     * @param Request $request
     * @return MyJsonResponse
     */
    public function createRoom(Request $request){

        $room = $this->roomService->createRoom($request);
        $em = $this->getDoctrine()->getManager();
        $em->persist($room);
        $em->flush();
        return new MyJsonResponse(RoomResponseStruct::mapFromRoom($room));
    }

    /**
     * @Route("/enterRoom")
     * @param Request $request
     * @return MyJsonResponse
     */
    public function enterRoom(Request $request)
    {
        $this->roomService->enterRoom($request);
        return new MyJsonResponse(true);
    }

    /**
     * @Route("/room/{id}")
     * @param $id
     * @return MyJsonResponse
     */
    public function getRoomData($id){
        /** @var Room $room */
        $room = $this->getDoctrine()->getManager()->getRepository(Room::class)->find($id);
        return new MyJsonResponse(RoomResponseStruct::mapFromRoom($room));
    }

    /**
     * @Route("/exitRoom")
     * @return MyJsonResponse
     */
    public function exitRoom(){
        $this->roomService->exitRoom();
        return new MyJsonResponse(true);
    }








}