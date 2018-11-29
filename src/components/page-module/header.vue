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
        <span class="iconfont icon-sousuo"></span>
          <input type="text" @click='searchclick' @keyup.enter='searchkeyword' ref='searchtext'>
      </div>
      <div class="header-right">
        <div class='usericon' v-if="!(isicon=='search')">
          <router-link to='/userlogin' v-if="this.Userloginstate.status === 1">
            <div class="iconfont icon-denglu"></div>
          </router-link>
          <router-link to='/usercenter' v-else>
            <div class="iconfont icon-icon center"></div>
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
import {GetProductList} from '@/common/service/product-service';
import {mapState} from 'vuex';
export default {
 props:{
   isicon:String
 },
 data() {
  return {
    headerLeftsSearch:"header-left-search",
    searcharr:[]
  }
 },
 computed:{
     ...mapState(['Userloginstate'])
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
    let goodslist='/goodslist/'+ 'keyword='+ this.$refs.searchtext.value
    this.$router.push(goodslist)
    this.searchgoods(this.$refs.searchtext.value)
  },
  searchgoods:function(keyword) {
    let formdata= {
      listParam:{
        keyword:[]
      }
    }
    formdata.listParam.keyword = keyword
    GetProductList(formdata.listParam).then((res)=>{
      if(res.data.status==0){
        this.searcharr.push(keyword);
        this.setlocalstorage();
      }
    }).catch((err)=>{
      this.showtext=err.msg;
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
    .usericon{
      .center{
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
