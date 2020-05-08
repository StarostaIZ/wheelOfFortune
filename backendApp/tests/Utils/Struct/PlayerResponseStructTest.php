<?php

namespace App\Tests\Utils\Struct;

use App\Entity\Player;
use App\Entity\User;
use App\Utils\Struct\PlayerResponseStruct;
use PHPUnit\Framework\TestCase;

class PlayerResponseStructTest extends TestCase
{

    public function testMapFromPlayer()
    {
        $player = new Player();
        $player->setUsername('Maciek');
        $player->setPoints(123);

        $user = new User();
        $player->setUser($user);
        $struct = PlayerResponseStruct::mapFromPlayer($player);
        $this->assertInstanceOf(PlayerResponseStruct::class, $struct);
        $this->assertEquals($player->getPoints(), $struct->points);
        $this->assertEquals($player->getUsername(), $struct->name);

    }
}
