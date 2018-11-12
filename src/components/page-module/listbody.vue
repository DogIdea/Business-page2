<template>
 <div class="listbody">
     <div class="listtitle">
        <ul class="sort-con">
            <li class="sort-item active">默认排序</li>
            <li class="sort-item">
                <span>价格</span>
                <i class="iconfont icon-tubiaozhizuo-1"></i>
                <i class="iconfont icon-tubiaozhizuo-2"></i>
            </li>
        </ul>
     </div>
 </div>
</template>

<script>
export default {
 data() {
  return {

  }
 },
 components: {

 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.listbody{
  position: relative;
  top:$headerHeight;
  width:100%;
  .listtitle{
    width:100%;
    height:$headerHeight;
    .sort-con{
      width:100%;
      height:100%;
      overflow: hidden;
      .sort-item{
        width:50%;
        float: left;
        height:100%;
        line-height: $headerHeight;
        text-align: center;
      }
    }
  }
}
</style>
