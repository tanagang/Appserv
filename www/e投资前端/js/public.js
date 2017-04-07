$(function(){
        init();
        window.onresize = function(){
            setTimeout(function(){
                init();
            },100);
        }
        function init(){
            var percent = parseInt(document.body.offsetWidth)/320*100;
            document.getElementsByTagName("html")[0].style.cssText="font-size:"+percent+"px";
        }
     //nav导航选项卡
        var rel = $('nav').attr("rel");
        var per = 0;
        if(rel == 2){
            per = 50;
        }else if(rel == 3){
            per = 33.33;
        }else if(rel == 4){
            per = 25;
        }else if(rel == 5){
            per = 20;
        }
        $("nav a,nav i,#tabCon .section").css("width",per+"%");
        $("#tabCon").css("width",rel*100+"%")

        $("nav a").click(function(event) {
            /* Act on the event */
            var idx = $(this).index();
            $(this).closest('nav').find("i").css({
                left: idx*per+"%"
            });
            $("#tabCon").css({
                "transform": 'translateX(-'+idx*per+'%)'
            });
            $("#tabCon .section").css("height","1px");
            $("#tabCon .section").eq(idx).css("height","");
        });
        //多选按钮的选中状态，rel=0即没有选中
        $("label.chk").each(function(index, el) {
                var obj = $(this).find("span");
                if(obj.attr("rel")==0){
                    obj.removeClass('chk-active');
                }else if(obj.attr("rel")==1){
                    obj.addClass('chk-active');
                }
            });
        $(document).on('click', 'label.chk', function(event) {
            var obj = $(this).find("span");
            var rel = obj.attr("rel");
            if(rel==0){
                obj.addClass('chk-active').attr("rel","1");
            }else if(rel==1){
                obj.removeClass('chk-active').attr("rel","0");
            }
        });
       //改变底部导航的选中样式
       var tab = request("fp");
       if(tab!=""){
        $("#footer a[rel="+tab+"]").addClass("active").find("img").attr("src","images/icon_"+tab+"_active.png"); 
       }
       

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