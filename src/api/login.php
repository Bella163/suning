<?php 
    //链接数据库
    include 'connect.php';

    //接收前端传来的数据
    $username = isset($_POST['username']) ? $_POST['username'] :'';//用户名
    $phoneNum = isset($_POST['phoneNum']) ? $_POST['phoneNum'] :'';//用户名
    $do = isset($_POST['do']) ? $_POST['do'] : '';//操作类型
    $psw = isset($_POST['password']) ? $_POST['password'] : '';//密码
    $nametype = isset($_POST['nametype']) ? $_POST['nametype'] : '';
    $names = isset($_POST['names']) ? $_POST['names'] : '';
    //搜索功能

    if($do == 'search') {
        if($nametype&&$names&&$psw) {//账号和密码都不为空
            $name_sql = "SELECT * FROM 0516userinfo WHERE $nametype='$names' AND passwords = '$psw'";
            // $username_sql = "SELECT * FROM 0516userinfo WHERE telephone = '$phoneNum'";//在用户信息表查询username

            // var_dump($name_sql);

            $name_res = $connect->query($name_sql)->num_rows;//获取搜索结果的长度
            if($name_res){
                //长度不为0，存在，可以登录
                echo 'yes';
            } else {
                //长度为0，不存在用户名，不可以登录
                echo 'no';
            }
        } else if($nametype&&$names){
            $name_sql = "SELECT * FROM 0516userinfo WHERE $nametype='$names'";
            // $username_sql = "SELECT * FROM 0516userinfo WHERE telephone = '$phoneNum'";//在用户信息表查询username

            // var_dump($name_sql);

            $name_res = $connect->query($name_sql)->num_rows;//获取搜索结果的长度
            if($name_res){
                //长度不为0，存在，可以登录
                echo 'yes';
            } else {
                //长度为0，不存在用户名，不可以登录
                echo 'no';
                
            }
        }
       

    }


 ?>