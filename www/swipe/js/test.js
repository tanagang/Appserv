function $setCookie(a,b,c,d,e,f){var g=new Date,c=arguments[2]||null,d=arguments[3]||"/",e=arguments[4]||null,f=arguments[5]||!1;c?g.setMinutes(g.getMinutes()+parseInt(c)):"",document.cookie=a+"="+escape(b)+(c?";expires="+g.toGMTString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(f?";secure":"")}function $getCookie(a){var b=new RegExp("(^| )"+a+"(?:=([^;]*))?(;|$)"),c=document.cookie.match(b);return c?c[2]?unescape(c[2]):"":null}function param(){return strToJson(location.search,"?","&")}function strToJson(a,b,c){var f,g,h,d=a.replace(b,"").split(c),e={};for(f=0,g=d.length;g>f;f++)h=d[f].split("="),e[h[0]]=h[1];return e}$(document).ready(function(){var e,f,g,h,i,a=navigator.userAgent.toLowerCase(),b="android"==a.match(/android/i),c=a.indexOf("android"),d=parseFloat(a.slice(c+8));b&&3>d?head.load("http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/js/index_2.js","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/icon.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p0_2.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p1_2.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p2_2.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p3_2.css",function(){var a=preImg(".p1__f_img");a.onload=function(){$(".loading-wrap").css("display","none"),head.load("http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p4_2.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p5_2.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p6_2.css",function(){var a=preImg(".share-guide");a.onload=function(){$(".share-mask").css("display","none")}})}}):head.load("http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/js/index.js","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/icon.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p0.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p1.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p2.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p3.css",function(){var a=preImg(".p1__f_img");a.onload=function(){function c(){$("html").on("touchstart",function(){0==b&&(a.play(),b=1)})}var a,b;$(".loading-wrap").css("display","none"),a=document.querySelector("audio"),a.oncanplay=c(),b=0,$(".speaker").css("display","block"),head.load("http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p4.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p5.css","http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/css/p6.css",function(){var a=preImg(".share-guide");a.onload=function(){$(".share-mask").css("display","none")}})}}),e=localStorage?localStorage.getItem("timer"):"",e=e?e:$getCookie("spring_pv"),f="2015���Ӵ������ⷢ��!",g="2015���Ӵ�������һ�����ȫ�񡰼Һ������ˡ��ж�",h=param(),i="http://yao.qq.com/tv/entry?redirect_uri={#redirect_uri#}&cb41faa22e731e9b={#cb41faa22e731e9b#}&t="+new Date,i=i.replace("{#redirect_uri#}",encodeURIComponent("http://yaotv.qq.com/shake_tv/proj/spring_festival/index.html")).replace("{#cb41faa22e731e9b#}",h.cb41faa22e731e9b),e&&!isNaN(parseInt(e))?($(".p6__number").html(e),$(".part.p6__p").show(),f="�������Һ������ˡ��ж�,���ǵ�"+e+"λ������!"):$.ajax({type:"GET",url:"http://yao.qq.com/tv/pv?pageid=1001",dataType:"jsonp",success:function(a){0==a["errorCode"]&&(a=a["data"],isNaN(parseInt(a["pv"]))||($(".p6__number").html(a["pv"]),$(".part.p6__p").show(),f="�������Һ������ˡ��ж�,���ǵ�"+a["pv"]+"λ������!",$(".p5__print-wrap").on("tap",function(){localStorage&&localStorage.setItem("timer",a["pv"]),$setCookie("spring_pv",a["pv"],7200),shaketv.wxShare("http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/img/thumb-logo.jpg",f,g,i)}),$(".p5__print-wrap").on("longTap",function(){localStorage&&localStorage.setItem("timer",a["pv"]),$setCookie("spring_pv",a["pv"],7200),shaketv.wxShare("http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/img/thumb-logo.jpg",f,g,i)})))}}),shaketv.wxShare("http://3glogo.gtimg.com/wxgc/_events/20141120-spring-festival/img/thumb-logo.jpg",f,g,i)}),window.onresize=function(){$(".content-li").each(function(){$(this).css("height",$(window).height())}),screenHeight=$(window).height()},setTimeout(function(){$(window).resize()},1e3);
