<template>
 <div class="list-body">
     <div class="listtitle">
        <ul class="sort-con">
            <li class="sort-item active" data-type="default" @click="listsort($event)" ref="default">默认排序</li>
            <li class="sort-item" data-type="price"  @click="listsort($event)" ref="price">
                <span>价格</span>
                <i class="iconfont icon-tubiaozhizuo-1" data-type="price1" ></i>
                <i class="iconfont icon-tubiaozhizuo-2" data-type="price2" ></i>
            </li>
        </ul>
     </div>
     <div class="listcontent" ref="contentlist">
       <ul class="content">
         <li class="list-item" v-for="item in goodslists" :key="item.id" @click="goodsdetail(item.id)">
           <img class="item-img" :src="item.imageHost+item.mainImage">
           <div class="item-text">
             <span class="item-name">{{item.name}}</span>
             <span class="item-body">{{item.subtitle}}</span>
           </div>
           <div class="item-shop">
             <span class="item-price">￥{{item.price}}</span>
             <div class="item-buy" v-if="Userloginstate.status === 0">
               <buyicon :productId="item.id" ></buyicon>
             </div>
           </div>
         </li>
       </ul>
     </div>
     <div class="pagenum" v-show="isShow">
       <div class="pagesize">
        <span class="page pagenow">{{listpagenum.goodsPage}}</span>
        <span class="page">{{listpagenum.total}}</span>
       </div>
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
    isShow:false,
    isicon:false,
    isScroll:false,
    quantity:0,
    goodslists:[],
    newcount:[],
    carbuyicon:[],
    listpagenum:{
      goodsPage:1,
      total:1
    },
    listformdate:{
      keyword:'',
      categoryId:'',
      orderBy:'default',
      pageNum:1,
      pageSize:5
    },
  }
 },
 computed:{
   ...mapState(['GetProductListstate','Userloginstate'])
 },
 components: {
   buyicon
 },
 methods:{
   //判断排序
   listsort:function(e) {
     let listtarget = e.target;
     let childrenlength = this.$refs.price.children.length;
     if(listtarget.getAttribute('data-type') == 'default'){
       listtarget.classList.add('active');
       for(let i=0;i<childrenlength;i++){
         this.$refs.price.children[i].classList.remove('active');
       }
       this.listformdate.pageSize = this.goodslists.length;
      if(this.isScroll){
        this.listformdate.pageNum = 1;
      }
       this.listformdate.orderBy = 'default';
       this.isScroll=false;
     }else{
       this.$refs.price.children[0].classList.add('active');
       this.$refs.default.classList.remove('active');
       if(listtarget.getAttribute('data-type')=='price2'){
         this.$refs.price.children[2].classList.add('active');
         this.$refs.price.children[1].classList.remove('active');
         this.listformdate.pageSize = this.goodslists.length;
         if(this.isScroll){
           this.listformdate.pageNum = 1;
         }
         this.listformdate.orderBy = 'price_asc';
         this.isScroll=false;
       }else {  
         this.$refs.price.children[1].classList.add('active');
         this.$refs.price.children[2].classList.remove('active');
         this.listformdate.pageSize = this.goodslists.length;
         if(this.isScroll){
           this.listformdate.pageNum = 1;
         }
         this.listformdate.orderBy = 'price_desc';
         this.isScroll=false;
       }
     }
     this.listload();
   },
   //加载数据
   listload:function() {
     let newrouteid = this.$route.params.id;
     newrouteid = newrouteid.match(/=\S*/g).join('').match(/[^=]*/g)[1];
     this.listformdate.keyword=newrouteid;
     this.$store.dispatch('GetProductListmethod',this.listformdate).then(()=>{
       if(this.GetProductListstate.status == 0){
         if(this.GetProductListstate.data.list.length==0){
           this.$router.push({name: 'Errorpage', params: {errormsg:'对不起，找不到您所需要的商品'}});
           return;
         }
         //判断页码是否为0
         if(!this.GetProductListstate.data.size == 0){
           this.judgepage(this.GetProductListstate.data);
         }
       }
     })
   },
   //判断页面
   judgepage:function(data){
     //判断页码总数
      if(data.total > this.listformdate.pageSize){
        this.listpagenum.total = Math.ceil(data.total / this.listformdate.pageSize);
      }
      //判断下拉列表如果是初始阶段调用data.data.list否则增加数组
      if(this.goodslists.length == 0){
        this.goodslists = data.list  
      }else if(this.listformdate.orderBy){
        //用isScroll作为下标判断是否为排序状态
        if(this.isScroll == true){
          this.goodslists =  this.goodslists.concat(data.list);
        }else{
          this.goodslists = data.list;
        }
      }
      this.$nextTick(() => {
        this.isShow = true;
        this._initScroll();
      });
   },
   //滚动事件
   _initScroll:function(){
     if (!this.menuScroll) {
      this.menuScroll = new BScroll(this.$refs.contentlist, {
            click: true,
            scrollY: true,
            probeType: 3
        });
    }else{
      this.menuScroll.refresh();
    };
    //滚动页码
    this.newcount.push(this.menuScroll.maxScrollY);
    this.newcount = this.removeDuplicatedItem(this.newcount)
    this.menuScroll.on('scroll', (pos) => {
        for(let i = 0;i<this.newcount.length;i++){
          if(pos.y > this.newcount[i]){
            this.listpagenum.goodsPage = i + 1;
            break;
          }
        }
    })
    this.menuScroll.on('touchEnd', (pos)=>{
      if( pos.y > 30 ){
          console.log("下拉刷新");
          //使用refresh 方法 来更新scroll  解决无法滚动的问题
          //加载更多
      }else if(pos.y < (this.menuScroll.maxScrollY - 30)){
        if(this.listformdate.pageNum < this.listpagenum.total) {
          this.listformdate.pageNum = this.listformdate.pageNum + 1;
          this.isScroll = true;
          this.listload();
          this.menuScroll.refresh();
        }
      }
    })
  },
  //跳转详情页面
  goodsdetail:function(goodsid) {
    let detail='/detail/goodsdetail/'+ 'productId='+ goodsid
    this.$router.push(detail)
  },
  removeDuplicatedItem:function(arr){
    for(var i = 0; i < arr.length-1; i++){
       for(var j = i+1; j < arr.length; j++){
           if(arr[i]==arr[j]){
              arr.splice(j,1);
              j--;
           }
       }
   }
   return arr;
  }
 },
 created () {
   this.listload();
   this.$store.dispatch('GetCartListmethod');
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.list-body{
  position: relative;
  top:$headerHeight;
  width:100%;
  .listtitle{
    width:100%;
    height:$headerHeight;
    @include border-1px(rgba(7,17,27,0.1));
    .sort-con{
      width:100%;
      height:100%;
      overflow: hidden;
      .sort-item{
        width:50%;
        float: left;
        height:100%;
        line-height: $headerHeight;
        text-align: center;
        .iconfont{
          height:1rem;
          line-height:1rem;
          font-size:1rem;
        }
        .icon-tubiaozhizuo-1{
          position:absolute;
          top:50%;
          transform: translateY(-50%);
          margin-top:-0.25rem;
        }
        .icon-tubiaozhizuo-2{
          position:absolute;
          top:50%;
          transform: translateY(-50%);
          margin-top:0.375rem;
        }
      }
      .active{
        color:$bgColor;
      }
    }
  }
  .listcontent{
    width:100%;
    position: fixed;
    z-index:2;
    top:$headerHeight * 2;
    bottom:0;
    overflow: hidden;
    .content{
      width:100%;
      height:auto;
      overflow: hidden;
      .list-item{
        width:100%;
        height:9rem;
        padding:1rem;
        @include border-1px(rgba(7,17,27,0.1));
        .item-img{
          float: left;
          width:8rem;
          height:8rem;
        }
        .item-text{
          width:calc(100% - 11rem);
          margin-left:1rem;
          float: left;
          height:5rem;
          padding:0.0625rem;
          .item-name{
            @include listitem(1.5rem,#666);
          }
          .item-body{
            @include listitem(1rem,$bgColor);
          }
        }
        .item-shop{
          width:calc(100% - 11rem);
          margin-left:1rem;
          float:left;
          height:3rem;
          
          .item-price{
            float:left;
            font-size:1rem;
            color:$bgColor;
            margin-top:0.75rem;
          }
          .item-buy{
            float:right;
            margin-right:1rem;
          }
        }
      }
    }
  }
  .pagenum{
    position:fixed;
    z-index:10;
    bottom:1.5rem;
    right:1.5rem;
    display:block;
    border-radius: 2.4rem;
    width:2.4rem;
    height:2.4rem;
    overflow: hidden;
    box-shadow: 0rem 0.125rem 0.125rem #666;
    text-shadow:0rem 0.0625rem 0.0625rem #666;
    .pagesize{
      display:table;
      width:2rem;
      height:100%;
      margin:0 auto;
      border-collapse: collapse;
      .page{
        display: table-row;
        text-align: center;
        vertical-align:middle;
        font-size:1rem;
        line-height:1rem;
        background:#fff;
        border-collapse: collapse;
      }
    }
    
  }
}
</style>
