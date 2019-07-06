<template>
    <div class="create">
    <div class="create-left">
      <div class="create-title">
        <h2>发表新攻略</h2>
        <p class="create-desc">分享你的个人游记，让更多人看到哦！</p>
      </div>
      <div class="el-input">
        <el-input v-model="input_title" placeholder="请输入标题"></el-input>
      </div>

      <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="textarea"></el-input>
      <div class="cheack-city">
        <span>选择的城市</span>
        <el-input v-model="input_city" placeholder="请搜索游玩城市" style="width:200px" class="search-city"></el-input>
      </div>
      <div>
        <el-button type="primary">发布</el-button>
        <span class="submit-side">
          或者
          <nuxt-link to="#">保存到草稿</nuxt-link>
        </span>
      </div>
    </div>
    <div class="create-right">
      <p>草稿箱（ 0 ）</p>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            input_title:'',
            textarea:'',
            input_city:''
        }
    }
}
</script>

<style scopde lang="less">
.create {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  .create-left {
    width: 750px;
    .create-title {
      h2 {
        font-weight: 400;
        font-size: 22px;
        margin-bottom: 10px;
      }
      .create-desc {
        font-size: 12px;
        color: #999;
        margin-bottom: 10px;
      }
    }
    .el-input {
      background-color: #fff;
      border-radius: 4px;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      width: 100%;
      margin-bottom: 22px;
    }

    .el-textarea {
      margin-bottom: 22px;
    }
    .cheack-city {
      span {
        text-align: right;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
      }
      .search-city {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 100%;
      }
      .submit-side {
        font-size: 14px !important;
      }
    }
  }
  .create-right {
    width: 200px;
    border: 1px springgreen solid;
  }
}
</style>
