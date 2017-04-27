/**
 * Created by lin on 2017/4/7.
 */
//后台
// 引入data-base模块，使用sequelize操作数据库

// var dbSequelize = require('../sequelize-mysql/data-base');
// var fs=require("fs-extra");
// //exports暴露init方法给引用本模块的模块
// //init方法的作用是使用传递进来的router对象注册用户相关的操作的路由
// exports.init = function (router) {
// 	function updateUser(req, res, method) {
// 		//创建临时对象userData，接收客户端传递的参数
// 		//req.query，接收地址最后的？传递的参数
// 		var userData = null;
// 		if (method == "get") {
// 			userData = {
// 				userName: req.query.userName,
// 				email: req.query.email,
// 				mobile: req.query.mobile,
// 				qq: req.query.qq,
// 				realName: req.query.realName,
// 				age: req.query.age,
// 				id: req.query.id
// 			};
// 		} else if (method == "post") {
// 			userData = {
// 				userName: req.body.userName,
// 				email: req.body.email,
// 				mobile: req.body.mobile,
// 				qq: req.body.qq,
// 				realName: req.body.realName,
// 				age: req.body.age,
// 				id: req.body.id,
// 				avator: req.body.icon
// 			};
// 		}
//
// 		//判断客户端是否传递user id
// 		//如果传了user id表示数据库已存在改用户的信息，要去更新这条数据
// 		//如果没传user id表示要在数据库新建一条数据
// 		if (userData.id) {
// 			//修改已存在的用户数据
// 			dbSequelize.updateUser(userData).then(function (r) {
// 				//更新数据操作是由node.js发起的请求，由数据库执行。
// 				//当数据库执行完成后会通过then方法传递的函数来告诉nodejs数据库更新完成，
// 				// 更新返回的数据由r参数传递。
//
// 				res.json({
// 					flag: 0,
// 					message: "",
// 					content: r
// 				})
// 			})
// 		} else {
// 			//新增用户数据
// 			dbSequelize.createUser(userData).then(function (r) {
// 				var result = {
// 					id: r.dataValues.id,
// 					userName: r.dataValues.userName,
// 					createAt: r.dataValues.createdAt,
// 					updateAt: r.dataValues.updatedAt
// 				};
// 				res.json(result);
// 			});
// 		}
// 	}
// 	//以get方式注册更新用户信息的路由
// 	router.get("/updateUser", function (req, res) {
// 		updateUser(req, res, "get");
// 	});
// 	//以post方式注册更新用户信息的路由
// 	router.post("updateUser", function (req, res) {
// 		var fStream;
// 		req.pipe(req.busboy);
// 		req.busboy.on('file', function (fieldName, file, filename) {
// 			fStream =fs.createWriteStream(__dirname+'uploadFile/'+filename);
// 			file.pipe(fStream);
// 			fStream.on('close',function () {
//             res.json({content:"上传成功"});
// 			})
// 		});
// 		// updateUser(req, res, "post");
// 	});
// 	//以get方式注册更新用户信息的路由
// 	router.get("/findUser", function (req, res) {
// 		var pIndex = req.query.pageIndex;
// 		var pSize = req.query.pageSize;
// 		pIndex = Number(pIndex);
// 		pSize = Number(pSize);
// 		dbSequelize.getUser().then(function (r) {
// 			var result = {
// 				status: 0,
// 				message: "",
// 				contents: [],
// 				total: r.length
// 			};
// 			var start = 0;
// 			var end = 0;
// 			start = pIndex * pSize;
// 			end = start + pSize;
// 			if (end > r.length) {
// 				end = r.length;
// 			}
// 			for (var i = start; i < end; i++) {
// 				var rTemp = r[i];
// 				var data = {
// 					id: rTemp.dataValues.id,
// 					userName: rTemp.dataValues.userName,
// 					email: rTemp.dataValues.email,
// 					phoneNumber: rTemp.dataValues.phoneNumber,
// 					realName: rTemp.dataValues.realName,
// 					age: rTemp.dataValues.age,
// 					qq: rTemp.dataValues.qq,
// 					createAt: rTemp.dataValues.createdAt,
// 					updateAt: rTemp.dataValues.updatedAt
// 				};
// 				result.contents.push(data);
// 			}
// 			res.json(result);
// 		});
// 	});
//
// };


