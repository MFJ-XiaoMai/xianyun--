<template>
    <div class="containter">
       <div class="main">
           <el-row type="flex" class="airport" align="middle">
                <span class="iconfont iconfeiji airport-tip"></span><span>国内机票</span>
           </el-row>
           <el-row type="flex" justify="space-between" class="airport-spacilsell">
                <div class="airport-form">
                    <span 
                    v-for='(item,index) in info'  
                    :key="index"
                    :class="{btncss:current===index,}" 
                    @click="handleclick(index)">
                    <i :class="item.icon"></i>
                    {{item.xingcheng}}
                    </span>
                    <div class="airport-form-content">
                        <el-form 
                        :model="form"  >
                        <!-- 组件自带校验规则 -->
                        <!-- :rules="rules" 
                         ref="form"  -->
                            <el-form-item prop="departCity">
                                <i>出发城市</i>
                                <el-autocomplete
                                v-model="form.departCity"
                                :fetch-suggestions="querydepartSearchAsync"
                                placeholder="请搜索出发城市"
                                @select="handledepartSelect"
                                ></el-autocomplete>
                            </el-form-item>
                             <el-form-item prop="destCity">
                                <i>到达城市</i>
                                <el-autocomplete
                                v-model="form.destCity"
                                :fetch-suggestions="querydestSearchAsync"
                                placeholder="请搜索到达城市"
                                @select="handledestSelect"
                                ></el-autocomplete>
                            </el-form-item>
                            <el-form-item prop="departDate">
                                <i>出发时间</i>    
                                <el-date-picker
                                v-model="form.departDate"
                                value-format="yyyy-MM-dd"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                             <el-form-item>
                                 <el-row type="flex" justify="end">
                                    <el-button type="primary" @click="submitForm" style="width:200px;">立即搜索</el-button>
                                    <el-button @click="resetForm">重置</el-button>
                                 </el-row>
                                
                            </el-form-item>
                        </el-form>
                        <span class="airport-huan" @click="handlechange"></span>
                        
                    </div>
                </div>
                <div class="airport-img">
                    <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt="">
                </div>
            </el-row>
            <el-row class="airport-server" type="flex" align="middle">
                <el-col :span="8" >
                     <el-row type="flex" align="middle" justify="center">
                        <i class="iconfont iconweibiaoti-_huabanfuben" style="color:#409EFF;" ></i>
                        <span >100%航协认证</span>
                     </el-row>
                </el-col>
                <el-col :span="8" >
                    <el-row type="flex" align="middle" justify="center">
                    <i class="iconfont iconbaozheng" style="color:green;" ></i>
                    <span >出行保证</span>
                     </el-row>
                </el-col>
                <el-col :span="8" >
                    <el-row type="flex" align="middle" justify="center">
                        <i class="iconfont icondianhua" style="color:#409EFF;" ></i>
                        <span >7x24小时服务</span>
                    </el-row> 
                </el-col>
            </el-row>
            <el-row type="flex" class="ticket" align="middle">
                <span class="iconfont icontejiajipiao specil-ticket"></span><span>特价机票</span>
           </el-row>
           <el-row type="flex"  class="ticket-img">
               <div v-for="(item,index) in ticketInfo" 
               :style="`background:url(${item.cover}) `"
               class="ticket-bgimg"
               @click="handleToflights(item)"
               :key="index">
                    <div class="ticket-price">
                        <el-row  type="flex" justify="space-between">
                            <span class="ticket-city">{{item.departCity+"-"+item.destCity}}</span>
                            <span class="ticket-spacile-price">￥{{item.price}}</span>
                        </el-row>
                    </div>
                   
               </div>
           </el-row>
       </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            current:0,
            info:[
                {xingcheng:"单程",icon:"iconfont icondancheng"},
                {xingcheng:"往返" ,icon:"iconfont iconshuangxiang"}
            ],
            // rules:{
            //     departCity:[
            //          { required: true, message: '请输入出发城市', trigger: 'blur' },
            //     ],
            //      departDate:[
            //          { required: true, message: '请输入出发日期', trigger: 'blur' },
            //     ],
            //      destCity:[
            //          { required: true, message: '请输入到达城市', trigger: 'blur' },
            //     ]
            // },
            form:{
                departCity:"",
                departCode: "",
                departDate:"",
                destCity:"",
                destCode: "", 
            },
            pickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            shortcuts: [{
                text: '今天',
                onClick(picker) {
                picker.$emit('pick', new Date());
                }
            }, {
                text: '昨天',
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
                }
            }, {
                text: '一周前',
                onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
                }
            }]
            },
            ticketInfo:[]
        }
        
    },
     methods:{
        //  tab栏的切换
        handleclick(index){  
            this.current=index
            if(index===1){
               this.$confirm("暂不支持往返功能。。。", '提示', {
                            confirmButtonText: "返回",
                            showCancelButton: false,
                            type: 'warning'
                        })  
            }
        },
        // 跳转机票列表页面,同时传值过去
        submitForm() {
            // this.$refs.form.validate((valid) => {      
            // if (valid) {
            //        this.$router.push({
            //             path:"/air/flights",
            //             query:this.form
            //        })
            //     } 
            // })
            const rulers={
                departCity:[
                     { value:this.form.departCity, message: '请输入出发城市', },
                ],
                 destCity:[
                     { value:this.form.destCity, message: '请输入到达城市', },
                ],
                 departDate:[
                     { value:this.form.departDate, message: '请输入出发日期',  },
                ],
            };
            let flag=true
            Object.keys(rulers).forEach(valid=>{
                if (!flag) return;
                const item=rulers[valid]
                if(!item[0].value){
                    flag=false;
                    this.$confirm(item[0].message, '提示', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'warning'
                        })
                }
            })
            const airs=JSON.parse(localStorage.getItem("airs")||`[]`)
            airs.push(this.form)
            localStorage.setItem("airs",JSON.stringify(airs))
            if(flag){
                this.$router.push({
                    path:"/air/flights",
                    query:this.form
                })
            }
        },
        // 交换出发城市和目的地城市信息
        handlechange(){
            const { departCity, departCode }=this.form
            const { destCity, destCode, }=this.form
            this.form.departCity=destCity
            this.form.departCode=destCode
            this.form.destCity=departCity
            this.form.destCode= departCode
        },
        resetForm() {
            this.$refs.form.resetFields();
        },
         //   在出发城市输入框中输值是触发
    async querydepartSearchAsync(queryString, cb) {
       const arr= await this.getquerysearchcity(queryString)
         if(arr.length>1){
             this.form.departCity=arr[0].value
             this.form.departCode=arr[0].sort
         }
        cb(arr)
      },
    //   在到达城市输入框中输值是触发
    async querydestSearchAsync(queryString, cb) {
       const arr= await this.getquerysearchcity(queryString)
         if(arr.length>1){
             this.form.destCity=arr[0].value
             this.form.destCode=arr[0].sort
         }
        cb(arr)
      },
        // 单击选中出发城市触发
        handledepartSelect(item) {
             this.form.departCity=item.value
             this.form.departCode=item.sort
        },
        // 单机选中到达城市触发
        handledestSelect(item) {
             this.form.destCity=item.value
             this.form.destCode=item.sort
        },
        // 封装获取城市信息
      getquerysearchcity(city){
          return new Promise((resolve,reject)=>{
              if(!city){
                  return resolve([])
              }
               this.$axios({
                url:"/airs/city",
                method:"GET",
                params:{
                    name:city
                }
         }).then(res=>{ 
             const {data}=res.data
             const arr=data.map(e=>{
                 return {...e,value:e.name.replace("市", "")}
             })
             resolve(arr)
         })
          })
          
      },
    //   特价机票处跳转
      handleToflights(Info){
          const { departCity,
                departCode,
                departDate,
                destCity,
                destCode}=Info
          this.$router.push({
              path:"/air/flights",
              query:{ departCity,
                departCode,
                departDate,
                destCity,
                destCode}
          })
      }
    },
     mounted() {
        this.$axios({
            url:"/airs/sale",
            method:"GET",
        }).then(res=>{
            const {data}=res.data
            this.ticketInfo=data
        })
    }
}
</script>

