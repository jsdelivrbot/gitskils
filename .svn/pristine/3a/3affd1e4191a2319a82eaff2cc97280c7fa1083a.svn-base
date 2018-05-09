<template>
	<div>
		<app-header title="政策指南"></app-header>

		<div class="zczn-main" :style="pageh">

			<div class="zczn-con">
				<div class="zczn-list">
					<router-link :to="item.url" v-for="item in lists" :key="item.name">
						<img :src='item.src' :alt="item.name">
						<span v-text="item.name"></span>
					</router-link>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import AppHeader from "@/components/HeaderComponent";
	import { State } from "../../../utils/api.js";
  import { modelStatisticalAnalysis } from "../../../utils/base.js"; //模块统计分析
	export default {
		name: 'ZcznComponent',
		data: function() {
			return {
				pageh: {
					height: State().pageh
				},
				lists: [{
						"name": "养老保险",
						"url": "/ylbx/01",
						"src": "../static/zhengcezhinan/1_yanglao.png"
					},
					{
						"name": "医疗保险",
						"url": "/ylbx/02",
						"src": "../static/zhengcezhinan/2_yiliao.png"
					},
					{
						"name": "工伤保险",
						"url": "/ylbx/03",
						"src": "../static/zhengcezhinan/3_gongshang.png"
					},
					{
						"name": "生育保险",
						"url": "/ylbx/04",
						"src": "../static/zhengcezhinan/4_shengyu.png"
					},
					{
						"name": "失业保险",
						"url": "/ylbx/05",
						"src": "../static/zhengcezhinan/5_shiye.png"
					},
					{
						"name": "公积金/年金",
						"url": "/ylbx/06",
						"src": "../static/zhengcezhinan/6_gongjijin.png"
					},
					{
						"name": "内退及其他",
						"url": "/ylbx/07",
						"src": "../static/zhengcezhinan/7_neitui.png"
					},
					{
						"name": "职业通道",
						"url": "/ylbx/08",
						"src": "../static/zhengcezhinan/8_zhiye.png"
					},
					{
						"name": "考勤管理",
						"url": "/ylbx/09",
						"src": "../static/zhengcezhinan/9_kaoqin.png"
					},
					{
						"name": "差旅报销",
						"url": "/ylbx/10",
						"src": "../static/zhengcezhinan/10_chailv.png"
					}
				]
			}
		},
		components: {
			AppHeader
		},
    mounted:function () {
      // 政策指南模块统计接口
      if (window.sessionStorage.getItem("ZhengCeZhiNanStatisticalAnalysis") == null || window.sessionStorage.getItem("ZhengCeZhiNanStatisticalAnalysis") == false) {
        modelStatisticalAnalysis("012", "政策指南", "ZhengCeZhiNanStatisticalAnalysis");
      }
    },
		methods: {

		},
	}
</script>
<style type="text/css">
	.zczn-main {
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

	.zczn-main a {
		float: left;
		width: 33%;
/*		margin-left: 4%;
*/		margin-top: 15px;
		overflow: hidden;
		color: #333;
		text-align: center;
		text-decoration: none;
	}

	.zczn-main a img {
		width: 45%;
		display: block;
		margin: auto;
		margin-bottom: 4px;
	}

	.zczn-main a span {
		display: inline-block;
		font-size: 14px;
	}

	.zczn-list {
		padding-bottom: 20px;
		overflow: hidden;
	}
</style>
