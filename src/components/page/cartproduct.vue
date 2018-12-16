<template>
 <div class="cart-product">
    <cartheader :header_title="header_title" :header_show="header_show"></cartheader>
    <cartbody></cartbody>
 </div>
</template>

<script>
import cartheader from '../page-module/cartheader';
import cartbody from '../page-module/cartbody';
export default {
 data() {
  return {
    header_title:'购物车',
    header_show:true
  }
 },
 components: {
   cartheader,
   cartbody
 }
}
</script>

<style scoped lang="scss">
</style>
