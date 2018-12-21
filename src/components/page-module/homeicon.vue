<template>
    <div class="icons">
      <swiper :options="swiperOption_icon">
        <swiper-slide v-for="(page,index) in pages" :key="index">
          <div class="icon" v-for="item in page" :key="item.id" @click="gotorouter(item.content)">
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
import {mapState} from 'vuex';
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
    ...mapState(['Userloginstate']),
    pages(){
      const pages = [];
      this.icon_list.forEach((item,index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item);
        
      });
      return pages;
    },
    
  },
  methods: {
    gotorouter:function(rouername){
      let goodsitem =''
      switch(rouername){
        case "手机爆款":
          goodsitem = '/goodslist/'+ 'keyword='+ '手机';
          this.$router.push(goodsitem);
          break;
        case "超市":
          goodsitem = '/goodslist/'+ 'keyword='+ '电视';
          this.$router.push(goodsitem);
          break;
        case "电子超市":
          goodsitem = '/goodslist/'+ 'keyword='+ '电视';
          this.$router.push(goodsitem);
          break;
        case "时尚服装":
          goodsitem = '/goodslist/'+ 'keyword='+ '衣服';
          this.$router.push(goodsitem);
          break;
        case "儿童玩具":
          goodsitem = '/goodslist/'+ 'keyword='+ '玩具';
          this.$router.push(goodsitem);
          break;
        case "分类":
          this.$router.push('/goodsclass');
          break;
        case "数码电器":
          goodsitem = '/goodslist/'+ 'keyword='+ '电脑';
          this.$router.push(goodsitem);
          break;
        case "登录":
          if(this.Userloginstate.status == 1) {
            this.$router.push('/userlogin');
          }else {
            this.$router.push('/usercenter/userinfo');
          }
          break;
        case "搜索":
          this.$router.push('/search');
          break;
        case "添加":
          this.$router.push('/home');
          break;
      }
    }
  },
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
        font-size:1rem;
      }
    }
  }
}
</style>