var dbSequelize = require('../sequelize-mysql/data-base');
//exports暴露init方法给引用本模块的模块
//init方法的作用，使用传递进来的router对象，注册用户相关的操作的路由
var fs = require("fs-extra");
var formidable=require("formidable");
exports.init = function (router) {
	function updateUser(req, res, method) {
		//创建临时对象userData，接收客户端传递的参数
		//req.query,接收地址最后的?传递的参数
		var userData = null;
		if (method == "get") {
			userData = {
				userName: req.query.userName,
				email: req.query.email,
				mobile: req.query.mobile,
				qq: req.query.qq,
				realName: req.query.realName,
				age: req.query.age,
				id: req.query.id,
				avator: req.body.icon
			};
		} else if (method == "post") {
			var remark=JSON.stringify({
				iconFile:req.body.icon
			});
			userData = {
				userName: req.body.userName,
				email: req.body.email,
				mobile: req.body.mobile,
				qq: req.body.qq,
				realName: req.body.realName,
				age: req.body.age,
				id: req.body.id

			};
			if(remark){
				userData.remark=remark;
			}
		}
		//判断客户端是否传递userid，如果传了userid表示数据库已存在该用户的信息，
		//要去更新这条数据
		//如果没传userid表示要在数据库新建一条数据
		if (userData.id) {
			//修改已存在的用户数据
			dbSequelize.updateUser(userData).then(function (r) {
				res.redirect("/views/employee/employee.html");
				//更新数据操作是由nodejs发起的请求
				//由数据库执行，当数据库执行完成后，
				//会通过then方法传递的函数，来告诉nodejs
				//数据库更新完成，更新完成返回的数据由r参数传递
				// res.json({
				// 	flag: 0,
				// 	message: "",
				// 	content: r
				// });
			});
		} else {
			//新增用户数据
			dbSequelize.createUser(userData).then(function (r) {
				var result = {
					id: r.dataValues.id,
					userName: r.dataValues.userName,
					createAt: r.dataValues.createdAt,
					updateAt: r.dataValues.updatedAt,
					email: r.dataValues.email,
					mobile: r.dataValues.mobile,
					realName: r.dataValues.realName,
					age: r.dataValues.age,
					qq: r.dataValues.qq,
					remark:req.body.icon


				};
				// res.json(result);
				res.redirect("/views/employee/employee.html");
			});
		}
	}

	//以get的方式注册更新用户的路由。
	router.get("/updateUser", function (req, res) {
		updateUser(req, res, "get");
	});
	router.post("/updateUser", function (req, res) {
		var iconFile="";
		var form=new formidable.IncomingForm();
		form.parse(req,function (err, fields,files) {

			req.body.icon=iconFile;
			req.body.age=fields.age;
			req.body.email=fields.email;
			req.body.mobile=fields.mobile;
			req.body.qq=fields.qq;
			req.body.realName=fields.realName;
			req.body.userName=fields.userName;
			req.body.id=fields.id;
			updateUser(req, res, "post");
		});
		var fStream;
		//将input里面的type=file可读文件流写入到可写文件流
		req.pipe(req.busboy);
		//文件流写入成功事件
		req.busboy.on('file', function (fieldName, file, filename) {
			if(!filename){
				return;
			}
			iconFile=filename;
			// var body=req.body;
			//创建一个可写文件流对象
			fStream = fs.createWriteStream(__dirname + '/uploadFile/' + filename);
			//将图片文件写入可写文件流，写入完成之后自动关闭文件流(也就是清除内存)
			file.pipe(fStream);
			//监听到文件流被关闭时，表示文件写入磁盘成功
			// fStream.on("close", function () {
			// 	res.json({content: "上传成功!"})
			// });
		});
		//
	});
	router.get("/removeUser",function (req, res) {
		var userId=req.query.id;
		dbSequelize.removeUser(userId).then(function (result) {
			console.log(result);
			res.json({
				flag:1,
				message:"删除成功!"
			})
		})
	});
	router.get("/findUser", function (req, res) {
		var pIndex = req.query.pageIndex;
		var pSize = req.query.pageSize;
		pIndex = Number(pIndex);
		pSize = Number(pSize);
		console.log(pIndex + ":is page index");
		dbSequelize.getUser().then(function (r) {
			var result = {
				status: 0,
				message: "",
				contents: [],
				total: r.length
			};

			var start = 0;
			var end = 0;
			start = pIndex * pSize;
			end = start + pSize;
			if (end > r.length) {
				end = r.length;
			}
			for (var i = start; i < end; i++) {
				var rTemp = r[i];
				var data = {
					id: rTemp.dataValues.id,
					userName: rTemp.dataValues.userName,
					createAt: rTemp.dataValues.createdAt,
					updateAt: rTemp.dataValues.updatedAt,
					email: rTemp.dataValues.email,
					mobile: rTemp.dataValues.mobile,
					realName: rTemp.dataValues.realName,
					age: rTemp.dataValues.age,
					qq: rTemp.dataValues.qq,
					remark:rTemp.dataValues.remark
				};
				result.contents.push(data);
			}
			// r.forEach(function(rTemp){
			//     var data = {
			//         id:rTemp.dataValues.id,
			//         userName:rTemp.dataValues.userName,
			//         createAt:rTemp.dataValues.createdAt,
			//         updateAt:rTemp.dataValues.updatedAt
			//     };
			//     result.contents.push(data);
			// });
			res.json(result);
		});
	});
};