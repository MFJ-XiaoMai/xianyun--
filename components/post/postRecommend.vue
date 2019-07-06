<template>
  <el-row class="Travel_strategy_recommended">
    <h5>推荐攻略</h5>
    <el-row class="Published_strategy" v-for="(item,index) in postList" :key="index">
      <ul>
        <li>
          <el-row class="Published_strategy_header" type="flex" justify="space-between">
            <el-row class="come_from">
              <i class="el-icon-position"></i>
              <span>
                来自
                <i>{{item.cityName}}</i>
              </span>
            </el-row>
            <el-row class="number_experience">
              <span>
                <span>{{item.watch || 0}}</span>
                蜂蜂体验过
                <i class="el-icon-shopping-cart-2"></i>
              </span>
            </el-row>
          </el-row>
          <el-row class="Spend_Holidays">
            <i>{{item.title}}</i>
            <p>{{item.summary}}</p>
          </el-row>
          <el-row class="Holidays_pic">
            <img v-for="(item1,index1) in item.images" :key="index1" :src="item1" alt />
            <span>{{item.watch || 0}}浏览</span>
          </el-row>
        </li>
      </ul>
    </el-row>
    <el-row type="flex" justify="center" class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      postData: [],
      total: 0,
      postList: [],
      pageSize: 5,
      pageIndex: 0
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.slicePostList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.slicePostList();
    },
    slicePostList() {
      this.postList = this.postData.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    }
  },
  mounted() {
    this.$axios({
      url: "/posts"
    }).then(res => {
      if (res.status == 200) {
        // console.log(res.data.data);
        const { data, total } = res.data;
        this.postData = data;
        this.total = total;
        this.postList = this.postData.slice(0, 5);
      }
    });
  }
};
</script>

<style lang="less" scoped>
.Travel_strategy_recommended {
  margin-left: 90px;
  h5 {
    font-size: 18px;
    color: #333;
    height: 49px;
    line-height: 48px;
    font-weight: normal;
  }
  .Published_strategy {
    box-sizing: border-box;
    border-top: 1px solid #eee;
    // background: #000;
    padding: 20px 0px 30px 10px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
    &:hover .Spend_Holidays > i {
      color: #ff9d00;
    }
    li {
      .Published_strategy_header {
        .come_from {
          font-size: 12px;
          > i {
          }
          span {
            > i {
              color: orange;
              font-style: normal;
            }
          }
        }
        .number_experience {
          border: 1px solid orange;
          padding: 5px 10px;
          font-size: 14px;
          border-radius: 25px;
          > span {
            color: #333;
            span {
              color: orange;
            }
            i {
              color: orange;
            }
          }
        }
      }

      .Spend_Holidays {
        i {
          font-size: 18px;
          font-style: normal;
        }
        p {
          font-size: 14px;
          color: #333;
          margin-top: 15px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3; //需要控制的文本行数
          overflow: hidden;
        }
      }
      .Holidays_pic {
        margin-top: 15px;

        img {
          margin-right: 10px;
          width: 220px;
          height: 130px;
        }
        span {
          line-height: 130px;
          font-size: 12px;
          color: #999;
          float: right;
          padding-left: 30px;
        }
      }
    }
  }
  .pagination {
    margin-bottom: 20px;
  }
}
</style>

