/*
		author:tanzheng
		date:2015-5-5	
	*/
	$(function(){
		var h = $(window).height();
		var s = 0;
		$("#navDiv a").click(function(){
			var idx = $(this).parent().index()+1;
			var obj = $("#section"+idx);
			var offsetTop = obj.offset().top-60;
			$("html,body").animate({scrollTop:offsetTop},300);
		});
		$("#top").click(function(){
			$("html,body").animate({scrollTop:0},300);
		});
		//滚动条事件
		$(window).scroll(function(){
			setTimeout(function(){
				var top = $(document).scrollTop();
				var menu = $("#navDiv");
				var items = $("#content").find("section");
				//根据鼠标的滚动位置，高亮菜单选项
				items.each(function(index, element) {
					var m = $(this);
                    var itemTop = m.offset().top;
					var activeId="";
					if((top+h/2) >= itemTop){
						activeId = "#"+m.attr("data-rel");
						$("#navDiv li a").removeClass("active");
						$(""+activeId+"").addClass("active");
					}
                });
				//控制返回顶部的显示与隐藏
				if(top>h/2){
					$("#top").fadeIn("fast");	
				}else{
					$("#top").fadeOut("fast");
				}
			},100);
		});
		//经典案例的logo悬浮效果
		$(".tu").hover(
			function(){
				var rel = parseInt($(this).attr("data-rel"));	
				switch(rel){
					case 1:
					case 4:
					case 7:
						$(".hover[data-rel="+rel+"]").css({"left":"298px","display":"block"});
					break;	
					case 2:
					case 5:
					case 8:
						$(".hover[data-rel="+rel+"]").css({"left":"590px","display":"block"});
					break;
					case 3:
					case 6:
					case 9:
						$(".hover[data-rel="+rel+"]").css({"left":"-5px","display":"block"});
					break;
				}
			},function(){
				$(".hover").css("display","none");
		});
		//产品与服务的轮播
		var tempW2 = 0;
		var size2 = $(".bottom-slide ul li").size();
		var liW = $(".bottom-slide ul li").first().outerWidth(true);
		$(".bottom-slide ul").width(size2*liW);
		$("#arrowLeft2").live("click",slideL);
		$("#arrowRight2").live("click",slideR);
		function slideL(){	
		    var ul = $(this).parent().find(".slide ul");
			
			var ml = ul.css("marginLeft");
			    ml = parseInt(ml.substring(0,ml.length-2));
			var newW = -(ul.find("li").size()-3)*liW;
			if(ml > newW){
				$("#arrowLeft2").die("click");
				tempW2 = tempW2+liW;
				ul.animate({"marginLeft":-tempW2},200,function(){
					$("#arrowLeft2").live("click",slideL);	
				});	
			}
		}
		function slideR(){
			var ul = $(this).parent().find(".slide ul");
			
			var ml = $(".bottom-slide ul").css("marginLeft");
			    ml = parseInt(ml.substring(0,ml.length-2));
			if(ml!=0){
				$("#arrowRight2").die("click");
				tempW2 = tempW2-liW;
				ul.animate({"marginLeft":-tempW2},200,function(){
					$("#arrowRight2").live("click",slideR);
				});
			}
		}
		//公众号和app开发轮播
		var tempW3 = 0;
		var size3 = $(".app-slide ul li").size();
		var liW3 = $(".app-slide ul li").first().outerWidth(true);
		$(".app-slide ul").width(size3*liW3);
		$("#arrowLeft3").live("click",slideL2);
		$("#arrowRight3").live("click",slideR2);
		function slideL2(){	
		    var ul = $(this).parent().find(".slide ul");
			var ml = ul.css("marginLeft");
			    ml = parseInt(ml.substring(0,ml.length-2));
			var newW = -(ul.find("li").size()-3)*liW3;
			if(ml > newW){
				$("#arrowLeft3").die("click");
				tempW3 = tempW3+liW3;
				ul.animate({"marginLeft":-tempW3},200,function(){
					$("#arrowLeft3").live("click",slideL2);	
				});	
			}
		}
		function slideR2(){
			var ul = $(this).parent().find(".slide ul");
			
			var ml = ul.css("marginLeft");
			    ml = parseInt(ml.substring(0,ml.length-2));
			if(ml!=0){
				$("#arrowRight3").die("click");
				tempW3 = tempW3-liW3;
				ul.animate({"marginLeft":-tempW3},200,function(){
					$("#arrowRight3").live("click",slideR2);
				});
			}
		}
		//关于我们的轮播
		var size = $(".about-wrap").size();
		var wrapW = $(".about-wrap").width();
		$(".about-container").width(wrapW*size);
		var slideStr = '';
		for(var i = 0;i < size; i++){
			slideStr+='<a href="javascript:void(0)"></a>';
		}
		$("#slideBtn").append(slideStr);
		$("#slideBtn a").mouseenter(
			function(){
				var that = $(this);
				var idx = that.index();
				$("#slideBtn a").removeClass("on");
				that.addClass("on");
				$(".about-container").animate({"marginLeft":-idx*wrapW},500);
			}
		).first().trigger("mouseenter");
					
		/***以下是顶部轮播***/
		var sWidth = $("#focus").width();//获取焦点图的宽度
		var len = $("#focus ul li").length;//获取焦点图的图片个数
		$(window).resize(function(){
			var winW = $(window).width();
			if(winW <= 1280){
				sWidth = 1280;
			}else{
				sWidth = 1920;	
			}
		});
		
		$("#focus ul").css("width",(len+1)*sWidth);//动态设置ul的宽度 len+1 是因为当自动播放图片到最后一个时，为克隆的li留位置
		var btn = "<div class='btn'>";//动态添加图片下方的按钮
		for(var i=0; i < len; i++) {
			btn += "<span><a href='javascript:void(0)'></a></span>";
		}
		btn += "</div>";
		$("#focus").append(btn);
		$("div.btn").css({"width":34*len});
		//鼠标悬浮，选中对应的图片
		$("#focus .btn span").mouseover(function(){
			index=$(this).index();
			showPics(index);
		});
		//默认选中第一个
		$("#focus .btn span:first").mouseover();
		
		function showPics(index){
			var nowLeft=-index*sWidth;
			$("#focus ul").stop(true,false).animate({"left":nowLeft},500);
			$("#focus .btn span a").removeClass("on").eq(index).addClass("on");	
			
		}
		//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
		$("#focus").hover(function(){
			window.clearInterval(clearTime);
		},function(){
			clearTime=window.setInterval(function(){
				if(len==index){
					//说白了，就是最后一个离第一个焦点图的距离
					var nowLeft=-len*sWidth;
					//克隆第一个li放置在ul最后
					$("#focus ul").append($("#focus ul li:first").clone());
					//nowLeft是前四张图片的宽度，left：nowLeft，是刚好让显示第五张图片，显示完第5张焦点图后，立马left=0；（ul已经设置position），然后再移除最后一个焦点图
					$("#focus ul").stop(true,false).animate({"left":nowLeft+"px"},500,function(){
						$("#focus ul").css("left","0");	
						$("#focus ul li:last").remove();
					});
					index=0;
					$("#focus .btn span a").removeClass("on").eq(0).addClass("on"); //为第一个按钮添加选中的效果
					
				}else{
					showPics(index);
				}
				index++;	
			},3000);
		}).trigger("mouseleave");//重点强调一下trigger:触发事件，参数名就是事件名，这里默认调用鼠标离开事件，所以才会自动播放;等同于	$("#focus").mouseleave();代替
		
		
 
});