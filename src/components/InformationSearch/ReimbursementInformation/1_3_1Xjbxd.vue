<template>

  <div>
    <app-header title="新建报销单">
      <span slot="right" @click="submit">提交</span>
    </app-header>

    <div class="xjbxd-main">

      <!--基本信息-->
      <div class="xjbxd-jbxx">
        <span>基本信息</span>
      </div>

      <div class="mint-cell mint-field" v-for="item in creatNewList">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">{{item.title}}</span>
          </div>
          <div class="xjbxd-input">
            <input placeholder="暂无" type="text" class="mint-field-core" readonly="readonly" v-model="item.model">
          </div>
        </div>
      </div>

      <div class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">申请事由：</span>
          </div>
          <div class="xjbxd-input">
            <input placeholder="请填写" type="text" class="mint-field-core" v-model="remark">
          </div>
        </div>
      </div>

      <!--发票信息-->
      <div class="xjbxd-jbxx">
        <span>发票信息</span>
      </div>
      <div class="xjbxd-fpxx" v-for="(item,index) in invoiceList">
        <div class="xjbxd-fpxx-header">
          <li>发票序号<span>{{index+1}}</span></li>
          <li class="fa fa-trash-o" @click="deleteInvoice(index)"></li>
          <div class="clear"></div>
        </div>
        <div class="xjbxd-fpxx-list">

          <a class="mint-cell mint-field">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-text">费用项目：</span>
              </div>
              <div>
                <input placeholder="请选择费用项目" type="text" class="mint-field-core" readonly="readonly" v-model="item.expTypeName">
              </div>
            </div>
          </a>
          <mt-field label="发票金额：" placeholder="只能填写大于0的数字" type="number" v-model="item.billAmount"></mt-field>
          <div class="xjbxd-item" @click="TimeOpen(item.happenDate,index)">
            <mt-field readonly disabled label="发票日期：" placeholder="请选择" :value="item.happenDate | formatDate">
              <span class="xjbxd-date"></span>
            </mt-field>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <!--增加发票按钮-->
      <div class="xjbxd-zjfp" @click="addInvoice">
        +增加发票
      </div>

      <div class="itsq-item itsq-image">
        <mt-cell title="上传图片">
          <span class="itsq-plus" @click="photograph"> </span>
        </mt-cell>
      </div>
      <div class="itsq-image" v-if="imageShow">
        <img v-bind:src='image' alt="">
      </div>

      <mt-datetime-picker ref="pickerTime" type="date" :startDate="startTime" :endDate="endTime" v-model="pickerTime"
                          @confirm="handleConfirm" year-format="{value} 年"
                          month-format="{value} 月"
                          date-format="{value} 日">
      </mt-datetime-picker>
