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
			var main2=$(".main2-pic").find("li").find('.main2-img');
			//alert(main2.length);
			for(var i=0;i<main2.length;i++){
				$("<img>").attr("src",data[1].main[i].pic).appendTo(main2.eq(i));
				$(".main2-price1").eq(i).html(data[1].main[i].price1);
				$(".main2-price2").eq(i).html(data[1].main[i].price2);
				$(".main2-span").eq(i).html(data[1].main[i].span);
				$(".main2-p").eq(i).html(data[1].main[i].tit);
			}
		}
	}
	var lis=$(".main2-pic").find("li");
	var ems=lis.find("em");
	//alert(ems.length);
	lis.hover(function(){
		ems.eq($(this).index()).css("display","block");
		
	},function(){
		ems.css("display","none");
	});
})
