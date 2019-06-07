(function(){

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
                
                return `<div data-sku="a" class="item  item-checked item-last">
                        <span class="line-this"></span>
                        <span class="main-line"></span>
                        <span class="main-line main-line-11"></span>
                        <div class="item-main  clearfix">
                            <div class="td td-chk form">
                                <div class="cart-checkbox">
                                    <input name="icart1_goods_sel" type="checkbox" id="610100000198941928"
                                        disprice="" activitytype="01" subactivitytype="" pricetype=""
                                        cmmdtycode="000000011018715483" overseasflag="" salesprice="${item.currentprice}"
                                        shopcode="0070119143"
                                        cmmdtyname="${item.goodsname}"
                                        cmmdtyqty="1" suppliercode="0070119143" jdlmodel="" swlflag="0"
                                        coldchainflag="" tmflag="" checked="checked" allocatedamount="" promotype=""
                                        class="checkbox chk-item">
                                    <label for="610100000198941928"></label>
                                </div>
                            </div>
                            <div class="td td-item">
                                <div class="item-pic">
                                    <a href="javascript:;"
                                        class="item-img-box tax-introduce tip-common-hover-fn-btn"
                                        target="_blank" name="icart1_goods_pic">
                                        <img src="${item.image}"
                                            alt="${item.goodsname}"
                                            has-autoexpo="true">
                                    </a>
                                    <div class="hide" id="tax-tip-person610100000198941928">
                                        <div class="tax-tip">
                                            <img src="${item.image}"
                                                alt="${item.goodsname}"
                                                has-autoexpo="true">
                                        </div>
                                    </div>
                                </div>
                                <div class="item-info">
                                    <a href="javascript:;" target="_blank" class="item-title"
                                        name="icart1_goods_name" cmmdtycode="000000011018715483"
                                        cmmdtyname="${item.goodsname}">${item.goodsname}</a>
                                </div>
                                <div class="item-service"></div>
                            </div>
                            <div class="td td-specs">
                            </div>
                            <div class="td td-price">

                                <div class="price-line">
                                    <span class="price-now sn-price">
                                        <i>¥</i>
                                        <em>${item.currentprice}</em>
                                    </span>
                                </div>

                            </div>
                            <div class="td td-amount">
                                <div class="item-amount">
                                    <a href="javascript:;" class="minus no-minus" name="icart1_goods_numd"> - </a>
                                    <input type="text" name="icart1_goods_num_sr" class="ui-text text-amount"
                                        autocomplete="off" data-max="99" data-min="1" value="${item.gamount}" id="" maxlength="2">
                                    <a href="javascript:;" class="plus" name="icart1_goods_numi"> + </a>
                                </div>
                            </div>
                            <div class="td td-sum">
                                <b class="sn-price">
                                    <i>¥</i>
                                    <em>${item.gamount*item.currentprice}</em>
                                </b>
                            </div>
                            <div class="td td-op" id="0000000110187154830070119143" itemno="610100000198941928"
                                shopcode="0070119143"
                                cmmdtyname="${item.goodsname}"
                                cmmdtycode="000000011018715483" isoverdue="0" activitytype="01" subactivitytype=""
                                activityid="" carshopserway="" carshopcode="" suppliercode="0070119143" jdlmodel=""
                                overseasflag="" o2oserviceflag="" servicestorecode="" servicestorename="">
                                <a  
                                    href="javascript:;" class="add-fav tip-common-click-fn-btn"
                                    data-tip-type="addFav" name="icart1_goods_col" data-placement="bottom">移入关注</a>
                                <a href="javascript:;" class="del tip-common-click-fn-btn" data-placement="bottom"
                                    data-tip-type="delOne" name="icart1_goods_delate">删除</a>
                                <p href="javascript:;" class="tip-look-alike" data-placement="bottom"
                                    id="alike-610100000198941928" data-clonenode="#alikePro-610100000198941928">
                                    查找相似<i class="alike-arr"></i></p>
                                <div id="alikePro-610100000198941928" class="hide">
                                    <div class="alike-container">
                                        <div class="alike-prolist J-alike-pro">
                                            <a class="prev" href="javascript:void(0);"></a>
                                            <a class="next" href="javascript:void(0);"></a>
                                            <div class="list-container">
                                                <ul class="list-box">
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item-extra aftersaleprodiv">
                            <!-- 需要展示延保商品 -->
                            <div class="sun-package-list">
                            </div>
                        </div>
                    </div>`
            }).join('');
            $('.cart-list').html(html);
            
              
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



        //用户名滑过出现“退出登录账号”
    $('#username-node-slide').mouseover(function() {
        $('.ng-username-slide').show();
        $('.ng-username-slide').css('borderTop','none')
        $('#username-node-slide').css('background','#fff')
    });

    //用户名滑出“退出登录账号”消失
    $('#username-node-slide').mouseout(function() {
        $('.ng-username-slide').hide();
        $('#username-node-slide').css('background','#f5f5f5');

    });

    //点击退出登录按钮
    $('.ng-username-slide .logout').click(function(){
        setCookie('username',0,-1);
        var username = getCookie('username');//获取cookie用户名

        //隐藏中间4位数字
        if(username){
            var names = username.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            $('#username-node-slide').show();

            $('#username-node-slide #usernameHtml02').html(names);
            $('#reg-bar-node').hide();
        } else {
            $('#reg-bar-node').show();
            $('#username-node-slide').hide();

        }
    });

    //点击请登录按钮
    $('#reg-bar-node .login').off().click(function (event){
        window.open('login.html');
       
    });

    function sum(now){
        var num = $(now).parent().find('.text-amount').val();
        var price = $(now).parent().parent().prev().children().children().children('em').text();
        var sum = (num * price).toFixed(2);
        var xiaoji = $(now).parent().parent().next().children().children().children('em');
        $(now).parent().parent().next().children().children('em').html(sum);
    }

        //点击增加数量
    $('.cart-list').on('click','.plus',function(){
        var num = $(this).prev('.text-amount').val();

       // var price = $(this).parent().parent().prev().children().children().children('em').text();
       // var sum = 0;
       // var tdSum = $(this).parent().parent().next().children().children().children('em');
        // sum = (num * price).toFixed(2);
        // $(this).parent().parent().next().children().children('em').html(sum);
        // console.log(num)
        num++;
        $(this).prev('.text-amount').val(num);
        if( $('.text-amount').val() >= 1){
            $(this).prev().prev().removeClass('.no-minus');
            $(this).prev().prev().css('cursor','pointer');
            
        }
        sum($(this));

    });

    //点击减少数量
    $('.cart-list').on('click','.minus',function(){
        var num = $(this).next('.text-amount').val();
        console.log($('.text-amount').val(),'-')
        // var price = $(this).parent().parent().prev().children().children().children('em').text();

        num--;
        if($(this).next('.text-amount').val() <= 1) {
            num = 1;
            $(this).css('cursor','no-drop');
            $(this).addClass('.no-minus');
        }
            $(this).css('cursor','pointer');
            $(this).removeClass('.no-minus');
            $(this).next('.text-amount').val(num);
            

        sum($(this));

    });

    //点击删除按钮
    $('.cart-list').on('click','.del',function(){
        console.log($(this).parents('.item'))
        $(this).parents('.item').hide();
    });

     //全局的checkbox选中和未选中的样式
        var $allCheckbox = $('input[type="checkbox"]').next('label'),//全局的全部checkbox
            $wholeChexbox = $('.th-chk  label'),
            $sonCheckBox = $('.cart-checkbox label');  
        
        //===========================全局全选与单个商品的关系======================
        //全部选择
        
        $allCheckbox.click(function () {
            $(this).toggleClass("mark");
            if($(this).hasClass('mark')){
                $(this).prev('.chk-item').attr('checked','checked');//勾选input
                $wholeChexbox.css('backgroundPosition','0 -36px');
                // $(this).parents('.cart-checkbox label').css('backgroundPosition','0 -36px');

            }else{
                $wholeChexbox.css('backgroundPosition','0 -20px');

                 $(this).prev('.chk-item').prop('checked',false);
                 //console.log(111111111222222222);
                // $(this).parents('.cart-checkbox label').css('backgroundPosition','0 -20px');
                 
            }
            // totalMoney();
        });

        //点击单条商品的复选框
        $('.cart-list').on('click','.cart-checkbox label',function(){
            $(this).toggleClass('mark');
            if($(this).hasClass('mark')){
                $(this).prev('.chk-item').attr('checked','checked');//勾选input
                $(this).css('backgroundPosition','0 -36px');
            } else {
                $(this).prev('.chk-item').prop('checked',false);//勾选input
                $(this).css('backgroundPosition','0 -20px');

            }
        });


        //点击店铺全选

        $('.checkedall').on('click',function(){
            $(this).toggleClass('mark');
            if($(this).children().children('label').hasClass('mark')){
                $('.checkedall').addClass('store-checked');
                $(this).prev('.chk-cstore-all').attr('checked','checked');//勾选input
                console.log($('.checkedall').addClass('store-checked'));
                // $(thicheckedalls).css('backgroundPosition','0 -36px');
            } else {
                $(this).prev('.chk-cstore-all').prop('checked',false);//勾选input
                $('.checkedall').removeClass('store-checked');
                // $(this).css('backgroundPosition','0 -20px');
            }
        });

    function all() {

        $('.cart-checkbox input').each(function(i, item) {
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
            num += $('.text-amount').eq(item).val() * 1;
            price += $('.td-sum em').eq(item).text().slice(2) * 1;
        });
        $('#cart1PayAmount').html(price);
        $('.ff-tahoma').html(num);

    }
    // sum();

    // function cal(){
    //     var num=0;
    //     var sum=0;
    //      $('fuxuan').each(function(i, item) {
    //          if($(item).prop('checked')){
    //             num++ ;
    //             sum+= ;
    //          }
    //      });


    // }
    // cal();

})();