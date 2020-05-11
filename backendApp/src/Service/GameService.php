<?php


namespace App\Service;


use App\Entity\Game;
use App\Entity\Player;
use App\Entity\Room;
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

        $this->em->persist($game);
        return $game;

    }

    public function createPlayers(Room $room){
        foreach ($room->getUsersInRoom() as $user){
            $player = new Player();
            $player->setPoints(0)
                ->setUser($user)
                ->setUsername($user->getUsername());
            $this->em->persist($player);
            $room->getGame()->addPlayer($player);
        }
        $this->em->flush();
        $room->getGame()->getPlayers()[0]->setIsNow(true);
    }

    public function drawWord(): Word
    {
        /** @var Word[] $words */
        $words = $this->em->getRepository(Word::class)->findAll();
        $rand = rand(0, count($words)-1);
        return $words[$rand];
    }

    public function nextPlayer(Room $room){
        $players = $room->getGame()->getPlayers();
        for ($i = 0; $i<count($players); $i++){
            if ($players[$i]->getIsNow()){
                $players[$i]->setIsNow(false);
                if ($i==count($players)-1){
                    $players[0]->setIsNow(true);
                    return $players[0];
                }
                else{
                    $players[$i+1]->setIsNow(true);
                    return $players[$i+1];
                }
            }

        }
        return null;
    }

    public function finalizeRound(Room $room, $playerId){
        /** @var Player $player */
        $player = $this->em->getRepository(Player::class)->find($playerId);
        $player->addPointsAfterWin();
        $player->incrementGuessedWords();
        foreach ($room->getGame()->getPlayers() as $playerInRoom){
            $playerInRoom->setCurrentPoints(0);
        }
        $this->em->flush();
        if ($player->getPoints()>=$room->getGame()->getMaxPoints()){
            $player->setIsWinner(true);
            $room->getGame()->setIsRunning(false);
            $this->em->flush();
            return true;
        }

        return false;
    }
}