`

      <mt-popup
        v-model="bxsqVisible"
        position="bottom" class="bxsqVisible">
        <div class="bxsqVisible-top">
          <span>基本信息</span>
        </div>
        <div class="mint-cell mint-field" v-for="item in informationList">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">{{item.title}}</span>
            </div>
            <div class="xjbxd-input">
              <input placeholder="暂无" type="text" class="mint-field-core" readonly disabled v-model="item.model">
            </div>
          </div>
        </div>
        <div class="xjbxd-button">
          <mt-button class="button" type="primary" size="large" @click="ensuerInformation">确 定</mt-button>
        </div>
      </mt-popup>

      <!--拍照选择-->
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
      </mt-actionsheet>
    </div>

  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { DatetimePicker } from 'mint-ui';
  import { httpGetBxxx,httpGetTjxx } from "../../../utils/api.js"; //添加公共组件
  import { Tool } from "../../../utils/tool.js";
  export default {
    name: 'XjbxdComponent',
    data: function() {
      return {
        imageContent: '', // 图片内容base64格式的
        image:'',
        imageShow:false,
        name:'费用项目：',
        type:'其他费用报销',
        time:'',
        selectedIndex:'',
        sheetVisible:false,
        expenseVisible:false,
        bxsqVisible: false,
        pickerTime:new Date(),
        billNumber:'1',
        remark:'',
        billCode:'',
        Reimbursement: 0,
        actions:[
          {
            name:"拍照",
            method:this.getCamer
          },
          {
            name:"从相册中选择",
            method:this.choicePhoto
          }
        ],
        informationList:[
          {
            title:'报销单编号',
            model:''
          },
          {
            title:'收款人',
            model:''
          },
          {
            title:'员工编号',
            model:''
          },
          {
            title:'身份证号',
            model:''
          },
          {
            title:'收款账号',
            model:''
          },
          {
            title:'收款行名称',
            model:''
          },
          {
            title:'收款方行号',
            model:''
          }

        ],
        creatNewList:[
          {
            title:'单据类型',
            model:'其他费用报销'
          },
          {
            title:'申请日期',
            model: new Date().getFullYear() + '年' + (new Date().getMonth()+1) + '月' + new Date().getDate() + '日',
          },
          {
            title:'报销人',
            model:''
          },
          {
            title:'费用部门',
            model:''
          },
          {
            title:'成本中心',
            model:''
          },
          {
            title:'发票数量',
            model:'1'
          }
        ],
        startTime: new Date("2012-01-01"),
        endTime: new Date(),
        date: new Date(),
        info :{

        },
        invoiceList: [
          {
            'assists': [
              {
                'assiObjCode': '001',
                'assiObjName': '成本中心',
                'assiObjValue': '',
                'assiObjValueDesc': '',
                'del': '0'
              }
            ],
            'bcurrcyAmount': '100.00',
            'rate': '1.00000',
            'billAmount': '',
            'currentPayAmount': 0,
            'isDeduction': '0',
            'expTypeName': '近途交通费',
            'expTypeCode': '001001002',
            'expTypeFouth': '6055C84E79B711E7A88F00155D6D1F01',
            'expTypeFouthName': '退改签车票',
            'invoiceCurrcyName': '人民币',
            'invoiceCurrcyId': 'RMB',
            'happenDate': new Date(),
            'taxtpName': '',
            'taxtpCode': null,
            'suppName': '',
            'suppCode': null,
            'remark': '',
            'costObjCode': null,
            'costObjName': '',
            'costObjValue': '',
            'costObjDesc': '',
            'taxtpAmount': '0.00',
            'ftaxtAmount': '0.00',
            'invoiceCode': '',
            'expControlType': '',
            'suppFlag': '',
            'isSingle': '1',
            'bankAccount': '',
            'bankKey': '',
            'orderNo': '1',
            'invoiceMark': '',
            'originalTaxAmount': '0.00',
            'expenseOnceSupp': {

            }
          }
        ]
      }
    },
    components: {
      AppHeader
    },
    methods: {
      handleConfirm: function () {
        this.invoiceList[this.selectedIndex].happenDate = this.pickerTime;
      },

      //选择日期
      TimeOpen: function (date,index) {
        this.selectedIndex = index;
        this.$refs.pickerTime.open();
      },

      //增加发票
      addInvoice : function () {
        this.invoiceList.push({
          'assists': [
            {
              'assiObjCode': '001',
              'assiObjName': '成本中心',
              'assiObjValue': this.invoiceList[0].assists[0].assiObjValue,
              'assiObjValueDesc': this.invoiceList[0].assists[0].assiObjValueDesc,
              'del': '0'
            }
          ],
          'bcurrcyAmount': '100.00',
          'rate': '1.00000',
          'billAmount': '',
          'currentPayAmount': 0,
          'isDeduction': '0',
          'expTypeName': '近途交通费',
          'expTypeCode': '001001002',
          'expTypeFouth': '6055C84E79B711E7A88F00155D6D1F01',
          'expTypeFouthName': '退改签车票',
          'invoiceCurrcyName': '人民币',
          'invoiceCurrcyId': 'RMB',
          'happenDate': new Date(),
          'taxtpName': '',
          'taxtpCode': null,
          'suppName': '',
          'suppCode': null,
          'remark': '',
          'costObjCode': null,
          'costObjName': '',
          'costObjValue': '',
          'costObjDesc': '',
          'taxtpAmount': '0.00',
          'ftaxtAmount': '0.00',
          'invoiceCode': '',
          'expControlType': '',
          'suppFlag': '',
          'isSingle': '1',
          'bankAccount': '',
          'bankKey': '',
          'orderNo': '1',
          'invoiceMark': '',
          'originalTaxAmount': '0.00',
          'expenseOnceSupp': {

          }
        });
        this.creatNewList[5].model = this.invoiceList.length;
      },

      //删除发票
      deleteInvoice : function (id) {
        if(this.invoiceList.length == 1) {
          Tool.alert("至少填写一张发票");
          return;
        }
        this.remove(this.invoiceList,this.invoiceList[id]);
        this.creatNewList[5].model = this.invoiceList.length;
      },
      remove: function (arr,item) {
        if(arr.length){
          var index = arr.indexOf(item);
          if(index>-1){
            return arr.splice(index,1)
          }
        }
      },

      //确认信息
      ensuerInformation : function () {
        this.bxsqVisible = false;
        this.$router.go(-2);
      },

      //计算报销金额
      amount:function () {
        let self = this;
        this.invoiceList.forEach(function (item) {
          self.Reimbursement += parseFloat(item.billAmount);
        })
      },

      //图片上传功能
      photograph:function () {
        this.sheetVisible = true;
      },

      //打开相机
      getCamer:function () {
        let self = this;
        window.SinopecAppPlugin.callHandler('openCamera', {}, function(res) {
          self.imageContent = res.data;
          self.image = 'data:image/png;base64,' + self.imageContent;
          self.imageShow = true;
        });
      },

      //从相册中选择
      choicePhoto : function () {
        let self = this;
        window.SinopecAppPlugin.callHandler('openPictureLibrary', {}, function(res) {
          self.imageContent = res.data;
          self.image = 'data:image/png;base64,' + self.imageContent;
          self.imageShow = true;
        });
      },

      //提交申请
      submit: function () {
        let self = this;
        if(self.remark == '') {
          Tool.alert("请填写申请理由");
          return;
        }
        self.invoiceList.forEach(function (item) {
          if(item.billAmount == '') {
            Tool.alert("请填写发票金额");
            return;
          }
        });
        if(self.imageContent == '') {
          Tool.alert("请上传图片");
          return;
        }
        self.invoiceList.forEach(function (item) {
          item.happenDate = self.formatDate(item.happenDate);
        });
        Tool.loading();
        self.amount();
        let date = new Date();
        let time = this.formatDate(date);
        let key = md5("pictcslth123!@#" + time);
        self.$http.post('http://10.246.109.17/fss/otherBillPubAction_addRmaOtherBill.action?', {
          'saveOrSubmit':1,
          'rmaOtherBill.payModeName':'银企直连',
          'rmaOtherBill.payModeCode':'003',
          'rmaOtherBill.billCode':'系统自动生成',
          'rmaOtherBill.creater':self.info.empName,
          'rmaOtherBill.remark': self.remark,
          'rmaOtherBill.billNumber':self.creatNewList[5].model,
          'rmaOtherBill.applyEmpId':self.info.empId,
          'rmaOtherBill.applyEmpName':self.info.empName,
          'rmaOtherBill.applyOrgId': self.info.orgId,
          'rmaOtherBill.applyOrgCode': self.info.orgId,
          'rmaOtherBill.applyorgsfname': self.info.orgName,
          'rmaOtherBill.applyDeptOrgCode': self.info.orgId,
          'rmaOtherBill.applyDeptOrgSfname': self.info.orgName,
          'rmaOtherBill.apprOrgId':self.info.orgId,
          'rmaOtherBill.apprOrgCode':self.info.orgId,
          'rmaOtherBill.approrgsfname':self.info.orgName,
          'rmaOtherBill.forReimbursementName':self.info.empName,
          'rmaOtherBill.forReimbursementCode':self.info.empId,
          'rmaOtherBill.forReimbursementOrgName':self.info.orgName,
          'rmaOtherBill.forReimbursementOrgCode':self.info.orgId,
          'rmaOtherBill.costCentSname': self.info.costCentSname,
          'rmaOtherBill.currcyId':'RMB',
          'rmaOtherBill.currcyName':'人民币',
          'rmaOtherBill.currcyCode':'RMB',
          'rmaOtherBill.rate':'0.00',
          'rmaOtherBill.costCentCode':self.info.costCentCode,
          'rmaOtherBill.compCode':self.info.compCode,
          'rmaOtherBill.bcurrcyId':'RMB',
          'rmaOtherBill.bcurrcyAmount':self.Reimbursement,
          'rmaOtherBill.bcurrcyCode':'RMB',
          'rmaOtherBill.billAmount':self.Reimbursement,
          'rmaOtherBill.accoObjCode':'',
          'rmaOtherBill.accoObjName':'',
          'rmaOtherBill.accoObjValue':'',
          'rmaOtherBill.accoObjValueDesc':'',
          'rmaOtherBill.expTypeCode1':'',
          'rmaOtherBill.expTypeName1':'',
          'rmaOtherBill.expTypeCode2':'',
          'rmaOtherBill.expTypeName2':'',
          'rmaOtherBillExpensesJson':JSON.stringify(self.invoiceList),
          'rmaOtherBillPayOffsJson':'[]',
          'rmaOtherBillApplyJson':'[]',
          'rmaOtherBillLoadJson':'[]',
          'rmaOtherBill.pubPayApplyNos':'',
          'imgType':'png',
          'imgStr': self.imageContent
        }, {
          emulateJSON: true
        }).then(function(response) {
          Tool.close();

          if(response.body.success) {

            Tool.alert("提交成功",'','',function () {
              self.bxsqVisible = true;
              self.informationList[0].model = response.body.billCode;
              self.informationList[1].model = response.body.payOffs[0].accountName;
              self.informationList[2].model = response.body.payOffs[0].payeeId;
              self.informationList[3].model = response.body.payOffs[0].idCard;
              self.informationList[4].model = response.body.payOffs[0].bankAccount;
              self.informationList[5].model = response.body.payOffs[0].bankName;
              self.informationList[6].model = response.body.payOffs[0].bankKey;
            })
          }
          else {
            Tool.alert("提交失败");
          }

        });
      },
      formatDate(time) {
        let date = new Date(time);
        return Tool.formate(date, 'yyyyMMdd')
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return Tool.formate(date, 'yyyy-MM-dd')
      }
    },
    //初始化
    mounted:function () {
      let self = this;
      httpGetBxxx("fss/travelApplyUserSessionAction_queryUsersInfo.action?", {

      }, function(result) {
        self.info = result;
        //获取基本信息
        self.creatNewList[2].model = result.empName;
        self.creatNewList[3].model = result.orgName;
        self.creatNewList[4].model = result.costCentSname;
        //获取发票信息
        self.invoiceList[0].assists[0].assiObjValue = result.costCentCode;
        self.invoiceList[0].assists[0].assiObjValueDesc = result.orgName;
      })
    }
  }
</script>
<style type="text/css">

  .xjbxd-button .button{
    background-color: #3a71dc !important;
  }

  .clear {
    clear: both;
  }

  .itsq-item .mint-cell-wrapper {
    background-size: 0;
    text-align: left;
  }

  .itsq-plus {
    background: url(../../../../static/plus.png) no-repeat center;
    background-size: contain;
    display: block;
    width: 25px;
    height: 25px;
  }

  .itsq-image {
    border-top: 1px solid #d9d9d9;
  }

  .itsq-image {
    overflow-x: hidden;
    margin-top: 20px;
  }

  .itsq-image img {
    width: 100%;
    height: 200px;
  }

  .xjbxd-input {
    width: 100%;
  }

  .xjbxd-main {
    font-family: "微软雅黑";
    width: 100%;
    text-align: left;
    font-size: 14px;
  }

  .xjbxd-main .mint-cell-wrapper {
    font-size: 14px;
  }

  .xjbxd-jbxx {
    height: 40px;
    line-height: 40px;
    color: #8c8c8c;
  }

  .xjbxd-jbxx span {
    display: inline-block;
    margin-left: 10px;
  }

  .xjbxd-fpxx {
    background: white;
  }

  .xjbxd-fpxx-header{
    width: 100%;
    height: 48px;
    background: white;
    line-height: 48px;
  }

  .xjbxd-fpxx-header li:nth-child(1) {
    float: left;
    margin-left: 10px;
  }

  .xjbxd-fpxx-header li:nth-child(2) {
    float: right;
    margin-right: 15px;
    line-height: 48px;
  }

  .xjbxd-fpxx-list {
    width: 90%;
    float: right;
  }

  .xjbxd-zjfp {
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: white;
    font-size: 16px;
    color: #6f97e5;
  }

  .xjbxd-date {
    background: url(../../../../static/time.png) no-repeat center;
    background-size: contain;
    display: block;
    width: 15px;
    height: 15px;
  }

  .xjbxd-item .mint-cell-wrapper {
    text-align: left;
  }

  input:disabled {
    background:#fff;
    color: black;
  }

  .xjbxd-fpxx .mint-cell-wrapper {
    padding: 0 15px;
  }

  .xjbxd-button {
    width: 100%;
    height: 40px;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  .xjbxd-button .mint-button {
    border-radius: 0;
  }

  .xjbxd-expense {
    width: 100%;
  }

  .tjbxd-photo {
    width: 100%;
    height: 80px;
    background: white;
  }

  .tjbxd-tjzp {
    width: 50px;
    height: 50px;
    margin-top: 15px;
    margin-left: 10px;
    float: left;
    position: relative;
  }

  .tjbxd-tjzp span {
    position: absolute;
    top: -10px;
    right: -5px;
    background: #f7525f;
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    color: white;
  }

  .tjbxd-tjzp img {
    width: 50px;
    height: 50px;
  }

  .xjbxd-wrapper{
    height: auto;
    width: 100%;
    background: #fff;
  }

  .xjbxd-wrapper .mint-button--normal {
    float: left;
    width: 50%;
  }

  .bxsqVisible {
    width: 100%;
  }

  .bxsqVisible-top {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: #2982d5;
  }
</style>
