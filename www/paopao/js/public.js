//var url = "http://web-lhk.prosysoft.com/openapi/";
var url = "http://paopao.prosysoft.com:8200/openapi/";
var imgUrl = "http://paopao.prosysoft.com:8200/";
var dataType = "jsonp";
;$(function(){
	var header = $("#header");
	var header2 = $("#header2");
	var footer = $("#footer");
	//动态加载header
 	if(header){
 		var way = "header.html";
		$("#header").load(way,function(responseTxt,statusTxt,xhr){
		  if(statusTxt=="success"){
		  	var rel = $(this).attr("rel");
		  	
		  	if(rel=="0"){//不加载某些内容
		  		$(this).find(".ul-nav").addClass("hide");
		   	}
		  }else if(statusTxt=="error"){
		    alert("Error: "+xhr.status+": "+xhr.statusText);
		  }
		});
 	}
 	//加载个人中心的header
 	if(header2){
 		var way = "header2.html";
		$("#header2").load(way,function(responseTxt,statusTxt,xhr){
		  if(statusTxt=="success"){
		  	var rel = $(this).attr("rel");
		  	var txt = $(this).attr("txt");
		  	$(".header-text").html(txt);
		  	if(rel=="0"){//不加载某些内容
		  		$("#barToggle").hide();
		   	}
		  }else if(statusTxt=="error"){
		    alert("Error: "+xhr.status+": "+xhr.statusText);
		  }
		});
 	}

 	//动态加载footer
 	if(footer){
 		var pcenter = footer.attr("data");
 		var way = "footer.html";
		$("#footer").load(way,function(responseTxt,statusTxt,xhr){
		  if(statusTxt=="success"){
		  	var rel = $(this).attr("rel");
		  	if(rel=="0"){//不加载友情链接的3块内容
		      $("#ft").addClass("hide")
		   	}
		  }else if(statusTxt=="error"){
		    alert("Error: "+xhr.status+": "+xhr.statusText);
		  }
		});
	}
 /*---------选项卡 ------------*/
  //tabTree(".change a",".login");
  function tabTree(menu,content){
     $(menu).click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        var idx = $(this).index();
        $(content).siblings(content).css("display","none").eq(idx).css("display","block");
     }).first().trigger("click");
  }
  function tabTree2(menu,content){
     $(menu).click(function(){
        $(this).addClass("on").siblings().removeClass("on");
        var idx = $(this).index();
        $(content).siblings(content).css("display","none").eq(idx).css("display","block");
     }).eq(1).trigger("click");
  }
	/*---------选项卡---------- */

	/*泡泡模式悬窗*/
	$('.parttenFixClose').click(function(){
		$(this).parent().remove();
	});
	 $(document).on("click","#barToggle",function(){
    	$(this).next("ul").toggle();
    });
});

/**
  * [send description]
  * @param  {[type]} account [手机号码]
  * @param  {[type]} obj     [发送验证码按钮]
  * @param  {[type]} sendType  00:注册，01:忘记密码，02:解绑手机，03:绑定手机，04:第三方登录
  * @return {[type]}         [description]
*/

  function send(mobile,obj,sendType){
     var time = 60;
     var rel = obj.attr("rel");
     if(rel==0){
         var clr = setInterval(function(){
              time--;
              if(time>0){
              	 obj.html(time+"秒后重发").addClass('resend').attr("rel",1);
                  //这里先执行短信发送的代码
                  if(time==59){
                      $.ajax({
                        type:"POST",
                        url:url+"user/getSmsCode.json",
                        dataType: 'jsonp',
                        data: {mobile:mobile,sendType:sendType,platformName:""},
                        beforeSend:function(){
                          obj.addClass('resend');
                        },
                        success: function (data) {
                            var str = '';
                            if(data.respCode!="0000"){
                            	alert(data.respMsg);
                            }
                        },
                        complete:function(){
                          obj.removeClass('resend');
                        },
                        error:function(){}
                     });
                  }
              }else{
                  obj.html("重新发送").removeClass('resend').attr("rel",0);
                  clearInterval(clr);
              }

          }, 1000);
     }
  }
  //计算一个日期字符串与当前日期相差值
