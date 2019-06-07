<?php 
    //链接数据库
    include 'connect.php';

    //接收前端传来的数据
    $username = isset($_POST['username']) ? $_POST['username'] :'';//用户名
    $phoneNum = isset($_POST['phoneNum']) ? $_POST['phoneNum'] :'';//用户名
    $do = isset($_POST['do']) ? $_POST['do'] : 'insert';//操作类型
    $psw = isset($_POST['password']) ? $_POST['password'] : '';//密码

    //搜索功能
    if($do == 'search') {

        $username_sql = "SELECT * FROM 0516userinfo WHERE telephone = '$phoneNum'";//在用户信息表查询username

        $username_res = $connect->query($username_sql)->num_rows;//获取搜索结果的长度
        if($username_res){
            //长度不为0，存在，不给注册
            echo 'no';
        } else {
            //长度为0，不存在用户名，可以注册
            echo 'yes';
        }


    }

    if($do == 'insert') {
        $username_sql = "INSERT INTO 0516userinfo (telephone,passwords) VALUES ('$phoneNum','$psw')";

        $username_res = $connect->query($username_sql);//获取搜索结果的长度
        // var_dump($username_res);
        if($username_res) {
            $arr = array(
                'phoneNum'=>$phoneNum,
                'password'=>$psw,
                'boolean'=>true
                );
            echo json_encode($arr,JSON_UNESCAPED_UNICODE);
        }




    }

 ?>