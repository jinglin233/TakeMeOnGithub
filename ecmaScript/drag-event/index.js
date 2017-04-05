/**
 * Created by lin on 2017/4/1.
 */
var container = document.querySelector(".container");
var conWidth = container.offsetWidth;
var conHeight = container.offsetHeight;
var isMouseDown = false;
var subX,subY;
container.onmousedown = function (e) {

	subX = e.pageX - e.currentTarget.offsetLeft;
	subY = e.pageY - e.currentTarget.offsetTop;
};
window.onmouseup = function () {
};
window.addEventListener("mousemove", function (e) {
	var mouseX = e.pageX;
	var mouseY = e.pageY;
	if (isMouseDowm) {
		var left = mouseX - subX;
		var top = mouseY - subY;
		if (left > maxleft) {
			left = maxleft;
		}
		if (top > maxtop) {
			top = maxtop;
		}
		container.style.left = left + "px";
		container.style.top = top + "px";
	}
});
