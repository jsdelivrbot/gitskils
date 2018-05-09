/**
 *
 */
import Vue from 'vue';
import { MessageBox } from 'mint-ui';  // 弹框组 件
import { Indicator } from 'mint-ui';  // loading组件
import { Toast } from 'mint-ui';

/*
 * 公共变量
 * */
export let Tool = {

	/*
	 * 提示信息，有确定按钮，参数可配置
	 * message：提示信息
	 * title：提示标题。可不填
	 * showCancelButton：默认false，布尔值
	 * scuessfun：确定按钮的回调
	 * cancelfun：取消按钮的回调
	 * */


	alert:function(message,title,showCancelButton,scuessfun,cancelfun){

		MessageBox({
		  title:title || "",
		  message: message,
		  showCancelButton: showCancelButton
		}).then(action => {
			if(action === "confirm"){
				if(scuessfun){
					scuessfun();
				}
			}else{
				if(cancelfun){
					cancelfun();
				}
			}
		});

	},
  ItAlert:function(message,title,scuessfun,cancelfun){

    MessageBox({
      title:title || "",
      message: message,
      showCancelButton: true,
      showConfirmButton:true,
      confirmButtonText:'查看详情',
      cancelButtonText:'返回'
    }).then(action => {
      if(action === "confirm"){
        if(scuessfun){
          scuessfun();
        }
      }else{
        if(cancelfun){
          cancelfun();
        }
      }
    });

  },
	/*
	 * 自定义弹出框内容
	 */
	prompt:function(option,scuessfun,cancelfun){
		MessageBox(option).then(action => {
			if(action === "confirm"){
				if(scuessfun){
					scuessfun();
				}
			}else{
				if(cancelfun){
					cancelfun();
				}
			}
		});

	},
	/*
	 'snake'
	'fading-circle' //默认
	'double-bounce'
	'triple-bounce'
	 * */
	loading:function(texts,spinnerType){

		Indicator.open({
		  text:texts || "",
		  spinnerType: spinnerType || "fading-circle"
		});

	},

	close:function(){
		Indicator.close();
	},

	tip:function(message,duration){
		var instance = Toast({
		  message: message
		});
		duration  = duration ? duration : 1000000;
			setTimeout(() => {
			  instance.close();
			}, duration);


	},

	//处理时间的方法

	formate:function(data, format){

			var o = {
				"M+": data.getMonth() + 1, //month
				"d+": data.getDate(), //day
				"h+": data.getHours(), //hour
				"m+": data.getMinutes(), //minute
				"s+": data.getSeconds(), //second
				"q+": Math.floor((data.getMonth() + 3) / 3), //quarter
				"S": data.getMilliseconds() //millisecond
			}
			if(/(y+)/.test(format)) {
				format = format.replace(RegExp.$1, (data.getFullYear() + "").substr(4 - RegExp.$1.length));
			}

			for(var k in o) {
				if(new RegExp("(" + k + ")").test(format)) {
					format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
				}
			}
			return format;


	},

  //合同序号验证
  checkNum:function (num) {
    if (!num) {
      this.alert("合同序号不能为空！");
      return false;
    } else if(!(/^[a-zA-Z0-9][0-9]{9}$/.test(num))) {
      this.alert("合同序号有误，请重填");
      return false;
    }
    return true;
  },

  //手机号验证
  checkPhone:function (phone) {
    if (!phone) {
      this.alert("联系手机不能为空！");
      return false;
    } else if(!(/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9})|(0\d{2,3}\d{7,8}))$/.test(phone))) {
      this.alert("来源人电话有误，请重填");
      return false;
    }
    return true;
  },

  //邮箱验证
  checkEmail:function (email) {
    if (!email) {
      this.alert("邮箱不能为空！");
      return false;
    } else if(!(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(email))) {
      this.alert("邮箱有误，请重填");
      return false;
    }
    return true;
  },

  // 身份证号验证
  checkIdentity:function (num) {
    if (!num) {
      this.alert("新数据不能为空！");
      return false;
    } else if(!(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test(num))) {
      this.alert("新数据格式有误，请重填");
      return false;
    }
    return true;
  },

  formatTime: function (time,id) {
    let date = new Date(time);
    if(id==1) {
      return this.formate(date, 'yyyyMM')
    }
    else if(id==2) {
      return this.formate(date, 'yyyy-MM')
    }
    else if(id==4) {
      return this.formate(date, 'yyyy年MM月dd日')
    }
    else if(id==5) {
      return this.formate(date, 'dd')
    }
    else if(id==6) {
      return this.formate(date, 'yyyy/MM')
    }
    else {
      return this.formate(date, 'yyyy年MM月')
    }
  },

  //获取是周几
  getMyDay: function (time) {
    let date = new Date(time);
    if(date.getDay()==0){
      var week= "星期日";
    }
    if(date.getDay()==1){
      var week = "星期一";
    }
    if(date.getDay()==2){
      var week="星期二"
    }
    if(date.getDay()==3){
      var week="星期三"
    }
    if(date.getDay()==4){
      var week="星期四"
    }
    if(date.getDay()==5){
      var week="星期五"
    }
    if(date.getDay()==6){
      var week="星期六"
    }
    return week;
  },

  //获取上一个月
  getPreMonth(date) {
    var arr = date.split('/');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
      year2 = parseInt(year2) - 1;
      month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    var t2 = year2 + '/' + month2 + '/' + day2;
    return t2;
  },

  //获取前三个月的日期
  getPreThreeMonth(date) {
    var resultDate,year,month,date,hms;
    var currDate = new Date(date);
    year = currDate.getFullYear();
    month = currDate.getMonth()+1;
    date = currDate.getDate();
    hms = currDate.getHours() + ':' + currDate.getMinutes() + ':' + (currDate.getSeconds() < 10 ? '0'+currDate.getSeconds() : currDate.getSeconds());
    switch(month)
    {
      case 1:
      case 2:
      case 3:
        month += 9;
        year--;
        break;
      default:
        month -= 3;
        break;
    }
    month = (month < 10) ? ('0' + month) : month;
    resultDate = year + '/'+month+'/'+date;
    return resultDate;
  },

  /*
    时间段选取
    日期类型 timetype：1 今天  2 本周  3 本月  4 今年
    传入日期参数 data
    日期格式 timeformat
    */
  timeslot:function(timetype, data , timeformat){
    var start = '',end = '',
      oneday = 1000*60*60*24,
      getday = data.getDay(),
      getmonth = data.getMonth(),
      getyear = data.getFullYear();
    switch(timetype){
      case 1:
        start = data;
        end = data;
        break;
      case 2:
        start = new Date(data.getTime()-(getday-1)*oneday);
        end = new Date(data.getTime()+(7-getday)*oneday);
        break;
      case 3:
        start = new Date(getyear,getmonth,1);
        end = new Date(new Date(getyear,getmonth+1,1).getTime() - oneday);
        break;
      case 4:
        start = new Date(getyear,0,1);
        end = new Date(getyear,11,31);
        break;
      default:
        start = '';
        end = '';
        break;
    }
    if(start) {
      start = Tool.formate(start, timeformat);
      end = Tool.formate(end, timeformat);
    }
    return {
      start: start,
      end: end
    }
  },

  // 获取上一年
  getLastYearYestdy(date){
    var strYear = date.getFullYear() - 1;
    var strMonth = date.getMonth()+1;
    var strDay = date.getDate();
    if(strMonth<10)
    {
      strMonth="0"+strMonth;
    }
    var datastr = strYear+'-'+strMonth+'-'+strDay;
    return datastr;
  }



}



