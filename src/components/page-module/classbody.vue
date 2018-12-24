<template>
 <div class="classbody">
    <div class="menu-list" ref="menulist">
      <ul >
          <li v-for="(item,index) in goodsmenu" :key="item.id" class="menu-item" :class="{'isActive':activeIndex == index}" @click.stop.prevent="ChangeGoods(index,$event);checkMenu(index)">
            <span class="text">
              {{item.goods_class}}
            </span>
          </li>
        </ul>
    </div>
    <div class="goods-list" ref="goodslist">
      <div class="goods-warrper">
        <h1 class="title">{{goodsname.goods_class}}</h1>
        <ul>
          <li v-for="(goodsitem,index) in goodsname.goods_name" :key="goodsitem.id" :class="{'isActive':goodsactiveIndex == index}" @click.stop.prevent="GoodsItem(goodsitem);checkGoods(index)">
            <span>
              {{goodsitem}}
            </span>
          </li>
        </ul>
      </div>
    </div>
 </div>
</template>

<script>
import {GetProductList} from '@/common/service/product-service';
import goodsclass from '../../../static/mock/goodsclass.json';
import BScroll from 'better-scroll';
export default {
 data() {
  return {
    goodsmenu:goodsclass.goodslist,
    goodsname:{
      goods_class:'',
      goods_name:[]
    },
    activeIndex:-1,
    goodsactiveIndex:-1
  }
 },
 methods: {
  ChangeGoods:function(index, event) {
     this.goodsname = this.goodsmenu[index];
  },
  GoodsItem:function(goodsitem) {
    let formdata= {
      listParam:{
        keyword:goodsitem
      }
    }
    GetProductList(formdata.listParam).then((res)=>{
      if(res.data.status==0){
        let goodslist='/goodslist/'+ 'keyword='+goodsitem
        this.$router.push(goodslist)
      }
    }).catch((err)=>{
      this.showtext=err.msg;
    })
  },
  checkMenu:function(index){
    this.activeIndex=index;
  },
  checkGoods:function(index){
    this.goodsactiveIndex=index;
  },
  _initScroll(){
    this.menuScroll = new BScroll(this.$refs.menulist, {
      click: true
    })
    this.goodsScroll =new BScroll(this.$refs.goodslist, {
      click: true
    })
  }
 },
 components: {

 },
 created () {
  this.ChangeGoods(0);
  this.$nextTick(() => {
    this._initScroll();
  });
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.classbody{
  width:100%;
  min-height:100%;
  overflow:hidden;
  .menu-list{
    position: absolute;
    top:$headerHeight;
    left:0;
    bottom:$headerHeight;
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
    .isActive{
      background:$bgColor;
      color: #fff;
    }
  }
  .goods-list{
    position: absolute;
    left:5rem;
    top:$headerHeight;
    bottom:$headerHeight;
    overflow: hidden;
    .goods-warrper{
      height: auto;
      padding-bottom:$headerHeight;
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
        width:90%;
        height:100%;
        margin:0 auto;
        overflow: hidden;
        li{
          float: left;
          width:calc(45% - 1rem);
          text-align: center;
          margin-top:1rem;
          padding:0.625rem;
          font-size:1rem;
          background: #EDEDED;
          border:0.0625rem solid #EDEDED;
          border-radius: 1rem;
        }
        li:nth-child(2n){
          margin-left:1rem;
        }
        .isActive{
          background:$bgColor;
          color: #fff;
        }
      }
    }
  }
}

</style>
