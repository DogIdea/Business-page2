<template>
 <div class="user-info">
   <ul>
      <li class="user_head_sculpture">
        <div class="iconfont icon-icon usericon"></div>
        <span class="username">用户名:{{userinfo.username}}</span>
      </li>
      <li class="user_label" data-type="userinfocard" @click="detailinfo($event)">
        <span class="title">个人信息名片</span>
        <div class="iconfont icon-iconfontzhizuobiaozhun023126 icon">
        </div>
      </li>
      <li class="user_label" data-type="resetpassword" @click="detailinfo($event)">
        <span class="title">重置密码</span>
        <div class="iconfont icon-iconfontzhizuobiaozhun023126 icon">
        </div>
      </li>
      <li class="user_label" data-type="waitinggoods" @click="detailinfo($event)">
        <span class="title">待付商品</span>
        <div class="iconfont icon-iconfontzhizuobiaozhun023126 icon">
        </div>
      </li>
      <li class="user_label" data-type="addresscontrol" @click="detailinfo($event)">
        <span class="title">地址管理</span>
        <div class="iconfont icon-iconfontzhizuobiaozhun023126 icon">
        </div>
      </li>
   </ul>
   <button class="logout" @click="userlogout">退出登录</button>
 </div>
</template>

<script>
import {UserLogout} from '@/common/service/user-service.js';
import {mapState} from 'vuex';
export default {
 data() {
  return {
    userinfo:{},
    header_title:'个人中心'
  }
 },
 computed: {
  ...mapState(['GetUserInfostate'])
 },
 methods:{
   userlogout:function(){
     UserLogout().then((res)=>{
       if(res.data.status == 0) {
           this.$store.dispatch('UserLogout');
           alert('已退出登录');
           this.$router.push('/home');
       }
     })
   },
   detailinfo:function(event){
     switch(event.target.getAttribute('data-type')){
       case "userinfocard":
         this.$router.push('/usercenter/userinfocard');
         break;
       case "resetpassword":
         this.$router.push('/usercenter/resetpassword');
         break;
       case "waitinggoods":
         this.$router.push('/cart');
         break;
       case "addresscontrol":
         this.$router.push('/usercenter/addresscontrol');
         break;
     }
   }
 },
 created() {
   this.$store.dispatch('GetUserInfomethod').then(()=>{
     if(this.GetUserInfostate.status == 0){
       this.userinfo = this.GetUserInfostate.data
     }
   })
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.user-info{
  position: absolute;
  top:$headerHeight;
  width:100%;
  left:0;
  bottom:0;
  background:rgba(7,17,27,0.1);
  .user_head_sculpture{
    width:100%;
    height:8rem;
    background:#ededed;
    @include border-1px(rgba(7,17,27,0.1));
    .usericon{
      float: left;
      font-size:5rem;
      color:#fff;
      margin-top:1.5rem;
      margin-left:1rem;
    }
    .username{
      margin-left:1rem;
      height:8rem;
      line-height:8rem;
      font-size:1rem;
      font-weight: bold;
      color:#666;
      vertical-align: middle;
    }
  }
  .user_label{
    height:5rem;
    line-height:5rem;
    width:100%;
    margin-top:2rem;
    color:#666;
    font-weight: bold;
    background:rgb(252, 248, 248);
    @include border-1px(rgba(7,17,27,0.1));
    .title{
      float: left;
      font-size:1rem;
      margin-left:1rem;
    }
    .icon{
      float: right;
      font-size:1rem;
      margin-right:1rem;
      transform:rotate(180deg);
    }
  }
  .logout{
    width:100%;
    margin-top:2rem;
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
