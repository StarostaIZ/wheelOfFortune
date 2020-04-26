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

    public function createGameAndStart($maxPoints){
        $game = new Game();
        $game
            ->setIsRunning(true)
            ->setMaxPoints($maxPoints)
            ->setWord($this->drawWord());

        return $game;

    }

    public function drawWord(): Word
    {
        /** @var Word[] $words */
        $words = $this->em->getRepository(Word::class)->findAll();
        $rand = rand(0, count($words)-1);
        return $words[$rand];
    }

}