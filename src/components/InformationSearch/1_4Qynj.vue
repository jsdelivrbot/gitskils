<template>

	<div>
		<app-header title="企业年金"></app-header>
		<div class="qynj-main" v-bind:style="pageh" >
			<mt-header class='qynj-title' v-bind:title="year">
				<div v-if='shangYear' @click="preyear" class="qynj-privousyear" slot="left"><span class="fa fa-angle-left"></span>&nbsp;上年</div>
				<div v-if='lastYear' @click="nextyear" class="qynj-nextyear" slot="right">下年&nbsp;<span class="fa fa-angle-right"></span></div>
			</mt-header>
			<div class="qynj-content">
				<div class="qynj-item">
					<div class="qynj-item-title">当年缴费情况</div>
					<div class="qynj-item-body">
						<div class="qynj-item-bodytop">
							<div class="qynj-item-total">合计</div>
							<div class="qynj-item-money">{{list.yearTotal}}</div>
							<div class="qynj-item-unit">元</div>
						</div>
						<div class="qynj-item-bodybottom">
							<div class="qynj-item-bottom">
								<span>企业缴费</span>
								<span>{{list.corpPay}}  元</span>
							</div>
							<div class="qynj-item-center"></div>
							<div class="qynj-item-bottom">
								<span>个人缴费</span>
								<span>{{list.selfPay}}  元</span>
							</div>
						</div>
					</div>
				</div>
				<div class="qynj-item qynj-leiji">
					<div class="qynj-item-title ">累计存储金额</div>
					<div class="qynj-item-body">
						<div class="qynj-item-bodytop">
							<div class="qynj-item-total">合计</div>
							<div class="qynj-item-money">{{list.allPay}}</div>
							<div class="qynj-item-unit">元</div>
						</div>
						<div class="qynj-item-bodybottom">
							<div class="qynj-item-bottom">
								<span>企业缴费</span>
								<span>{{list.corpAllPay}}  元</span>
							</div>
							<div class="qynj-item-center"></div>
							<div class="qynj-item-bottom">
								<span>个人缴费</span>
								<span>{{list.selfAllPay}}  元</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="qynj-footer">
				<span class="fa fa-info-circle"></span>
				<span> 建立企业年金时间：{{createTime}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { httpGetMethod } from "../../utils/api.js"; //添加公共组件
	import { Lazyload } from 'mint-ui';
	import AppHeader from "@/components/HeaderComponent";
	import { State } from "../../utils/api.js";
	import { Headers } from 'mint-ui';
	export default {
		name: 'QynjComponent',
		data: function() {
			return {
				list:{},
				year: "",
        createTime:'',
				shangYear:(new Date().getFullYear() - 1)  > 2016 ? true : false,
				lastYear:true,
				/*获取当前年份*/
				pageh: {
					height: State().pageh
				}
			}
		},
		components: {
			AppHeader,
			Headers
		},
		methods: {

			cshs: function() { /*result接口返回的数据*/

				let self = this;
				httpGetMethod("/hrs-ess/app/getPension.action?", {
					year: self.year
				}, function(result) {
					self.createTime = result.data.createTime;
					self.list = result.data.data;
				})

			},

			preyear: function() {

				this.year--;
				this.year = String(this.year);
				this.cshs();
				if(this.year <= 2016){
					this.shangYear = false;
					this.lastYear = true;
				}
        else {
          this.determine();
        }

			},

			nextyear: function() {
				var currentyear = new Date().getFullYear();

					this.year++;
					this.year = String(this.year);
					this.cshs();
					if(this.year >= currentyear){
						this.lastYear = false;
						this.shangYear = true;
					}
					else {
            this.determine();
          }



			},
      determine: function () {
        this.lastYear = true;
        this.shangYear = true;
      }
		},
		mounted: function() {
			this.year = String(new Date().getFullYear() - 1) ;/*默认设为系统时间-1*/
			this.cshs();

		},

	}
</script>

<style type="text/css">
	.qynj-title {
		background: #3a71dc;
		font-size: 18px;
		font-weight: 500;
	}

	.qynj-title span {
		font-size: 18px;
		line-height: 10px;
	}

	.qynj-privousyear,
	.qynj-nextyear {
		font-size: 12px;
		align-items: center;/*设置或检索弹性盒子元素在侧轴（纵轴）方向上的对齐方式。*/
		display: flex;
	}

	.qynj-privousyear {
		justify-content: flex-start;/*弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴（纵轴）起始边界。*/
	}

	.qynj-nextyear {
		justify-content: flex-end;/*弹性盒子元素的侧轴（纵轴）结束位置的边界紧靠住该行的侧轴（纵轴）结束边界。*/
	}
	/*item style*/
	.qynj-content{
		padding: 20px;
	}
	.qynj-item{
		background: #fff;
		border-radius: 10px;
		margin-bottom: 20px;
		box-shadow: 0 0 4px #ccc;
	}
	.qynj-item-body{
		padding: 20px 0;
	}
	.qynj-item-title{
		background: #d8e3f8;
		color: #495b75;
		font-weight: bold;
		padding: 10px 0;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	    font-size: 14px;
	}
	.qynj-leiji .qynj-item-title{
		background: #f5efe4;
		color: #604124;
	}
	.qynj-item-bodytop{
		display: flex;
		justify-content: center;
		padding-bottom: 20px;
		/*margin-left: 24%;*/
	}
	.qynj-item-money{
		font-size: 22px;
	    font-weight: 400;
		margin: 0 10px;
		color: #4d555b;
	}
	.qynj-item-total{
		background: #4d555b;
		color: #bdc5cb;
		border-radius: 6px;
		padding: 0px 3px;
		font-size: 8px;
	}
	.qynj-leiji .qynj-item-total{
		background: #826552;
		color: #e0cdb8;
	}
	.qynj-item-bodybottom{
		display: flex;
		justify-content: center;
		flex-direction: row;
		height: 30px;
		align-items: center;
	}
	.qynj-item-bottom{
		display: inline-flex;
		flex-direction: column;
		color: #4d555b;
		font-size: 14px;
	}
	.qynj-leiji .qynj-item-bottom{
		color:#44260f ;
	}
	.qynj-item-center{
		width: 1px;
		height: 30px;
		background:#d5d9df ;
		margin: 0 40px;
	}
	.qynj-footer{
		width: 100%;
		position: absolute;
		bottom: 10px;
		left: 0;
	}
</style>
