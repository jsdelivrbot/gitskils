<template>

	<div>

		<app-header title="服务申请"></app-header>
		<div class="itsq-main">
      <div class="itsq-content" v-show="tab==1">
        <!--选择服务分类-->
        <div @click="ChoiceSystem(item.id)" class='itsq-item' v-for="(item,index) in serviceList" v-show="item.show" :key="index">
          <mt-cell v-bind:title="item.name">
            <span class="fa fa-angle-right"></span>
          </mt-cell>
        </div>

        <!--合同序号-->
        <div class="itsq-item itsq-contract" v-if="contractShow">
          <mt-field label="合同序号" placeholder="请输入合同序号" v-model="contractNum"></mt-field>
        </div>

        <!--紧急申请和代提-->
        <div class='itsq-item' v-for="(item,index) in switchList">
          <mt-cell v-bind:title="item.name">
            <mt-switch v-model="item.value" @change="turnApply(index,item.value)"></mt-switch>
          </mt-cell>
        </div>
        </mt-radio>

        <div v-if="mentionShow">
          <!--来源人-->
          <div class="itsq-item itsq-contract">
            <mt-field label="来源人" placeholder="请输入来源人" v-model="sourcePerson"></mt-field>
          </div>

          <!--来源单位-->
          <div class="itsq-item itsq-contract" @click="choiceCompany(2)">
            <mt-field label="来源单位" readonly disabled placeholder="请选择来源单位" v-model="fromCompanyName"></mt-field>
          </div>
          <!--来源人电话-->
          <div class="itsq-item itsq-contract">
            <mt-field label="来源人电话" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
          </div>

          <!--来源人邮箱-->
          <div class="itsq-item itsq-contract">
            <mt-field label="来源人邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
          </div>

        </div>

        <!--服务描述-->
        <div class="itsq-item itsq-description" v-for="(item,index) in description">
          <div class="itsq-description-title">
            {{item.title}}
          </div>
          <mt-field :placeholder="'请输入详情0-'+item.num+'字'" type="textarea" rows="2" v-model="item.des" @input="descInput(item,index)" v-if="index==0">
            <span class="itsq-description-span">{{item.remnant}}/{{item.num}}</span>
          </mt-field>
          <mt-field :placeholder="'请输入详情0-'+item.num+'字'" type="textarea" rows="4" v-model="item.des" @input="descInput(item,index)" v-else>
            <span class="itsq-description-span2">{{item.remnant}}/{{item.num}}</span>
          </mt-field>
        </div>

        <!--附件上传-->
        <div class="itsq-item itsq-description">
          <div class="itsq-description-title">
            附件上传
          </div>
          <div class="itsq-img">
            <li v-for="(item,index) in postImgList">
              <img v-bind:src='item.src' alt="" class="itsq-postImg" @click="viewImg(item)">
              <span class="fa fa-times-circle delete-button" @click="deleteImgList(index)"></span>
            </li>
            <li>
              <img src="../../assets/photo-icon.png" alt="" class="itsq-postImg" @click="photograph">
            </li>
            <div class="clear"></div>
          </div>
        </div>

        <!--提交服务申请-->
        <div class="itsq-submit">
          <mt-button class="button" type="primary" size="large" @click="submit">提  交</mt-button>
        </div>
      </div>
    </div>

    <!--//选择来源单位界面-->
    <div v-show="tab==2" class="itsq-choiceCompany">
      <div class="itsq-XCSsearch">
        <form action="javascript:return true;">
          <input @keyup.enter="tosearch($event)" v-model="keyword" type="search" maxlength="20" placeholder="搜索">
          <span class="fa fa-search"></span>
          <i @click="clear" class="fa fa-times-circle" v-if="keyword"></i>
        </form>
      </div>
      <div :style="pageh">
        <div @click="choiceCompany(1)" class="itsq-choiceCompany-radio">
          <mt-radio
            align="left"
            v-model="fromCompanyName"
            :options="options"
          >
          </mt-radio>
        </div>
      </div>

    </div>

      <!--选择系统-->
		<mt-popup v-model="serviceVisible" position="bottom" class="xitong-wrapper">
      <div>
        <mt-picker :slots="slots" @change="onValuesChangeService"></mt-picker>
      </div>
      <div>
        <mt-button type="default" @click="cancelService(0)">取消</mt-button>
        <mt-button type="primary" @click="enSureService">确定</mt-button>
      </div>

		</mt-popup>

    <!--选择系统标识别-->
    <mt-popup v-model="serviceVisible1" position="bottom" class="xitong-wrapper">
      <div>
        <mt-picker :slots="slots1" @change="onValuesChangeSystem"></mt-picker>
      </div>
      <div>
        <mt-button type="default" @click="cancelService(1)">取消</mt-button>
        <mt-button type="primary" @click="enSureService">确定</mt-button>
      </div>

    </mt-popup>

    <!--拍照选择-->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>

    <!--预览照片-->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade" class="itsq-showImg">
      <img :src="imgSrc" alt="" @click="cancelShowImg">
    </mt-popup>

	</div>
