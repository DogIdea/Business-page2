<template>
  <div class="homebody" ref="homebody">
    <div class="homewrapper">
      <homebanner :banner_list="banner_list"></homebanner>
      <homeicon :icon_list="icon_list"></homeicon>
      <homerecommend :floorName="floorName" :floorWrap="floorWrap"></homerecommend>
    </div>
  </div>
</template>
 
<script>
import homebanner from '../page-module/homebanner';
import homeicon from '../page-module/homeicon';
import homerecommend from '../page-module/homerecommend';
import BScroll from 'better-scroll';
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
  methods: {
    _initScroll(){
      this.menuScroll = new BScroll(this.$refs.homebody, {
        click: true
      })
    }
  },
  components: {
    homebanner,
    homeicon,
    homerecommend
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll();
    });
  }
}
</script>
<style scoped lang="scss" type="text/css">
@import '@/assets/css/varibles.scss';
.homebody{
  //使用fixed来固定高度
  position: fixed;
  width:100%;
  left:0;
  top:$headerHeight;
  bottom:$headerHeight;
  height:auto;
  background: #EDEDED;
  overflow: hidden;
  
}
</style>