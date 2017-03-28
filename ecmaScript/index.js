/**
 * Created by lin on 2017/3/27.
 */
var title = "i'm a title";//string类型也是值传递
var age = 18;
var age2 = age;//把值本身传递给age2，不会把地址传递给age2，结果有两个18。
var age2 = 19;
// alert(typeof title);
// alert(typeof age);


//   alert(age);
//   alert(age2);
var o = null;
// alert(typeof o);
var flag = true;
var un = undefined;
//变量是拿来存储数据的
var obj = {name: "i'm a object"};//复杂数据类型。
var obj2 = obj;
obj2.name = "i'm obj2";//引用传递，把数据的内存地址赋值给另一个变量，两个数据都指向一个地址。
// alert(obj.name);
// alert(obj2.name);

//自定义对象
var Student = {
	name: "刘兵",
	age: 22,
	gender: true,
	girlFriend: null,
	son: undefined
};

//系统内置对象
var Ostr= String("i'm object of string");
var num2= Number(123);
