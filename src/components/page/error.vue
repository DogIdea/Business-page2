<template>
 <div class="error">
    <homeheader :isicon="isicon"></homeheader>
    <div class="error-msg">
        <h1>{{errormsg}}</h1>
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
      isicon:'home',
      errormsg:'对不起，找不到您所需要的商品'
  }
 },
 methods: {
    gohome:function(){
       this.$router.push('/home') 
    },
    loadmsg:function(){   
        this.errormsg = this.$route.params.errormsg
    }
 },
 components: {
   homeheader,
   homebottom
 },
 created() {
    this.loadmsg();
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
    font-size:1.5rem;
    font-weight: bold;
    color:#FF3030;
  }
  div{
    margin-top:1rem;
    line-height: 1.5rem;
    text-align: center;
    font-weight: bold;
    color:#666;
    font-size:1.2rem; 
  }
}
</style>
