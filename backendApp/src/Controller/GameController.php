<?php


namespace App\Controller;

use App\Service\GameService;
use App\Utils\Response\MyJsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class GameController
 * @package App\Controller
 * @IsGranted("ROLE_USER")
 */
class GameController
{

    /**
     * @var GameService
     */
    private $gameService;

    public function __construct(GameService $gameService)
    {
        $this->gameService = $gameService;
    }

    /**
     * @Route("/startGame/{id}")
     * @param $id
     */
    public function startGame($id){
        //$this->gameService->createGame();
    }



}