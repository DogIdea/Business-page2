<template>
  <div class="homebody">
    <homebanner :banner_list="banner_list"></homebanner>
    <homeicon :icon_list="icon_list"></homeicon>
    <homerecommend :floorName="floorName" :floorWrap="floorWrap"></homerecommend>
  </div>
</template>
 
<script>
import homebanner from '../page-module/homebanner';
import homeicon from '../page-module/homeicon';
import homerecommend from '../page-module/homerecommend';
import icon from '../../../static/mock/icon.json';
import banner from '../../../static/mock/banner.json';
import floor from '../../../static/mock/floor.json'
export default {
  name: 'homebody',
  data() {
    return {
      floorName:floor.floor.floorName,
      floorWrap:floor.floor.floorWrap,
      icon_list:icon.icon_list,
      banner_list:banner.banner_list
    }
  },
  // methods:{
  //   getRecommendInfo() {
  //     this.$axios.get("../../../static/mock/floor.json").then(this.getRecommendSucc)
  //   },
  //   getRecommendSucc(res) {
  //     let response = res.data.data;
  //     this.floorName = response.floorName;
  //     this.floorWrap = response.floorWrap;
  //   }
  // },
  // mounted() {
  //   this.getRecommendInfo()
  // },
  components: {
    homebanner,
    homeicon,
    homerecommend
  }
}
</script>
<style scoped lang="scss" type="text/css">
.homebody{
  background: #EDEDED;
}
</style>