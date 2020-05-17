<?php


namespace App\Utils\Struct;


use App\Entity\Category;

class CategoryResponseStruct
{
    public $categoryId;

    public $categoryName;

    public static function mapFromCategory(Category $category)
    {
        $struct = new CategoryResponseStruct();
        $struct->categoryId = $category->getId();
        $struct->categoryName = $category->getName();
        return $struct;
    }

}
