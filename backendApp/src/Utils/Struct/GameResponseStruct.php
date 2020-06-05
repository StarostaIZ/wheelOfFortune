<?php


namespace App\Utils\Struct;


use App\Entity\Game;

class GameResponseStruct
{
    /** @var PlayerResponseStruct[] */
    public $players = [];

    /** @var WordResponseStruct */
    public $word = null;

    public $letters = [];

    public $angle = 0;

    public $turn;

    public $maxPoints;

    public static function mapFromGame(Game $game)
    {
        $struct = new GameResponseStruct();
        $struct->angle = $game->getAngle();
        $struct->letters = $game->getLetters();
        $struct->word = WordResponseStruct::mapFromWord($game->getWord());
        foreach ($game->getPlayers() as $player){
            $struct->players[] = PlayerResponseStruct::mapFromPlayer($player);
        }
        $struct->turn = PlayerResponseStruct::mapFromPlayer($game->getTurn());
        $struct->maxPoints = $game->getMaxPoints();
        return $struct;
    }



}
