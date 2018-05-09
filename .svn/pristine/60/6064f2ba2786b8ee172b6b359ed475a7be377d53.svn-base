<template>

	<div>
    <app-header title="我的报销单"></app-header>
    <!--筛选条件-->
    <div class="bxxx-filter">
      <div v-for="(item,index) in filterList" @click="showModel(item,index)">
        <span class="bxxx-filter-span">
          <span>{{item.name}}</span>
          <span class="fa fa-angle-up fa-lg" v-show="item.show"></span>
          <span class="fa fa-angle-down fa-lg" v-show="!item.show"></span>
        </span>

      </div>
    </div>
    <div class="bxxx-filter-model" v-if="model">
      <ul>
        <li v-for="(item,index) in choiceList" @click="selected(item)">
          <span>{{item.name}}</span>
          <span class="fa fa-check fa-lg" v-if="item.checked"></span>
        </li>
      </ul>
    </div>
    <div class="bxxx-filter-time" v-if="time">
      <div class="bxxx-time-top">
        <div @click="startTimeOpen">
          <span>{{pickerStartTime|formatDate}}</span>
          <span></span>
        </div>
        <div @click="entTimeOpen">
          <span>{{pickerEndTime|formatDate}}</span>
          <span></span>
        </div>
      </div>
      <div class="bxxx-time-bottom">
        <div>
          <mt-button type="default" @click="resetTime" style="width: 80%;height: 80%;margin-left: 10%;margin-top: 5px">重置</mt-button>
        </div>
        <div>
          <mt-button type="primary" @click='ensureTime' style="width: 80%;height: 80%;margin-left: 10%;margin-top: 5px">确定</mt-button>
        </div>
      </div>

    </div>
    <div class="bxxx-hide-model" :style="page" v-if="model||time" @click="cancelModel"></div>
    <div class="bxxx-main-list" :style="pageh" v-if="!noresult">
      <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :top-distance='10' bottom-pull-text="上拉加载更多" bottom-drop-text="释放加载">
        <router-link class="bxxx-list" v-for="(item, index) in mainList" :to='item.path' :key="index">
          <div class="bxxx-list-top">
            <span>{{item.approrgsfname}}</span>-
            <span>{{item.applyEmpName}}</span>-
            <span>{{item.remark}}</span>
          </div>
          <div class="bxxx-list-bottom">
            <div>
              <div class="bxxx-list-tit">
                <span>报销单号：</span>
                <span>{{item.billCode}}</span>
              </div>
              <div class="bxxx-list-tit">
                <span>申请时间：</span>
                <span>{{item.year}}-{{item.month}}-{{item.day}}</span>
              </div>
              <div class="bxxx-list-tit">
                <span>单据类型：</span>
                <span>{{item.billTypeName}}</span>
              </div>
              <div class="bxxx-list-tit">
                <span>单据状态：</span>
                <span>{{item.billStateDes}}</span>
              </div>
              <div class="bxxx-list-tit">
                <span>报销人：</span>
                <span>{{item.forReimbursementName}}</span>
              </div>
            </div>
            <div>
              <span>金额</span>
              <span>¥{{item.billAmount}}</span>
            </div>
          </div>
        </router-link>
        <div style="height: 32px;line-height: 32px;" v-if='allLoaded'>已加载到底部</div>
      </mt-loadmore>
    </div>

    <div class="noresult-wrap" v-else>
      <img class="noresult-img" src="../../../../static/noresult.png">
    </div>

    <mt-datetime-picker ref="pickerstart" type="date" :startDate="startTime" :endDate="endTime" v-model="pickerStartTime" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
    <mt-datetime-picker ref="pickerend" type="date" :startDate="startEndTime" :endDate="endTime" v-model="pickerEndTime" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
    </mt-datetime-picker>
	</div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { httpGetBxxx,State } from "../../../utils/api.js"; //添加公共组件
  import { Loadmore } from 'mint-ui';
  import { filters } from '../../../utils/common.js';
  import { Tool } from "../../../utils/tool.js"; //添加公共组件
	export default {
		name: 'BxxxComponent',
		data: function() {
			return {
        page:{
          height: State().wh - 84 + "px"
        },
        pageh:{
          height: State().wh - 129 + "px"
        },
        filterList:[
          {
            name:'单据类型'
          },
          {
            name:'单据状态'
          },
          {
            name:'申请日期'
          }
        ],
        startTime: new Date("2012-01-01"),
        endTime: new Date(),
        startEndTime: new Date(),
        choiceList:[],
        mainList:[],
        model:false,
        billTypeCode:'',
        billState:'',
        time:false,
        noresult:false,
        pickerStartTime:new Date(Tool.getLastYearYestdy(new Date())),
        pickerEndTime:new Date(),
        PageSize: 10,
        RowNum: 1,
        allLoaded: false
			}
		},
		components: {
      AppHeader
		},
		methods: {
		  //时间选择
      startTimeOpen: function() {
        this.$refs.pickerstart.open();
      },
      entTimeOpen: function() {
        this.startEndTime = this.pickerStartTime;
        this.$refs.pickerend.open();
      },
      //重置时间
      resetTime() {
        this.pickerStartTime = new Date(Tool.getLastYearYestdy(new Date()));
        this.pickerEndTime = new Date();
        this.getdata();
      },
      ensureTime() {
        this.mainList = [];
        this.filterList[2].show = false;
        this.getdata();
      },
      //
      showModel(item,index) {
        if(index<2) {
          if(!item.show) {
            this.reset();
            item.show = true;
            this.model = true;
          }
          else {
            item.show = false;
            this.model = false;
          }
          this.choiceList = filters.billType(index);
          this.time = false;
        }
        else {
          if(!item.show) {
            this.reset();
            item.show = true;
            this.time = true;
            this.model = false;
          }
          else {
            item.show = false;
            this.time = false;
          }
        }
        this.choiceList.forEach(function (it) {
          if(item.name == it.name) {
            it.checked = true;
          }
        })
      },
      //选中
      selected(lt) {
        let self = this;
        this.mainList = [];
        this.RowNum = 1;
        this.allLoaded = false;
        this.filterList.forEach(function (item,index) {
          if(item.show) {
            self.filterList[index].name = lt.name;
            if(index==0) {
              self.billTypeCode = lt.id;
            }
            else {
              self.billState = lt.id;
            }
          }
        });
        this.model = false;
        this.reset();
        this.getdata();
      },
      cancelModel() {
        this.model = false;
        this.time = false;
        this.filterList.forEach(function (item) {
          item.show = false;
        })
      },
      reset() {
        this.filterList.forEach(function (item) {
          item.show = false;
        });
      },
      //分页以及获取列表
      getdata(fun, isshowload) {
        this.time = false;
        let self = this;
        httpGetBxxx("fss/billListPubAction_queryBillListOder.action?",{
          billTypeCode: self.billTypeCode,
          billState:self.billState,
          currentPage:self.RowNum,
          pageSize:self.PageSize,
          startDate:Tool.formate(self.pickerStartTime,'yyyyMMdd'),
          endDate:Tool.formate(self.pickerEndTime,'yyyyMMdd')
        },function(result){
          if(result.totalRow>0) {
            self.noresult = false;
            result.list.forEach(function(item) {
              item.path = "/bxxx/" + item.billCode;
              item.year = item.applyDate.substring(0,4);
              item.month = item.applyDate.substring(4,6);
              item.day = item.applyDate.substring(6,8);
              self.mainList.push(item);
            });
          }
          else {
            self.noresult = true;
          }

          if(fun) {
            fun(result.list)
          }
        }, function() {}, isshowload);
      },
      loadTop: function() {
        let self = this;
        this.RowNum = 1;
        this.getdata(function(lt) {
          self.mainList = [];
          lt.forEach(function(item) {
            item.path = "/bxxx/" + item.billCode;
            self.mainList.push(item);
          });
          self.allLoaded = false;
          self.$refs.loadmore.onTopLoaded();
          if(lt.length < self.PageSize) {
            self.allLoaded = true;
          }
        }, true);
      },
      loadBottom: function() {
        let self = this;
        this.RowNum++;
        this.getdata(function(lt) {
          self.$refs.loadmore.onBottomLoaded();
          if(lt.length < self.PageSize) {
            self.allLoaded = true;
          }
        }, true);
      },
		},
    mounted: function () {
      let self = this;
      this.getdata(function(lt){
        if(lt.length < self.PageSize) {
          self.allLoaded = true;
        }
      });
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return Tool.formate(date, 'yyyy-MM-dd')
      }
    },
	}
