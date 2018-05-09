<template>

  <div>
    <app-header title="家庭成员修改"></app-header>
    <div class="jtcybj-main">
      <!--原数据-->
      <div v-if="type==1">
        <div class="jtcybj-bxxq">
          <span>原数据</span>
        </div>

        <mt-field :label="item.title" :placeholder="item.placeholder" disabled readonly v-for="(item,index) in originalData" :key="index"></mt-field>

      </div>

      <!--新数据-->
      <div v-if="type==1||type==2">
        <div class="jtcybj-bxxq" v-if="type==1">
          <span>新数据</span>
        </div>
        <div class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">关系：</span>
            </div>
            <div class="jtcybj-input-top" @click="choiceRelation(1)">
              <input placeholder="暂无" type="text" class="mint-field-core" readonly="readonly" v-model="relation">
            </div>
            <div class="jtcybj-input-down" @click="choiceRelation(1)">
              <span class="fa fa-angle-down fa-lg"></span>
            </div>
          </div>
        </div>

        <div class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">姓名：</span>
            </div>
            <div class="jtcybj-input">
              <input placeholder="请填写姓名" type="text" class="mint-field-core" v-model="relationName">
            </div>
          </div>
        </div>

        <div class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">性别：</span>
            </div>
            <div class="jtcybj-input-top" @click="choiceRelation(2)">
              <input placeholder="暂无" type="text" class="mint-field-core" readonly="readonly" v-model="sex">
            </div>
            <div class="jtcybj-input-down" @click="choiceRelation(2)">
              <span class="fa fa-angle-down fa-lg"></span>
            </div>
          </div>
        </div>

        <div class="jtcybj-item" @click="timeOpen">
          <mt-field readonly disabled label="生日：" placeholder="请选择时间" :value="pickerTime | formatDate">
            <span class="jtcybj-date"></span>
          </mt-field>
        </div>

        <div class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">工作单位：</span>
            </div>
            <div class="jtcybj-input">
              <input placeholder="请填写工作单位" type="text" class="mint-field-core" v-model="orgDuty">
            </div>
          </div>
        </div>

        <div class="mint-cell mint-field">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">备注：</span>
            </div>
            <div class="jtcybj-input">
              <input placeholder="请填写备注" type="text" class="mint-field-core" v-model="essDesc">
            </div>
          </div>
        </div>



        <div class="jtcybj-submit">
          <mt-button class="button" type="primary" size="large" @click="submit">提  交</mt-button>
        </div>
      </div>

      <!--选择关系-->
      <mt-popup v-model="RelationVisible" position="bottom" class="xitong-wrapper">
        <div>
          <mt-picker :slots="slots" @change="onValuesChangeType"></mt-picker>
        </div>
        <div>
          <mt-button type="default" @click="cancelRelation">取消</mt-button>
          <mt-button type="primary" @click="enSureRelation">确定</mt-button>
        </div>
      </mt-popup>

      <mt-datetime-picker ref="pickerTime" type="date" :startDate="startTime" :endDate="endTime" v-model="pickerTime" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
      </mt-datetime-picker>
    </div>

  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { httpGetMethod,State } from "../../../utils/api.js"; //添加公共组件
  import { Tool } from "../../../utils/tool.js"; //添加公共组件
  export default {
    name: 'JqqdComponent',
    data: function() {
      return {
        pageh: {
          height:State().pageh
        },
        RelationVisible:false,
        type:this.$route.params.type,
        sex:'男',
        relation:'',
        selectValue:'',
        dictionary:[],
        itemCode:'',       //成员关系字典编号
        relationName:'',   //姓名
        orgDuty:'',     //工作单位
        essDesc:'',    //备注
        sexCode:'',    //性别编码,
        startTime: new Date("1960-01-01"),
        endTime: new Date(),
        pickerTime: new Date("1998-01-01"),   //生日
        originalData :[
          {
            title:'关系：',
            placeholder:this.$route.params.relation
          },
          {
            title:'姓名：',
            placeholder:this.$route.params.relationName
          },
          {
            title:'性别：',
            placeholder:this.$route.params.sexCode
          },
          {
            title:'工作单位：',
            placeholder:this.$route.params.orgDuty
          }
        ],
        sexData:[
          {
            id:0,
            name:'女'
          },
          {
            id:1,
            name:'男'
          }
        ],
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'left'
          }
        ],
      }
    },
    components: {
      AppHeader
    },
    methods: {
      //选择关系
      choiceRelation: function (sign) {
        this.RelationVisible = true;
        this.sign = sign;
        let self = this;
        if(sign==1) {
          this.dictionary.forEach(function (item) {
            self.slots[0].values.push(item.itemName);
          })
        }
        else {
          this.slots[0].values = ['男','女']
        }
      },
      cancelRelation: function () {
        this.RelationVisible = false;
      },
      enSureRelation:function () {
        if(this.sign==1) {
          this.relation= this.selectValue;
        }
        else {
          this.sex= this.selectValue;
        }
        this.RelationVisible = false;
      },
      onValuesChangeType: function (picker,values) {
        this.selectValue = values[0];
      },

      timeOpen: function () {
        this.$refs.pickerTime.open();
      },

      //获取关系下拉框
      getRelationData: function () {
        let self = this;
        httpGetMethod("hrs-ess/app/getDictItemInfo.action?",{
          dictCode:'00191'
        },function(result){
          if(result.success) {
            self.relation = result.data[0].itemName;
            result.data.forEach(function (item) {
              self.dictionary.push({
                itemCode:item.itemCode,
                itemName:item.itemName
              });
            })
          }
          else {
            Tool.alert("关系获取失败");
          }
        });
      },

      submit: function () {
        let self = this;

//        表单验证
        if(!self.relationName) {
          Tool.alert("姓名不能为空");
          return;
        }
        if(!self.orgDuty) {
          Tool.alert("工作单位不能为空");
          return;
        }

        //获取关系和性别数据
        self.dictionary.forEach(function (item) {
          if(item.itemName == self.relation) {
            self.itemCode = item.itemCode;
          }
        });
        self.sexData.forEach(function (item) {
          if(item.name == self.sex) {
            self.sexCode = item.id;
          }
        });

        //家庭成员修改申请提交
        if(self.type==1) {
          httpGetMethod("hrs-ess/app/updateSqEmpRelationInfo.action?",{
            relationCode:'',
            oldCode: self.$route.params.relationCode,
            orgCode: window.orgCode,
            itemCode: self.itemCode,
            relation: self.relation,
            relationName: self.relationName,
            birthday: self.formatDate(self.pickerTime),
            sexCode: self.sexCode,
            orgDuty: self.orgDuty,
            essDesc: self.essDesc,
            status: '02'
          },function(result){
            if(result.success) {
              Tool.alert("家庭成员修改申请提交成功",'','',function () {
                self.$router.go(-1);
              });
            }
            else {
              Tool.alert('家庭成员修改申请提交失败','','',function () {
                self.$router.go(-1);
              });
            }
          });
        }

        //新增家庭成员申请提交
        else {
          httpGetMethod("hrs-ess/app/addEmpRelationInfo.action?",{
            orgCode: window.orgCode,
            itemCode: self.itemCode,
            relation: self.relation,
            relationName: self.relationName,
            birthday: self.formatDate(self.pickerTime),
            sexCode: self.sexCode,
            orgDuty: self.orgDuty,
            essDesc: self.essDesc,
            status: '02'
          },function(result){
            if(result.success) {
              Tool.alert("新增家庭成员申请提交成功",'','',function () {
                self.$router.go(-1);
              });
            }
            else {
              Tool.alert('新增家庭成员申请提交失败','','',function () {
                self.$router.go(-1);
              });
            }
          });
        }

      },
      formatDate(time) {
        let date = new Date(time);
        return Tool.formate(date, 'yyyyMMdd')
      }
    },
    mounted: function() {
      this.getRelationData();
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return Tool.formate(date, 'yyyy年MM月dd日')
      }
    }
  }
</script>
<style type="text/css">
  .jtcybj-main {
    text-align: left;
  }
  .jtcybj-bxxq {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
  }

  .jtcybj-bxxq span{
    margin-left: 10px;
    color: #2982d5;
  }

  input[disabled] {
    background: white;
  }

  .jtcybj-input {
    width: 100%;
  }

  .jtcybj-input-top {
    width: 80%;
  }

  .jtcybj-input-down {
    width: 20%;
    text-align: right;
  }

  .jtcybj-submit {
    width: 90%;
    margin: 20px auto;
  }

  .xitong-wrapper{
    height: auto;
    width: 100%;
    background: #fff;
  }
  .xitong-wrapper .picker-slot.picker-slot-left {
    text-align: center;
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

  .jtcybj-item .mint-cell-wrapper {
    background-size: 0;
    text-align: left;
  }

  .jtcybj-date{
    background: url(../../../../static/time.png) no-repeat center;
    background-size: contain;
    display: block;
    width: 20px;
    height: 20px;
  }

</style>
