

// topNav滑过出现下拉菜单
(function(){



/////////////////////////////        只设置了一次事件，但重复出现两次BUG      ////////////////////

    //初始化页面
    function init(){
    //获取cook{ie
        var username = getCookie('username');//获取cookie用户名

        //隐藏中间4位数字
        if(username){
            var names = username.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
            $('.topNav_right .login2').show();

            $('.topNav_right .login2 .nametip').html(names);
            $('.topNav_right .login1').hide();
        } else {
            $('.topNav_right .login1').show();
            $('.topNav_right .login2').hide();

        }
    }

    init();

    //点击退出登录按钮
    $('.topNav_right .logout').click(function(){
        setCookie('username',0,-1);

        init();
    });
    
    //点击请登录按钮
    
////////////////////////////////////////////////////////////////////
    
//////////////////    解除两次点击事件    ///////////////////////////
    $('.topNav_right .login1').unbind('click');


////////////////////////////////////////////////////////////////////


    $('.topNav_right .login1').click(function (event){
        window.open('html/login.html');
        // event.stopPropagation()
        
    });

    //点击购物车
    $('.topNav_right').off().on('click','.cart',function(){
        var username = getCookie('username') 
        location.href = 'html/carts.html?username='+username;
    });


    //点击搜索
    $('#logo .searchbtn').unbind('click');
    
    $('#logo .searchbtn').click(function(){
        var word = $('#logo .searchText').val().trim();
        window.open("html/list.html?keyword="+word);
    });







    //topNav左边导航栏

    var $topNavweb = $('.topNav_left>li:nth-of-type(2)');//topNav的网站导航li
    var $xialaIcon = $('.topNav_left>li:nth-of-type(2) i');//下拉图标i
    var $topWeb_Ul = $('.topNav_left>li:nth-of-type(2),.topNav_left_webguild');//一级导航网站导航li和对应的二级导航ul
    var $topNavMerchant = $('.topNav_left>li:nth-of-type(3)');//topNav的商家入驻li
    var $topNavServe = $('.topNav_left>li:nth-of-type(4)');//topNav的客户服务li
    var $topMerchant_Ul = $('.topNav_left>li:nth-of-type(3),.topNav_left_merchant');//一级导航商家入驻li和对应的二级导航ul
    var $topServe_Ul = $('.topNav_left>li:nth-of-type(4),.topNav_left_serve');//一级导航商家入驻li和对应的二级导航ul

    $topNavweb.click(function(){
        ulBlock($topNavweb,$('.topNav_left_webguild'));
    });
    //hover网站导航和二级导航的ul，使ul出现或消失
    $topWeb_Ul.hover(function(){
        hoverBlock($topNavweb,$('.topNav_left_webguild'));
    },function(){
        hoverNone($topNavweb,$('.topNav_left_webguild'));
    });

    //点击商家入驻，使ul出现或消失
    $topNavMerchant.click(function(){
        ulBlock($topNavMerchant,$('.topNav_left_merchant'));
    });
    //hover商家入驻和二级导航的ul，使ul出现或消失
    $topMerchant_Ul.hover(function(){
        hoverBlock($topNavMerchant,$('.topNav_left_merchant'));
    },function(){
        hoverNone($topNavMerchant,$('.topNav_left_merchant'));
    });

    //点击客户服务，使ul出现或消失
    $topNavServe.click(function(){
        ulBlock($topNavServe,$('.topNav_left_serve'));
    });
    //hover客户服务和二级导航的ul，使ul出现或消失
    $topServe_Ul.hover(function(){
        hoverBlock($topNavServe,$('.topNav_left_serve'));
    },function(){
        hoverNone($topNavServe,$('.topNav_left_serve'));
    });

    function ulBlock($li,$ul) {
        var res = $ul.css('display');
        if(res == 'block'){
            $li.css('background','#F5F5F5');
            $li.css({'border':'0 none'});
            $ul.hide().css('z-index','0');
        } else {
            $li.css('background','#fff');
            $li.css({'border':'1px solid #ccc'});
            $li.css({'borderBottom':'1px solid #FFF'});
            $ul.show().css('z-index','5');
        }
    }
    function hoverBlock($li,$ul){
        $li.css('background','#fff');
        $li.css({'border':'1px solid #ccc'});
        $li.css({'borderBottom':'1px solid #FFF'});
        $ul.show().css('z-index','5');
        $xialaIcon.addClass('iconfont, iconshang');
        $xialaIcon.removeClass('iconfont, iconxiala');
    }
    function hoverNone($li,$ul){
        $li.css('background','#F5F5F5');
        $li.css({'border':'0 none'});
        $ul.hide().css('z-index','0');
        $xialaIcon.addClass('iconfont, iconxiala');
        $xialaIcon.removeClass('iconfont, iconshang');
    }
})();

