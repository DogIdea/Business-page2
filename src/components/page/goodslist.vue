<template>
 <div class="list">
   <goodsheader></goodsheader>
   <listbody></listbody>
 </div>
</template>

<script>
import goodsheader from '../page-module/header';
import listbody from '../page-module/listbody';
export default {
 data() {
  return {

  }
 },
 components: {
     goodsheader,
     listbody
 }
}
</script>

<style scoped lang="scss">

</style>
