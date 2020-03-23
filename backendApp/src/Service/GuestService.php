<?php


namespace App\Service;


use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

class GuestService
{
    private $em;
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;

    }

    public function createGuest(): User{
        $user = new User();
        $name = '';

        do{
            for ($i =0; $i<4; $i++){
                $name.=chr(rand(97,122));
            }
            $name.=rand(1,9).rand(1,9).rand(1,9);
            $tmp = $this->em->getRepository(User::class)->findOneBy(['username' => $name]);
        }while(!empty($tmp));
        $user->setUsername($name);
        $user->setPassword('default');
        $this->em->persist($user);
        $this->em->flush();
        return $user;
    }

}