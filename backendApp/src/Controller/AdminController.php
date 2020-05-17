<?php


namespace App\Controller;


use App\Entity\Category;
use App\Entity\Room;
use App\Entity\User;
use App\Entity\Word;
use App\Utils\Response\MyJsonResponse;
use App\Utils\Struct\CategoryResponseStruct;
use App\Utils\Struct\RoomResponseStruct;
use App\Utils\Struct\UserResponseStruct;
use App\Utils\Struct\WordResponseStruct;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AdminController
 * @package App\Controller
 * @IsGranted("ROLE_ADMIN")
 */
class AdminController extends AbstractController
{

    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @Route("/admin/words")
     */
    public function listWords(){
        /** @var Word[] $words */
        $words = $this->em->getRepository(Word::class)->findAll();
        $responseList = [];
        foreach ($words as $word){
            $responseList['words'][] = WordResponseStruct::mapFromWord($word);
        }
        return new MyJsonResponse($responseList);
    }

    /**
     * @Route("/admin/users")
     * @return MyJsonResponse
     */
    public function listUsers(){
        /** @var User[] $users */
        $users = $this->em->getRepository(User::class)->findAll();
        $responseList = [];
        foreach ($users as $user){
            $responseList['users'][] = UserResponseStruct::mapFromUser($user);
        }
        return new MyJsonResponse($responseList);

    }

    /**
     * @Route("/admin/categories")
     */
    public function listCategories(){
        /** @var Category[] $categories */
        $categories = $this->em->getRepository(Category::class)->findAll();
        $responseList = [];
        foreach ($categories as $category){
            $responseList['categories'][] = CategoryResponseStruct::mapFromCategory($category);
        }
        return new MyJsonResponse($responseList);
    }

    /**
     * @Route("/admin/rooms")
     * @return MyJsonResponse
     */
    public function listRooms(){
        /** @var Room[] $rooms */
        $rooms = $this->em->getRepository(Room::class)->findAll();
        $responseList = [];
        foreach ($rooms as $room){
            $responseList['rooms'][] = RoomResponseStruct::mapFromRoom($room);
        }
        return new MyJsonResponse($responseList);
    }

    /**
     * @Route("/admin/addWord")
     * @param Request $request
     * @return MyJsonResponse
     */
    public function addWord(Request $request){
        $content = json_decode($request->getContent());
        $word = new Word();
        try {
            $word->setWord($content->word);
        }catch (UniqueConstraintViolationException $exception){
            return new MyJsonResponse(null, "Takie hasło już istnieje");
        }

        /** @noinspection PhpParamsInspection */
        $word->setCategory($this->em->getRepository(Category::class)->find($content->categoryId));
        $this->em->persist($word);
        $this->em->flush();
        return new MyJsonResponse(true);

    }

    /**
     * @Route("/admin/addCategory")
     * @param Request $request
     * @return MyJsonResponse
     */
    public function addCategory(Request $request){
        $content = json_decode($request->getContent());
        $category = new Category();
        try {
            $category->setName($content->name);
        }catch (UniqueConstraintViolationException $exception){
            return new MyJsonResponse(null, "Taka categoria już istnieje");
        }

        $this->em->persist($category);
        $this->em->flush();
        return new MyJsonResponse(true);
    }

    /**
     * @Route("/admin/removeUser/{id}")
     * @param $id
     * @return MyJsonResponse
     */
    public function removeUser($id){
        $user = $this->em->getRepository(User::class)->find($id);
        $this->em->remove($user);
        $this->em->flush();
        return new MyJsonResponse(true);
    }

    /**
     * @Route("/admin/removeRoom/{id}")
     * @param $id
     * @return MyJsonResponse
     */
    public function removeRoom($id){
        $room = $this->em->getRepository(Room::class)->find($id);
        $this->em->remove($room);
        $this->em->flush();
        return new MyJsonResponse(true);
    }

    /**
     * @Route("/admin/removeWord/{id}")
     * @param $id
     * @return MyJsonResponse
     */
    public function removeWord($id){
        $word = $this->em->getRepository(Word::class)->find($id);
        $this->em->remove($word);
        $this->em->flush();
        return new MyJsonResponse(true);
    }

    /**
     * @Route("/admin/removeCategory/{id}")
     * @param $id
     * @return MyJsonResponse
     */
    public function removeCategory($id){
        $category = $this->em->getRepository(Category::class)->find($id);
        $this->em->remove($category);
        $this->em->flush();
        return new MyJsonResponse(true);
    }


}
