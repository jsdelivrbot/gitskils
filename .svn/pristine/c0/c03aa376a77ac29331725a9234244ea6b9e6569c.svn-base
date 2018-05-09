import Vue from 'vue';
import Router from 'vue-router';

import HomeComponent from '@/components/home';
import XwzxComponent from '@/components/InformationSearch/1_0Xwzx';     //新闻资讯

//敬请期待
import JqqdComponent from '@/components/Jqqd';
//信息查询
import GrxxComponent from '@/components/InformationSearch/1_1Grxx';    //个人信息
import XcxxComponent from '@/components/InformationSearch/1_2Xcxx';     //薪酬信息
    // 报销信息
    import BxxxComponent from '@/components/InformationSearch/ReimbursementInformation/1_3Bxxx';
    import XjbxdComponent from '@/components/InformationSearch/ReimbursementInformation/1_3_1Xjbxd';
    import BxxqComponent from '@/components/InformationSearch/ReimbursementInformation/1_3_3Bxxq';
import QynjComponent from '@/components/InformationSearch/1_4Qynj';   //企业年金
import GrjxComponent from '@/components/InformationSearch/1_5Grjx';   //个人绩效
    //电子考勤
import DzkqComponent from '@/components/InformationSearch/ElectronicAttendance/1_8Dzkq';
import KqcxComponent from '@/components/InformationSearch/ElectronicAttendance/5_1Kqcx';
import BccxComponent from '@/components/InformationSearch/ElectronicAttendance/5_2Bccx';
import BzkqcxComponent from '@/components/InformationSearch/ElectronicAttendance/5_3Bzkqcx';
import BzkqxqComponent from '@/components/InformationSearch/ElectronicAttendance/5_3_1Bzkqxq';
import KqgsComponent from '@/components/InformationSearch/ElectronicAttendance/5_4Kqgs';
    //服务查询
import FwcxComponent from '@/components/InformationSearch/ServiceQuery/2-5Fwcx';
import CxjgComponent from '@/components/InformationSearch/ServiceQuery/2-5-1Cxjg';
import FwxqComponent from '@/components/InformationSearch/ServiceQuery/2-5-2Fwxq';


//业务办理
import ItsqComponent from '@/components/Businesshandling/2-3Itsq';     //IT申请
      //证明申请
import ZmsqComponent from '@/components/Businesshandling/ProveApply/2_1Zmsq';
import ZmsqxqComponent from '@/components/Businesshandling/ProveApply/2_1_1Zmsqxq';
import TjzmsqxqComponent from '@/components/Businesshandling/ProveApply/2_1_2Tjzmsq';
      //信息修改
import XxxgComponent from '@/components/Businesshandling/InromationModify/2_2Xxxg';
import JbxxxgComponent from '@/components/Businesshandling/InromationModify/2_2_1Jbxxxg';
import JtcyxgComponent from '@/components/Businesshandling/InromationModify/2_2_2Jtcyxg';
import JtcybjComponent from '@/components/Businesshandling/InromationModify/2_2_3Jtcybj';
import WdsqComponent from '@/components/Businesshandling/InromationModify/2_4Wdsq';
import WdsqxqComponent from '@/components/Businesshandling/InromationModify/2_4_1Wdsqxq';

//政策查询
import ZchxComponent from '@/components/PolicyInquiry/PolicyGuide/3_1Zchx';
import YlbxComponent from '@/components/PolicyInquiry/PolicyGuide/1_7Ylbx';
import YlbxDetailComponent from '@/components/PolicyInquiry/PolicyGuide/1_7_1Ylbx';
import XcsComponent from '@/components/PolicyInquiry/1_6Xcs';     //小常识
      // 我要资讯
import WyzxComponent from '@/components/PolicyInquiry/Consult/3_2Wyzx';
import WyzxlbComponent from '@/components/PolicyInquiry/Consult/3_2_1Wyzxlb';
import WyzxxqComponent from '@/components/PolicyInquiry/Consult/3_2_2Wyzxxq';
import JyfxComponent from '@/components/PolicyInquiry/4_3jyfx';     //经验分享


//管理支持
        // 通讯录
import TxlComponent from '@/components/ManagementSupport/MailList/4_4txl';
import TxlListComponent from '@/components/ManagementSupport/MailList/4_4_1txl';
        //专家答复
