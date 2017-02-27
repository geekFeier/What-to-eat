<?php
namespace Medoo;
include_once "./PublicFood.php";

class SetFood extends PublicFood {

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
     * [addFood 添加食物]
     * @author mr.zhou <zhouwei9280@gmail.com>
     */
    public function addFood(){
        $foodName=  $this->foodName;
        $foodType = $this->foodType;
       $a =  $this->connect->insert('list',array('title'=>$foodName,'type'=>$foodType));
       if($a = 1){
           echo "添加成功";
       }else{
           echo "添加失败";
       }
    }
    
}

$food = new SetFood($_GET);
$food->addFood(); 