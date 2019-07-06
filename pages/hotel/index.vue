<template>
    <div class="container">
        <div class="main">
            <HOTELCHECKPRICE @setHotelInfo="getHotelInfo"/>
            <HOTELMAP :data="scenic"/>
        </div>
        
    </div>
</template>

<script>
import HOTELCHECKPRICE from "@/components/hotel/hotelcheckprice"
import HOTELMAP from "@/components/hotel/hotelmap";

export default {
    data(){
        return {
            data:[
               
            ],
            scenic:{
                scenic:[]
            }
        }
    },
    components:{
         HOTELMAP,
         HOTELCHECKPRICE
    },
    methods:{
        getHotelInfo(info){
          
            this.data=info
            this.scenic=this.data[0]
            console.log(this.data)
        }
    },
    mounted(){
       
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
