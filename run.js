/* Created by lin on 2017/4/6. */
var bodyParser=require('body-parser');
var busboy=require('connect-busboy');
//引用express框架模块，将其内部的exports赋值给express变量
var express = require("express");
var websoketServer=require('./server/websoket-server');
// var soketServer=require('./server/other-chat');

//调用express方法，将返回值赋值给app变量
var app = express();
 var httpServer=websoketServer.initalWebsocket(app);
// var httpChatServer=soketServer.initalWebsocket(app);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(busboy());

app.all("*",function (req,res,next) {
	res.header("Access-Control-Allow-Origin","*");
	next();
});

//调用express的router方法，将返回值赋值给router对象
var router = express.Router();
//调用router对象的get方法，注册"/employee"路由
//路由就是服务器端根据客户端访问的地址，找到相应的服务器端资源，响应到给客户端
//因为是get方法，所以该动态资源可以在浏览器的地址栏访问，http//:localhost/8013/employee.
//也可以使用XMLHttpRequest("get","/students")访问
router.get("/employee", function (req, res) {
	var data = {
		message: "获取数据成功",
		contents: [
			{
				name: "敬林",
				gender: "男",
				age:"23",
				address:{
					province:"四川",
					city:"南充",
					district:"南部",
					country:"蜀北大道"
				},
				favorites:["妹子","妹子","妹子","妹子"]
				// compensation:4500
			},
			{
				name: "袁**",
				gender: "女",
				age:"21",
				address:{
					province:"四川",
					city:"南充",
					district:"南部",
					country:"益民广场"
				},
				favorites:["吃","吃","吃","吃"]
				// compensation:6000
			}
		]
	};

	res.json(data);
});
//将动态资源的路径设置为静态资源路径，可以将动态资源伪装为静态资源
router.get("/user/details.html",function (req, res) {
	var result="<div><h1>服务器端html字符串</h1></div>";
	//设置服务器端响应内容的类型
	res.setHeader('Content-type','text/html;charset=UTF-8');
	res.write(result);
	//结束本次http链接
	res.end();
});
//引入自定义user模块,将其exports对象赋值给userDb变量
var userDb=require('./server/proceed/user');
var DocumentDb=require('./server/proceed/document');
userDb.init(router);//初始路由
DocumentDb.init(router);

app.use("/", router);
app.use("/", express.static(__dirname));//根目录
// httpChatServer.listen(8023);
var port=8013;
httpServer.listen(port,function () {
	console.log("server is running on "+port)
});//输出端口