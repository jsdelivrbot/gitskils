<template>
  <div>
    <app-header title="电子考勤"></app-header>

    <div class="zczn-main" :style="pageh">

      <div class="zczn-con">
        <!-- <div class="zczn-title">

                </div> -->
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
  export default {
    name: 'DzkqComponent',
    data: function() {
      return {
        pageh: {
          height: State().pageh
        },
        lists: [{
          "name": "考勤查询",
          "url": "/kqcx/" + encodeURIComponent(window.empid) + '/' + 0,
          "src": "../static/kqcx.png"
        },
          {
            "name": "班次查询",
            "url": "/bccx",
            "src": "../static/bccx.png"
          },
          {
            "name": "班组考勤查询",
            "url": "/bzkqcx",
            "src": "../static/bzkqcx.png"
          },
          {
            "name": "考勤公示",
            "url": "/kqgs",
            "src": "../static/kqgs.png"
          }
        ]
      }
    },
    components: {
      AppHeader
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

  .zczn-title {
    width: 100%;
    height: 100px;
    background: url(~/static/zhengcezhinan/zczn_title.png) no-repeat center;
    background-size: cover;
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