<style scoped lang="less">
    .containter{
        width:100%;
        min-width: 1000px;
        .main{
            width: 1000px;
            margin: 0 auto;
            .airport{
                font-size:20px;
                color:orange;
                padding: 10px;
                .airport-tip{
                    font-size:20px;
                    margin-right: 10px;
                }
            }
            .airport-spacilsell{
                .airport-form{
                     background:#fff;
                     border:1px solid #ccc;
                     height:350px;
                     box-sizing: border-box;
                    span{
                        display:inline-block;
                        width: 180px;
                        height:50px;
                        font-size:16px;
                        text-align: center;
                        line-height: 50px;
                        background: #eee; 
                        box-sizing: border-box;
                        border-top:3px solid #fff;
                        cursor: pointer;
                    }
                    .btncss{
                        border-top:3px solid orange;
                        color:orange;
                        background: #fff;
                    }
                    .airport-form-content{
                        padding: 30px;
                        box-sizing: border-box;
                        position: relative;
                        i{
                            font-style: normal;
                            color:#666;
                            margin-right: 10px;
                        }
                        .el-autocomplete{
                            width:220px;
                        }
                    }
                    .airport-huan{
                        position: absolute;
                        top:35px;
                        right:15px;
                        display: block;
                        width: 25px;
                        height: 60px;
                        background: #fff;
                        border-bottom: 1px solid #ccc;
                        border-top: 1px solid #ccc;
                        border-right: 1px solid #ccc;
                        &::after{
                            content: "换";
                            position: absolute;
                            top:20px;
                            right:-10px;
                            width:20px;
                            height:20px;
                            background: #666;
                            text-align:center;
                            line-height: 20px;
                            color:#ccc;
                            border-radius: 4px;
                            font-size: 14px;
                        }
                    }
                    
                }
            }
            .airport-server{
                widows: 100%;
                background:#fff;
                border:1px solid #ccc; 
                margin:10px auto;
                height:58px; 
                    i{
                        font-size: 30px;
                    }
            }
            .ticket{
                font-size:20px;
                color:rgb(0, 195, 255);
                padding: 10px;
                padding-top:0px;
                .specil-ticket{
                    font-size:20px;
                    margin-right: 10px;
                }
            }
            .ticket-img{
                border:1px solid #ccc;
                margin-bottom: 50px;
                .ticket-bgimg{
                    width:225px;
                    height:140px;
                    position: relative;
                    margin:20px;
                    cursor: pointer;
                    &:nth-child(1),
                     &:nth-child(2), 
                     &:nth-child(3){
                         margin-right:0px;
                     }
                    .ticket-price{
                        width:100%;
                        position: absolute;
                        bottom: 0px;
                        background:rgba(0, 0, 0, 0.3);
                        padding:8px;
                        box-sizing: border-box;
                        color:#ffc;
                        .ticket-city{
                            font-size: 14px;
                        }
                        .ticket-spacile-price{
                            font-size: 17px;
                        }
                    }
                }
            }
        }
    }
</style>
