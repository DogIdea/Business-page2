<template>
  <div class="user-login">
    <userheader :header_title="header_title"></userheader>
    <div class="loginbody">
      <div class="error-item" :class="!isshow ? error_hidden : ''">
          <i class="iconfont icon-jinzhi error-icon"></i>
          <p class="err-msg">{{showtext}}</p>
      </div>
      <div class="user-item">
        <label class="user-label" for="username">
            <i class="iconfont icon-denglu"></i>
        </label>
        <input type="text" class="user-content" id="username" placeholder="请输入用户名" autocomplete="off" v-model="formDate.username">
      </div>
      <div class="user-item">
          <label class="user-label" for="password">
              <i class="iconfont icon-denglushimima"></i>
          </label>
          <input type="password" class="user-content" id="password" placeholder="请输入密码" autocomplete="off" v-model="formDate.password">
      </div>
      <div class="btn-submit" @click="LoginSubmit">登录</div>
      <div class="link-item">
          <router-link to="/userpassreset" class="link_left">忘记密码</router-link>
          <router-link to="/userregiste" class="link_right">免费注册</router-link>
      </div>
    </div>
   
  </div>
</template>

<script>
import userheader from '../page-module/userheader';
import {mapState} from 'vuex';
export default {
   name:'UserLogin',
   data() {
    return {
      formDate:{
        username:'',
        password:''
      },
      isshow:false,
      showtext:'',
      header_title:'登录',
      error_hidden:'error_hidden'
    }
   },
   computed: {
     ...mapState(['Userloginstate'])
   },
   methods: {
     LoginSubmit: function(){
       if(this.formDate.username == '') {
         this.showtext='请填写用户名';
         this.isshow=true;
       }else if(this.formDate.password == ''){
         this.showtext='请填写密码';
         this.isshow=true;
       }else{
         this.FormSubmit(this.formDate);
       }
     },
     FormSubmit:function() {
        //由于内部异步调用接口需要异步调用state
        this.$store.dispatch('Userloginmethod',this.formDate).then(()=>{
          if(this.Userloginstate.status == 0) {
            this.$router.push('/home');
          }else{
            this.showtext='用户名或密码不正确';
            this.isshow=true;
          }
        }) 
         
     }
   },
   created () {
    
   },
   components: {
    userheader,
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
body,html{
  background:$bgColor;
}
.user-login{
  width:100%;
  height:100%;
  background:$bgColor;
}

.loginbody{
  padding-top:5rem;
  width:100%;
  background:$bgColor;
  .error-item{
    width:75%;
    margin:2rem auto;
    position: relative;
    box-sizing: border-box;
    padding: 1rem 0 1rem 2.5rem;
    border: 0.0625rem solid red;
    color: red;
    background: #fde9e9;
    .error-icon{
      position: absolute;
      left: 0.875rem;
      top: 50%;
      font-size: 0.875rem;
      transform: translateY(-50%) 
    }
  }
  .error_hidden{
    visibility: hidden;
  }
  .user-item{
    overflow: hidden;
    width:75%;
    margin:2rem auto;
    height:$headerHeight;
    position: relative;
    margin-bottom: 1.225rem;
    .user-label{
      position: absolute;
      left: 0;
      top: 0;
      width:$headerHeight;
      height:$headerHeight;
      line-height: $headerHeight;
      background: #f3f3f3;
      font-size: 1.125rem;
      color: $bgColor;
      text-align: center;
      border-right: 0.0625rem solid #bbddbb;
      .iconfont{
        margin-top:2rem;
      }
    }
    .user-content{
      position: absolute;
      left:$headerHeight - 1rem;  
      height:$headerHeight;
      line-height: 2.25rem;
      background: #f3f3f3;
      padding-left:2rem;
      width:90%;
    }
  }
  .btn-submit{
    box-sizing: border-box;
    padding:1rem;
    border-radius: 1rem;
    width:75%;
    margin: 2rem auto;
    text-align: center;
    font-size: 1.25rem;
    background:#fff;
    color:$bgColor;
  }
  .link-item{
    width:75%;
    margin:2rem auto;
    .linek_left{
      float: left;
    }
    .link_right{
      float: right;
    }
  }
}

</style>
