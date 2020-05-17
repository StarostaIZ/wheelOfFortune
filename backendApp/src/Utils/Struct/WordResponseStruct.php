<?php


namespace App\Utils\Struct;


use App\Entity\Word;

class WordResponseStruct
{
    public $wordId;

    public $word;

    public $category;

    public static function mapFromWord(Word $word)
    {
        $wordStruct = new WordResponseStruct();
        $wordStruct->wordId = $word->getId();
        $wordStruct->category = $word->getCategory()->getName();
        $wordStruct->word = mb_convert_case($word->getWord(), MB_CASE_UPPER, "UTF-8");
        return $wordStruct;
    }

}
