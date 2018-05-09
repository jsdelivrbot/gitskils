<template>

	<div>

		<app-header title="服务详情"></app-header>

		<div class="fwxq-main" :style="pageh">
      <!--服务基本信息-->
      <div class="fwxq-common fwxq-title">
        <span>{{submitTime}}</span>
      </div>
      <div class="fwxq-common fwxq-description">
        <div v-for="(item,index) in mainList">
          <span>{{item.name}}</span>
          <span>{{item.content}}</span>
        </div>
      </div>
      <!--信息-->
      <div v-for="(item,index) in infoList" class="fwxq-main-list">
        <!--title-->
        <div class="fwxq-list" @click="expend(item)" :class="{fwxqActive:!item.expend}" v-if="!item.show">
          <span>{{item.title}}</span>
          <span class="fa fa-angle-right fa-lg" v-if="item.expend"></span>
          <span class="fa fa-angle-down fa-lg" v-else></span>
        </div>
        <!--详情-->
        <div class="fwxq-common" v-if="!item.expend&&item.type==1">
          <div>
            <div class="fwxq-baseList" v-for="(it,index) in item.information">
              <span>{{it.title}}</span>
              <span>{{it.des}}</span>
            </div>
          </div>
        </div>
        <div class="fwxq-common fwxq-processLog" v-if="!item.expend&&item.type==3||item.type==4&&!item.expend">
          <div v-for="(it,index) in item.information" v-if="item.type==3" :data-index="index">
            <div class="fwxq-baseList">
              <span>步骤：</span>
              <span>{{it.tDID}}</span>
            </div>
            <div class="fwxq-baseList">
              <span>回复内容：</span>
              <span>{{it.tDLINE}}</span>
            </div>
            <div class="fwxq-baseList">
              <span>处理人：</span>
              <span>{{it.hANDLER}}</span>
            </div>
            <div class="fwxq-baseList">
              <span>处理时间：</span>
              <span>{{it.hANDLE_DATE}}   {{it.hANDLE_TIME}}</span>
            </div>
            <div class="fwxq-processLog-line" v-show="item.information.length>1">__________</div>
          </div>
          <div v-for="(it,index) in item.information" v-if="item.type==4">
            <div class="fwxq-baseList">
              <span>文件分类：</span>
              <span>服务申请相关说明</span>
            </div>
            <div class="fwxq-baseList fwxq-img">
              <span>文件查看：</span>
              <span>
                <img @click="open(it.url)" :src="it.url">
              </span>
            </div>
            <div class="fwxq-baseList">
              <span>上传人：</span>
              <span>{{it.submitPersion}}</span>
            </div>
            <div class="fwxq-baseList">
              <span>上传人单位：</span>
              <span>{{it.submitPersionCompanyDes}}</span>
            </div>
            <div class="fwxq-baseList">
              <span>上传时间：</span>
              <span>{{it.createTime}}</span>
            </div>
            <div class="fwxq-baseList">
              <span>来源：</span>
              <span>{{it.docSource}}</span>
            </div>
            <div class="fwxq-processLog-line" v-show="item.information.length>1">__________</div>
          </div>
        </div>
        <div class="fwxq-common fwxq-stepList" v-if="!item.expend&&item.type==2">
          <div class="fwxq-time-sort" @click="sortTime(item.information)">
            <span>切换时间排序</span>
          </div>

          <div class="fwxq-step" v-for="(it,index) in item.information" :class="{firstLine:index==0,tooLong:it.child}">
            <div class="fwxq-time" :class="{firstLine:index==0}">
              <span class="fwxq-step-time">{{it.time}}</span>
              <span class="fwxq-step-MM">{{it.MM}}</span>
            </div>
            <div class="fwxq-step-line">
              <span :class="{bigCircle:it.approvalInfos}"></span>
              <span :class="{'stepLastLine':index==item.information.length-1}"></span>
              <span class="fa fa-angle-right fa-lg" v-show="it.approvalInfos&&it.show"></span>
              <span class="fa fa-angle-down fa-lg" v-show="it.approvalInfos&&!it.show" :class="{downCircle:!it.show}"></span>
            </div>
            <div>
              <div class="fwxq-text">
                <span>
                  {{it.handlePersion}}{{it.serviceStatusDes}}
                  <span @click="completeShow(it,index)" class="fwxq-text-orderNo" v-if="it.approvalInfos">{{it.billDbid}}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade" class="showImg">
        <img :src="imgSrc" alt="" @click="cancelShowImg">
      </mt-popup>

    </div>

	</div>
</template>

