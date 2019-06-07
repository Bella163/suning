<?php 
    $severname = 'localhost';
    $username = 'root';
    $dbpsw = '';
    $dbname = 'suning';

    //连接数据库
    $connect = new mysqli($severname,$username,$dbpsw,$dbname);
    if($connect->connect_error) {
        die("连接失败" . $connect->connect_error);
    }
    // echo "连接成功";
 ?>