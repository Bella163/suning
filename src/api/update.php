<?php 
    include 'connect.php';

    //接收前端传来的数据
    $pagetype = isset($_POST['pagetype']) ? $_POST['pagetype'] : '';
    $gamount = isset($_POST['gamount']) ? $_POST['gamount'] : '';
    $username = isset($_POST['username']) ? $_POST['username'] : '';
    $goodsname = isset($_POST['goodsname']) ? $_POST['goodsname'] : '';
    $currentprice = isset($_POST['currentprice']) ? $_POST['currentprice'] : '';
    $gid = isset($_POST['gid']) ? $_POST['gid'] : '';
    $mcid = isset($_POST['mcid']) ? $_POST['mcid'] : '';
    $image = isset($_POST['image']) ? $_POST['image'] : '';
    $do = isset($_POST['do']) ? $_POST['do'] : '';

    if($pagetype == 'carts') {

        if($do == 'reduce') {

            if($gamount>1){
                $reduceGoods = "UPDATE 0516orderform SET gamount=gamount-1 where gid = $gid AND mcid = $mcid";
                //查询结果
                $reduceGoods_res = $connect->query($reduceGoods);
                if($reduceGoods_res) {
                    echo 'yes';
                } else {
                    echo 'no';
                }
                
            } else {
                $reduceGoods = "UPDATE 0516orderform SET gamount=1 where gid = $gid AND mcid = $mcid";
                $reduceGoods_res = $connect->query($reduceGoods);

            }
                    
        }
        if($do == 'plus') {

            $plusGoods = "UPDATE 0516orderform SET gamount=gamount+1 where gid = $gid AND mcid = $mcid";
            //查询结果
            $plusGoods_res = $connect->query($plusGoods);
            if($plusGoods_res) {
                echo 'yes';
            } else {
                echo 'no';
            }
                    
        }
        if($do == 'del') {

            $delGoods = "DELETE FROM 0516orderform where gid =$gid and mcid =$mcid  and username=$username";
            //查询结果
            $delGoods_res = $connect->query($delGoods);
            if($delGoods_res) {
                echo 'yes';
            } else {
                echo 'no';
            }
                    
        }
    }
 ?>