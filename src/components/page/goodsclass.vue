<template>
 <div class="goods-class">
  <homeheader :isicon="goods"></homeheader>
  <classbody></classbody>
  <homebottom></homebottom>
 </div>
</template>

<script>
import homeheader from '../page-module/homeheader';
import classbody from '../page-module/classbody';
import homebottom from '../page-module/bottom';
export default {
 data() {
  return {
    isicon:"goods"
  }
 },
 components: {
   homeheader,
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
