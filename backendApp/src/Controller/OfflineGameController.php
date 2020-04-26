<?php


namespace App\Controller;


use App\Service\GameService;
use App\Utils\Response\MyJsonResponse;
use App\Utils\Struct\WordResponseStruct;
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

        return new MyJsonResponse(WordResponseStruct::mapFromWord($this->gameService->drawWord()));
    }

}