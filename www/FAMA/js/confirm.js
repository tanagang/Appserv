/**
 * User: 谭政(sunny)
 * Date: 14-10-10
 * Time: 16:30
 * 打开弹出窗：$.JSLayer.Show(_title,_content,_sure,_cancel,_closeEvent);
 *                              _title:窗口标题
 *                              _content:窗口内容
 *								_sure:确定按钮
 *								_cancel:取消按钮
 *								_colseEvent:回调函数
 * 关闭弹出窗：$.JSLayer.Close();
 * 使用方法：
 *  			$.JSLayer.Show("提示","你确定要删除吗?","确定","取消",
					function(){
						alert("我是回调函数")
					}
				);
 *
 */
jQuery.JSLayer={
		Show:function(_title,_content,_sure,_cancel,_closeEvent){
			var color="#FD5B6F";
			var html='';
			html+=' <div id="confirm">';
			if(_title){
				html+='<p class="message">'+_title+'</p>';
			}
			html+='<div style="padding:10px 0;">';
			html+='<p style="line-height:160%;text-align:center;padding:10px">'+_content+'</p>';
			html+=' </div>';
			html+='<p class="btn-opa">';
			if(_cancel){
				html+='<input type="button"  value="'+_cancel+'" id="cancel"  />&nbsp;&nbsp;';
			}
			if(_sure){
				html+='<input type="button" value="'+_sure+'" id="sure" class="f60" />';
			}
			html+=' </p></div>';
			html+=' <div id="screen"></div>';
			html+='<style type="text/css">';
			html+='#confirm{width:240px; min-height:120px; border-radius:5px;padding:3px; border:1px solid rgba(160,160,160,0.1);position:absolute;left:50%;top:30%!important;margin-left:-120px;display:none; padding-bottom:10px;z-index:9999; background:#fff; box-shadow:2px 2px 10px #000; font-family:微软雅黑,Arial, Helvetica, sans-serif}';
			html+='#screen{width:100%; background:#000; opacity:0.5; filter:alpha(opacity=50);position:fixed;left:0;top:0; z-index:9998;display:none}';
			html+='.message{height:25px; line-height:25px;width:100%; background:'+color+';color:#fff;border-radius:3px; text-indent:10px;font-size:14px;}';
			html+='.btn-opa{text-align:center;width:100%;margin-top:15px}';
			html+='.btn-opa input{border:none; font-size:16px;border:1px solid '+color+'; padding:5px 15px;color:#fff;border-radius:3px}';
			html+='#cancel{ background:#fff;color:'+color+'}';
			html+='.btn-opa .f60{background:'+color+'}';
			html+='</style>';
			
			$("body").prepend(html);
			
			$("body").css("position","relative");
			$("#screen").height($(window).height());
			$("#confirm").css("top",($(window).height()-$("#confirm").height())/2);
			$("#screen,#confirm").fadeIn();
			$("#cancel").click(function(){
				$.JSLayer.Close();
			});
			$("body").delegate("#sure","click",function(){
				var data = $("#money").val();
				$.JSLayer.Close();
				if(_closeEvent){
					_closeEvent(data);
				}
			});
		},	
		Close:function(){
			$("#screen,#confirm").remove();
		}
	};