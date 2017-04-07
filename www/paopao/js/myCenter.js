/*账户中心*/
$(function(){
	
	//账户中心导航栏
	/*$('.myCenter-nav li').hover(function(){
		$(this).children('dl').slideDown(0);
	},function(){
		$(this).children('dl').slideUp(0);
	});*/
	
	
	//tab切换
	tabTree(".myBubble-tab li",".myBubble-list");
	tabTree(".myShare-chose li",".myShare-chose-list");
	tabTree(".myExcit-mine-tab li",".myExcit-mine-list");
	  /* 选项卡 */
  	function tabTree(menu,content){
	     $(menu).click(function(){
	        $(this).addClass("on").siblings().removeClass("on");
	        var idx = $(this).index();
	        $(content).siblings(content).css("display","none").eq(idx).css("display","block");
	     }).first().trigger("click");    
  	}
	
	/*addPao--radio*/
	$('.myShare-chose-list .radioSelect i').click(function(){
		$(this).addClass('curr').parent().siblings().children('i').removeClass('curr');
		$(this).prev().attr('checked',true).parent().siblings().children('input').attr('checked',false);
	});	  
});
