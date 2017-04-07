;$(document).ready(function() {
	var flag=true;
	var city="beijing";
	$.fn.fullpage({
		slidesColor: ['#299FB9', '#F7C456', '#F7C456', '#f90', '#E95755','#FBF3E3'],
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5','page6'],
		loopBottom: false,
		menu: '#music',
		css3: true,
		afterLoad: function(anchorLink, index){
			switch(index){
				case 1:
					flag=false;
					$("#section1 .text1").css({"webkitTransition":"all 2s ease .1s","webkitTransform":"translateY(-80px)","opacity":1});
					break;
				case 2:
					$("#bg2-top").css("webkitTransform","translateY(-80%)");
					$("#bg2-bottom").css("webkitTransform","translateY(80%)");
					$("#bg2-left").css({"opacity":1,"webkitTransition":"opacity 3s ease 0.5s"});
					$("#bg2-right").css({"opacity":1,"webkitTransition":"opacity 3s ease 1s"});				
					break;
				case 3:
					
					$("#bg3-bottom").css({"webkitTransform":"translateY(0)","opacity":1});
					break;
				case 4:
					//$('#message').css({"opacity":1});
					$("#message img:first").delay(800).fadeIn(1500,function(){
						$("#person img:first").delay(1500).fadeOut(1500);
						$("#message img:first").delay(1500).fadeOut(1500);
						$("#person img:last").delay(1500).fadeIn(1500);
						$("#message img:last").delay(1500).fadeIn(1500);
					});
					break;
				case 5:
					$('#bg5-top').css({"webkitTransform":"translateY(0)","opacity":"1"});
					$("#family1").delay(500).fadeIn(1000,function(){
						$("#family2").fadeIn(1000,function(){
							$("#family3").fadeIn(1000,function(){
								$("#family4").css("opacity",1)	
							});
						});
					});
					break;
				case 6:
				
				break;
			}
		},
		onLeave: function(index, direction){
			switch(index){
				case 1:
					flag=false;
					$("#section1 .text1").css({"webkitTransition":"all .5s ease .5s","webkitTransform":"translateY(-300px)","opacity":0});
					break;
				case 2:
					$("#bg2-top").css("webkitTransform","translateY(-500%)");
					$("#bg2-bottom").css("webkitTransform","translateY(500%)");
					$("#bg2-left,#bg2-right").css({"opacity":0,"webkitTransition":"opacity 1s ease 0.5s"});	
					break;
				case 3:
					$("#bg3-bottom").css({"webkitTransform":"translateY(300px)","opacity":0});
					break;
				case 4:
					//$('#message').css({"opacity":0});
					$("#message img:first").fadeOut(100,function(){
						$("#person img:first").fadeIn(100);
						$("#message img:first").fadeOut(100);
						$("#person img:last").fadeOut(100);
						$("#message img:last").fadeOut(100);
					});
					break;	
				case 5:
					$('#bg5-top').css({"webkitTransform":"translateY(-80px)","opacity":"0"});
					$("#family1").fadeOut(10,function(){
						$("#family2").fadeOut(10,function(){
							$("#family3").fadeOut(10,function(){
								$("#family4").css("opacity",0)	
							});
						});
					});
					break;
				case 6:
				
				break;
			}
		}
	});
	if(flag){
		$("#section1 .text1").css({"webkitTransition":"-webkit-transform 3s ease 8s,opacity 3s ease 6s,","webkitTransform":"translateY(-80px)","opacity":1});
		
		setTimeout(autoTime,2000);
		
	}
	

	
	$("#to-city img").click(function(){
		var self = $(this);
		var	src=self.attr("data-rel");
		$("#to-city img").each(function(idx,item){
			$(item).attr("src","images/"+$(item).parent().attr('class')+".png");	
		});
		self.attr('src',src);	
	});
	
	$("#from-city img").click(function(){
		var self = $(this);
		var	src=self.attr("data-rel");
		$("#from-city img").each(function(idx,item){
			$(item).attr("src","images/"+$(item).parent().attr('class')+".png");	
		});
		self.attr('src',src);	
	});
	
	$(".beijing").click(function(){
		city="beijing";	
	})
	$(".shanghai").click(function(){
		city="shanghai";
	});
	
	var curIndex=1;
	var clr;
	
	function autoTime(){
		$("#loading").fadeOut(200);
		$("#my3dspace").css("opacity",1);
		clr=setInterval(auto,350);
		
	}
	function auto(){
		var curPage=$(".page"+curIndex);
		curPage.css("webkitTransform","rotateX(360deg)");
		curIndex++;
		if(curIndex==4){
			clearInterval(clr);
			//$("#pagegroup").delay(1500).animate({"marginTop":"200px","left":"20px"},2500,"easeOutExpo");
			//$(".page").delay(1500).animate({"width":"80px","height":"100px"},2500,"easeOutExpo");
			
			$("#pagegroup").css({"webkitTransform":"translateY(100px) scale(0.7,0.7)"});
			$("#section1 .text1").animate({"top":"-10%"},2000,function(){
				$(this).find("img").animate({"opacity":"1"},1000);	
			});
		}
		
	}
	$("#music").click(function(){
		var a = document.getElementById("audio");
		if(a.paused){
			a.play();	
			$("#music-img").attr("src","images/music.png");
		}else{
			a.pause();	
			//$("#music-img").attr("src","#");
		}
	});
});

function autoplay(){
	var a = document.getElementById("audio");
	a.play();
}