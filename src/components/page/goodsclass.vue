<template>
 <div class="goods-class">
  <goodsheader :isicon="isicon"></goodsheader>
  <classbody></classbody>
  <homebottom></homebottom>
 </div>
</template>

<script>
import goodsheader from '../page-module/header';
import classbody from '../page-module/classbody';
import homebottom from '../page-module/bottom';
export default {
 data() {
  return {
    isicon:"goods"
  }
 },
 components: {
   goodsheader,
   classbody,
   homebottom 
 }
}
</script>

<style scoped lang="scss">
.goods-class{
  min-height:100%;
}
</style>
