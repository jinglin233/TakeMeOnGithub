/**
 * Created by lin on 2017/4/7.
 */
var Sequelize = require("sequelize");//引入sequelize
//引入数据库配置，比如数据库主机，端口号，数据库名，登陆用户名和密码，数据库类型，数据库最大连接池，每个连接池最大连接数
var uuid=require("node-uuid");
var baseConf = require("../configurations/database");
var mysqlConf = baseConf.mysql;
//调用Sequelize函数，设置数据库主机等信息
var sequelize = new Sequelize(
	mysqlConf.database,
	mysqlConf.user,
	mysqlConf.password,
	{
		host: mysqlConf.host,
		port: 3306,
		dialect: mysqlConf.dialect,
		pool: {
			max: 5,
			min: 0,
			idle: 1000
		},
		storage: 'path/to/database.sqlite'
	});
//创建与数据库中数据表对映的orm对象
//orm( object Relative Mapping 对象关系映射 )
//sequelize.define 方法，第一个参数是数据库表名，数据类型  string
//第二个参数 数据表字段的定义 数据类型 object
//第三个参数 同步数据表的行为参数 参数类型 object
var User = sequelize.define('userInfo', {

	id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	userName: {
		type: Sequelize.STRING,
		field: "username"
	},
	password: {
		type: Sequelize.STRING
	},
	phoneNumber: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	nickName: {
		type: Sequelize.STRING
	},
	realName: {
		type: Sequelize.STRING
	},
	gender: {
		type: Sequelize.INTEGER
	},
	age: {
		type: Sequelize.INTEGER
	},
	qq: {
		type: Sequelize.STRING
	},
	remark: {
		type: Sequelize.STRING
	},
	status:{
		type: Sequelize.INTEGER,
		defaultValue:0
	}
}, {
	//默认为false，修改表名为复数，true不修改表名
	//与数据库表名一致
	freezeTableName: true
});
var Title = sequelize.define('documentInfo', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING
	},
	type: {
		type: Sequelize.STRING
	},
	content: {
		type: Sequelize.STRING
	},
	author: {
		type: Sequelize.STRING
	},
	remark: {
		type: Sequelize.STRING
	}
}, {
	freezeTableName: true
});
// var House=sequelize.define('recommendinfo',{
// 	id:{
// 		type:sequelize.STRING,
// 		primaryKey:true
// 	},
// 	title:{
// 		type:sequelize.STRING
// 	},
// 	img:{
// 		type:sequelize.STRING
// 	},
// 	address:{
// 		type:sequelize.STRING
// 	},
// 	price:{
// 		type:sequelize.STRING
// 	},
// 	tips:{
// 		type:sequelize.STRING
// 	},
// 	privilege:{
// 		type:sequelize.STRING
// 	},
// 	remark:{
// 		type:sequelize.STRING
// 	}
// },{
// 	freezeTableName: true
// });
var ReportUnit = sequelize.define("reportUnit", {
		id: {
			type: Sequelize.STRING,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING
		},
		status: {
			type: Sequelize.INTEGER
		},
		remark: {
			type: Sequelize.STRING
		}
	});

exports.createReportUnit = function (unit) {
	return ReportUnit.sync().then(function () {
		return ReportUnit.create({
			id: uuid(),
			name: unit.name,
			status: unit.status,
			remark: unit.remark
		});
	})
};
exports.getUnits=function () {
	return ReportUnit.findAll();
};
exports.getTitle=function () {
	return Title.findAll();
};
exports.updateUser = function (user) {
	if (!user.id) return;
	return User.sync().then(function () {
		return User.update({
			userName: user.userName,
			email: user.email,
			phoneNumber: user.mobile,
			realName: user.realName,
			age: user.age,
			qq: user.qq,
			remark:user.remark
		}, {
			where: {
				id: user.id
			}
		})
	})
};
//创建用户
exports.createUser = function (user) {
	return User.sync().then(function () {
		return User.create({
			id: "id" + Math.random(),
			userName: user.userName,
			password: 'a121212',
			email: user.email,
			phoneNumber: user.mobile,
			realName: user.realName,
			age: user.age,
			qq: user.qq,
			remark:user.remark
		});
	});
};
exports.createDocument = function () {
	return Document.sync().then(function () {
		return Document.create({
			id: "id" + Math.random(),
			userName: 'Lin`',
			password: 'lin123456'
		});
	});
};
exports.removeUser=function (id) {
	return  User.update({
		status:-1
	},{
		where:{
			id:id
	    }
	})
};
exports.getUser = function () {
	return User.sync().then(function () {
		return User.findAll({
			where:{
			status:0
		   }
		});
	})
};
exports.getDocument = function () {
	return Document.sync().then(function () {
		return Document.findAll();

	});
};
exports.createTitle=function (unit) {
	return Title.sync().then(function () {
		return Title.create({
			id: uuid(),
			title:unit.title,
			author:unit.author
		});
	})
};
