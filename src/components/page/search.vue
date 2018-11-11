<template>
 <div>
     <homeheader :isicon="isicon"></homeheader>
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
    isicon:"search"
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
