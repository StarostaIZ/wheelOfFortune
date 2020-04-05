<?php


namespace App\Utils\Struct;


use Symfony\Component\Security\Core\User\UserInterface;

class GuestResponseStruct
{

    public $id;

    public $username;

    public static function mapFromUser(UserInterface $user)
    {
        $response = new GuestResponseStruct();
        $response->username = $user->getUsername();
        $response->id = $user->getId();
        return $response;
    }
}