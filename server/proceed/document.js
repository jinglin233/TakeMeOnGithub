/**
 * Created by lin on 2017/4/10.
 */
// var dbSequelize = require('../sequelize-mysql/data-base');
// exports.init=function (router) {
// 	router.get("/createReportUnit",function (req, res) {
// 		var unit={
// 			name:req.query.name,
// 			status:0
// 		};
// 		dbSequelize.createReportUnit(unit).then(function (result) {
//              res.json(result)
// 		})
// 	})
// };

var dbSequelize = require('../sequelize-mysql/data-base');
exports.init = function(router){
	router.get("/createTitle",function (req, res) {
		var unit={
			title:req.query.title
		};
		dbSequelize.createTitle(unit).then(function (result) {
			res.json(result)
		})
	});
	router.get("/getTitle",function (req, res) {
		dbSequelize.getTitle().then(function (result) {
			res.json(result);
		})
	});
	router.get("/createReportUnit",function (req, res) {
		var unit={
			name:req.query.name,
			status:0
		};
		dbSequelize.createReportUnit(unit).then(function (result) {
			res.json(result)
		})
	});
	router.get("/getUnits",function (req, res) {
		dbSequelize.getUnits().then(function (result) {
           res.json(result);
		})
	});
};
