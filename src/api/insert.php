<?php 
    include 'connect.php';

    //接收前端传来的数据
    $pagetype = isset($_POST['pagetype']) ? $_POST['pagetype'] : 'information';
    $gamount = isset($_POST['gamount']) ? $_POST['gamount'] : '3';
    $username = isset($_POST['username']) ? $_POST['username'] : '15986771945';
    $goodsname = isset($_POST['goodsname']) ? $_POST['goodsname'] : '华为(HUAWEI) 华为P30 Pro 麒麟980 超感光徕卡四摄 全网通版 8GB+128GB 珠';
    $currentprice = isset($_POST['currentprice']) ? $_POST['currentprice'] : '77';
    $gid = isset($_POST['gid']) ? $_POST['gid'] : '14';
    $mcid = isset($_POST['mcid']) ? $_POST['mcid'] : '1';
    $image = isset($_POST['image']) ? $_POST['image'] : '1';




    if($pagetype == 'information') {
        //向订单表插入数据
        //查询语句
        $goodsinfo_gid = "SELECT gid FROM 0516orderform WHERE username=$username AND gid = $gid";//查询gid


        //查询是否存在gid结果
        $goodsinfo_gid_res = $connect->query($goodsinfo_gid)->num_rows;
        // var_dump($goodsinfo_gid_res.',gid');

        if($goodsinfo_gid_res){
            //存在这个商品
           
            //修改gamount的查询语句
            $updateGoods = "UPDATE 0516orderform SET gamount=gamount+$gamount where gid = $gid AND mcid = $mcid";

            //查询结果
            $updateGoods_res = $connect->query($updateGoods);
            if($updateGoods_res) {
                echo 'yes';
            } else {
                echo 'no';
            }

        } else {
            //查询语句
            $addGoods = "INSERT INTO 0516orderform (gamount,username,goodsname,currentprice,mcid,gid,image) VALUES ('$gamount','$username','$goodsname','$currentprice','$mcid','$gid','$image')";

            $addGoods_res = $connect->query($addGoods);
            // var_dump($addGoods_res);
            if($addGoods_res) {
                echo 'yes';
            } else {
                echo 'no';
            }

        }

    }

    
 ?>