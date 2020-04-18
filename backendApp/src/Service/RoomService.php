<?php


namespace App\Service;


use App\Entity\Room;
use App\Entity\User;
use App\Utils\Struct\RoomResponseStruct;
use App\Utils\Struct\UserResponseStruct;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;

class RoomService
{
    private $em;
    private $security;

    public function __construct(EntityManagerInterface $em, Security $security)
    {
        $this->em = $em;
        $this->security = $security;
    }

    public function createRoom(Request $request): Room {
        $content = json_decode($request->getContent(), true);
        $room = new Room();
        /** @var User $user */
        $user = $this->security->getUser();
        $room->setAdmin($user);
        $room->setPassword($content['password']);
        $room->setName($content['name']);
        $room->setMaxPeople($content['maxPeople']);
        return $room;
    }

    public function enterRoom(Request $request): bool {
        $content = json_decode($request->getContent(), true);

        $room = $this->em->getRepository(Room::class)->find($content['roomId']);
        /** @var User $user */
        $user = $this->security->getUser();
        if(count($room->getUsersInRoom())<$room->getMaxPeople()){
            $room->addUsersInRoom($user);
        }else{
            return false;
        }
        return true;
    }

    public function exitRoom(){
        /** @var User $user */
        $user = $this->security->getUser();
        $room = $user->getRoom();
        $room->removeUsersInRoom($user);
        $user->setRoom(null);
    }

    public function getUsersInRoom(Request $request){
        $content = json_decode($request->getContent(), true);
        $room = $this->em->getRepository(Room::class)->find($content['roomId']);
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