//滑动超过XXXpx，出现吸顶菜单

(function(){
    var gwc = document.querySelector('.topNav_right > li:nth-of-type(6)');//顶部购物车下拉菜单
    var topsearch = document.querySelector('#logo .logo_r .topsearch');//logo处的搜索框
    var indexAllHook = document.querySelector('.index-all-hook');//全部分类a标签
    var dacuListWrapper = document.querySelector('#topbox .side_nav .index-sort .dacu-list-wrapper');//分类侧栏
    var ngFixBar = document.querySelector('.ng-fix-bar');//吸顶菜单的背景
    var tabContent = document.querySelector('#saleBox .tab_area')//限时购买的内容框，不包括标题

    // var ih = tabContent.clientY;
    var ih = getPos(tabContent).top;
    document.onscroll = function(){
    var scrollTops = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrollTops)
        if(scrollTops > ih) {
            indexAllHook.style.position = 'fixed';
            gwc.classList.add('gwc');
            topsearch.classList.add('ts_act');
            ngFixBar.style.display = "block";
            indexAllHook.onmouseover = dacuListWrapper.onmouseover = function() {
                dacuListWrapper.classList.add('dacu_act');
            }
            indexAllHook.onmouseout = dacuListWrapper.onmouseout = function() {

                dacuListWrapper.classList.remove('dacu_act');
            }
        } else {
            gwc.classList.remove('gwc');
            topsearch.classList.remove('ts_act');
            indexAllHook.style.position = 'relative';
            ngFixBar.style.display = "none";
            dacuListWrapper.classList.remove('dacu_act');


        }
    };
    // console.log(ih)
    function getPos(obj){
        var l=t=0;
        while(obj){
            //for(;obj;){
            //找    累加 l
            l+=obj.offsetLeft; //取到定位父级的距离
            t+=obj.offsetTop;  //取到定位父级的距离
            obj=obj.offsetParent;  //把obj的定位父级变成obj

        }
        return {left:l,top:t};
    }
})();

//回到顶部
(function(){
    var goTop = document.querySelector('#shopcart li:last-child');//回到顶部按钮

    goTop.onclick = function(){
        window.scrollTo(0, 0);
    }
})();

