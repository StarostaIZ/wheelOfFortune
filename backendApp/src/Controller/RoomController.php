<?php


namespace App\Controller;


use App\Entity\User;
use App\Service\RoomService;
use App\Utils\Response\CustomResponse;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class RoomController
 * @package App\Controller
 * @IsGranted("ROLE_GUEST")
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
        return new JsonResponse($this->roomService->getRoomList());
    }

    /**
     * @Route("/createRoomOffline")
     */
    public function createRoomOffline(){
        $response = new CustomResponse();
        /** @var User $user */
        $user = $this->getUser();
        $room = $this->roomService->createRoom($user, 1);
        $room->setIsOffline(true);
        $this->em->persist($room);
        $this->em->flush();
        $response->data = $room->getId();
        return new JsonResponse($response);

    }

}