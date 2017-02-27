<?php
namespace Medoo;
include_once "./PublicFood.php";

class DeleteFood extends PublicFood {

    private $foodName = ''; // 食物名称
    private $foodType = ''; // 食物类型

    public function __construct()
    {
        Parent::__construct(); // 继承父类
        $this->setFoodName($_GET['name']);
        $this->setFoodType($_GET['type']);
    }

    public function setFoodName($name){
        $this->foodName = $name;
    }

    public function setFoodType($type){
        $this->foodType = $type;
    }

   /**
      * [deleteFood 删除食物]
      * @author yxy <zhouwei9280@gmail.com>
      */
     public function deleteFood(){
         $foodName=  $this->foodName;
         $foodType = $this->foodType;
        $a =  $this->connect->delete('list',array('title'=>$foodName,'type'=>$foodType));
        if($a = 1){
            echo "删除成功";
        }else{
            echo "删除失败";
        }
     }
}

$food = new DeleteFood($_GET);
$food->deleteFood();