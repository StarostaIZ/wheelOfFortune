<?php

namespace App\Tests\Utils\Struct;

use App\Entity\User;
use App\Utils\Struct\FriendResponseStruct;
use PHPUnit\Framework\TestCase;

class FriendResponseStructTest extends TestCase
{

    public function testMapFromFriend()
    {
        $user = new User();
        $user->setUsername('Maciek');

        $struct = FriendResponseStruct::mapFromFriend($user);
        $this->assertInstanceOf(FriendResponseStruct::class, $struct);
        $this->assertEquals($user->getUsername(), $struct->name);

    }
}
