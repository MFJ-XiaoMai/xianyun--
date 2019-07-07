<template>
    <div class="hotelpart">
        <el-row type="flex">
            <div class="content-left">
                <el-row type="flex" class="content-area">
                    <el-col :span="3">
                        <span >区域：</span>
                    </el-col>
                    <el-col :span="20">
                        <div 
                        :class="{unfold:flag,}"
                        >
                            <a href="#">全部</a>
                            <a href="javascript:;"
                            v-for="(item,index) in data.scenic" 
                            :key="index"
                            >{{item.name}}</a>
                        </div>
                        <a href="javascript:;" @click="handerunfold" 
                        :class="{rotatetop:top,rotatebottom:bottom}">
                            <i class="el-icon-d-arrow-right" ></i>
                            <span>等43个区域</span>
                        </a>
                    </el-col>
                </el-row>
                 <el-row type="flex" class="strategy">
                     <el-col :span="3">
                        <span>攻略：</span>
                     </el-col>
                    <el-col :span="20">
                        <p>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</p>
                    </el-col>
                  
                </el-row>
                <el-row type="flex" class="average">
                    <div class="average-price">
                        <el-row type="flex" >
                             <span>均价 
                                <el-tooltip 
                                class=""
                                effect="dark" 
                                content="等级均价由平日价格计算得出，节假日价格会有上浮。"
                                placement="top-start">
                                <div class="tip-box">
                                    <span class="price-tip">?</span>     
                                </div>
                                </el-tooltip> 
                            </span>
                            <span class="colon" > ：</span>
                        </el-row>
                       
                    </div>
                    <div class="level">
                        <el-row type="flex" justify="space-around">
                            <div class="hotel-level">
                                <el-tooltip 
                                class="item" 
                                effect="dark"
                                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                                 placement="bottom-start">
                                 <div class="hotel-level-tip">
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <span>￥332</span>
                                 </div>
                                   
                                </el-tooltip>
                            </div>
                            <div class="hotel-level">
                                <el-tooltip 
                                class="item"
                                effect="dark" 
                                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。"
                                placement="bottom-start">
                                <div class="hotel-level-tip">
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <span>￥521</span>
                                </div>
                                  
                                </el-tooltip>
                            </div>
                            <div class="hotel-level">
                                <el-tooltip 
                                class="item" 
                                effect="dark" 
                                content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" 
                                placement="bottom-start">
                                <div class="hotel-level-tip">
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <i class="iconfont iconhuangguan"></i>
                                    <span>￥768</span>
                                </div>  
                                </el-tooltip>
                            </div>
                        </el-row>
                    </div>
                </el-row>
            </div>
            <div class="map" 
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(225, 225, 225, .8)" >
                <div 
                 id="container">

                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            flag:false,
            // show:false,
            top:false,
            bottom:true,
            loading: false,
        }
    },
    props:{
        data:{
            type:Object,
            default:{}
        },
        location:{
            type:Array,
            default:[]
        }
    },
    methods:{
        handerunfold(){
            this.flag=!this.flag;
            this.top=!this.top;
            this.bottom=!this.bottom;
        },

    },
    watch:{
        data(){
            this.loading=true
            if(this.data!=={}){
                this.flag=true;  
            }
            if(!(this.data||this.location)) return;
           setTimeout(()=>{
            var map = new AMap.Map('container',{
                    zoom:11,//放大级别
                    center: [this.data.location.longitude, this.data.location.latitude],//中心点坐标
                    viewMode:'3D'//使用3D视图
                });
                var toolbar = new AMap.ToolBar();
                map.addControl(toolbar);
                let arr=[]
                const location=this.location.map((e,index)=>{
                    const marker=new AMap.Marker({
                        // 自定义图片内容
                        // content: `<div class="marker-route ">${index}</div>`,
                        position: new AMap.LngLat(e.location.longitude,e.location.latitude ),   // 经纬度对象
                        title: `${e.address}`
                    })
                    return  arr.push(marker)
                })
                    // 将创建的点标记添加到已有的地图实例：
                    map.add(arr);
                    
           },1000) 
       
    },
    loading(){
        setTimeout(()=>{
                this.loading=false
            },1000)
    }
        
    },
    mounted(){ 
       
    // 引入高德地图的js文件
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${"763aebf096e7824f4d4e14237beddac0"}&plugin=AMap.ToolBar`;
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);

    }
}
</script>

<style scoped lang="less">
    .hotelpart{ 
        font-size:14px;
        color:#666;
        margin-top:20px;
        .content-left{
           width:580px;
           
            .content-area{
                
                .unfold{
                    height:60px;
                    overflow: hidden; 
                }
                // .showHeight{
                //      height:60px;
                //     overflow: hidden;
                // }
                a{
                    margin-right:20px;
                    color:#666; 
                }
                .rotatebottom{
                     margin-right:20px;
                    color:#666;
                    i{
                        transform: rotate(90deg);
                        color: #f90; 
                    }
                }
                .rotatetop{
                    margin-right:20px;
                    color:#666;
                    i{
                        transform: rotate(270deg);
                        color: #f90;
                    }
                }
            }
            .strategy{
                margin:20px auto;
                height:60px;
            }
            .average{
                margin-bottom: 20px;
                .average-price{
                    position: relative;
                    .colon{
                        margin-left: 20px;
                    }
                    .tip-box{
                        position: absolute;
                        top:-4px;
                        right:13px;
                      
                        .price-tip{
                        display:inline-block;
                        width: 16px;
                        height: 16px;
                        background: #aaa;
                        color: #fff;
                        text-align: center;
                        line-height: 16px;
                        border-radius: 50%;
                    }
                    }
                   
                }
                .level{
                    margin-left: 10px;
                    .hotel-level{
                        margin-right: 20px;
                        .hotel-level-tip{
                            i{
                                color:#f90;
                            }
                        }
                    }
                }
            }
        }
        .map{
            #container{
                width:420px;
                height:260px;
                .marker-route{
                    width:20px;
                    height:20px;
                    border-radius: 50% 50% 70% 70%;
                    background-color:rgb(0, 0, 255);
                }
            }
        }
       
    }
</style>
