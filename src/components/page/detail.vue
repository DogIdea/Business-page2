<template>
 <div class="detail">
   <detailheader></detailheader>
   <keep-alive>
     <router-view></router-view>
   </keep-alive>
   <detailbottom></detailbottom>
 </div>
</template>

<script>
import detailheader from '../page-module/detailheader';
import detailbottom from '../page-module/detailbottom';

export default {
 data() {
  return {

  }
 },
 components: {
    detailheader,
    detailbottom
 }
}
</script>

<style scoped lang="scss">

</style>
