<template>
   <div class="aside">
      <div class="aside-top">
          <el-row class="aside-top-cantainer" type="flex" justify="space-around" align="middle">
              <div class="aside-top-content">
                  <span class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;" ></span>
                  <span>航协认证</span>
              </div>
              <div class="aside-top-content">
                  <span class="iconfont iconbaozheng" style="color:green;"></span>
                  <span>出行保证</span>
              </div>
              <div class="aside-top-content">
                  <span class="iconfont icondianhua" style="color:#409EFF;"></span>
                  <span>7x24</span>
              </div>
          </el-row>
          <div class="aside-top-tel">
              <span>免费客服电话：4006345678转2</span>
          </div>
          
      </div>
      <div class="aside-bottom">
          <div class="aside-bottom-header">
              <span>历史查询</span>
          </div>
          <el-row 
          class="aside-bottom-content"
          v-for="(item,index) in history" 
          :key="index"
          type="flex"
          justify="space-between"
            align="middle">
              <div class="aside-bottom-content-Info">
                  <span>{{item.departCity}}&nbsp-&nbsp{{item.destCity}}</span>
                  <span>{{item.departDate}}</span>
              </div>
              <el-button 
              @click="handlesearchHistory(index)"
              type="warning" 
              size="mini" round>
              选择</el-button>
          </el-row>
      </div>
   </div>
</template>

<script>
export default {
    data(){
        return {
            history:[]
        }
    },
    props:{
        
    },
    methods:{
        handlesearchHistory(index){
            this.$axios({
                url:"/airs",
                method:"GET",
                params:this.history[index]
            }).then(res=>{
                this.$emit("historyInfo",res.data)
            })
        }
    },
    mounted(){
        this.history=JSON.parse(localStorage.getItem("airs")) 
    }
}
</script>

<style scoped lang="less">
    .aside{
         margin: 20px;
        .aside-top{
            width:240px;
            border:1px solid #ccc;
           
            .aside-top-cantainer{
                .aside-top-content{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                    span{
                        &:nth-child(1){
                            font-size: 36px;
                        }
                        &:nth-child(2){
                            font-size: 13px;
                        }
                    }
                }
               
            } 
            .aside-top-tel{
                     padding: 10px; 
                     font-size: 14px;
                     background:#eee;
                }
        }
        .aside-bottom{
            width:240px;
            margin-top:10px;
            border:1px solid #ccc;
            .aside-bottom-header{
                padding: 10px;
            }
            .aside-bottom-content{
                padding: 10px;
                cursor: pointer;
                .aside-bottom-content-Info{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    font-size:14px;
                    span{
                        &:nth-child(2){
                            font-size: 13px;
                            color:#aaa;
                            padding-top:5px;
                        }
                    }
                }
            }
        }
    }
</style>
