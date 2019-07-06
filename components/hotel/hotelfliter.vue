<template>
    <div>
        <el-row>
            <el-col :span="5">
                <el-row>
                    <span>价格</span>
                    <span>0-{{price}}</span>
                </el-row>
                <div>
                    <el-slider v-model="price"></el-slider>
                </div>
                
            </el-col>
            <el-col :span="5">
                <el-row></el-row>
                
            </el-col>
            <el-col :span="5"></el-col>
            <el-col :span="5"></el-col>
            <el-col :span="5"></el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            price:4000
        }
    }
}
</script>

<style>

</style>
