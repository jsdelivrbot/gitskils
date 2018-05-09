<template>

	<div>
    <app-header title="个人信息"></app-header>

		<div class="grxx-main">
			<div class="grxx-header">
				<div class="grxx-header-content">
					<div class="grxx-header-content-picture">
						<img v-if='imgurl' :src="imgurl">
						<span v-else class="fa fa-user"></span>
					</div>
					<div class="grxx-header-content-title">
						<p class="grxx-header-content-title-one">{{name}}</p>
						<p class="grxx-header-content-title-two">{{department}}</p>
					</div>
				</div>
			</div>

			<div class="nav">
				<div class="clickShow" :class="{slidedown:isClass}">全部分类</div>
				<ul class="nav-list" :class="{slidedown:isClass}">
					<li class="nav-list-two" :class="{slidedown:isClass,'grxx-checked':item.checked}" @click="checckeditem(item)" v-for="item in list">{{item.name}}</li>
				</ul>
				<div class="nav-click" @click="greet()" :class="{'nav-click-show':isClass}">
					<img src="../../../static/down.png" alt="" />
				</div>
			</div>

			<div class="prerow">
				<div class="row" v-for="item in contentList">
					<div class="row-left-one">{{item.item}}</div>
					<div class="row-left-two-data">{{item.value}}</div>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
  import AppHeader from "@/components/HeaderComponent";
	import { httpGetMethod } from "../../utils/api.js"; //添加公共组件
	import { Tool } from "../../utils/tool.js"; //添加公共组件
  import { modelStatisticalAnalysis } from "../../utils/base.js"; //模块统计分析

	export default {
		name: 'GrxxComponent',
		data: function() {
			return {
				isClass: false,
				imgurl: '',
				name: '',
				department: '',
				list: [{
						name: '基本信息',
						type: '01',
						checked: true
					},
					{
						name: '工作信息',
						type: '02',
						checked: false
					},
					{
						name: '资格能力',
						type: '03',
						checked: false
					},
					{
						name: '通讯信息',
						type: '04',
						checked: false
					}, {
						name: '个人简历',
						type: '51',
						checked: false
					},
					{
						name: '培训经历',
						type: '52',
						checked: false
					},
					{
						name: '劳动合同',
						type: '53',
						checked: false
					},
					{
						name: '家庭成员及社会关系',
						type: '54',
						checked: false
					}
				],
				contentList: []
			}
		},
		components: {
      AppHeader
		},
		methods: {
			greet: function() {
				this.isClass = !this.isClass;
			},
			checckeditem: function(item) {

				let self = this;
				this.list.forEach(function(opt) {
					opt.checked = false;
				});

				item.checked = true;
				if(item.type == "51" || item.type == "52" || item.type == "53" || item.type == "54") {
					this.getDataTwo(item.type);
				} else {
					this.getData(item.type);
				}

			},
			getHeadImage() {
				let self = this;
				httpGetMethod("hrs-ess/img/getImage.action?", {}, function(result) {

					self.imgurl = result.data;

				});
			},
			getData(type) {
				let self = this;
				httpGetMethod('hrs-ess/emp/getEmpInfo.jsonws?', {
					type: type
				}, function(result) {
					console.log(result)
					if(type == '01') {
						let array = [];
						result.data.forEach(function(opt) {
							if(opt.key == 'empName') {
								self.name = opt.value;
							} else if(opt.key == 'orgName') {
								self.department = opt.value;
							} else {
								array.push(opt);
							}
						});

						self.contentList = array;
					} else {
						self.contentList = result.data;
					}
				});
			},
			getDataTwo(type) {
				let self = this;

				httpGetMethod("hrs-ess/emp/getEmpInfoList.jsonws?", {
					type: type,
					pageIndex: 1,
					pageSize: 10000
				}, function(result) {
					console.log(result)
					if(!result.success) {
						self.contentList = [];
						Tool.tip(result.msg || "服务区错误！");
						return;
					}
					let array = [{
						item: result.data.rows[0][1]["item"],
						value: result.data.rows[0][2]["item"]
					}];
					result.data.rows.forEach(function(opts) {
						let obj = {
							item: opts[1]['value'],
							value: opts[2]['value']
						}
						array.push(obj);
					});
					self.contentList = array;

				});
			}

		},
		mounted: function() {
      if (window.sessionStorage.getItem("PersonInfoStatisticalAnalysis") == null || window.sessionStorage.getItem("PersonInfoStatisticalAnalysis") == false) {
        //个人息模块统计接口
        modelStatisticalAnalysis("001", "个人信息", "PersonInfoStatisticalAnalysis");
      }
			this.getHeadImage();
			this.getData('01');
		},

	}
