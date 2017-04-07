$(function(){
	$("#tog").click(function(){
		var rel = $(this).attr("rel");
		if(rel=="0"){
			$(this).find("img").attr("src","images/toggle1.png")
			$("#togCon>ul").hide();
			$("#togCon>div").show();
			$(this).attr("rel","1");
		}else{
			$(this).find("img").attr("src","images/toggle.png")
			$("#togCon>ul").show();
			$("#togCon>div").hide();
			$(this).attr("rel","0");
		}
	});
	$(".triangle").click(function(){
		$(this).closest("div").next().toggle();
	});
});
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
/*复制功能*/
function copy(obj) 
{ 
  var Url2=$(obj).prev(); //只能是input或者textarea
  Url2.select(); // 选择对象 
  document.execCommand("Copy"); // 执行浏览器复制命令 
  alert("已复制好，可贴粘。"); 
} 
//s 代表金额，n 代表保留小数位数
function fmoney(s, n) { 
	var ss = s;
	if(s < 0){
		s = Math.abs(s);
	}
	var num = n;
	n = n > 0 && n <= 20 ? n : 2;  
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";  
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];  
	t = "";  
	for (i = 0; i < l.length; i++) {  
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");  
	}  
	if(ss < 0){
		if(num == 0){
			return "-"+t.split("").reverse().join("");
		}
	}
	if(num == 0){
		return t.split("").reverse().join("");
	}
	
	return t.split("").reverse().join("") + "." + r;  
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

/**
 * [setPage description]
 * @param {[type]} pagesize [分页的个数]
 * @param {[type]} pagenum  [页码]
 * @param {[type]} count    [总共分多少页]
 * @param {[type]} method   [要分页的当前方法]
 * @param {[type]} obj      [加载更多载体的DOM]
 */
function setPage(pagesize,pagenum,count,method,obj){
    if(count=="undefined"||count==0){
      obj.html('<p style="background:#fff;height:30px;line-height:30px;text-align:center">暂无数据...</p>');
      return;
    }
    if(pagenum < count){
         pagenum++;
         obj.html('<a href="javascript:'+method+'('+pagesize+','+pagenum+')">加载更多</a>');  
    }else{
        obj.html('').height(0);
    }  
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
var uname =$.cookie('uname');

function cookies(){
	if(uname !=null){
		
	}else{
		 window.location.href="login.html";
	}
}

