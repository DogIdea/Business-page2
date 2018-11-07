<template>
 <div class="bottom">
     <div class="bottom_navigation">
           <router-link tag="div" to="/class" class="logo">
             <i class="iconfont icon-unie63a"></i>
           </router-link>
         <div class="border-left"></div>
         <div class="logo">
             <i class="iconfont icon-icon-test"></i>
         </div>
     </div>
     <div class="bottom_navigation bottom_shopcart">
        <div class="logo">
            <i class="iconfont icon-gouwuchekong"></i>
        </div>
     </div>
     <div class="bottom_navigation">
         <div class="logo">
             <i class="iconfont icon-faxian"></i>
         </div>
         <div class="border-left"></div>
         <div class="logo" @click="usercenter">
             <i class="iconfont icon-denglu"></i>
         </div>
     </div>
 </div>
</template>

<script>
export default {
 props:{

 },
 data() {
  return {

  }
 },
 methods:{
   usercenter:function() {
     let IsUserLogin=this.$store.state.UserInfo;
     if(IsUserLogin.status === 1) {
       this.$router.push('/userlogin');
     }else {
       this.$router.push('/usercenter');
     }
   }
 },
 components: {

 }
}
</script>

<style scoped lang="scss" type="text/css">
@import '@/assets/css/varibles.scss';
.bottom{
  position:fixed;
  z-index:10;
  width:100%;
  line-height:$headerHeight;
  height:$headerHeight;
  left:0;
  right:0;
  bottom:0;
  background:#fff;
  color:$bgColor;
  box-shadow: 0rem -0.125rem 0.125rem #aaa;
  .bottom_navigation{
    float:left;
    width:calc(50% - 2.15rem);
    .border-left{
      float:left;
      position: relative;
      width:0;
      height:$headerHeight;
    }
    .border-left:before{
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      height: 2rem;
      width: 0.2rem;
      transform: translateY(-50%);
      background-color: #EDEDED;
    }
    .logo{
      width:calc(50% - 0.1rem);
      float: left;
      text-align: center;
    }
  }
  .bottom_shopcart{
    position:relative;
    top:-10px;
    vertical-align:top;
    text-align:center;
    padding:0.4rem;
    width:3.5rem;
    height:3.5rem;
    background:$bgColor;
    border-radius:50%;
    color:#fff;
    box-shadow: 0rem -0.25rem 0.25rem #aaa;
    .logo{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      width:$headerHeight;
      height:$headerHeight;
    }
  }
}

</style>
