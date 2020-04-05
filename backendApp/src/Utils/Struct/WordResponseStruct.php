<?php


namespace App\Utils\Struct;


use App\Entity\Word;

class WordResponseStruct
{
    public $word;

    public $category;

    public static function mapFromWord(Word $word)
    {
        $wordStruct = new WordResponseStruct();
        $wordStruct->category = $word->getCategory()->getName();
        $wordStruct->word = $word->getWord();
        return $wordStruct;
    }

}