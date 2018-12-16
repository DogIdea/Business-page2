<template>
 <div class="detail-bottom">
   <div class="bottom_coat">
     <div class="bottom_navigation bottom_shopcart" @click="shopcartlist">
        <div class="logo">
            <i class="icon-gouwuchekong iconfont"></i>
        </div>
        <div class="num" v-show="cartTotalCount>0">{{cartTotalCount}}</div>
     </div>
     <div class="bottom_navigation bottom_price">
       <span>￥{{cartTotalPrice}}</span>
     </div>
     <div class="bottom_navigation bottom_car" @click.stop.prevent="addCart($event)">
       <span>加入购物车</span>
     </div>
     <div class="bottom_navigation bottom_text" @click.stop.prevent="buyGoods">
       <span>立即购买</span>
     </div>
      <transition name="fold">
        <div class="shopcart_list" v-show='listShow'>
          <div class="list_header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="cartclear">清空</span>
          </div>
          <div class="list_content" ref="cartlistmenu">
            <ul>
              <li class="food"  v-for="(food,index) in cartproductvolist" :key="food.id">
                <span class="name">{{food.productName}}</span>
                <div class="price">
                  <span>售价￥{{food.productPrice}}</span>
                </div>
                <div class="item-buy">
                  <buyicon :productId="food.productId" :quantity="food.quantity" :arrId="index" @decreaseCar="decreaseCar"></buyicon>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
 </div>
</template>

<script>
import buyicon from '../page-module/buyicon';
import {DeleteProduct} from '@/common/service/cart-service';
import {mapState} from 'vuex';
import BScroll from 'better-scroll';
export default {
 data() {
  return {
    cartproductvolist:[],
    detailformdata:{},
    cartTotalPrice:0,
    cartTotalCount:0,
    fold:true
  }
 },
 computed: {
   ...mapState(['AddToCartstate','ProductIdstate','GetCartListstate']),
   listShow() {
    if (!this.cartTotalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      return show;
   }
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
   //获取子组件添加删除事件
   decreaseCar:function(arrId,buyicon,type){
     if(arrId > -1 && buyicon == 1 && type == 'decrease') {
        this.cartTotalCount --;
        if(this.cartTotalCount > 0){
          this.cartTotalPrice = this.cartTotalPrice - this.cartproductvolist[arrId].productPrice;
        }else{
          this.cartTotalPrice = 0;
        }
        this.cartproductvolist.splice(arrId, 1);
     }else if(type == 'addcart'){
        this.cartTotalCount ++;
        this.cartTotalPrice = this.cartTotalPrice + this.cartproductvolist[arrId].productPrice;
     }else{
       this.cartTotalCount --;
       this.cartTotalPrice = this.cartTotalPrice - this.cartproductvolist[arrId].productPrice;
     }
     if(this.cartproductvolist.length == 0){
       this.fold = !this.fold;
     }
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
  //  获取购物车列表
   shopcartlist:function(){
      if (!this.cartTotalCount) {
        return;
      }
      if(this.GetCartListstate.status == 0){
        this.cartproductvolist = this.GetCartListstate.data.cartProductVoList
      }
      this.$nextTick(() => {
        if (!this.cartScroll) {
          this.cartScroll=new BScroll(this.$refs.cartlistmenu,{
            click:true
          });
        } else {
            this.cartScroll.refresh();
        }
      });
      this.fold = !this.fold;
   },
   //清除购物车
   cartclear:function() {
     this.cartproductvolist.forEach((item) => {
      DeleteProduct(item.productId).then((res)=>{
        if(res.data.status==0) {
          console.log(res,0)
        }else{
          console.log(res)
        }
      })
     });
     this.cartproductvolist = [];
     this.cartTotalPrice = 0;
     this.cartTotalCount = 0;
     this.fold = !this.fold;
   },
   buyGoods:function() {
    this.$router.push('/cartproduct');
   },
 },
 components: {
    buyicon
 },
 created () {
   this.cartlistload()
 },
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
    box-shadow: 0rem -0.125rem 0.125rem #666;
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
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
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
      background:#fff;
      transition:all 0.5s;
      transform:translate3d(0,-100%,0);
      &.fold-enter,&.fold-leave-to{
        transform:translate3d(0,0,0)
      }
      .list_header{
        height:3rem;
        line-height:3rem;
        padding:0 1.125rem;
        background:#f3f5f7;
        border-bottom:0.0625rem solid rgba(7,17,27,0.1);
        color:#000;
        font-size:1rem;
        .title{
          float:left;
          font-size:0.875rem;
          color:rgb(7,17,27);
        }
        .empty{
          float:right;
          font-size:0.75rem;
          color:$bgColor; 
        }
      }
      .list_content{
        max-height:13.5rem;
        width:100%;
        background:#fff;
        overflow:hidden;
        .food{
          position: relative;
          padding:0.75rem 0.75rem;
          box-sizing:border-box;
          @include border-1px(rgba(7,17,27,0.1));
          .name{
            display:inline-block;
            width:8rem;
            line-height:1.5rem;
            font-size:0.875rem;
            color:rgb(7,17,27);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .price{
            position:absolute;
            right:10rem;
            bottom:1.5rem;
            line-height:1.5rem;
            font-size:0.875rem;
            font-weight:700;
            color:rgb(240,20,20);
          }
          .item-buy{
            float:right;
            margin-top:0.5rem;
            margin-right:1rem;
          }
        }
      }
    }
  }
}
</style>