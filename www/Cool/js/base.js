/**
 * Created by Administrator on 2016/6/28.
 */
window.api={
   changeUrl: "http://cool.pccb.com"
}
/*var changeUrl = "http://cool.pccb.com";*/
$(function(){
    $("#header").load("header.html");
    $("#footer").load("footer.html");
    //头部资金
    $.ajax({
        url:window.api.changeUrl+'/frontapi/gettotalmoney',
        type: 'POST',
        dataType: 'json',
        data:{},
        success: function(data){//console.log(data);
            $('.subMoney').html(data.total);
            $('.accMoney').html(data.dividends);
        }
    });

    //登录弹出层
    $(" #nav .log-reg .login").click(function(event) {
        $(".login-bg,.login-pop").show();
    });
    $(" #login").click(function(event) {
        $(".login-bg,.login-pop").show();
    });
    $("#nav .log-reg .reg").click(function(event) {

        window.location.href="register.html";
    });
    $(".con .reg-btn").click(function(event) {

        window.location.href="register.html";
    });

    $(".login-pop .con .close").click(function(event) {
        $(".login-bg,.login-pop").hide();
    });


    //用户登录
    $('.con .login-btn').click(function () {
        var $tips=$('.tips:visible');
        console.log($tips.length);
        if($tips.length>0){
         return
         }
        console.log(2);
        console.log(window.api.changeUrl+"/frontapi/dologin");
        var $this = $(this);
        var redirect = $this.data("redirect");

        $.ajax({
            url:window.api.changeUrl+"/frontapi/dologin",
            type:'POST',
            dataType:'json',
            data:{username:$('.username').val(),password:$('.password').val()},
            beforeSend:function () {

            },

            success:function (data) {
                console.log(data);
                if(data.status==1){
                    $.cookie("userid", data.uid);
                    alert("恭喜您，登录成功！");
                    document.location.href="pCenter1.html";
                }else {
                    alert(data.message)
                }
            }
        })
    });




    //登录用户名校验
         //邮箱校验
    var $userName = $('.username');
    console.log($userName);
    var tips = $userName.prev(".tips")
    $userName.blur(function (event) {
        var userName= $userName.val();
        if(!userName){
            tips.show().html("空");
            // var tips=$("<span style='color: red;'/>",{text:"空"})
            // $userName.before(tips);
            return
        }
        if(!validEmail(userName)){
            tips.show().html("不合法")
            return
        }
    }).focus(function (event) {
        tips.hide();
    })



    //登录密码校验
    var $password = $('.password');
    var passwordTips = $password.prev('.tips');
    $password.blur(function (event) {
        var  passWord = $password.val();
        if(!passWord){
            passwordTips.show().html("空");
            return
        }
        if(!validPassword(passWord)){
            passwordTips.show().html("不合法");
            return
        }
    }).focus(function (event) {
        passwordTips.hide();
    })

});




//截取网页后缀参数
function request(paras)
{
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}


//cookie
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
/*var userid=sessionStorage.getItem("userid");*/
var userid=$.cookie("userid");
//删除所有cookies
function clearCookie(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }
}

//邮箱格式验证
function validEmail(val) {
    if (!(/^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(val))) {//  /^0?[1][34578][0-9]{9}$/i
        return false;
    }
    return true;
}

//密码格式验证
function validPassword(val) {
    var pa=/^[a-zA-Z0-9]{6,20}$/;
    if(!pa.test(val)){
        return false;
    }
    return true;
}




