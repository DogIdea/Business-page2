<template>
 <div class="search">
    <div class="history" v-show="isShow">
      <div class="historytitle">
        <span class="title">历史搜索</span>
        <div class="iconfont icon-error" @click="clearlocalstorage"></div>
      </div>
      <ul class="keyword">
        <li class="word" v-for="(item) in searcharr" :key="item.index" >{{item}}</li>
      </ul>

    </div>
    <div class="border-bottom" v-show="isShow"></div>
    <div class="hotword">
        <span class="title">热门搜索</span>
        <ul class="keyword">
          <li class="word">藤椅摇椅</li>
          <li class="word">活性炭</li>
          <li class="word">篮球鞋</li>
          <li class="word">脸部卸妆油</li>
          <li class="word">蓝牙音箱</li>
          <li class="word">广角手机</li>
          <li class="word">煲汤锅砂锅</li>
          <li class="word">电话交换路由器</li>
        </ul>
    </div>
 </div>
</template>

<script>
export default {
 data() {
  return {
    searcharr:[],
    isShow:false
  }
 },
 methods:{
   getlocalstorage:function() {
     let newsearcharr=[]
     if(localStorage.getItem('history') == null){
       newsearcharr.push(localStorage.getItem('history'));
     }else{
       newsearcharr=localStorage.getItem('history').split(",");
     }
     
     this.searcharr=this.removeEmptyArrayEle(newsearcharr);
     if(this.searcharr.length>0){
       this.isShow = true;
       this.$store.dispatch('SearchHistoryShow', this.searcharr);
     }else {
       this.isShow = false;
     }
   },
   clearlocalstorage:function() {
     localStorage.removeItem('history');
     this.$store.dispatch('SearchHistoryShow',[]);
     this.isShow=false;
   },
   removeEmptyArrayEle:function(arr) {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i] == undefined || arr[i] == null || arr[i] == '') {
        arr.splice(i,1);
        i = i - 1;
      }
   }
   return arr;
   }
 },
 created() {
   this.getlocalstorage()
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.search{
  width:100%;
  height:100%;
  padding-top:$headerHeight;
  overflow: hidden;
  .border-bottom{
    border-bottom:0.0625rem solid #EDEDED;
  }
  .hotword,.history,.border-bottom{
    overflow: hidden;
    width:90%;
    margin:0 auto;
    margin-top: 2rem;
    .historytitle{
      display: block;
      height:2rem;
    }
    .title{
      float:left;
      line-height:2rem;
      background:#fff;
      margin-top:.2rem;
      text-indent:.2rem;
      font-size:1.2rem;
    }
    .icon-error{
      float:right;
      margin-top:.2rem;
      font-size:1.2rem;
    }
    .keyword{
      width:100%;
      overflow: hidden;
      .word{
        float:left;
        padding:0.625rem;
        font-size:1rem;
        line-height:1rem;
        background: #EDEDED;
        border:0.0625rem solid #EDEDED;
        margin:1rem 1rem 0 0;
        border-radius: 1rem;
      }
    }
  }
}

</style>
