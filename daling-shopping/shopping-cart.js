$(function(){
	var value=null;
	$(".cart-con").click(function(){
		value=parseFloat($(".shopping-cart").css("right"));
		if(value){
			$(".shopping-cart").stop().animate({
					right:'0'
				})
			$(".index-code").stop().animate({
					right:'320px'
				})
			sc_msg();
		}else{
			$(".shopping-cart").stop().animate({
					right:'-280px'
				})
			$(".index-code").stop().animate({
					right:'40px'
				})
		}
		
	})
	//划过商品的时候加入购物车图标出现
	$(".cart-tit").find("span").click(function(){
		$(".shopping-cart").stop().animate({
					right:'-280px'
				})
			$(".index-code").stop().animate({
					right:'40px'
			});
	})
	
	var lis=$(".main2-pic").find("li");
	var ems=lis.find("em");
	//alert(ems.length);
	lis.hover(function(){
		ems.eq($(this).index()).css("display","block");
		
	},function(){
		ems.css("display","none");
	});
	
	
//购物车中的商品栏
	//页面刷新时  加载购物车中的数量；
	sc_car();

	var ul=$(".cart-bg").find("ul");
	
	$(".add-cart").click(function(){
		var id = this.id;
		var first = $.cookie("goods") == null ? true : false;
		var same = false; 
		if(first){
				//建立存储的json结构  
				$.cookie("goods", '[{id:' + id + ',num:1}]');
			}else{
				var str = $.cookie("goods");
				//eval()  类似 JSON.parse()  字符串转对象
				var arr = eval(str);
				for(var i in arr){
					if(arr[i].id == id){
						arr[i].num++; //如果有相同的商品,num自增
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods", cookieStr);
						same = true;
					}
				}
				if(!same){
					var obj = {id: id, num: 1};
					arr.push(obj);
					var cookieStr = JSON.stringify(arr);
					$.cookie("goods", cookieStr);
				}
			}
			sc_msg();
			sc_car();
		return false;
	})
	
	function sc_car(){
			var sc_str = $.cookie("goods");
			if(sc_str){
				var sc_arr = eval(sc_str);
				var sc_num = 0; //记录商品数量的累加
				
				for(var i in sc_arr){
					
					sc_num += Number(sc_arr[i].num);
					$(".cart-num input").attr("value",Number(sc_arr[i].num));
				}
				$(".cart-con span").html(sc_num);
			}
		}
	
	function sc_msg(){
			$.ajax({
				url: "shopping-cart.json",
				type: "GET",
				success: function(res){
					var sc_str = $.cookie("goods");
					if(sc_str){
						var sc_arr = eval(sc_str);
						var html = "";
						for(var i in sc_arr){
							html += '<li><img src="'+res[sc_arr[i].id].pic+'" /><div class="cart-goods-left"><a href="">[女都]</a><a href="details.html">秋冬文艺范百搭</a><div class="cart-num"><span>+</span><input type="text" value="'+sc_arr[i].num+'"><span>-</span></div></div><div class="cart-goods-right"></div></li>'
						}
						$(".cart-bg").css("background-image","none");
						ul.html(html);
					}
				}
			})
		}

	
})
