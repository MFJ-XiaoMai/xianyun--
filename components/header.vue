<template>
  <header>
    <!-- 头部组件的左边 -->
    <el-row type="flex" class justify="space-around">
      <el-row type="flex" class="header_left" justify="space-around">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
        <el-menu
          class="el-menu-demo navs"
          mode="horizontal"
          text-color="#000"
          active-text-color="#fff"
        >
          <el-menu-item>
            <nuxt-link to="/">首页</nuxt-link>
          </el-menu-item>
          <el-menu-item>
            <nuxt-link to="/post">旅游攻略</nuxt-link>
          </el-menu-item>
          <el-menu-item>
            <nuxt-link to="/hotel">酒店</nuxt-link>
          </el-menu-item>
          <el-menu-item>
            <nuxt-link to="/air">国内机票</nuxt-link>
          </el-menu-item>
        </el-menu>
      </el-row>
      <!-- 头部组件的右部分 -->
      <el-row type="flex" class="header_right" justify="end">
        <el-dropdown class="msg">
          <span class="el-dropdown-link">
            消息
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>消息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="user" v-if="$store.state.user.userInfo.token">
          <span class="el-dropdown-link">
            <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" />
            {{$store.state.user.userInfo.user.nickname}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <nuxt-link to="/user/userMsg">个人中心</nuxt-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="handleloginOut">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div v-else class="login">
          <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </div>
      </el-row>
    </el-row>
  </header>
</template>

<script>
export default {
  methods: {
    handleloginOut() {
      const { commit } = this.$store;
      commit("user/clearloginInfo", {});
      this.$message.success("退出成功");
    }
  }
};
</script>

<style scopde lang="less">
header {
  min-width: 1000px;
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 3px 0 #f5f5f5;
  box-sizing: border-box;
  .header_left {
    height: 100%;
    img {
      height: 58px;
    }
    .navs {
      height: 60px;

      a {
        display: block;
        height: 60px;
        padding: 0 20px;
        box-sizing: border-box;
        text-decoration: none;
        font-size: 16px;
        &:hover,
        &:focus,
        &:active {
          border-bottom: 5px #409eff solid;
          color: #409eff;
        }
      }
      .nuxt-link-exact-active {
        background: #409eff;
        color: #fff !important;
      }
    }
  }
  .header_right {
    .msg {
      padding-right: 10px;
      cursor: pointer;
    }
    .user {
      .el-dropdown-link {
        margin-left: 20px;
        &:hover {
          img {
            border-color: #409eff;
          }
        }
        a {
          display: block;
        }
        img {
          width: 32px;
          height: 32px;
          vertical-align: middle;
          border: 2px #fff solid;
          border-radius: 50px;
        }
      }
    }
    .login {
      a {
        font-size: 13px;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>
