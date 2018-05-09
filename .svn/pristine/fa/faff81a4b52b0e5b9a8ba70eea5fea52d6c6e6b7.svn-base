<template>

  <div>
    <app-header title="考勤公示"></app-header>
    <div class="kqgs-main" :style="mainPageh">
      <div class="kqgs-main-top">
        <div class="Bzkqxq-head">
          <div class="Bzkqxq-head-left">
            <div class="Bzkqxq-head-left-wrap">
              <p class="Bzkqxq-head-left-content">{{personData.groupName}}</p>
            </div>
          </div>
          <div class="Bzkqxq-head-right">
            <span @click="pickerTime">{{pickeTime | formatDate}}</span>
            <span class="fa fa-angle-down fa-lg"></span>

          </div>
        </div>
        <div class="clear"></div>
      </div>
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
        <div class="kqgs-list" v-for="(item,index) in kqList" @click="viewDetail(item.empId)">
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

      <mt-datetime-picker ref="pickerVisible" v-model="pickerValue" :startDate="startTime" :endDate="endTime" type="date" year-format="{value}年" month-format="{value}月" @confirm="handleConfirm">
      </mt-datetime-picker>

    </div>

  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { Tool } from "../../../utils/tool.js";
  import { State,httpGetMethod,httpGetDzkq } from "../../../utils/api.js";
  import { DES3 } from "../../../utils/des.js"   //加密
  export default {
    name: 'KComponent',
    data: function() {
      return {
        mainPageh:{
          height: State().wh - 44 + "px"
        },
        pageh:{
          height: State().wh - 220 + "px"
        },
        noresult:true,
        kqgs:[],
        pickerValue: new Date(Tool.getPreMonth(new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/' + new Date().getDate())),
        pickeTime: new Date(Tool.getPreMonth(new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/' + new Date().getDate())),
        startTime: new Date(Tool.getPreMonth(new Date().getFullYear() + '/' + (new Date().getMonth()+1) + '/' + new Date().getDate())),
        endTime: new Date(),
        tables: [{
          "title": "文本描述",
          "editfield": "false",
          "id": "1f88708e-4693-4670-93a9-40e56a4ad780",
          "tr": [

          ]
        }
        ],
        kqList:[],
        KqgsList:{
          empName:'姓名',
          empId: 0,
          Attendance:'出勤天数',
          Absence:'缺勤天数',
          Holiday:'节假日加班',
          Rest:'休息日加班',
          Pay:'付薪平日加班',
          bigNight:'大夜班',
          smallNight:'小夜班'
        },
        personData:{}
      }
    },
    components: {
      AppHeader
    },
    methods: {

      pickerTime : function () {
        this.$refs.pickerVisible.open();
      },

      handleConfirm :function () {
        this.pickeTime = this.pickerValue;
        this.getKqgs();
      },

      //获取个人信息
      getData() {
        let self = this;
        httpGetDzkq('hrs-kqs/app/getEmpGroupInfo.action?', {

        }, function(result) {
          self.personData = result.data;
          self.getKqgs();
        });
      },

      getKqgs() {
        let self = this;
        httpGetDzkq('hrs-kqs/app/getGroupPubInfo.action?', {
          yearMonth:Tool.formatTime(self.pickeTime,1),
          orgCode2:self.personData.orgCode2,
          orgCode:self.personData.orgCode,
          currentPage:'1',
          pageSize:'1000',
          groupNo:self.personData.groupNo
        }, function(result) {
          if(result.data) {
            self.noresult = false;
            result.data.sqList.datas.forEach(function(item,index) {
              self.kqgs[index] = {
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
                    self.kqgs[index].Attendance = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "outNumber") {
                    self.kqgs[index].Absence = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "5501") {
                    self.kqgs[index].Holiday = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "5502") {
                    self.kqgs[index].Rest = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "5503") {
                    self.kqgs[index].Pay = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "5663") {
                    self.kqgs[index].bigNight = result.data.statList[i].hrCount;
                  }
                  else if(result.data.statList[i].sapCode == "5677") {
                    self.kqgs[index].smallNight = result.data.statList[i].hrCount;
                  }
                }
              }
            });
            self.kqList = self.kqgs;
          }
          else {
            self.noresult = true;
          }
        });
      },
      viewDetail: function (id) {
        let empId = DES3.encrypt('0okm9ijn8uhb7ygv6tfc5rdx',id);
        if(id) {
          window.location.href = "#/kqcx/" + encodeURIComponent(empId) + '/' + this.pickeTime;
        }
        else {
          return;
        }
      }
    },
    mounted: function() {
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
  /*列表详情*/
  .clear {
    clear: both;
  }

  .kqgs-main-top {
    background: white;
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

  .kqgs-main .Bzkqxq-head {
    width: 90%;
    margin: 0 auto;
  }

  .kqgs-table-ceil-col22,.col-222 {
    width: 9.6%;
  }

  .kqgs-table-ceil-col09,.col-009 {
    width: 13.3%;
  }

  .kqgs-main .Bzkqxq-head-left {
    width: 65%;
    height: 70px;
    float: left;
    position: relative;
    display: table;
    text-align: left;
    font-size: 15px;
    font-weight: bold;
  }

  .kqgs-main .Bzkqxq-head-left-wrap{
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

  .kqgs-main .Bzkqxq-head-right {
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

  .kqgs-main .noresult-wrap {
    margin: 0 auto;
    padding-top: 160px;
    width: 160px;
    height: 200px;
  }
  .kqgs-main .noresult-wrap .noresult-img {
    width: 100%;
  }

  .kqgs-main .kqgs-approve-table {
    background-color: white;
    border-top: solid 1px #d8d8d8;
    width: 96%;
    margin: 0 auto;
  }

  .kqgs-main .kqgs-approve-table .body a {
    color: #2982d5;
    text-decoration: none;
  }

  .kqgs-main .kqgs-approve-table .header {
    height: 44px;
    line-height: 44px;
    margin-left: 10px;
    margin-right: 10px;
    color: #2982d5;
    font-size: 16px;
    background-color: #fff !important;
    border-bottom: solid 1px #d8d8d8;
  }

  .kqgs-main .kqgs-approve-table .header-unBottonLine {
    height: 44px;
    line-height: 44px;
    margin-left: 10px;
    margin-right: 10px;
    color: #2982d5;
    font-size: 16px;
  }

  .kqgs-main .kqgs-approve-table .body {
    border-bottom: solid 1px #d8d8d8;
    padding: 0 10px;
    font-size: 15px;
  }


  .kqgs-main .kqgs-approve-table .row {
    display: flex;
    width: 100%;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #ebebeb;
  }

  /*日期控件只显示年月*/
  .kqgs-main .picker-items .picker-slot.picker-slot-center:nth-child(3) {
    display: none;
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

