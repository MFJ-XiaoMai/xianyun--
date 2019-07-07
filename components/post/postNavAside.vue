<template>
  <div>
    <el-row class="strategy_recommended">
      <el-row class="strategy_nav" @mouseleave.native="handleNotShowNav">
        <el-row
          class="strategy_nav_left"
          type="flex"
          justify="space-between"
          v-for="(item,index) in navData"
          :key="index"
          @mouseenter.native="handleShowNav(index)"
          
        >
          <span>{{item.type}}</span>
          <i class="el-icon-arrow-right"></i>
        </el-row>
        <el-row
          class="Destination_selection"
          v-for="(item,index) in navData"
          :key="index"
          v-if="isShowNav&current == index"
        >
          <ul>
            <li
              v-for="(item1,index1) in navData[index].children"
              :key="index1"
              v-if="isShowNav&current == index">
              <i>{{index1 + 1}}</i>
              <em>{{item1.city}}</em>
              <span>{{item1.desc}}</span>
            </li>
          </ul>
        </el-row>
      </el-row>

      <el-row class="strategy_search" type="flex" justify="space-between">
        <span></span>
        <input placeholder="请输入想去的地方,如香港" class="input-with-select">
      </el-row>
      <el-row class="strategy_app" type="flex" justify="space-around">
        <el-row class="strategy_app_logo">
          <img src="http://images.mafengwo.net/images/app/m/logo_gonglve_v6.png?v=20150825" alt />
        </el-row>
        <el-row class="strategy_app_download">
          <h5>马蜂窝自由行APP下载</h5>
          <p>iPhone版 | Android版 | iPad版</p>
          <img
              src="https://p3-q.mafengwo.net/s12/M00/17/80/wKgED1vb_fqAeZq0AAAxwHmnAuc675.png"
              alt
          />
        </el-row>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navData: {},
      isShowNav: false,
      current: 0
    };
  },
  methods: {
    handleShowNav(index) {
      console.log(index);
      this.isShowNav = true;
      this.current = index;
    },
    handleNotShowNav() {
      this.isShowNav = false;
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res.data)
      this.navData = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.strategy_recommended {
  width: 260px;
  //   border: 1px solid #000;
  .strategy_nav {
    color: #666;
    box-shadow: 0 0.5px 2px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    position: relative;

    .strategy_nav_left {
      padding: 15px;
      border-bottom: 1px solid #ddd;
      align-items: center;
      &:hover > i,
      &:hover > span {
        color: #ff9d00;
      }
    }
    .Destination_selection {
      position: absolute;
      left: 260px;
      top: -1px;
      z-index: 99;
      border: 1px solid #eee;
      width: 350px;
      height: 190px;
      box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1);
      background: #fff;

      ul {
        padding: 15px 0 0 20px;
        li {
          display: flex;
          align-items: center;
          margin-top: 5px;
          i {
            font-size: 20px;
            color: #ff9d00;
            font-weight: bolder;
            font-family: Letter Gothic Std, Verdana, Geneva, sans-serif;
          }
          em {
            font-style: normal;
            font-size: 14px;
            line-height: 24px;
            margin-left: 15px;
            color: #ff9d00;
          }
          span {
            margin-left: 10px;
          }
        }
      }
    }
    span {
      font-size: 12px;
    }
    i {
      font-size: 12px;
      color: #666;
    }
  }
  .strategy_search {
    // width: 100%;
    // position: relative;
    border: 2px solid #ffa800;
    margin-top: 10px;
    .input-with-select {
      width: 206px;
      flex: 1;
      font-size: 12px;
      color: #000;
      border: 0 none;
      outline: none;
    }
    span {
      float: left;
      width: 29px;
      height: 27px;
      display: block;
      background: url("http://images.mafengwo.net/images/gonglve/new-gl-icon6.png") -20px -60px
        no-repeat;
      margin-top: 8px;
      margin-left: 6px;
    }
  }
  .strategy_app {
    margin-top: 10px;
    height: 65px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .strategy_app_logo {
      img {
        width: 50px;
        height: 50px;
      }
    }
    .strategy_app_download {
      position: relative;
      &:hover >  h5{
        // border-bottom: 1px solid#;
        text-decoration: underline #ffa800;
      }
      &:hover > img{
        display: block;
      }
      h5 {
        font-size: 16px;
        color: #ffa800;
        margin-top: 3px;
      }
      p {
        font-size: 12px;
        margin-top: 5px;
        color: #999;
      }
      img{
        display: none;
        position: absolute;
        top: 20px;
        right: 15px;
        z-index: 99;
      }
    }
  }
}
</style>

