$(function(){
	
	/*志愿者鼠标经过*/
	/*$('.actor-list-con .intro').hover(function(){
		$(this).toggleClass('zindex');
	},function(){
		$(this).toggleClass('zindex');
	});*/
	
	$('.actor-join a').click(function(){
		$(this).parent().hide().siblings().show();
		$('.actorInfo').slideToggle(300);
	})
	
})
