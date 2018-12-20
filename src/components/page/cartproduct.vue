<template>
 <div class="cart-product">
    <cartheader :header_title="header_title" :header_show="header_show"></cartheader>
    <cartbody @cartbodyTotalPrice="cartbodyTotalPrice" @cartselect="cartselect" @allcartselect="allcartselect" :isCheckAll='isCheckAll' :Listindexs='Listindexs' :cartTotalPrice='cartTotalPrice'></cartbody>
    <cartbottom :cartbottomTotalPrice="cartbottomTotalPrice" @allcartselect="allcartselect" :isCheckAll='isCheckAll' :cartproductvolist='cartproductvolist'></cartbottom>
 </div>
</template>

<script>
import cartheader from '../page-module/cartheader';
import cartbody from '../page-module/cartbody';
import cartbottom from '../page-module/cartbottom';
import {mapState} from 'vuex';
export default {
 data() {
  return {
    header_title:'购物车',
    header_show:true,
    cartbottomTotalPrice:0,
    isCheckAll:false,
    Listindexs:[],
    cartTotalPrice:0,
    cartproductvolist:[]
  }
 },
 computed:{
  ...mapState(['SelectProductstate','UnselectProductstate','SelectAllProductstate','UnselectAllProductstate']),
 },
 methods: {
   cartbodyTotalPrice:function(cartTotalPriceback,type){
     if(type == 'zero'){
       this.cartbottomTotalPrice = this.cartbottomTotalPrice - cartTotalPriceback;
     }else{
       this.cartbottomTotalPrice = cartTotalPriceback;
     }
   },
   //选择商品
   cartselect:function(id,index){
     let indexs = this.Listindexs.indexOf(index);
    if(indexs >= 0){
        //如果包含了该ID，则删除（单选按钮由选中变为非选中状态）
        this.Listindexs.splice(indexs,1);
        this.$store.dispatch('UnselectProductmethod',id).then(()=>{
          this.cartTotalPrice = this.UnselectProductstate.data.cartTotalPrice;
          this.cartbodyTotalPrice(this.cartTotalPrice)
        })
    }else{
        //选中该按钮
        this.Listindexs.push(index);
        this.$store.dispatch('SelectProductmethod',id).then(()=>{
          this.cartTotalPrice = this.SelectProductstate.data.cartTotalPrice;
          this.cartbodyTotalPrice(this.cartTotalPrice)
        })
    }
   },
   //所有选择商品
  allcartselect:function(cartproductvolistback){
    let that = this;
    this.cartproductvolist = cartproductvolistback;
    if(cartproductvolistback.length>0){
      this.isCheckAll = !this.isCheckAll
    }else{
      this.isCheckAll = false
    }
    if(this.isCheckAll){
      this.Listindexs=[];
      cartproductvolistback.forEach(function(elm,index){
          that.Listindexs.push(index)
      })
      this.$store.dispatch('SelectAllProductmethod').then(()=>{
          this.cartTotalPrice = this.SelectAllProductstate.data.cartTotalPrice;
          this.cartbodyTotalPrice(this.cartTotalPrice)
      })
    }else{
      this.Listindexs=[];
      this.$store.dispatch('UnselectAllProductmethod').then(()=>{
        this.cartTotalPrice = this.UnselectAllProductstate.data.cartTotalPrice;
        this.cartbodyTotalPrice(this.cartTotalPrice)
      })
    }
  },
 },
 components: {
   cartheader,
   cartbody,
   cartbottom
 }
}
</script>

<style scoped lang="scss">
</style>
