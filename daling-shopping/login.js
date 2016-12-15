$(function(){
		//登录界面
	var img=$(".form-name").find("img");
	var input=$(".form-name").find("input");
	var partern01 = /^1(3|5|7|8)\d{9}$/ ;
	var partern02 = /^[a-zA-z0-9]{6,15}$/ ;
	
	
	//alert(img.length);
	$(".login-name").focus(function(){
		$(this).attr("src","img/login-name.png");
	});
	//输入手机号码
	$(".login-name").blur(function(){
		$(".login-case").eq(1).css("display","none");
		checkName(0);
	});	
	//验证用户名的函数
	function checkName(i){
		img.eq(0).attr("src","img/login-name.jpg");
		var str = $("input").eq(i).val();
		
		if(partern01.test(str)!=true){
				$(".login-case").eq(i).css("display","block");
				console.log(str);
				if(str.length==0){
					
					$(".case-bottom").eq(i).html("请输入手机号码");
				}else{
					$(".case-bottom").eq(i).html("请输入正确的手机号码");
				}
				return false;
		}else{
			$(".login-case").css("display","none");
			return true;
			
		}
	}
	$(".login-btn").click(function(){
		var name = $.cookie("name");
		var pass = $.cookie("pass");
		if($(".login-name").val()==name&&$(".login-pass").val()==pass){
			window.open("index.html");
		
		}else{
			$('.testLogin').css("display","block");
		}
		
		
	})

	//验证密码的函数
	function checkPass(i){
		
		
		if(checkName(2)){
		
			var str = $("input").eq(i).val();
			if(partern02.test(str)!=true){
					$(".login-case").eq(i).css("display","block");
					if(str.length==0){
						
						$(".case-bottom").eq(i).html("请输入密码");
					}else if(str.length<6){
						$(".case-bottom").eq(i).html("密码长度为6-12位");
					}else{
						$(".case-bottom").eq(i).html("密码格式不正确");
					}
				return false;	
			}else{
				$(".login-case").css("display","none");
				return true;
				
			}
		
		}
	}
		

	//登录注册界面的切换
	var register=$(".register");
	var login=$(".login-box");
	$(".sub1").click(function(){
		$(".login").find("button").css("color","#333");
		register.css("display","none");
		login.css("display","block");
		$(this).css("color","#f95377");
		
	})
	$(".sub2").click(function(){
		$(".login").find("button").css("color","#333");
		login.css("display","none");
		register.css("display","block");
		$(this).css("color","#f95377");
	})
		
		
//	-----注册页面

	$(".register-name").blur(function(){
		
		checkName(2);
	})
//注册页面的密码
	$(".register-pass").blur(function(){
		
		checkPass(5);
	})
//验证码的检测	
	var getCodeValue;
	function createCheckCode(){
		var arr = [];
		var checkCode = $(".getCode");
		while(arr.length<4){
			//产生随机数
			var n=parseInt(9*Math.random())
			arr.push(n);
		}
		getCodeValue = arr.join("");
		checkCode.html(getCodeValue);
	}
	createCheckCode();
	//点击验证码的时候获取
	$(".getCode").click(function(){
		createCheckCode();
	})
	//验证码的验证
	function checkCode(){
		var value=$(".checkCode").val();
		if(value==getCodeValue){
			return true;
		}
		return false;
	}
	//用户名
	function checkname(){
		var str=$(".register-name").val();
		if(partern01.test(str)==true){
			return true;
		}
		return false;
	}
	//密码验证
	function checkpass(){
		var str=$(".register-pass").val();
		if(partern02.test(str)==true){
			return true;
		}
		return false;
	}
	$(".register-btn").click(function(){
		//alert("aaa");
		if(checkCode()&&checkname()&&checkpass()){
			alert("注册成功");
			$.cookie("name",$(".register-name").val());
			$.cookie("pass",$(".register-pass").val());
			$(".register").css("display","none");
			$(".login-box").css("display","block");
		}
	})
		
		
})
