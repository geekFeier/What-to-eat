<?php
namespace Medoo;
include "./PublicFood.php";
class GetFood extends PublicFood {
    // param
    private $food  = array();

    /**
     * [getList get food list]
     * @author mr.zhou <zhouwei9280@gmail.com>
     */
    public function getList()
    {
        $list  =  $this->connect->select("list",array('title','type'));
        foreach ($list as $k=>$v){
            switch ($v['type']){
                case 1 :
                    $this->food['breakfast'][] = $v['title'];
                    break;
                case 2 :
                    $this->food['lunch'][] = $v['title'];
                    break;
                case 3 :
                    $this->food['dinner'][] = $v['title'];
                    break;
            }
        }
        $this->food['breakfast'] = $this->food['breakfast'] ?  $this->food['breakfast'] : array();

        if(!isset($this->food['breakfast'] )){$this->food['breakfast'] = array();}
        if(!isset($this->food['lunch'] )){$this->food['lunch'] = array();}
        if(!isset($this->food['dinner'] )){$this->food['dinner'] = array();}

        echo json_encode($this->food);
    }
}

$eat = new GetFood();
$eat -> getList();


