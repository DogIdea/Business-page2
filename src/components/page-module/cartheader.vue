<template>
 <div class="cart-header">
    <div class="header-left">
        <div class="iconfont icon-iconfontzhizuobiaozhun023126 icon-back" @click="goback"></div>
    </div>
    <div class="header-right" v-show="header_show" @click="deletecart">
        <span >编辑</span>
    </div>
    <div class="header-text">
        <h1 class="title">BUSINESS{{header_title}}</h1>
    </div>
 </div>
</template>

<script>
import {DeleteAddress} from '@/common/service/address-service.js';
import {mapState} from 'vuex';
export default {
 props:{
     header_title:String,
     header_show:Boolean
 },
 data() {
  return {

  }
 },
 computed: {
   ...mapState(['isDeleteCartstate']),
 },
 methods: {
    goback: function() {
      console.log(this.$route.params)
      this.$router.go(-1);
    },
    deletecart:function() {
      let isshow = this.isDeleteCartstate.isshow;
      this.$store.dispatch('isDeleteCartmethods',!isshow)
    }
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.cart-header{
  position: fixed;
  z-index:5;
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
  .header-right{
    float:right;
    min-width:$headerHeight;
    height:$headerHeight;
  }
}
</style>
