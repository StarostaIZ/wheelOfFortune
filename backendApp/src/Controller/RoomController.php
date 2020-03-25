<?php


namespace App\Controller;


use App\Service\RoomService;
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

    public function __construct(RoomService $roomService)
    {
        $this->roomService = $roomService;
    }

    /**
     * @Route("/roomList")
     */
    public function roomList(){
        return new JsonResponse($this->roomService->getRoomList());
    }

}