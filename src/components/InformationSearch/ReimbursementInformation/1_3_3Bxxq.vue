<template>

  <div>
    <app-header title="报销详情"></app-header>

    <div class="bxxq-main" :style="pageh">
      <div>
        <div class="xjbxd-bxxq">
          <span>基本信息</span>
        </div>

        <div class="mint-cell mint-field" v-for="item in BxxqList">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">{{item.title}}</span>
            </div>
            <div class="xjbxd-input">
              <input placeholder="暂无" type="text" class="mint-field-core" readonly="readonly" v-model="item.model">
            </div>
          </div>
        </div>

      </div>

      <div v-for="(item,idnex) in mainList">
        <div class="xjbxd-bxxq">
          <span>{{item.title}}</span>
        </div>
        <div v-if="item.show">
          <div class="bxxq-detail-body bxxq-list-title">
            <div class="bxxq-list">
              <div class="Bxxq-table-ceil Bxxq-table-border" :class="{billPrvPay:item.type==4}">
                <div>
                  <span>{{item.first}}</span>
                </div>
              </div>
              <div class="Bxxq-table-ceil Bxxq-table-border" :class="{billPrvPay:item.type==4}">
                <div>
                  <span>{{item.second}}</span>
                </div>
              </div>
              <div class="Bxxq-table-ceil Bxxq-table-border" :class="{billPrvPay:item.type==4}">
                <div>
                  <span>{{item.third}}</span>
                </div>
              </div>

              <div class="Bxxq-table-ceil Bxxq-table-border" v-if="item.type==4" :class="{billPrvPay:item.type==4}">
                <div>
                  <span>{{item.five}}</span>
                </div>
              </div>

              <div class="Bxxq-table-ceil" :class="{billPrvPay:item.type==4}">
                <div>
                  <span>{{item.fourth}}</span>
                </div>
              </div>

            </div>
          </div>
          <div class="bxxq-detail-body">
            <div class="bxxq-list" v-for="(it,index) in item.bodyList">
              <div class="Bxxq-table-ceil Bxxq-table-border" :class="{billPrvPay:item.type==4}">
                <div>
                  <span v-if="item.type==1">{{it.expTypeName}}</span>
                  <span v-if="item.type==2">{{it.empName}}</span>
                  <span v-if="item.type==3">{{it.suppCode}}</span>
                  <span v-if="item.type==4">{{it.payeeId}}</span>
                </div>
              </div>
              <div class="Bxxq-table-ceil Bxxq-table-border" :class="{billPrvPay:item.type==4}">
                <div>
                  <span v-if="item.type==1">{{it.expTypeFouthName}}</span>
                  <span v-if="item.type==2">{{it.operationType}}</span>
                  <span v-if="item.type==3" @click="alertHidden(it.suppName)">{{it.suppName}}</span>
                  <span v-if="item.type==4">{{it.accountName}}</span>
                </div>
              </div>
              <div class="Bxxq-table-ceil Bxxq-table-border" :class="{billPrvPay:item.type==4}">
                <div>
                  <span v-if="item.type==1">{{it.billAmount}}</span>
                  <span v-if="item.type==2">{{it.operationOppinion}}</span>
                  <span v-if="item.type==3">{{it.invoiceTotalAmount}}</span>
                  <span v-if="item.type==4">{{it.payModeName}}</span>
                </div>
              </div>
              <div class="Bxxq-table-ceil Bxxq-table-border" v-if="item.type==4" :class="{billPrvPay:item.type==4}" @click="alertHidden(it.bankAccount)">
                <div>
                  <span>{{it.bankAccount}}</span>
                </div>
              </div>
              <div class="Bxxq-table-ceil" :class="{billPrvPay:item.type==4}">
                <div>
                  <span v-if="item.type==1">{{it.taxtpAmount}}</span>
                  <span v-if="item.type==2">{{it.operationTime}}</span>
                  <span v-if="item.type==3">{{it.payOffAmount}}</span>
                  <span v-if="item.type==4">{{it.payOffAmount}}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div v-else class="noData">暂无数据...</div>
      </div>

    </div>
  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { DatetimePicker } from 'mint-ui';
  import { Tool } from "../../../utils/tool.js";
  import { httpGetBxxx,State } from "../../../utils/api.js"; //添加公共组件
  export default {
    name: 'BxxqComponent',
    data: function() {
      return {
        pageh: {
          height: 0
        },
        name:'费用项目：',
        expenseVisible:false,
        pickerTime:'',
        startTime: new Date("2013-01-01"),
        endTime: new Date(),
        type:'',
        BxxqList:[
          {
            title:"单据编号：",
            model: ''
          },
          {
            title:"单据类型：",
            model: ''
          },
          {
            title:"申请人：",
            model: ''
          },
          {
            title:"报销人：",
            model: ''
          },
          {
            title:"申请日期：",
            model: ''
          },
          {
            title:"费用部门：",
            model: ''
          },
          {
            title:"成本中心：",
            model: ''
          },
          {
            title:"报销金额：",
            model: ''
          },
          {
            title:"紧急流程：",
            model: ''
          },
          {
            title:"申请事由：",
            model: ''
          }
        ],
        mainList:[
          {
            title:'费用信息',
            first:'费用项目',
            second:'四级费用',
            third:"发票总金额",
            fourth:'发票税金',
            bodyList:[],
            type:1
          },
          {
            title:'审批信息',
            first:'审批人员',
            second:'审批结果',
            third:"审批意见",
            fourth:'审批时间',
            bodyList:[],
            type:2
          },
          {
            title:'支付信息对私信息',
            first:'员工编号',
            second:'收款人',
            third:"支付方式",
            five:"收款账号",
            fourth:'实际支付金额',
            bodyList:[],
            type:4
          },
          {
            title:'支付信息对公信息',
            first:'收款方编码',
            second:'收款方名称',
            third:"发票总金额",
            fourth:'实际支付金额',
            bodyList:[],
            type:3
          }
        ]
      }
    },
    components: {
      AppHeader
    },
    methods: {
      alertHidden(content) {
        Tool.alert(content)
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return Tool.formate(date, 'yyyy-MM-dd')
      }
    },
    mounted: function () {
      let self = this;
      let billCode = this.$route.params.billCode;
      httpGetBxxx("fss/billListPubAction_queryBillView.action?", {
        "billCode" : billCode
      }, function(result) {
        console.log(result)
        //获取基本信息
        self.BxxqList[0].model = result.billInfo[0].billCode;
        self.BxxqList[1].model = result.billInfo[0].billTypeName;
        self.BxxqList[2].model = result.billInfo[0].applyEmpName;
        self.BxxqList[3].model = result.billInfo[0].forReimbursementName;
        self.BxxqList[4].model = result.billInfo[0].applyDate.substring(0,4) + '年' + result.billInfo[0].applyDate.substring(4,6) + '月' + result.billInfo[0].applyDate.substring(6,8) + '日';
        self.BxxqList[5].model = result.billInfo[0].approrgsfname;
        self.BxxqList[6].model = result.billInfo[0].costCentSname;
        self.BxxqList[7].model = result.billInfo[0].billAmount;
        self.BxxqList[8].model = result.billInfo[0].urgentProcess;
        self.BxxqList[9].model = result.billInfo[0].remark;

        //获取费用信息
        self.mainList[0].bodyList = result.billExp;
        self.mainList[1].bodyList = result.billOperHis;
        self.mainList[1].bodyList.forEach(function (item) {
          item.operationTime = item.operationTime.substring(0,4) + '年' + item.operationTime.substring(4,6) + '月' + item.operationTime.substring(6,8) + '日'
        })
        self.mainList[2].bodyList = result.billPrvPay;
        self.mainList[3].bodyList = result.billPubPay;
        self.mainList.forEach(function (item) {
          if(item.bodyList.length>0) {
            item.show = true;
          }
          else {
            item.show = false;
          }
        })


      })
    }
  }
