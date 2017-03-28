/**
 * Created by lin on 2017/3/27.
 */
var heatUp={
    startHotUp:null,
	hotSuccess:null,
	current:0,
	boilPoint:85,
	hotUp:function () {
		if(this.startHotUp){
			this.startHotUp();
		}
    	while (this.current<this.startHotUp){
		this.current=this.current+1;
		}
		if(this.hotSuccess){
    		this.hotSuccess();
		}
	}
};
heatUp.startHotUp=function () {
	console.log("开始烧开水");
};
heatUp.hotSuccess=function () {
console.log("水烧开了")
};
heatUp.hotUp();