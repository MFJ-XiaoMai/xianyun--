<template>
    <div class="details"
    >
        <el-row type="flex" justify="space-between" >
            <el-col :span="7">
                <a href="javascript:;" @click="handletoDetails">
                     <img :src="data.photos" alt="" width="320px" height="210px">
                </a>
            </el-col>
            <el-col :span="9" class="hotel-details">
                 <h2 class="hotel-title" >{{data.name}}</h2>
                <div class="hotel-type">
                    <span>{{data.alias}}</span>
                    <span class="hotel-type-tip" 
                    v-for="(item) in star" 
                    :key="item"
                    ><i class="iconfont iconhuangguan"></i>
                    </span>
                    <span>{{data.hoteltype.name}}</span>
                </div>
                <el-row type="flex" class="hotel-level">
                   <el-col class="hotel-evaluation" :span="10">
                        <span><i class="el-icon-star-on"></i></span>
                        <span><i class="el-icon-star-on"></i></span>
                        <span><i class="el-icon-star-on"></i></span>
                        <span><i class="el-icon-star-on"></i></span>
                        <span><i class="el-icon-star-on"></i></span>
                        <span class="hotel-evaluation-num">{{data.stars}}</span>
                   </el-col>
                   <el-col class="hotel-evaluation" :span="7">
                       <span class="hotel-evaluation-num">{{data.very_bad_remarks+data.very_good_remarks}}</span>
                       <span class="hotel-evaluation-text">条评价</span>
                   </el-col>
                   <el-col class="hotel-evaluation" :span="7">
                       <span class="hotel-evaluation-num">{{data.visits_total}}</span>
                       <span class="hotel-evaluation-text">篇游记</span>
                   </el-col>
                </el-row>
                <el-row type="flex">
                    <span><i class="iconfont iconlocation"></i></span>
                    <span>位于: {{data.address}}</span>
                </el-row>
            </el-col>
            <el-col class="hotel-link" :span="5" >
                    <a href="javascript:;" 
                    v-for="(item,index) in data.products" 
                    :key="index"
                     >
                        <el-row type="flex" justify="space-between" class="link">
                            <div class="hotel-link-name">
                                <span>{{item.name}}</span>
                            </div>
                            <div class="hotel-link-price">
                                <span class="hotel-price">￥{{item.price}}</span>
                                <span>起</span>
                                <span><i class="el-icon-arrow-right"></i></span>
                            </div>
                        </el-row>
                    </a>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            star:[],
            active:[],
            loading:false,
        }
    },
    props:{
        data:{
            type:Object,
            default:{
              
            }
        }
    },
    methods:{
        handletoDetails(){
            this.$router.push({
                path:"/hotel/details",
                query:{
                    id:this.data.id
                }
            })
        }
    },
    mounted(){
        if(this.data.hotellevel==null) return ;
        for(var i=0;i<this.data.hotellevel.level||0;i++){
            this.star.push(i)
        }
    }
}
</script>

<style scoped lang="less">
    .details{
        color:#777;
        font-size:14px;
        .hotel-details{
            .hotel-title{
                color:#000;
                font-weight: 400;
                font-size:26px;
            }
            .hotel-type{
               
                .hotel-type-tip{
                    i{
                        color:orange;
                    }
                }

            }
            .hotel-level{ 
                margin:10px auto;
                .hotel-evaluation{
                    .hotel-evaluation-num{
                        color:orange;
                    }
                    .hotel-evaluation-text{
                    font-size:16px;
                    color:#333;
                }
                }
            }
        }
        .hotel-link{
            .link{
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
                box-sizing: border-box;
                margin:10px auto;
                .hotel-link-name{

                }
                .hotel-link-price{
                      .hotel-price{
                    color:orange;
                    font-size: 16px;
                }
                
                }
              
            }
           
        }
    }
</style>
