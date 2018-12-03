<template>
 <div class="detail-header">
    <div class="header-left">
        <div class="iconfont icon-iconfontzhizuobiaozhun023126 icon-back" @click="goback"></div>
    </div>
    <div class="header-text">
      <div class="title">
        <h1 class="goodsdetail" data-type="goodsdetail" @click="detailbody">商品</h1>
        <h1 class="aboutdetail" data-type="aboutdetail" @click="detailbody">详情</h1>
      </div>
    </div>
 </div>
</template>

<script>
export default {
 data() {
  return {

  }
 },
 methods: {
  goback: function() {
      this.$router.go(-1);
  },
  detailbody: function(e) {
      let listtarget = e.target;
      let newrouteid = this.$route.params.id;
      newrouteid = newrouteid.match(/=\S*/g).join('').match(/[^=]*/g)[1];
      if(listtarget.getAttribute('data-type') == 'goodsdetail'){
        this.$router.push('/detail/goodsdetail/'+ 'productId='+ newrouteid)
      }else if(listtarget.getAttribute('data-type') == 'aboutdetail'){
        this.$router.push('/detail/aboutdetail/'+ 'productId='+ newrouteid)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.detail-header{
  position: flex;
  z-index:10;
  top:0;
  left:0;
  width:100%;
  line-height:$headerHeight;
  height:$headerHeight;
  background:#fff;
  color:$bgColor;
  box-shadow: 0rem 0.0625rem 0.0625rem #ededed;
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
    text-align:center;
    .title{
      width:60%;
      margin:0 auto;
      height:$headerHeight;
      line-height:$headerHeight;
      h1{
        float:left;
        width:50%;
        text-align: center;
      }
    }
  }
}
</style>