<template>
 <div class="editor-address">
    <div class="iconfont icon-xicangzizhiqu"></div>
    <button class="save" @click="saveaddaddress" >保存地址</button>
 </div>
</template>

<script>
export default {
 data() {
  return {

  }
 },
 methods: {
    saveaddaddress:function(){
        
    }
 },
 created() {
    console.log(this.$route.params.addressindex)
 },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.editor-address{
  position: absolute;
  top:$headerHeight;
  left:0;
  bottom:0;
  width:100%;
  color:#000;
  background:rgb(252, 248, 248);
  .save{
    position: absolute;
    left:0;
    bottom:0;
    width:100%;
    border:0px;
    height:4rem;
    line-height:4rem;
    display: block;
    background:linear-gradient(top, #EE2C2C, $bgColor);;
    box-shadow: 0rem 0.125rem 0.125rem #ededed;
    color:#fff;
    font-size:1rem;
    text-align: center
  } 
}
</style>
