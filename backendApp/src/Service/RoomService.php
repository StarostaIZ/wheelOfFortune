<?php


namespace App\Service;


use App\Entity\Room;
use App\Entity\User;
use App\Utils\Struct\RoomResponseStruct;
use App\Utils\Struct\UserResponseStruct;
use Doctrine\ORM\EntityManagerInterface;

class RoomService
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public function createRoom(User $user, $maxPeople, $roomName = null, $password = null): Room {
        $room = new Room();
        $room->setAdmin($user);
        $room->setPassword($password);
        $room->setName($roomName);
        $room->setMaxPeople($maxPeople);
        return $room;
    }

    public function enterRoom(User $user, Room $room): bool {
        if(count($room->getUsersInRoom())<$room->getMaxPeople()){
            $room->addUsersInRoom($user);
        }else{
            return false;
        }
        return true;
    }

    public function exitRoom(User $user){
        $room = $user->getRoom();
        $room->removeUsersInRoom($user);
        $user->setRoom(null);
    }

    public function getUsersInRoom(Room $room){
        $usersData['users'] = [];
        foreach ($room->getUsersInRoom() as $user) {
            $usersData['users'][] = UserResponseStruct::mapFromUser($user);
        }
        return $usersData;
    }

    public function getRoomList(){
        $roomList['rooms'] = [];
        foreach ($this->em->getRepository(Room::class)->findAll() as $room){
            $roomList['rooms'] = RoomResponseStruct::mapFromRoom($room);
        }
        return $roomList;
    }

}