<template>
 <div class="cart-bottom">
   <div class="bottom_coat">
     <div class="bottom_navigation bottom_shopcart" @click="shopaddresslist">
        <div class="logo">
            <i class="icon-chengshi"></i>
        </div>
     </div>
     <div class="bottom_navigation bottom_price">
       <span>总价:￥<strong>{{cartTotalPrice}}</strong></span>
     </div>
     <div class="bottom_navigation bottom_text" @click.stop.prevent="settlement">
       <span>立即结算</span>
     </div>
      <transition name="fold">
        <div class="shopcart_list" v-show='listShow'>
          <div class="list_header">
            <h1 class="title">地址列表</h1>
            <span class="empty icon-jinzhi1" @click="closemenu"></span>
          </div>
          <div class="list_content" ref="cartlistmenu">
            <ul>
               <li class="addressitem" v-for="item in addresslists" :key="item.id">
                <div class='address-list-item'>
                  <span class="name">收件人：{{item.receiverName}}</span>
                  <span class="phone">联系电话：{{item.receiverPhone}}</span>
                </div>
                <div class='address-list-item'>
                  <span class="address">{{item.receiverProvince}}</span>
                  <span class="address">{{item.receiverCity}}</span>
                  <span class="address">{{item.receiverAddress}}</span>
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
import {DeleteProduct} from '@/common/service/cart-service';
import {mapState} from 'vuex';
import BScroll from 'better-scroll';
export default {
 data() {
  return {
    addresslists:[],
    cartproductvolist:[],
    detailformdata:{},
    cartTotalPrice:0,
    cartTotalCount:0,
    fold:false
  }
 },
 computed: {
   ...mapState(['ProductIdstate','GetAddressListstate']),
   listShow() {
      let show = this.fold;
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
   //获取地址列表
   addressload:function(){
     this.$store.dispatch('GetAddressListmethod').then(()=>{
      if(this.GetAddressListstate.status == 0){
        this.addresslists = this.GetAddressListstate.data.list
      }
    })
   },
  //  获取购物车列表
   shopaddresslist:function(){
      if(this.GetAddressListstate.status == 0) {
        this.addresslists = this.GetAddressListstate.data.list
      }else{
        this.addressload();
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
   //关闭
   closemenu:function() {
     this.fold = !this.fold;
   },
   settlement:function() {
    console.log('结算')
   },
 }
}
</script>

<style scoped lang="scss" type="text/css">
@import '@/assets/css/varibles.scss';
.cart-bottom{
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
    background:#fff;
    color:$bgColor;
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
      background:#fff;
      border-radius:50%;
      color:#fff;
      box-shadow: 0rem -0.25rem 1.25rem rgb(216, 211, 211);
      .logo{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        border-radius:50%;
        background:$bgColor;
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
      font-size:1rem;
      color:$bgColor;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      strong{
        font-weight:bold;
      }
    }
    .bottom_text{
      position: absolute;
      top:0;
      right:0rem;
      height:$headerHeight;
      width:8rem;
      line-height:$headerHeight;
      background:$bgColor;
      font-size:1rem;
      font-weight:bold;
      color:#fff;
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
          font-size:1.5rem;
          color:$bgColor; 
        }
      }
      .list_content{
        max-height:13.5rem;
        width:100%;
        background:#fff;
        overflow:hidden;
        .addressitem{
          box-sizing:border-box;
          overflow:auto;
          @include border-1px(rgba(7,17,27,0.1));
          .address-list-item{
            padding-top:0.5rem;
            padding-bottom:0.5rem;
            float: left;
            width:50%;
            overflow: auto;
            .name{
              margin-left:1rem;
              display:block;
              width:100%;
              line-height:1rem;
              font-size:0.875rem;
              color:rgb(7,17,27);
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .phone{
              display:block;
              margin-top:1rem;
              margin-left:1rem;
              width:100%;
              line-height:1rem;
              font-size:0.875rem;
              color:rgb(7,17,27);
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            .address{
              display: block;
              margin-top:0.125rem;
              margin-left:0.5rem;
              display:block;
              width:100%;
              line-height:1rem;
              font-size:0.875rem;
              color:rgb(7,17,27);
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
          }
          
        }
      }
    }
  }
}
</style>