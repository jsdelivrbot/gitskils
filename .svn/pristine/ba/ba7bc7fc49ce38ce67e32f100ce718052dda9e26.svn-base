<template>

  <div>
    <app-header title="家庭成员修改"></app-header>
    <div class="jtcyxg-main" :style="pageh">
      <div v-if="!noresult">
        <div class="jtcyxg-title">
          <div class="jtcyxg-title-table">
            <div class="jtcyxg-navigation" v-for="item in familyList">
              <div>
                <span>{{item}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="jtcyxg-content" :style="pagesh">
          <div class="jtcyxg-content-table" v-for="(tr,tri) in list">
            <div class="jtcyxg-content-top">
              <div>
                <label class="mint-checklist-label">
                  <span class="mint-checkbox">
                    <input type="checkbox" class="mint-checkbox-input" :value=tr.checked v-model="tr.checked" @click="alocked(tr)">
                    <span class="mint-checkbox-core"></span>
                  </span>
                </label>
              </div>
            </div>
            <div class="jtcyxg-content-list">
              <div>
                <span>{{tr.relation}}</span>
              </div>
            </div>
            <div class="jtcyxg-content-list">
              <div>
                <span>{{tr.relationName}}</span>
              </div>
            </div>
            <div class="jtcyxg-content-list">
              <div>
                <span>{{tr.sexCode}}</span>
              </div>
            </div>
            <div class="jtcyxg-content-list">
              <div>
                <span>{{tr.orgDuty}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="jtcyxg-bottom">
          <mt-button type="default" @click="add">添加</mt-button>
          <mt-button type="default" @click="edit">编辑</mt-button>
          <mt-button type="default" @click="whetherDelete">删除</mt-button>
        </div>
      </div>
      <div class="noresult-wrap" v-else>
        <img class="noresult-img" src="../../../../static/noresult.png">
      </div>
    </div>

  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { httpGetMethod,State } from "../../../utils/api.js"; //添加公共组件
  import { Tool } from "../../../utils/tool.js"; //添加公共组件
  export default {
    name: 'JtcyxgComponent',
    data: function() {
      return {
        pageh: {
          height: State().pageh
        },
        pagesh: {
          height: State().pageh - 62 + 'px'
        },
        list:[],
        relation: '',
        relationName:'',
        sexCode:'',
        orgDuty:'',
        relationCode:'',
        familyList:['选择','关系','姓名','性别','工作单位'],
        noresult:false
      }
    },
    components: {
      AppHeader
    },
    methods: {
      alocked: function (tr) {
        this.list.forEach(function (item) {
          item.checked = false;
        });
        tr.checked = true;
        this.relation = tr.relation;
        this.relationName = tr.relationName;
        this.sexCode = tr.sexCode;
        this.orgDuty = tr.orgDuty;
        this.relationCode = tr.relationCode;
      },
      edit: function () {
        if(!this.relation) {
          Tool.alert("请选择要编辑的家庭成员");
          return;
        }
        else {
          let self = this;
          httpGetMethod("hrs-ess/app/checkEmpRelationStatus.action?",{
            operType:'02',
            oldCode:self.relationCode
          },function(result){
            if(result.success) {
              window.location.href = "#/jtcyxg/" + self.relation + '/' + self.relationName + '/' + self.sexCode + '/' + self.orgDuty + '/' + self.relationCode + '/' + 1;
            }
            else {
              Tool.alert("有正在处理的申请");
            }
          });
        }
      },
      add: function () {
          window.location.href = "#/jtcyxg/" + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 0 + '/' + 2;
      },
      deleteEmpRelation: function () {
        let self = this;
        httpGetMethod("hrs-ess/app/deleteEmpRelation.action?", {
          relationCode:'',
          oldCode: self.relationCode,
          orgCode: window.orgCode,
          status: '02'
        }, function(result) {
          if(result.success) {
            Tool.alert("删除申请已提交");
          }
          else {
            if(result.msg != undefined || result.msg != '') {
              Tool.alert(result.msg);
            }
            else {
              Tool.alert("删除失败");
            }
          }

        },function (error) {
          Tool.alert("删除失败");
        })
      },
      whetherDelete:function () {
        if(!this.relation) {
          Tool.alert("请选择要删除的家庭成员");
          return;
        }
        let self = this;
        httpGetMethod("hrs-ess/app/checkEmpRelationStatus.action?",{
          operType:'03',
          oldCode:self.relationCode
        },function(result){
          if(result.success) {
            self.deleteEmpRelation();
          }
          else {
            Tool.alert("有正在处理的申请");
          }
        });
      },
      getData: function () {
        let self = this;
        httpGetMethod("hrs-ess/app/getEmpRelationInfo.action?",{
        },function(result){
          if(result.success) {
            if(result.data.rows.length) {
              result.data.rows.forEach(function (item) {
                item.checked = false;
              });
              self.list = result.data.rows;
            }
            else {
              self.noresult = true;
            }
          }
          else {
            Tool.alert("家庭成员信息获取失败");
          }
        });
      }
    },
    mounted: function() {
      this.getData();
    }
  }
</script>
<style type="text/css">
  .jtcyxg-main {
    text-align: left;
    background: white;
    text-align: center;
  }

  .jtcyxg-main .mint-checklist-label {
    padding: 0;
  }

  .jtcyxg-main .noresult-wrap {
    margin: 0 auto;
    padding-top: 160px;
    width: 160px;
    height: 200px;
  }
  .jtcyxg-main .noresult-wrap .noresult-img {
    width: 100%;
  }

  .jtcyxg-bottom {
    margin-top: 40px;
    float: right;
  }

  .jtcyxg-bottom .mint-button--normal {
    margin-right: 10px;
  }

  .jtcyxg-title {
    width: 100%;
    padding-top: 20px;
    font-weight: bold;
    font-size: 15px;
    line-height: 40px;
  }

  .jtcyxg-title-table {
    width: 90%;
    height: 40px;
    margin: 0 auto;
    border: 1px solid #ebebeb;
    background: #f7fcff;
  }

  .jtcyxg-navigation , .jtcyxg-content-list {
    display: table;
    height: 40px;
    border-right: 1px solid #ebebeb;
    float: left;
    width: 21.5%;
  }

  .jtcyxg-title-table>div:nth-child(1),.jtcyxg-content-top {
    width: 12%;
  }

  .jtcyxg-content-top {
    display: table;
    height: 40px;
    border-right: 1px solid #ebebeb;
    float: left;
  }

  .jtcyxg-title-table>div:nth-child(5) ,.jtcyxg-content-table>div:nth-child(5) {
    border: none;
  }

  .jtcyxg-navigation div {
    display: table-cell;
    vertical-align: middle;
  }

  .jtcyxg-navigation span,.jtcyxg-content-list span {
    max-height: 40px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .jtcyxg-content {
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    overflow-y: auto;
  }

  .jtcyxg-content-table {
    width: 90%;
    height: 40px;
    margin: 0 auto;
    border: 1px solid #ebebeb;
    border-top: none;
  }

</style>
