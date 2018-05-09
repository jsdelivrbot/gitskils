/**
 *
 */
import Vue from 'vue';
import axios from 'axios';
import { Tool } from "./tool.js"; //添加公共组件
import { DES3 } from "./des.js"   //加密

Vue.prototype.$http = axios;

// const mainDomain = "http://app.m.sinopec.com/";   // 正式地址
const mainDomain = "http://10.246.136.233:8080/";  // 测试地址

//服务申请和服务查询
const webserviceUrl =  "http://10.246.173.144:8080/itsscit/WebService/GenerateServiceBillCode?wsdl";   //服务申请测试地址
const webserviceUrl1 =  "http://10.246.173.144:8080/itsscit/WebService/QueryServiceInfo?wsdl";   //服务查询测试地址

//报销
const mainDomainBxxx = "http://10.246.109.17/"; //报销信息测试地址
// const mainDomainBxxx = "http://fss.sinopec.com/fss/"; //报销信息正式地址

const gltbUrl = 'https://10.246.161.143/yqybLogin.htmw?n=';

//电子考勤
const mainDomainDzkq = "http://10.246.172.190:8080/";  // 测试地址
// const mainDomainDzkq = "http://10.246.162.14/";  // 正式地址
/*
 * 公共变量
 * */
export {mainDomain}
export function State(config) {

	//注册公共变量
	let configObj = {
		"mainDomain": mainDomain,
		"Identity_Token": window.empid,
		"wh": window.innerHeight,
		"pageh": window.innerHeight - 44 + "px"
	}
	if(config && typeof config == 'object') {
		for(let attr in config) {
			configObj[attr] = config[attr];
		}
	}
	return configObj
}

export function getQuery(name) {
	let search = window.location.search;
	if(search.indexOf('?') >= 0) search = search.substr(1);
	var params = search.match(new RegExp('(^|&)' + name + '=([^&]*)(&|$)'));
	if(params != null && params.length > 2) return window.unescape(params[2]);
	return '';
}

export let httpGetMethods = async() => {
	axios.get(mainDomain + 'hrs-ess/app/getEmpAgreeLogin.action?', {
			params: {
				"token": "05ansZ8uIiTIZhtgKSZqvA=="
			}
		})
		.then(function(response) {
			return response.data
		})
		.catch(function(error) {
			console.log(error);
		});
}

export function httpGetgltbUrl() {
	window.location.href = 'https://10.246.161.143/yqyb/index.html?token=Jrhx+lIoX+8zBz68MwIMJw==&number=' + Math.random();

	// Tool.loading();
	// axios.get(gltbUrl + Math.random(), {})
	// 	.then(function(response) {
	// 		Tool.close();
	// 		window.location.href = "https://10.246.161.143/yqyb/index.html?token=" + window.Identity_Token + "&number=" + Math.random();
	// 	})
	// 	.catch(function(error) {
	// 		Tool.close();
	// 		Tool.alert("暂不支持外网访问");
	// 	});
}

export function httpGetMethod(methond, param, scussessfun, errorfun, ishowload) {
	let baseparams = {
		"Identity_Token": window.empid
	}

	let urls = mainDomain + methond;

	if(typeof param == "object") {
		for(let attr in param) {
			baseparams[attr] = param[attr];
		}
	}
	if(!ishowload) {
		Tool.loading();
	}

	axios.get(urls, {
			params: baseparams,
      timeout:20000
		})
		.then(function(response) {
			if(!ishowload) {
				Tool.close();
			}

			if(scussessfun) {
				scussessfun(response.data)
			}
		})
		.catch(function(error) {
			Tool.close();
			if(errorfun) {
				errorfun(error)
			}
		});
}

//电子考勤
export function httpGetDzkq(methond, param, scussessfun, errorfun, ishowload) {

  let baseparams = {
    "Identity_Token": window.empid
  }
  let urls = mainDomainDzkq + methond;

  if(typeof param == "object") {
    for(let attr in param) {
      baseparams[attr] = param[attr];
    }
  }
  if(!ishowload) {
    Tool.loading();
  }

  axios.get(urls, {
    params: baseparams
  })
    .then(function(response) {
      if(!ishowload) {
        Tool.close();
      }

      if(scussessfun) {
        scussessfun(response.data)
      }
    })
    .catch(function(error) {
      Tool.close();

      if(errorfun) {
        errorfun(error)
      }
    });
}

