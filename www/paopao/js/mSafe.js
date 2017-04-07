$(function(){
	/*查询当前绑定状态*/
	$.ajax({
	    type:"POST",
	    url:url+"user/getMemberInfo.json",
	    dataType: 'jsonp',
	    data: {},
	    beforeSend:function(){

	    },
	    success: function (data) {console.log(data);
	    	/*判断是否实名认证*/
	        if(data.memberInfo.isRealName!="0"){
				$('.certificationed').show();
				 $('.certificationed .btn').unbind("click");
				$('.certificationing').hide();
				$('.certificationed').siblings(".showCon").children("i").addClass('cpr1').removeClass('cpr3');
	        }
	        /*判断是否绑定邮箱*/
	       if(data.memberInfo.isBindEmail){
				$('.bindingEmailed').show();
				 $('.bindingEmailed .btn').unbind("click");
				$('.bindingEmailing').hide();
				$('.bindingEmailed').siblings(".showCon").children("i").addClass('cpr1').removeClass('cpr3');
	        }
	    },
	    complete:function(){

	    },
	    error:function(){}
	});
	/*登录密码修改*/
	$('.passwordSub').click(function(){
		$.ajax({
		    type:"POST",
		    url:url+"user/modifyPassword.json",
		    dataType: 'jsonp',
		    data: {oldPassword:$('.oldPassword').val(),password:$('.newPassword').val()},
		    beforeSend:function(){
		    	if($('.oldPassword').val()==""){
					$('.oldPassword').siblings("span").html('<i class="cpr cpr2"></i><span class="error">原密码不能为空！</span>');
					return false;
				}
		    	if($('.newPassword').val()==""){
					$('.newPassword').siblings("span").html('<i class="cpr cpr2"></i><span class="error">新密码不能为空！</span>');
					return false;
				}
		    	if($('.newPassword').val().length>21||$('.newPassword').val().length<6){
					$('.newPassword').siblings("span").html('<i class="cpr cpr2"></i><span class="error">密码格式不正确！</span>');
					return false;
				}
		    	if($('.newPassword').val()!=$('.repeatPassword').val()){
					$('.repeatPassword').siblings("span").html('<i class="cpr cpr2"></i><span class="error">密码不一致</span>');
					return false;
				}
		    },
		    success: function (data) {
		    	if(data.respCode==0000){
		    		alert("密码修改成功！");
		    		window.location.reload();
		    	}else{
		        	alert(data.respMsg);
		        }
		    },
		    complete:function(){

		    },
		    error:function(){}
		});
	});
	/*绑定邮箱*/
	$('.bangEmail').click(function(){
		$.ajax({
		    type:"POST",
		    url:url+"user/sendMail.json",
		    dataType: 'jsonp',
		    data: {email:$('.inputEmail').val()},
		    beforeSend:function(){
		    	if($('.inputEmail').val()==""){
					$('.eMailError').html('<i class="cpr cpr2"></i><span class="error">邮箱不能为空！</span>');
					return false;
				}
		    	var isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				if(!(isEmail.test($('.inputEmail').val()))){
					$('.eMailError').html('<i class="cpr cpr2"></i><span class="error">请填写正确的邮箱格式！</span>');
					return false;
				}

		    },
		    success: function (data) {
		    	console.log(data);
		    	if(data.respCode==0000){
		    		alert("邮件发送成功，请前往认证！");
		    		window.location.reload();
		    	}else{
		        	alert(data.respMsg);
		        }
		    },
		    complete:function(){

		    },
		    error:function(){}
		});
	});
	/*实名认证*/
	$('.idCard').click(function(){
		$.ajax({
		    type:"POST",
		    url:url+"user/realName.json",
		    dataType: 'jsonp',
		    data: {realName:$('.idCardName').val(),idNumber:$('.idCardNum').val()},
		    beforeSend:function(){
				if($('.idCardName').val()==""){
					$('.idCardNameError').append('<i class="cpr cpr2"></i><span class="error">用户名不能为空！</span>');
					return false;
				}
				if($('.idCardNum').val()==""){
					$('.idCardNumError').html('<i class="cpr cpr2"></i><span class="error">身份证号不能为空！</span>');
					return false;
				}
				if($('.idCardNum').val().length!=18){
					$('.idCardNumError').html('<i class="cpr cpr2"></i><span class="error">身份证号格式不正确！</span>');
					return false;
				}
		    },
		    success: function (data) {
		        if(data.respCode==0000){
		        	window.location.reload();
		        }else{
		        	alert(data.respMsg);
		        }
		    },
		    complete:function(){

		    },
		    error:function(){}
		});
	});
	/*修改绑定手机--获取原手机号*/
	$("#modifyPhone").click(function(){
		var oldPhone = $.cookie("c_member_mobile");
		oldPhone = oldPhone.substr(0,3)+"****"+oldPhone.substr(7,11);
		$("#oldPhone").html(oldPhone);
	});	
	/*修改绑定手机--绑定新手机号*/
	$(".bindPhone").click(function(){
		var mobile = $('.inputPhone').val();
		var yzm = $('.inputYzm2').val();		
		$.ajax({
		    type:"POST",
		    url:url+"user/changeMobile.json",
		    dataType: 'jsonp',
		    data: {mobile:mobile,smsCode:yzm},
		    beforeSend:function(){
		    	if(mobile==""){
					$('.inputPhone').siblings("span").html('<i class="cpr cpr2"></i><span class="error">手机号不能为空！</span>');
					return false;
				}		
				if(yzm==""){
					$('.inputYzm2').siblings("span").html('<i class="cpr cpr2"></i><span class="error">验证码不能为空！</span>');
					return false;
				}
		    },
		    success: function (data) {
		    	if(data.respCode==0000){
		    		alert("手机号绑定成功！");
		    		window.location.reload();
		    		
		    	}else{
		        	alert(data.respMsg);
		        }
		    },
		    complete:function(){

		    },
		    error:function(){}
		});
		
	});	
})