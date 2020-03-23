<?php


namespace App\Service;


use App\Entity\Room;
use App\Entity\User;
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
            $user_array['username'] = $user->getUsername();
            $user_array['id'] = $user->getId();
            $usersData[] = $user_array;
        }
        return $usersData;
    }

    public function getRoomList(){
        $roomList['rooms'] = [];
        foreach ($this->em->getRepository(Room::class)->findAll() as $room){
            $singleRoom['id'] = $room->getId();
            $singleRoom['name'] = $room->getName();
            $singleRoom['maxPeople'] = $room->getMaxPeople();
            $singleRoom['peopleInRoom'] = count($room->getUsersInRoom());
            $roomList[] = $room;
        }
        return $roomList;
    }

}