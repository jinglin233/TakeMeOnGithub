/**
 * Created by lin on 2017/4/1.
 */
var container = document.querySelector(".container");
var pins = document.querySelectorAll(".pin");
var conWidth = container.offsetWidth;
var conHeight = container.offsetHeight;
var maxleft = window.innerWidth - conWidth - 5;
var maxtop = window.innerHeight - conHeight - 5;
var isRightBottomDown = false;
var isRightTopDown=false;
var isLeftTopDown=false;
var isLeftBottomDown=false;
var isMouseDowm = false;
var subX, subY;
container.onmousedown = function (e) {
	e.preventDefault();
	subX = e.pageX - e.currentTarget.offsetLeft;
	subY = e.pageY - e.currentTarget.offsetTop;
	isMouseDowm = true;
};
window.onmouseup = function () {
	isMouseDowm = false;
	isRightBottomDown = false;
	isRightTopDown = false;
	isLeftTopDown = false;
	isLeftBottomDown = false;
};
window.addEventListener("mousemove", function (e) {
	var mouseX = e.pageX;
	var mouseY = e.pageY;
	if (isMouseDowm) {

		var left = mouseX - subX;
		var top = mouseY - subY;
		if (left <= 5) {
			left = 5;
		}
		if (top <= 5) {
			top = 5;
		}
		if (left > maxleft) {
			left = maxleft;
		}
		if (top > maxtop) {
			top = maxtop;
		}
		container.style.left = left + "px";
		container.style.top = top + "px";
	}
	if (isRightBottomDown) {
		var w = mouseX - container.offsetLeft;
		container.style.width = w + "px";
		var h = mouseY - container.offsetTop;
		container.style.height = h + "px";
	}
	if (isRightTopDown) {
		var w1 = mouseX - container.offsetLeft;
		container.style.width = w1 + "px";
		var subTop = container.offsetTop - mouseY;
		var h1 = container.offsetHeight + subTop;
		container.style.height = h1 + "px";
		container.style.top = (container.offsetTop - subTop) + "px";
	}
	if(isLeftBottomDown){
		var subLeft=container.offsetLeft-mouseX;
		var w2=container.offsetWidth+subLeft;
		container.style.width=w2+"px";
		container.style.left=(container.offsetLeft-subLeft)+"px";
		var h2=mouseY-container.offsetTop;
		container.style.height=h2+"px";
	}

	if(isLeftTopDown){
		var subLeft1=container.offsetLeft-mouseX;
		var w3=container.offsetWidth+subLeft1;
		container.style.width=w3+"px";
		container.style.left=(container.offsetLeft-subLeft1)+"px";
		var subTop1=container.offsetTop-mouseY;
		var h3=container.offsetHeight+subTop1;
		container.style.height=h3+"px";
		container.style.top=(container.offsetTop-subTop1)+"px";
	}


});
pins[1].onmousedown = (function (e) {
	e.preventDefault();
	e.stopPropagation();
	isRightTopDown = true;
});
pins[2].onmousedown = (function (e) {
	e.preventDefault();
	e.stopPropagation();
	isRightBottomDown = true;
});
pins[0].onmousedown = (function (e) {
	e.preventDefault();
	e.stopPropagation();
	isLeftTopDown = true;
});
pins[3].onmousedown = (function (e) {
	e.preventDefault();
	e.stopPropagation();
	isLeftBottomDown = true;
});