</script>

<style type="text/css">
	.grxx-main {
		font-family: "微软雅黑";
	}

	.grxx-header {
		height: 100px;
		background-color: #3a71dc !important;
		overflow: hidden;
		padding: 10px;
		box-sizing: border-box;
	}

	.grxx-header-content {
		height: 100%;
		background: #ffffff;
		overflow: hidden;
		border-radius: 5px;
		padding: 5px 10px;
		box-sizing: border-box;
	}

	.grxx-header-content-picture {
		width: 50px;
		height: 70px;
		float: left;
		background: #EBEBEB;
		border-radius: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.grxx-header-content-picture span {
		color: #cacbd1;
		font-size: 18px;
	}

	.grxx-header-content-picture img {
    width: 50px;
    height: 70px;
	}

	.grxx-header-content-title {
		float: left;
		text-align: left;
		padding: 10px 20px;
	}

	.grxx-header-content-title-one {
		margin-left: 0;
		font-size: 18px;
		color: #000;
	}

	.grxx-header-content-title-two {
		margin-top: 5px;
		font-size: 14px;
		color: #646464;
	}

	.nav {
		background: #f5f5f5;
		border-bottom: 1px solid #e4e4e4;
		position: relative;
	}

	.clickShow {
		display: none;
		height: 44px;
		line-height: 44px;
		padding-left: 10px;
		box-sizing: border-box;
		font-size: 16px;
		text-align: left;
	}

	.clickShow.slidedown {
		display: block;
	}

	.nav-click {
		position: absolute;
		height: 50px;
		width: 50px;
		top: 0;
		right: 0;
		border-left: 1px solid #e4e4e4;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-click img {
		width: 29px;
		height: 29px;
		transform: rotate(0deg);
		transition: transform 1s;
		-webkit-transition: transform 1s;
	}

	.nav-click-show {
		border-left: none;
	}

	.nav-click-show img {
		transform: rotate(180deg);
		transition: transform 1s;
		-webkit-transition: transform 1s;
	}

	.nav-list {
		display: -webkit-box;
		overflow-x: auto;
		margin-right: 50px;
		padding: 10px 0;
	}

	@-webkit-keyframes 'round' {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(180deg);
		}
	}

	.nav-list::-webkit-scrollbar {
		display: none;
	}

	.nav-list.slidedown {
		display: block;
		padding: 0px;
		padding-bottom: 5px;
		width: 100%;
		box-sizing: border-box;
		border-top: 1px solid #e4e4e4;
		text-align: left;
		padding-left: 10px;
		padding-right: 5px;
	}

	li.nav-list-two {
		margin-left: 5px;
		padding-left: 8px;
		padding-right: 8px;
		font-size: 14px;
		line-height: 28px;
		color: #646464;
		background: #ffffff;
		list-style: none;
		border: 1px solid #e4e4e4;
		border-radius: 20px;
	}

	.nav-list-two.slidedown {
		display: inline-block;
		margin-top: 5px;
		margin-left: 0;
		margin-right: 5px;
	}
	.grxx-main .row {
		margin: 0;
		padding: 0;
		font-size: 14px;
		background: #ffffff;
		border-bottom: 1px solid #e8edfd;
		overflow: hidden;
	}

	.row-left-one {
		background: #f7f9fe;
		width: 120px;
		border-right: 1px solid #d3dcfc;
		float: left;
		padding: 12px 5px;
	}

	.row-left-two-data {
		float: left;
    	padding: 12px 0 12px 20px;
	}

	li.grxx-checked {
		background: #3a71dc;
		color: #ffffff;
	}

	.secondImg {
		position: absolute;
		width: 30px;
		height: 30px;
		left: 10px;
		top: 10px;
	}
</style>
