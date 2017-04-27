/**
 * Created by lin on 2017/4/27.
 */
// var oSocket=require('socket.io');
// var cHttp= require('http');
//
// exports.initalWebsoket=function (app) {
// var hServer=	cHttp.server(app);
// 	var soketInOut=oSocket(hServer);
// 	soketInOut.on('connection',function (user) {
// 		global.userList=global.userList||[];
// 		global.userList.push(user);
// 		user.on('talk',function (o) {
// 			global.userList.forEach(function (onUser) {
// 				onUser.emit('talk',o)
// 			})
// 		})
//
// 	});
// 	return hServer
// };