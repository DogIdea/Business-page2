<template>
 <div class="cart-body">
   <div class="cart-title">
     <div class="cart-item" @click="allcartselect">
       全选
     </div>
     <div class="cart-choose">
        <label class="ci-check-lable">
          <input type="checkbox" :checked="isCheckAll" @change="allcartselect"><i></i>
        </label>
      </div>
   </div>
   <div class="cart-product-content" ref="cartproductlist">
    <ul>
      <li class="cart-list" v-for="(goods,index) in cartproductvolist" :key="goods.id">
        <div class="cart-item">
          <div class="cart-content">
            <span class="name">{{goods.productName}}</span>
                <div class="price">
                  <span>￥{{goods.productPrice}}</span>
                </div>
          </div>
          <div class="cart-img">
            <img :src="imageHost+goods.productMainImage">
          </div>
          <div class="cart-item-buy">
            <buyicon :productId="goods.productId" :quantity="goods.quantity" :arrId="index"  @bycartbodyTotalPrice="bycartbodyTotalPrice"></buyicon>
          </div>
        </div>
        <div class="cart-choose">
          <label class="ci-check-lable">
            <input type="checkbox" :checked="Listindexs.indexOf(index)>=0" @change="cartselect(goods.productId,index)"><i></i>
          </label>
        </div>
      </li>
    </ul>
   </div>
 </div>
</template>

<script>
import buyicon from '../page-module/buyicon';
import {mapState} from 'vuex';
import BScroll from 'better-scroll';
export default {
 props:{
   isCheckAll:Boolean,
   Listindexs:Array,
   cartTotalPrice:Number
 },
 data() {
  return {
    cartproductvolist:[],
    imageHost:'http://img.happymmall.com/'
  }
 },
 computed:{
   ...mapState(['GetCartListstate','SelectProductstate','UnselectProductstate','SelectAllProductstate','UnselectAllProductstate','UpdateProducstate']),
 },
 methods:{
  cartproductlist:function(){
    this.cartproductvolist = this.GetCartListstate.data.cartProductVoList
    if(this.cartproductvolist.length == 0){
      this.$router.push({name: 'Errorpage', params: {errormsg:'您的购物车空空如野，快去购物把'}})
      return;
    }
    this.$nextTick(() => {
      if (!this.cartproductScroll) {
        this.cartproductScroll=new BScroll(this.$refs.cartproductlist,{
          click:true
        });
      } else {
        this.cartproductScroll.refresh();
      }
    });
  },
  //选择商品
  cartselect:function(id,index){
    this.$emit('cartselect',id,index)
  },
  //所有选择商品
  allcartselect:function(){
    this.$emit('allcartselect',this.cartproductvolist)
  },
  bycartbodyTotalPrice:function(productId,buycount,arrId){
    if(buycount == 0){
      this.$emit('cartbodyTotalPrice',this.cartproductvolist[arrId].productPrice,'zero')
      this.cartproductvolist.splice(arrId, 1);
    }else{
      this.$store.dispatch('UpdateProducmethod',{
        productId: productId,
        count: buycount
        }).then(()=>{
      this.$emit('cartbodyTotalPrice',this.UpdateProducstate.data.cartTotalPrice)
      })
    }
  }
 },
 created() {
   this.cartproductlist();  
   this.allcartselect();
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
    .cart-product-content{
      position: relative;
      height:100%;
      width:100%;
      top:0;
      left:0;
      bottom:$headerHeight;
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
              width:8rem;
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
}
</style>
