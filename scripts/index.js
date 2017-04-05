/**
 * Created by lin on 2017/3/30.
 */
var carousels=document.querySelectorAll(".carousel");
var lastlIndex=carousels.length-1;
var carousellIndex=carousels.length-1;
var wInterval;

function runningCarousel() {
	var cW= carousels[carouselIndex].offsetWidth;
	function transitionWidth(step) {
		cW=cW-step;
		carousels[carousellIndex].style.width=cW+"px";
	}
	wInterval=setInterval(function () {
		if(cW<2){
			clearInterval(wInterval);
			return;
		}
		transitionWidth(2);

	},20);
	carousels[carouselIndex-1].style["z-index"]=carousels.length;
}

setTimeout(runningCarousel,1000);

for(var i=0;i<carousels.length;i++){
	carousels[i].addEventListener("transitionend",function () {
carouselIndex=carouselIndex-1;
if(carouselIndex<0){
	carouselIndex=carousels.length-1;
}
setTimeout(runningCarousel,1000);
	});
}

var container =
	document.querySelector(".container");
var itemWrapper=document.querySelector(".item-wrapper");
var mainItem=document.querySelector(".main-item");
var animationIsRuning=false;
container.onmousewheel = function (e) {
	if(animationIsRuning){
		return
	}
	animationIsRuning=true;
	if(e.deltaY>0){
		//鼠标向下滚动
		var ele=itemWrapper;
		var subTop= ele.offsetTop -mainItem.offsetHeight;
		ele.style.top=subTop+"px";
	}else{
		 ele=itemWrapper;
		 subTop= ele.offsetTop +mainItem.offsetHeight;
		ele.offsetTop=subTop;
		ele.style.top=subTop+"px";
	}
};
itemWrapper.addEventListener("transitionend",function () {
	animationIsRuning=false;
});


// container.addEventListener('DOMMouseScroll', function () {
// 	console.log("兼容Firefox");
// });

