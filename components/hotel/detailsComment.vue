<template>
  <div class="detailsComment">
    <div>
      <el-row type="flex" justify="center" class="commentIcon">
        <div class="ctrl-item" @click="handleComment">
          <i class="iconfont iconpinglun"></i>
          <p>
            评论
            <span>({{data.total}})</span>
          </p>
        </div>
        <div class="ctrl-item">
          <i class="iconfont iconstar1"></i>
          <p>收藏</p>
        </div>
        <div class="ctrl-item">
          <i class="iconfont iconfenxiang"></i>
          <p>分享</p>
        </div>
        <div class="ctrl-item" @click="handleLike">
          <i class="iconfont iconding"></i>
          <p>
            点赞
            <span>({{this.like}})</span>
          </p>
        </div>
      </el-row>
      <div class="cot_wrapper">
        <h4 class="h4">评论</h4>
        <div ref="cmtContent" :model="cmtContent">
          <textarea
            ref="txtare"
            v-model="cmtContent.content"
            autocomplete="off"
            placeholder="说点什么吧..."
            class="el-textarea__inner"
            style="resize: none; min-height: 33px;"
          ></textarea>
          <!-- 上传图片 -->
          <el-row class="uploadPictures" type="flex" justify="space-between">
            <div>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleCartSuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </div>
            <div>
              <el-button type="primary" @click="handleSubComment">提交</el-button>
            </div>
          </el-row>
        </div>

        <!-- 评论 -->
        <div class="cmt-list">
          <div class="cmt-item" v-for="(item,index) in cmtList" :key="index">
            <div class="cmt-info">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
              地球发动机
              <i>2019-07-05 5:24</i>
              <span>1</span>
            </div>
            <div class="cmt-content">
              <div class="cmt-new">
                <p class="cmt-message">{{item.content}}</p>
                <div class="cmt-ctrl" @click='handleReply'>
                  <a href="javascript:;">回复</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[2 ,4 , 6, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        total: 0
      },
      commentList: [], //评论数组
      like: 0, //点赞数
      isLike: false,
      // 上传相册的数据
      dialogImageUrl: "",
      dialogVisible: false,
      cmtContent: {
        content: "",
        score: {
          location: 0.0,
          service: 0.0,
          fancility: 0.0,
          all: 0.0
        },
        pics: [], //多张图片
        hotel: 0,
        post: 0,
        follow: 0
      },
      fileList:[] ,
      //分页的数据
      pageIndex: 1,
      pageSize: 2,
      total: 0,
      cmtList:[],

    };
  },

  methods: {
    // 评论
    handleComment() {
      this.$refs.txtare.focus();
    },

    // 点赞事件
    handleLike() {
      const { userInfo } = this.$store.state.user;
      if (!userInfo.token) {
        this.$router.push({
          path: "/user/login/",
          query: {
            id: this.$route.query.id
          }
        });
      } else {
        this.isLike = !this.isLike;
        if (!this.isLike) {
          this.like++;
          return;
        }
      }
    },
    // 多张图片的删除事件
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      const files = fileList.map(v => {
        return v.respones;
      });
      this.cmtContent.pics = files;
    },
    // 图片的预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传多张图片成功后的回调函数
    handleCartSuccess(res, file, fileList) {
      const files = fileList.map(v => {
        return v.respones;
      });
      this.cmtContent.pics = files;
    },
    //分页切换条数的时候触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.getcmtList()
    },
    // 页数切换的时候触发
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getcmtList()
    },
    getcmtList(){
      this.cmtList = this.commentList.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    },
    //回复
    handleReply(){
      this.$refs.txtare.focus();
    },
    //提交评论到后台数据库
    handleSubComment() {
      // 提交数据是要先登录，还有跨域申明
      this.$axios({
        url: "/comments",
        method: "POST",
        data: this.cmtContent,
        // withCredentials: true,
        header: {
          ContentType: 'application / json',
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(123, res);
      });
    }
  },
  mounted() {
    this.$axios({
      url: "hotels/comments",
      method: "GET"
    }).then(res => {
      this.total = res.data.total;
      this.data = res.data;
      const { total, ...data } = res.data;
      this.commentList = data.data;
      this.cmtList = this.commentList.slice(0,2)
      // console.log(this.commentList, 456789);
      const arr1 = [];
      //循环
      const arr = this.commentList.map(e => {
        if (e) {
          arr1.push(e.like);
          this.like += e.like;
          return this.like;
        }
      });
    });
  }
};
</script>

<style scoped lang='less'>
.detailsComment {
  margin-bottom: 20px;
  .commentIcon {
    .ctrl-item {
      margin: 0 20px;
      cursor: pointer;
      i {
        color: orange;
        display: block;
        font-size: 28px;
        text-align: center;
      }
      p {
        color: #999;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
  .cot_wrapper {
    h4 {
      margin-bottom: 20px;
      font-weight: 400;
      font-size: 18px;
    }
    .uploadPictures {
      margin-top: 10px;
    }
    .cmt-list {
      border: 1px solid #ddd;
      margin-top: 40px;
      .cmt-item {
        padding: 20px 20px 5px 20px;
        border-bottom: 1px dashed #ddd;
        &:last-child {
          border-bottom: none;
        }
        .cmt-info {
          color: #666;
          vertical-align: top;
          font-size: 12px;
          img {
            // display: block;
            width: 16px;
            height: 16px;
          }
          i {
            font-style: normal;
            margin-left: 5px;
          }
          span {
            display: block;
            float: right;
          }
        }
        .cmt-content {
          padding-left: 30px;
          .cmt-new {
            .cmt-message {
              margin-top: 10px;
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
      }
    }
  }
  .paging {
    margin-top: 10px;
  }
}
</style>
