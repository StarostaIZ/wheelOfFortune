<?php


namespace App\Service;


use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Mercure\Update;

class PublisherService
{
    private $publisher;

    public function __construct(PublisherInterface $publisher)
    {
        $this->publisher = $publisher;
    }

    private function publish($topic, Request $request){
        $publisher = $this->publisher;
        $publisher(new Update($topic, $request->getContent()));

    }


}