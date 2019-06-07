(function(){
    //接收列表页传来的数据
    var data = location.search.slice(1);
    // console.log("pagetype=information&"+data)
    var username = getCookie('username');

    //初始化渲染
    function init(){
        var p = new Promise(function(sucfn){
            $.ajax({
                type: 'post',
                url : '../api/search.php',
                data : "pagetype=information&"+data,
                success : function(str){
                    // console.log(str);
                    sucfn(str);
                }
            })
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
        p.then(function(data){
            // console.log(data);
            var arr = JSON.parse(data);
            var imgArr = arr[0].image.split('&');
            // console.log(imgArr)

            //图片渲染
            var imgzoomhtml = arr.map(function (item){
                return `<div class="imgzoom-main">
                            <a id="bigImg" class="view-img" name="item_11018715483_sppic_bigpic01" href="javascript:void(0);">
                                <img alt="${item.goodsname}" src="../images/list/${imgArr[3]}">
                            </a>
                            <div class="imgzoom-shot" style="left: 248px; top: 222px; opacity: 0;"></div>
                            <i id="labelPicture" class="g-sticker-80" style="display:none;"><b class=""></b></i>
                            <i class="oversea-logo hide" style="display: none;"></i>
                        </div>
                        <div class="imgzoom-thumb">
                            <a name="item_11018715483_sppic_picup01" class="prev prev-disable" href="javascript:void(0);"
                                style="visibility: hidden;"></a>
                            <div class="imgzoom-thumb-main">
                                <ul style="left: 0px;">
                                    <li class="current"> 
                                        <a name="item_11018715483_sppic_xiaop01" href="javascript:void(0);">
                                            <img alt="${item.goodsname}" src="../images/list/${imgArr[3]}">
                                        </a> 
                                    </li>
                                    <li class="" data-index="2"> <a name="item_11018715483_sppic_xiaop02" href="javascript:void(0);">
                                            <img alt="${item.goodsname}" src="../images/list/${imgArr[1]}"
                                        </a> 
                                    </li>
                                    <li class="" data-index="3">
                                        <a name="item_11018715483_sppic_xiaop03" href="javascript:void(0);">
                                            <img alt="${item.goodsname}" src="../images/list/${imgArr[2]}">
                                        </a> 
                                    </li>
                                    <li class="" data-index="4"> 
                                        <a name="item_11018715483_sppic_xiaop04" href="javascript:void(0);">
                                            <img alt="${item.goodsname}" src="../images/list/${imgArr[2]}"
                                        </a> 
                                    </li>
                                    <li class="" data-index="5"> 
                                        <a name="item_11018715483_sppic_xiaop05" href="javascript:void(0);">
                                            <img alt="${item.goodsname}" src="../images/list/${imgArr[3]}"
                                                has-autoexpo="true">
                                        </a> 
                                    </li>
                                </ul>
                            </div> <a name="item_11018715483_sppic_picdown01" class="next next-disable"
                                href="javascript:void(0);" style="visibility: hidden;"></a>
                        </div>
                        <div class="imgzoom-pop" style="display: none;">
                            <img src="../images/list/${imgArr[3]}" style="top: -355.2px; left: -396.8px;">
                        </div>`
            }).join('');
            $('#imgZoom').html(imgzoomhtml);

            //价格渲染
            var pricehtml = arr.map(function(item){
                return `<div class="proinfo-short-tip" id="proinfoShortTip" style="display:none;"></div>
                        <div class="national-flag clearfix" id="NationalFlag" style="display:none;"> <i class=""></i>
                            <div class="info" id="overSeaPlace"> </div>
                        </div>
                        <div class="proinfo-title">
                            <h1 id="itemDisplayName">${item.goodsname}</h1>
                            <h2 id="promotionDesc" style="display: block;"></h2>
                        </div>
                        <div class="dajuhui-panel dajuhui-panel2" style="display:none;" id="timePanel2"> 
                            <span class="djh-logo"></span> 
                            <span class="super-quan hide"></span> 
                            <span class="djh-cd"> 
                                <i class="djh-icon"></i> 
                                <span class="active-label">此商品</span> 
                                <span class="proinfo-cd"> 
                                    <span id="bigPolyTime"></span> 
                                </span> 
                                <span class="active-label">参加活动</span> 
                                <span class="proinfo-cd">
                                    <span id="snqgPrice" style="display:none"></span>
                                </span> 
                            </span> 
                            <span class="sell-tell"> 
                                <a class="qgtell-text" name="item_11018715483_kstx_click" href="javascript:reyuSnqgRemind();">开售提醒</a> 
                            </span>
                            <div class="djh-qg" id="bigPolyMore" style="display: none;"></div>
                        </div>
                        <div class="dajuhui-panel" style="display:none;" id="timePanel"> 
                            <span class="djh-logo"></span> 
                                <span class="djh-cd"> 
                                    <i class="djh-icon"></i> 
                                    <span class="active-label" id="beginOrEnd">距离活动开始</span> 
                                    <span class="proinfo-cd"> 
                                        <em class="d">02</em> <span>天</span>
                                        <em class="h">07</em> <span>时</span> 
                                        <em class="m">04</em> <span>分</span> 
                                        <em class="s">39</em> <span>秒</span> 
                                        <input type="hidden" id="durationTime" value="200000">
                                    </span> 
                                </span> 
                            <span class="snqg-num" style="display: none"></span> 
                            <span class="qgcontain hide"> <span class="qgprcent"></span><i class="qg-i"></i> </span>
                            <div class="djh-qg" id="djhBuyNum" style="display:none;"> <span class="yq">已抢</span> <span
                                    class="num"></span> </div>
                            <div class="djh-qg" id="bigPolyMore2" style="display: none;"></div>
                            <div id="yushouCount" class="total presell-rule rule-fr" style="display:none;"></div> <span
                                class="super-new-icon" id="superNewIcon" style="display: none;"></span>
                        </div>
                        <div id="priceDom" class="proinfo-focus clearfix">
                            <div class="txt-under-shelf" style="display:none;" id="xjdiv">此商品已下架</div>
                            <div style="position: relative;" class="price-container clearfix" id="mainPrice">
                                <dl class="price-promo">
                                    <dt><span class="w3" id="promPriceText"> 易购价 </span></dt>
                                    <dd> <span class="mainprice"><i>¥</i>${item.currentprice}.<span>00</span> </span> <a
                                            href="javascript:FourPage.subscribePriceNotice();" class="btn-price-notice"
                                            name="item_11018715483_gmq_jjtz" id="PriceNotice1">降价通知</a> <a href="javascript:;"
                                            target="_blank" class="btn-price-business" style="display: none;"
                                            name="item_11018715483_govinquires_click" id="qyxjNotice">企业询价</a> </dd>
                                </dl>
                                <dl class="super-vipbox" style="">
                                    <dd id="superYz"><span class="super-vip-icon"></span><span
                                            class="super-word">加入会员返云钻，下单立返约7.76元</span><a
                                            href="javascript:superVipLogin(&#39;//supervip.suning.com/snprime-web/toIndex.do&#39;);"
                                            class="more-equity" id="superYzLink"
                                            name="item_11018715483_superhyljkt_click">立即开通&gt;</a></dd>
                                </dl>
                                <dl class="proinfo-comments">
                                    <div class="v-div-line"></div> <a href="javascript:;">
                                        <div>累计评价</div><span>0</span>
                                    </a>
                                </dl>
                            </div>
                            <dl class="price-chd" id="promotionForPds" style="display:none;"> </dl>
                            <dl class="receive-quan proinfo-promo hide" id="discountPrice" style="display: block;">
                                <dt><span class="w2" id="getCoupon">优惠</span></dt>
                                <dd>
                                    <div id="discountPriceValue" class="receive-yxhd hide" style="display: block;">
                                        <span>可参加以下优惠活动</span><i></i></div>
                                    <div id="receiveLimit" class="hide" style="display: none;"></div>
                                    <div id="shoppingAllowance">

                                    </div>
                                </dd>
                                <dd id="freeCouponTitle" style="display: block;">
                                    <div class="more-juan" id="freeCouponBox" style="display: block;"><a class="p-quan2"
                                            title="有效期2019-05-16 00:00:00至2019-06-06 23:59:59" href="javascript:void(0);"
                                            name="item_11018715483_promotion_coupon"><i
                                                class="quan-border bl"></i><span>¥2</span><i class="bm"></i><span
                                                class="p-quan-white">满299用2</span><i class="quan-border br"></i></a><a
                                            class="p-quan2" title="有效期2019-05-16 00:00:00至2019-05-18 23:59:59"
                                            href="javascript:void(0);" name="item_11018715483_promotion_coupon"><i
                                                class="quan-border bl"></i><span>¥5</span><i class="bm"></i><span
                                                class="p-quan-white">满999用5</span><i class="quan-border br"></i></a><a
                                            href="javascript:void(0);" class="a-detail"
                                            name="item_11018715483_promotion_coupon">共3张优惠券&gt;</a></div>
                                    <div class="gua-juan" onclick="scrapeCouponLoginSataus()"> <a href="javascript:;" class="a1"
                                            onclick="return false;"></a> <span>100%刮中券，最高50元无敌券</span> <a href="javascript:;"
                                            class="a2" onclick="return false;">立即去刮奖&gt;</a> </div>
                                </dd>
                                <dd id="allcuxiao" style="display: block;">
                                    <div class="ph-price-qrcode" id="mobileTitle" style="display:none;"> <label></label><i
                                            class="i-triangle"></i>
                                        <div class="prom-info" id="mobileBox"></div>
                                    </div>
                                    <ul class="promo-list">
                                        <li id="voucherTitle" style="display:none;"><label>满 减</label><i class="i-triangle"></i>
                                            <p class="promotion-content" id="voucherBox"></p>
                                        </li>
                                        <li id="lhvoucherTitle" style="display:none;"><label>联合满减</label><i
                                                class="i-triangle"></i>
                                            <p class="promotion-content" id="lhvoucherBox"></p>
                                        </li>
                                        <li id="isXYuanNItemTitle" style="display:none;"><label>套 装 价</label><i
                                                class="i-triangle"></i>
                                            <p class="promotion-content" id="isXYuanNItemBox"></p>
                                        </li>
                                        <li id="taogouyhTitle" style="display:none;"><label>套购优惠</label><i
                                                class="i-triangle"></i>
                                            <p class="promotion-content" id="taogouyhBox"></p>
                                        </li>
                                        <li id="giftTitle" class="promo-gift" style="display:none;">
                                            <label class="lable-zp">赠品</label>
                                            <i class="i-triangle i-tri-zp"></i>
                                            <div class="zengpin clearfix" id="giftBox"></div>
                                        </li>
                                        <li id="limitGifts" class="manzen-handle-li" style="display:none;">

                                        </li>
                                        <li id="ordersGifts" class="manzen-handle-li" style="display:none;">


                                        </li>
                                        <li id="jrPromTitle" style="display:none;"><label>支付满减</label><i class="i-triangle"></i>
                                            <p class="promotion-content" id="jrPromBox"></p>
                                        </li>
                                        <li id="purchaseTitle" style="display:none;"><label>优惠换购</label><i
                                                class="i-triangle"></i>
                                            <p class="promotion-content" id="purchaseBox"></p>
                                        </li>
                                        <li id="couponTitle" style="display:none;"><label>返 券</label><i class="i-triangle"></i>
                                            <p class="promotion-content" id="couponBox"></p>
                                        </li>
                                        <li id="newcouponTitle" style="display:none;"><label>返 券</label><i
                                                class="i-triangle"></i>
                                            <p class="promotion-content" id="newcouponBox"></p>
                                        </li>
                                        <li id="yfbTitle" style=""><label>实名有礼</label><i class="i-triangle"></i>
                                            <p class="prom-info prom-yun" id="yfbBox"><span class="desc">实名认证领苏宁支付券</span><a
                                                    href="javascript:;" target="_blank" class="a-detail ml10">立即领取 &gt;</a></p>
                                        </li>
                                        <li id="rxfTitle" style="display:none;"><label>任性付</label><i class="i-triangle"></i>
                                            <p class="promotion-content" id="rxfBox"></p>
                                        </li>
                                        <li id="scodeTitle" style="display:none;"><label>S 码</label><i class="i-triangle"></i>
                                            <p class="promotion-content" id="scodeBox"></p>
                                        </li>
                                        <li id="pointTitle" class="prom-list-box" style="display: block;"><label>云 钻</label><i
                                                class="i-triangle"></i>
                                            <p class="promotion-content" id="pointBox"><span>普通会员返<a
                                                        name="item_11018715483_jifen_xq" href="javascript:;" class="b "
                                                        target="_blank">58</a>云钻</span></p>
                                            <p class="promotion-content mt4" id="yunzuan" style="display: none;"></p>
                                        </li>
                                        <li id="freightfreeTitle" style="display:none;"><label>免运费</label><i
                                                class="i-triangle"></i>
                                            <p class="promotion-content" id="freightfreeBox"></p>
                                        </li>
                                        <li id="govTitle" style="display:none;"></li>
                                        <li id="jnbtTitle" style="display:none;"><label>节能补贴</label><i class="i-triangle"></i>
                                            <p class="promotion-content" id="jnbtBox"></p>
                                        </li>
                                    </ul> <a class="zp-b-img"> <i></i>
                                        <img src="https://product.suning.com/0070119143/11018715483.html" alt=""
                                            has-autoexpo="true">
                                        <div class="zp-title">
                                            <h4 class="txt"></h4>
                                            <p class="price">¥</p>
                                        </div>
                                    </a> <span class="tool-tip zindex22"><i class="a-up-arrow tip-yun"></i></span>
                                    <div class="promo-closeup" style="display: none;"> <span>更多促销<i
                                                class="ng-iconfont"></i></span> </div>
                                    <div class="promo-show" style="display: none;"> <span>收起<i class="ng-iconfont"></i></span>
                                    </div>
                                </dd>
                            </dl>
                        </div> `
                
            }).join('');
             $('#proinfoMain').html(pricehtml + $('#proinfoMain').html());

        });
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

      //点击购物车
     $('.topNav_right').off().on('click','.cart',function(){
        var username = getCookie('username') 
        location.href = 'html/carts.html?username='+username;
    });

    //放大镜
    //移入小图，大图和遮罩出现
    $('#imgZoom').on('mouseover','.imgzoom-main',function() {
        $('.imgzoom-pop').show();
        $('.imgzoom-shot').show().css('opacity',0.5);
    });

    //移出小图，大图和遮罩消失
     $('#imgZoom').on('mouseout','.imgzoom-main',function() {
        $('.imgzoom-pop').hide();
        $('.imgzoom-shot').hide();
    });

    //在小图中移动，出现放大的大图
    $('#imgZoom').on('mousemove','.imgzoom-main',function(ev) {
        //计算magnifier在bigImg里的移动距离
        
        var left = ev.pageX - $('.imgzoom-main').offset().left - $('.imgzoom-shot').width() / 2;
        var top = ev.pageY - $('.imgzoom-main').offset().top - $('.imgzoom-shot').height() / 2;


        //magnifier移动的宽度限制
        if(left < 0) {
            left = 0;
        }
        //magnifier移动距离不能大于 bigImg左边框离body的距离 + bigImg的长度 - magnifier的长度
        if(left > $(this).width() - $('.imgzoom-shot').width()) {
            left = $(this).width() - $('.imgzoom-shot').width();
        }
        //magnifier移动的高度限制
        if(top < 0) {
            top = 0;
        }
        if(top > $(this).height() - $('.imgzoom-shot').height()) {
            top = $(this).height() - $('.imgzoom-shot').height();
        }
        
        $(".imgzoom-shot").css({
            "left": left,
            "top": top
        });

        var pX = left / ($(".imgzoom-main").width() - $(".imgzoom-shot").width())
        var pY = top / ($(".imgzoom-main").height() - $(".imgzoom-shot").height())
        $(".imgzoom-pop img").css({
            "left": -pX * ($(".imgzoom-pop img").width() - $(".imgzoom-pop").width()),
            "top": -pY * ($(".imgzoom-pop img").height() - $(".imgzoom-pop").height())
        });
    });


    //选项卡切换
    $('#imgZoom').on('click','li',function(){
        var _this = $(this).find('img');
        $(this).addClass('current').siblings().removeClass('current');
        $('#bigImg img').attr('src',_this.attr('src'));

    });

    //点击增加数量
    $('.proinfo-main').on('click','.plus',function(){
        var num = $(this).prev('#buyNum').val();
        num++;
        $(this).prev('#buyNum').val(num);
        // console.log(num)
        if( $('#buyNum').val() >= 1){
            $('.minus').removeClass('minus-disable');
        }
    });

    //点击减少数量
    $('.proinfo-main').on('click','.minus',function(){
        var num = $(this).next('#buyNum').val();
        if($('#buyNum').val() <= 1) {
            //当数量少于1，增加禁止选择的类名
            $(this).addClass('minus-disable');
        } else {
            $(this).removeClass('minus-disable');
            num--;
        }
        $(this).next('#buyNum').val(num);
    });







    //点击加入购物车按钮
    $('.proinfo-container').off().on('click','#addCart',function(){
        // console.log($(this));
       

        //获取商品数量、商品gid、商家mcid，传到数据库修改
        //列表页传来gid和mcid存储在data里
        var gamount = $('#buyNum').val();

        //获取商品名称
        var goodsname = $('.proinfo-title h1').html();

        //获取商品价格
        var currentprice = $('.mainprice').text().slice(1,-4);

        //获取大图图片地址
        var image = $('#bigImg img').attr('src');

        var p = new Promise(function(){
            $.ajax({
                type : 'post',
                url : '../api/insert.php',
                data : 'pagetype=information&gamount=' + gamount + '&username=' + username + '&goodsname=' + goodsname + '&currentprice=' + currentprice + '&image='+ image + '&' + data,
                success : function(str){
                    console.log(str);
                    if(str == 'yes'){
                        $('.m-dialog .container').show();
                        $('.m-dialog-overlay .overlay').show();
                    } else {
                        alert('加入购物车失败，请再试一次哦！')
                    }
                }
            });
        });

        var str = 'pagetype=information&gamount=' + gamount + '&username=' + username + '&goodsname=' + goodsname + '&currentprice=' + currentprice + '&image='+ image + '&' + data
        console.log(str)
    });



    //点击加入购物车弹窗的关闭按钮
    $('.m-dialog .container .close').off().click(function(){
        $('.m-dialog .container').hide();
        $('.m-dialog-overlay .overlay').hide();
    });

    //点击到购物车结算按钮
    $('.m-dialog .go-cart').off().click(function(){
        var username = getCookie('username');
        // $(this).attr('href')="carts.html?username"+names;
        location.href = "carts.html?username="+username;
    });





})();