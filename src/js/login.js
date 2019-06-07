/* 
* @Author: Marte
* @Date:   2019-05-17 14:22:36
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-19 14:47:11
*/

(function(){
    //点击账户登录切换
    // console.log($('.login-tab .tab-item').eq(1));
    $('.login-tab .tab-item').eq(1).click(function(){

        $('.login-tab .tab-item').eq(1).addClass('on');
        $('.login-tab .tab-item').eq(0).removeClass('on');
        $('.pc-login').show();
        $('.scan-login').hide();

    });

//点击扫码登录切换
    $('.login-tab .tab-item').eq(0).click(function(){
        $('.login-tab .tab-item').eq(0).addClass('on');
        $('.login-tab .tab-item').eq(1).removeClass('on');
        $('.pc-login').hide();
        $('.scan-login').show();

    });

    //点击短信验证码登录切换登录页面
    $('.username-login .login-switch').click(function(){
        $('.phone-login').show();
        $('.username-login').hide();
    });


    //点击账户密码登录切换登录页面
    $('.phone-login .login-switch').click(function(){
        $('.phone-login').hide();
        $('.username-login').show();
    });
    

    //点击用户名/手机号输入框
    $('.pc-login').on('click','label',function(){
        $(this).hide();
        $(this).prev('input').focus();
        // if($(this).prev('input').attr('id') == "mobileAlias"){
        //     $('#aliasTip').addClass('hide');
        // } else if($(this).prev('input').attr('id') == "smsCode") {
        //     $('#smsCodeTip').addClass('hide');
        // } else if ($(this).prev('input').attr('id') == 'setPsw') {
        //     $('.password-field .suggestion').removeClass('hide');
        //     $('#setPswTip').addClass('hide');
        // }

    });

    //用户名/手机号输入框失去焦点
    $('.pc-login').on('blur','input',function(){
        var val = $(this).val().trim();
        if(val) {
            //输入框非空
        } else {
            //输入框为空
            $(this).next('label').show();
        }


    });

    //点击登录按钮
    $('.pc-login').on('click','.login-submit',function(){
        
        var userCookie = getCookie('username');
        if(userCookie) {
            alert('您已登录，请勿重复登录！');

        } else {
      
            //获取手机号、用户名
            var names = $('#userName').val().trim();
            var psw = $('#password').val().trim();
            var verifyCode = $('#smsCode').val().trim();
            var nametype = null;

            var usernameReg = /^[a-zA-Z\u2E80-\u9FFF\d_-]{6,20}$/
            var userRes = usernameReg.test(names);

            //用正则验证判断是手机号还是用户名还是邮箱
            if(checkReg.email(names)){
                nametype = 'email';
            } else if (checkReg.tel(names)){
                nametype = 'telephone';
            } else if (userRes) {
                nametype = 'username';
            }
            
            if(psw) {//用密码登录
                //发送ajax验证是否存在，匹配成功
                var p = new Promise(function(sucfn){
                    $.ajax({
                        type : 'post',
                        url : '../api/login.php',
                        data : 'do=search&nametype='+nametype+'&password='+psw+'&names='+ names,
                        success : function(str){
                            if(str == 'yes') {
                                setCookie('username', names, 1);
                                // setCookie('password', psw, 1);
                                window.location.href='../1index.html';
                            }
                        }
                    });
                        
                });
                
            } else if(verifyCode){//用验证码登录
                var code = verifyCode.toLowerCase();
                if(code == 'code') {
                    var p = new Promise(function(sucfn){
                        $.ajax({
                            type : 'post',
                            url : '../api/login.php',
                            data : 'do=search&nametype='+nametype+'&names='+ names,
                            success : function(str){
                                if(str == 'yes') {
                                    setCookie('username', names, 1);
                                    window.location.href='../1index.html';
                                }
                            }
                        });
                            
                    });
                }
            }
                
        }
    });




  

})();