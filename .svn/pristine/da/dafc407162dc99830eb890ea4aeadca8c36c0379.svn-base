<template>

  <div>
    <app-header title="我的申请"></app-header>
    <div class="wdsq-main" :style="Pageh">
      <mt-navbar v-model="selected">
        <mt-tab-item id="01">基本信息</mt-tab-item>
        <mt-tab-item id="02">家庭成员关系</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <div class="wdsq-bar">
        <mt-tab-container v-model="selected">

          <!--基本信息-->
          <mt-tab-container-item id="01">
            <div v-if="!noresult">
              <div class="wdsq-base-title">
                <ul>
                  <li v-for="item in baseTitle">{{item}}</li>
                  <div class="clear"></div>
                </ul>
              </div>

              <div class="wdsq-base-content" :style="pageh">
                <ul v-for="item in baseList" @click="viewDetail(item.sqNo,'01')" v-if="item.status!='已保存'">
                  <li>{{item.fieldName}}</li>
                  <li>{{item.oldVal}}</li>
                  <li>{{item.newVal}}</li>
                  <li>{{item.essDesc}}</li>
                  <li>{{item.status}}</li>
                  <div class="clear"></div>
                </ul>
              </div>

            </div>
            <div class="noresult-wrap" v-else>
              <img class="noresult-img" src="../../../../static/noresult.png">
            </div>
          </mt-tab-container-item>

          <!--家庭成员关系-->
          <mt-tab-container-item id="02">
            <div v-if="!resultFamily">
              <div class="wdsq-family-title">
                <div class="wdsq-family-table" style="border-top: 1px solid #ebebeb">
                  <div class="wdsq-family-navigation" v-for="item in familyTitle">
                    <div>
                      <span>{{item}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wdsq-family-content" :style="pagesh">
                <div class="wdsq-family-table" v-for="item in familyList" @click="viewDetail(item.relationCode,'02')" v-if="item.status!='已保存'">
                  <div class="wdsq-family-navigation">
                    <div>
                      <span>{{item.oldRelation}}</span>
                    </div>
                  </div>
                  <div class="wdsq-family-navigation">
                    <div>
                      <span>{{item.oldRelationName}}</span>
                    </div>
                  </div>
                  <div class="wdsq-family-navigation">
                    <div>
                      <span>{{item.oldSex}}</span>
                    </div>
                  </div>
                  <div class="wdsq-family-navigation">
                    <div>
                      <span>{{item.oldOrgDuty}}</span>
                    </div>
                  </div>
                  <div class="wdsq-family-navigation">
                    <div>
                      <span>{{item.operType}}</span>
                    </div>
                  </div>
                  <div class="wdsq-family-navigation">
                    <div>
                      <span>{{item.status}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="noresult-wrap" v-else>
              <img class="noresult-img" src="../../../../static/noresult.png">
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>

  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { httpGetMethod,State } from "../../../utils/api.js"; //添加公共组件
  import { Tool } from "../../../utils/tool.js"; //添加公共组件
  export default {
    name: 'WdsqComponent',
    data: function() {
      return {
        Pageh: {
          height:State().wh - 44 + "px"
        },
        pageh: {
          height:State().wh - 156 + "px"
        },
        pagesh: {
          height:State().wh - 168 + "px"
        },
        selected: '01',
        baseList:[],
        familyList:[],
        noresult:false,
        resultFamily:false,
        baseTitle:['修改字段','原内容','新内容','备注','状态'],
        familyTitle:['关系','姓名','性别','工作单位','操作状态','状态']
      }
    },
    components: {
      AppHeader
    },
    methods: {
      viewDetail: function (sqNo,id) {
        if(sqNo) {
          window.location.href = '#/wdsq/' + id + '/' + sqNo;
        }
      },
      getData: function () {
        let self = this;
        httpGetMethod("hrs-ess/app/getSqEmpRelationList.action?",{
        },function(result){
          if(result.success) {
            if(result.data.eList.length) {
              //基本信息申请
              result.data.eList.forEach(function (item) {
                let num = 0;
                if(item.status=='01') {
                  num++;
                }
                if(num == result.data.eList.length) {
                  self.noresult = true;
                }
                item.checked = false;
                switch(item.status) {
                  case '01':
                    item.status = '已保存';
                    break;
                  case '02':
                    item.status = '已提交';
                    break;
                  case '03':
                    item.status = '已拒绝';
                    break;
                  case '04':
                    item.status = '已处理';
                    break;
                }
              })
              self.baseList = result.data.eList;
            }
            else {
              self.noresult = true;
            }
            if(result.data.fList.length) {
              //家庭成员信息申请
              result.data.fList.forEach(function (item) {
                item.checked = false;
                let num = 0;
                if(item.status=='01') {
                  num++;
                }
                if(num == result.data.fList.length) {
                  self.resultFamily = true;
                }
                switch(item.operType) {
                  case '01':
                    item.operType = '新增';
                    item.oldRelation = item.relation;
                    item.oldRelationName = item.relationName;
                    item.oldSex = item.sexCode;
                    item.oldOrgDuty = item.orgDuty;
                    break;
                  case '02':
                    item.operType = '修改';
                    break;
                  case '03':
                    item.operType = '删除';
                    break;
                }
                switch(item.status) {
                  case '01':
                    item.status = '已保存';
                    break;
                  case '02':
                    item.status = '已提交';
                    break;
                  case '03':
                    item.status = '已拒绝';
                    break;
                  case '04':
                    item.status = '已处理';
                    break;
                }
              })
              self.familyList = result.data.fList;
            }
            else {
              self.resultFamily = true;
            }
          }
          else {
            Tool.alert("信息获取失败");
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
  .clear {
    clear: both;
  }

  .wdsq-main {
    background: white;
  }

  .wdsq-main .mint-navbar {
    border-bottom: 1px solid #b8b8b8;
  }


  .wdsq-main .mint-tab-item-label {
    font-weight: bold;
    font-size: 16px;
  }

  .wdsq-main .noresult-wrap {
    margin: 0 auto;
    padding-top: 160px;
    width: 160px;
    height: 200px;
  }
  .wdsq-main .noresult-wrap .noresult-img {
    width: 100%;
  }

  .wdsq-base-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 20px;
    font-size: 15px;
    font-weight: bold;
  }

  .wdsq-base-title ul {
    width: 100%;
    margin: 0 auto;
    background: #f7fcff;
  }

  .wdsq-base-title ul li , .wdsq-base-content ul li {
    float: left;
    width: 19.5%;
    border-right: 1px solid #ebebeb;
    overflow: hidden;
    word-wrap:break-word;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    height: 40px;
    line-height: 40px;
  }

  .wdsq-base-title ul li:nth-child(5) ,.wdsq-base-content ul li:nth-child(5)  {
    border: none;
  }

  .wdsq-base-content {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    overflow-y: auto;
  }

  .wdsq-base-content ul {
    width: 100%;
    border-bottom: 1px solid #ebebeb;
  }

  .wdsq-base-content ul:nth-child(1) {
    border-top: 1px solid #ebebeb;
  }

  .wdsq-base-content ul:nth-child(odd) {
    background:#f7f7f7;
  }

  .wdsq-family-table {
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
    height: 50px;
    margin: 0 auto;
    background: #f7fcff;
    /*border-top: none;*/
  }

  .wdsq-family-table>div:nth-child(6) {
    border: none;
  }

  .wdsq-family-title {
    width: 100%;
    margin-top: 20px;
    font-weight: bold;
    font-size: 15px;
  }

  .wdsq-family-navigation {
    display: table;
    height: 50px;
    border-right: 1px solid #ebebeb;
    float: left;
    width: 16.5%;
  }

  .wdsq-family-navigation div {
    display: table-cell;
    vertical-align: middle;
  }

  .wdsq-family-navigation span {
    max-height: 60px;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .wdsq-family-content {
    overflow-y: auto;
    font-size: 14px;
  }

  .wdsq-family-content >div:nth-child(odd) {
    background: #f7f7f7;
  }

  .wdsq-family-content >div:nth-child(even) {
    background: white;
  }
</style>
