<template>
 <div class="goods-body" ref="goodslist">
    <div class="goods-child">
      <div class="goodsimg">
        <swiper :options="swiperOption">
          <!-- slides -->
          <swiper-slide v-for="item in imgarr" :key="item.id">
            <img class="swpier-img" :src="goodsdetail.imageHost + item" alt="">
          </swiper-slide>
        </swiper>
      </div>
      <div class="content">
        <div class="title">
            <h1>
              {{goodsdetail.name}}
            </h1>
        </div>
        <span class="text">
          {{goodsdetail.subtitle}}
        </span>
        <span class="count">
          库存：{{goodsdetail.stock}}
        </span>
        <div class="transaction">
            <span class="price">售价: ¥{{goodsdetail.price}}</span>
            <span class="depreciate">降价提醒</span>
        </div>
      </div>
      <div class="floor-bottom"></div>
      <div class="payment select">
          <div class="left">支付</div>
          <div class="center">
            <ul>
              <li>【激活分期】新用户得百元礼包</li>
              <li>【B支付】首单随机立减3-99元</li>
              <li>【快捷支付】随机获得B支付红包2-50</li>
            </ul>
          </div>
          <div class="right">
            <i>....</i>
          </div>
      </div>
      <div class="floor-bottom"></div>
      <div class="sales select">
          <div class="left">促销</div>
          <div class="center">
            <ul>
              <li>
                <strong>满额返券</strong>购买满10000元立返200元商品券，返完即止
              </li>
            </ul>
          </div>
          <div class="right">
            <i>....</i>
          </div>
      </div>
      <div class="floor-bottom"></div>
      <div class="address select">
          <div class="left">送至</div>
          <div class="center">
            <ul>
              <li>
                北京朝阳区三环到四环之间
              </li>
            </ul>
          </div>
          <div class="right">
            <i>....</i>
          </div>
      </div>
      <div class="floor-bottom"></div>
    </div>
 </div>
</template>

<script>
import BScroll from 'better-scroll';
import {mapState} from 'vuex';
export default {
 data() {
  return {
    imgarr:[],
    goodsdetail:{},
    swiperOption: {
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay:false,
      speed:2000,
      loop:true
    }
  }
 },
 computed:{
   ...mapState(['GetProductDetailstate'])
 },
 methods: {
   goodsdetailload: function() {
     if(this.$route.params.id){
      let newrouteid = this.$route.params.id;
      newrouteid = newrouteid.match(/=\S*/g).join('').match(/[^=]*/g)[1];
      this.$store.dispatch('ProductIdmethod',newrouteid)
      this.$store.dispatch('GetProductDetailmethod',newrouteid).then(()=>{
        if(this.GetProductDetailstate.status == 0){
          this.goodsdetail = this.GetProductDetailstate.data;
          this.imgarr = (this.goodsdetail.subImages || '').split(',');
        }
      })
     }
   },
   _initScroll(){
    this.goodsScroll = new BScroll(this.$refs.goodslist, {
      click: true,
    });
   }
 },
 components: {

 },
 created () {
   this.goodsdetailload();
   
 },
 mounted () {
  this.$nextTick(() => {
    this._initScroll();
  })
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';

.goods-body{
  width:100%;
  position: absolute;
  top:$headerHeight;
  left:0;
  bottom:$headerHeight;
  overflow: hidden;
}
.goods-child{
  width:100%;
  height:auto;
}
.goodsimg{
  width:100%;
  box-sizing: border-box;
  .swpier-img{
    width:100%;
    height:100%;
  }
}
.content{
  width:100%;
  box-sizing: border-box;
  padding-left:1rem;
  padding-top:1rem;
  margin-top:1rem;
  box-shadow: 0rem 0.0625rem 0.0625rem #666;
  .title{
    width:calc(100% - 1rem);
    font-size:1.2rem;
    line-height: 1.5rem;
    h1{
      width:70%;
      
    }
  }
  .text{
    width:calc(100% - 1rem);
    font-size:1rem;
    line-height: 1.5rem;
    color:$bgColor;
    margin-top:1rem;
    padding:0.0625rem;
  }
  .count{
    display: block;
    width:calc(100% - 1rem);
    color:#666;
    margin-top:1rem;
    font-size:1rem;
    line-height: 1.5rem;
  }
  .transaction{
    width:calc(100% - 1rem);
    margin-top:1rem;
    line-height: 1.5rem;
    height:3rem;
    .price{
      font-size:1.5rem;
      color:$bgColor;
      font-weight: bold;
    }
    .depreciate{
      float: right;
      margin-right:1rem;
      color:#666;
      border:0.0625rem solid #ededed;
      padding:0.125rem;
      padding-left:0.5rem;
      padding-right:0.5rem;
    }
  }
}
.floor-bottom{
  height:1rem;
  background:#EDEDED;
}
.select{
  font-size:1rem;
  color:#666;
  line-height:3rem;
  height:100%;
  padding-left:1rem;
  overflow: hidden;
  .left,.center,.right{
    float:left;
  }
  .center{
    width:calc(100% - 6rem);
    height:100%;
    overflow: auto;
    ul{
      margin-top:1rem;
      li{
        height:3rem;
        line-height: 1.4rem;
        overflow: hidden;
        strong{
          float:left;
          margin-right:0.5rem;
          font-size:1rem;
          color:$bgColor;
          padding:0.2rem;
          border:0.0625rem solid $bgColor;
        }
      }
    }
    
  }
  .left{
    width:3rem;
  }
  .right{
    width:3rem;
  }
}
.address{
  height:5rem;
}
i{
  float: right;
  margin-right:1rem;
  font-size:2rem;
  color:#666;
  line-height: 1.5rem;
}
</style>