</template>

<script>
	import AppHeader from "@/components/HeaderComponent";
  import { httpGetMethod , httpWebservice,State } from "../../utils/api.js"; //添加公共组件
  import { Tool } from "../../utils/tool.js"; //添加公共组件

	export default {
		name: 'ItsqComponent',
		data: function() {
			return {
        pageh:{
          height:State().wh - 109 + "px",
          "overflow-y":"auto",
          "margin-top":"20px"
        },
			  ctrlShow:[],   //控制服务分类与界面字段显隐
        fromCompanyName:'',
			  tab:1,    //选项卡
        contractNum:'',   //合同序号
        contractShow:false,//设置合同序号是否显示
        companyCode:'', mentionShow:false,   //来源单位
        sourcePerson:'',   //来源人
        phone:'',      //来源人电话
        email:'',         //来源人邮箱
        keyword:'',      //来源单位关键字搜索
        //			  弹出选择系统的操作
        serviceVisible:false,
        serviceVisible1:false,
        selectValue:'',
        sign:'',
        emergencyApply:75,//紧急申请
        mention:'N',   //代提
        //服务描述以及详细描述
        description:[
          {
            title:'服务描述',
            des:'',
            num:40,
            remnant:0
          },
          {
            title:'详情描述',
            des:'',
            num:500,
            remnant:0
          }
        ],
        //系统
        serviceList:[
          {
            id:0,
            name:'服务分类一',
            show:true
          },
          {
            id:1,
            name:'服务分类二',
            show:true
          },
          {
            id:2,
            name:'服务分类三',
            show:true
          },
          {
            id:3,
            name:'服务分类四',
            show:false
          },
          {
            id:4,
            name:'请选择系统标识',
            show:false
          },
          {
            id:5,
            name:'请选择模块',
            show:false
          }
        ],
        //switch
        switchList:[
          {
            name:'紧急申请',
            value:false
          },
          {
            name:'代提',
            value:false
          }
        ],
        options:[],
        //拍照
        sheetVisible:false,   //点击拍照弹出来的选项卡
        actions:[
          {
            name:"拍照",
            method:this.getCamer
          },
          {
            name:"从相册中选择",
            method:this.choicePhoto
          }
        ],
        postImgList:[],
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1s',
            textAlign: 'left'
          }
        ],
        slots1: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'left'
          }
        ],
        serviceFirst:[],
        serviceSecond:[],
        serviceThird:[],
        serviceFourth:[],
        serviceFive:[],
        serviceSix:[],
        submitServiceObj:['','','','','',''],
        fromCompanyList:[],
        select:'',
        popupVisible:false,
        imgSrc:''
			}
		},
		methods: {
//		  选择系统操作
      onValuesChangeService: function (picker,values) {
        this.selectValue = values[0];
      },
      onValuesChangeSystem:function (picker,values) {
        this.select = values[0];
      },
      enSureService: function () {
//        重新选择服务分类的时候要重置选项
        if(this.serviceList[this.sign].name!=this.selectValue && this.sign<3) {
          this.reset();
          if(this.sign==0&&this.serviceList[this.sign].name!='服务分类一') {
            this.serviceList[1].name = '服务分类二';
            this.serviceList[2].name = '服务分类三';
          }
          else if(this.sign==1&&this.serviceList[this.sign].name!='服务分类二') {
            this.serviceList[2].name = '服务分类三';
          }
          else{

          }
        }
        if(this.sign!=4) {
          this.serviceList[this.sign].name = this.selectValue;
        }
        else {
          this.serviceList[this.sign].name = this.select;
        }

        this.serviceVisible = false;
        let self = this;
        switch (this.sign) {
          case 0:   //服务分类一
            this.serviceFirst.forEach(function (item) {
              if(item.serviceClassifiDes == self.serviceList[self.sign].name) {
                self.submitServiceObj[self.sign] = item.serviceClassifiCode;
              }
            });
            self.getServiceList(self.submitServiceObj[0],1);
            break;
          case 1:    //服务分类二
            this.serviceSecond.forEach(function (item) {
              if(item.serviceClassifiDes == self.serviceList[self.sign].name) {
                self.submitServiceObj[self.sign] = item.serviceClassifiCode;
              }
            })
            self.getServiceList(self.submitServiceObj[1],2);
            break;
          case 2:   //服务分类三
            this.serviceThird.forEach(function (item) {
              if(item.serviceClassifiDes == self.serviceList[self.sign].name) {
                self.submitServiceObj[self.sign] = item.serviceClassifiCode;
              }
            })
            self.getFiledIsDisplay(self.submitServiceObj);  //字段显示
            break;
          case 3:   //服务分类四
            this.serviceFourth.forEach(function (item) {
              if(item.serviceClassifiDes == self.serviceList[self.sign].name) {
                self.submitServiceObj[self.sign] = item.serviceClassifiCode;
              }
            })
            //模块显示的时候
            if(self.serviceList[5].show) {
              self.getModularByServiceCode(self.submitServiceObj[2],self.submitServiceObj[3]);
            }
            break;
          case 4:    //系统标识
            this.serviceFive.forEach(function (item) {
              if(item.systemFlagDes == self.serviceList[self.sign].name) {
                self.submitServiceObj[self.sign] = item.systemFlagCode;
              }
            })
            this.serviceVisible1 = false;
            break;
          case 5:    //模块
            this.serviceSix.forEach(function (item) {
              if(item.mODDES == self.serviceList[self.sign].name) {
                self.submitServiceObj[self.sign] = item.mODID;
              }
            })
            break;
        }
      },
      cancelService: function (id) {
        if(id==0) {
          this.serviceVisible = false;
        }
        else {
          this.serviceVisible1 = false;
        }

      },

      //获取服务分类信息
      getServiceList:function (unicCode,id) {
        let self= this;
        httpWebservice("selectServiceClassif",{
          arg0:unicCode,
          arg1:window.Identity_Token,
        },true,function(result){
          if(result.flag=='S') {
            switch (id) {
              case 0:
                self.serviceFirst = result.message;   //服务分类一
                break;
              case 1:
                self.serviceSecond = result.message;   //服务分类二
                break;
              case 2:
                self.serviceThird = result.message;     //服务分类三
                break;
              case 3:
                self.serviceFourth = result.message;     //服务分类四
                break;
            }
          }
          else {
            Tool.alert(result.result)
          }


        })
      },

      //服务分类与界面字段显隐控制
      getFiledIsDisplay: function (obj) {
        let self= this;
        httpWebservice("filedIsDisplay",{
          arg0:obj[0],
          arg1:obj[1],
          arg2:obj[2]
        },true,function(result){
          if(result.flag=='S') {
            self.serviceList[3].show = result.serviceClassiFourth;
            self.serviceList[4].show = result.systemFlag;
            self.serviceList[5].show = result.modular;
            self.contractShow = result.contractOrder;
//          服务分类4显示的时候要执行的操作
            if(self.serviceList[3].show) {
              self.getServiceList(self.submitServiceObj[2],3);
            }
            //          系统标识显示的时候
            if(self.serviceList[4].show) {
              self.getSystemFlagByService(self.submitServiceObj[2]);
            }
          }
          else {
            Tool.alert(result.result)
          }

        })
      },

      //获取系统标识接口
      getSystemFlagByService: function (serviceClassifiCode) {
        let self= this;
        httpWebservice("selectSystemFlagByService",{
          arg0:serviceClassifiCode,
          arg1:window.Identity_Token
        },true,function(result){
          if(result.flag=='S') {
            self.serviceFive = result.message;     //系统标识
          }
          else {
            Tool.alert(result.result);
          }

        })
      },

      //获取模块
      getModularByServiceCode: function (arg0,arg1) {
        let self= this;
        httpWebservice("selectModularByServiceCode",{
          arg0:arg0,
          arg1:arg1
        },true,function(result){
          if(result.flag=='S') {
            self.serviceSix = result.message;     //模块
          }
          else {
            Tool.alert(result.result);
          }
        })
      },

      //选择服务分类
      ChoiceSystem: function (sign) {
        this.slots[0].values = [];
        this.slots1[0].values = [];
        this.sign = sign;
        let self = this;
        switch (sign) {
          case 0:
            this.serviceFirst.forEach(function (item) {
              self.slots[0].values.push(item.serviceClassifiDes);
            });
            break;
          case 1:
            if(this.serviceList[0].name=='服务分类一') {
              Tool.alert("请先选择服务分类一");
              return;
            }
            this.serviceSecond.forEach(function (item) {
              self.slots[0].values.push(item.serviceClassifiDes);
            });
            break;
          case 2:
            if(this.serviceList[0].name=='服务分类一') {
              Tool.alert("请先选择服务分类一");
              return;
            }
            if(this.serviceList[1].name=='服务分类二') {
              Tool.alert("请先选择服务分类二");
              return;
            }
            if(this.serviceThird.length==0) {
              return;
            }
            this.serviceThird.forEach(function (item) {
              self.slots[0].values.push(item.serviceClassifiDes);
            });
            break;
          case 3:
            if(this.serviceFourth.length==0) {
              return;
            }
            this.serviceFourth.forEach(function (item) {
              self.slots[0].values.push(item.serviceClassifiDes);
            });
            break;
          case 4:
            this.serviceVisible1 = true;
            this.serviceFive.forEach(function (item) {
              self.slots1[0].values.push(item.systemFlagDes);
            });
            break;
          case 5:
            if(this.serviceList[3].name=='服务分类四') {
              Tool.alert("请先选择服务分类四");
              return;
            }
            this.serviceSix.forEach(function (item) {
              self.slots[0].values.push(item.mODDES);
            });
            break;
        }
        if(sign!=4) {
          self.serviceVisible = true;
        }


      },

      //重置
      reset: function () {
        this.serviceList[3].name = '服务分类四';
        this.serviceList[4].name = '请选择系统标识';
        this.serviceList[5].name = '请选择模块';
        this.serviceList.forEach(function (item,index) {
          if(index>2) {
            item.show = false;
          }
        })
        this.contractNum = '';
        this.contractShow = false;
      },

      //选择来源单位切换
      choiceCompany: function (id) {
        this.tab = id;
      },

      //紧急申请和代提开关
      turnApply: function (index,value) {
//        代提
        if(index==1) {
          if (value) {
            this.mentionShow = true;
            this.mention = 'Y';
          }
          else {
            this.mentionShow = false;
            this.mention = 'N';
            this.sourcePerson = '';
            this.fromCompanyName = '';
          }
        }
        //紧急申请
        else {
          if(value) {
            this.emergencyApply = 25;
          }
          else {
            this.emergencyApply = 75;
          }
        }
      },

      //获取来源单位
      getSelectCompany:function () {
        let self = this;
        httpWebservice("selectCompany",{
          arg0:self.keyword
        },true,function(result){
          if(result.flag=='S') {
            self.fromCompanyList = result.message;
            result.message.forEach(function (item) {
              self.options.push(item.companyDes)
            })
          }
          else {
            Tool.alert("获取来源单位失败");
          }

        })
      },

      tosearch:function () {
        this.options = [];
        this.getSelectCompany();
      },
      clear: function () {
        this.keyword = '';
        this.options = [];
        this.getSelectCompany();
      },

      //详情输入字数限制
      descInput: function (obj,index) {
        var txtVal = obj.des.length;
        obj.remnant = obj.num - txtVal;
        if(obj.remnant<0) {
          Tool.alert("最多只能输入"+ obj.num + '字');
          obj.des = obj.des.substring(0,obj.num-1);
        }
      },

      deleteImgList: function (index) {
        let self = this;
        Tool.alert('你确定要删除吗？','',true,function () {
          self.remove(self.postImgList,self.postImgList[index]);
        })
      },

      remove: function (arr,item) {
        if(arr.length){
          var index = arr.indexOf(item);
          if(index>-1){
            return arr.splice(index,1)
          }
        }
      },

      //拍照
      photograph:function () {
        this.sheetVisible = true;
      },

      viewImg(item) {
        this.popupVisible = true;
        this.imgSrc = item.src;
      },

      cancelShowImg() {
        this.popupVisible = false;
      },
      //      调取拍照
      getCamer:function () {
        let self = this;
        window.SinopecAppPlugin.callHandler('openCamera', {'quality':50, 'destinationType':0, 'allowedit': 0, 'mediaType': 0, 'saveToPhotoAlbum': 0}, function(res) {
          if(!res.data) {
            return
          }
          var images = 'data:image/png;base64,' + res.data;
          self.postImgList.push({
            src:images,
            img:res.data,
            deleteImg:false
          })
          Tool.alert("拍摄成功");
        });
      },

      //调取相册功能
      choicePhoto : function () {
        let self = this;
        window.SinopecAppPlugin.callHandler('openPictureLibrary', {'quality':5, 'destinationType': 0}, function(res) {
          res.data.forEach(function(item){
            var images = 'data:image/png;base64,' + item;
            self.postImgList.push({
              src:images,
              img:item,
              deleteImg:false
            })
          });
          Tool.alert("上传成功");
        });
      },

      //提交服务申请
      submit: function () {
        let self = this;
        if(!self.formValidation()) {
          return;
        }
        //        验证合同序号
        if(this.contractShow&&!Tool.checkNum(self.contractNum)) {
          return;
        }
        if(self.mention == 'Y') {
          if(!self.sourcePerson) {
            Tool.alert("来源人不能为空");
            return;
          }
          if(!self.fromCompanyName) {
            Tool.alert("来源单位不能为空");
            return;
          }
          if(!self.phone&&!self.email) {
            Tool.alert("来源人电话和来源人邮箱至少填写一项");
            return;
          }
          if(self.phone&&!Tool.checkPhone(self.phone)) {
            return;
          }
          if(self.email&&!Tool.checkEmail(self.email)) {
            return;
          }
        }
        if(!self.description[0].des) {
          Tool.alert("服务描述不能为空");
          return;
        }
        if(!self.description[1].des) {
          Tool.alert("详情描述不能为空");
          return;
        }
        //        图片对象集合
        var array = [];
        self.postImgList.forEach(function (item,index) {
          array[index] = {
            arg16:item.img,
            arg17:window.Identity_Token,
            arg18:'IT共享移动端',
            arg19:'ITSSC_APP',
            arg20:'tupian.jpg',
            arg22:'服务申请相关说明'
          }
        });

        //获取来源单位编码
        self.fromCompanyList.forEach(function (item) {
          if(item.companyDes == self.fromCompanyName) {
            self.companyCode = item.companyCode;
          }
        });

        //提交
        httpWebservice("generateBillServiceCode",{
          arg23:JSON.stringify({
              arg0:encodeURIComponent(self.description[0].des),
              arg1:encodeURIComponent(self.description[1].des),
              arg2:window.Identity_Token,
//              arg3:window.empName,
              arg4:self.mention,
              arg5:self.sourcePerson,
              arg6:self.companyCode,
              arg7:self.submitServiceObj[0],
              arg8:self.submitServiceObj[1],
              arg9:self.serviceThird.length!=0?self.submitServiceObj[2]:'',
              arg10:self.serviceList[3].show?self.submitServiceObj[3]:'',
              arg11:self.serviceList[4].show?self.submitServiceObj[4]:'',
              arg12:self.serviceList[5].show?self.submitServiceObj[5]:'',
              arg13:self.contractNum,         //合同序号
              arg14:self.emergencyApply,
              arg15:array,
              arg25:self.phone,
              arg26:self.email
            })
        },true,function(result){
          if( result.flag == "S" ) {
            Tool.ItAlert("提报成功" + '<br/>' + '服务单号为：' + result.result,'',function () {
              self.$router.push('/fwxq/'+ result.result);
            },function () {
              self.$router.go(-1);
            });
          }
          else {
            Tool.alert("提报失败" + '<br/>' + result.message,'','',function () {
              self.$router.go(-1);
            });
          }
        })
      },

      formValidation:function () {
        if(this.serviceList[0].name=='服务分类一') {
          Tool.alert("服务分类一不能为空");
          return false;
        }
        else if(this.serviceList[1].name=='服务分类二') {
          Tool.alert("服务分类二不能为空");
          return false;
        }
        else if(this.serviceList[2].name=='服务分类三'&&this.serviceThird.length) {
          Tool.alert("服务分类三不能为空");
          return false;
        }
        else if (this.serviceList[2].name=='HR系统'&&this.serviceList[4].show&&this.serviceList[3].name=='服务分类四') {
          Tool.alert("服务分类四不能为空");
        }
        else if(this.serviceList[4].show&&this.serviceList[4].name=='请选择系统标识') {
          Tool.alert("系统标识不能为空");
        }
        else {
          return true;
        }
      }
    },
    mounted: function () {
      window.scrollTo(0,0);
      this.getServiceList("ITSSCIT_ROOT",0);
      this.getSelectCompany();
      console.log(decodeURIComponent('哈哈哈哈哈哈哈哈'))
    },
    components: {
			AppHeader
		}
	}
