<template>
    <div class="container">
        <div class="main">
            <HOTELCHECKPRICE @setHotelInfo="getHotelInfo"/>
            <HOTELMAP :data="scenic" :location="data"/>
            <HOTELFLITER @fliterdata="getdatalist" :data="newdata"/>
            <div
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(225, 225, 225, .8)">
                <HOTELLIST 
                v-for="(item,index) in datalist" 
                :key="index"
                :data="item"/>
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageIndex"
                    :page-sizes="[4, 6, 8,10 ]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="data.length">
                </el-pagination>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import HOTELCHECKPRICE from "@/components/hotel/hotelcheckprice";
import HOTELMAP from "@/components/hotel/hotelmap";
import HOTELFLITER from "@/components/hotel/hotelfliter";
import HOTELLIST from "@/components/hotel/hotellist"
export default {
    data(){
        return {
            data:[
               
            ],
            newdata:[],
            datalist:[],
            scenic:{
                scenic:[]
            },
            loading:false,
            pageIndex:1,
            pageSize:4,
        }
    },
    components:{
         HOTELMAP,
         HOTELCHECKPRICE,
          HOTELFLITER,
           HOTELLIST 
    },
    methods:{
        getHotelInfo(info){
            this.data=info;
            this.newdata=[...info]
            this.scenic=this.data[0]
            console.log(this.data)
        },
        handleSizeChange(val) {
        this.pageSize=val;
        this.getdatalist()
      },
      handleCurrentChange(val) {
       this.pageIndex=val
       this.getdatalist()
      },
    //   得到页面展示数据
        getdatalist(val){
            if(val){
                this.data=val;
                this.newdata=[...val]
            }
            this.datalist=this.data.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
        }
    },
    watch:{
        loading(){
            setTimeout(()=>{
                this.loading=false
            },1000)
             this.getdatalist()
        },
        data(){
            this.loading=true;
           
        }
    },
    mounted(){
       this.$axios({
           url:"/hotels",
              method:"GET",
              params:{
                  city:74
              }
       }).then(res=>{
            this.data=res.data.data
            this.scenic=this.data[0]
            this.getdatalist()
       })
    }
}
</script>

<style scoped lang="less">
    .container{
        width:100%;
        min-width: 1000px;
        .main{
            width: 1000px;
            margin: 0 auto;
        }
    }

</style>
