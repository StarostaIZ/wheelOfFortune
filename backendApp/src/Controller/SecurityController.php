<?php


namespace App\Controller;


use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="user_login", methods={"POST"})
     * @param Request $request
     */
    public function login(Request $request) {

    }

    /**
     * @Route("/logout")
     */
    public function logout(){

    }

    /**
     * @Route("/loginGuest")
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function loginGuest(){
        $user = new User();
        $name = '';

        $em = $this->getDoctrine()->getManager();

        do{
            for ($i =0; $i<4; $i++){
                $name.=chr(rand(97,122));
            }
            $name.=rand(1,9).rand(1,9).rand(1,9);
            $tmp = $em->getRepository(User::class)->findOneBy(['username' => $name]);
        }while(!empty($tmp));
        $user->setUsername($name);
        $user->setPassword('default');
        $em->persist($user);
        $em->flush();
        return $this->redirectToRoute("user_login", ['request' => new Request([], ['username' => $name, 'password' => 'default'])], 307);

    }

}