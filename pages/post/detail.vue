<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <div>
          <el-breadcrumb separator="/" class="mianbao">
            <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
            <el-breadcrumb-item>
              <p>旅游详情</p>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <div class="main" v-for="(item,index) in postdata" :key="index">
          <div>
        <div >
         <h1 class="contentTitle">{{item.title}}</h1>
     
       </div>   
          <div>
          <div class="content" v-html="item.content"></div>
           </div>  
           <Postcontrol />
           </div>
          <div class="cmd-wrapper">
            <div class="cmd-title">
              <h3>评论区</h3>
            </div>
            <div class="cmd-input">
              <el-input type="textarea" :rows="2" placeholder="说点什么吧..."></el-input>
            </div>
            <div>
              <el-row>
                <el-button type="primary" class="button">提交</el-button>
              </el-row>
            </div>
            <div>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog>
                <img width="100%" alt />
              </el-dialog>
            </div>
            <div class="cmt-list">
              <div class="cmt-item">
                <div class="cmt-info">
                  <img
                    src="http://157.122.54.189:9095/assets/images/avatar.jpg"
                    width="16px"
                    height="16px"
                  />
                  地球发动机
                  <i>2019-07-05 5:24</i>
                  <span>1</span>
                </div>
                <div class="cmt-content">
                  <div class="cmt-new">
                    <p class="cmt-message">评论怎么写</p>
                    <div class="cmt-ctrl">
                      <a href=" ">回复</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cmt-item">
                <div class="cmt-info">
                  <img
                    src="http://157.122.54.189:9095/assets/images/avatar.jpg"
                    width="16px"
                    height="16px"
                  />
                  地球发动机
                  <i>2019-07-05 5:24</i>
                  <span>1</span>
                </div>
                <div class="cmt-content">
                  <div class="cmt-new">
                    <p class="cmt-message">评论怎么写</p>
                    <div class="cmt-ctrl">
                      <a href="javascript:;">回复</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <Paperright />
      </el-col>
    </el-row>
  </div>
</template>

<script>


import Paperright from "@/components/post/paperright";

import Postcontrol from "@/components/post/postcontrol"


export default {
      components:{
   
        Paperright,
  
        Postcontrol
        
    },
    data(){
         return {
          postdata:{},
          id:""
    };
  },
  

  methods: {},
  mounted(){
    this.id=this.$route.query.id;
    this.$axios({
      url: "/posts?id="+ this.id,
      method: "GET"
    }).then(res => {
   
   var{data} =res.data;
   this.postdata= data;

   

       console.log(this.$route.query)
    });
  }
};
</script>

<style scoped lang="less">
.main {
  margin-left: 280px;
  margin-top: 20px;
}
.right {
  margin-top: 55px;
  display: flex;
  justify-content: center;
}

.mianbao {
  margin-left: 280px;
  margin-top: 20px;
}
.cmt-list {
  border: 1px solid #ddd;
  margin-top: 40px;

  .cmt-item {
    padding: 20px 20px 5px 20px;
    position: relative;
    &:first-child {
      width: 50%;
    }

    .cmt-ctrl {
      color: #1e50a2;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      text-align: right;
      &:hover a {
        display: block;
      }
      a {
        display: none;
        text-decoration: underline;
      }
    }
  }
}
.button {
  margin-top: 10px;
  float: right;
  width: 80px;
  height: 30px;
  text-align: center;
}
.cmd-title {
  margin-top: 15px;
}
.cmd-input {
  margin-top: 10px;
}
.post-content {
  margin-top: 60px;
}
.el-icon-edit {
  color: red;

  font-size: 35px;
}
.el-icon-folder-add {
  color: red;

  font-size: 35px;
}
.el-icon-share {
  color: red;

  font-size: 35px;
}
.el-icon-circle-check {
  color: red;

  font-size: 35px;
}
    .contenttitle{
        width:1000px;
        margin: 0px auto;
        padding-top:30px;
        font-size:30px;
    }
    /deep/ img{
      max-width:700px;
    }
</style>

