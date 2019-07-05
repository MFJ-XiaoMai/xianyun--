<template>
    <div class="cantainter">
       <div class="main">
           <el-row type="flex" justify="space-between">
               <div class="flights-left">
                    <FLIGHTSFILTERS :data="data" @select="getflightslist"/>
                    <FLIGHTSHEADER/>
                    <div>
                        <FLIGHTSCONTENT
                        v-for="(item,index) in datalist" 
                        :key="index"
                        :data="item"/> 
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="newdata.total">
                        </el-pagination>
                    </div>
               </div>
               <div class="flights-right">
                  <FLIGHTSASIDE @historyInfo="searchHistory"/>
               </div>
           </el-row>
       </div>
    </div>
</template>

<script>
    import FLIGHTSFILTERS from "@/components/air/flightsFilters";
    import FLIGHTSHEADER from "@/components/air/flightsheader";
    import  FLIGHTSCONTENT from "@/components/air/flightscontent";
    import FLIGHTSASIDE from "@/components/air/flightsAside"
export default {
    data(){
        return {
            data:{
                info:{},
                options:{},
                flights:[],
            },
            datalist:[],
            pageIndex:1,
            pageSize:5,
            newdata:{
                info:{},
                options:{},
                flights:[]
            }
        }
    },
    components:{
         FLIGHTSFILTERS,
         FLIGHTSHEADER,
         FLIGHTSCONTENT,
         FLIGHTSASIDE
    },
    methods:{
        handleSizeChange(val) {
        this.pageSize=val;
         this.getflightslist()
      },
      handleCurrentChange(val) {
        this.pageIndex=val;
         this.getflightslist()
      },
      getflightslist(arr){
          if(arr){
              this.pageIndex=1,
              this.newdata.flights=arr,
              this.newdata.total=arr.length
          }
     this.datalist= this.newdata.flights.slice(
            (this.pageIndex-1)*this.pageSize,
            this.pageSize*this.pageIndex)
        
      },
      searchHistory(val){
            this.newdata=val;
            this.data={...val};
            this.datalist=this.newdata.flights;
            this.getflightslist()
      }
     
    },
   
    mounted(){
        this.$axios({
            url:"/airs",
            method:"GET",
            params:this.$route.query
        }).then(res=>{
            // console.log(res.data)
            this.newdata=res.data;
            this.data={...res.data};
            this.datalist=this.newdata.flights;
            this.getflightslist()
        })
    }
   
}
</script>

<style scoped lang="less">
    .cantainter{
        width:100%;
        .main{
            width: 1000px;
            margin:0 auto;
        }
    }
</style>
