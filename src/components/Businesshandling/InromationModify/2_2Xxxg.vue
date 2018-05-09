<template>
  <div>
    <app-header title="个人信息修改">
      <span slot="right" style="font-size: 15px" @click="apply">我的申请</span>
    </app-header>

    <div class="xxxg-main" :style="pageh">
      <div class="zczn-con">
        <div class="xxxg-list" v-for="item in lists">
            <img :src='item.src' :alt="item.name" @click="skip(item)">
            <span v-text="item.name"></span>
        </div>
      </div>

    </div>
    <mt-popup v-model="popupVisible" class="xxxg-popup">
      <div><span>!</span>已有一条数据正在处理中，请耐心等待处理完成</div>
    </mt-popup>
  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { httpGetMethod,State } from "../../../utils/api.js"; //添加公共组件
  import { Tool } from "../../../utils/tool.js"; //添加公共组件
  export default {
    name: 'XComponent',
    data: function() {
      return {
        pageh: {
          height: State().pageh
        },
        status:1,
        popupVisible:false,
        lists: [
          {
          "name": "姓名",
          "url": "/xxxg/0100",
          "src": "../static/name.png",
            "sign":"0100"
          },
          {
            "name": "身份证",
            "url": "/xxxg/0200",
            "src": "../static/ID.png",
            "sign":"0200"
          },
//          {
//            "name": "学历新增",
//            "url": "/xxxg/0301",
//            "src": "../static/xlxz.png",
//            "sign":"0301",
//          },
          {
            "name": "学历修改",
            "url": "/xxxg/0300",
            "src": "../static/xlxg.png",
            "sign":"0300",
          },
          {
            "name": "家庭成员关系",
            "url": "/jtcyxg",
            "src": "../static/jtcygx.png"
          }
        ]
      }
    },
    components: {
      AppHeader
    },
    methods: {
      apply: function () {
        window.location.href = '#/wdsq';
      },
      skip: function (value) {
        if(value.name!='家庭成员关系') {
          let self = this;
          httpGetMethod("hrs-ess/app/getSqEmpRelationList.action?",{
          },function(result){
            if(result.success) {
              //基本信息申请
              result.data.eList.forEach(function (item) {
                if(item.status=='02'&&item.fieldTag==value.sign) {
                  self.status = 0;
                }
              })
              if(self.status) {
                window.location.href = '#' + value.url;
              }
              else {
                self.popupVisible = true;
                self.status = 1;
              }
            }
            else {
              Tool.alert("信息获取失败");
            }
          });
        }
        else {
          window.location.href = '#' + value.url;
        }

      }
    },
    mounted: function () {

    }
  }
</script>
<style type="text/css">
  .xxxg-main {
    overflow-y: auto;
    background-color: #fff;
  }

  .zczn-con {
    margin-top: 10px;
    /*
          background: #fff;
          margin: 80px 30px;
          overflow: hidden;
          border-radius: 6px;
          box-shadow: 0px 0px 2px 0px #d8d8d8;*/
  }

  .zczn-title {
    width: 100%;
    height: 100px;
    background: url(~/static/zhengcezhinan/zczn_title.png) no-repeat center;
    background-size: cover;
  }

  .xxxg-list {
    float: left;
    width: 33%;
    margin-top: 15px;
    overflow: hidden;
    color: #333;
    text-align: center;
    text-decoration: none;
    height: 82px;
  }

  .xxxg-list img {
    width: 45%;
    display: block;
    margin: auto;
    margin-bottom: 4px;
  }

  .xxxg-list span {
    display: inline-block;
    font-size: 14px;
  }

  .xxxg-list {
    padding-bottom: 20px;
    overflow: hidden;
  }

  .xxxg-popup {
    width: 70%;
    height: 80px;
    background: white;
    text-align: left;
    font-size: 12px;
    line-height: 100px;
    border-radius: 5px;
  }

  .xxxg-popup span {
    display: inline-block;
    width: 20px;
    height: 20px;
    color: #ef534d;
    background: white;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    border: 1px solid #ef534d;
    margin-right: 5px;
  }

  .xxxg-popup div {
    width: 80%;
    margin: auto;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
  }
</style>
