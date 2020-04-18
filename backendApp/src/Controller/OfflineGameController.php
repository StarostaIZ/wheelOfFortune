<?php


namespace App\Controller;


use App\Service\GameService;
use App\Utils\Response\MyJsonResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class OfflineGameController
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
     * @Route("/drawWord", methods={"GET"})
     */
    public function drawWord(){
        return new MyJsonResponse($this->gameService->drawWord());
    }

}