/**
 * Created by lin on 2017/4/12.
 */
/**
 * Created by lin on 2017/4/7.
 */
var Sequelize=require("sequelize");//请求sequelize
var baseConf=require("../configurations/database");//请求动态路由
var mysqlConf=baseConf.mysql;

var sequelize=new Sequelize(
	mysqlConf.database,
	mysqlConf.user,
	mysqlConf.password,
	{
		host:mysqlConf.host,
		port:3306,
		dialect:mysqlConf.dialect,
		pool:{
			max:5,
			min:0,
			idle:1000
		},
		storage:'path/to/database.sqlite'
	});

var User=sequelize.define('userInfo',{
	id:{
		type:Sequelize.STRING,
		primaryKey:true
	},
	userName:{
		type:Sequelize.STRING,
		field:"username"
	},
	password:{
		type:Sequelize.STRING
	},
	phoneNumber:{
		type:Sequelize.STRING
	},
	email:{
		type:Sequelize.STRING
	},
	nickName:{
		type:Sequelize.STRING
	},
	realName:{
		type:Sequelize.STRING
	},
	gender:{
		type:Sequelize.INTEGER
	},
	age:{
		type:Sequelize.INTEGER
	},
	qq:{
		type:Sequelize.STRING
	},
	remark:{
		type:Sequelize.STRING
	}
},{
	freezeTableName:true
});
var Document=sequelize.define('documentInfo',{
	id:{
		type:Sequelize.STRING,
		primaryKey:true
	},
	title:{
		type:Sequelize.STRING
	},
	type:{
		type:Sequelize.STRING
	},
	content :{
		type:Sequelize.STRING
	},
	author  :{
		type:Sequelize.STRING
	},
	avator  :{
		type:Sequelize.STRING
	},
	remark  :{
		type:Sequelize.STRING
	}
},{
	freezeTableName:true
});
exports.updateUser=function (user){
	if(!user.id) return;
	return User.sync().then(function () {
		return User.update({
			userName:user.userName,
			email:user.email,
			phoneNumber:user.mobile,
			realName:user.realName,
			age:user.age,
			qq:user.qq
		},{
			where:{
				id:user.id
			}
		})
	})
};
//创建用户
exports.createUser=function () {
	return User.sync().then(function () {
		return User.create({
			id:"id"+Math.random(),
			userName:'Hancock',
			password:'a121212'
		});
	});
};
exports.createDocument=function () {
	return Document.sync().then(function () {
		return Document.create({
			id:"id"+Math.random(),
			userName:'Lin`',
			password:'lin123456'
		});
	});
};
exports.getUser=function () {
	return User.findAll();
};
exports.getDocument=function () {
	return Document.sync().then(function () {
		return Document.findAll();

	});
};