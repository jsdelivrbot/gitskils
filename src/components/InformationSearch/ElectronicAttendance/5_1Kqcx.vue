<template>

  <div>
    <app-header title="考勤查询"></app-header>
    <div class="kqcx-main" :style="mainPageh">
      <!--头部-->
      <div class="kqcx-head">
        <div class="kqcx-head-content">
          <div class="kqcx-head-img">
            <img v-if='imgurl' :src="imgurl">
          </div>
          <div class="kqcx-head-center">
            <span>{{name}}</span><br>
            <span class="kqcx-head-description">{{department}}</span>
          </div>
          <div class="kqcx-head-calendar" v-if="person==1">
            <span @click="pickerTime">{{pickeTime | formatDate}}</span>
            <span class="fa fa-angle-down fa-lg"></span>
          </div>
          <div class="kqcx-head-calendar kqcx-else-person" v-else>
            <span>{{elseDate | formatDate}}</span>
          </div>
        </div>
      </div>

      <!--明细页面-->
      <div class="kqcx-detail" v-show="type == 1">
        <div class="kqcx-detail-top">
          <span @click="changeType(2)">汇总页面</span>
        </div>
        <!--日历-->
        <div class="dzkq-calendar" :style="pageh" v-if="!noresult">
          <ul class="dzkq-weekdays">
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <div class="clear"></div>
          </ul>
          <ul class="dzkq-days">
            <li v-for="item in calendar" :class="{ dzkqactive: item.arrange == null ? false : true&&currentMonth == new Date().getMonth() + 1 ? item.day.getDate() < new Date().getDate() :true }">
              <!--上一月-->
              <!--{{item.arrange}}-->
              <span v-if="item.day.getMonth()+1 != currentMonth" class="dzkq-other-month">{{ item.day.getDate() }}</span>
              <span v-else="">
                <span v-if="item.day.getDate()>=new Date().getDate()&&item.day.getMonth()+1 == new Date().getMonth() + 1">
                  <span class="dzkq-days-day dzkq-days-not-day">{{ item.day.getDate() }}</span>
                </span>
              <!--本月-->
                <span v-else @click="pick(item)" :class="{ dzkqChecked:item.checked }">
                  <span class="dzkq-days-day" :class="{ CheckedColor:item.checked }">{{ item.day.getDate() }}</span><br>
                  <span class="dzkq-days-arrange" v-show="item.arrange" :class="{ CheckedColor:item.checked }">{{item.arrange}}</span>
                </span>
              </span>
            </li>
            <div class="clear"></div>
          </ul>
          <div class="dzkq-collect-detail">
            <div>{{KqDetailTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{KqDetailweek}}</div>
            <div>{{kqDetailDate}}</div>
            <div v-for="item in kqDetail.kqOvertimeList">
              <span>{{item.flagName}}</span>
              <span>{{item.hrCount}}</span>
              <span>小时</span>
            </div>
            <div v-for="item in kqDetail.kqNightList">
              <span>{{item.flagName}}</span>
              <span>{{item.hrCount}}</span>
              <span>个</span>
            </div>
          </div>
        </div>
        <div class="noresult-wrap" v-else>
          <img class="noresult-img" src="../../../../static/noresult.png">
        </div>
      </div>

      <!--汇总页面-->
      <div class="kqcx-collect" v-show="type == 2">
        <div class="kqcx-collect-top">
          <div>考勤月度汇总</div>
          <div @click="changeType(1)">明细查询</div>
        </div>
        <div v-if="!noresult" :style="hzPageh" class="kqydhz-item">
          <div v-for="item in collectList" class="kqcx-item">
            <div @click="viewDetails(item)">
              <mt-field :label=item.name placeholder="暂无" v-model="item.day" disabled readonly>
                <span class="fa fa-angle-down fa-lg" v-if="!item.expend"></span>
                <span class="fa fa-angle-up fa-lg" v-if="item.expend"></span>
              </mt-field>
            </div>
            <li v-for="it in item.detail" v-if="item.expend">
            <span>
              <span>{{it.day}}</span>
              <span>({{it.week}})</span>
              <span v-show="it.flagName">({{it.flagName}})</span>
            </span>
            </li>
          </div>
        </div>
        <div class="noresult-wrap" v-else>
          <img class="noresult-img" src="../../../../static/noresult.png">
        </div>
      </div>

      <mt-datetime-picker ref="pickerVisible" v-model="pickerValue" :startDate="startTime" :endDate="endTime" type="date" year-format="{value}年" month-format="{value}月" @confirm="handleConfirm">
      </mt-datetime-picker>
    </div>

  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { State,httpGetMethod,httpGetDzkq } from "../../../utils/api.js";
  import { Tool } from "../../../utils/tool.js";
  export default {
    name: 'KqcxComponent',
    data: function() {
      return {
        mainPageh:{
          "height": State().wh - 44 + "px"
        },
        pageh: {
          "min-height": State().wh - 159 + "px"
        },
        hzPageh:{
          height: State().wh - 159 + "px"
        },
        Identity_Token:decodeURIComponent(this.$route.params.empId),
        pickerVisible:false,
        noresult:true,
        noresultDetail:true,
        noresultCollect:true,
        person:decodeURIComponent(this.$route.params.empId)==window.empid?1:2,
        type:1,
        imgurl:'',
        name:'',
        department:'',
        orgCode2:'',
        orgCode:'',
        pickerValue: new Date(),
        pickeTime:new Date(),
        startTime: new Date(new Date().getFullYear() - 1 + '/' + (new Date().getMonth()+1) + '/' + new Date().getDate()),
        endTime: new Date(),
        lastday: new Date(new Date().getFullYear()  + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate() - 1),
        KqDetailTime:'',
        KqDetailweek:'',
        KqDetailday:'',
        day:'',
        currentDay: 20,
        currentMonth: 11,
        currentYear: 2017,
        currentWeek: 1,
        days:[],
        arrange:[],
        i:0,
        calendar:[],
        monthArray:[],
        kqDetailDate:'',
        elseDate:this.$route.params.date,
        checked : false,
        collectList:[
          {
            name:"出勤天数",
            expend:false,
            day:'',
            detail:[

            ]
          },
          {
            name:"缺勤天数",
            expend:false,
            day:'',
            detail:[

            ]
          },
          {
            name:"加班天数",
            expend:false,
            day:'',
            detail:[

            ]
          },
          {
            name:"夜班个数",
            expend:false,
            day:'',
            detail:[

            ]
          }
        ],
        kqDetail:{
          kqOvertimeList:[],
          kqNightList:[]
        },
        kqCofig:{
          kqOvertimeList:[],
          kqNightList:[]
        }
      }
    },
    components: {
      AppHeader
    },
    methods: {
      pickerTime : function () {
        this.$refs.pickerVisible.open();
      },
      changeType : function (type) {
        this.type = type;
      },
      handleConfirm :function () {
        this.pickeTime = this.pickerValue;
        this.reset();
        this.getCalendar();
        this.getKqCollect();
      },
      viewDetails : function (item) {
        item.expend = !item.expend;
      },
      //获取头像
      getHeadImage() {
        let self = this;
        httpGetMethod("hrs-ess/img/getImage.action?", {}, function(result) {

          self.imgurl = result.data;

        });
      },
      //获取个人信息
      getData() {
        let self = this;
        if(self.person == 2) {
          self.pickeTime = self.elseDate;
        }
        httpGetDzkq('hrs-kqs/app/getEmpInfo.action?', {
          Identity_Token: self.Identity_Token
        }, function(result) {
          self.name = result.data.empName;
          self.department = result.data.orgName;
          self.orgCode2 = result.data.orgCode2;
          self.orgCode = result.data.orgCode;
          self.getCalendar();
          self.getKqCollect();
        });
      },
      //获取考勤信息
      getCalendar : function () {
        let self = this;
        httpGetDzkq('hrs-kqs/app/querySqInfo.action?', {
          yearMonth:Tool.formatTime(self.pickeTime,1),
          orgCode2: self.orgCode2
        }, function(result) {
          if(result.data) {
            self.noresult = false;
            self.kqCofig = {
              kqOvertimeList:result.data.overtimeList,
              kqNightList:result.data.nightList
            }
            for(let s in result.data.sqInfo) {
              if(s.match("day")){
                self.arrange.push(result.data.sqInfo[s]);
              }
              if(s.match("day")){
                self.monthArray.push(result.data.sqInfo[s]);
              }
            }
            self.initData(Tool.formatTime(self.pickeTime,2));
            self.getKqDetail();
          }
          else {
            self.noresult = true;
          }
        });
      },
      // 执行日历
      initData: function(cur) {
        let date;
        if (cur) {
          date = new Date(cur);
        } else {
          date = new Date();
        }
        this.currentDay = 1;
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth() + 1;
        this.currentWeek = new Date(this.currentYear + "/" + this.currentMonth + "/" + 1).getDay() + 1; // 1...6,0
        if (this.currentWeek == 0) {
          this.currentWeek = 7;
        }
        let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
        this.days.length = 0;
        // 今天是周日，放在第一行第7个位置，前面6个
        for (let i = this.currentWeek - 1; i >= 0; i--) {
          let d = new Date(str);
          d.setDate(d.getDate() - i);
          this.days.push(d);
          this.arrange.unshift("");
        }
        let count = Math.ceil((this.getCountDays(cur) + this.currentWeek - 1)/7)*7;
        for (let i = 1; i <= count - this.currentWeek; i++) {
          let d = new Date(str);
          d.setDate(d.getDate() + i);
          this.days.push(d);
        }
        let self = this;
        this.days.forEach(function (item) {
          if(item.getMonth() == self.currentMonth) {
            self.i++;
          };
        })
        this.arrange.splice(0,1);
        for(let i = 0;i<this.days.length;i++) {
          self.calendar.push({arrange:this.arrange[i],day:this.days[i],checked:false});
        }
        self.calendar.forEach(function (item) {
          if(Tool.formatTime(item.day,5) == new Date().getDate() - 1) {
            item.checked = true;
            self.KqDetailTime = Tool.formatTime(item.day,4);
            self.KqDetailweek = Tool.getMyDay(item.day);
            self.KqDetailday = Tool.formatTime(item.day,5)
          }
        })
      },
      //重置
      reset: function () {
        this.days= [];
        this.arrange = [];
        this.calendar = [];
        this.monthArray = [];
        this.collectList = [
          {
            name:"出勤天数",
            expend:false,
            day:'',
            detail:[

            ]
          },
          {
            name:"缺勤天数",
            expend:false,
            day:'',
            detail:[

            ]
          },
          {
            name:"加班天数",
            expend:false,
            day:'',
            detail:[

            ]
          },
          {
            name:"夜班个数",
            expend:false,
            day:'',
            detail:[

            ]
          }
        ],
        this.i = 0;
      },
      //获取考勤明细信息
      getKqDetail: function () {
        let self = this;
        self.kqDetail = {
          kqOvertimeList:[],
          kqNightList:[]
        }
        httpGetDzkq('hrs-kqs/app/getSqDetail.action?  ', {
          yearMonth:Tool.formatTime(self.pickeTime,1),
          day: self.KqDetailday
        }, function(result) {
          if(result.success) {
            self.kqDetailDate = self.monthArray[Number(self.KqDetailday)-1];
            //加班
            result.data.forEach(function (item) {
              self.kqCofig.kqOvertimeList.forEach(function (it) {
                if(item.flagSign == it.flagCode ) {
                  self.kqDetail.kqOvertimeList.push(item);
                }
              })
            })
            //夜班
            result.data.forEach(function (item) {
              self.kqCofig.kqNightList.forEach(function (it) {
                if(item.flagSign == it.flagCode ) {
                  self.kqDetail.kqNightList.push(item);
                }
              })
            })
          }
        });
      },
      //获取考勤月度汇总
      getKqCollect:function () {
        let self = this;
        httpGetDzkq('hrs-kqs/app/getStatEmpDetail.action?', {
          yearMonth:Tool.formatTime(self.pickeTime,1),
          orgCode2: self.orgCode2,
          orgCode: self.orgCode
        }, function(result) {
          if(result.data) {
            self.noresult = false;
            //          天数统计
            self.collectList[0].day = parseFloat(result.data.realNumber) + '天';
            self.collectList[1].day = parseFloat(result.data.outNumber) + '天';
            self.collectList[2].day = parseFloat(result.data.overtimeNumber) + '天';
            self.collectList[3].day = parseFloat(result.data.nightNumber) + '天';

            //加班天数明细
            result.data.overtimeResList.forEach(function (item) {
              let day = Tool.formatTime(self.pickeTime,0) + item.appDay + '日';
              let week = Tool.getMyDay(Tool.formatTime(self.pickeTime,2) + '-' + item.appDay);
              let flagName = item.flagName + item.hrCount + '小时';
              self.collectList[2].detail.push({day:day,week:week,flagName:flagName});
            });

            //夜班天数明细
            result.data.nightResList.forEach(function (item) {
              let day = Tool.formatTime(self.pickeTime,0) + item.appDay + '日';
              let week = Tool.getMyDay(Tool.formatTime(self.pickeTime,2) + '-' + item.appDay);
              let flagName = item.flagName;
              self.collectList[3].detail.push({day:day,week:week,flagName:flagName});
            });

            //出勤和缺勤天数明细
            for(var item in result.data.sqInfo) {
              if(!result.data.sqInfo[item] || result.data.sqInfo[item] == ' ') {
                result.data.sqInfo[item] = '';
              }
              if(item.match("day")){
                if(result.data.sqInfo[item].match("IN")) {
                  let day = Tool.formatTime(self.pickeTime,0) + item.substr(3,2) + '日';
                  let week = Tool.getMyDay(Tool.formatTime(self.pickeTime,2) + '-' + item.substr(3,2));
                  self.collectList[0].detail.push({day:day,week:week,flagName:'白班8小时'});
                  if(result.data.sqInfo[item].match("[^x00-xff]")) {
                    var flagName = result.data.sqInfo[item].substr(3);
                    self.collectList[0].detail.push({day:day,week:week,flagName:flagName});
                  }
                }
                if(result.data.sqInfo[item].match("[^x00-xff]")) {
                  let day = Tool.formatTime(self.pickeTime,0) + item.substr(3,2) + '日';
                  let week = Tool.getMyDay(Tool.formatTime(self.pickeTime,2) + '-' + item.substr(3,2));
                  if(result.data.sqInfo[item].indexOf("IN")==0) {
                    var flagName = result.data.sqInfo[item].substr(3);
                  }
                  if(result.data.sqInfo[item].indexOf("IN")==-1) {
                    var flagName = result.data.sqInfo[item];
                  }
                  self.collectList[1].detail.push({day:day,week:week,flagName:flagName});
                }
              }
            }
          }
          else {
            self.noresult = true;
          }
        });
      },
      pick : function (it) {
        this.calendar.forEach(function (item) {
          item.checked = false;
        });
        it.checked = true;
        this.KqDetailTime = Tool.formatTime(it.day,4);
        this.KqDetailweek = Tool.getMyDay(it.day);
        this.KqDetailday = Tool.formatTime(it.day,5)
        this.getKqDetail();
      },
      formatDate: function(year, month, day) {
        let y = year;
        let m = month;
        if (m < 10) m = "0" + m;
        let d = day;
        if (d < 10) d = "0" + d;
        return y + "-" + m + "-" + d
      },
      getCountDays: function (curDate) {
        var curDate = new Date(curDate);
        var curMonth = curDate.getMonth();
        curDate.setMonth(curMonth + 1);
        curDate.setDate(0);
        return curDate.getDate();
      }
    },
    mounted: function() {
      this.getHeadImage();
      this.getData();
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return Tool.formate(date, 'yyyy年MM月')
      }
    }
  }
