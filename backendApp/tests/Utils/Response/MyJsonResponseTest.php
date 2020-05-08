<?php

namespace App\Tests\Utils\Response;

use App\Utils\Response\MyJsonResponse;
use App\Utils\Struct\CustomResponseStruct;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\JsonResponse;

class MyJsonResponseTest extends TestCase
{
    public function testConstruct(){
        $response = new MyJsonResponse('Data', 'error', 401);
        $this->assertInstanceOf(MyJsonResponse::class, $response);
        $this->assertInstanceOf(JsonResponse::class, $response);
        $struct = new CustomResponseStruct();
        $struct->data = 'Data';
        $struct->error = 'error';
        $this->assertEquals(json_encode($struct), $response->getContent());
        $this->assertEquals(401, $response->getStatusCode());
    }

}
