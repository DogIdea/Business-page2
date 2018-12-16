<template>
 <div class="cart-body">
   <div class="cart-title">
     <div class="cart-item">
       全选
     </div>
     <div class="cart-choose">
        <label class="ci-check-lable">
          <input type="checkbox"><i></i>
        </label>
      </div>
   </div>
   <ul>
      <li class="cart-list" v-for="(food,index) in cartproductvolist" :key="food.id">
        <div class="cart-item">
          <div class="cart-content">
            <span class="name">{{food.productName}}</span>
                <div class="price">
                  <span>￥{{food.productPrice}}</span>
                </div>
          </div>
          <div class="cart-img">
            <img :src="imageHost+food.productMainImage">
          </div>
          <div class="cart-item-buy">
            <buyicon :productId="food.productId" :quantity="food.quantity" :arrId="index"></buyicon>
          </div>
        </div>
        <div class="cart-choose">
          <label class="ci-check-lable">
            <input type="checkbox"><i></i>
          </label>
        </div>
     </li>
   </ul>
 </div>
</template>

<script>
import buyicon from '../page-module/buyicon';
import {mapState} from 'vuex';
import BScroll from 'better-scroll';
export default {
 data() {
  return {
    cartproductvolist:[],
    imageHost:'http://img.happymmall.com/'
  }
 },
 computed:{
   ...mapState(['GetCartListstate']),
 },
 methods:{
  cartproductlist:function(){
    console.log(this.GetCartListstate.data.cartProductVoList)
    this.cartproductvolist = this.GetCartListstate.data.cartProductVoList
    // this.$nextTick(() => {
    //   if (!this.cartproductScroll) {
    //     this.cartproductScroll=new BScroll(this.$refs.cartproductlist,{
    //       click:true
    //     });
    //   } else {
    //     this.cartproductScroll.refresh();
    //   }
    // });
  }
 },
 created() {
   this.cartproductlist()  
 },
 components: {
  buyicon
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.cart-body{
    position: absolute;
    top:$headerHeight;
    bottom:$headerHeight;
    left:0;
    z-index:1;
    width:100%;
    .cart-title{
      width:100%;
      height:$headerHeight;
      padding:0;
      padding-left:$headerHeight;
      background:#fff;
      color:$bgColor;
      box-shadow: 0rem 0.0625rem 0.0625rem #ededed;
      overflow: hidden;
      .cart-item,.cart-choose{
        position: relative;
        float: left;
        min-height: $headerHeight;
      }
      .cart-item{
        box-sizing: border-box;
        background: #fff;
        width:100%;
        word-break: break-all;
        padding:0;
        padding-top:1rem;
        padding-left:1rem;
        overflow: hidden;
      }
      .cart-choose{
        box-sizing: border-box;
        margin-left: -100%;
        left:-$headerHeight;
        width:$headerHeight;
        padding-left:1rem;
        padding-top:1rem;
        background:#fff;
        .ci-check-lable{
          position: relative;
        }
        .ci-check-lable input{
          position: absolute;
          left: -99rem;
        }
        .ci-check-lable i {
          position:relative;
          display:inline-block;
          width: 1rem;
          height: 1rem;
          outline: 0;
          border: 0.0625rem solid #ccc;
          border-radius: 100%;
          background: transparent;
        }
        .ci-check-lable input[type=checkbox]:checked + i {
          border:0.0625rem solid $bgColor;
          background-color: $bgColor;
        }
        .ci-check-lable input[type=checkbox]:checked + i:after {
          position: absolute;
          content: '';
          top: 50%;
          left: 50%;
          margin-top: -0.1875rem;
          margin-left: -0.3125rem;
          -webkit-transform: rotate(-53deg);
          transform: rotate(-53deg); 
          width: 0.5rem;
          height: 0.1875rem;
          border: 0.0625rem solid #fff;
          border-top: 0;
          border-right: 0;
        }
      }
    }
    ul{
      height:100%;
      .cart-list{
        padding:0;
        padding-left:$headerHeight;
        overflow: hidden;
        .cart-item,.cart-choose{
          position: relative;
          float: left;
          min-height: 6rem;
        }
        .cart-choose{
          box-sizing: border-box;
          margin-left: -100%;
          left:-$headerHeight;
          width:$headerHeight;
          padding-top:2.5rem;
          padding-left:1rem;
          background:#ededed;
          .ci-check-lable{
            position: relative;
          }
          .ci-check-lable input{
            position: absolute;
            left: -99rem;
          }
          .ci-check-lable i {
            position:relative;
            display:inline-block;
            width: 1rem;
            height: 1rem;
            outline: 0;
            border: 0.0625rem solid #ccc;
            border-radius: 100%;
            background: transparent;
          }
          .ci-check-lable input[type=checkbox]:checked + i {
            border:0.0625rem solid $bgColor;
            background-color: $bgColor;
          }
          .ci-check-lable input[type=checkbox]:checked + i:after {
            position: absolute;
            content: '';
            top: 50%;
            left: 50%;
            margin-top: -0.1875rem;
            margin-left: -0.3125rem;
            -webkit-transform: rotate(-53deg);
            transform: rotate(-53deg); 
            width: 0.5rem;
            height: 0.1875rem;
            border: 0.0625rem solid #fff;
            border-top: 0;
            border-right: 0;
          }
        }
        .cart-item{
          box-sizing: border-box;
          background: #fff;
          width:100%;
          word-break: break-all;
          padding:0;
          padding-left:6rem;
          overflow: hidden;
          .cart-img,.cart-content,.cart-item-buy{
            position: absolute;
            float: left;
            min-height: 6rem;
          }
          .cart-img{
            width:6rem;
            height:6rem;
            box-sizing: border-box;
            padding:1rem;
            left:0;
            img{
              display: block;
              width:5rem;
              height:5rem;
            }
          }
          .cart-item-buy{
            margin-top:2.5rem;
            right:1rem;
            width:6rem;
          }
          .cart-content{
            width:100%;
            word-break: break-all;
            overflow: hidden;
            padding:1rem;
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
              line-height:1.5rem;
              font-size:0.875rem;
              font-weight:700;
              color:rgb(240,20,20);
            }
          }
        }
      }
    }
    
}
</style>
