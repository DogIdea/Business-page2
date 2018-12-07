<template>
 <div class="userinfo-card">
    <div class="error-item" :class="!isshow ? error_hidden : ''">
        <i class="iconfont icon-jinzhi error-icon"></i>
        <p class="err-msg">{{showtext}}</p>
    </div>
    <ul>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-yonghu"></i>
          </label>
          <span class="user-title">用户名：</span>
          <div class="user-text">
            <span>{{GetUserInfostate.data.username}}</span>
          </div>
        </div>
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-weibiaoti-1"></i>
          </label>
          <span class="user-title">手机号码：</span>
          <div class="user-text">
            <span>{{GetUserInfostate.data.phone}}</span>
          </div>
        </div>
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-email"></i>
          </label>
          <span class="user-title">邮箱：</span>
          <div class="user-text">
            <span>{{GetUserInfostate.data.email}}</span>
          </div>
        </div>
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-wenhao"></i>
          </label>
          <span class="user-title">问 题：</span>
          <div class="user-text">
            <span>{{GetUserInfostate.data.question}}</span>
          </div>
        </div>
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-yuechi"></i>
          </label>
          <span class="user-title">答 案：</span>
          <div class="user-text">
            <span>{{GetUserInfostate.data.answer}}</span>
          </div>
        </div>
      </li>
   </ul>
   <button class="editor" @click="userlogout">编辑</button>
 </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
 data() {
  return {
    isshow:false,
    showtext:'',
    error_hidden:'error_hidden'
  }
 },
 computed:{
   ...mapState(['GetUserInfostate'])
 },
 components: {
   
 },
 mounted() {
    console.log(this.GetUserInfostate) 
}
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.userinfo-card{
  position: absolute;
  top:$headerHeight;
  left:0;
  bottom:0;
  width:100%;
  background:rgb(252, 248, 248);
  .error_hidden{
    width:100%;
    line-height:3rem;
    height:3rem;
    visibility: hidden;
  }
  ul{
    display: table;
    width:100%;
    .user_table{
      display: table-row;
      width:100%;
      height:4rem;
      font-size:1rem;
      .user-label{
        display: table-cell;
        line-height:4rem;
        width:4rem;
        height:4rem;
        text-align: center;
        vertical-align: middle;
        font-size:2rem;
        color:#666;
      }
      .user-title{
        display: table-cell;
        width:5rem;
        height:4rem;
        line-height:4rem;
        text-align: center;
        vertical-align: middle;
        font-weight: bold;
      }
      .user-text{
        display: table-cell;
        min-width:15rem;
        height:4rem;
        line-height:4rem;
        text-align: left;
        vertical-align: middle;
      }
    }
  }
  .editor{
    position: absolute;
    left:0;
    bottom:0;
    width:100%;
    border:0px;
    height:4rem;
    line-height:4rem;
    display: block;
    background:linear-gradient(top, #EE2C2C, $bgColor);;
    box-shadow: 0rem 0.125rem 0.125rem #ededed;
    color:#fff;
    font-size:1rem;
    text-align: center
  } 
}

</style>
