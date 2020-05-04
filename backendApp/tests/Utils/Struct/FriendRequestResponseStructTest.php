<?php

namespace App\Tests\Utils\Struct;

use App\Entity\FriendRequest;
use App\Entity\User;
use App\Utils\Struct\FriendRequestResponseStruct;
use PHPUnit\Framework\TestCase;

class FriendRequestResponseStructTest extends TestCase
{

    public function testMapFromFriendRequest()
    {
        $friendRequest = new FriendRequest();
        $user1 = new User();
        $user1->setUsername('Maciek');
        $user2 = new User();
        $user2->setUsername('Michał');
        $friendRequest->setUser($user1);
        $friendRequest->setFriend($user2);
        $struct = FriendRequestResponseStruct::mapFromFriendRequest($friendRequest);
        $this->assertInstanceOf(FriendRequestResponseStruct::class, $struct);
        $this->assertEquals($user1->getUsername(), $struct->senderName);

    }
}