//输入的参数形式如：2012-12-12 12:12:12
//返回相差值的字符串
function GetDateDiff(datetime)
{
// 可以将2012 - 12 - 12 12 : 12 : 12字符串转为JS中的时期对象,
// 因为默认情况下只把持2000 / 05 / 05这样形式的字符串转为时间对象
var dateBegin = new Date(datetime.replace(/-/g, "/"));
var dateEnd = new Date();
var dateDiff = dateEnd.getTime() - dateBegin.getTime();
// 计算相差的天数
var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算相差的天数
var hourleft = Math.floor(dateDiff / (3600 * 1000)); //计算相差的小时数
var minuteleft = Math.floor(dateDiff / (60 * 1000)); //计算相差的分钟数
var returnstr = "";
if(dayDiff > 5) //前天以前就直接返回时间字符串
{
    return datetime;
}
else if (hourleft>=24)
{
    returnstr += dayDiff+"天前 ";
}
else if (hourleft>=1)
{
    returnstr += hourleft+"小时前 ";
}
else if (minuteleft>=1)
{
    returnstr += minuteleft+"分钟前 ";
}
else
{
    if (Math.floor(dateDiff / 1000)<0)
    {
        returnstr += "1秒前 ";
    }
    else
    {
        returnstr += Math.floor(dateDiff / 1000) +"秒前 ";
    }
}
return returnstr;
}
//获取url后的参数
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
//手机号码验证函数
function isMobilePhone(obj){
    var partten = /^1(3|4|5|8)\d{9}$/;
    if(partten.test(obj)){
        return true ;
    }else{
        return false ;
    }
}
//邮箱格式验证
function checkEmail(temp)
{
    var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
    if (!pattern.test(temp)) {
        return false;
    }
    return true;

}
//本地存储
var storage = window.sessionStorage;
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


//质疑视频
function zyPaoPao(vidioId,content){
	$.ajax({
		type:"post",
		dataType:dataType, 
		url:url+"video/addQuestion.json",
		data:{vidioId:vidioId,content:content},
		success:function(data){
			if(data.respCode=="0000"){
				alert("质疑内容已经提交...");
				$(".mask").addClass("hide");
			}else{
				alert(data.respMsg);
			}
		}
	});
}
//设置分页
function setPage(data,pagenum,pagesize){

	if(data.records.length==0){
		$(".noData").removeClass("hide");
		$(".page").addClass("hide");
	}else{
		if(data.rows>pagesize){
			$(".page").removeClass("hide").attr("data",data.pages);
		}else{
			$(".page").addClass("hide").attr("data",data.pages);
		}
		$(".noData").addClass("hide");
		$(".page .count").html("总数："+data.rows+"条");
		$(".page .curPage").html("当前："+pagenum+"/"+data.pages+"页");
		$(".page a[rel=1]").attr("data",data.pages);
	}
}
//分页
function goPage(func,pagenum,pagesize){
	//console.log(getMypaopao(4,10));
	$(".page a[rel]").click(function(e){
		var pages = $(".page").attr("data");
		var rel = $(this).attr("rel");
		if(rel=="0"){
			pagenum = 1;
		}else if(rel=="prev"){
			if(pagenum>1){
				pagenum--;
			}
		}else if(rel=="next"){
			if(pagenum < pages){
				pagenum++;
			}
		}else if(rel=="1"){
			pagenum = pages;
		}
		eval(func+'('+pagenum+','+pagesize+')');
	});
	//分页go
	$("#go").click(function(){
		pagenum = $("#pageGo").val();
		eval(func+'('+pagenum+','+pagesize+')');
	});
}
//左右两侧广告图片
function ad(position){
	$.ajax({
		type:"post",
		dataType:dataType,
		url:url+"advert/getAdvertInfo.json",
		data:{position:position},
		success:function(data){
			console.log(data);
			$.each(data.records,function(idx,el) {
				if(el.position=="00"){
					$(".parttenFix .imgleft").attr("src",imgUrl+el.adImage);
					$(".parttenFix-l").removeClass("hide");
				}
				if(el.position=="03"){
					$(".parttenFix .imgleft").attr("src",imgUrl+el.adImage)
					$(".parttenFix-l").removeClass("hide");
				}
				if(el.position=="01"){
					$(".parttenFix .imgright").attr("src",imgUrl+el.adImage)
					$(".parttenFix-r").removeClass("hide");
				}
				if(el.position=="04"){
					$(".parttenFix .imgright").attr("src",imgUrl+el.adImage)
					$(".parttenFix-r").removeClass("hide");
				}
			});
		}
	});
}

//个人中心推荐视频
function tjVideo(){
	$.ajax({
		type:"post",
		dataType:dataType, 
		url:url+"video/hotVidios.json",
		data:{count:"4"},
		success:function(data){
			var str = '';
			$.each(data.records, function(idx,el) {
				str += '<li>';
				str += '		<img src="'+imgUrl+el.vidioPic+'" />';
				str += '		<a class="autoPlay" href="navOneDetail.html?vidioId='+el.id+'"></a>';
				str += '		<p>'+el.description+'</p>';
				str += '</li>';
			});
			$(".myBubble-bot-con ul").html(str);
		}
	});	
}
/*查询当前绑定状态*/
identify();
function identify(){
	var identify = $.cookie("identify");
	if(identify!="1"){
		$.ajax({
		    type:"POST",
		    url:url+"user/getMemberInfo.json",
		    dataType: dataType,
		    data: {},
		    success: function (data) {
		    	console.log(data);
		        if(data.memberInfo.isRealName=="2"){
					$.cookie("identify","1");
		        }else{
		        	$.cookie("identify","0");
		        }
		    }
		});
	}
}
		