function autoscroll(ele,speed){
	 //文字向上滚动
    var speed = 2000;
    var num = 0;
	var obj = $(ele);
    var wrapH = obj.find(".wrap1").height();
    var h = obj.find(".wrap1 p").innerHeight();
    var size = obj.find(".wrap1 p").size();
    if(size>10){
      obj.append(obj.find(".wrap1").clone());
      var clr = setInterval(autoPlay,speed);
    } 
    function autoPlay(){
      if(num<size){
        num++;
        $(ele).animate({"scrollTop":num*h},500);
      }else{
        num=0;
        $(ele).animate({"scrollTop":0},0);
      } 
    }
    obj.find(".wrap1").hover(function(){
      clearInterval(clr)
    },function(){
      clr = setInterval(autoPlay,speed);
    });
}
//js控制页面字体大小
window.onload = function(){
	  rem();
		window.onresize = function(){
			setTimeout(function(){
			   rem();
			},200);
		}
	function rem(){
	  var bodyEle = document.getElementsByTagName("body")[0];
	  var w = 0;
	  if(bodyEle.currentStyle){
		w = parseInt(bodyEle.currentStyle.width);
	  }else{
		w = parseInt(getComputedStyle(bodyEle,false).width);
	  }
	  var percent = parseInt(w/320*100);
	  document.getElementsByTagName("html")[0].style.cssText="font-size:"+percent+"px";
	}
}
