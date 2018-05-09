<template>
  <div>
    <app-header :title="mainTitle"></app-header>
    <div class="tjzmsq-main" v-bind:style="pageh">
      <div v-if="!noresult">
        <h2>{{pagecon.title}}</h2>
        <div class="tjzmsq-con">
          <p v-html='pagecon'></p>
        </div>
        <div class="tjzmsq-button">
          <mt-button type="primary" size="normal" @click="submit">提  交</mt-button>
        </div>
      </div>
      <div class="noresult-wrap" v-else>
        <img class="noresult-img" src="../../../../static/jqqd.png">
      </div>
    </div>

  </div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
  import { State,modul,httpGetMethod } from "../../../utils/api.js";
  import { Tool } from "../../../utils/tool.js"; //添加公共组件
  export default {
    name: 'TjzmsqComponent',
    data: function() {
      return {
        pageh: {
          "min-height": State().wh - 84 + 'px'
        },
        title: "",
        pagecon: {},
        mainTitle:'证明预览',
        noresult:false
      }
    },
    components: {
      AppHeader
    },
    methods: {
      submit: function () {
        let self = this;
        Tool.alert('确定要提交吗？','',true,function () {
          httpGetMethod("hrs-ess/app/addIncomeSqInfo.action?", {
            applyId:'',
            attachCode: self.$route.params.attachCode,
            formType: self.$route.params.formType,
            isSubmit: 'Y',
            orgCode2: window.orgCode2
          }, function(result) {
            if(result.success) {
              Tool.alert("证明申请提交成功",'','',function () {
                self.$router.go(-1);
              })
            }
            else {
              Tool.alert("证明申请提交失败",'','',function () {
                self.$router.go(-1);
              })
            }
          });
        });

      }
    },
    mounted: function() {
      let self = this;
      httpGetMethod("hrs-ess/app/getIncomeSqInfo.action?", {
        attachCode: self.$route.params.attachCode
      }, function(result) {
        if(result.success) {
          self.pagecon = result.data;
        }
        else {
          self.mainTitle = '建设中';
          self.noresult = true;
        }
      });
    }
  }
</script>
<style type="text/css">
  .tjzmsq-main {
    background: #fff;
    padding: 20px 10px;
    text-align: left;
    min-height: 100%;
    overflow-x: hidden;
  }

  .tjzmsq-main h2 {
    width: 100%;
    text-align: center;
    line-height: 25px;
    border-bottom: 1px solid #a4a5a7;
    color: #3d74d9;
    font-size: 16px;
    font-weight: normal;
  }

  .tjzmsq-con {
    padding-top: 16px;
  }

  .tjzmsq-con p {
    text-indent: 26px;
    line-height: 22px;
    color: rgb(116, 116, 116);
    font-size: 14px;
  }

  .tjzmsq-con img {
    display: block;
    width: 100%;
    border: 0;
  }

  .tjzmsq-button {
    width: 40%;
    margin: 20px auto;
  }

  .tjzmsq-button button {
    width: 100%;
  }

  .tjzmsq-main .noresult-wrap {
    margin: 0 auto;
    padding-top: 160px;
    width: 230px;
    height: 240px;
  }
  .tjzmsq-main .noresult-wrap .noresult-img {
    width: 100%;
  }
</style>
