<?php


namespace App\Utils\Struct;


use App\Entity\Game;

class WordInGameResponseStruct
{

    public $word;

    public $category;

    public $letters;

    public static function mapFromWordGame(Game $game)
    {
        $struct = new WordInGameResponseStruct();
        $struct->category = $game->getWord()->getCategory()->getName();
        $struct->word = $game->getWord()->getWord();
        $struct->letters = $game->getLetters();
        return $struct;

    }
}
