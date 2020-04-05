<?php


namespace App\Service;


use App\Entity\Game;
use App\Entity\User;
use App\Entity\Word;
use App\Utils\Struct\WordResponseStruct;
use Doctrine\ORM\EntityManagerInterface;

class GameService
{

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;

    }

    public function createGame(User $user){
        $game = new Game();
        $game->setPlayer1($user)
            ->setPlayer1points(0)
            ->setIsRunning(false);

        return $game;

    }

    public function startGame(Game $game){
        $game->setIsRunning(true);
        return $this->drawWord();

    }

    public function drawWord(): WordResponseStruct{
        $words = $this->em->getRepository(Word::class)->findAll();
        $rand = rand(0, count($words)-1);
        return WordResponseStruct::mapFromWord($words[$rand]);
    }

}