</script>
<style type="text/css">
  .bxxq-main {
    font-family: "微软雅黑";
    width: 100%;
    text-align: left;
    font-size: 14px;
    margin-bottom: 20px;
  }

  input:disabled{
    background:#fff!important;
  }

  .xjbxd-input {
    width: 100%;
  }

  .bxxq-main .mint-cell-wrapper {
    font-size: 14px;
  }

  .xjbxd-bxxq {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  .xjbxd-bxxq span{
    margin-left: 10px;
    color: #2982d5;
  }


  bxxq-main .mint-field-core {
    color: black;
  }

  .payOffs .mint-field-core{
    font-size: 13px!important;
  }

  .bxxq-gltitle {
    height: 40px;
    line-height: 40px;
    background: #f7fcff;
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid #ebebeb;
  }

  .bxxq-gltitle li {
    float: left;
    width: 24%;
    font-size: 13px;
    border-right: 1px solid #ebebeb;
  }

  .bxxq-gltitle li:nth-child(4) {
    border: none;
  }

  .bxxq-detail-body {
    background: white;
  }

  .bxxq-list {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    height: 40px;
  }

  .bxxq-list-title {
    background: #f7fcff;
  }

  .Bxxq-table-ceil {
    width: 24.8%;
    display: table;
    font-size: 12px;
    float: left;
    height: 40px;
    text-align: center;
  }

  .Bxxq-table-ceil span {
    width: 100%;
    max-height: 40px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 18px;
  }

  .Bxxq-table-border {
    border-right: 1px solid #ebebeb;
  }

  .Bxxq-table-ceil div {
    display: table-cell;
    vertical-align: middle;
    word-break: break-all;
  }

  .billPrvPay {
    width: 19.8%;
  }

  .bxxq-main .noData {
    width: 100%;
    height: 40px;
    background: #f7f7f7;
    text-align: center;
    line-height: 40px;
  }
</style>
