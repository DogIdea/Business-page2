<template>
  <div>
    <div class="header">
      <div :class="isicon=='search' ? 'header-left-search' : 'header-left'">
        <router-link to='/home'>
          <div class="iconfont icon-B icon-back" v-show="isicon=='home' ? true : false"></div>
        </router-link>
        <div class="iconfont icon-iconfontzhizuobiaozhun023126 icon-back" v-show="!(isicon=='home' || isicon=='search') ? true : false" @click="goback"></div>
      </div>
      <div class="header-input">
        <div class="search-input">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" @click='searchclick' @keyup.enter='searchkeyword' ref='searchtext' v-model="formdata.listParam.keyword">
        </div>
      </div>
      <div class="header-right">
        <div class='usericon' v-if="!(isicon=='search')">
          <router-link to='/userlogin' v-if="this.Userloginstate.status === 1">
            <i class="iconfont icon-denglu"></i>
          </router-link>
          <router-link to='/usercenter/userinfo' v-else>
            <i class="iconfont icon-icon center"></i>
          </router-link>
        </div>
        <div class='cancel' v-else @click="goback">
          <span>取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
 props:{
   isicon:String
 },
 data() {
  return {
    headerLeftsSearch:"header-left-search",
    searcharr:[],
    formdata:{
      listParam:{
        keyword:[]
      }
    }
  }
 },
 computed:{
     ...mapState(['Userloginstate','GetProductListstate'])
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
  searchkeyword:function() {
    this.$store.dispatch('GetProductListmethod',this.formdata.listParam).then((res)=>{
      if(this.GetProductListstate.status == 0){
        let goodslist='/goodslist/'+ 'keyword='+ this.formdata.listParam.keyword
        this.searcharr.push(this.formdata.listParam.keyword);
        this.setlocalstorage();
        this.$router.push(goodslist)
      }
    })
  },
  setlocalstorage:function() {
    let newsearcharr = this.searcharr;
    let newsearhistory = this.$store.state.SearchHistory.searcharr;
    this.searcharr.push.apply(newsearcharr,newsearhistory);
    localStorage.setItem("history",this.searcharr);
  }
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
  .header-left-search{
    min-width:$headerHeight - 2rem;
    height:$headerHeight;
  }
  .header-input{
    position: relative;
    flex:1 1 auto;
    align-self:center;
    margin-left:.2rem;
    font-size:1.2rem;
    line-height:1.4rem;
    width:100%; 
    height:100%;
    overflow: hidden;
    .search-input{
      position:absolute;
      left:0;
      right:0;
      top:50%;
      transform: translateY(-50%);
      color:#ccc;
      background:#fff;
      border-radius:1.8rem;
      height:2rem;
      i{
        margin-top:0.35rem;
        margin-left:0.25rem;
        float: left;
        width:1.5rem;
        height:1.5rem;
      }
      input{
        margin-top:0.2rem;
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
        padding-left:0.5rem;
        line-height:1.6rem;
        vertical-align: middle;
        height:1.6rem;
      }
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
    .usericon{
      .icon-denglu{
        font-size:1.5rem;
      }
      .icon-icon{
        margin-top:-0.2rem;
        font-size:2rem;
      }
    }
    .cancel{
      width:2.5rem;
      height:2rem;
      line-height: 2rem;
      margin:0 auto;
      color:#fff;
      border:1px solid #fff;
      border-radius:0.625rem;
      margin-top:$headerHeight/4-.2;
      span{
        width:100%;
        height:100%;
        font-size:1rem;
      }
    }
  }     
}
</style>
