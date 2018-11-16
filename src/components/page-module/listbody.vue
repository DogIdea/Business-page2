<template>
 <div class="listbody">
     <div class="listtitle">
        <ul class="sort-con">
            <li class="sort-item active" data-type="default" @click="listsort($event)" ref="default">默认排序</li>
            <li class="sort-item" data-type="price"  @click="listsort($event)" ref="price">
                <span>价格</span>
                <i class="iconfont icon-tubiaozhizuo-1" data-type="price1" ></i>
                <i class="iconfont icon-tubiaozhizuo-2" data-type="price2" ></i>
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
               <buyicon></buyicon>
             </div>
           </div>
         </li>
       </ul>
     </div>
 </div>
</template>

<script>
import buyicon from '../page-module/buyicon';
import {GetProductList} from '@/common/service/product-service';
import BScroll from 'better-scroll';
export default {
 data() {
  return {
    goodslistitem:[],
    listformdate:{
      keyword:'',
      orderBy:''
    }
  }
 },
 components: {
   buyicon
 },
 methods:{
   listsort:function(e) {
     let listtarget = e.target;
     let childrenlength = this.$refs.price.children.length;
     if(listtarget.getAttribute('data-type') == 'default'){
       listtarget.classList.add('active');
       for(let i=0;i<childrenlength;i++){
         this.$refs.price.children[i].classList.remove('active');
       }
       this.listformdate.orderBy = 'default';
     }else{
       this.$refs.price.children[0].classList.add('active');
       this.$refs.default.classList.remove('active');
       if(listtarget.getAttribute('data-type')=='price2'){
         this.$refs.price.children[2].classList.add('active');
         this.$refs.price.children[1].classList.remove('active');
         this.listformdate.orderBy = 'price_asc'
       }else {  
         this.$refs.price.children[1].classList.add('active');
         this.$refs.price.children[2].classList.remove('active');
         this.listformdate.orderBy = 'price_desc'
       }
     }
     this.deriveid();
   },
   deriveid:function() {
     let _this = this;
     let newrouteid = _this.$route.params.id;
     newrouteid = newrouteid.match(/=\S*/g).join('').match(/[^=]*/g)[1];
     _this.listformdate.keyword=newrouteid
    GetProductList(_this.listformdate).then((res)=>{
      if(res.data.status==0){
        _this.goodslistitem = res.data.data.list;
      }
    }).catch((err)=>{
      _this.showtext=err.msg;
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
      .active{
        color:$bgColor;
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
