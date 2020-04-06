<?php


namespace App\DataFixtures;


use App\Entity\Category;
use App\Entity\Word;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class WordFixtures extends Fixture
{

    public function load(ObjectManager $manager)
    {
        $category = new Category();
        $category->setName('Sport');
        $manager->persist($category);

        $word = new Word();
        $word->setCategory($category);
        $word->setWord('RZUT OSZCZEPEM');
        $manager->persist($word);

        $word = new Word();
        $word->setCategory($category);
        $word->setWord('SKOK W DAL');
        $manager->persist($word);

        $word = new Word();
        $word->setCategory($category);
        $word->setWord('WYŚCIGI KONNE');
        $manager->persist($word);

        $word = new Word();
        $word->setCategory($category);
        $word->setWord('IGRZYSKA OLIMPIJSKIE');
        $manager->persist($word);

        $category = new Category();
        $category->setName("Geografia");
        $manager->persist($category);

        $word = new Word();
        $word->setCategory($category);
        $word->setWord('PAPUA NOWA GWINEA');
        $manager->persist($word);

        $word = new Word();
        $word->setCategory($category);
        $word->setWord('ZWROTNIK KOZIOROŻCA');
        $manager->persist($word);

        $word = new Word();
        $word->setCategory($category);
        $word->setWord('SRI DŹIAJAWARDANAPURA KOTTE');
        $manager->persist($word);

        $word = new Word();
        $word->setCategory($category);
        $word->setWord('KILIMANDŻARO');
        $manager->persist($word);




        $manager->flush();

    }
}