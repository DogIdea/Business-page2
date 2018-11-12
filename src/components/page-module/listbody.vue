<template>
 <div class="listbody">
     <div class="listtitle">
        <ul class="sort-con">
            <li class="sort-item active" data-type="default">默认排序</li>
            <li class="sort-item" data-type="price">
                <span>价格</span>
                <i class="fa fa-sort-asc"></i>
                <i class="fa fa-sort-desc"></i>
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
        height:100%;
        text-align: center;
      }
    }
  }
}
</style>
