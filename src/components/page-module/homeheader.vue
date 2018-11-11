<template>
  <div>
    <div class="header">
      <div class="header-left">
        <router-link to='/home'>
          <div class="iconfont icon-B icon-back" v-show="isicon=='home' ? true : false"></div>
        </router-link>
        <div class="iconfont icon-iconfontzhizuobiaozhun023126 icon-back" v-show="!(isicon=='home') ? true : false" @click="goback"></div>
      </div>
      <div class="header-input">
        <span class="iconfont icon-sousuo"></span>
          <input type="text" @click='searchclick' @blur='searchgoods' ref='searchtext'>
      </div>
      <div class="header-right">
        <router-link to='/userlogin' v-if="this.IsUserlogin.status === 1">
          <div class="iconfont icon-denglu"></div>
        </router-link>
        <router-link to='/usercenter' v-else>
          <div class="iconfont icon-icon center"></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 props:{
   isicon:String
 },
 data() {
  return {
    IsUserlogin:{
      status:1,
    },
    searcharr:[]
  }
 },
 methods:{
  goback: function() {
    this.$router.go(-1);
  },
  searchclick:function() {
    if(this.isicon=='search'){
      return;
    }else{
      this.$router.push('/search')
    }
  },
  searchgoods:function() {
    this.searcharr.push(this.$refs.searchtext.value);
    this.setlocalstorage();
  },
  setlocalstorage:function() {
    let newsearcharr = this.searcharr;
    let newsearhistory = this.$store.state.SearchHistory.searcharr;
    this.searcharr.push.apply(newsearcharr,newsearhistory);
    localStorage.setItem("history",this.searcharr);
  }
 },
 created() {
   this.IsUserlogin = this.$store.state.UserInfo
 }
}
</script>

<style scoped lang="scss" type="text/css">
@import '@/assets/css/varibles.scss';
.header{
  position:fixed;
  z-index:5;
  left:0;
  right:0;
  top:0;
  display:flex;
  width:100%;
  line-height:$headerHeight;
  height:$headerHeight;
  background:$bgColor;
  color:#fff;
  box-shadow: 0rem 0.25rem 0.0625rem #c60023;
  .header-left{
    min-width:$headerHeight;
    float:left;
    height:$headerHeight;
    .icon-back{
      height:$headerHeight;
      font-size:1.4rem;
      text-align:center;
    }
  }
  .header-input{
    flex:1;
    color:#ccc;
    background:#fff;
    border-radius:2rem;
    margin-top:$headerHeight/4-.2;
    margin-left:.2rem;
    font-size:1.2rem;
    line-height:1.4rem;
    height:1.8rem;
    padding-top:.25rem;
    padding-left:.2rem;
    input{
      outline: none;
      -webkit-appearance: none;
      border-radius: 0;
      height:1rem;
    }
  }
  .header-right{
    min-width:$headerHeight;
    line-height:$headerHeight;
    height:$headerHeight;
    float:right;
    padding:.1rem;
    text-align:center;
    color:#fff;
    .center{
      margin-top:-0.2rem;
      font-size:2rem;
    }
  }     
}
</style>
