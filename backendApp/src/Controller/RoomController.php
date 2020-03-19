<?php


namespace App\Controller;


use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * Class RoomController
 * @package App\Controller
 * @IsGranted("ROLE_GUEST")
 */
class RoomController extends AbstractController
{
    public function roomList(){

    }

}