import ZjdfComponent from '@/components/ManagementSupport/ExpertReply/4_5zjdf';
import ZjdfxqComponent from '@/components/ManagementSupport/ExpertReply/4_5_1Zjdfxq';

Vue.use(Router)

export default new Router({
	/*mode: "history",*/
	routes: [
		{
			path: '/',
			component: HomeComponent,
      meta: {
        keepAlive: true //此组件需要被缓存
      }
		},
    //证明申请
    {
      path: '/zmsq',
      component: ZmsqComponent
    },
    //证明申请详情
    {
      path: '/zmsqxq',
      component: ZmsqxqComponent,
    },
    //提交证明申请
    {
      path: '/zmsq/:attachCode/:formType',
      component: TjzmsqxqComponent,
    },
    //新闻资讯
		{
			path: '/xwzx',
			component: XwzxComponent
		},
    //个人信息
		{
			path: '/grxx',
			component: GrxxComponent,
		},
    //信息修改
    {
      path: '/xxxg',
      component: XxxgComponent
    },
    //基本信息修改
    {
      path: '/xxxg/:fieldTag',
      component: JbxxxgComponent
    },
    //家庭成员修改
    {
      path: '/jtcyxg',
      component: JtcyxgComponent
    },
    //家庭成员编辑
    {
      path: '/jtcyxg/:relation/:relationName/:sexCode/:orgDuty/:relationCode/:type',
      component: JtcybjComponent
    },
    //基本信息我的申请
    {
      path: '/wdsq',
      component: WdsqComponent
    },
    //基本信息我的申请详情
    {
      path: '/wdsq/:id/:code',
      component: WdsqxqComponent
    },
    //薪酬信息
		{
			path: '/xcxx',
			component: XcxxComponent
		},
    //报销信息
		{
			path: '/bxxx',
			component: BxxxComponent,
      meta: {
        keepAlive: true //此组件需要被缓存
      }
		},
    {
      path: '/bxxx/:billCode',
      component: BxxqComponent
    },
    //报销申请
    {
      path: '/xjbxd',
      component: XjbxdComponent
    },
    //企业年金
		{
			path: '/qynj',
			component: QynjComponent
		},
    //个人绩效
		{
			path: '/grjx',
			component: GrjxComponent
		},
    //小常识
		{
			path: '/xcs',
			component: XcsComponent
		},
    //养老保险
		{
			path: '/ylbx',
			component: YlbxComponent
		},
    //电子考勤
    {
      path: '/dzkq',
      component: DzkqComponent
    },
		{
			path: '/jqqd',
			component: JqqdComponent
		},
		{
			path: '/zchx',
			component: ZchxComponent
		},
		{
			path: '/ylbx/:id',
			component: YlbxComponent
		},
		{
			path: '/ylbxdetail/:id/:knowledgeId',
			component: YlbxDetailComponent
		},
		{
			path: '/jyfx',
			component: JyfxComponent
		},
    //通讯录
		{
			path: '/txl',
			component: TxlComponent
		},
    {
      path: '/txldetail/:deptCode/:empName/:empTel',
      component: TxlListComponent
    },
		{
			path: '/zjdf',
			component: ZjdfComponent
		},
    {
      path: '/zjdfdetail/:type/:questCode',
      component: ZjdfxqComponent
    },
    {
			path: '/itsq',
			component: ItsqComponent
		},
    {
			path: '/fwcx',
			component: FwcxComponent
		}, {
			path: '/cxjg/:pagehight/:orderNo/:shortdescription/:startDate/:endDate',
			component: CxjgComponent
		},
    {
			path: '/fwxq/:orderNo',
			component:FwxqComponent
		},
    {
			path: '/wyzx',
			component: WyzxComponent
		},
    {
      path: '/wyzxlb',
      component: WyzxlbComponent
    },
    {
      path: '/wyzxdetail/:type/:questCode',
      component: WyzxxqComponent
    },
    {
      path: '/kqcx/:empId/:date',
      component: KqcxComponent
    },
    {
      path: '/bccx',
      component: BccxComponent
    },
    {
      path: '/bzkqcx',
      component: BzkqcxComponent
    },
    {
      path: '/bzkqdetail/:date/:type',
      component: BzkqxqComponent
    },
    {
      path: '/kqgs',
      component: KqgsComponent
    }
	]
})