</script>
<style type="text/css">
  .bxxx-filter{
    display: -webkit-flex; /* Safari */
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #fafafa;
    font-size: 12px;
    border-bottom: 1px solid #dcdcdc;
  }
  .bxxx-filter div{
    flex: 1;
    line-height: 20px;
  }

  .bxxx-filter div>span {
    display: inline-block;
    width: 99%;
    height: 20px;
    margin-top: 10px;
    border-right: 1px solid #d8d8d8;
  }

  .bxxx-filter div:nth-child(3)>span {
    border-right: none;
  }

  .bxxx-filter div .bxxx-filter-span span:nth-child(2){
    color: #0c60ee;
  }

  .bxxx-filter-model {
    position: absolute;
    z-index: 100;
    width: 100%;
    line-height: 40px;
    height: 200px;
    overflow-y: auto;
  }

  .bxxx-filter-time {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100px;
    background: white;
    text-align: left;
    line-height: 40px;
  }

  .bxxx-time-top,.bxxx-time-bottom {
    display: flex;
    display: -webkit-flex;
    height: 50px;
    border-bottom: 1px solid #dcdcdc;
  }

  .bxxx-time-bottom div {
    flex: 1;
    height: 50px;
  }

  .bxxx-time-top div {
    flex: 1;
    margin-left: 10px;
    height: 40px;
    margin-top: 5px;
    color: #505050;
    display: flex;
    display: -webkit-flex;
  }

  .bxxx-time-top div:nth-child(1) {
    border-right: 1px solid #dcdcdc;
  }

  .bxxx-time-top div span:nth-child(1) {
    flex: 8;
  }

  .bxxx-time-top div span:nth-child(2) {
    flex: 2;
    background: url(../../../../static/time.png) no-repeat center;
    background-size: contain;
    display: block;
    width: 15px;
    height: 15px;
    margin-top: 12px;
  }

  .bxxx-filter-model li{
    height: 40px;
    text-align: left;
    padding: 0 20px;
    background: white;
    border-bottom: 1px solid #dcdcdc;
    font-size: 13px;
    display: flex;
    display: -webkit-flex;
  }

  .bxxx-filter-model li span:nth-child(1){
    flex: 9;
  }

  .bxxx-filter-model li span:nth-child(2){
    flex: 1;
    line-height: 41px;
    color: #3a71dc;
  }


  .bxxx-hide-model {
    width: 100%;
    position: absolute;
    z-index: 10;
    background: #939393;
    opacity: 0.5;
  }

  .bxxx-main-list {
    width: 100%;
    overflow-y: auto;
    margin-top: 20px;
  }

  .bxxx-list {
    height: 196px;
    background: url("../../../assets/bxdbk.png") no-repeat;
    background-size:100% 100%;
    width: 96%;
    margin: 0 auto;
    text-align: left;
    display: block;
  }

  .bxxx-list-top,.bxxx-list-bottom {
    width: 90%;
    margin: 0 auto;
  }

  .bxxx-list-top {
    height: 53px;
    border-bottom:  2px dotted #dcdcdc;
    line-height: 55px;
    font-weight: bold;
    font-size: 15px;
  }

  .bxxx-list-bottom {
    margin-top: 10px;
    height: 94px;
    display: flex;
    display: -webkit-flex;
  }
  .bxxx-list-bottom>div:nth-child(1) {
    width: 80%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    font-size: 13px;
    color: #8c8c8c;
  }

  .bxxx-list-tit span:nth-child(1){
    display: inline-block;
    width: 70px;
  }

  .bxxx-list-bottom>div:nth-child(2) {
    width: 20%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    text-align: right;
  }

  .bxxx-list-bottom>div:nth-child(2) span:nth-child(1) {
    margin-top: 69px;
    font-size: 12px;
    color: #8c8c8c;
  }

  .bxxx-list-bottom>div:nth-child(2) span:nth-child(2) {
    font-size: 17px;
    color: #f94138;
    font-weight: bold;
  }

  .noresult-wrap {
    margin: 0 auto;
    padding-top: 160px;
    width: 160px;
    height: 200px;
  }
  .noresult-wrap .noresult-img {
    width: 100%;
  }

</style>
