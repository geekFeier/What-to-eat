<?php
namespace Medoo;
include_once "./PublicFood.php";

class UpdateFood extends PublicFood { 

    private $foodName = ''; // 原食物名称
    private $foodNewName = ''; // 食物新名称
    private $foodType = ''; // 食物类型

    public function __construct()
    {
        Parent::__construct(); // 继承父类
        $this->setFoodName($_GET['name']);
        $this->setFoodNewName($_GET['newname']);
        $this->setFoodType($_GET['type']);
    }

    public function setFoodName($name){
        $this->foodName = $name; 
    }
    public function setFoodNewName($newname){ 
        $this->foodNewName = $newname;
    }

    public function setFoodType($type){
        $this->foodType = $type;
    }

    /**
     * [UpdateFood 修改食物]
     * @author YXY  
     */
    public function updateFood(){
       $foodName= $this->foodName;
       $foodNewName = $this->foodNewName;
       $foodType = $this->foodType; 
       $a = $this->connect->update('list',['title'=>$foodNewName],['title'=>$foodName,'type'=>$foodType]);
       if($a = 1){
           echo "修改成功";
       }else{
           echo "修改失败";
       }
    } 
}

$food = new UpdateFood($_GET);
$food->updateFood(); 