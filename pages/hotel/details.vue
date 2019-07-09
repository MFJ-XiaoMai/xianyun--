<template>
  <div class="cantainter">
    <div class="main">
      <!-- 酒店详情页里的detailsHotel组件 -->
      <div>
        <DetailsHotel :data="data" />
      </div>
      <!-- 酒店详情页里的detailsMap组件 -->
      <div>
        <DetailsMap :data="data" />
      </div>
      <!-- 酒店详情页里的detailsComment组件 -->
      <div>
        <DetailsComment />
      </div>
    </div>
  </div>
</template>

<script>
//引入组件
import DetailsHotel from "@/components/hotel/detailsHotel.vue";
import DetailsMap from "@/components/hotel/detailsMap.vue";
import DetailsComment from "@/components/hotel/detailsComment.vue";

export default {
  data() {
    return {
      // hotelInfo:[]
      data: {
        location:{}
      }
    };
  },

  // 注册组件
  components: {
    DetailsHotel,
    DetailsMap,
    DetailsComment
  },
  methods: {

  },
  mounted() {
    // 请求酒店详情页的数据
    const id = this.$route.query.id;
    this.$axios({
      url: "/hotels",
      method: "GET",
      params: {
        id
      }
    }).then(res => {
      // console.log(res);
      this.data = res.data.data[0];
      // console.log(this.data);

    });
  }
};
</script>

<style scoped lang='less'>
.cantainter {
  width: 100%;
  .main {
    width: 1000px;
    margin: 0 auto;
  }
}
</style>
