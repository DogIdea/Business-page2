<template>
 <div class="user-header">
    <div class="header-left">
        <div class="iconfont icon-iconfontzhizuobiaozhun023126 icon-back" @click="goback"></div>
    </div>
    <div class="header-text">
        <h1 class="title">BUSINESS{{header_title}}</h1>
    </div>
 </div>
</template>

<script>
export default {
 props:{
     header_title:String
 },
 data() {
  return {

  }
 },
 methods: {
    goback: function() {
    this.$router.go(-1);
    }
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.user-header{
  width:100%;
  line-height:$headerHeight;
  height:$headerHeight;
  background:#fff;
  color:$bgColor;
  .header-left{
    float:left;
    min-width:$headerHeight;
    height:$headerHeight;
    .icon-back{
      font-size:2rem;
      color:$bgColor;
      height:$headerHeight;
      font-size:1.4rem;
      text-align:center;
    }
  }
  .header-text{
    box-sizing: border-box;
    width:100%;
    height:$headerHeight;
    line-height:$headerHeight;
    text-align:center;
    padding-right: $headerHeight;
    .title{
      font-size:1.2rem;
      text-align: center;
    }
  }
}
</style>
