<template>
 <div class="buyicon">
      <div class="cart-decrease">
          <span class="iconfont icon-jianhao inner" v-show="buyconut>0" @click.stop.prevent="decreaseCar($event)"></span>
      </div>
      <div class="cart-count" v-show="buyconut>0">{{buyconut}}</div>
      <div class="iconfont icon-add_circle cart-add" @click.stop.prevent="addCart($event)"></div>
 </div>
</template>

<script>
export default {
 data() {
  return {
    buyconut:0
  }
 },
 methods:{
   addCart:function(event) {
    if (!event._constructed) {
      return;
    }
    console.log(this.buyconut);
    this.buyconut++;
    
   },
   decreaseCar:function(event) {
     if (!event._constructed) {
      return;
     }
      console.log(this.buyconut);
     if (this.buyconut) {
        this.buyconut--;
     }  
   }
 },
 components: {

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