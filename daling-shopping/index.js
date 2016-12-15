$(function(){

		
	var span=$("#banner").find("span");
	var xhr=createXHR();
	xhr.open("get","index.json",true);
	xhr.send();

	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var responseText=JSON.parse(xhr.responseText);
			var lis=document.getElementById("nav").getElementsByTagName("a");
			
			var span=$("#banner").find("span");
			var ps=$("#banner").find("p");
			var nav = responseText.product;
			var goods2=nav[2].products;
			//在data下面创建商品的a标签
			var datas=$(".data");
			for(var i=0;i<datas.length;i++){
				for(var k=0;k<goods2[i].goods.length;k++){
					$("<a>").html(goods2[i].goods[k].id).appendTo(datas[i]);
				}
			}
			//导航
			var links=$(".banner-link-a").eq(0).find("a");
			var links2=$(".banner-link-a").eq(1).find("a");
			var links3=$(".banner-link-a").eq(2).find("a");
			for(var i=0;i<links.length;i++){
				links[i].innerHTML=nav[2].products[0].goods[i].id;
				links2[i].innerHTML=nav[2].products[0].goods[i].id;
				links3[i].innerHTML=nav[2].products[0].goods[i].id;
			}

			//当划过banner-link下的li的时候   .hover-display 显示
			var _this=null;
			$(".banner-link").find("li").hover(function(){
				$(".hover-display").css("display","block");
			},function(){
				_this=$(this).index();
				$(".hover-display").css("display","none");
				//$(this).css("background","red");
			});
			$(" .hover-display").hover(function(){
				$(".hover-display").css("display","block");
				$(".banner-link").find("li").eq(_this).css("background","#fff").css("border","1px solid #000").css("border-right",0);
				
			},function(){
				$(".hover-display").css("display","none");
				$(".banner-link").find("li").eq(_this).css("background","#e8e3eb").css("border",0);
			})
			
			//添加banner左侧的文字
			for(var i = 0; i<nav.length;i++){
				lis[i].innerHTML=nav[i].sort;
			}
			for(var i=0;i<ps.length;i++){
				ps[i].innerHTML=lis[i+2].innerHTML;
			}
			
			
		}
		//当鼠标从移入导航栏  然后移动到.hover-display的时候   依然显示

	}
	// 轮播图
	$().extend({
			size: function(){
				return this.elements.length;
			}
		})
	
	var nums=$("#banner-num").find("li");
	var pics=$("#move-pic").find("li");
	var count=0;
	var timer;
	
	
	nums.click(function(){
		count=$(this).index();
		tab();
	})
	timer=setInterval(timerInner,4000);
	
	function tab(){
		
		nums.css("opacity","0.5");
		nums.eq(count).css("opacity","1");
		if(count==pics.size()-1){
			nums.eq(0).css("opacity","1");
		}
		$("#move-pic").animate({top:-480*count},function(){
			if(count==pics.size()-1){
				count=0;
				$("#move-pic").css("top", 0);
			}
		});
	}
	
	$("#move-pic").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(timerInner, 4000);
	});
	//自动滚动
	function timerInner(){
		count++;
		tab();
	}
	
})

