/**
 * Created by Administrator on 2017/5/24.
 */

$(function () {
      //接收传来的数据
    var data = decodeURI(location.search.slice(1));
    // console.log(data); //username=15986771945

    //初始化渲染
    function init(){
        var username = getCookie('username');
        if(username){
            var names = username.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            $('#username-node-slide').show();

            $('#username-node-slide #usernameHtml02').html(names);
            $('#reg-bar-node').hide();
        } else {
            $('#reg-bar-node').show();
            $('#username-node-slide').hide();
        }

        var p = new Promise(function(sucfn){
            $.ajax({
                type :'post',
                url : '../api/search.php',
                data : 'pagetype=carts&'+data,
                success : function(str){
                    // console.log(str);
                    sucfn(str);
                }
            });
        });

        p.then(function(data){
            // console.log(data);
            //渲染购物车列表
            var arr = JSON.parse(data);
            console.log(arr)
            var html = arr.map(function(item) {
                
                return `<ul class="order_lists" name="gid=${item.gid}&mcid=${item.mcid}&username=${item.username}">
                    <li class="list_chk">
                        <label><input type="checkbox" class="son_check">
                        </label>
                    </li>
                    <li class="list_con">
                        <div class="list_img"><a href="javascript:;"><img src="${item.image}" alt=""></a></div>
                        <div class="list_text"><a href="javascript:;">${item.goodsname}</a></div>
                    </li>
                    <li class="list_info">
                        <p>规格：默认</p>
                        <p>尺寸：16*16*3(cm)</p>
                    </li>
                    <li class="list_price">
                        <p class="price">￥${item.currentprice}</p>
                    </li>
                    <li class="list_amount">
                        <div class="amount_box">
                            <a href="javascript:;" class="reduce reSty">-</a>
                            <input type="text" value="${item.gamount}" class="sum">
                            <a href="javascript:;" class="plus">+</a>
                        </div>
                    </li>
                    <li class="list_sum">
                        <p class="sum_price">￥${item.gamount*item.currentprice}</p>
                    </li>
                    <li class="list_op">
                        <p class="del"><a href="javascript:;" class="delBtn">移除商品</a></p>
                    </li>
                </ul>`
            }).join('');
            $('.order_content').html(html);
            
              
            // currentprice: "91.00"
            // gamount: "1"
            // gid: "4"
            // goodsname: "华为(HUAWEI) 华为P30 Pro 麒麟980 超感光徕卡四摄 全网通版 8GB 128GB 珠"
            // mcid: "1"
            // merchantname: null
            // orderid: "6"
            // size: null
            // uid: null
            // username: "15986771945"
             
           
        });


        //隐藏中间4位数字
       
    }
    init();

    //全局的checkbox选中和未选中的样式
    var $allCheckbox = $('input[type="checkbox"]'),     //全局的全部checkbox
        $wholeChexbox = $('.whole_check'),
        $cartBox = $('.cartBox'),                       //每个商铺盒子
        $shopCheckbox = $('.shopChoice'),               //每个商铺的checkbox
        $sonCheckBox = $('.son_check');                 //每个商铺下的商品的checkbox
    $allCheckbox.click(function () {
        if ($(this).is(':checked')) {
            $(this).next('label').addClass('mark');
        } else {
            $(this).next('label').removeClass('mark')
        }
    });

    //===============================================全局全选与单个商品的关系================================
    $wholeChexbox.click(function () {
        var $checkboxs = $cartBox.find('input[type="checkbox"]');
        if ($(this).is(':checked')) {
            $checkboxs.prop("checked", true);
            $checkboxs.next('label').addClass('mark');
            $('.son_check').parent().addClass('mark');
        } else {
            $checkboxs.prop("checked", false);
            $checkboxs.next('label').removeClass('mark');
            $('.son_check').parent().removeClass('mark');
        }
        // totalMoney();
        all();
    });


    // $sonCheckBox.each(function () {
    //     $(this).click(function () {
    //         if ($(this).is(':checked')) {
    //             //判断：所有单个商品是否勾选
    //             var len = $sonCheckBox.length;
    //             var num = 0;
    //             $sonCheckBox.each(function () {
    //                 if ($(this).is(':checked')) {
    //                     num++;
    //                 }
    //             });
    //             if (num == len) {
    //                 $wholeChexbox.prop("checked", true);
    //                 $wholeChexbox.next('label').addClass('mark');
    //             }
    //         } else {
    //             //单个商品取消勾选，全局全选取消勾选
    //             $wholeChexbox.prop("checked", false);
    //             $wholeChexbox.next('label').removeClass('mark');
    //         }
    //     })
    // });

    $('.order_content').on('click','.son_check',function(){
        console.log($(this));
        if($(this).is(':checked')){
            $(this).prop("checked", true);
            $(this).parent('label').addClass('mark');
        } else {
            $(this).prop("checked", false);
            $(this).parent('label').removeClass('mark');
        }


        var len = $('.order_content .mark').size();
        var total = $('.son_check').size();
        console.log(len,total);
        if(len == total) {
            //证明全部勾选了
            $('.whole_check').next('label').addClass('mark');
            $('.shopChoice').next('label').addClass('mark');

        } else {
            // $('.whole_check').prop('checked', false);
            $('.whole_check').next('label').removeClass('mark');
            $('.shopChoice').next('label').removeClass('mark');

        }
        // totalMoney(); //刷新总数量和总价格
        all();
    });

    //=======================================每个店铺checkbox与全选checkbox的关系/每个店铺与其下商品样式的变化===================================================

    //店铺有一个未选中，全局全选按钮取消对勾，若店铺全选中，则全局全选按钮打对勾。
    $shopCheckbox.each(function () {
        $(this).click(function () {
            if ($(this).is(':checked')) {
                //判断：店铺全选中，则全局全选按钮打对勾。
                var len = $shopCheckbox.length;
                var num = 0;
                $shopCheckbox.each(function () {
                    if ($(this).is(':checked')) {
                        num++;
                    }
                });
                if (num == len) {
                    $wholeChexbox.prop("checked", true);
                    $wholeChexbox.next('label').addClass('mark');
                }

                //店铺下的checkbox选中状态
                $(this).parents('.cartBox').find('.son_check').prop("checked", true);
                $(this).parents('.cartBox').find('.son_check').next('label').addClass('mark');
            } else {
                //否则，全局全选按钮取消对勾
                $wholeChexbox.prop("checked", false);
                $wholeChexbox.next('label').removeClass('mark');

                //店铺下的checkbox选中状态
                $(this).parents('.cartBox').find('.son_check').prop("checked", false);
                $(this).parents('.cartBox').find('.son_check').next('label').removeClass('mark');
            }
            // totalMoney();
            all();
        });
    });


    //========================================每个店铺checkbox与其下商品的checkbox的关系======================================================

    //店铺$sonChecks有一个未选中，店铺全选按钮取消选中，若全都选中，则全选打对勾
    $cartBox.each(function () {
        var $this = $(this);
        var $sonChecks = $this.find('.son_check');
        $sonChecks.each(function () {
            $(this).click(function () {
                if ($(this).is(':checked')) {
                    //判断：如果所有的$sonChecks都选中则店铺全选打对勾！
                    var len = $sonChecks.length;
                    var num = 0;
                    $sonChecks.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $(this).parents('.cartBox').find('.shopChoice').prop("checked", true);
                        $(this).parents('.cartBox').find('.shopChoice').next('label').addClass('mark');
                    }

                } else {
                    //否则，店铺全选取消
                    $(this).parents('.cartBox').find('.shopChoice').prop("checked", false);
                    $(this).parents('.cartBox').find('.shopChoice').next('label').removeClass('mark');
                }
                // totalMoney();
                all();
            });
        });
    });


    //=================================================商品数量==============================================
    // var $plus = $('.plus'),
    //     $reduce = $('.reduce'),
    //     $all_sum = $('.sum');
    $('.order_content').on('click','.plus',function () {
        var info = $('.order_content').find('.order_lists').attr('name');
        // console.log(data);
        var p = new Promise(function(sucfn){
            $.ajax({
                type : 'post',
                url : '../api/update.php',
                data : 'pagetype=carts&do=plus&'+info,
                success : function(str){
                    console.log(str);
                }
            });
        });
        var $inputVal = $(this).prev('input'),
            $count = parseInt($inputVal.val())+1,
            $obj = $(this).parents('.amount_box').find('.reduce'),
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //单价
            $priceTotal = $count*parseInt($price.substring(1));
        $inputVal.val($count);
        $priceTotalObj.html('￥'+$priceTotal);
        if($inputVal.val()>1 && $obj.hasClass('reSty')){
            $obj.removeClass('reSty');
        }
        // totalMoney();
        all();
    });

    $('.order_content').on('click','.reduce',function () {
        var $inputVal = $(this).next('input'),
            $count = parseInt($inputVal.val())-1,
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //单价
            $priceTotal = $count*parseInt($price.substring(1));
        if($inputVal.val()>1){
            $inputVal.val($count);
            $priceTotalObj.html('￥'+$priceTotal);
        }
        if($inputVal.val()==1 && !$(this).hasClass('reSty')){
            $(this).addClass('reSty');
        }
        if($inputVal.val()<=1){
            $inputVal.val()=1;
        }
        var info = $(this).parents('.order_lists').attr('name');

        console.log($(this).parents('.order_lists').attr('name'));
        var p = new Promise(function(sucfn){
            $.ajax({
                type : 'post',
                url : '../api/update.php',
                data : 'pagetype=carts&do=reduce&'+info,
                success : function(str){
                    console.log(str);
                }
            });
        });

        all();
    });

    $('.order_content').on('click','.sum',function () {
    // $all_sum.keyup(function () {
        var $count = 0,
            $priceTotalObj = $(this).parents('.order_lists').find('.sum_price'),
            $price = $(this).parents('.order_lists').find('.price').html(),  //单价
            $priceTotal = 0;
        if($(this).val()==''){
            $(this).val('1');
        }
        $(this).val($(this).val().replace(/\D|^0/g,''));
        $count = $(this).val();
        $priceTotal = $count*parseInt($price.substring(1));
        $(this).attr('value',$count);
        $priceTotalObj.html('￥'+$priceTotal);
        // totalMoney();
        all();
    })

    //======================================移除商品========================================

    // var $order_lists = null;
    // var $order_content = '';
    // $('.order_content').on('click','.delBtn',function () {
    // // $('.delBtn').click(function () {
    //     $order_lists = $(this).parents('.order_lists');
    //     $order_content = $order_lists.parents('.order_content');
    //     $('.model_bg').fadeIn(300);
    //     $('.my_model').fadeIn(300);
    // });
    
    //删除当行

    $('.order_content').on('click','.delBtn',function () {

        var res = confirm('您确定要删除吗？');
        if(res) {
            $(this).parents('.order_lists').remove();
            var info = $(this).parents('.order_lists').attr('name');
            var p = new Promise(function(){
                $.ajax({
                    type : 'post',
                    url : '../api/update.php',
                    data :  'pagetype=carts&do=del&'+info,
                    success : function(str){
                        console.log(str)
                    }
                })
            });
        }
        update();
        all();
    });

    //是否应该保留最后一行：如果没有商品了，就隐藏这行(算总价和总数量的)
    function update() {
        var len = $('.order_content .reduce').size();
        if(len == 0) {
            //没有商品了
            $('.bar-wrapper').hide();
        }
    }

    //关闭模态框
    // $('.order_content').on('click','.closeModel',function () {
    // // $('.closeModel').click(function () {
    //     closeM();
    // });

    // $('.order_content').on('click','.dialog-close',function () {
    // // $('.dialog-close').click(function () {
    //     closeM();
    // });
    // function closeM() {
    //     $('.model_bg').fadeOut(300);
    //     $('.my_model').fadeOut(300);
    // }
    //确定按钮，移除商品
    // $('.order_content').on('click','.dialog-sure',function () {
    // // $('.dialog-sure').click(function () {
    //     $order_lists.remove();
    //     if($order_content.html().trim() == null || $order_content.html().trim().length == 0){
    //         $order_content.parents('.cartBox').remove();
    //     }
    //     closeM();
    //     $sonCheckBox = $('.son_check');
    //     // totalMoney();
    //     all();
    // });

    //======================================总计==========================================

    // function totalMoney() {
    //     var total_money = 0;
    //     var total_count = 0;
    //     var calBtn = $('.calBtn a');
    //     $sonCheckBox.each(function () {
    //         if ($(this).is(':checked')) {
    //             var goods = parseInt($(this).parents('.order_lists').find('.sum_price').html().substring(1));
    //             var num =  parseInt($(this).parents('.order_lists').find('.sum').val());
    //             total_money += goods;
    //             total_count += num;
    //         }
    //     });
    //     $('.total_text').html('￥'+total_money);
    //     $('.piece_num').html(total_count);

    //     // console.log(total_money,total_count);

    //     if(total_money!=0 && total_count!=0){
    //         if(!calBtn.hasClass('btn_sty')){
    //             calBtn.addClass('btn_sty');
    //         }
    //     }else{
    //         if(calBtn.hasClass('btn_sty')){
    //             calBtn.removeClass('btn_sty');
    //         }
    //     }
    // }

        //计算总数量和总价格
    var arr = [];

    function all() {

        $('.son_check').each(function(i, item) {
            if($(item).prop('checked')) {
                //这一行被勾选，把的下标存到数组里面
                arr.push(i);

            }
        });
        //      console.log(arr);

        //求总数量
        var num = 0;
        var price = 0;
        arr.forEach(function(item) { //0 1 
            num += $('.sum').eq(item).val() * 1;
            price += $('.sum_price').eq(item).text().slice(1) * 1;
        });

        //      console.log(num,price.toFixed(2));

        //渲染
        $('.piece').html('已选 ' + num + ' 件商品');
        $('.total_text').html('总计（不含运费）：￥' + price.toFixed(2));
        arr = []; //数组用完就清空
    }

});