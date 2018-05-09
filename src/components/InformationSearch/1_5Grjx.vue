<template>

	<div>
		<app-header title="个人绩效"></app-header>

		<div class="grjx-main"　:style="pageh">
			<mt-loadmore v-if="!noresult" :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :top-distance='10' bottom-pull-text="上拉加载更多" bottom-drop-text="释放加载" :style="pagesh">
				<ul>

					<li class="grjx-item" v-for='item in list'>
						<h4>{{item.strBeginDate}} - {{item.strEndDate}}</h4>
						<div class="grjx-body">
							<div class="grjx-left">
								<span>{{item.yearText}}</span>
								<span>考核结果</span>
							</div>
							<div class="grjx-right">
								<strong>{{item.chkLevel2}}</strong>
							</div>
						</div>
					</li>

				</ul>
				<div style="height: 32px;line-height: 32px;" v-if='list.length>10 && allLoaded'>已加载到底部</div>
			</mt-loadmore>
			<div class="noresult-wrap" v-else>
				<img class="noresult-img" src="../../../static/noresult.png">
			</div>
		</div>
	</div>
</template>

<script>
	import AppHeader from "@/components/HeaderComponent";
	import { Loadmore } from 'mint-ui';
	import { Tool } from "../../utils/tool.js"; //添加公共组件
	import { State,httpGetMethod} from "../../utils/api.js";
	export default {
		name: 'GrjxComponent',
		data: function() {
			return {
				list: [],
				RowNum: 0,
				PageSize: 20,
				noresult: false,
				allLoaded:false,//是否已全部加载
				pageh: {
          height: State().wh - 44 + "px"
        },
        pagesh: {
          "min-height": State().wh - 44 + "px"
        },
      }
		},
		components: {
			AppHeader,
			Loadmore
		},
		methods: {
			getdata: function(fun, isshowload){
				let self = this;
				/*let result = {"success":true,"msg":"4","data":[{"strBeginDate":"2016-01-01","strEndDate":"2016-12-31","checkType":"定期考核(年度)","score":"98","chkLevel2":"A"},{"strBeginDate":"2017-01-01","strEndDate":"2017-12-31","checkType":"定期考核(年度)","score":"98","chkLevel2":"B"}]};
				if(!result.data || !result.data.length) {
					if(!self.RowNum) self.noresult = true;
					return;
				}
				if(self.noresult) {
					self.noresult = false;
				}
				result.data.forEach(function(item) {
					item.yearText = Tool.formate(new Date(item.strBeginDate),"yyyy");
				});

				self.list = result.data;
				if(self.list.length < self.PageSize) {
					self.allLoaded = true;
				}*/
				httpGetMethod("hrs-ess/app/queryCheck.action?", {
					RowNum: self.RowNum,
					PageSize: self.PageSize
				}, function(result) {
					if(!result.data || !result.data.length) {
						if(!self.RowNum) self.noresult = true;
						return;
					}
					if(self.noresult) {
						self.noresult = false;
					}
					self.allLoaded = false;
					result.data.forEach(function(item) {
						item.yearText = Tool.formate(new Date(item.strBeginDate),"yyyy");
					});
					if(result.data.length < self.PageSize) {
						self.allLoaded = true;
					}
					self.list = self.list.concat(result.data);
					if(fun) {
		            	fun(result.data);
		          	}
				}, function() {}, isshowload)
			},
			loadTop: function() {
				let self = this;
		        self.RowNum = 0;
		        self.list = [];
		        self.getdata(function() {
		          	self.$refs.loadmore.onTopLoaded();
		        }, true);
			},
			loadBottom: function() {
				let self = this;
        		self.RowNum++;
        		self.getdata(function() {
		          	self.$refs.loadmore.onBottomLoaded();
		        }, true);
			},
		},
		mounted: function() {
			this.getdata();
		}
	}
</script>

<style type="text/css">
	.grjx-main ul{
		padding: 10px 0 0;
	}
	.grjx-main {
		background: #f5f5f5;
		width: 100%;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		font-size: 12px;
	}
	.grjx-item {
		width: 90%;
		margin: 0 auto 10px;
		background: #fff;
		border-radius: 10px;
		text-align: left;
		box-shadow: 0px 0px 5px 0px #ccc;
	}
	.grjx-item h4 {
		padding: 10px 20px;
		background: #f1f6fe;
		color: #505050;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
	.grjx-body {
		background: #fff url(../../../static/grjx.png) no-repeat center;
		background-size: cover;
		padding: 10px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}
	.grjx-left {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #3a71dc;
	}
	.grjx-left span:first-of-type {
		background: #f1f6fe;
		display: block;
		border-radius: 10px;
		padding: 3px 5px;
	}
	.grjx-right {
		width: 100px;
		font-size: 30px;
		margin-left: 10px;
		color: #3a71dc;
	}
	.grjx-main .noresult-wrap {
		margin: 0 auto;
		padding-top: 160px;
		width: 160px;
		height: 200px;
	}
	.grjx-main .noresult-wrap .noresult-img {
		width: 100%;
	}
</style>
