<template>
  <div class="container">
    <el-row class="strategy_header" type="flex">
      <PostNavAside />
      <el-row class="strategy_carousel">
        <el-carousel trigger="click" height="340px">
          <el-carousel-item v-for="item in img" :key="item">
            <img :src="item" alt />
          </el-carousel-item>
        </el-carousel>
      </el-row>
    </el-row>

    <el-row class="strategy_middle" type="flex" justify="space-between">
      <el-row class="Travel_strategy_navigation">
        <h5>旅游攻略导航</h5>
        <el-row class="area_theme" type="flex">
          <span>
            国内
            <i class="el-icon-caret-bottom"></i>
          </span>
          <span>
            国外
            <i class="el-icon-caret-bottom"></i>
          </span>
          <span>
            主题
            <i class="el-icon-caret-bottom"></i>
          </span>
        </el-row>
        <el-row class="specific_name">
          <ul>
            <li class="showDate_downNum">
              <img
                src="https://b4-q.mafengwo.net/s9/M00/B7/67/wKgBs1eIpuKAWMIqAAX50SJdFGY72.jpeg?imageMogr2%2Fthumbnail%2F%21130x184r%2Fgravity%2FCenter%2Fcrop%2F%21130x184%2Fquality%2F90"
                alt
              />
              <p>更新日期:2016-07-15</p>
              <span>
                <i></i>1269097人下载
              </span>
            </li>
            <li>
              <span>2</span>
              <a href="#">东京</a>
            </li>
            <li>
              <span>3</span>
              <a href="#">京都</a>
            </li>
            <li>
              <span>4</span>
              <a href="#">日本</a>
            </li>
            <li>
              <span>5</span>
              <a href="#">西安</a>
            </li>
            <li>
              <span>6</span>
              <a href="#">成都</a>
            </li>
            <li>
              <span>7</span>
              <a href="#">北京</a>
            </li>
            <li>
              <span>8</span>
              <a href="#">重庆</a>
            </li>
            <li>
              <span>9</span>
              <a href="#">台湾</a>
            </li>
            <li>
              <span>10</span>
              <a href="#">青岛</a>
            </li>
          </ul>
        </el-row>
      </el-row>
      <PostRecommend />
    </el-row>
  </div>
</template>

<script>
import PostNavAside from "@/components/post/postNavAside.vue";
import PostRecommend from "@/components/post/postRecommend.vue";
export default {
  data() {
    return {
      img: [
        "https://b4-q.mafengwo.net/s12/M00/1F/F1/wKgED1uHx-2AVONCAASTAwl30cw73.jpeg",
        "https://n2-q.mafengwo.net/s11/M00/3D/3F/wKgBEFtrlBWAUHczAAR1Jh3BMT410.jpeg",
        "https://b2-q.mafengwo.net/s12/M00/D4/09/wKgED1vpIAiAI6D9AAZ72-z4yZw188.png",
        "https://p3-q.mafengwo.net/s11/M00/4A/E0/wKgBEFrQBqeAYyjMAAURcw8MxG470.jpeg",
        "https://n3-q.mafengwo.net/s13/M00/03/30/wKgEaVyu94SAIqDcAAheevdYPB4887.png"
      ]
    };
  },
  components: {
    PostNavAside,
    PostRecommend
  },
  methods: {}
};
</script>

<style lang="less">
.container {
  width: 1000px;
  margin: 0 auto;
  li {
    list-style: none;
  }

  .strategy_header {
    margin-top: 15px;
    height: 350px;

    .strategy_carousel {
      flex: 1;
      margin-left: 30px;
      height: 700px;
      img {
        border: 0 none;
      }
    }
  }
  .strategy_middle {
    margin-top: 10px;

    .Travel_strategy_navigation {
      width: 170px;
      h5 {
        font-size: 16px;
        color: #333;
        height: 50px;
        border-bottom: 1px solid #eee;
        line-height: 48px;
        font-weight: normal;
      }
      .area_theme {
        width: 100%;
        padding: 15px 0px;
        border-bottom: 1px solid #eee;
        > span {
          flex: 1;
          font-size: 14px;
          text-align: center;
          margin: 0 -2px;
          color: #666;
          i {
          }
        }
      }
      .specific_name {
        ul {
          li {
            border-bottom: 1px solid #eee;
            padding: 15px 0;
            font-size: 16px;
            a {
              font-size: 14px;
              &:hover {
                color: #ff9d00;
                text-decoration: underline #ff9d00;
              }
            }
            span {
              color: #ff9d00;
              font-size: 18px;
              margin-right: 8px;
            }
          }
          .showDate_downNum {
            p {
              font-size: 12px;
              color: #666;
              //   margin-left: 5px;
              margin: 5px 0 5px 5px;
            }
            > span {
              background: #ebebeb;
              widows: 130px;
              height: 24px;
              font-size: 12px;
              color: #666;
              margin-left: 7px;
              padding: 3px 15px 3px 20px;
              border-radius: 25px;
              i {
                width: 24px;
                height: 24px;
                display: block;
                position: absolute;
                background: url(http://images.mafengwo.net/images/gonglve/new-gl-icon6.png) -20px -90px
                  no-repeat;
              }
            }
          }
        }
      }
    }
  }
}
</style>

