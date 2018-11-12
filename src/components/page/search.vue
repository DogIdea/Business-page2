<template>
 <div>
     <searchheader :isicon="isicon"></searchheader>
     <searchbody></searchbody>
 </div>
</template>

<script>
import searchheader from '../page-module/header';
import searchbody from '../page-module/searchbody';
export default {
 name:'Search',
 data() {
  return {
    isicon:"search"
  }
 },
 components: {
   searchheader,
   searchbody
 }
}
</script>

<style scoped lang="scss">

</style>
