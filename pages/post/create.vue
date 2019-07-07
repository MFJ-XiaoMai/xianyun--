<template>
  <div class="create">
    <el-form class="create-left" :rules="rules" ref="form" :model="form">
      <div class="create-title">
        <h2>发表新攻略</h2>
        <p class="create-desc">分享你的个人游记，让更多人看到哦！</p>
      </div>

      <el-form-item class="el-input">
        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
      </el-form-item>

      <section class="contain-editor">
        <div
          class="quill-editor"
          :content="content"
          @change="onEditorChange($event)"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          v-quill:myQuillEditor="editorOption"
        ></div>
      </section>

      <!-- <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="textarea"></el-input> -->

      <el-form-item class="cheack-city">
        <span>选择的城市</span>
        <el-input v-model="form.city" placeholder="请搜索游玩城市" style="width:200px" class="search-city"></el-input>
      </el-form-item>

      <el-row class="submit-button">
        <el-button type="primary" @click="handleFaBu">发布</el-button>
        <span class="submit-side">
          或者
          <el-button type="text" @click="handleCaoGao" class="caogao">保存到草稿</el-button>
        </span>
      </el-row>
    </el-form>
    <div class="create-right">
      <span class="create-right-title">草稿箱（ {{form.id}} ）</span>
      <el-row v-for="(item, index) in caogao" :key="index">
        <span @click="handleChange(index)"  :v-model="index" class="caogao">{{item.title}}</span>
        <span class="iconfont el-icon-edit tubiao"></span>
        <p>2019-07-07</p>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      caogao: [],
      wenzhang: [],
      form: {
        title: "",
        textarea: "",
        city: "",
        id: "",
        index:0
      },
      rules: {
        city: [{ required: true, message: "请输入城市名", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      },
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            ["link", "image"]
          ]
        }
      }
    };
  },

  methods: {
    handleChange(index) {
      const localPost = JSON.parse(localStorage.getItem("posts-caogao"));
      this.form.title = localPost[index].title;
      this.content = localPost[index].content;
      this.form.city = localPost[index].city;
    },
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html;
    },
    handleFaBu() {
      const token = this.$store.state.user.userInfo.token;
      if (!token) {
        this.$message.success("请先去登录!");
        return;
      }
      const rules = {
        title: {
          value: this.form.title,
          message: "请输入主题"
        },
        city: {
          value: this.form.city,
          message: "请输入出发城市"
        }
      };
      let valid = true;
      Object.keys(rules).forEach(v => {
        if (!valid) return;
        if (!rules[v].value) {
          this.$message.warning(rules[v].message);
          valid = false;
        }
      });
      if (rules.title.value&& rules.city.value) {
        this.wenzhang.unshift({
          content: this.content,
          city: this.form.city,
          title: this.form.title
        });
        localStorage.setItem("posts", JSON.stringify(this.wenzhang));
      }
      const data = {
        content: this.content,
        city: this.form.city,
        title: this.form.title,
        destCode: this.destCode
      };
      const {
        user: { userInfo }
      } = this.$store.state;
      if (rules.title.value&& rules.city.value) {
      this.$axios({
        url: "posts",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${userInfo.token || "NO TOKEN"}`
        }
      }).then(res => {
        const { status, message } = res.data;
        if (status == 0) {
          this.$message.success(message);
        }
        this.form.city = "";
        this.form.title = "";
        this.content = "";
      });
      }
      this.caogao.splice(this.index,1)
      localStorage.removeItem("posts-caogao")
      this.form.id = this.caogao.length;
    },
    handleCaoGao() {
      const token = this.$store.state.user.userInfo.token;
      console.log(token);
      if (!token) {
        this.$message.success("请先去登录!");
        return;
      }
      const rules = {
        title: {
          value: this.form.title,
          message: "请输入主题"
        },
        city: {
          value: this.form.city,
          message: "请输入出发城市"
        }
      };
      let valid = true;
      Object.keys(rules).forEach(v => {
        if (!valid) return;
        if (!rules[v].value) {
          this.$message.warning(rules[v].message);
          valid = false;
        }
      });
      if (!valid) {
        return;
      }
      if (rules.title.value && rules.city.value) {
        this.caogao.unshift({
          content: this.content,
          city: this.form.city,
          title: this.form.title
        });
        localStorage.setItem("posts-caogao", JSON.stringify(this.caogao));
        this.form.id = this.caogao.length;
      }
    }
  },
  mounted() {
    this.caogao = JSON.parse(localStorage.getItem("posts-caogao") || `[]`);
    this.form.id = this.caogao.length;
  }
};
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
    .contain-editor {
      // margin-top: 10px;
      .quill-editor {
        min-height: 200px;
        height: 450px;
        max-height: 600px;
        overflow-y: auto;
      }
    }
    .cheack-city {
      margin-top: 20px;
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
    color:orangered;
    padding-left: 50px;
    .caogao{
      cursor:pointer;
      color:palegreen;
      /deep/ .tubiao{
        color: palegreen
      }
    }
  }
}
</style>
