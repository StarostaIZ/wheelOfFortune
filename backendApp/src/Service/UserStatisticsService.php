<?php


namespace App\Service;


use App\Entity\User;
use App\Utils\Struct\Statistic\LastGamesStruct;
use App\Utils\Struct\Statistic\StatsStruct;
use Doctrine\ORM\EntityManagerInterface;

class UserStatisticsService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function getStats(User $user){

        $struct = new StatsStruct();
        $struct->lastGames = $this->getLastThreeDaysGames($user);
        $struct->totalGamesCount = $this->getTotalGamesCount($user);
        $struct->totalGuessedWords = $this->getTotalGuessedWords($user);
        $struct->totalPointsCount = $this->getTotalPointsCount($user);
        $struct->totalWonGames = $this->getTotalWonGames($user);
        return $struct;
    }

    private function getLastThreeDaysGames(User $user): LastGamesStruct{
        $gamesPlayed = $user->getGamesPlayed();
        $struct = new LastGamesStruct();
        $today = new \DateTime();
        $today->setTime( 0, 0, 0 );
        foreach ($gamesPlayed as $player){
            /** @var \DateTime $matchDate */
            $matchDate = $player->getCreationDate();
            $matchDate->setTime(0, 0, 0);
            $diff = $today->diff( $matchDate );
            $diffDays = (integer)$diff->format( "%R%a" );
            switch ($diffDays){
                case 0: $struct->today++;break;
                case -1: $struct->yesterday++;break;
                case -2: $struct->twoDaysAgo++;break;
            }
        }
        return $struct;
    }

    private function getTotalGamesCount(User $user)
    {
        $gamesPlayer = $user->getGamesPlayed();
        return count($gamesPlayer);
    }

    private function getTotalGuessedWords(User $user)
    {
        $gamesPlayed = $user->getGamesPlayed();
        $wordsGuessed = 0;
        foreach ($gamesPlayed as $player) {
            $wordsGuessed+=$player->getGuessedWords();
        }
        return $wordsGuessed;
    }

    private function getTotalPointsCount(User $user)
    {
        $gamesPlayed = $user->getGamesPlayed();
        $totalPoints = 0;
        foreach ($gamesPlayed as $player) {
            $totalPoints+=$player->getPoints();
        }
        return $totalPoints;
    }

    private function getTotalWonGames(User $user)
    {
        $gamesPlayed = $user->getGamesPlayed();
        $wonGames = 0;
        foreach ($gamesPlayed as $player) {
            if ($player->getIsWinner()){
                $wonGames++;
            }
        }
        return $wonGames;
    }


}