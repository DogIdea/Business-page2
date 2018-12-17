<template>
 <div class="cart-body">
   <div class="cart-title">
     <div class="cart-item">
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
            <buyicon :productId="goods.productId" :quantity="goods.quantity" :arrId="index"></buyicon>
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
 data() {
  return {
    Listindexs:[],
    isCheckAll:false,
    cartTotalPrice:0,
    cartproductvolist:[],
    imageHost:'http://img.happymmall.com/'
  }
 },
 computed:{
   ...mapState(['GetCartListstate','SelectProductstate','UnselectProductstate','SelectAllProductstate','UnselectAllProductstate']),
 },
 methods:{
  cartproductlist:function(){
    this.cartproductvolist = this.GetCartListstate.data.cartProductVoList
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
    let indexs = this.Listindexs.indexOf(index);
    if(indexs >= 0){
        //如果包含了该ID，则删除（单选按钮由选中变为非选中状态）
        this.Listindexs.splice(indexs,1);
        this.$store.dispatch('UnselectProductmethod',id).then(()=>{
          this.cartTotalPrice = this.UnselectProductstate.data.cartTotalPrice;
          this.$emit('cartbodyTotalPrice',this.cartTotalPrice)
        })
    }else{
        //选中该按钮
        this.Listindexs.push(index);
        this.$store.dispatch('SelectProductmethod',id).then(()=>{
          this.cartTotalPrice = this.SelectProductstate.data.cartTotalPrice;
          this.$emit('cartbodyTotalPrice',this.cartTotalPrice)
        })
    }
  },
  //所有选择商品
  allcartselect:function(){
    let that = this;
    this.isCheckAll = !this.isCheckAll
     if(this.isCheckAll){
        this.Listindexs=[];
        this.cartproductvolist.forEach(function(elm,index){
            that.Listindexs.push(index)
        })
        this.$store.dispatch('SelectAllProductmethod').then(()=>{
           this.cartTotalPrice = this.SelectAllProductstate.data.cartTotalPrice;
           this.$emit('cartbodyTotalPrice',this.cartTotalPrice)
        })
      }else{
        this.Listindexs=[];
        this.$store.dispatch('UnselectAllProductmethod').then(()=>{
          this.cartTotalPrice = this.UnselectAllProductstate.data.cartTotalPrice;
          this.$emit('cartbodyTotalPrice',this.cartTotalPrice)
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
}
</style>
