<template>
 <div class="error">
    <homeheader></homeheader>
    <div class="error-msg">
        <h1>抱歉，没有您所想要的商品</h1>
        <div @click="gohome">返回首页</div>
    </div>
    <homebottom></homebottom>
 </div>
</template>

<script>
import homeheader from '../page-module/header';
import homebottom from '../page-module/bottom';
export default {
 data() {
  return {

  }
 },
 methods: {
    gohome:function(){
       this.$router.push('/home') 
    }
 },
 components: {
   homeheader,
   homebottom
 },
}
</script>

<style scoped lang="scss">
.error-msg{
  position: absolute;
  top:45%;
  left:0;
  bottom:3.33rem;
  width: 100%;
  h1{
    line-height: 2rem;
    text-align: center;
    font-size:2rem;
    font-weight: bold;
    color:#FF3030;
  }
  div{
    margin-top:1rem;
    line-height: 1.5rem;
    text-align: center;
    font-weight: bold;
    color:#666;
    font-size:1.5rem; 
  }
}
</style>
