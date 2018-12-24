<template>
 <div class="bottom">
     <div class="bottom_navigation">
           <router-link tag="div" to="/goodsclass" class="logo" :class="{'isActive':nowClassName=='goodsclass'}" >
             <i class="iconfont icon-unie63a"></i>
           </router-link>
         <div class="border-left"></div>
          <router-link tag="div" to="/goodslist/keyword=电视" class="logo" :class="{'isActive':nowClassName=='goodslist'}" >
             <i class="iconfont icon-icon-test"></i>
         </router-link> 
     </div>
     <div class="bottom_navigation bottom_shopcart" @click="cartproduct">
        <div class="logo">
            <i class="iconfont icon-gouwuchekong"></i>
        </div>
        <div class="num" v-show="cartTotalCount>0">{{cartTotalCount}}</div>
     </div>
     <div class="bottom_navigation" >
         <router-link tag="div" to="/search" class="logo" :class="{'isActive':nowClassName=='search'}" >
             <i class="iconfont icon-faxian"></i>
         </router-link>
         <div class="border-left"></div>
         <div class="logo" @click="usercenter" :class="{'isActive':nowClassName=='user'}">
             <i class="iconfont icon-denglu"></i>
         </div>
     </div>
 </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
 data() {
  return {
    cartTotalCount:0,
    nowClassName:''
  }
 },
 computed:{
    ...mapState(['Userloginstate','GetCartListstate'])
  },
 methods:{
   usercenter:function() {
     if(this.Userloginstate.status == 1) {
       this.$router.push('/userlogin');
     }else {
       this.$router.push('/usercenter/userinfo');
     }
   },
   cartlistload:function() {
     this.$store.dispatch('GetCartListmethod').then(()=>{
       if(this.GetCartListstate.status == 0){
        this.GetCartListstate.data.cartProductVoList.forEach((item,index) => {
          this.cartTotalCount += item.quantity
        });
      }
     })
   },
   cartproduct:function(){
     this.$router.push('/cartproduct')
   },
   classActive:function(){
     let routername = this.$route.name
     switch(routername){
       case 'GoodsClass':
         this.nowClassName='goodsclass';
         break;
       case 'GoodsList':
         this.nowClassName='goodslist';
         break;
       case 'shopcart':
         this.nowClassName='shopcart';
         break;
       case 'Search':
         this.nowClassName='search';
         break;
       case 'UserLogin':
         this.nowClassName='user';
         break;
     }
   },
 },
 created(){
   this.cartlistload();
   this.classActive();
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
  box-shadow: 0rem -0.125rem 0.125rem rgb(211, 207, 207);
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
      width: 0.0625rem;
      transform: translateY(-50%);
      background-color: #EDEDED;
    }
    .logo{
      width:calc(50% - 0.1rem);
      float: left;
      text-align: center;
    }
    .isActive{
      background:$bgColor;
      color:#fff;
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
    box-shadow: 0rem -0.25rem 1.25rem #666;
    .logo{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      width:$headerHeight;
      height:$headerHeight;
    }
    .num{
      @include iconnum();
    }
  }
}
</style>
