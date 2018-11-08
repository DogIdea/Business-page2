<template>
 <div class="goods-class">
   <homeheader :isicon="isicon"></homeheader>
   <classbody></classbody>
 </div>
</template>

<script>
import homeheader from '../page-module/homeheader';
import classbody from '../page-module/classbody';

export default {
 data() {
  return {
    isicon:false
  }
 },
 components: {
   homeheader,
   classbody 
 }
}
</script>

<style scoped lang="scss">

</style>
