<template>
    <div class="login_from">
        <el-form :rules="rules" ref="form" :model="form" >
            <el-form-item  prop="username">
                <el-input placeholder="用户名/手机" v-model="form.username" ></el-input>
            </el-form-item>
             <el-form-item prop="password">
                <el-input  placeholder="密码" show-password type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-row type="flex" justify="end" class="forgetpwd">
                <span >忘记密码？</span>
            </el-row  >
            <el-row type="flex" justify="space-around">
                <el-form-item>
                    <el-button type="primary" @click="submitForm">立即登录</el-button>
                    <el-button @click="resetForm" class="">重置</el-button>
                </el-form-item>
            </el-row>
            
        </el-form>
   </div>
</template>

<script>
export default {
    data(){
        return{
            rules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            },
            form:{
                password:"",
                username:"",
            }
        }
    },
    methods:{
        submitForm(){
            this.$refs.form.validate((valid)=>{
                   if (valid) {
                this.$store.dispatch("user/login",this.form).then(res=>{
                    this.$message.success("登录成功，正在跳转。。。")
                 const timer=setTimeout(()=>{
                     if(this.$route.query.id){
                         this.$router.back()
                     }else{
                         this.$router.push("/")
                     }
                     clearTimeout(timer)
                 },2000)
                })
            }
            }
            )
        },
        resetForm(){
            this.$refs.form.resetFields();
        }
    }
}
</script>

<style scoped lang="less">
    .login_from{
        box-sizing: border-box;
        padding: 20px;
        .forgetpwd{
            color:#409eff;
            font-size: 14px;
            box-sizing: border-box;
            padding-bottom: 5px;
            cursor: pointer;
        }
    }
</style>
