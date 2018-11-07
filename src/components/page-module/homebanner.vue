<template>
    <div class="banner">
      <swiper :options="swiperOption">
          <!-- slides -->
          <swiper-slide v-for="item in banner_list" :key="item.id"><img class="swpier-img" :src="item.imgUrl" alt=""></swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
</template>
<script>
  export default {
    name: 'banner',
    props:{
      banner_list:Array
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
          },
          autoplay:{
             delay: 3000,
             disableOnInteraction: false,
             waitForTransition: true,
          },
          speed:2000,
          loop:true
        }
      }
    }    
  }
</script>
<style scoped lang="scss" type="text/css">
//轮播图样式
// /deep/ scss和sass的样式穿透
.banner /deep/ .swiper-pagination-bullet-active{
  background:#fff;
} 
.banner{
  overflow: hidden;
  width:100%;
  height:0;
  background:#fff;
  padding-bottom:42%;
  //  上面的写法高度相对于宽度撑开31.25%类似还可以用height 31.25vw
  .swpier-img{
    width:100%;
  }
}
</style>