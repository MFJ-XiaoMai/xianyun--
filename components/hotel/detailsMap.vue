<template>
  <div class="bigContainer">
    <el-row type="flex" class="map" justify="space-between">
      <!-- 2、页面显示地图，需要配置和创建id为container的div -->
      <div id="container"></div>
      <!-- 6、路线规划 -->
      <div id="panel">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <ul>
              <li class="poi-list-item" v-for="(item,index) in data.scenic" :key="index">
                <span class="name">{{item.name}}</span>
                <span class="distance">32.11公里</span>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            交通
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-row>
    <!-- 酒店的服务信息 -->
    <div class="mapMessage">
      <el-row class="messageItem">
        <el-col :span="4" class="messageLeft">
          <span>基本信息</span>
        </el-col>
        <el-col :span="20" class="messageRight basicInformation">
          <el-col :span="6">
            <span>入住时间：14:00之后</span>
          </el-col>
          <el-col :span="6">
            <span>离店时间：12:00之前</span>
          </el-col>
          <el-col :span="6">
            <span>{{data.creation_time}}/{{data.renovat_time}}</span>
          </el-col>
          <el-col :span="6">
            <span>酒店规模{{data.roomCount}}间客房</span>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="messageItem">
        <el-col :span="4" class="messageLeft">
          <span>主要设施</span>
        </el-col>
        <el-col :span="20" class="messageRight service">
          <span v-for="(item,index) in data.hotelassets" :key="index">{{item.name}}</span>
        </el-col>
      </el-row>
      <el-row class="messageItem">
        <el-col :span="4" class="messageLeft">
          <span>停车服务</span>
        </el-col>
        <el-col :span="20" class="messageRight">
          <span> - </span>
        </el-col>
      </el-row>
      <el-row class="messageItem">
        <el-col :span="4" class="messageLeft">
          <span>品牌信息</span>
        </el-col>
        <el-col :span="20" class="messageRight">
          <span> - </span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      map: null,
      activeName: "first",
      hotelInfo: {},
      nums: [1, 2, 3, 4],
      coordinates: [
        [116.368904, 39.923423],
        [116.382122, 39.921176],
        [116.387271, 39.922501],
        [116.398258, 39.9146]
      ]
    };
  },

  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },

  //1、异步加载 JS API(引入高德地图的js文件)
  mounted() {
    setTimeout(() => {
      //1.1 页面全部加载完毕之后执行
      window.onLoad = () => {
        // 1.3 创建地图的同时可以给地图设置中心点、级别、显示模式、自定义样式等的属性
        var map = new AMap.Map("container", {
          resizeEnable: true,
          zoom: 13, //级别
          center: [this.data.location.longitude, this.data.location.latitude], //中心点坐标
          viewMode: "3D" //使用3D视图
        });
        this.map = map;

        // 5、点标记
        //5.1 创建一个 Marker 实例：
        var lnglats = this.coordinates;
        // console.log(lnglats);
        //删除按钮
        var infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -30)
        });
        // 循环坐标
        for (var i = 0, marker; i < lnglats.length; i++) {
          var marker = new AMap.Marker({
            position: lnglats[i],
            map: map,
            // 数字样式
            icon: `//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-${[
              i + 1
            ]}.png`
          });

          marker.content = `${this.nums[i]}`;
          marker.on("mouseover", markerClick);
          marker.emit("click", { target: marker });
        }

        function markerClick(e) {
          infoWindow.setContent(e.target.content);
          infoWindow.open(map, e.target.getPosition());
        }

        //5.2 将创建的点标记添加到已有的地图实例：
        map.setFitView();
      };

      //1.2 引入高德地图的js文件
      // 4、调用插件，需要加载特定的插件，可以在url后面添加上需要的插件，比如添加toolBar
      var url = `https://webapi.amap.com/maps?v=1.4.15&key=${"763aebf096e7824f4d4e14237beddac0"}&callback=onLoad&plugin=AMap.InfoWindow`;

      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
      //1、异步加载 JS API(引入高德地图的js文件)
    }, 1000);
  }
};
</script>

<style scoped lang='less'>
.bigContainer {
  .map {
    height: 360px;
    margin-bottom: 40px;
    /* 3、为地图容器指点宽高*/
    #container {
      width: 650px;
      height: 360px;
    }
    #panel {
      padding-left: 20px;
      width: 360px;
      height: 100%;
      ul {
        height: 300px;
        overflow: auto;
        .poi-list-item {
          display: flex;
          color: #666;
          justify-content: space-between;
          margin: 0 20px 20px 10px;
        }
      }
    }
  }
  .mapMessage {
    margin-bottom: 40px;
    .messageItem {
      padding: 20px 10px;

      .messageRight {
        span {
          color: #666;
        }
      }
      .service {
        span {
          color: #666;
          border: 1px solid #eee;
          border-radius: 4px;
          padding: 4px 10px;
          background-color: #eee;
          margin-right: 10px;
        }
      }
    }
  }
  /deep/.amap-icon img {
    width: 25px;
    height: 34px;
  }
}
</style>
