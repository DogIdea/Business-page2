<template>
 <div class="listbody">
     <div class="listtitle">
        <ul class="sort-con">
            <li class="sort-item active" data-type="default" @click="listsort($event)" >默认排序</li>
            <li class="sort-item" data-type="price" @click="listsort($event)" ref="listprice">
                <span>价格</span>
                <i class="iconfont icon-tubiaozhizuo-1"></i>
                <i class="iconfont icon-tubiaozhizuo-2"></i>
            </li>
        </ul>
     </div>
     <div class="listcontent" ref="contentlist">
       <ul class="content">
         <li class="list-item" v-for="item in goodslistitem" :key="item.id">
           <img class="item-img" :src="item.imageHost+item.mainImage">
           <div class="item-text">
             <span class="item-name">{{item.name}}</span>
             <span class="item-body">{{item.subtitle}}</span>
           </div>
           <div class="item-shop">
             <span class="item-price">￥{{item.price}}</span>
             <div class="item-buy">
               <!-- <buyicon></buyicon> -->
             </div>
           </div>
         </li>
       </ul>
     </div>
 </div>
</template>

<script>
import {GetProductList} from '@/common/service/product-service';
import BScroll from 'better-scroll';
export default {
 data() {
  return {
    goodslistitem:[]
  }
 },
 components: {
   
 },
 methods:{
   listsort:function(e) {
     let listtarget = e.target.getAttribute('data-type');
     if(listtarget == 'default'){
       return;
     }else if(listtarget == 'price') {
       console.log(this.$refs.listprice.className)
     }
     
   },
   deriveid:function() {
     let newrouteid = this.$route.params.id;
     newrouteid = newrouteid.match(/=\S*/g).join('').match(/[^=]*/g)[1];
     let formdata= {
      listParam:{
        keyword:newrouteid
      }
    }
    GetProductList(formdata.listParam).then((res)=>{
      if(res.data.status==0){
        this.goodslistitem = res.data.data.list;
      }
    }).catch((err)=>{
      this.showtext=err.msg;
    })
   },
   _initScroll(){
    this.menuScroll = new BScroll(this.$refs.contentlist, {
      click: true
    })
  }
 },
 created () {
   this.deriveid();
 },
 mounted() {
   this.$nextTick(() => {
    this._initScroll();
  });
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
    @include border-1px(rgba(7,17,27,0.1));
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
        .iconfont{
          height:1rem;
          line-height:1rem;
          font-size:1rem;
        }
        .icon-tubiaozhizuo-1{
          position:absolute;
          top:50%;
          transform: translateY(-50%);
          margin-top:-0.25rem;
        }
        .icon-tubiaozhizuo-2{
          position:absolute;
          top:50%;
          transform: translateY(-50%);
          margin-top:0.375rem;
        }
      }
    }
  }
  .listcontent{
    width:100%;
    position: fixed;
    z-index:2;
    top:$headerHeight * 2;
    bottom:0;
    overflow: hidden;
    .content{
      width:100%;
      height:auto;
      overflow: auto;
      .list-item{
        width:100%;
        height:9rem;
        padding:1rem;
        @include border-1px(rgba(7,17,27,0.1));
        .item-img{
          float: left;
          width:8rem;
          height:8rem;
          border:1px solid black;
        }
        .item-text{
          width:calc(100% - 11rem);
          margin-left:1rem;
          float: left;
          height:5rem;
          padding:0.0625rem;
          .item-name{
            @include listitem(1.5rem,#666);
          }
          .item-body{
            @include listitem(1rem,$bgColor);
          }
        }
        .item-shop{
          width:calc(100% - 11rem);
          margin-left:1rem;
          float:left;
          height:3rem;
          .item-price{
            float:left;
            font-size:1rem;
            color:$bgColor;
          }
        }
      }
    }
  }
}
</style>
