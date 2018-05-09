<template>

  <div>
    <app-header title="班组考勤查询"></app-header>
    <div class="Bzkqxq-main">
      <div class="Bzkqxq-main-top">
        <div class="Bzkqxq-head">
          <div class="Bzkqxq-head-left">
            <div class="Bzkqxq-head-left-wrap">
              <p class="Bzkqxq-head-left-content">{{personData.groupName}}</p>
            </div>
          </div>
          <div class="Bzkqxq-head-right">
            <span>{{pickerValue}}</span>

          </div>
          <div class="clear"></div>
        </div>
      </div>

      <!--按周显示-->
      <div class="Bzkqxq-week" v-if="type==1">
        <!--筛选条件-->
        <div class="Bzkqxq-week-filter">
          <div @click="previous">上一周</div>
          <div @click="next">下一周</div>
          <div @click="choiceMonth">按月</div>
        </div>

        <div v-if="!noresult">
          <!--标题-->
          <div class="Bzkqxq-week-title">
            <ul class="Bzkqxq-week-title-list Bzkqxq-week-daohang">
              <div class="Bzkqxq-table-ceil" v-for="item in weekTitle">
                <div>
                  <span>{{item}}</span>
                </div>
              </div>
            </ul>
          </div>
          <mt-swipe :auto="0" :showIndicators="false" @change="handleChange" :style="pagesh" class="Bzkqxq-week-title Bzkqxq-week-content" style="overflow-y: auto">
            <mt-swipe-item v-for="(item,key) in swipe" :key="index" class="Bzkqxq-swipe-item">
              <ul class="Bzkqxq-week-title-list Bzkqxq-week-content-list" v-for="item in tableWeek" @click="viewDetail(item.empId)">
                <div class="Bzkqxq-table-ceil">
                  <div>
                    <span>{{item.empName}}</span>
                  </div>
                </div>
                <div class="Bzkqxq-table-ceil">
                  <div>
                    <span>{{item.Monday}}</span>
                  </div>
                </div>
                <div class="Bzkqxq-table-ceil">
                  <div>
                    <span>{{item.Tuesday}}</span>
                  </div>
                </div>
                <div class="Bzkqxq-table-ceil">
                  <div>
                    <span>{{item.Wednesday}}</span>
                  </div>
                </div>
                <div class="Bzkqxq-table-ceil">
                  <div>
                    <span>{{item.Thursday}}</span>
                  </div>
                </div>
                <div class="Bzkqxq-table-ceil">
                  <div>
                    <span>{{item.Friday}}</span>
                  </div>
                </div>
                <div class="Bzkqxq-table-ceil">
                  <div>
                    <span>{{item.Saturday}}</span>
                  </div>
                </div>
                <div class="Bzkqxq-table-ceil">
                  <div>
                    <span>{{item.Sunday}}</span>
                  </div>
                </div>
              </ul>
            </mt-swipe-item>
          </mt-swipe>
        </div>

        <div class="noresult-wrap" v-else>
          <img class="noresult-img" src="../../../../static/noresult.png">
        </div>
      </div>
      <!--按月显示-->
      <div class="Bzkqxq-month" v-if="type==2" :style="pageh">
        <div class="kqgs-title" v-if="!noresult">
          <div class="kqgs-list kqgs-list-title">
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil" style="border-left: 1px solid #ebebeb">
              <div>
                <span>序号</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil">
              <div>
                <span>姓名</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil">
              <div>
                <span>出勤天数</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil">
              <div>
                <span>缺勤天数</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col09 kqgs-table-ceil">
              <div>
                <span>节假日加班</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col09 kqgs-table-ceil">
              <div>
                <span>休息日加班</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col09 kqgs-table-ceil">
              <div>
                <span>付薪平日加班</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil">
              <div>
                <span>大夜班</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil">
              <div>
                <span>小夜班</span>
              </div>
            </div>
          </div>
        </div>
        <div class="kqgs-table" v-if="!noresult" :style="pageh">
          <div class="kqgs-list" v-for="(item,index) in tableMonth" @click="viewDetail(item.empId)">
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil" style="border-left: 1px solid #ebebeb">
              <div>
                <span>{{index + 1}}</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil">
              <div>
                <span>{{item.empName}}</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil">
              <div>
                <span>{{item.Attendance}}</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil">
              <div>
                <span>{{item.Absence}}</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col09 kqgs-table-ceil">
              <div>
                <span>{{item.Holiday}}</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col09 kqgs-table-ceil">
              <div>
                <span>{{item.Rest}}</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col09 kqgs-table-ceil">
              <div>
                <span>{{item.Pay}}</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil">
              <div>
                <span>{{item.bigNight}}</span>
              </div>
            </div>
            <div class="kqgs-table-ceil-col22 kqgs-table-ceil">
              <div>
                <span>{{item.smallNight}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="noresult-wrap" v-else>
          <img class="noresult-img" src="../../../../static/noresult.png">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { State , httpGetDzkq} from "../../../utils/api.js";
  import { Tool } from "../../../utils/tool.js";
  import { DES3 } from "../../../utils/des.js"   //加密
  export default {
    name: 'BzkqxqComponent',
    data: function() {
      return {
        pagesh: {
          height: State().wh - 236 + "px"
        },
        pageh:{
          height: State().wh - 235 + "px"
        },
        pickerValue:Tool.formatTime(this.$route.params.date,0),
        type:this.$route.params.type,
        noresult:true,
        personData:{},
        week:[],
        month:[],
        day:[],
        totalDay:'',
        tableMonth:[],
        tableWeek:[],
        index:0,
        sign:0,
        swipe:[],
        weekTitle:['姓名','姓名','姓名','姓名','姓名','姓名','姓名','姓名']

      }
    },
    components: {
      AppHeader
    },
    methods: {
      handleChange: function (index) {
        if(index - this.sign == 1 || index - this.sign == -4) {
          this.next();
        }
        else {
          this.previous();
        }
        this.sign = index;
      },
      choiceMonth :function () {
        this.type = 2;
        this.getBzMonth();
      },
      //获取个人信息
      getData() {
        let self = this;
        httpGetDzkq('hrs-kqs/app/getEmpGroupInfo.action?', {

        }, function(result) {
          self.personData = result.data;
          if(self.type==1) {
            self.init();
          }
          else {
            self.getBzMonth();
          }
        });
      },

      //下一周
      next: function () {
        if(this.day.indexOf(this.totalDay)>-1) {
          Tool.tip("已经到月末了");
          return;
        }
        if(this.day[6]>=this.totalDay) {
          return;
        }
        else {
          this.week = [];
          for(var i = 0;i<this.day.length;i++) {
            this.day[i] = Number(this.day[i]);

          }
          for(var i = 0;i<this.day.length;i++) {
            if(this.day[i] == '') {
              this.day.splice(i,1,this.day[6]+i+1);
            }
            else {
              this.day.splice(i,1,this.day[i]+7);
            }

          }
          this.getBzWeek(this.day);
        }
      },

      //上一周
      previous: function () {
        if(this.day.indexOf("01")>-1) {
          Tool.tip("已经到月初了");
          return;
        }
        if(this.day[0]==''||this.day[0]==1) {
          return;
        }
        else {
          this.week = [];
          for(var i = 0;i<this.day.length;i++) {
            if(this.day[i]<8) {
              this.day[i] = '';
            }
            else {
              this.day.splice(i,1,this.day[i]-7);
            }

          }
          this.getBzWeek(this.day);
        }
      },

      //初始化按周查询
      init: function () {
        //获取这个月有多少天
        let curDate = new Date(Tool.formatTime(this.$route.params.date,6) + '/' + 1);
        let curMonth = curDate.getMonth();
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        curDate.setMonth(curMonth + 1);
        curDate.setDate(0);
        this.totalDay = curDate.getDate();

        //初始化数组
        let num = new Date(Tool.formatTime(this.$route.params.date,6) + '/' + 1).getDay();
        let array = [1,2,3,4,5,6,7];
        if(num == 0) {
          num = 7;
        }
        for(let i = 0;i<num-1;i++) {
          array.unshift('');
        };
        array = array.slice(0,7);
        this.day = array;

        //计算这个月有多少个周
        let eyear= Tool.formatTime(this.$route.params.date,1).substring(0,4);
        let	emonth= Tool.formatTime(this.$route.params.date,1).substring(4,6);
        let date = new Date(eyear,emonth,0);
        let w = date.getDay();

        //向swipe数组中添加几个空对象
        for(let i = 0;i<5;i++){
          this.swipe.push({});
        }
        this.getBzWeek(this.day);
      },

      //班组按周查询
      getBzWeek(array) {
        let self = this;
        httpGetDzkq('hrs-kqs/app/getGroupListInfo.action?', {
          yearMonth:Tool.formatTime(self.$route.params.date,1),
          orgCode2:self.personData.orgCode2,
          orgCode:self.personData.orgCode,
          currentPage:'1',
          pageSize:'1000',
          groupNo:self.personData.groupNo,
        }, function(result) {
          if(result.data) {
            self.noresult = false;
            result.data.datas.forEach(function (item,index) {
              self.week[index] = {
                empName:item.empName,
                empId:item.empId
              };
              for(let it in item) {
                if(it.match("day")) {
                  if(it.substr(3,2)==array[0]) {
                    self.week[index].Monday = item[it];
                  }
                  else if(it.substr(3,2)==array[1]) {
                    self.week[index].Tuesday = item[it];
                  }
                  else if(it.substr(3,2)==array[2]) {
                    self.week[index].Wednesday = item[it];
                  }
                  else if(it.substr(3,2)==array[3]) {
                    self.week[index].Thursday = item[it];
                  }
                  else if(it.substr(3,2)==array[4]) {
                    self.week[index].Friday = item[it];
                  }
                  else if(it.substr(3,2)==array[5]) {
                    self.week[index].Saturday = item[it];
                  }
                  else if(it.substr(3,2)==array[6]) {
                    self.week[index].Sunday = item[it];
                  }
                }
              }
            })
            for(var i = 0;i<array.length;i++) {
              if(array[i]<10&&array[i]) {
                array[i] = '0' + array[i];
              }
            }
            self.weekTitle = ['姓名','周一' + array[0],array[1]<=self.totalDay?'周二' + array[1]:'周二',
              array[2]<=self.totalDay?'周三' + array[2]:'周三',
              array[3]<=self.totalDay?'周四' + array[3]:'周四',
              array[4]<=self.totalDay?'周五' + array[4]:'周五',
              array[5]<=self.totalDay?'周六' + array[5]:'周六',
              array[6]<=self.totalDay?'周日' + array[6]:'周日'];
            self.tableWeek = self.week;
          }
          else {
            self.noresult = true;
          }
        });
      },

      //班组按月查询
      getBzMonth() {
        let self = this;
        httpGetDzkq('hrs-kqs/app/getGroupStatInfo.action?', {
          yearMonth:Tool.formatTime(self.$route.params.date,1),
          orgCode2:self.personData.orgCode2,
          orgCode:self.personData.orgCode,
          currentPage:'1',
          pageSize:'1000',
          groupNo:self.personData.groupNo
        }, function(result) {
          if(result.data) {
            self.noresult = false;
            result.data.sqList.datas.forEach(function(item,index) {
              self.month[index] = {
                empName:item.empName,
                empId:item.empId,
                Attendance:'',
                Absence:'',
                Holiday:'',
                Rest:'',
                Pay:'',
                bigNight:'',
                smallNight:''
              }
              for(let i = 0;i<result.data.statList.length;i++) {
                if(item.empId==result.data.statList[i].empId) {
                  if(result.data.statList[i].sapCode == "realNumber") {
                    self.month[index].Attendance = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "outNumber") {
                    self.month[index].Absence = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "5501") {
                    self.month[index].Holiday = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "5502") {
                    self.month[index].Rest = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "5503") {
                    self.month[index].Pay = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "5663") {
                    self.month[index].bigNight = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "5677") {
                    self.month[index].smallNight = result.data.statList[i].hrCount;
                  }
                }
              }
            });
            self.tableMonth = self.month;
          }
          else {
            self.noresult = true;
          }
        });
      },

      viewDetail: function (id) {
        let empId = DES3.encrypt('0okm9ijn8uhb7ygv6tfc5rdx',id);
        if(id) {
          window.location.href = "#/kqcx/" + encodeURIComponent(empId)  + '/' + this.$route.params.date;
        }
        else {
          return;
        }
      }
    },
    mounted: function() {
      this.getData();
    }
  }
</script>
<style type="text/css">
  .clear {
    clear: both;
  }

  .Bzkqxq-week-title {
    width: 100%;
    background: white;
  }

  .Bzkqxq-week-title-list {
    height: 70px;
    margin: 0 auto;
    font-weight: bold;
    text-align: center;
  }

  .Bzkqxq-week-daohang {
    background: #f7fcff;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
  }

  .Bzkqxq-week-title-list >div:nth-child(8) {
    border-right: none;
  }

  .Bzkqxq-table-ceil {
    width: 12.1%;
    display: table;
    font-size: 14px;
    float: left;
    height: 70px;
    text-align: center;
    border-right: 1px solid #ebebeb;
    overflow: hidden;
  }

  .Bzkqxq-table-ceil div {
    display: table-cell;
    vertical-align: middle;
  }

  .Bzkqxq-table-ceil div span {
    max-height: 70px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

  }

  .Bzkqxq-week-content {
    background: white;
  }

  .Bzkqxq-week-content-list {
    font-weight: normal;
    font-size: 12px;
    overflow: hidden;
  }

  .Bzkqxq-main .mint-swipe-items-wrap {
    overflow: visible;
  }

  .Bzkqxq-main .mint-swipe {
    overflow: visible;
  }


  .Bzkqxq-main-top {
    width: 100%;
    height: 70px;
    background: white;
  }

  .Bzkqxq-head {
    width: 90%;
    margin: 0 auto;
  }

  .Bzkqxq-head-left {
    width: 70%;
    height: 70px;
    float: left;
    position: relative;
    display: table;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
  }

  .Bzkqxq-head-left-wrap{
    display: table-cell;
    vertical-align: middle;
    *position:absolute;
    *top: 50%;
    *left: 0;
  }

  .Bzkqxq-head-left-content {
    *position: relative;
    *top: -50%;
    *left: 0;
    max-height: 70px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .Bzkqxq-head-right {
    width: 30%;
    float: left;
    line-height: 70px;
    font-size: 14px;
    text-align: right;
  }

  /*日期控件只显示年月*/
  .Bzkqxq-main .picker-items .picker-slot.picker-slot-center:nth-child(3) {
    display: none;
  }

  .Bzkqxq-month {
    margin-top: 20px;
  }

  .Bzkqxq-week-filter {
    width: 90%;
    height:50px;
    margin: 0 auto;
  }

  .Bzkqxq-week-filter div {
    width: 80px;
    height: 30px;
    background: white;
    margin-top: 10px;
    margin-right: 15px;
    float: left;
    border-radius: 20px;
    text-align: center;
    line-height: 30px;
  }

  /*列表详情*/

  .Bzkqxq-main .noresult-wrap {
    margin: 0 auto;
    padding-top: 160px;
    width: 160px;
    height: 200px;
  }
  .Bzkqxq-main .noresult-wrap .noresult-img {
    width: 100%;
  }

  .bxxq-approve-table {
    background-color: white;
    border-top: solid 1px #d8d8d8;
  }

  .bxxq-approve-table .body a {
    color: #2982d5;
    text-decoration: none;
  }

  .bxxq-approve-table .header {
    height: 44px;
    line-height: 44px;
    margin-left: 10px;
    margin-right: 10px;
    color: #2982d5;
    font-size: 16px;
    background-color: #fff !important;
    border-bottom: solid 1px #d8d8d8;
  }

  .bxxq-approve-table .header-unBottonLine {
    height: 44px;
    line-height: 44px;
    margin-left: 10px;
    margin-right: 10px;
    color: #2982d5;
    font-size: 16px;
  }

  .bxxq-approve-table .body {
    border-bottom: solid 1px #d8d8d8;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 15px;
  }

  /*左右两列样式*/

  .approve-table-two .tr {
    /*margin-top: 7px;*/
    /*margin-bottom: 7px;*/
    padding: 7px 0;
    border-bottom: 1px dotted #D8D8D8;
  }

  .approve-table-two .tr-last {
    padding: 7px 0;
  }

  .approve-table-two .tr .first {
    color: #777;
  }

  .approve-table-two .tr .notFirst {
    color: #000;
  }

  .approve-table-two .tr-last .first {
    color: #777;
  }

  .approve-table-two .tr-last .notFirst {
    color: #000;
  }

  /*多列时以table方式展示*/

  .approve-table-multiple {
    width: 100%;
    margin-top: 7px;
    margin-bottom: 7px;
  }
  .approve-table-five{
    text-align: center;
  }

  .approve-table-five>div:nth-child(1) {
    font-weight: bold;
    background: #f7fcff;
  }

  .Bzkqxq-swipe-item>ul:nth-child(odd) {
  background: #f7f7f7;
  }

  .row {
    display: flex;
    padding: 5px;
    width: 100%;
    align-items: center;
  }

  .Bzkqxq-main .col-009{
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 13.333%;
    -moz-box-flex: 0;
    -moz-flex: 0 0 13.333%;
    -ms-flex: 0 0 13.333%;
    flex: 0 0 13.333%;
    max-width: 13.333%;
  }

  .Bzkqxq-main .col-222{
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 10%;
    -moz-box-flex: 0;
    -moz-flex: 0 0 10%;
    -ms-flex: 0 0 10%;
    flex: 0 0 10%;
    max-width: 10%;
  }

  .col-008{
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 11.5%;
    -moz-box-flex: 0;
    -moz-flex: 0 0 11.5%;
    -ms-flex: 0 0 11.5%;
    flex: 0 0 11.5%;
    max-width: 11.5%;
  }

  .Bzkqxq-main .col-001{
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 19.5%;
    -moz-box-flex: 0;
    -moz-flex: 0 0 19.5%;
    -ms-flex: 0 0 19.5%;
    flex: 0 0 19.5%;
    max-width: 19.5%;
  }

  .kqgs-table-ceil {
    display: table;
    height: 71px;
    border-right: 1px solid #ebebeb;
    float: left;
  }

  .kqgs-table-ceil div {
    display: table-cell;
    vertical-align: middle;
  }

  .kqgs-table-ceil span {
    max-height: 70px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .Bzkqxq-month .Bzkqxq-head {
    width: 90%;
    margin: 0 auto;
  }

  .kqgs-table-ceil-col22,.col-222 {
    width: 9.6%;
  }

  .kqgs-table-ceil-col09,.col-009 {
    width: 13.3%;
  }

  .Bzkqxq-month .Bzkqxq-head-left {
    width: 65%;
    height: 70px;
    float: left;
    position: relative;
    display: table;
    text-align: left;
    font-size: 17px;
    font-weight: bold;
  }

  .Bzkqxq-month .Bzkqxq-head-left-wrap{
    display: table-cell;
    vertical-align: middle;
    *position:absolute;
    *top: 50%;
    *left: 0;
  }

  .Bzkqxq-head-left-content {
    *position: relative;
    *top: -50%;
    *left: 0;
    max-height: 70px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .Bzkqxq-month .Bzkqxq-head-right {
    width: 35%;
    float: left;
    line-height: 70px;
    font-size: 14px;
    text-align: right;
  }

  .kqgs-table {
    overflow-y: auto;
    background: white;
  }

  .Bzkqxq-month .noresult-wrap {
    margin: 0 auto;
    padding-top: 160px;
    width: 160px;
    height: 200px;
  }
  .Bzkqxq-month .noresult-wrap .noresult-img {
    width: 100%;
  }

  .kqgs-title {
    width: 100%;
    background: white;
  }

  .kqgs-list {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    height: 70px;
    margin: 0 auto;
  }

  .kqgs-table>div:nth-child(odd) {
    background: #f7f7f7;
  }

  .kqgs-list-title {
    background: #f7fcff!important;
    height: 100px;
    font-weight: bold;
    border-top: 1px solid #ebebeb;
  }

  .kqgs-list-title div {
    height: 100px;
  }
  .kqgs-list-title .kqgs-table-ceil span {
    max-height: 100px;
    display: inline-block;
  }

  .kqgs-list>div:nth-child(9) {
    border: none;
  }


</style>