</script>
<style type="text/css">
  .clear {
    clear: both;
  }
  .button {
    width: 100%;
    background-color: #4c9beb !important;
    margin: 0;
  }

	.itsq-item .mint-cell-wrapper {
		background-size: 0;
		text-align: left;
	}

  .itsq-main {
    overflow-x: hidden;
  }

  .itsq-description {
    background: white;
    margin-top: 10px;
    text-align: left;
  }

	.itsq-main .itsq-description .mint-cell-title {
		width: 0;
	}

  .itsq-main .itsq-contract .mint-cell-title{
    width: 80px;
  }

  textarea {
    resize: none;
  }

  .itsq-main {
    padding-top: 15px;
  }

	.itsq-plus {
		background: url(../../../static/plus.png) no-repeat center;
		background-size: contain;
		display: block;
		width: 25px;
		height: 25px;
	}

	.itsq-jjsq label {
		display: flex;
		padding: 10px;
		align-items: center;
		justify-content: flex-start;
		font-size: 14px;
	}

	.itsq-jjsq input[type='checkbox'] {
		margin-right: 6px;
		outline: none;
		background: #fff;
		appearance: none;
		border: 1px solid #d8d8d8;
		width: 20px;
		height: 20px;
		border-radius: 3px;

	}

	.itsq-jjsq input[type='checkbox']:checked {
		background: url(../../../static/checkbox_select.png) no-repeat center;
		background-size: contain;
	}

	.itsq-submit {
		margin: 50px 10px 0;
	}
	.xitong-wrapper{
		height: auto;
		width: 100%;
		background: #fff;
	}
  .xitong-wrapper .picker-slot.picker-slot-left {
    text-align: center;
  }
  .IT-navigation{
    height:40px;
    text-align: center;
    line-height: 40px;
    border-bottom: 1px solid #ebebeb;
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

  input:disabled {
    background:#fff;
  }

  .itsq-choiceCompany {
    width: 100%;
  }

  .itsq-choiceCompany-radio {
    text-align: left;
  }

  .itsq-description-span {
    position: absolute;
    bottom: -20px;
    right: 5px;
    color: #dddddd;
  }

  .itsq-description-span2 {
    position: absolute;
    bottom: -50px;
    right: 5px;
    color: #dddddd;
  }

  .itsq-description .mint-field.is-textarea .mint-cell-value {
    border: 1px solid #dddddd;
  }

  .itsq-description-title {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
  }

  .itsq-description .mint-cell-wrapper {
    margin-bottom: 20px;
  }

  /*搜索框*/
  .itsq-choiceCompany .itsq-XCSsearch {
    width: 90%;
    height:30px;
    margin: 0 auto;
    position: relative;
  }

  .itsq-choiceCompany .itsq-XCSsearch input {
    width: 88%;
    height:40px;
    border: 1px solid #e9e9e9;
    border-radius: 30px;
    outline: none;
    font-size: 14px;
    padding-left: 12%;
  }

  .itsq-choiceCompany .itsq-XCSsearch span {
    position: absolute;
    top: 12px;
    left:10%;
    color: #ccc;
  }

  .itsq-choiceCompany .itsq-XCSsearch i{
    position: absolute;
    top:12px;
    right: 10%;
    color: #ccc;
    font-size: 15px;
  }

  input[type='search'] {
    appearance: none;
     -webkit-appearance: none;
  }

  input[type=search]::-webkit-search-cancel-button {
     -webkit-appearance: none;
  }

  .itsq-main .itsq-img li {
    width: 60px;
    height: 60px;
    float: left;
    margin: 10px;
    border: 1px solid #dddddd;
    position: relative;
    border-radius: 2px;
  }

  .itsq-main .itsq-img li .itsq-postImg {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .itsq-main .itsq-img li .delete-button {
    position: absolute;
    top: -5px;
    right: -5px;
  }

  .itsq-choiceCompany-radio .mint-radiolist-label {
    display: -webkit-flex; /* Safari */
    display: flex;
  }

  .itsq-choiceCompany-radio .mint-radiolist-title {
    margin: 0;
  }

  .itsq-showImg, .itsq-showImg img {
    width: 100%;
    height: 100%;
  }

</style>
