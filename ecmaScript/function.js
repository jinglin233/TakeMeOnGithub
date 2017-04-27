/**
 * Created by lin on 2017/3/27.
 */

//函数的调用方式，4种

//第四，new关键字调用
function Room(layer,owner,size) {
	this.layer=layer;
	this.owner=owner;
	this.size=size;
}
var xiaoRoom=new Room('第一层','老王','100平');
console.log(typeof xiaoRoom);
console.log(xiaoRoom);
//new关键字具体做了什么
var empty={};//新生成一个对象
Room.call(empty);//调用函数的call方法
empty._proto_= Room.prototype;//原型链属性赋值
xiaoRoom=empty;//将新生成的对象赋值给等号左边的变量


// 第三、指定this调用
window.brand="apple";
var lenovo={brand:"lenovo"};
	function computerManufacture(type,childtype) {
	console.log(this.brand+":"+type+":"+childtype);
}
computerManufacture.apply(window,["macAir","b型"]);
computerManufacture.apply(lenovo,["y系","小y"]);
computerManufacture.call(window,"macAir","b型");
computerManufacture.call(lenovo,"macAir","b型");
var rComputer=computerManufacture.bind(lenovo,"y系","小y");
rComputer();
//第二，对象中的方法调用
var order={
	goods:['iphone','耳机'],
	totalPrice:10000,
	//商品打折
	discount:function () {
		var price= this.totalPrice*80/100;
		console.log(price);
	}
};
order.discount();

//对象中方法调用
var orderFestival={
	totalPrice:2000
};
//传递方法的定义，而不是方法的调用结果
orderFestival.discount=order.discount;
orderFestival.discount();


//第一，直接调用
window.message="i'm window msg.";
function outputMsg() {
	console.log(this.message);
}
outputMsg();



//arguments
	function printMessage() {
	var result=arguments[0]
	+arguments[1]+arguments[2]
	+arguments[3]+arguments[4];
	return result;
}
var flag=printMessage("小军","正在","做","练习","。");
//console.log(flag);

//对象内的函数叫方法
var student = {
	name: "小明",
	age: 18,
	high: "185cm",
	eat: function (food) {
		return  this.name+ "正在吃" + food;
	}
};
var result=student.eat("香蕉");
//console.log(result);

student.name="小安";
//console.log(student.eat("菠萝"));


function join(p1, p2, p3, p4) {
	var result = p1 + p2 + p3 + p4;
	return result;
}
function output(name, age) {
	var result = join(name, ",", age, ",")
	// console.log(result);
	var hello = "hello";
	var result = hello + ":" + name + "。我今年" + age + "岁";
	// console.log(result);
}
output("angelababy", 16);
//一个函数可以多个输入参数