<template>
 <div class="list">
   <homeheader></homeheader>
   <listbody></listbody>
 </div>
</template>

<script>
import homeheader from '../page-module/homeheader';
import listbody from '../page-module/listbody';
export default {
 data() {
  return {

  }
 },
 components: {
     homeheader,
     listbody
 }
}
</script>

<style scoped lang="scss">

</style>
