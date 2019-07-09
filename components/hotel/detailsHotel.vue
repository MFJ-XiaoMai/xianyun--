<template>
  <div class="detailsHotel">
    <div class="hotel">
      <!-- 酒店的信息：酒店名、地址 -->
      <el-row class="hotelHeader">
        <div class="crumbs">
          {{data.breadcrumb}}
        </div>
        <el-row type="flex" 
        class="hotelName" 
        justify="flex-start">
          <h4>{{data.name}}</h4>
          <span v-for="(item,index) in crown"
          :key="index"
          v-html="item" style="color:#f90">
          </span>
        </el-row>
        <p>{{data.alias}}</p>
        <div class="hotelAddress">
          <i class="iconfont iconlocation"></i>
          {{data.address}}
        </div>
      </el-row>
      <!-- 酒店的图片 -->
      <el-row class="hotelPicture">
        <el-col :span="16" >
          <div class="grid-content bg-purple" 
          @click='handleBigPicture'
          >
            <img
              height="360"
              width="640"
              :src="`http://157.122.54.189:9093/images/hotel-pics/${this.num}.jpeg`"
              alt="得月楼饭店"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <el-row class="list-item">
            <el-col :span="12" v-for='(item,index) in src_url'
            :key='index' >
              <a href="javascript:void(0)" @click='handleSmallPicture(index)'>
                <img
                  width="160"
                  :src="`http://157.122.54.189:9093/images/hotel-pics/${item.url}`"
                  alt="得月楼饭店"
                />
              </a>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 酒店的价格 -->
      <el-table :data="data.products" style="width: 100%" class="hotelPrice">
        <el-table-column label="价格来源" width="420" >
          <el-row slot-scope="scope">
              <span style="margin-left: 10px" >{{scope.row.name }}</span>
          </el-row>
        </el-table-column>

        <el-table-column label="低价房型" width="420">
          <template slot-scope="scope">
              <p>{{ scope.row.bestType }}</p>
          </template>
        </el-table-column>
        <el-table-column label="最低价格/每晚" class='floorPrice'>
          <template slot-scope="scope">
            <span style="color: #f90;">￥ {{scope.row.price }}</span> 起 
            <i class="el-icon-arrow-right height-light" style="color: #f90;"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:{
        type:Object,
        default:{}
    }
  },
  data() {
    return { 
      src_url:[
        {url:"1.jpeg"},
        {url:"2.jpeg"},
        {url:"3.jpeg"},
        {url:"4.jpeg"},
        {url:"5.jpeg"},
        {url:"6.jpeg"}, 
      ],
      num:1,
      smallPictureIndex:0,
      arr:[], //存皇冠
    };
  },

  //监听皇冠的等级
  computed:{
    // crown皇冠
    crown(){
      if(this.data.hotellevel){
        const crownNums = this.data.hotellevel.level;
        for(var i=0;i<crownNums;i++){
          this.arr.push('<i class="iconfont iconhuangguan"></i>')
        }
        var newArr = this.arr.map(v=>{
          return v
        })
        return newArr
      }
    }
  },

  methods:{
    handleBigPicture(){
      if(this.num>=1 && this.num<6){
        this.num++
      }else{
        this.num = 1
      }
      
    },
    handleSmallPicture(index){
      this.num = index+1;
    }
  },
};
</script>

<style scoped lang='less'>
.detailsHotel {
  .hotel {
    .hotelHeader {
      .crumbs {
        padding: 20px 0;
      }
      .hotelName {
        h4 {
          font-weight: 400;
          font-size: 24px;
        }
        span {
          display: block;
          padding-top: 10px;
          margin-left: 8px;
          .iconfont {
            color: #f90;
            font-size: 16px;
          }
        }
      }
    }
    .hotelPicture {
      padding: 40px 0;
      .list-item {
        .el-col {
          margin-bottom: 10px;
          &:nth-child(2n) {
            padding-left: 7px;
          }
        }
      }
    }
    .hotelPrice {
      margin: 40px 0;
    }
  }
}
</style>
