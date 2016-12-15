$(function(){
	var value=$(".input").attr("value");
	$(".btn-up").click(function(){
		
		if(value<4){
			$(".input").attr("value",++value);
		}
		return false;
	})
	
	$(".btn-down").click(function(){
		
		if(value>1){
			$(".input").attr("value",--value);
		}
		return false;
	})
	var _position=document.getElementsByClassName("position_box")[0];
	var img=document.getElementsByClassName("goods-img")[0];
	var oDiv=document.getElementsByClassName("goods_box")[0];
	var oB_box=document.getElementById('b_box');
	var oB_box_all=document.getElementById('b_box_all')
	$(".goods-img").hover(function(){
		$(".position_box").css("display","block");
		oB_box.style.display='block';
	},function(){
		$(".position_box").css("display","none");
		oB_box.style.display='none';
	})
//	-----------------------放大镜------------------------------
	oDiv.onmousemove=function(event){
		
		var evt=event||window.event;
		
		var left=evt.offsetX-_position.offsetWidth/2;
	
		if(left<0){
			left=0;
		}else if(left>img.offsetWidth-_position.offsetWidth){
			left=img.offsetWidth-_position.offsetWidth;
		}
		_position.style.left=left+"px";
		
		var top=evt.offsetY-_position.offsetHeight/2;
		if(top<0){
			top=0;
		}else if(top>img.offsetHeight-_position.offsetHeight){
			top=img.offsetHeight-_position.offsetHeight
			
		}
		//console.log(top);
		_position.style.top=top+"px";
		var proportionX=left/(img.offsetWidth-_position.offsetWidth);
		var proportionY=top/(img.offsetHeight-_position.offsetHeight);

			//利用比例去算出大小不同的元素的偏移距离；

		oB_box_all.style.left=-proportionX*(oB_box_all.offsetWidth-oB_box.offsetWidth)+'px';

		oB_box_all.style.top=-proportionY*(oB_box_all.offsetHeight-oB_box.offsetHeight)+'px';
	}
	
	

})