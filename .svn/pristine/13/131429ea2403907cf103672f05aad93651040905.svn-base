import { httpGetMethod } from './api.js';


/**
 * [loginStatisticalAnalysis 登录统计分析]
 * @param  {[type]} employee [员工编号]
 * @return {[type]}          [description]
 */
export function loginStatisticalAnalysis() {
  let self = this;
  httpGetMethod("/hrs-ess/app/statistical4Login.action?", {
    "employeenumber": window.empid
  },function(result) {
    if(result.success) {
      console.log("登录统计成功了！");
      window.sessionStorage.setItem("loginStatisticalAnalysis", true);
    }
    else {
      console.log("登录统计失败了！");
    }
  }, function() {}, false);
}

/**
 * [modelStatisticalAnalysis 每个模块的统计分析]
 * @param  {[type]} funcCode  [模块的编号]
 * @param  {[type]} modelName [模块的名称]
 * @param  {[type]} tag       [用于标识是否统计过的标志]
 * @param  {[type]} token     [token]
 * @return {[type]}           [description]
 */
export function modelStatisticalAnalysis(funcCode,modelName,tag) {
  let self = this;
  httpGetMethod("/hrs-ess/app/statistical4Login.action?", {
    "funcCode": funcCode
  },function(result) {
    if(result.success) {
      console.log(modelName + "统计成功了！");
      window.sessionStorage.setItem(tag, true);
    }
    else {
      console.log(modelName + "统计失败了！");
    }
  }, function() {}, false);
}
