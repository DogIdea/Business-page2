<template>
 <div class="cart-product">
    <cartheader :header_title="header_title" :header_show="header_show"></cartheader>
    <cartbody @cartbodyTotalPrice="cartbodyTotalPrice"></cartbody>
    <cartbottom :cartbottomTotalPrice="cartbottomTotalPrice"></cartbottom>
 </div>
</template>

<script>
import cartheader from '../page-module/cartheader';
import cartbody from '../page-module/cartbody';
import cartbottom from '../page-module/cartbottom';
export default {
 data() {
  return {
    header_title:'购物车',
    header_show:true,
    cartbottomTotalPrice:0,
  }
 },
 methods: {
   cartbodyTotalPrice:function(cartTotalPrice,type){
     if(type == 'zero'){
       this.cartbottomTotalPrice = this.cartbottomTotalPrice - cartTotalPrice;
     }else{
       this.cartbottomTotalPrice = cartTotalPrice;
       
     }
     
   }
 },
 components: {
   cartheader,
   cartbody,
   cartbottom
 }
}
</script>

<style scoped lang="scss">
</style>
