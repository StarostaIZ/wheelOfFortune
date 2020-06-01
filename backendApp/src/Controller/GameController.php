<?php


namespace App\Controller;

use App\Entity\Player;
use App\Entity\Room;
use App\Service\GameService;
use App\Service\PublisherService;
use App\Utils\Response\MyJsonResponse;
use App\Utils\Struct\PlayerResponseStruct;
use App\Utils\Struct\WordInGameResponseStruct;
use App\Utils\Struct\WordResponseStruct;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class GameController
 * @package App\Controller
 * @IsGranted("ROLE_USER")
 */
class GameController extends AbstractController
{

    /**
     * @var GameService
     */
    private $gameService;

    /**
     * @var PublisherService
     */
    private $publisherService;

    public function __construct(GameService $gameService, PublisherService $publisherService)
    {
        $this->gameService = $gameService;
        $this->publisherService = $publisherService;
    }

    private function getRoom($id): Room {
        /** @noinspection PhpIncompatibleReturnTypeInspection */
        return $this->getDoctrine()->getManager()->getRepository(Room::class)->find($id);
    }

    /**
     * @Route("/room/{id}/startGame")
     * @param Request $request
     * @param $id
     * @return MyJsonResponse
     */
    public function startGame(Request $request, $id){
        $content = json_decode($request->getContent());
        $game = $this->gameService->createGameAndStart($content->maxPoints);
        $em = $this->getDoctrine()->getManager();
        /** @var Room $room */
        $room = $em->getRepository(Room::class)->find($id);
        $room->setGame($game);
        $this->gameService->createPlayers($room);
        $em->flush();
        $response = $this->publisherService->startGame($room);
        return new MyJsonResponse($response);
    }

    /**
     * @Route("/room/{id}/spin")
     * @param Request $request
     * @param $id
     * @return MyJsonResponse
     */
    public function spinTheWheel(Request $request, $id){
        $content = json_decode($request->getContent());
        $angle = $content->angle;
        $room = $this->getRoom($id);
        $this->publisherService->updateWheel($room, $angle);
        return new MyJsonResponse(true);
    }

    /**
     * @Route("/room/{id}/letter")
     * @param Request $request
     * @param $id
     * @return MyJsonResponse
     */
    public function takeLetter(Request $request, $id){
        $content = json_decode($request->getContent());
        $letter = $content->letter;
        $room = $this->getRoom($id);
        $game = $room->getGame();
        $this->publisherService->updateLetter($room, $letter);
        $game->addLetter($letter);
        $this->getDoctrine()->getManager()->flush();
        return new MyJsonResponse(true);
    }

    /**
     * @Route("/room/{id}/points")
     * @param Request $request
     * @param $id
     * @return MyJsonResponse
     */
    public function updatePoints(Request $request, $id){
        $content = json_decode($request->getContent());
        $playerId = $content->playerId;
        $points = $content->points;
        /** @var Player $player */
        $player = $this->getDoctrine()->getManager()->getRepository(Player::class)->find($playerId);
        $player->setCurrentPoints($points);
        $this->getDoctrine()->getManager()->flush();
        $data = $this->publisherService->updatePoints($this->getRoom($id));
        return new MyJsonResponse($data);
    }

    /**
     * @Route("/room/{id}/guess")
     * @param Request $request
     * @param $id
     * @return MyJsonResponse
     */
    public function guessingWord(Request $request, $id){
        $content = json_decode($request->getContent());
        $room = $this->getRoom($id);
        $guessed = $content->guessed;
            $this->publisherService->isWordGuessed($room, $guessed);
        if ($guessed){
            $playerId = $content->playerId;
            $isEnd = $this->gameService->finalizeRound($room, $playerId);
            $this->publisherService->updatePoints($room);
            if (!$isEnd) {
                $word = $this->gameService->drawWord();
                $room->getGame()->setWord($word);
                $this->getDoctrine()->getManager()->flush();
                $this->publisherService->updateWord($room, WordResponseStruct::mapFromWord($word));
                return new MyJsonResponse(WordResponseStruct::mapFromWord($word));
            }

            return new MyJsonResponse(['end' => true]);
        }
        return new MyJsonResponse(true);
    }

    /**
     * @Route("/room/{id}/newWord")
     * @param $id
     * @return MyJsonResponse
     */
    public function newWord($id){
        $room = $this->getRoom($id);
        $word = $this->gameService->drawWord();
        $room->getGame()->setWord($word);
        $room->getGame()->setLetters([]);
        $this->getDoctrine()->getManager()->flush();
        $this->publisherService->updateWord($room, WordResponseStruct::mapFromWord($word));
        return new MyJsonResponse(WordResponseStruct::mapFromWord($word));
    }

    /**
     * @Route("/room/{id}/nextPlayer")
     * @param $id
     * @return MyJsonResponse
     */
    public function nextPlayer($id){
        $room = $this->getRoom($id);
        $nextPlayer = $this->gameService->nextPlayer($room);
        $this->getDoctrine()->getManager()->flush();
        $this->publisherService->updateTurn($room);
        return new MyJsonResponse(PlayerResponseStruct::mapFromPlayer($nextPlayer));
    }

    /**
     * @Route("/room/{id}/getWord")
     * @param $id
     * @return MyJsonResponse
     */
    public function getWord($id){
        $room = $this->getRoom($id);
        return new MyJsonResponse(WordInGameResponseStruct::mapFromWordGame($room->getGame()));
    }



}
