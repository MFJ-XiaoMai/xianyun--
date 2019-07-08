<template>
<!-- 文章标题 -->
<div>
 <Papertitle />
 <!-- 文章正文 -->
 <Postcontent  />
 <!-- 评论点赞收藏 -->
 <Postcontrol />
</div>
</template>

<script>
import Papertitle from "@/components/post/papertitle";
import Postcontent from "@/components/post/postcontent";
import Postcontrol from "@/components/post/postcontrol"
export default {
  
    components: {
    Papertitle,
    Postcontent,
    Postcontrol
  },

};
</script>

<style>

</style>
