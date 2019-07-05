<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                 <ORDERFORM  @getseatInfo="handleseatInfo" @getallPrice="handlesetallPrice"/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                   <ORDERASIDE :data="data" :allPrice="allPrice"/>       
            </div>
        </el-row>
    </div>
</template>

<script>
 import ORDERFORM from "@/components/air/orderForm";
 import ORDERASIDE from "@/components/air/orderAside"
export default {
    data(){
        return {
            data:{
                seat_infos: {}
            },
            allPrice:0
        }
    },
    components:{
         ORDERFORM,
         ORDERASIDE,
    },
    methods:{
        handleseatInfo(val){
            this.data=val
        },
        handlesetallPrice(price){
            this.allPrice=price
        }
    },
    mounted(){
       
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>