export function httpGetBxxx(methond, param, scussessfun, errorfun, ishowload) {
  let date = new Date();
  let time = formatDate(date);
  let key = md5("pictcslth123!@#" + time);
  let baseparams = {
    "pubKey": key,
    "isEncrypt": 1,
    "empId": DES3.encrypt('0okm9ijn8uhb7ygv6tfc5rdx','00000324'),
    "iszb":1
}

  let urls = mainDomainBxxx + methond;

  if(typeof param == "object") {
    for(let attr in param) {
      baseparams[attr] = param[attr];
    }
  }
  if(!ishowload) {
    Tool.loading();
  }

  axios.get(urls, {
    params: baseparams
  })
    .then(function(response) {
      if(!ishowload) {
        Tool.close();
      }

      if(scussessfun) {
        scussessfun(response.data)
      }
    })
    .catch(function(error) {
      Tool.close();

      if(errorfun) {
        errorfun(error)
      }
    });
}

export function httpService(methond, param, scussessfun, errorfun, ishowload) {

  let urls = webservice + methond;

  if(!ishowload) {
    Tool.loading();
  }

  axios.get (urls, {
    params: param
  })
    .then(function(response) {
      if(!ishowload) {
        Tool.close();
      }

      if(scussessfun) {

        let data1 = response.data.substring(1,response.data.length-1);

        let data2 = eval('(' + data1 + ')');

        let data3 = eval('(' + data2.result + ')');

        scussessfun(data3);
      }
    })
    .catch(function(error) {
      Tool.close();

      if(errorfun) {
        errorfun(error)
      }
    });
}

export function httpWebservice(method, params, isapply , scussessfun, errorfun, ishowload) {

  var data;
  data = '<?xml version="1.0" encoding="utf-8"?>';
  data = data + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">';
  data = data + '<soap:Body>';

  var isobject = false;
  var paramsStr = "";
  for(var attr in params) {
    if(attr) {
      isobject = true;
      paramsStr = paramsStr + '<' + attr + '>' + params[attr] + '</' + attr + '>';
    }
  }
  if(isobject) {
    if(isapply) {
      data = data + '<' + method + ' xmlns="http://webservice.pcitc.itsscit.com/GenerateServiceBillCode">';
    }
    else {
      data = data + '<' + method + ' xmlns="http://webservice.pcitc.itsscit.com/QueryServiceInfo">';
    }
    data = data + method;
    data = data + paramsStr
    data = data + '</' + method + '>';
  } else {
    if(isapply) {
      data = data + '<' + method + 'Response  xmlns="http://webservice.pcitc.itsscit.com/GeneratrviceBileSelCode"/>';
    }
    else {
      data = data + '<' + method + 'Response  xmlns="http://webservice.pcitc.itsscit.com/QueryServiceInfo"/>';
    }

  }

  data = data + '</soap:Body>';
  data = data + '</soap:Envelope>';

  if(!ishowload) {
    Tool.loading();
  }
  axios.post(isapply==true?webserviceUrl:webserviceUrl1,data, {
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
      // 'SOAPAction': 'http://webservice.pcitc.itsscit.com/GeneratrviceBileSelCode' + method
    }
  })
    .then(function(response) {
      if(!ishowload) {
        Tool.close();
      }

      if(scussessfun) {
        // console.log(response)
        // var xmlstr = response["data"].split(method + "Result")[1];
        // var xmlJson
        // try {
        //   xmlJson = JSON.parse(xmlstr.slice(1, xmlstr.length - 2));
        // } catch(e) {
        //   xmlJson = "";
        //
        // }
        var strIndex1 = response.data.indexOf('<return>');
        var strIndex2 = response.data.indexOf('</return>');
        var xmlJson
        try {
          xmlJson = JSON.parse(response.data.substring(strIndex1+8,strIndex2));
        } catch(e) {
          xmlJson = "";

        }
        if(method!="filedIsDisplay" && method!="generateBillServiceCode" && method!="queryDocContent") {
          xmlJson.message = JSON.parse(xmlJson.message);
        }
        // if(!isapply&&method=="queryServiceList") {
        //   xmlJson.message = JSON.parse(xmlJson.message);
        // }
        scussessfun(xmlJson)
      }
    })
    .catch(function(error) {
      Tool.close();

      if(errorfun) {
        errorfun(error)
      }
    });
}

export function modul(type) {
	let title = "";
	switch(type) {
		case "01":
			title = "养老保险";
			break;
		case "02":
			title = "医疗保险";
			break;
		case "03":
			title = "工伤保险";
			break;
		case "04":
			title = "生育保险";
			break;
		case "05":
			title = "失业保险";5
			break;
		case "06":
			title = "公积金/年金";
			break;
		case "07":
			title = "内退及其他";
			break;
		case "08":
			title = "职业通道";
			break;
		case "09":
			title = "考勤管理";
			break;
    case "10":
      title = "差旅报销";
      break;
		case "20":
			title = "小常识";
			break;
		case "30":
		    title = "经验分享";
			break;
		case "40":
			title = "资讯信息";
			break;
		default:
			title = "政策指南";
			break;
	}

	return title;

}

export function formatDate(time) {

    let date = new Date(time);

    return Tool.formate(date, 'yyyyMMdd')
}