<script>
	import AppHeader from "@/components/HeaderComponent";

  import { httpWebservice,State } from "../../../utils/api.js"; //添加公共组件
  import { Tool } from "../../../utils/tool.js";

	export default {
		name: 'FwxqComponent',
		data: function() {
			return {
				pageh: {
					height: State().pageh
				},
        haha:[],
        orderNo:this.$route.params.orderNo,
        submitTime:'',
        popupVisible:false,
        imgSrc:'',
        mainList:[
          {
            name:'服务描述:',
            content:''
          },
          {
            name:'服务单号：',
            content:''
          },
          {
            name:'提报时间:',
            content:''
          },
          {
            name:'单据状态:',
            content:''
          },
        ],
        infoList:[
          {
            title:'基本信息',
            type:1,
            expend:true,
            information:[
              {
                title:'紧急性:',
                des:''
              },
              {
                title:'详细描述:',
                des:''
              }
            ]
          },
          {
            title:'服务日志',
            expend:true,
            type:3,
            information:[]
          },
          {
            title:'来源人信息',
            expend:true,
            type:1,
            show:true,
            information:[
              {
                title:'来源人:',
                des:''
              },
              {
                title:'来源单位:',
                des:''
              },
              {
                title:'来源人电话:',
                des:''
              },
              {
                title:'来源人邮箱:',
                des:''
              }
            ]
          },
          {
            title:'附件信息',
            expend:true,
            type:4,
            information:[]
          },
          {
            title:'服务追踪',
            expend:true,
            type:2,
            information:[]
          }
        ]
			}
		},
		components: {
			AppHeader
		},
		methods: {
      completeShow:function (it,value) {
        let self = this;
        it.approvalInfos = it.approvalInfos.reverse();
        if(it.show) {
          it.approvalInfos.forEach(function (item,index) {
            item.time = Tool.formate(new Date(item.handleTimes.replace(/\-/g, '/')),'yyyy-MM-dd');
            item.MM = Tool.formate(new Date(item.handleTimes.replace(/\-/g, '/')),'hh:mm');
            self.infoList[4].information.splice(value+1+index,0,item);
            item.child = true;
          })
        }
        else {
          self.infoList[4].information.splice(value+1,it.approvalInfos.length)
        }

        it.show = !it.show;
      },
      expend: function (item) {
        item.expend = !item.expend;
      },
      sortTime(data) {
        data.forEach((item,index)=>{
          if(!item.show&&item.approvalInfos) {
            data.splice(index+1,item.approvalInfos.length)
          }
          item.show = true;
        })
        data = data.reverse();
      },
      getList:function () {
        let self = this;
        httpWebservice("queryServiceDetail",{
          arg0:self.orderNo
        },false,function(result){
          if(result.flag == "S") {
            //顶部导航信息
            console.log(result)
            self.submitTime = result.message.submitTime;
            self.mainList[0].content = decodeURIComponent(result.message.serviceApplyDes);
            self.mainList[1].content = result.message.serviceApplyCode;
            self.mainList[2].content = result.message.submitTime;
            self.mainList[3].content = result.message.serviceStatusDes;
            //基本信息
            self.infoList[0].information[0].des = result.message.urgentApply;
            self.infoList[0].information[1].des = decodeURIComponent(result.message.detailDes);

            //处理日志
            self.infoList[1].information = result.message.appVOList;

            //提报人信息
            if(result.message.sourcePerson) {
              self.infoList[2].show = false;
            }
            self.infoList[2].information[0].des = result.message.sourcePerson;
            self.infoList[2].information[1].des = result.message.sourceCompanyDes;
            self.infoList[2].information[2].des = result.message.sourcePersonTel;
            self.infoList[2].information[3].des = result.message.sourcePersonEmail;

            //服务追踪
            self.infoList[4].information = result.message.approvalInfos;
            self.infoList[4].information = self.infoList[4].information.reverse();
            self.infoList[4].information.forEach(function (item) {
              item.show = true;
              item.time = Tool.formate(new Date(item.handleTimes.replace(/\-/g, '/')),'yyyy-MM-dd');
              item.MM = Tool.formate(new Date(item.handleTimes.replace(/\-/g, '/')),'hh:mm');
            });

            //附件信息
            self.infoList[3].information = result.message.attVOList;
            self.infoList[3].information.forEach(function (item,index) {
              item.submitPersion = result.message.submitPersion;
              item.submitPersionCompanyDes = result.message.submitPersionCompanyDes;
              httpWebservice("queryDocContent",{
                arg0:item.docPath
              },false,function(result){
                item.url = 'data:image/png;base64,' + result.result;
              })
            });


          }
        })
      },
      open:function (url) {
        this.popupVisible = true;
        this.imgSrc = url;
      },
      cancelShowImg() {
        this.popupVisible = false;
      }
		},
    mounted: function () {
      this.getList();
    }
	}
