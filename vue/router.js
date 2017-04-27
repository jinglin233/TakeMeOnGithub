/**
 * Created by lin on 2017/4/26.
 */

var homeComponent={template:'<div>主页</div>'};
var router2Component={template:'<div>第二页</div>'};
var router3Component={template:'<div>第三页</div>'};
var profileComponent={template:'<div>用户信息</div>'};

var routes=[
{path:'/home',component:homeComponent},
{path:'/router2',component:router2Component},
{path:'/router3',component:router3Component},
{path:'/profile',component:profileComponent}
];
var router =new VueRouter({
          routes:routes
});
var app=new Vue({
	router:router
}).$mount("#app");