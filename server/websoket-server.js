/**
 * Created by lin on 2017/4/27.
 */
var socketIoObj=require('socket.io');
var http=require('http');

exports.initalWebsocket=function (app) {
var httpServer=http.Server(app);
var socketIo=socketIoObj(httpServer);
socketIo.on('connection',function (socket) {
	global.onlineUsers=global.onlineUsers||[];
	global.onlineUsers.push(socket);
	socket.on('chat',function (obj) {
		global.onlineUsers.forEach(function (onlineUser) {
			onlineUser.emit('chat',obj);
		})
	})

});

	return httpServer
};