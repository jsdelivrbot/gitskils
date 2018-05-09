<template>

  <div>
    <app-header title="已提交证明列表"></app-header>
    <div class="zmsqxq-main" :style="pageh">

      <!--收入证明-->
      <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :top-distance='10' bottom-pull-text="上拉加载更多" bottom-drop-text="释放加载" :style="pagesh" v-if="!noresult">
        <div class="zmsqxq-list" v-for="(item,index) in incomeSqList">
          <div class="mint-cell mint-field">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-text">证明类别</span>
              </div>
              <div class="zmsqxq-input-top">
                <input placeholder="暂无" type="text" class="mint-field-core" readonly="readonly" v-model="incomeAbroad" v-if="item.formType=='001'">
                <input placeholder="暂无" type="text" class="mint-field-core" readonly="readonly" v-model="incomeLoan" v-if="item.formType=='002'">
                <input placeholder="暂无" type="text" class="mint-field-core" readonly="readonly" v-model="job" v-if="item.formType=='003'">
              </div>
              <div class="zmsqxq-text">
                <span v-if="item.status=='001'">已保存</span>
                <span v-if="item.status=='002'">已提交</span>
                <span v-if="item.status=='003'">已完成</span>
              </div>
            </div>
          </div>

          <div class="mint-cell mint-field" v-for="it in item.incomeList" v-if="it.formType!='003'">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-text">{{it.title}}</span>
              </div>
              <div class="zmsqxq-input">
                <input placeholder="暂无" type="text" class="mint-field-core" readonly="readonly" v-model="it.model">
              </div>
            </div>
          </div>
          <div class="mint-cell mint-field" v-if="item.status=='001'">
            <div class="mint-cell-wrapper">
              <div class="zmsqxq-button">
                <mt-button type="default" size="small" @click="deleteApply(item.applyId)">删除</mt-button>
                <mt-button type="primary" size="small" @click="submitApply(item.applyId,item.attachCode,item.formType)">提交</mt-button>
              </div>
            </div>
          </div>
        </div>
        <div style="height: 32px;line-height: 32px;text-align: center" v-if='incomeSqList.length>5&&allLoaded'>已加载到底部</div>
      </mt-loadmore>
      <div class="noresult-wrap" v-else>
        <img class="noresult-img" src="../../../../static/noresult.png">
      </div>

    </div>

  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { State,httpGetMethod } from "../../../utils/api.js";
  import { Tool } from "../../../utils/tool.js"; //添加公共组件
  export default {
    name: 'ZmsqxqComponent',
    data: function() {
      return {
        pageh: {
          height:State().pageh
        },
        pagesh: {
          "min-height": State().wh - 44 + "px"
        },
        allLoaded: false,
        model:1,
        PageSize: 10,
        RowNum: 1,
        incomeAbroad:'收入证明-出国类',
        incomeLoan:'收入证明-贷款类',
        job:'在职证明',
        incomeSqList:[],
        noresult:false
      }
    },
    components: {
      AppHeader
    },
    methods: {
      loadTop: function() {
        let self = this;
        this.RowNum = 1;
        this.getIncomeSqList(function(lt) {
          self.incomeSqList = [];
          lt.rows.forEach(function(item) {
            self.incomeSqList.push({
              formType:item.formType,
              status:item.status,
              applyId:item.applyId,
              attachCode:item.attachCode,
              incomeList:[
                {
                  title:"证明模板",
                  model: item.fileName
                },
                {
                  title:"年收入",
                  model: item.income,
                  formType:item.formType
                },
                {
                  title:"联系方式",
                  model: item.empTel
                },
                {
                  title:"提交时间",
                  model: item.submitDateStr
                }
              ]
            })
          });
          self.allLoaded = false;
          self.$refs.loadmore.onTopLoaded();
          if(lt.rows.length < self.PageSize) {
            self.allLoaded = true;
          }
        }, true);
      },
      loadBottom: function() {
        let self = this;
        this.RowNum++;
        this.getIncomeSqList(function(lt) {
          self.$refs.loadmore.onBottomLoaded();
          if(lt.rows.length < self.PageSize) {
            self.allLoaded = true;
          }
        }, true);
      },
      //获取申请列表
      getIncomeSqList: function (fun, isshowload) {
        let self = this;
        httpGetMethod("hrs-ess/app/getIncomeSqList.action?",{
          currentPage:self.RowNum,
          pageSize:self.PageSize
        },function(result){
          if(result.success) {
            if(result.data.total==0) {
              self.noresult= true;
            }
            else {
              result.data.rows.forEach(function (item) {
                self.incomeSqList.push({
                  formType:item.formType,
                  status:item.status,
                  applyId:item.applyId,
                  attachCode:item.attachCode,
                  incomeList:[
                    {
                      title:"证明模板",
                      model: item.fileName
                    },
                    {
                      title:"年收入",
                      model: item.income,
                      formType:item.formType
                    },
                    {
                      title:"联系方式",
                      model: item.empTel
                    },
                    {
                      title:"提交时间",
                      model: item.submitDateStr
                    }
                  ]
                })
              });
            }

          }
          else {
            Tool.alert("模板信息获取失败");
          }
          if(fun) {
            fun(result.data)
          }
        },function () {},isshowload);
      },

      //删除已保存的申请
      deleteApply: function (applyId) {
        let self = this;
        Tool.alert('确定要删除吗？','',true,function () {
          httpGetMethod("hrs-ess/app/deleteIncomeSqInfo.action?",{
            applyId:applyId
          },function(result){
            if(result.success) {
              if(result.data=='0') {
                Tool.alert('删除成功');
                self.incomeSqList = [];
                self.getIncomeSqList();
              }
              else {
                Tool.alert('删除失败');
              }
            }
            else {
              Tool.alert("删除失败" + '<br/>' + result.msg);
            }
          });
        })
      },

      //提交申请
      submitApply: function (applyId,attachCode,formType) {
        let self = this;
        Tool.alert('确定要提交吗？','',true,function () {
          httpGetMethod("hrs-ess/app/addIncomeSqInfo.action?",{
            applyId: applyId,
            attachCode: attachCode,
            formType: formType,
            isSubmit:'Y',
            orgCode2: window.orgCode2
          },function(result){
            if(result.success) {
              if(result.data=='0') {
                Tool.alert('提交成功');
                self.incomeSqList = [];
                self.getIncomeSqList();
              }
              else {
                Tool.alert('提交失败');
              }
            }
            else {
              Tool.alert("提交失败" + '<br/>' + result.msg);
            }
          });
        })

      }
    },
    mounted: function() {
      this.getIncomeSqList();
    }
  }
</script>
<style type="text/css">

  .zmsqxq-main {
    text-align: left;
    overflow-y: auto;
  }
  .zmsqxq-list {
    padding-top: 20px;
  }

  .zmsqxq-input-top {
    width: 70%;
  }

  .zmsqxq-text{
    width: 30%;
    color: #6fbfed;
    text-align: right;
  }

  .zmsqxq-input {
    width: 100%;
  }

  .zmsqxq-button {
    position: absolute;
    right: 0;
    line-height: 48px;
  }
  .zmsqxq-button button{
    margin-right: 10px;
  }


  .zmsqxq-main .noresult-wrap {
    margin: 0 auto;
    padding-top: 150px;
    width: 160px;
    height: 200px;
  }
  .zmsqxq-main .noresult-wrap .noresult-img {
    width: 100%;
  }
</style>