</script>
<style type="text/css">
  .clear {
    clear: both;
  }

  input:disabled {
    background: white;
  }

  .kqydhz-item {
    overflow-y: auto;
  }

  .kqcx-head {
    width: 100%;
    height: 70px;
    background: white;
  }

  .kqcx-head-content {
    width: 90%;
    margin: 0 auto;
  }

  .kqcx-head-content div {
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    float: left;
    height: 70px;
    border-top: 10px solid white;
    border-bottom: 10px solid white;
  }

  .kqcx-main .kqcx-head-img {
    width: 14%;
  }

  .kqcx-main .kqcx-head-img img {
    width: 100%;
    height: 50px;
    border-radius: 50%;
  }

  .kqcx-main .kqcx-head-center {
    width: 52%;
    text-align: left;
  }

  .kqcx-main .kqcx-head-center span:nth-child(1) {
    display: inline-block;
    font-weight: bold;
    padding: 7px;
    line-height: 13px;
  }

  .kqcx-main .kqcx-head-description {
    font-size: 13px;
    color: #b8b8b8;
    padding-left: 7px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .kqcx-head-calendar {
    width: 33%;
    line-height: 50px;
    font-size: 14px;
    text-align: right;
  }

  /*日期控件只显示年月*/
  .kqcx-main .picker-items .picker-slot.picker-slot-center:nth-child(3) {
    display: none;
  }

  /*明细*/
  .kqcx-detail-top,.kqcx-collect-top {
    width: 100%;
    height: 45px;
    text-align: right;
    line-height: 45px;
  }

  .kqcx-detail-top span {
    display: inline-block;
    margin-right: 10px;
    font-size: 14px;
    color: rgb(58, 113, 220);
  }

  /*汇总*/
  .kqcx-collect-top div:nth-child(1) {
    float: left;
    margin-left: 10px;
    color: #b8b8b8;
    font-size: 15px;
  }

  .kqcx-collect-top div:nth-child(2) {
    margin-right: 10px;
    font-size: 14px;
    color: rgb(58, 113, 220);
    float: right;
  }

  .kqcx-item .mint-cell-wrapper {
    background-size: 0;
    text-align: left;
  }

  .kqcx-item .mint-cell-text {
    font-weight: bold;
  }

  .kqcx-item li {
    width: 100%;
    height: 40px;
    text-align: left;
    line-height: 40px;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    border-bottom: 1px solid #b8b8b8;
  }

  .kqcx-item li span{
    margin-left: 10px;
  }

  .kqcx-main .noresult-wrap {
    margin: 0 auto;
    padding-top: 115px;
    width: 160px;
    height: 200px;
  }
  .kqcx-main .noresult-wrap .noresult-img {
    width: 100%;
  }

  /*日历*/
  .dzkq-calendar {
    width: 100%;
    background: white;
    text-align: center;
  }

  .CheckedColor {
    color: white!important;
  }

  .dzkqChecked {
    display: inline-block;
    width: 100%;
    height: 60px;
    background: #3b71dd;
    border-radius: 50%;
    color: white!important;
  }

  .dzkq-calendar li {
    float: left;
    width: 14.28%;
  }

  .dzkq-other-month {
    visibility: hidden;
  }

  .dzkq-weekdays {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    border-bottom: 1px solid #ebebeb;
  }

  .dzkq-days {
    line-height: 55px;
  }

  .dzkq-days li {
    height: 60px;
    font-size: 12px;
    text-align: center;
    border-bottom: 1px solid #ebebeb;
    padding: 3px 0;
  }

  .dzkq-days-day {
    display: inline-block;
    font-size: 16px;
    margin-top: 5px;
    color: #1d2d3d;
  }

  .dzkq-days-arrange {
    width: 100%;
    height:30px;
    color: #999999;
    line-height: 15px;
    margin-top: -4px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .dzkq-collect-detail {
    width: 70%;
    height: auto;
    background: #759be6;
    margin: 0 auto;
    color: #f2f5fa;
    padding: 10px 0;
    margin-top: 10px;
    text-align: left;
    border-radius: 10px;
  }

  .dzkqactive {
    line-height: 25px;
  }

  .dzkq-collect-detail div {
    margin-left: 20px;
  }

  .dzkq-days-not-day {
    color: #b8b8b8!important;
  }

  .kqcx-else-person {
    color: gray;
  }
</style>
