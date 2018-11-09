<template>
 <div class="classbody">
    <div class="menu-list" ref="ListMenu">
      <ul>
          <li v-for="(item,index) in goodsmenu" :key="item.id" class="menu-item" @click='ChangeGoods(index,$event)'>
            <span class="text">
              {{item.goods_class}}
            </span>
          </li>
        </ul>
    </div>
    <div class="goods-list">
      <h1 class="title">{{goodsname.goods_class}}</h1>
      <ul>
        <li v-for="goodsitem in goodsname.goods_name" :key="goodsitem.index">
          <span>
            {{goodsitem}}
          </span>
        </li>
      </ul>
    </div>
 </div>
</template>

<script>
import {GetProductList} from '@/common/service/product-service';
import goodsclass from '../../../static/mock/goodsclass.json';
export default {
 data() {
  return {
    goodsmenu:goodsclass.goodslist,
    goodsname:{
      goods_class:'',
      goods_name:[]
    }
  }
 },
 methods: {
   ChangeGoods:function(index, event) {
     this.goodsname = this.goodsmenu[index];
   }
 },
 components: {

 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.classbody{
  display: flex;
  position:relative;
  width:100%;
  min-height:100%;
  overflow:hidden;
  padding-top:$headerHeight;
  padding-bottom:$headerHeight;
  .menu-list{
    flex:0 0 5rem;
    width:5rem;
    background:#f3f5f7;
    overflow: hidden;
    .menu-item{
      display:table;
      height:4.375rem;
      width:3.5rem;
      line-height:0.875rem;
      padding:0 0.75rem;
      .text{
        display:table-cell;
        width:3.5rem;
        text-align: center;
        vertical-align:middle;
        font-size:0.75rem;
        line-height:1.5rem;
        height:1.5rem;
        @include border-1px(rgba(7,17,27,0.1));
      }   
    }
       
  }
  .goods-list{
    flex:1;
    .title{
      padding-left:0.875rem;
      height:3.5rem;
      line-height:3.5rem;
      border-left:0.125rem solid #d9dde1;
      font-size:1.2rem;
      color:rgb(147,153,159);
      background:#f3f5f7;
    }
    ul{
      height:100%;
      padding-left:1.2rem;
      padding-top:1.2rem;
      li{
        float: left;
        margin-left:1rem;
        margin-top:1rem;
        padding:0.625rem;
        font-size:1rem;
        background: #EDEDED;
        border:0.0625rem solid #EDEDED;
        border-radius: 1rem;
      }
    }
  }
}

</style>
