<template>
  <div class="container">
      <el-carousel height="700px" >
        <el-carousel-item v-for="(item,index) in imgList" :key="index">
             <div class="main" 
          :style="`background:url(${baseurl}${item.url}) center center no-repeat;
          `"
          > 
            </div>
        </el-carousel-item>
      </el-carousel>
      <div class="content">
      <el-row type="flex" class="tab">
          <span 
          v-for="(item,index) in options" 
          :key="index"
          @click="handletab(index,item.pageUrl)"
          :class="{active:current===index}"
          ><i>{{item.name}}</i> </span>
        </el-row>
        <el-row type="flex" align="middle" class="ipt">
            <input type="text"  
            class="search"
            v-for="(item,index) in options" 
            :key="index" 
            v-model="value"
            v-if="current===index"
            :placeholder="item.placeholder" />
            <i class="el-icon-search" @click="handleSearch(item.pageUrl)"></i>
      </el-row>
      </div>
  </div>
</template>

<script>


export default {
  data(){
    return{
      imgList:[
        {url:"http://157.122.54.189:9095/assets/images/th03.jfif"},
        {url:"http://157.122.54.189:9095/assets/images/th04.jfif"}
      ],
      baseurl:"",
      options: [      // 搜索框tab选项
                {
                    name: "攻略", 
                 	placeholder: "搜索城市", 
                 	pageUrl: "/post?city="
                },
                {
                    name: "酒店", 
                    placeholder: "请输入城市搜索酒店", 
                    pageUrl: "/hotel?city="},
                {
                    name: "机票", 
                    placeholder: "请输入出发地", 
                    pageUrl: "/air"
                }
            ],
      current:0,
      value:""
    }
  },
  mounted(){
    this.$axios({
       url: "/scenics/banners"
    }).then(res=>{
      
      this.imgList=res.data.data
      this.baseurl=res.config.baseURL
    })
  },
  methods:{
    handleSearch(url){
      this.$router.push(url+""+this.value)
    },
    handletab(index,url){
      this.current=index
      if(index===2){
        this.$router.push(url)
      }
    }
  }
}
</script>

<style scoped lang="less">
      .container{
            width: 100%;
            height:700px;
            position: relative;
            .main{
              min-width: 1000px;
              height:700px;
            }
            .content{
              z-index: 9;
              width:550px;
              height:90px;
              position: absolute;
              top:50%;
              left:50%;
              margin-left:-275px;
              margin-top:-45px;
              
              .tab{
                margin: 0;
                height: 45px;
                
                span{
                    display: block;
                    width:80px;
                    height:100%;
                    cursor: pointer;
                     text-align: center;
                     line-height: 45px;
                    border:1px solid rgba(225,225,225,.2);
                    background:rgba(0,0,0,.2);
                    transform: scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);
                    transform-origin: bottom left; 
                    font-size: 16px;
                      color:#fff;
                    &:nth-child(2),&:nth-child(3){
                      margin-left:8px;
                    }
                    i{
                      display:inline-block;
                      width: 40px;
                      height:30px;
                      font-style:normal;
                    }
                }
               
                .active{
                  background: #fcfcfcce;

                  color:#333;
                }
              }
              .ipt{
                 margin: 0;
                height: 45px;
                background:#fff;
                width:100%;
                
                input{
                  outline:none;
                  border:0;
                  padding-left:10px;
                  width:100%;
                  box-sizing: border-box;
                  height: 100%;
                  font-size: 16px;
                }
                i{
                  padding-right:10px;
                  font-size: 18px;
                  font-weight: 600;
                }
              }
            }

      }
</style>
