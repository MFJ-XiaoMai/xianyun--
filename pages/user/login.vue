<template>
    <div class="container">
       <el-row type="flex" align="middle" class="box" justify="center" >
           <div class="content">
               <span 
               v-for='(item,index) in ["登录","注册"]'  
               :key="index"
               :class="{btncss:current===index}" 
               @click="handleclick(index)">
               {{item}}
               </span>
                <Login v-if="current===0"/>
                <Register v-else/>
           </div>
       </el-row>
    </div>
</template>

<script>
import Login from "@/components/user/login.vue"
import Register from "@/components/user/register.vue"
export default {
    data(){
        return{
            current:0
        }
        
    },
    components:{
        Login,
        Register
    },
    methods:{
        handleclick(index){
            
            this.current=index
        }
    }
}
</script>

<style scoped lang="less">
    .container{
        width: 100%;
        height:700px;
        background:url(http://157.122.54.189:9095/assets/images/th03.jfif) no-repeat center center ;
        min-width:1000px;
        .box{ 
            width:100%;
            height:100%;
            .content{
                background:#fff;
            span{
                display:inline-block;
                width: 200px;
                height:50px;
                font-size:16px;
                text-align: center;
                line-height: 50px;
                background: rgba(255, 255, 255, 0.774); 
                box-sizing: border-box;
                border-top:3px solid #fff;
                cursor: pointer;
            }
            .btncss{
                border-top:3px solid orange;
                color:orange;
                background: #fff;
            }
        }
        }
        
    }
</style>
