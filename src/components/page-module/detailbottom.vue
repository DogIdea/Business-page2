<template>
 <div class="detail-bottom">
   <div class="bottom_coat">
     <div class="bottom_navigation bottom_shopcart">
        <div class="logo">
            <i class="iconfont icon-gouwuchekong"></i>
        </div>
        <div class="num" v-show="cartTotalCount>0">{{cartTotalCount}}</div>
     </div>
     <div class="bottom_navigation bottom_price">
       <span>￥{{cartTotalPrice}}</span>
     </div>
     <div class="bottom_navigation bottom_car" @click.stop.prevent="addCart($event)">
       <span>加入购物车</span>
     </div>
     <div class="bottom_navigation bottom_text" @click.stop.prevent="buyGoods($event)">
       <span>立即购买</span>
     </div>
     <div class="shopcart_list">
        <div class="list_header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import {GetCartList} from '@/common/service/cart-service';
import {mapState} from 'vuex';
export default {
 data() {
  return {
    detailformdata:{},
    cartTotalPrice:'',
    cartTotalCount:0
  }
 },
 computed: {
   ...mapState(['AddToCartstate','ProductIdstate','GetCartListstate']),
 },
 methods:{
   addCart:function() {
     let newcount = 1;
     let productId = this.ProductIdstate.productid;
    //添加购物车商品
     this.$store.dispatch('AddToCartmethod',{
       productId: productId,
       count: newcount
     }).then(() => {
       this.cartlistload()
     })
   },
   cartlistload:function() {
     this.$store.dispatch('GetCartListmethod').then(()=>{
        if(this.GetCartListstate.status == 0){
          this.cartTotalPrice = this.GetCartListstate.data.cartTotalPrice
          if(this.cartTotalCount == 0){
            this.GetCartListstate.data.cartProductVoList.forEach((item,index) => {
               this.cartTotalCount += item.quantity
            });
          }else{
            this.cartTotalCount += 1 
          }
        }else{
          this.cartTotalPrice = 0
        }
     })
   },
   buyGoods:function() {
    this.$router.push('/cart')
   }
 },
 components: {

 },
 created () {
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
  .bottom_coat{
    position:absolute;
    line-height:$headerHeight;
    height:$headerHeight;
    left:0;
    right:0;
    top:0;
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
      .num{
        @include iconnum();
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
    .shopcart_list{
      position:absolute;
      top:0;
      left:0;
      z-index:-1;
      width:100%;
      height:50rem;
      .list_header{
        height:2.5rem;
        line-height:2.5rem;
        padding:0 1.125rem;
        background:#f3f5f7;
        border-bottom:0.0625rem solid rgba(7,17,27,0.1);
      }
    }
  }
}
</style>