//创建XMLHttpRequest对象
function createXHR(){
   var xmlhttp;
   if(window.XMLHttpRequest){
      xmlhttp = new XMLHttpRequest();
   }else{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }
   return xmlhttp;
}
$(function(){
	var xhr=createXHR();
	xhr.open("get","pictures.json",true);
	xhr.send();
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			var data=JSON.parse(xhr.responseText).pictures;
			//data[0].main[0].pic;
			$("<img>").attr("src",data[0].main[0].pic).appendTo($(".main1-pic").find("a").eq(0)).css("margin-right",18);
			$("<img>").attr("src",data[0].main[1].pic).appendTo($(".main1-pic").find("a").eq(1));
			
			var main2=$(".main2-pic").find("li").find('.main2-img');
			//alert(main2.length);
			for(var i=0;i<main2.length;i++){
				$("<img>").attr("src",data[1].main[i].pic).appendTo(main2.eq(i));
				$(".main2-price1").eq(i).html(data[1].main[i].price1);
				$(".main2-price2").eq(i).html(data[1].main[i].price2);
				$(".main2-span").eq(i).html(data[1].main[i].span);
				$(".main2-p").eq(i).html(data[1].main[i].tit);
			}
			
			//main3 的图片添加
			var main3=$(".main3-pic").find('a');
			for(var i=0;i<main3.length;i++){
				$("<img>").attr("src",data[2].main[i].pic).appendTo(main3.eq(i));
			}
			//goods1
			var goods1=$(".goods1-nav").find("a");
			//alert(goods1.length);
			for(var i=0;i<goods1.length;i++){
				goods1.eq(i).html(data[3].main[i].nav).appendTo(goods1.eq(i));
				$("<img>").attr("src",data[3].main[i].pic).appendTo($(".goods1-img").eq(i));
				$(".main2-price1").eq(i+6).html(data[3].main[i].price1);
				$(".main2-price2").eq(i+6).html(data[3].main[i].price2);
				$(".goods1-p").eq(i).html(data[3].main[i].tit);
				$(".goods1-span").eq(i).html(data[3].main[i].span);
			}
			//goods3
			var goods3=$(".goods3-pic").find("li");
			//alert(goods1.length);
			for(var i=0;i<goods3.length;i++){
				$("<img>").attr("src",data[4].main[i].pic).appendTo($(".goods3-img").eq(i));
				$(".main2-price1").eq(i+12).html(data[4].main[i].price1);
				$(".main2-price2").eq(i+12).html(data[4].main[i].price2);
				$(".goods3-p").eq(i).html(data[4].main[i].tit);
				$(".goods3-span").eq(i).html(data[4].main[i].span);
			}
			
			//goods4-left
			
			var goods4=$("#goods4-left").find("li");
			for(var i=0;i<goods4.length;i++){
				$("<img>").attr("src",data[5].main[i].pic).appendTo($(".goods4-img").eq(i));
				$(".goods4-price1").eq(i).html(data[5].main[i].price1);
				$(".goods4-price2").eq(i).html(data[5].main[i].price2);
				$(".goods4-p").eq(i).html(data[5].main[i].tit);
				$(".goods4-tit").eq(i).html(data[5].main[i].span);
				$(".goods4-span").eq(i).html(data[5].main[i].case);
				$(".goods4-btn").eq(i).html("立即抢购");
			}
			
			//goods4-right
			var right=$("#goods4-right").find("li");
			for(var i=0;i<right.length;i++){
				$("<img>").attr("src",data[6].main[i].pic).appendTo($(".goods4-right-img").eq(i));
				$(".goods4-right-tit").eq(i).html(data[6].main[i].tit);
				$(".goods4-right-span").eq(i).html(data[6].main[i].span);
				$(".goods4-right-case").eq(i).html("收藏");
				$(".goods4-right-btn").eq(i).html("加入购物车");
			}
			
			//goods2     买了又买。。。。。。。。。。。。。。。。。。。。
			//创建dl
			
			$(".goods2-box").clone().appendTo($(".goods2-bottom"));
			
			$(".goods2-box").eq(0).clone().appendTo($(".goods2-bottom"));
			var goods2=$(".goods2-box").eq(0).find("dd");
			var dd1=$(".goods2-box").eq(1).find("dd");
			var dd2=$(".goods2-box").eq(2).find("dd");
			
			$(".goods2-box").find("dt").eq(1).html("全球零食");
			$(".goods2-box").find("dt").eq(2).html("创意生活");
			goods2.hover(function(){
				goods2.attr("class","");
				goods2.eq($(this).index()-1).attr("class","goods2-active");
				
			},function(){
				goods2.attr("class","");
				goods2.eq(0).attr("class","goods2-active");
			});
			dd1.hover(function(){
				dd1.attr("class","");
				dd1.eq($(this).index()-1).attr("class","goods2-active");
			},function(){
				dd1.attr("class","");
				dd1.eq(0).attr("class","goods2-active");
			});
			dd2.hover(function(){
				dd2.attr("class","");
				dd2.eq($(this).index()-1).attr("class","goods2-active");
			},function(){
				dd2.attr("class","");
				dd2.eq(0).attr("class","goods2-active");
			});
			
		}
	}
})
