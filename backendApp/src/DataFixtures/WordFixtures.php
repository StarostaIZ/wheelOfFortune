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
        $word->setWord('Rzut oszczepem');
        $manager->persist($word);

        $word = new Word();
        $word->setCategory($category);
        $word->setWord('Skok w dal');
        $manager->persist($word);

        $word = new Word();
        $word->setCategory($category);
        $word->setWord('Wyścigi konne');
        $manager->persist($word);

        $word = new Word();
        $word->setCategory($category);
        $word->setWord('Igrzyska olimpijskie');
        $manager->persist($word);

        $manager->flush();

    }
}