<template>
 <div class="detail-bottom">
     <div class="bottom_navigation bottom_shopcart">
        <div class="logo">
            <i class="iconfont icon-gouwuchekong"></i>
        </div>
     </div>
     <div class="bottom_navigation bottom_price">
       <span>￥{{cartlistformdata.cartTotalPrice}}</span>
     </div>
     <div class="bottom_navigation bottom_car" @click.stop.prevent="addCart($event)">
       <span>加入购物车</span>
     </div>
     <div class="bottom_navigation bottom_text" @click.stop.prevent="buyGoods($event)">
       <span>立即购买</span>
     </div>
 </div>
</template>

<script>
import {AddToCart,GetCartList} from '@/common/service/cart-service';
export default {
 data() {
  return {
    detailformdata:{},
    cartlistformdata:{}
  }
 },
 methods:{
   addCart:function() {
     let newcount = 1;
     let productId = this.detailformdata.productId;
     
     AddToCart({
      productId: productId,
      count: newcount
     }).then((res)=>{
      if(res.data.status==0) {
        console.log(res)
      }else{
        console.log(res)
      }
    }).catch((err)=>{
      console.log(err)
    }) 
   },
   cartlistload:function() {
     GetCartList().then((res)=>{
        if(res.data.status==0) {
          this.cartlistformdata = res.data.data;
          console.log(this.cartlistformdata)
        }else{
          console.log(res)
        }
      }).catch((err)=>{
        console.log(err)
      }) 
     
   },
   buyGoods:function() {
    this.$router.push('/cart')
   }
 },
 components: {

 },
 created () {
   this.detailformdata = this.$store.state.GoodsDetail.detailformdata;
   this.cartlistload()
 }
}
</script>

<style scoped lang="scss" type="text/css">
@import '@/assets/css/varibles.scss';
.detail-bottom{
  position:fixed;
  z-index:10;
  width:100%;
  line-height:$headerHeight;
  height:$headerHeight;
  left:0;
  right:0;
  bottom:0;
  background:$bgColor;
  color:#fff;
  box-shadow: 0rem -0.125rem 0.125rem #ededed;
  .bottom_shopcart{
    position:relative;
    left:0.625rem;
    top:-0.625rem;
    vertical-align:top;
    text-align:center;
    padding:0.4rem;
    width:3.5rem;
    height:3.5rem;
    background:$bgColor;
    border-radius:50%;
    color:$bgColor;
    .logo{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      border-radius:50%;
      background:#fff;
      width:$headerHeight;
      height:$headerHeight;
    }
  }
  .bottom_price{
    position: absolute;
    top:0;
    left:6rem;
    line-height:$headerHeight;
    font-size:1.5rem;
    color:#fff;
    font-weight:bold;
  }
  .bottom_car{
    position: absolute;
    top:0;
    right:8rem;
    height:$headerHeight;
    width:8rem;
    line-height:$headerHeight;
    background:#ec0f35;
    font-size:1rem;
    font-weight:bold;
    color:#fff;
    text-align: center;
    vertical-align: middle;
  }
  .bottom_text{
    position: absolute;
    top:0;
    right:0rem;
    height:$headerHeight;
    width:8rem;
    line-height:$headerHeight;
    background:#fff;
    font-size:1rem;
    font-weight:bold;
    color:$bgColor;
    text-align: center;
    vertical-align: middle;
  }
}
</style>