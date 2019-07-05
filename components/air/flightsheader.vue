<template>
    <div class="flights-header">
         <el-row type="flex" 
            justify="space-around" 
            align="middle" 
            class="flights-header-content">
            <span>航空信息</span>
            <span>起飞时间</span>
            <span>到达时间</span>
            <span>价格</span>
        </el-row>
    </div>
   
</template>

<script>
export default {

}
</script>

<style scoped lang="less">

    .flights-header{
       border:1px solid #ccc;
      margin-top:20px;
      background: #eee;
        .flights-header-content{
            width: 745px;
            height: 38px;
           
            span{
                font-size: 13px;
                color:#666;
            }
        }
        
    }
</style>
