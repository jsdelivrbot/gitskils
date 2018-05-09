<template>

	<div>

		<app-header title="查询结果"></app-header>

		<div class="cxjg-main" :style="pageh">
      <div class="cxjg-item" v-if="!noresult" :style="pagesh">
        <div class="cxjg-list" v-for="item in list">
          <div class="mint-cell" @click="viewDetail(item.serviceApplyCode)">
            <span class="mint-cell-mask"></span>
            <div class="mint-cell-left"></div>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title">
                <span class="mint-cell-label cxjg-des">服务描述: {{item.serviceApplyDes}}</span>
                <span class="mint-cell-label">服务单号:  <span class="cxjg-num">{{item.serviceApplyCode}}</span></span>
                <span class="mint-cell-label">提报时间:  {{item.submitTime | formatDate}}</span>
                <span class="mint-cell-label">单据状态:  {{item.serviceStatusDes}}</span>
              </div>
              <div class="mint-cell-value is-link"><span class=""></span></div>
            </div>
            <div class="mint-cell-right"></div> <i class="mint-cell-allow-right"></i>
          </div>
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
	import { State,httpGetMethod,httpWebservice } from "../../../utils/api.js";
  import { Tool } from "../../../utils/tool.js"; //添加公共组件

	export default {
		name: 'CxjgComponent',
		data: function() {
			return {
				pageh: {
					height: State().pageh
				},
        pagesh: {
          "min-height": State().pageh
        },
        list:[],
        noresult: false,
			}
		},
		components: {
			AppHeader
		},
		methods: {
      getdata: function () {
        let self = this;
        httpWebservice("queryServiceList",{
          arg5:JSON.stringify({
            arg0:self.orderNo,
            arg1:self.shortdescription,
            arg2:self.startDate,
            arg3:self.endDate,
            arg4:window.Identity_Token
          })

        },false,function(result){
          if(result.message.length) {
            console.log(result)
            result.message.forEach(function (item) {
              item.serviceApplyDes = decodeURIComponent(item.serviceApplyDes);
            })
            self.list = result.message;
          }
          else {
            self.noresult = true;
          }
        })
      },

      viewDetail: function (id) {
        window.location.href = "#/fwxq/" + id;
      }
    },
    mounted: function () {
      this.orderNo = this.$route.params.orderNo;
      this.shortdescription = this.$route.params.shortdescription;
      this.startDate = this.$route.params.startDate;
      this.endDate = this.$route.params.endDate;
      this.pageh.height = this.$route.params.pagehight;
      let self = this;
      if(this.orderNo == ' ') {
        this.orderNo ='';
      }
      if(this.shortdescription == ' ') {
        this.shortdescription ='';
      }
      this.getdata();

    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return Tool.formate(date, 'yyyy年MM月dd日')
      }
    },
	}
</script>
<style type="text/css">

  .mint-loadmore-bottom {
    display: none;
  }

	.cxjg-main {
    /*overflow-y: auto;*/
		text-align: left;
    background: #f5f5f5;
	}

	.cxjg-main .mint-cell-wrapper {
		padding: 10px;
		background-size: 0px;
	}
  .cxjg-main .noresult-wrap {
    margin: 0 auto;
    padding-top: 160px;
    width: 160px;
    height: 200px;
  }
  .cxjg-main .noresult-wrap .noresult-img {
    width: 100%;
  }

  .cxjg-main .cxjg-num {
    color: #4594ed;
  }

  .cxjg-main .cxjg-des {
    color: black;
    font-weight: bold;
  }

  .cxjg-main .cxjg-item .mint-cell-label {
    margin-top: 8px;
  }

  .cxjg-main .cxjg-list {
    margin-top: 8px;
  }

  .cxjg-main .cxjg-item {
    overflow-y: auto;
  }
</style>
