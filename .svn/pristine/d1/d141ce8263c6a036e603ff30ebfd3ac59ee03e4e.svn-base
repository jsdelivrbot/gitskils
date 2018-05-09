<template>

  <div>
    <app-header title="证明申请"></app-header>
    <div class="zmsq-main" :style="pageh">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">收入证明</mt-tab-item>
        <mt-tab-item id="2">在职证明</mt-tab-item>
      </mt-navbar>

      <!-- tab-container -->
      <mt-tab-container v-model="selected">

        <!--收入证明-->
        <mt-tab-container-item id="1">

          <div class="zmsq-income">
            <div class="zmsq-income-type">
              <span class="zmsq-income-tit">证明类别</span>
              <span  class="zmsq-income-search" @click="choiceActive(1)">
                <span>{{incomeType}}</span>
                <span class="fa fa-angle-down fa-lg"></span>
              </span>
            </div>

            <div class="zmsq-income-type">
              <span class="zmsq-income-tit">证明模板</span>
              <span  class="zmsq-income-search" @click="choiceActive(2)">
                <span>{{incomeTemplate}}</span>
                <span class="fa fa-angle-down fa-lg"></span>
              </span>
            </div>
          </div>

        </mt-tab-container-item>

        <!--在职证明-->
        <mt-tab-container-item id="2">
          <div class="zmsq-income">
            <div class="zmsq-income-type">
              <span class="zmsq-income-tit">证明类别</span>
              <span  class="zmsq-income-search" @click="choiceActive(3)">
                <span>{{jobType}}</span>
                <span class="fa fa-angle-down fa-lg"></span>
              </span>
            </div>
          </div>
        </mt-tab-container-item>
        <div class="clear"></div>
      </mt-tab-container>

      <!--操作-->
      <div class="zmsq-button">
        <mt-button class="button" type="default" size="large" @click="viewDetail">查看已提交的申请</mt-button>

        <mt-button class="button" type="primary" size="large" @click="nextStep">下一步</mt-button>
      </div>

      <!--选择-->
      <mt-popup v-model="typeVisible" position="bottom" class="xitong-wrapper">
        <div>
          <mt-picker :slots="slots" @change="onValuesChangeType"></mt-picker>
        </div>
        <div>
          <mt-button type="default" @click="cancel">取消</mt-button>
          <mt-button type="primary" @click="ensure">确定</mt-button>
        </div>
      </mt-popup>
    </div>

  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { httpGetMethod , State } from "../../../utils/api.js"; //添加公共组件
  import { Tool } from "../../../utils/tool.js"; //添加公共组件
  export default {
    name: 'ZmsqComponent',
    data: function() {
      return {
        pageh: {
          "min-height": State().wh - 44 + "px"
        },
        sign:'',
        selected: '1',
        selectValue:'',
        incomeType:'出国类',
        incomeTemplate:'',
        jobType:'',
        attachCode:'',    //模板编号
        formType: '',     //类型
        typeVisible:false,
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'left'
          }
        ],
        incomeFile:{},
        incomeTemplateArray:[]
      }
    },
    components: {
      AppHeader
    },
    methods: {
      onValuesChangeType: function (picker,values) {
        this.selectValue = values[0];
      },

//      查看已提交的申请
      viewDetail: function () {
        window.location.href = "#/zmsqxq";
      },

      //下一步
      nextStep: function () {
        let self = this;
        if(this.selected == 1) {
          if(this.incomeType=='出国类') {
            this.incomeFile.incomeFile001.forEach(function (item) {
              if(self.incomeTemplate == item.title) {
                self.attachCode = item.attachCode;
                self.formType = item.formType;
              }
            })
          }
          else {
            this.incomeFile.incomeFile002.forEach(function (item) {
              if(self.incomeTemplate == item.title) {
                self.attachCode = item.attachCode;
                self.formType = item.formType;
              }
            })
          }
        }
        else {
          this.incomeFile.incomeFile003.forEach(function (item) {
            if(self.jobType == item.title) {
              self.attachCode = item.attachCode;
              self.formType = item.formType;
            }
          })
        }
        window.location.href = "#/zmsq" + '/' + this.attachCode + '/' + this.formType;
      },

      //获取模板信息
      getIncomeFileInfo: function () {
        let self = this;
        httpGetMethod("hrs-ess/app/getIncomeFileInfo.action?",{
          orgCode2: window.orgCode2
        },function(result){
          if(result.success) {
            self.incomeFile = result.data;
            self.getIncome(self.incomeType);
            self.jobType = result.data.incomeFile003[0].title;
          }
          else {
            Tool.alert("模板信息获取失败");
          }
        });
      },

      //获取收入证明
      getIncome:function (name) {
        let self = this;
        self.incomeTemplateArray = [];
        if(name=='出国类') {
          this.incomeFile.incomeFile001.forEach(function (item) {
            self.incomeTemplateArray.push({
              attachCode:item.attachCode,
              title:item.title
            })
          })
        }
        if(name=='贷款类') {
          this.incomeFile.incomeFile002.forEach(function (item) {
            self.incomeTemplateArray.push({
              attachCode:item.attachCode,
              title:item.title
            })
          })
        }
        self.incomeTemplate = self.incomeTemplateArray[0].title;
      },

      choiceActive : function (sign) {
        this.slots[0].values = [];
        this.typeVisible = true;
        this.sign = sign;
        let self = this;
        switch (sign) {
          case 1:
            this.slots[0].values = ['出国类','贷款类'];
            break;
          case 2:
            this.incomeTemplateArray.forEach(function (item) {
              self.slots[0].values.push(item.title);
            })
            break;
          case 3:
            this.incomeFile.incomeFile003.forEach(function (item) {
              self.slots[0].values.push(item.title);
            })
            break;
        }
      },

      ensure: function () {
        switch (this.sign) {
          case 1:
            this.incomeType = this.selectValue;
            this.getIncome(this.incomeType);
            break;
          case 2:
            this.incomeTemplate= this.selectValue;
            break;
          case 3:
            this.jobType= this.selectValue;
            break;
        }
        this.typeVisible = false;
      },

      cancel: function () {
        this.typeVisible = false;
      }

    },
    mounted: function() {
      this.getIncomeFileInfo();
    }
  }
