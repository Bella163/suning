/* 
* @Author: Marte
* @Date:   2019-05-12 19:56:43
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-13 21:33:50
*/


// 限时购
(function(){
        
        var nowday = null;
        var getTime =null;
        var times = null;
        var $time = $('#saleBox .sale_head .time');
            // console.log(num)
        var timer = setInterval(time1,1000);
        var timer1 = setInterval(tabTimeChange,3600000);

        //tab-list的 “XX场-即将开抢” 内容渲染
        function tabTimeChange() {
            var hour = new Date().getHours(); 
            var nowday = new Date();//创建日期

            if(hour>=0 && hour < 10) {
                times = nowday.setHours(10,0,0);
                tabList('00',10,12);

            } else if (hour >= 10 && hour < 12){
                times = nowday.setHours(12,0,0);
                tabList(10,12,14);

            } else if (hour >= 12 && hour < 14) {
                times = nowday.setHours(14,0,0);
                tabList(12,14,18);

            } else if (hour >= 14 && hour < 18) {
                times = nowday.setHours(18,0,0);
                tabList(14,18,20);

            } else if (hour >= 18 && hour < 20){
                times = nowday.setHours(20,0,0);
                tabList(18,20,22);

            } else if (hour >= 20 && hour < 22) {
                times = nowday.setHours(22,0,0);
                tabList(20,22,00);

            } else if (hour >= 22){
                times = nowday.setHours(24,0,0);
                tabList(22,'00',10);

            }
        }
        tabTimeChange();

        //倒计时渲染time
        function time1() {
            var hour = new Date().getHours(); 
            var nowday = new Date();//创建日期
            var getTimes= nowday.getTime();//获取当前时间
            // console.log(getTimes);
            //1.设置某点的时间戳
            if(hour>=0 && hour < 10) {
                times = nowday.setHours(10,0,0);
            } else if (hour >= 10 && hour < 12){
                times = nowday.setHours(12,0,0);

            } else if (hour >= 12 && hour < 14) {
                times = nowday.setHours(14,0,0);

            } else if (hour >= 14 && hour < 18) {
                times = nowday.setHours(18,0,0);

            } else if (hour >= 18 && hour < 20){
                times = nowday.setHours(20,0,0);

            } else if (hour >= 20 && hour < 22) {
                times = nowday.setHours(22,0,0);

            } else if (hour >= 22){
                times = nowday.setHours(24,0,0);

            }
            // times = nowday.setHours(num,0,0);
            // console.log(times)

            let gaptime = times - getTimes;//times和当前时间的时间差
            // console.log(transtime(gaptime),333);

            let hours=parseInt(gaptime/(1000*60*60)); //距离times的小时差
            let mins=parseInt(gaptime%(1000*60*60)/(1000*60));
            //距离times的分钟差
            let secs =parseInt((gaptime%(1000*60))/1000);//距离times的秒数差
            // console.log(hours,mins,secs,1111)
            var html = `<span class="hour">${toDb(hours)}</span><i>:</i>
                        <span class="min">${toDb(mins)}</span><i>:</i>
                        <span class="sec">${toDb(secs)}</span>`
            $time.html(html);
        }

        //tab_list渲染函数
        function tabList(time1,time2,time3){
            var html = `<li class="cur">${time1}:00场-正在疯抢</li>
                        <li class="">${time2}:00场-即将开抢</li>
                        <li class="">${time3}:00场-即将开抢</li>`
            $('#saleBox .tab-list ul').html(html);
        }
        time1();

    //tab切换
    $("#saleBox .tab-list ul li").mouseover(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        var index = $(this).index();
        number = index;
        $('#saleBox .tab_area ul').hide();
        $('#saleBox .tab_area ul:eq('+number+')').show();

    });


    //移入tab-list和左右按钮显示左右按钮
    var $leftpointer = $('#saleBox .tab_area .left-pointer');
    var $rightpointer = $('#saleBox .tab_area .right-pointer');
    $('#saleBox .tab_area ul.cur,#saleBox .tab_area .pointer').hover(function() {
        $('#saleBox .tab_area .pointer').show();
    }, function() {
        $('#saleBox .tab_area .pointer').hide();
    });

    // 移入tab_list，p.title改变字体颜色
    $("#saleBox .tab_area ul li").hover(function(){
        var index = $(this).index();
        number = index;
        $('#saleBox .tab_area p.title:eq('+number+')').css('color','#f60')
    },function(){
        var index = $(this).index();
        number = index;
        $('#saleBox .tab_area p.title:eq('+number+')').css('color','#333');
    });

    //点击左右按钮切换
    $rightpointer.click(function(){
        next();
    });

    // var $tabUl = $('#saleBox .tab_area ul.cur');

})();

