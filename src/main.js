// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import "../static/css/font-awesome.css";
import "./assets/common.css";
import { SinopecAppPlugin } from "./utils/SinopecAppPlugin.js"; //添加JSBridge组件
import { getQuery, httpGetMethod,getUrl } from "./utils/api.js"; //添加公共组件
import { Tool } from "./utils/tool.js" ;
import fastclick from 'fastclick'


Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Mint);
fastclick.attach(document.body);

/* eslint-disable no-new */

// 获取token信息
window.Identity_Token = getQuery("Identity_Token");

window.SinopecAppPlugin = SinopecAppPlugin;

window.empid = getQuery("employeenumber");    //获取员工编号加密

httpGetMethod("hrs-ess/app/getEmpAgreeLogin.action?", {}, function(result) {
	if(result.success) {
		new Vue({
			el: '#app',
			router,
			template: '<App/>',
			components: {
				App
			}
		}).$mount('#app')

	} else {
		Tool.alert("登陆验证不成功");
	}
});

httpGetMethod("hrs-ess/app/getEmpInfo.action?", {}, function(result) {
  if(result.success) {
    window.empName = result.data.empName;
    window.orgCode = result.data.orgCode;
    window.orgCode2 = result.data.orgCode2;
  }
});