//main_banner轮播图
(function(){
    var box = document.getElementById('box');
    var imglist = box.children[0];
    var light = box.children[1];
    var posibtn = box.children[2];
    var lis = imglist.getElementsByTagName('li');
    var prevbtn = posibtn.children[0];
    var nextbtn = posibtn.children[1];
    var iw = lis[0].offsetWidth;
    var now = 0;//记录第几张图

    //把图片放在右边
    for(var i = 0; i < lis.length; i++){
        lis[i].style.left = iw + "px";
    }
    lis[0].style.left = 0;
    
    //图片自动轮播
    
    timer = setInterval(next, 5000);
    //设置了按钮为next，这里又用next做函数名，会报错Unexpected identifier   [object HTMLParagraphElement]

    function next () {
        //旧图挪走
        startMove(lis[now], {
            'left': -iw
        });
        //新图进来
        now++;
        if(now >= lis.length) {
            now = 0;
        }
        lis[now].style.left = iw + 'px';//快速把图放到右边
        startMove(lis[now], {
            'left' : 0
        });
        lightmove();//焦点跟随
    }

    function prev () {
        //旧图出去
        startMove(lis[now], {
            'left' : iw
        });
        now--;
        if(now < 0) {
            now = lis.length - 1;
        }
        lis[now].style.left = -iw + 'px' ;//快速把图放到左边
        startMove(lis[now], {
            'left' : 0
        });
        lightmove();//焦点跟随
    }

    //鼠标移进去，轮播暂停
    box.onmouseover = function(){
        clearInterval(timer);
    }//onmouseover 如果写成onmouseenter ，使得onmouseenter和onmouseout搭配，定时器会叠加，速度加快
    box.onmouseout = function(){
        timer = setInterval(next, 5000);
    }
    nextbtn.onclick = function(){
        next();
    }
    prevbtn.onclick = function(){
        prev();
    }

    //生成节点
    var html = "";
    for(var i  = 0;i < lis.length; i++){
        html +=  `<span></span>`
    }
    light.innerHTML = html;
    light.children[0].className = "active";

    function lightmove(){
        //排他
        for(var i  = 0; i < lis.length; i++){
            light.children[i].className = '';
        }
        light.children[now].className = "active";
    }
    for(let i = 0; i < light.children.length; i++){
        light.children[i].onclick = function(){
            if(i < now) {
                startMove(lis[now] ,{
                    'left': iw
                });//旧图移走
                // 新图进入前的准备，快速放到左侧
                lis[i].style.left = -iw + 'px';
            }
            if(i > now) {
                startMove(lis[now],{
                    'left': -iw
                });
                 // 新图进入前的准备，快速放到右侧
                lis[i].style.left = iw + 'px';
            }
            startMove(lis[i], {
                'left' : 0
            });
            now = i;
            lightmove();
        }
    }
})();

//main_banner轮播图上的手风琴效果
(function(){
    var $fourHc = $('.four-hc');//获取four-hc模块
    var $animateHc = $('.animate-hc');//获取animateHc模块
    var $four_animate = $('.four-hc,.animate-hc');//获取four-hc和animateHc模块
    var $fourHcLis = $('.four-hc>ul>li');//获取fourHc模块下的li
    var $animateHcLis = $('.animate-hc>ul>li');//获取animateHc模块下的li

    //hover  animateHc的li出现手风琴效果
    $animateHc.hover(function(){
        $fourHc.css('display','none');
        $animateHc.css('display','block');
    },function(){
        $animateHc.css('display','none');
        $fourHc.css('display','block');
    });
    //hover  fourHc的li出现手风琴效果
    $fourHcLis.on("mouseenter mouseleave",function (ev){
        if(ev.type == "mouseenter"){
            var $index = $(this).index();
            // alert($index)
            // $animateHcLis.eq($index).
            $animateHc.css('display','block');
            $animateHcLis.eq($index).css({'width':'655px'});
            $animateHcLis.eq($index).siblings().css({'width':'55px'});
            $animateHcLis.eq($index).find('.label').css('display','none');
            $animateHcLis.eq($index).find('.zhc').css('display','block');

        } else if(ev.type == "mouseleave"){
         
            var $index = $(this).index();
            $animateHc.css('display','none');
            $animateHcLis.eq($index).css({'width':'53px'})
            $animateHcLis.eq($index).find('.label').css('display','block');
            $animateHcLis.eq($index).find('.zhc').css('display','none');
        }
    });

    //hover   animateHc的li出现手风琴效果
    $animateHcLis.hover(function(){
        $(this).css({'width':'655px'})
        $(this).siblings().css({'width':'55px'});
        $(this).find('.label').css('display','none');
        $(this).find('.zhc').css('display','block');
    },function(){
        $(this).css({'width':'53px'})
        $(this).find('.label').css('display','block');
        $(this).find('.zhc').css('display','none');

        // $(this).siblings().css({'width':'55px'});
    });
})();

