/**
 * Created by forli on 2017/4/6.
 */
//引入data-base模块，使用sequelize操作数据库
let dbSequelize = require('../sequelize-mysql/data-base');
let fs = require("fs-extra");
let formidable = require("formidable");
let moment = require('moment');

//exports暴露init方法给引用本模块的模块
//init方法的作用，使用传递进来的router对象，注册用户相关的操作的
//路由
exports.init = function (router) {
	function updateUser(req, res, method) {
		//创建临时对象userData，接收客户端传递的参数
		//req.query，接收地址最后的?传递的参数
		let userData = null;
		if (method == "get") {
			userData = {
				userName: req.query.userName,
				email: req.query.email,
				mobile: req.query.mobile,
				qq: req.query.qq,
				realName: req.query.realName,
				age: req.query.age,
				id: req.query.id,
				password: req.query.password
			};
		} else if (method == "post") {
			let remark = null;
			if (req.body.icon) {
				remark = JSON.stringify({
					iconFile: req.body.icon
				});
			}
			userData = {
				userName: req.body.userName,
				email: req.body.email,
				mobile: req.body.mobile,
				qq: req.body.qq,
				realName: req.body.realName,
				age: req.body.age,
				id: req.body.id,
				password: req.body.password
			};
			if (remark) {
				userData.remark = remark;
			}
		}
		//判断客户端是否传递userid
		//如果传了userid 表示是数据库已存在该用户的信息，要去
		//更新这条数据。
		//如果没传userId表示要在数据库新建一条数据
		if (userData.id) {
			//修改已存在的用户数据
			dbSequelize.updateUser(userData).then(function (r) {
				//更新数据操作是由nodejs发起的请求，
				//由数据库执行，当数据库执行完成后，
				//会通过then方法传递的函数，来告诉nodejs
				//数据库更新完成，更新完成返回的数据由r参数传递
				// res.json({
				//     flag:0,
				//     message:"",
				//     content:r
				// });
				res.redirect("/views/employee/employee.html");
			});
		} else {
			//新增用户数据
			dbSequelize.createUser(userData).then(function (r) {
				let result = {
					id: r.dataValues.id,
					userName: r.dataValues.userName,
					createAt: r.dataValues.createdAt,
					updateAt: r.dataValues.updatedAt
				};
				// res.json(result);
				res.redirect("/views/employee/employee.html");
			});
		}
	}

	//以get的方式注册更新用户信息的路由
	router.get("/updateUser", function (req, res) {
		updateUser(req, res, "get");
	});
	router.post("/updateUser", function (req, res) {
		let iconFile = "";
		let form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			// let data = {
			//     fields: fields,
			//     files: files
			// };
			// console.log(iconFile);
			// res.writeHead(200, {'content-type': 'text/plain'});
			// res.write('received upload:\n\n');
			// res.end(util.inspect({fields: fields, files: files}));
			req.body.icon = iconFile;
			req.body.age = fields.age;
			req.body.email = fields.email;
			req.body.mobile = fields.mobile;
			req.body.qq = fields.qq;
			req.body.realName = fields.realName;
			req.body.userName = fields.userName;
			req.body.id = fields.id;
			req.body.password = fields.password;
			updateUser(req, res, "post");
		});
		let fStream;
		//将input type=file中的可读文件流，
		//写入到可写文件流
		req.pipe(req.busboy);
		//文件流写入成功事件
		req.busboy.on('file', function (fieldName, file, filename) {
			if (!filename) {
				return;
			}
			iconFile = filename;
			// let body = req.body;
			//创建一个可写文件流对象
			fStream = fs.createWriteStream('./server/uploadFile/' + filename);
			//将图片文件写入可写文件流，写入完成之后自动关闭
			//文件流(也就是清除内存)
			file.pipe(fStream);
			//监听到文件流被关闭时，表示文件写入磁盘成功！
			fStream.on("close", function () {
				console.log("上传成功");
			});
		});


	});
	router.get("/findUser", function (req, res) {
		let pIndex = req.query.pageIndex;
		let pSize = req.query.pageSize;
		pIndex = Number(pIndex);
		pSize = Number(pSize);
		console.log(pIndex + ":is page index.");

		dbSequelize.getUser(null, {pageIndex: pIndex, pageSize: pSize}).then(function (r) {
			let result = {
				status: 0,
				message: "",
				contents: [],
				total: r.length
			};
			let start = pIndex * pSize;
			let end = start + pSize;
			if (end > r.length) {
				end = r.length;
			}
			for (let i = start; i < end; i++) {
				let rTemp = r[i];
				let data = {
					id: rTemp.dataValues.id,
					userName: rTemp.dataValues.userName,
					age: rTemp.dataValues.age,
					email: rTemp.dataValues.email,
					phoneNumber: rTemp.dataValues.phoneNumber,
					qq: rTemp.dataValues.qq,
					realName: rTemp.dataValues.realName,
					createAt: rTemp.dataValues.createdAt,
					updateAt: rTemp.dataValues.updatedAt,
					remark: rTemp.dataValues.remark
				};
				result.contents.push(data);
			}
			// r.forEach(function(rTemp){
			//     let data = {
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
	router.get("/removeUser", function (req, res) {
		let userId = req.query.id;
		dbSequelize.removeUser(userId).then(function (result) {
			console.log(result);
			res.json({
				flag: 1,
				message: "删除成功！"
			});
		});
	});
	router.post("/login", function (req, res) {
		//req.query 获取get上来的数据
		//req.body 获取post上来的数据 需要安装body-parser
		if (!req.body || !req.body.email || !req.body.password) {
			res.json({
				msg: "邮箱和密码不能为空！"
			});
			return false;
		}
		dbSequelize.findUserByWhere({
			email: req.body.email,
			password: req.body.password
		}).then(function (result) {
			if (!result || !result.dataValues) {
				res.json({msg: "用户名或密码不正确"});
				return false;
			}
			let expire = 5 * 24 * 60 * 60 * 1000;
			let now = moment();
			let loginTime = now.format("YYYY-MM-DD HH:mm:ss");
			let loginMessage = loginTime + req.body.email;
			res.cookie("auth", loginMessage, {maxAge: expire});
			res.cookie("userId", result.dataValues.id, {maxAge: expire});
			res.cookie("realName", result.dataValues.realName, {maxAge: expire});
			res.cookie("email", result.dataValues.email, {maxAge: expire});
			let redirectUrl = req.body.redirectUrl;
			res.redirect(redirectUrl);
		});
	});
	router.get("/add-friend", (req, res) => {
		dbSequelize.addFriend(req.query.user, req.query.friend)
			.then((result) => {
				res.json({msg: "添加好友成功！"});
			});
	});
	router.get("/remove-friend", (req, res) => {
		dbSequelize.removeFriend(req.query.user, req.query.friend)
			.then((result) => {
				res.json({msg: "删除好友成功！"});
			});
	});
	router.get("/get-friends", (req, res) => {
		dbSequelize.getFriends(req.query.user)
			.then((result) => {
				res.json(result);
			});
	});
};