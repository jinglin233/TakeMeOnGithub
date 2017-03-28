/**
 * Created by lin on 2017/3/28.
 */
document.getElementById("formContainer")
    .onsubmit=function() {
    var PwdEle =
        document.getElementById("password");
    var confirmPwd =
        document.querySelector("#confirmPwd");
    var password=PwdEle.value;
    var conPwd=confirmPwd.value;
    console.log(password);
    console.log(conPwd);
    if(password!=confirmPwd){
        alert("两次密码输入不相等!")
        return false;
    }
};