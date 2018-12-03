<template>
 <div class="buyicon">
      <div class="cart-decrease">
          <span class="iconfont icon-jianhao inner" data-type="decreaseCar" v-show="buyconut>0" @click.stop.prevent="addCart($event)"></span>
      </div>
      <div class="cart-count" v-show="buyconut>0">{{buyconut}}</div>
      <div class="iconfont icon-add_circle cart-add" data-type="addCart" @click.stop.prevent="addCart($event)"></div>
 </div>
</template>

<script>
import {DeleteProduct} from '@/common/service/cart-service';
import {mapState} from 'vuex';
export default {
 props:{
   productId:Number,
   arrId:Number,
   quantity:Number,
 },
 data() {
  return {
    buyconut:0
  }
 },
 computed:{
   ...mapState(['AddToCartstate','UpdateProducstate','GetCartListstate']),
   getcartcount(){
    let count= 0;
    if(this.GetCartListstate.data.cartProductVoList){
      this.GetCartListstate.data.cartProductVoList.forEach((item) => {
       if(item.productId == this.productId){
         count = item.quantity
       }
     });
    }
    return count;
   }
 },
 methods:{
   addCart:function(event) {
    let newcount = 0
    if (!event._constructed) {
      return;
    }
    if (event.target.getAttribute('data-type')=='addCart'){
       this.buyconut = this.buyconut + 1;
       this.$emit('decreaseCar', this.arrId,this.buyconut,'addcart')
       newcount = 1;
    }else if(event.target.getAttribute('data-type')=='decreaseCar'){
      if(this.buyconut == 1){
        this.buyconut = 0;
        //传递给父组件用于更改父组件数组
        DeleteProduct(this.productId).then((res)=>{
          if(res.data.status==0) {
            this.$emit('decreaseCar', this.arrId,this.buyconut,'decrease')
          }
        })
      }else if(this.buyconut > 0 || !(this.buyconut == 0)){
        this.buyconut = this.buyconut - 1;
        newcount = -1;
        this.$emit('decreaseCar', this.arrId,this.buyconut,'decrease');
      }
    }
    //添加购物车商品
    // if(this.buyconut == 1){
      this.$store.dispatch('AddToCartmethod',{
        productId: this.productId,
        count: newcount
      })
    //   console.log(this.GetCartListstate,'add')
    // }else{
    //   this.$store.dispatch('UpdateProducmethod',{
    //     productId: this.productId,
    //     count: this.buyconut
    //   }).then(() => {
    //     this.UpdateProducstate
    //   })
    //   console.log(this.GetCartListstate,'updata')
    // }
   },
 },
 created() {
   console.log(this.GetCartListstate)
   if(!this.quantity){
     this.buyconut = this.getcartcount;
   }else{
     console.log('quantity')
     this.buyconut = this.quantity;
   }
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.buyicon{
  font-size:0;
  .cart-decrease,.cart-count,.cart-add{
    display:inline-block;
  }
  .cart-decrease{
    padding:0.375rem;
    .inner{
      display:inline-block;
      font-size:1.5rem;
      line-height:1.5rem;
      color:$bgColor;
    }  
  }
  .cart-add{
    font-size:1.5rem;
    line-height:1.5rem;
    padding:0.375rem;
    color:$bgColor;
  }
  .cart-count{
     vertical-align:top;
     width:auto;
     padding:0.375rem;
     padding-top:0.375rem;
     line-height:1.5rem;
     text-align:center;
     font-size:0.625rem;
     color:rgb(147,153,159);
  }
}
            
</style>