<template>
    <footer>
        <div class="top">
            <el-row type="flex" justify="space-around" class="current">
                <div>
                    <h3>闲云旅游旅游网</h3>
                    <p>上亿旅行者共同打造的"旅行神器"</p>
                    <p>
                        <span class="col">60,000 </span>
                        <span>多个全球旅游目的地</span>
                    </p>
                    <p>
                        <span class="col">600,000 </span>
                        <span>个细分目的地新玩法</span>
                    </p>
                    <p>
                        <span class="col">760,000,000 </span>
                        <span> 次攻略下载</span>
                    </p>
                    <p>
                        <span class="col">38,000 </span>
                        <span>家旅游产品供应商</span>
                    </p>
                </div>
                <div>
                    <h3>关于我们</h3>
                    <p>隐私政策 商标声明</p>
                    <p>服务协议 游记协议</p>
                    <p>商城平台服务协议</p>
                    <p>网络信息侵权通知指引</p>
                    <p>闲云旅游旅游网服务监督员</p>
                    <p>网站地图加入闲云旅</p>
                </div>
                <div>
                    <h3>旅行服务</h3>
                    <p>旅游攻略 酒店预订</p>
                    <p>旅游特价 国际租车</p>
                    <p>旅游问答 旅游保险</p>
                    <p>旅游指南 订火车票</p>
                    <p>旅游资讯 APP下载</p>
                </div>
                <div >
                    <div class="er-wei-ma">
                        <img src="http://157.122.54.189:9093/images/1556522965.png" alt="">
                    </div>
                    <div class="care">
                        <span>关注我们</span>
                    </div>
                </div>
            </el-row>
            
        </div>
        <el-row type="flex" class="bottom" justify="center" align="middle">
                <span>京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All Rights Reserved</span>
        </el-row>
    </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
    footer{
        height:330px;
        background-color:#333;
        min-width: 1000px;
    
        color:#ccc;
    }
    p{
        font-size: 13px;
        margin-bottom: 5px;
    }
    .top{
        width:1000px;
        margin: 0px auto;
        padding-top:30px;
        box-sizing: border-box;
        border-bottom: 2px solid #ccc;
    }
    .current{
        margin-bottom:30px ;
        box-sizing: border-box;
    }
    h3{
        font-weight:400;
        margin-bottom:10px;
    }
    .col{
        color:orange;
    }
    .bottom{
        
         font-size: 13px;
         height:100px;
    }
    .er-wei-ma>img{
        width: 150px;
        height:150px;
    }
    .care{
        font-size: 13px;
        text-align: center;
    }
</style>