</script>
<style type="text/css">

  .clear {
    clear: both;
  }

  .zmsq-main {
    width: 100%;
    background: white;
    text-align: left;
    font-size: 15px;
  }

  .zmsq-main .mint-navbar {
    border-bottom: 1px solid #b8b8b8;
  }


  .zmsq-main .mint-tab-item-label {
    font-weight: bold;
    font-size: 15px;
  }

  .zmsq-income {
    width: 90%;
    margin: 50px auto;
    line-height: 42px;
  }

  .zmsq-income-tit {
    display: inline-block;
    width: 40%;
    float: left;
    color: black;
    font-weight: bold;
  }

  .zmsq-income-search {
    display: inline-block;
    width: 59%;
    height: 40px;
    border: 1px solid #b8b8b8;
    border-radius: 3px;
    float: left;
  }

  .zmsq-income-type {
    margin-bottom: 15px;
    height: 42px;
  }

  .zmsq-income-search span:nth-child(1) {
    margin-left: 5px;
  }

  .zmsq-income-search span:nth-child(2) {
    float: right;
    margin: 11px 10px 0 0;
    color: #b8b8b8;
  }

  .zmsq-button {
    width: 90%;
    margin: 0 auto;
  }

  .zmsq-button .mint-button--large {
    width: 48%;
    float: left;
  }

  .zmsq-button .mint-button-text {
    font-size: 15px;
  }

  .zmsq-button button:nth-child(1) {
    margin-right: 4%;
    color: black;
    background: white!important;
  }

  .xitong-wrapper{
    height: auto;
    width: 100%;
    background: #fff;
  }
  .xitong-wrapper .picker-slot.picker-slot-left {
    text-align: center;
  }
  .IT-navigation{
    height:40px;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid #ebebeb;
  }
  .xitong-wrapper .mint-button {
    float: left;
    width: 50%;
    font-size: 16px;
    box-shadow: 0 0;
    border-radius: 0;
  }
  .xitong-wrapper .mint-button--primary {
    background-color: #3d74d9;
  }

</style>
