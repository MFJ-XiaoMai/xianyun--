<template>
    <div class="hotelpart">
        <el-row>
            <div class="content-left">
                <el-row type="flex" class="content-area">
                    <el-col :span="2">
                        <span >区域：</span>
                    </el-col>
                    <el-col :span="16">
                        <div>
                            <a href="#">全部</a>
                            <a href="javascript:;"
                            v-for="(item,index) in data.scenic" 
                            :key="index"
                            >{{item.name}}</a>
                            <a href="javascript:;">
                                <i class="el-icon-d-arrow-right"></i>
                                <span>等43个区域</span>
                            </a>
                        </div>
                    </el-col>
                  
                </el-row>
                 <el-row>
                    <span>攻略：</span>
                    <p></p>
                </el-row>
                <el-row type="flex">
                    <div>
                        <span>均价：</span>
                        <el-tooltip 
                        class="item"
                        effect="dark" 
                        content="Bottom Left 提示文字"
                        placement="top-start">
                            <span>?</span>
                        </el-tooltip>
                    </div>
                    <div>
                        <el-row type="flex">
                            <div>
                                <el-tooltip 
                                class="item" 
                                effect="dark"
                                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                                 placement="bottom-start">
                                   <span>?</span>
                                    <span>￥</span>
                                </el-tooltip>
                            </div>
                            <div>
                                <el-tooltip 
                                class="item"
                                effect="dark" 
                                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                                placement="bottom-start">
                                   <span>?</span>
                                    <span>￥</span>
                                </el-tooltip>
                            </div>
                            <div>
                                <el-tooltip 
                                class="item" 
                                effect="dark" 
                                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" 
                                placement="bottom-start">
                                   <span>?</span>
                                    <span>￥</span>
                                </el-tooltip>
                            </div>
                        </el-row>
                    </div>
                </el-row>
            </div>
            <div>

            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    }
}
</script>

<style scoped lang="less">
    .hotelpart{
        font-size:14px;
        margin-top:20px;
        .content-left{
           width:580px;
           
            .content-area{
                height:60px;
                overflow: hidden;
                a{
                    margin-right:20px;
                    i{
                        transform: rotate(270deg);
                        color: #f90;
                    }
                }
            }
        }
       
    }
</style>