//top_sideAd右侧栏头条滚动
(function(){
    var $toutiao = $('.toutiao');//top_sideAd中第一个头条ul
    var $toutiaoLis = $('.toutiao ul li');//top_sideAd的ul中的li
    var ih = $toutiaoLis.css('height').slice(0,-2);//头条li的高度
    $('.toutiao').Marquee({
        distance: ih, //每次移动50px,两条文字的高度
        time: 3, //延时时间3秒
        direction: 'up' //方向
    });
})();


//必抢清单的轮播切换
(function(){

    banner('.qd-area','.content');
    banner('.phb-area','.jx-comm-list');
    function banner(cln1,cln2) {
        // console.log(cln1,cln2)

        let qd = cln1;
        let cont =cln2;
        // console.log(qd,cont)
        let $qdArea = $(qd)
        let $banner = $qdArea.find(cont);

        // let banner = document.getElementsByClassName('banner')[0];
        let $ul = $banner.children().eq(0);
        let ul = document.querySelector(cln1 + ' ' + cln2).children[0];

        // 初始化
        let index = 0;

        // 无缝滚动关键1：把第一张复制到最后
        let len = $ul.children().size();
        // $ul.append($ul.children().eq(0).clone(true,true));


        // 设置ul宽度，实现水平排列效果
        let $width = $banner.css('width').slice(0,-2)*len + 'px'
        let $bwidth = $banner.css('width').slice(0,-2);
        // ul.style.width = banner.clientWidth * len + 'px';

        // 添加分页
        let pager = document.createElement('div');
        pager.className = 'pager';
        for(let i=0;i<len-1;i++){
            let a = document.createElement('a');

            if(i===index){
                a.className = 'current';
            }
            a.name = i;

            pager.appendChild(a);
        }
        // let $black = $qdArea.find('.black');
        // $black.append(pager);

        //找到左右按钮
        let $btnPrev = $qdArea.find('.left-pointer');
        let $btnNext = $qdArea.find('.right-pointer');
        let $pointer = $qdArea.find('.pointer');



        let timer = setInterval(autoPlay,5000);

        // 鼠标移入移除
        $banner.hover(function(){
            clearInterval(timer);
            $pointer.css('display','block');
        },function(){
            timer = setInterval(autoPlay,3000);
            $pointer.css('display','none');

        });
        $pointer.hover(function(){
            // clearInterval(timer);
            $pointer.css('display','block');
        },function(){
            // timer = setInterval(autoPlay,3000);
            $pointer.css('display','none');

        });

        $banner.on('click','.pager',function(){
            // 点击分页切换
            // 修改index值为当前分页数字-1
            index = $(this).attr('name');
            
            show();
        });
            

        $banner.on('click','.left-pointer',function(){
            // 上一张，下一张
            index = $(this).parent(cont).find('.pager .current').attr('name');
            index--;
        
            show();
        });
            

        $banner.on('click','.right-pointer',function(){
            index = $(this).parent(cont).find('.pager .current').attr('name');
            index++;
            show();
            
        });


        function autoPlay(){
            index++;
            show();
        }


        function show(){
            if(index>=len){
                // 无缝滚动关键2：当滚动到复制那张图片时，瞬间重置回初始状态，并把index改成1
                ul.style.left = 0;
                index = 0;
            }else if(index<0){
                index = len-2;
            }

            startMove(ul,{left:-index*$bwidth});

            for(let i=0;i<len-1;i++){
                pager.children[i].className = ''
            }

            if(index===len-1){
                pager.children[0].className = 'current';
            }else{
                pager.children[index].className = 'current';
                
            }
        }
    }
})();




