/**
 * Created by lin on 2017/4/5.
 */
$(document).ready(function () {
	var container = $(".container");
	var pins = $(".pin");
	var isMouseDown = false;
	var isRightTopDown=false;
	var isRightBottomDown=false;
	var isLeftTopDown=false;
	var isLeftBottomDown=false;
	var subX, subY;
	container.mousedown(function (e) {
		isMouseDown = true;
		var ele = e.currentTarget;
		subX = e.pageX - ele.offsetLeft;
		subY = e.pageY - ele.offsetTop;
	});
	$(window).mouseup(function () {
		isMouseDown=false;
		downEle=null;
	})
		.mousemove(function (e) {
		if (isMouseDown) {
			container.offset({
				left: e.pageX - subX,
				top: e.pageY - subY
			});
		}
		if(downEle){
			var oSet=container.offset();
			if(downEle.index===2){
				container.width(e.pageX-oSet.left);
				container.height(e.pageY-oSet.top);

			}if(downEle.index===0){
				container.width(oSet.left-e.pageX);
				container.height(oSet.top+e.pageY);

			}if(downEle.index===3){
				container.width(e.pageX-oSet.left);
				container.height(e.pageY-oSet.top);

			}if(downEle.index===4){
				container.width(e.pageX-oSet.left);
				container.height(e.pageY-oSet.top);

			}
		}
	});
	var downEle=null;
	pins.mousedown(function (e) {
		e.preventDefault();
		e.stopPropagation();
		var target=e.currentTarget;
		downEle={};
		downEle.index=pins.index($(target));
		console.log(downEle.index);
	});
});