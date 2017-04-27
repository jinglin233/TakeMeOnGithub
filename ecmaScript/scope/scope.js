/**
 * Created by lin on 2017/4/13.
 */
// 变量作用域
// 表示变量定义、赋值、能被访问到的区域
//在es5中一般只有全局作用域与函数作用域
//全局作用域中的变量相当于全局对象的属性
	//当程序运行到作用域之外时，
	//该作用域以及内部的变量会被系统垃圾回收机制清除掉
	//此时再访问该作用域中的变量，程序就会报错
//在浏览器环境中，全局对象是window，在nodejs中
//全局对象是global
//声明全局变量
var g="全局变量g";
console.log(window.g);
//声明函数变量（也叫局部变量，临时变量）
function fuScope() {
	gFnVar="函数内部的全局变量";//在函数内部不用var声明，该变量会被声明成全局变量
	var fnVar="函数变量1";
	console.log(fnVar);
}
fuScope() ;
//全局作用域访问函数作用域的变量
// console.log(fnVar);
console.log(gFnVar);

//变量作用域提升
//在作用域内部的任意位置声明变量时，该声明语句会被提升到该作用域顶部，并将变量值设为undefined
//直到程序运行到声明语句编写的位置时才会被赋真正的值
function scopeImprove() {
	console.log(message);
	var message="scope improve";
}
scopeImprove();
//面试题(变量作用域提升)
var gOutput="g out put";
function output() {
	console.log(gOutput);
	var gOutput="fn out put";
}
output();

function calculate() {
	var result=20*"2";
}
var f=calculate();
console.log(f);

function outputI() {
	for(var i=0;i<4;i++){
		setTimeout(function () {
			console.log(i);
		},500)
	}
}
outputI();

function mathOperate() {
	console.log(1 + 1 +"2");
	console.log("2"+1 + 1 );
	console.log("2"*1 + 1 );
	console.log(1*"2" + 1 );
	var a=100;
	var b="100";
	console.log(a + b - a);
	console.log(a + b - b);
	//因为计算机只能识别二进制，
	//不能精确的表示十进制小数,所以得不到0.2
	console.log(0.3 - 0.1);
}
mathOperate();
//判断两个浮点数是否相等
function floatEqual() {
	var a= 0.9273231313;
	var b=0.9273231312;
	console.log(a==b);
	if((a-b)<0.000000001){
		console.log("a == b");
		longitute=163.2891737182;
		latitue=63.2891737182;
		
		longitute=163.2891737181;
		latitue=63.2891737181;
	}
}
floatEqual();
