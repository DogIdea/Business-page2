<template>
 <div class="buyicon">
      <div class="cart-decrease">
          <span class="iconfont icon-jianhao inner" data-type="decreaseCar" v-show="buycount>0" @click.stop.prevent="addCart($event)"></span>
      </div>
      <div class="cart-count" v-show="buycount>0">{{buycount}}</div>
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
    buycount:0
  }
 },
 computed:{
   ...mapState(['AddToCartstate','UpdateProducstate','GetCartListstate',]),
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
       this.buycount = this.buycount + 1;
       this.$emit('decreaseCar', this.arrId,this.buycount,'addcart')
       newcount = 1;
    }else if(event.target.getAttribute('data-type')=='decreaseCar'){
      if(this.buycount == 1){
        //传递给父组件用于更改父组件数组
        this.$emit('decreaseCar', this.arrId,this.buycount,'decrease');
        this.buycount = 0;
        DeleteProduct(this.productId).then((res)=>{
          if(res.data.status==0) {
            this.$emit('bycartbodyTotalPrice',this.productId,this.buycount,this.arrId);
          }
        })
      }else if(this.buycount > 0 || !(this.buycount == 0)){
        this.$emit('decreaseCar', this.arrId,this.buycount,'decrease');
        this.buycount = this.buycount - 1;
        newcount = -1;
      }
    }
    //添加购物车商品
    if(this.buycount > 0){
      this.$store.dispatch('AddToCartmethod',{
        productId: this.productId,
        count: newcount
      })
      this.$emit('bycartbodyTotalPrice',this.productId,this.buycount,this.arrId);
    }
   },
 },
 created() {
   if(!this.quantity){
     this.buycount = this.getcartcount;
   }else{
     this.buycount = this.quantity;
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
    padding:0.5rem;
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
    padding:0.5rem;
    color:$bgColor;
  }
  .cart-count{
     vertical-align:top;
     width:1.5rem;
     padding-top:0.5rem;
     line-height:1.5rem;
     text-align:center;
     font-size:1rem;
     color:rgb(147,153,159);
     overflow: hidden;
     text-overflow:ellipsis;
     white-space: nowrap;
  }
}
            
</style>