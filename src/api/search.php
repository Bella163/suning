<?php 
    include 'connect.php';

    //接收前端传来的数据
    $keyword = isset($_POST['keyword']) ? $_POST['keyword'] : '';//搜索关键词
    $minPrice = isset($_POST['minPrice']) ? $_POST['minPrice'] : '';//搜索的最小值
    $maxPrice = isset($_POST['maxPrice']) ? $_POST['maxPrice'] : '';//搜索的最大值
    $pagetype = isset($_POST['pagetype']) ? $_POST['pagetype'] : '';//从哪个页面传来
    $gid = isset($_POST['gid']) ? $_POST['gid'] : '';//商品id
    $mcid = isset($_POST['mcid']) ? $_POST['mcid'] : '';//商家id
    $username = isset($_POST['username']) ? $_POST['username'] : '';//用户名
    $image = isset($_POST['image']) ? $_POST['image'] : '';//用户名
    // $merchantname = isset($_['merchantname']) ? $_['merchantname'] : '';//商家店铺名
    
    

    // 列表页
    if($pagetype == 'list'){
        // var_dump($keyword,$minPrice,$maxPrice);
        if($maxPrice&&$minPrice&&$keyword) {
            
            //查询语句：查询关键词，价格在minPrice和maxPrice之间
            $keyword_Price = "SELECT * FROM 0516goodsinfo WHERE goodsname LIKE '%$keyword%' AND currentprice BETWEEN $minPrice AND $maxPrice";
            // echo 1;

        } else if($maxPrice && $keyword){
            
            //查询语句：查询关键词，价格小于maxPrice
            $keyword_Price = "SELECT * FROM 0516goodsinfo WHERE goodsname LIKE '%$keyword%' AND currentprice < $maxPrice";
        // echo 2;

        } else if($minPrice&&$keyword){
            
            //查询语句：查询关键词，价格大于minPrice
            $keyword_Price = "SELECT * FROM 0516goodsinfo WHERE goodsname LIKE '%$keyword%' AND currentprice > $minPrice";
            // echo 3;

        } else if($keyword){
            
            //查询语句：查询关键词，前15条数据
            $keyword_Price = "SELECT * FROM 0516goodsinfo WHERE goodsname LIKE '%$keyword%' LIMIT 0,15";
            // echo 4;
        }
        $keyword_res = $connect->query($keyword_Price)->fetch_all(MYSQLI_ASSOC);
        // var_dump($keyword_res);
        echo json_encode($keyword_res,JSON_UNESCAPED_UNICODE);
        
    }     

    if($pagetype == 'information'){

    //详情页

        // $all = "SELECT * FROM 0516goodsinfo LEFT JOIN 0516merchantinfo ON 0516merchantinfo.mcid = 0516goodsinfo.mcid";
        //查询语句
        $goods_info = "SELECT * FROM 0516goodsinfo WHERE gid=$gid and mcid=$mcid";

        //查询结果
        $good_res = $connect->query($goods_info)->fetch_all(MYSQLI_ASSOC);
        
        echo json_encode($good_res,JSON_UNESCAPED_UNICODE);
        // echo 1;

    }

    if($pagetype == 'carts') {

        //购物车页面
        
        //查询语句
        $goodsinfo = "SELECT * FROM 0516orderform WHERE username=$username";

        //查询结果
        $goodsinfo_res = $connect->query($goodsinfo)->fetch_all(MYSQLI_ASSOC);

        // var_dump($goodsinfo_res);
        echo json_encode($goodsinfo_res,JSON_UNESCAPED_UNICODE);
    }



 ?>