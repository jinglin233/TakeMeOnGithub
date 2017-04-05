/**
 * Created by lin on 2017/3/28.
 */
document.getElementById("formContainer")//获取form表单
	.onsubmit = function formSubmit() {

	var PwdEle =
		document.getElementById("password");//
	var confirmPwd =
		document.querySelector("#confirmPwd");
	var mobileNumber =
		document.querySelector("#mobileNumber");

	var password = PwdEle.value;
	var conPwd = confirmPwd.value;

	console.log(password);
	console.log(conPwd);

	if (password != conPwd) {
		alert("两次密码输入不相等!");
		return false;
	}

	function isMobileNumber(num) {
		var isMobileNumber = /^1[345678]\d{9}$/.test(num);//手机号格式验证正则表达式
		return isMobileNumber;
	}

	var flag =isMobileNumber(mobileNumber.value);//flag
	if (!flag ) {
		alert("手机号码格式不正确！");
		return false;
	}
};