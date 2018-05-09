<template>

  <div>
    <app-header title="我的申请"></app-header>
    <div class="wdsqxq-main" :style="pageh">
      <div v-if="type=='01'">
        <div class="mint-cell mint-field" v-for="item in applyData">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">{{item.title}}</span>
            </div>
            <div class="jtcybj-input">
              <input placeholder="暂无" type="text" class="mint-field-core" v-model="item.model" readonly disabled>
            </div>
          </div>
        </div>

      </div>

      <div v-if="type=='02'">
        <div v-if="old==1">
          <div class="wdsq-bxxq">
            <span>原数据</span>
          </div>
          <div class="mint-cell mint-field" v-for="item in originalData">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-text">{{item.title}}</span>
              </div>
              <div class="jtcybj-input">
                <input placeholder="暂无" type="text" class="mint-field-core" v-model="item.model" readonly disabled="">
              </div>
            </div>
          </div>
        </div>

        <div class="wdsq-bxxq" v-if="old==1">
          <span>新数据</span>
        </div>
        <div class="mint-cell mint-field" v-for="item in newData">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">{{item.title}}</span>
            </div>
            <div class="jtcybj-input">
              <input placeholder="暂无" type="text" class="mint-field-core" v-model="item.model" readonly disabled>
            </div>
          </div>
        </div>

      </div>


    </div>

  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { State,httpGetMethod } from "../../../utils/api.js";
  import { Tool } from "../../../utils/tool.js"; //添加公共组件
  export default {
    name: 'WdsqxqComponent',
    data: function() {
      return {
        pageh: {
          height:State().pageh
        },
        type: this.$route.params.id,
        newData:[],
        applyData:[],
        old:0
      }
    },
    components: {
      AppHeader
    },
    methods: {
      getData: function () {
        let self = this;
        httpGetMethod('hrs-ess/app/getSqEmpRelationDetail.action?', {
          type: self.type,
          code: self.$route.params.code
        }, function(result) {
          if(result.success) {
            switch(result.data.status) {
              case '01':
                result.data.status = '已保存';
                break;
              case '02':
                result.data.status = '已提交';
                break;
              case '03':
                result.data.status = '已拒绝';
                break;
              case '04':
                result.data.status = '已处理';
                break;
            }

            switch(result.data.operType) {
              case '01':
                result.data.operType = '新增';
                break;
              case '02':
                result.data.operType = '修改';
                break;
              case '03':
                result.data.operType = '删除';
                break;
            }

            if(self.type=='01') {


              self.applyData = [
                {
                  title: '修改字段：',
                  model: result.data.fieldName
                },
                {
                  title: '原数据：',
                  model: result.data.oldVal
                },
                {
                  title:'新数据：',
                  model: result.data.newVal
                },
                {
                  title:'备注：',
                  model: result.data.essDesc
                },
                {
                  title:'状态：',
                  model: result.data.status
                },
                {
                  title:'提交时间：',
                  model: result.data.submitDateStr
                },
                {
                  title:'完成时间：',
                  model: result.data.endDateStr
                },
                {
                  title:'拒绝原因：',
                  model: result.data.rejectDesc
                }
              ]
            }
            else {
              if(result.data.operType=='修改') {
                self.old = 1;
                self.originalData = [
                  {
                    title: '关系：',
                    model: result.data.oldRelation
                  },
                  {
                    title: '姓名：',
                    model: result.data.oldRelationName
                  },
                  {
                    title:'性别：',
                    model: result.data.oldSex
                  },
                  {
                    title:'工作单位：',
                    model: result.data.oldOrgDuty
                  },
                ]
              }
              self.newData = [
                {
                  title: '关系：',
                  model: result.data.operType=='删除'?result.data.oldRelation:result.data.relation
                },
                {
                  title: '姓名：',
                  model: result.data.operType=='删除'?result.data.oldRelationName:result.data.relationName
                },
                {
                  title:'性别：',
                  model: result.data.operType=='删除'?result.data.oldSex:result.data.sexCode
                },
                {
                  title:'工作单位：',
                  model: result.data.operType=='删除'?result.data.oldOrgDuty:result.data.orgDuty
                },
                {
                  title:'操作状态：',
                  model: result.data.operType
                },
                {
                  title:'备注：',
                  model: result.data.essDesc
                },
                {
                  title:'状态：',
                  model: result.data.status
                },
                {
                  title:'提交时间：',
                  model: result.data.submitDateStr
                },
                {
                  title:'完成时间：',
                  model: result.data.endDateStr
                },
                {
                  title:'拒绝原因：',
                  model: result.data.rejectDesc
                }
              ]
            }
          }
          else {
            Tool.alert('获取申请信息失败','','',function () {
              self.$router.go(-1);
            })
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
  .wdsqxq-main {
    text-align: left;
    background: white;
  }
  .wdsq-bxxq {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }

  .wdsq-bxxq span{
    margin-left: 10px;
    color: #2982d5;
  }

  input[disabled] {
    background: white;
  }
</style>
