/* 
* @Author: Marte
* @Date:   2019-05-18 00:04:48
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-20 17:52:34
*/

(function(){
    var keyword = decodeURI(location.search.slice(1)) ;
    // console.log(keyword);
    function init() {
        var p = new Promise(function(sucfn){
            $.ajax({
                type : 'post',
                url : '../api/search.php',
                data : keyword+"&pagetype=list",
                success : function(str){
                    // console.log(str);
                    sucfn(str);
                }
            });

            /*
            {"gid":"6",
            "mcid":"1",
            "stock":"18",
            "image":"1.jpg&2.jpg&3.jpg&9.jpg",
            "sale":"32",
            "originalprice":"100.00",
            "currentprice":"101.00",
            "size":"64g",
            "goodsname":"Xiaomi\/小米 小米9 6GB+128GB 深空灰 移动联通电信全网通4G手机 小水滴全面"}


             */

        });
        p.then(function(data){
            update(data);
        });

        usernameBlock();
        
    }
    if(keyword){
        init();
    }

    function usernameBlock(){
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
    }
    usernameBlock();


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

      //点击顶部导航栏购物车
     $('.topNav_right').off().on('click','.cart',function(){
        var username = getCookie('username') 
        location.href = 'html/carts.html?username='+username;
    });


     //渲染列表页商品信息的函数
    function update(data){
        var arr = JSON.parse(data);
        var ulhtml = arr.map(function(item) {
            var images = item.image.split('&');
            return `<li class="item-wrap ad no-config " id="" name="gid=${item.gid}&mcid=${item.mcid}" lazy="false" hasprice="true">
                <div class="item-bg">
                    <div class="product-box">
                        <div class="res-img">
                            <div class="img-block">
                                <a title=${item.goodsname} name="" class="sellPoint" target="_blank" href="javascript:;" sa-data="${item}">
                                    <img width="220" height="220" alt=${item.goodsname} src="../images/list/${images[3]}">
                                </a>
                            </div>
                            <div class="focus-box disable-scroll">
                                <div class="focus-img">
                                    <dl class="${item.mcid}subCode" style="width: 40px;">
                                        <dd>
                                            <a isowner="true" href="javascript:void(0)">
                                                <img width="32" height="32" src="../images/list/${images[3]}">
                                            </a>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="res-info">
                            <div class="price-box">
                                <span class="def-price">
                                    <i>¥</i>${item.currentprice}<i>.00</i>
                                </span>
                            </div>
                            <div class="title-selling-point"><a title=${item.goodsname} class="sellPoint yibao" id="" name="" target="_blank" href="javascript:;" sa-data="{'eletp':'prd','prdid':'','shopid':'', 'searchvalue':''}">${item.goodsname}</a></div>
                            <div class="evaluate-old clearfix">
                                <div class="info-evaluate">
                                    <a target="_blank" rel="nofollow" href="javascript:;" class="num" name=""><i>3900+</i>评价</a>
                                </div><em class="ad-label-tips">广告</em>
                            </div>
                            <div class="store-stock" value="1" name=""><a href="javascript:void(0);" class="store-class zy">苏宁自营</a></div>
                            <div class="sales-label"><span class="mj"><i>满2780-100</i><em>满2780元减100元</em></span>
                            </div>
                        </div>
                        <div class="res-opt one-third">
                            <a class="btn-db" rel="nofollow" id="" href="javascript:void(0)" name="" > <i></i><em>取消</em>对比</a>

                            <a class="btn-sc" rel="nofollow" name=""><i></i><em>已</em>关注</a>
                            <a class="btn-xq" rel="nofollow" name="" target="_blank" href="javascript:;"><i></i>查看详情</a>
                        </div>
                    </div>
                </div>
            </li>`
        }).join('');
        $('#product-wrap .general').html(ulhtml);
    }


    //价格区间搜索
    
    $('.price-interval .price-interval-boxshow').on('mouseover',function(){
        $('.price-interval').addClass('hover');
        $('#search_sure').css('display','inline-block');
        $('.clean-price').css('display','inline-block');
    });
    $('.price-interval .price-interval-boxshow').mouseout(function(){
        $('#search_sure').css('display','none');
        $('.clean-price').css('display','none');
        $('.price-interval').removeClass('hover');

    });

    //点击确定，获取价格区间的值
    $('#search_sure').off().on('click',function(){
        var minPrice = $('#startM').val().trim();
        var maxPrice = $('#endM').val().trim();
        var p = new Promise(function(sucfn){
            $.ajax({
                type : 'post',
                url : '../api/search.php',
                data : keyword+'&pagetype=list&minPrice='+minPrice+'&maxPrice='+maxPrice,
                success : function(str){
                    console.log(str);
                    var data = str;
                    update(data);
                }
            });
        });
    });

    $('.general').on('click','.item-wrap',function(){
        var data = $(this).attr('name');
        console.log(data);
        window.open('../html/information.html?'+data)
    });

})();

