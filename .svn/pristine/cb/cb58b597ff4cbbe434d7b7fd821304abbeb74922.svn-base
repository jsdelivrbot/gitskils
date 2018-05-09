<template>

  <div>
    <app-header title="班次查询"></app-header>
    <div class="bccx-main">
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
          <div class="kqcx-head-calendar">
            <span @click="pickerTime">{{pickeTime | formatDate}}</span>
            <span class="fa fa-angle-down fa-lg"></span>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <!--导航-->
      <div class="bccx-Navigation">
        <div class="bccx-type">
          <span :class="{'bg':type==1}" @click="changeType(1)">明细</span>
          <span :class="{'bg':type==2}" @click="changeType(2)">概览</span>
        </div>
      </div>

      <!--明细页面-->
      <div class="bccx-detail" v-show="type == 1 && !noresult">
        <!--日历-->
        <div class="dzkq-calendar" :style="pageh">
          <ul class="dzkq-weekdays">
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
          </ul>
          <ul class="dzkq-days">
            <li v-for="item in calendar" :class="{ dzkqactive:item.arrange }">
              <!--上一月-->
              <span v-if="item.day.getMonth()+1 != currentMonth" class="dzkq-other-month">{{ item.day.getDate() }}</span>
              <span v-else="">
              <!--本月-->
                <span class="dzkq-days-day">{{ item.day.getDate() }}</span><br>
                <span class="dzkq-days-arrange" v-show="item.arrange">{{item.arrange}}</span>
              </span>
            </li>
            <div class="clear"></div>
          </ul>
        </div>
      </div>

      <!--概览页面-->
      <div class="bccx-detail" v-show="type == 2 && !noresult">
        <ul class="bccx-gltitle">
          <li>日期</li>
          <li>出缺勤类型</li>
          <li>类型文本</li>
          <li>班次名称</li>
        </ul>
        <div class="bccx-detail-body" :style="glPageh">
          <div class="bccx-list" v-for="item in bcList">
            <div class="Bccx-table-ceil Bccx-table-border">
              <div>
                <span>{{item.day}}</span>
              </div>
            </div>
            <div class="Bccx-table-ceil Bccx-table-border">
              <div>
                <span>{{item.flag}}</span>
              </div>
            </div>
            <div class="Bccx-table-ceil Bccx-table-border">
              <div>
                <span>{{item.text}}</span>
              </div>
            </div>

            <div class="Bccx-table-ceil">
              <div>
                <span>{{item.shiftName}}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="noresult-wrap" v-show = noresult>
        <img class="noresult-img" src="../../../../static/noresult.png">
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
    name: 'BccxComponent',
    data: function() {
      return {
        pageh: {
          "min-height": State().wh - 159 + "px"
        },
        glPageh:{"height": State().wh - 202 + "px"},
        imgurl:'',
        noresult:true,
        name:'',
        department:'',
        orgCode:'',
        orgCode2:'',
        pickerVisible:false,
        pickerValue: new Date(),
        pickeTime:new Date(),
        startTime: new Date(),
        endTime: new Date(new Date().getFullYear() + 1 + '/' + (new Date().getMonth()+1) + '/' + new Date().getDate()),
        type:1,
        currentDay: '',
        currentMonth: '',
        currentYear: '',
        currentWeek: '',
        days:[],
        arrange:[],
        i:0,
        calendar:[],
        tables: [{
          "title": "文本描述",
          "editfield": "false",
          "id": "1f88708e-4693-4670-93a9-40e56a4ad780",
          "tr": [

          ]
        }
        ],
        bcList:[]
      }
    },
    components: {
      AppHeader
    },
    methods: {
      pickerTime : function () {
        this.$refs.pickerVisible.open();
      },
      changeType :function (type) {
        this.type = type;
      },
      getHeadImage() {
        let self = this;
        httpGetMethod("hrs-ess/img/getImage.action?", {}, function(result) {

          self.imgurl = result.data;

        });
      },
      //获取个人信息
      getData() {
        let self = this;
        httpGetDzkq('hrs-kqs/app/getEmpInfo.action?', {

        }, function(result) {
          self.name = result.data.empName;
          self.department = result.data.orgName;
          self.orgCode2 = result.data.orgCode2;
          self.orgCode = result.data.orgCode;
          self.getCalendar();
          self.getBcList();
        });
      },
      handleConfirm :function () {
        this.pickeTime = this.pickerValue;
        this.reset();
        this.getCalendar();
        this.getBcList();
      },

      //获取班次信息
      getCalendar : function () {
        let self = this;
        httpGetDzkq('hrs-kqs/app/getShiftEmpInfo.action?', {
          yearMonth:Tool.formatTime(self.pickeTime,1),
          orgCode2: self.orgCode2,
          orgCode:self.orgCode
        }, function(result) {
          for(let s in result.data) {
            if(s.match("day")){
              self.arrange.push(result.data[s]);
            }
          }
          self.initData(Tool.formatTime(self.pickeTime,2));
        });
      },

      //获取班次列表
      getBcList : function () {
        let self = this;
        httpGetDzkq('hrs-kqs/app/getShiftEmpListInfo.action?', {
          yearMonth:Tool.formatTime(self.pickeTime,1),
          orgCode2: self.orgCode2,
          orgCode:self.orgCode
        }, function(result) {
          if(result.data.length>0) {
            self.noresult = false;
            result.data.forEach(function (item) {
              item.day = Tool.formatTime(self.pickeTime,0) + item.day + '日';
            })
            self.bcList = result.data;
          }
          else {
            self.noresult = true;
          }
        });
      },

      //重置
      reset: function () {
        this.days= [];
        this.arrange = [];
        this.calendar = [];
        this.i = 0;
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

  .bg {
    background: rgb(58, 113, 220)!important;
    color: white!important;
  }

  .Bccx-table-ceil {
    width: 24%;
    display: table;
    font-size: 12px;
    float: left;
    height: 60px;
    text-align: center;
  }

  .Bccx-table-border {
    border-right: 1px solid #ebebeb;
  }

  .Bccx-table-ceil div {
    display: table-cell;
    vertical-align: middle;
  }

  input:disabled {
    background: white;
  }

  .bccx-main .kqcx-head {
    width: 100%;
    height: 70px;
    background: white;
  }

  .bccx-main .kqcx-head-content {
    width: 90%;
    margin: 0 auto;
  }

  .bccx-main .kqcx-head-content div {
    box-sizing:border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    float: left;
    height: 70px;
    border-top: 10px solid white;
    border-bottom: 10px solid white;
  }

  .bccx-main .kqcx-head-img {
    width: 15%;
  }

  .bccx-main .kqcx-head-img img {
    width: 100%;
    height: 50px;
    border-radius: 50%;
  }

  .bccx-main .kqcx-head-center {
    width: 55%;
    text-align: left;
  }

  .bccx-main .kqcx-head-center span:nth-child(1) {
    display: inline-block;
    font-weight: bold;
    padding: 7px;
    line-height: 13px;
  }

  .bccx-main .kqcx-head-description {
    font-size: 13px;
    color: #b8b8b8;
    padding-left: 7px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bccx-main .kqcx-head-calendar {
    width: 30%;
    line-height: 50px;
    font-size: 14px;
    text-align: right;
  }

  /*日期控件只显示年月*/
  .bccx-main .picker-items .picker-slot.picker-slot-center:nth-child(3) {
    display: none;
  }

  .bccx-main .noresult-wrap {
    margin: 0 auto;
    padding-top: 160px;
    width: 160px;
    height: 200px;
  }
  .bccx-main .noresult-wrap .noresult-img {
    width: 100%;
  }

  .bccx-Navigation {
    width: 100%;
    height: 45px;
    text-align: right;
  }

  .bccx-type {
    margin-right: 10px;
  }

  .bccx-type span {
    width: 50px;
    height: 20px;
    display: inline-block;
    padding: 5px 10px;
    background: white;
    text-align: center;
    line-height: 22px;
    margin: 7px 5px;
    border-radius: 20px;
  }

  .bccx-main .row {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
  }

  /*日历*/
  .dzkq-calendar {
    width: 100%;
    background: white;
    text-align: center;
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

  .dzkq-detail {
    width: 70%;
    height: 96px;
    background: #759be6;
    margin: 10px auto;
    color: #f2f5fa;
    padding: 10px 0;
    text-align: left;
    border-radius: 10px;
  }

  .dzkqactive {
    line-height: 25px;
  }

  .dzkq-detail h4 {
    margin-left: 20px;
  }

  .bccx-gltitle {
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
    background: #f7fcff;
    font-weight: bold;

  }

  .bccx-gltitle li {
    float: left;
    width: 24%;
    font-size: 13px;
    border-right: 1px solid #ebebeb;
  }

  .bccx-gltitle li:nth-child(4) {
    border: none;
  }

  .bccx-detail-body {
    background: white;
    padding: 0 5px;
    overflow-y: auto;
  }

  .bccx-glpage-body {
    overflow-y: auto;
  }

  .bccx-list {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    height: 60px;
  }
</style>