</script>
<style type="text/css">

  .firstLine {
    color: red!important;
  }

  .tooLong {
    color: #3a71dc;
  }

  .bigCircle {
    width: 15px!important;
    height: 15px!important;
    left: 0!important;
  }

  .downCircle {
    top: 22px!important;
    left: 4px!important;
  }
	.fwxq-main {
		text-align: left;
	}

  .fwxq-main-list {
    background: white;
  }

  .fwxqActive {
    border: 1px solid #f3f3f3;
  }

  .fwxq-common {
    padding: 0 10px;
  }

  .fwxq-title {
    height: 35px;
    line-height: 35px;
  }

  .fwxq-description {
    height: 150px;
    background: white;
  }

  .fwxq-description div {
    height: 37.5px;
    line-height: 37.5px;
    color: #a8a8a8;
    font-size: 14px;
  }

  .fwxq-description div:nth-child(1) {
    font-weight: bold;
    color: black;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;

  }

  .fwxq-description div:nth-child(2) span:nth-child(2) {
    color: #4695ee;
  }

  .fwxq-list {
    display: -webkit-flex; /* Safari */
    display: flex;
    padding: 0 10px;
    height: 40px;
    background: white;
    margin-top: 1px;
    line-height: 40px;
    font-size: 15px;
    font-weight: bold;
  }

  .fwxq-list span:nth-child(1){
    flex: 9;
  }

  .fwxq-list span:nth-child(2){
    text-align: center;
    flex: 1;
  }

  .fwxq-list .fa-lg {
    line-height: 40px;
  }

  .fwxq-baseList {
    display: -webkit-flex; /* Safari */
    display: flex;
    text-align: left;
    font-size: 14px;
  }

  .fwxq-baseList span:nth-child(1) {
    flex:3;
  }

  .fwxq-baseList span:nth-child(2) {
    flex:7;
  }

  .fwxq-step {
    display: -webkit-flex; /* Safari */
    display: flex;
    text-align: left;
    font-size: 12px;
    height: 48px;
  }

  .fwxq-step>div:nth-child(1) {
    -webkit-flex:2;
    flex:2;
    line-height: 48px;
    position: relative;
  }

  .fwxq-step>div:nth-child(2) {
    -webkit-flex:1;
    flex:1;
    position: relative;
  }

  .fwxq-step>div:nth-child(3) {
    -webkit-flex:6;
    flex:6;
    display: table;
    width: 60%;
    height: 48px;
  }

  .fwxq-text {
    display: table-cell;
    vertical-align: middle;
  }

  .fwxq-stepList>div:nth-child(1) {
    margin-top: 0;
  }

  .fwxq-step-line span:nth-child(1) {
    display: inline-block;
    width: 8px;
    height:8px;
    background: #4594ed;
    border-radius: 50%;
    position: absolute;
    top: 19px;
    left: 4px;
  }

  .fwxq-step-line span:nth-child(2) {
    display: inline-block;
    width: 56px;
    height: 1px;
    background: #4594ed;
    transform:rotate(90deg);
    -webkit-transform:rotate(90deg); /* Safari 和 Chrome */
    position: absolute;
    top: 55px;
    left: -20px;
  }

  .fwxq-step-line span:nth-child(3),.fwxq-step-line span:nth-child(4) {
    color: white;
    position: absolute;
    top: 22px;
    left: 6px;
    font-size: 12px;
  }

  .fwxq-step-line span:nth-child(4) {
    left: 4px;
  }


  .fwxq-text-orderNo {
    color: #4594ed;
  }

  .stepLastLine {
    width: 18px!important;
    left: -1px!important;
    top: 31px!important;
  }

  .fwxq-processLog>div {
    margin-top: 10px;
  }

  .fwxq-processLog>div:nth-child(1) {
    margin-top: 0;
  }

  .fwxq-img img{
    width: 50px;
    height: 50px;
    /*position: absolute;*/
  }

  .fwxq-img {
    margin: 5px 0;
    height: 50px;
    line-height: 50px;
  }

  .fwxq-main .showImg {
    width: 100%;
    height: 100%;
  }

  .fwxq-step-time {
    font-size: 13px;
  }

  .fwxq-time {
    color: #c1c1c1;
    text-align: right;
  }

  .fwxq-step-MM {
    position: absolute;
    right: 0;
    bottom: -15px;
  }

  .fwxq-time-sort {
    text-align: right;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    color: rgb(58, 113, 220);
    padding-right: 10px;
  }

  .fwxq-main .showImg img {
    width: 100%;
    height: 100%;
  }

</style>
