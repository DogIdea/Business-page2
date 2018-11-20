<template>
    <div class="icons">
      <swiper :options="swiperOption_icon">
        <swiper-slide v-for="(page,index) in pages" :key="index">
          <div class="icon" v-for="item in page" :key="item.id">
              <div class="menu-icon" >
                <span class="iconfont" :class="item.icon"></span>
                <p class="icon-content">{{item.content}}</p>
              </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination-icon"  slot="pagination"></div>
      </swiper>
    </div>
</template>
 
<script>
  export default {
    name: 'icons',
    props:{
      icon_list:Array
    },
    data() {
      return {
        swiperOption_icon: {
          pagination:{
            el:'.swiper-pagination-icon',
            type: 'fraction'
          },
          paginationType: 'fraction',
          loop:false
        }
      }
    },
    computed:{
      pages(){
        const pages = [];
        this.icon_list.forEach((item,index) => {
          const page = Math.floor(index / 8)
          console.log(page)
          if (!pages[page]) {
            pages[page] = []
          }
          pages[page].push(item);
          
        });
        return pages;
      }
    }
  }
</script>
<style scoped lang="scss" type="text/css">
@import '@/assets/css/varibles.scss';

//轮播图样式
// /deep/ scss和sass的样式穿透
.icons /deep/ .swiper-pagination-bullet-active{
  background:#000;
}
.swiper-pagination-icon{
    padding-top:.3rem;
    text-align: center;
}
.icons{
  overflow: hidden;
  margin-top:.1rem;
  border-top-left-radius: .75rem;
  border-top-right-radius:.75rem;
  height:0;
  padding-bottom:55%;
  border-top:$border;
  .icon{
    overflow: hidden;
    float: left;
    position: relative;
    width:25%;
    height:0;
    padding-bottom:25%;
    background:#ffff;
    box-sizing: border-box;
    border:$border;
    border-left:none;
    border-top:none;
    .icon:nth-child(4n+1){
      border-left:$border;
    }
    .menu-icon{
      position: absolute;
      width:100%;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      text-align: center;
      .iconfont{
        font-size:2rem;
      }
      .icon-content{
        margin-top:1.2rem;
        font-size:.1rem;
      }
    }
  }
}
</style>