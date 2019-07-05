<template>
    <div class="login_from">
        <el-form :rules="rules" ref="form" :model="form" >
            <el-form-item  prop="username">
                <el-input placeholder="用户名/手机" v-model="form.username" ></el-input>
            </el-form-item>
            <el-form-item prop="captcha">
                <el-input placeholder="请输入验证码" v-model="form.captcha">
                    <template slot="append">
                       <span class="getchecknum" @click="handlegetchecknum">获取验证码</span> 
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item  prop="nickname">
                <el-input placeholder="昵称" v-model="form.nickname" ></el-input>
            </el-form-item>
             <el-form-item prop="password">
                <el-input  placeholder="密码" show-password type="password" v-model="form.password"></el-input>
            </el-form-item>
             <el-form-item prop="checkword">
                <el-input  placeholder="确认密码" show-password  type="checkword" v-model="form.checkword"></el-input>
            </el-form-item>
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
         var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return{
            rules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                ],
                checkword: [
                    { validator:validatePass, trigger: 'blur' },
                ],

            },
            form:{
                password:"",
                username:"",
                checkword:"",
                nickname:"",
                captcha:"",
            }
        }
    },
    methods:{
        submitForm(){
            this.$refs.form.validate((valid)=>{
                const {checkword,...props}=this.form
                   if (valid) {
                       this.$axios({
                           url:"/accounts/register",
                           method:"POST",
                           data:props
                       }).then(res=>{
                          this.$message.success("账号注册成功！！！")
                          const timer=setTimeout(()=>{
                             location.reload()
                          },2000)
                       })
                   }
                }
            )
        },
        handlegetchecknum(){
            this.$axios({
                url:"/captchas",
                method:"POST",
                data:{
                   tel:this.form.username
                }
            }).then(res=>{
                this.$message.success("验证码："+res.data.code)
            })
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
       .getchecknum{
          
           cursor: pointer;
          
       }
    }
</style>
