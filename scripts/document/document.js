/**
 * Created by lin on 2017/4/6.
 */
var container= document.querySelector(".container");
var gPageIndex = 0;
var gPageSize = 8;
var dataBody = document.querySelector("#dataBody");
function setContainerHeight(height) {
	container.style.height=height+"px";
	setContainerHeight=function () {

	}
}
function getData(currentPageIndex) {
	var xhr = new XMLHttpRequest();
	xhr.open("get", "/findUser?pageIndex=" + currentPageIndex+"&pageSize="+gPageSize);
	xhr.onload = function () {
		var res = null;
		if (xhr.response) {
			res = JSON.parse(xhr.response);
			BootstrapPagination(
				$("#paginations"),
				{
					layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
					pageSize: 8,
					leftFormateString: "{count}/{total}",
					//当前页索引编号。从其开始（从0开始）的整数。
					pageIndex: gPageIndex,
					rightFormateString: "{pageNumber}/{totalPages}",
					pageGroupSize: 5,
					total: res.total,
					pageNumberFormateString: "{pageNumber}",
					pageSizeListFormateString: "{pageSize}",
					//当分页更改后引发此事件。
					pageChanged: function (pageIndex, pageSize) {
						gPageIndex = pageIndex;
						getData(gPageIndex);
					}
				});
			var html = "";
			res.contents.forEach(function (employee) {
				html += "<tr data-uid='" + employee.id + "'>";

				html += "<td onclick='userNameClick(this)'>";
				html += employee.userName;
				html += "</td>";

				html += "<td onclick='emailClick(this)'>";
				html += employee.email ? employee.email : "";
				html += "</td>";

				html += "<td>";
				html += employee.phoneNumber ? employee.phoneNumber : "";
				html += "</td>";

				html += "<td>";
				html += employee.realName ? employee.realName : "";
				html += "</td>";

				html += "<td>";
				html += employee.age ? employee.age : "";
				html += "</td>";

				html += "<td>";
				html += employee.qq ? employee.qq : "";
				html += "</td>";

				html += "<td>";
				html += employee.icon ? employee.icon : "";
				html += "</td>";

				var createDate = new Date(employee.createAt);
				html += "<td>";
				html += (createDate.getMonth() + 1) +
					"-" + createDate.getDate() +
					" " + createDate.getHours() + ":" + createDate.getMinutes();
				html += "</td>";

				var updateDate = new Date(employee.updateAt);
				html += "<td>";
				html += (updateDate.getMonth() + 1) +
					"-" + updateDate.getDate() +
					" " + updateDate.getHours() + ":" + createDate.getMinutes();
				html += "</td>";

				html += "<td>";
				html += "<input type='button' value='删除' onclick='deleteData(this)' />" +
					"<input type='button' value='更新' onclick='updateData(this)' />";
				html += "</td>";

				html += "</tr>";
			});
			dataBody.innerHTML = html;
			setContainerHeight(container.offsetHeight);
		}

	};
	xhr.send();
}
getData(gPageIndex);

function deleteDate(e) {
	var tr=$(e).parent();
	var id=tr.attr("data-uid");
}
// var mailInput= $("#updateEmail");
var uNameEle=$("#userName");
var uEmailEle=$("#updateEmail");
var uMobileEle=$("#mobile");
var uRnameEle=$("#realName");
var uAgeEle=$("#age");
var uQQEle=$("#qq");

function updateData(element){
	var tr =$(element).parents("tr");
	var tds=tr.children();
	var userName=tds.eq(0).text();
	uNameEle.val(userName);

	var email=tds.eq(1).text();
	uEmailEle.val(email);

	var mobile=tds.eq(2).text();
	uMobileEle.val(mobile);

	var realName=tds.eq(3).text();
	uRnameEle.val(realName);

	var age=tds.eq(4).text();
	uAgeEle.val(age);

	var qq=tds.eq(5).text();
	uQQEle.val(qq);

	var id=tr.attr("data-uid");

	$('#idInput').val(id);

	$('.modal').modal();
}