/**
 * Created by lin on 2017/3/27.
 */
//字符串与数字转换
var str = "yuadch";
var num9 = Number(str);
// console.log(typeof num9);
// console.log(num9);
//结果值为NaN，类型为number，NaN不等于任何值，包括本身
var numParse = parseInt(str);
var numParseFloat = parseInt(str);

var subNum = str - 0;
var multNum = str * 1;
var subtNumer = str / 1;
// console.log(typeof multNum);

//布尔类型转换
var zero=0;
var emptyStr="";
var obj=null;
var un123;
var notNumber=NaN;

var zBool=Boolean(zero);
var emptyBool=Boolean(emptyStr);
var objBool=Boolean(obj);
var nullBool=Boolean(un123);
var notNumberBool=Boolean(notNumber);
// console.log(zBool);
// console.log(emptyBool);
// console.log(objBool);
// console.log(nullBool);
// console.log(notNumberBool);
console.log(zBool,emptyBool,nullBool,notNumberBool,objBool);

//字符串类型转换
var numToStr = 666;
var strToNmber = String(numToStr);
// console.log(numToStr);
var name = "小明";
var age = 18;
var gender = "女";
var comeFrom = "成都";
var special = "去过泰国";
var source = "我叫" + name + "" +
	"，我来自" + comeFrom + "" +
	"，今年" + age +
	"岁,性别" + gender +
	"('" + special + "')";
console.log(source);//+号会把字符串相连，不能用作四则运算。