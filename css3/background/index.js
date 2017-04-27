/**
 * Created by lin on 2017/4/20.
 */
var $window=$(window);
var $windowHeight=$window.height();
var totalScroll=0;
function animateScroll(dir) {
	//获取当前window已经滚动的距离
	var sCrolltop=$window.scrollTop();
	if(dir){//向下滚
		//以动画的效果使window向下滚动一屏
		var downInterval =setInterval(function () {
			sCrolltop+=5;//动画每帧滚动的距离以像素为单位
			if(sCrolltop>=(totalScroll+1)*$windowHeight){
				sCrolltop=(totalScroll+1)*$windowHeight;
				clearInterval(downInterval);
				isClickRunning=false;
				totalScroll++;
			}
			$window.scrollTop(sCrolltop);
		},5);
	}else {//向上滚
		//以动画的效果使window向上滚动一屏
		var upInterval=setInterval(function () {
			sCrolltop-=30;
			if(sCrolltop<=(totalScroll-1)*$windowHeight){
				sCrolltop=(totalScroll-1)*$windowHeight;
				totalScroll--;
				clearInterval(upInterval);
				isClickRunning=false;
			}
			$window.scrollTop(sCrolltop);
		},30);
	}
}
//当window触发滚动事件时，区分是鼠标点击上下按钮执行的滚动还是用户滚鼠标时执行的滚动
var isClickRunning=false;
setTimeout(function () {
	$window.scrollTop(0);
},30);
//监听向上向下滚单击事件
$(".direction.up").click(function () {
	if(isClickRunning)return;
	 isClickRunning=true;
	animateScroll(0)
});
var totalImg=$(".bg-item").length;
$(".direction.down").click(function () {
	if(isClickRunning)return;
	if(!totalScroll)return;
	if(totalScroll>=(totalImg-1))return;
	isClickRunning=true;
	animateScroll(1)
});


$window.scroll(function () {
	if(!isClickRunning){
		var wScrollTop=$window.scrollTop();
		var current=Math.floor(wScrollTop/$windowHeight);
		totalScroll=current;
	}

});

// $(".direction.up").onkeydown(function (e) {
// 	alert(e.keyCode);
// 	if(e.keyCode==13){
// 		animateScroll()
// 	}
// });





function animationScroll(dir) {
	if(flag){
		return;
	}
	flag=true;
	sCrolltop=$window.scrollTop();
	if(dir){
		sCrolltop+=$height;
		if(sCrolltop>=$height*($bg.length)){
     flag=false;
		return;
}
		$('body,html').animate({
			scrollTop:sCrolltop
		},1000,function () {
			flag=false;
		});
	}else{
		sCrolltop-=$height;
		$('body,html').animate({
			scrollTop:sCrolltop
		},1000,function () {
			flag=false;
		});
	}
}
var $bg=$(".bg-item");
var $top=$('.top');
var $bottom=$('.bottom');
var $window=$(window);
var $height=$window.height();
var flag=false;
var sCrolltop;
$top.click(function () {
	animationScroll(0)
});
$bottom.click(function () {
	animationScroll(1)
});
