<template>
    <div class="flightscontent">
        <div @click="handleshow">
            <el-row 
            class="flightscontent-top"
             type="flex" 
             justify="space-around "
              align="middle">
            <el-col :span="7" class="flightscontent-company" >
                {{data.airline_name}}{{data.flight_no}}</el-col>
            <el-col :span="5" class="flightscontent-airport">
                <span class="flightscontent-airporttime">
                    {{data.dep_time}}</span>
                <span class="flightscontent-airportname">
                    {{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="2" class="flightscontent-time">{{time}}</el-col>
            <el-col :span="5" class="flightscontent-airport">
                <span class="flightscontent-airporttime">
                    {{data.arr_time}}</span>
                <span class="flightscontent-airportname">
                    {{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
            <el-col :span="7" class="flightscontent-ticketprice">
                ￥<span>{{data.base_price}}</span> 起
            </el-col>
            </el-row>
        </div> 
        <el-row
         class="flightscontent-bootom" 
         v-if="isshow"
          type="flex" 
          justify="space-around "  
          align="middle"
          >
            <el-col :span="4" class="flightscontent-recommended">低价推荐</el-col>
            <el-col :span="18" >
                <el-row type="flex" 
                justify="space-around " 
                align="middle"
                class="recommended-Info"
                v-for="(item,index) in data.seat_infos" 
                :key="index">
                    <el-col :span="16">
                       <span class="Economy">{{item.group_name}}</span> 
                       <span> | {{item.supplierName}}</span></el-col>
                    <el-col :span="6"
                     class="recommended-price">
                     ￥{{item.par_price}}
                    </el-col>
                    <el-col :span="4">
                        <el-button 
                        type="warning" 
                        size="minni"
                        @click="handleOrder(data.id,item.seat_xid)">
                        选定</el-button>
                        <span>剩余：{{item.discount}}</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isshow:false,
          
           time:""
        }
    },
    props:{
        data:{
            type:Object,
            default:{} 
        }
    },
    mounted(){
        this.time=this.computedtime()
    },

    methods:{
        handleshow(){
            this.isshow=!this.isshow
        },
        computedtime(){
            const {arr_time,dep_time}=this.data
            let dep=dep_time.split(":");
            let arr=arr_time.split(":");
            if(dep[0]>arr[0]){
                arr[0]+=24
                 const hour=(arr[0]*60+ +arr[1])-(dep[0]*60+ +dep[1]);
            }
            const hour=(arr[0]*60+ +arr[1])-(dep[0]*60+ +dep[1]);
            return `${Math.floor(hour/60)}时${hour%60}分`
        },
        handleOrder(id,seat_xid){
            
            this.$router.push({
                path:"/air/order/",
                query:{
                    id:id,
                    seat_xid:seat_xid
                    }
            })
        }
    }
}
</script>

<style scoped lang="less">
    .flightscontent{
        width:745px;
        text-align: center;
        border:1px solid #ccc;
        margin: 10px auto;
        .flightscontent-top{
            padding-right:0px;
            padding: 20px ; 
            box-sizing: border-box; 
            width:100%;
            border-bottom:1px solid #eee;
            cursor: pointer;
            .flightscontent-company{
                font-size:14px;
            }
            .flightscontent-airport{
                display: flex;
                flex-direction: column;
                justify-content: center;
                .flightscontent-airporttime{
                    color:#000;
                    font-size:26px;
                }
                .flightscontent-airportname{
                    color:#aaa;
                    font-size:13px;
                }
            }
            .flightscontent-time{
                color:#aaa;
                font-size:13px;
                border-bottom:1px solid #eee;
            }
            .flightscontent-ticketprice{
                span{
                    color:orange;
                    font-size:26px;
                }
            }
           
        }
        .flightscontent-bootom{ 
            
            background:#eee;
            .flightscontent-recommended{
               font-size:14px;
            }
            .recommended-Info{
                border-bottom:1px solid #eee;
                padding:10px;
                font-size:12px;
                &:last-child{
                    border-bottom:none;
                }
                 .recommended-price{
                 color:orange;
                font-size:26px;
            }
           .Economy{
               color:seagreen;
           } 
            }
           
        }
    }
</style>
