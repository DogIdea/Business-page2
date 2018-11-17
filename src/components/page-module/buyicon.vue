<template>
 <div class="buyicon">
      <div class="cart-decrease">
          <span class="iconfont icon-jianhao inner" v-show="buyicon.count>0" @click.stop.prevent="decreaseCar($event)"></span>
      </div>
      <div class="cart-count" v-show="buyicon.count>0">{{buyicon.count}}</div>
      <div class="iconfont icon-add_circle cart-add" @click.stop.prevent="addCart($event)"></div>
 </div>
</template>

<script>
export default {
 data() {
  return {
    buyicon:{
      conut:0
    }
  }
 },
 methods:{
   addCart:function(event) {
    if (!event._constructed) {
      return;
    }
    console.log(event)
    this.buyicon.count++;
   },
   decreaseCar:function(event) {
     if (!event._constructed) {
      return;
     }
     if (this.food.count) {
        this.buyicon.count--;
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
}
            
</style>