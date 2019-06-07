/* 
* @Author: Marte
* @Date:   2019-05-16 11:16:11
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-17 11:52:17
*/

//注册提示遮罩
;(function(){
    $('.msg-field').css('position','relative');
    var $regProtocol = $('.reg-protocol');//注册提示弹窗
    var $agreeBtn =$('.agree-btn');//同意并继续按钮
    var arr = [];//存储验证状态

    $agreeBtn.click(function(){
        $regProtocol.hide();
    });
    $('label.placeholder').click(function(){
        $(this).hide();
        $(this).prev('input').focus();
        if($(this).prev('input').attr('id') == "mobileAlias"){
            $('#aliasTip').addClass('hide');
        } else if($(this).prev('input').attr('id') == "smsCode") {
            $('#smsCodeTip').addClass('hide');
        } else if ($(this).prev('input').attr('id') == 'setPsw') {
            $('.password-field .suggestion').removeClass('hide');
            $('#setPswTip').addClass('hide');
        }

    });
    $('.input-wrapper input').blur(function(){
        var $val = $(this).val().trim();
        var $phone = $('#mobileAlias').val().trim();

        //每个输入框失去焦点时
        if($val){
            //输入框非空

        } else {
            //输入框为空
            $(this).next('label.placeholder').css('display','block');
            // console.log($('#aliasTip').)
        }
        //手机验证码框失去焦点时
        if($(this).attr('id') =="smsCode") {
            if($phone) {
                //如果手机号不为空
                $('#aliasTip').addClass('hide');

            } else {
                //如果手机号为空
                $('#aliasTip').removeClass('hide');
                $('#aliasTip').html('请输入手机号');
            }
        }
    });



    //手机号码框失去焦点
    $('#mobileAlias').blur(function(){
        var $phone = $('#mobileAlias').val().trim();
        if($phone){
            //非空验证
            var reg = /^1[3-9]\d{9}$/;//手机号正则验证
            var res = reg.test($phone);
            
            if(res){
                //手机号正则验证通过
                $('#aliasTip').addClass('hide');
                $('.phone-field .ok').css('display','inline-block');//  √ 出现
                
            } else {
                //正则验证不通过
                $('#aliasTip').removeClass('hide');
                $('#aliasTip').html('请输入正确的手机号');
                $('.phone-field .ok').hide();// √ 隐藏
                arr[0]=0;

            }
        } else {
            //为空
            $('.phone-field .ok').hide();
            arr[0] = 0 ;
        }
    });


    //点击获取随机验证码按钮
    $('#sendSmsCode').click(function(){
        var $phone = $('#mobileAlias').val().trim();
        var p = new  Promise(function(sucfn){
            $.ajax({
                type : 'post',
                url : '../api/register.php',
                data : 'do=search&phoneNum=' + $phone ,
                success : function(str) {
                    // console.log(str);
                    sucfn(str);

                }
            });
        });
        p.then(function(data){
            console.log(data);
            if(data == "no") {
                //已存在手机号，不可以注册
                $("<a href='http://www.baidu.com'>百度</a>");
                var oA = $('<a name="" href="../html/login.html?'+ $phone +'">登录</a>');
                $('#aliasTip').removeClass('hide');
                $('#aliasTip').html('该手机号已存在，您可以使用此手机号直接').append(oA);
                $('.phone-field .ok').hide();
                arr[0] = 0;
            } else {
                //手机号不存在，可以注册
                var code = randomCode();
                $('#sendSmsCode').html(code).css('font-size','20px');
                arr[0] = 1; 
                // $('#randomCodeTip').html(code).removeClass('hide')
                // .css({
                //     'position':'absolute',
                //     'top':'0',
                //     'right':'-90px',
                //     'font-size':'20px',
                //     'font-weight' : '700',
                //     'border':'1px solid #bbb',
                //     'width': '80px',
                //     'line-height': '38px',
                //     'text-align': 'center',
                //     'background': '#f5f5f5',
                //     'margin': '-1px -1px 0 0'
                // });
                           }
        });
        
    });

    //点击验证码输入框
    $('#smsCode').blur(function(){
        var val = $(this).val().trim().toLowerCase();
        var sms = $('#sendSmsCode').html().toLowerCase();
        console.log(val , sms)
        if(val.length >= 4) {
            //验证码长度为4
            if(val == sms) {
                $('#smsCodeTip').html('验证码通过').removeClass('hide').css('color','yellowgreen');
                arr[1] = 1;
            } else {
                $('#smsCodeTip').html('验证码错误，请重新输入').removeClass('hide');
                arr[1] = 0;

            }
        } else {
            //验证码长度小于4位
            $('#smsCodeTip').html('验证码长度为4').removeClass('hide');
            arr[1] = 0;

        }
    });

    var isok = true;
    //点击设置密码
    // $('.password-field .placeholder').click.
    $('#pswSuggestion').click(function(){
        $('.m-lion-dialog .container').show();
    });

    $('#setPsw').on('keyup',function(){
        $('#setPswTip').addClass('hide');
        $('.password-field .suggestion').removeClass('hide');

    });


    //设置密码框失去焦点
    $('#setPsw').blur(function(){
        var val = $('#setPsw').val().trim();
        var res = checkReg.psw(val);
            console.log(res);

        if(res.level == 0){//长度不够，或出现中文等
            $('.password-field').on('click',function(){
                if($(this).attr('id') == 'pswSuggestion'){
                    $('.m-lion-dialog .container').show();
                    $('#setPswTip').addClass('hide');
                }
                else {
                // console.log($(this))
                    $('.password-field .suggestion').addClass('hide');
                    $('#setPswTip').removeClass('hide').html("请输入正确密码");
                    arr[2] = 0;
                }

            });
        }             
            
        if (res.level == 1) {//密码等级：弱
            $('.password-field .suggestion').addClass('hide');
            $('#setPsw_rank').removeClass('hide');
            $('#setPsw_rank .level1').css('background','#fa0');
            $('#setPswTip').addClass('hide');
            arr[2] = 1;
            
        } else {
            $('#setPsw_rank .level1').css('background','#cacaca');
        }

        if(res.level ==2 ) {//密码等级：中
            // tips.children[0].style.background= "yellowgreen";
            // tips.children[1].style.background= "yellowgreen";
            $('.password-field .suggestion').addClass('hide');
            $('#setPsw_rank').removeClass('hide');
            $('#setPsw_rank .level1').css('background','#fa0');
            $('#setPsw_rank .level2').css('background','#fa0');
            $('#setPswTip').addClass('hide');
            arr[2] = 1;

        } else {
            $('#setPsw_rank .level2').css('background','#cacaca');
        }

        if (res.level ==3 ) {//密码等级：强
            $('.password-field .suggestion').addClass('hide');
            $('#setPsw_rank').removeClass('hide');
            $('#setPsw_rank .level1').css('background','#fa0');
            $('#setPsw_rank .level2').css('background','#fa0');
            $('#setPsw_rank .level3').css('background','#fa0');
            $('#setPswTip').addClass('hide');
            arr[2] = 1;
        } else {
            $('#setPsw_rank .level3').css('background','#cacaca');
        }
    });


    //点击X关闭密码建议的遮罩
    $('.m-lion-dialog .close').click(function() {
        $('.m-lion-dialog .container').hide();
    });


    //点击提交注册按钮
    $('#save').click(function(){
        var $phone = $('#mobileAlias').val().trim();
        var $psw = $('#setPsw').val().trim();

        var p = new Promise(function(sucfn){
            $.ajax({
                type : 'post',
                url : '../api/register.php',
                data : 'do=search&phoneNum=' + $phone ,
                success : function(str) {
                    // console.log(str);
                    if(str == 'yes') {
                        sucfn(str);
                    } else {
                        arr[0] = 0;
                        alert('您已经注册过了，请勿重复注册！')
                    }

                }
            });
        });
        p.then(function(data){
            var res = arr.every(function(item) {//返回布尔值，全部都是1才为真
                return item == 1;
            });
            console.log(arr);
                
            //都通过才能跳转
            if(res && arr.length == 3) {
                var p1 = new Promise(function(sucfn){
                    $.ajax({
                        type : 'post',
                        url : '../api/register.php',
                        data : 'do=insert&phoneNum=' + $phone + '&password=' + $psw,
                        success : function(data) {
                            // console.log(str);
                            // console.log(data);
                            sucfn(data);
                        }
                    });

                });
                p1.then(function(data){
                    var arr = JSON.parse(data);//处理后端传来的数据
                    console.log(arr);
                    if(arr.boolean) {
                        alert('您已注册成功！');
                        window.open('login.html?phoneNum='+arr.phoneNum);
                    }
                });
                arr=[];
                
            }else{
                alert('请完善信息');
            }

        });
    
    });


    
})();