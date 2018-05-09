<template>

  <div>
    <app-header title="信息修改"></app-header>
    <div class="xxxg-main" v-bind:style="pageh" >
     
    </div>
  </div>
</template>

<script>
  import { httpGetMethod } from "../utils/api.js"; //添加公共组件
  import { Lazyload } from 'mint-ui';
  import AppHeader from "@/components/HeaderComponent";
  import { State } from "../utils/api.js";
  import { Headers } from 'mint-ui';
  export default {
    name: 'XxxgComponent',
    data: function() {
      return {
       
      }
    },
    components: {
      AppHeader,
      Headers
    },
    methods: {

   

   

     

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
