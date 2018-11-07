<template>
 <div>
     <homeheader></homeheader>
     <searchbody></searchbody>
 </div>
</template>

<script>
import homeheader from '../page-module/homeheader';
import searchbody from '../page-module/searchbody';
export default {
 name:'Search',
 data() {
  return {

  }
 },
 components: {
   homeheader,
   searchbody
 }
}
</script>

<style scoped lang="scss">

</style>
