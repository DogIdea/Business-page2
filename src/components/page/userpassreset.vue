<template>
 <div class="user-pass-reset">
    <userheader :header_title="header_title"></userheader>
    <div class="resetbody">
      <div class="error-item" :class="!isshow ? error_hidden : ''">
        <i class="iconfont icon-jinzhi error-icon"></i>
        <p class="err-msg">{{showtext}}</p>
      </div>
      <div class="step-con step-username">
        <div class="isuser" v-show="item == 'username'">
          <p class="user-item-text">请输入用户名：</p>
          <div class="user-item">
              <label class="user-label" for="username">
                  <i class="iconfont icon-yonghu"></i>
              </label>
              <input type="text" class="user-content" id="username" ref="username" placeholder="请输入用户名" autocomplete="off">
          </div>
          <div class="btn btn-submit" id="submit-username" @click='UserName_next'>下一步</div>
        </div>
        <div class="isuser" v-show="item == 'question'">
          <p class="user-item-text">密码提示问题是：{{ResetDate.question}}</p>
          <div class="user-item">
              <label class="user-label" for="question">
                  <i class="iconfont icon-yuechi"></i>
              </label>
              <input type="text" class="user-content" id="answer" ref="answer" placeholder="请输入密码提示问题答案" autocomplete="off">
          </div>
          <div class="btn btn-submit" id="submit-question" @click='Answer_next'>下一步</div>
        </div>
        <div class="isuser" v-show="item == 'password'">
          <p class="user-item-text">请输入新密码：</p>
          <div class="user-item">
              <label class="user-label" for="password">
                  <i class="iconfont icon-denglushimima"></i>
              </label>
              <input type="password" class="user-content" id="password" ref="password" placeholder="请输入新的密码" autocomplete="off">
          </div>
          <div class="btn btn-submit" id="submit-password" @click='Password_next'>下一步</div>
        </div>
        <div class="link-item">
          <router-link to="/userlogin" class="link_right">已有账号去登录 >></router-link>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import {GetQuestion,CheckAnswer,ResetPassWord} from '@/common/service/user-service.js'
import userheader from '../page-module/userheader';
export default {
 data() {
  return {
    header_title:'密码重置',
    error_hidden:'error_hidden',
    isshow:false,
    showtext:'',
    item:'username',
    ResetDate:{
      username:'',
      question: '',
      answer: '',
      token: '',
    }
  }
 },
 methods: {
   UserName_next: function() {
     this.ResetDate.username = this.$refs.username.value;
     if(this.ResetDate.username) {
       GetQuestion(this.ResetDate.username).then((res)=>{
          if(res.data.status == '0') {
            this.ResetDate.question = res.data.data;
            this.item='question';
            this.isshow=false;
          } else {
           this.showtext=res.data.msg;
           this.isshow=true;
          }  
        }).catch((err)=>{
          this.showtext=err.msg;
          this.isshow=true;
        })
     } else {
       this.showtext = '请输入用户名';
       this.isshow=true;
     }
   },
   Answer_next: function() {
     this.ResetDate.answer = this.$refs.answer.value;
     if(this.ResetDate.answer) {
       CheckAnswer({
          username: this.ResetDate.username,
          question: this.ResetDate.question,
          answer: this.ResetDate.answer
        }).then((res)=>{
          if(res.data.status == '0') {
            this.ResetDate.token = res.data.data;
            this.item='password';
            this.isshow=false;
            console.log(this.ResetDate.token)
          } else {
           this.showtext=res.data.msg;
           this.isshow=true;
          }
          
        }).catch((err)=>{
          this.showtext=err.msg;
          this.isshow=true;
        })
     } else {
       this.showtext = '请输入密码提示问题答案';
       this.isshow=true;
     }
   },
   Password_next: function() {
     let password = this.$refs.password.value;
     if(password && password.length >= 6) {
       ResetPassWord({
          username: this.ResetDate.username,
          passwordNew: password,
          forgetToken: this.ResetDate.token
        }).then((res)=>{
          if(res.data.status == '0') {
            this.$router.push('/userlogin');
          } else {
            this.showtext=res.data.msg;
            this.isshow=true;
          }
          console.log(res.data.msg);
          
        }).catch((err)=>{
          this.showtext=err.msg;
          this.isshow=true;
        })
     } else {
       this.showtext = '请输入不少于6位的新密码';
       this.isshow=true;
     }
   }
 },
 components: {
    userheader
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
body,html{
  background:#ededed;
}
.user-pass-reset{
  width:100%;
  height:100%;
  background:#ededed;
}
.resetbody{
  margin-top:3rem;
  width:100%;
  .error-item{
    box-sizing: border-box;
    width:80%;
    margin:2rem auto;
    position: relative;
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
  .step-username{
    width:80%;
    margin:2rem auto;
    padding:1rem;
    border:0.0625rem solid #f3f3f3;
    border-radius: 1rem;
    background:#f3f3f3;
    .user-item-text{
      margin-left:0.0625rem;
      margin-bottom: 1rem;
      font-weight: bold;
      font-size: 1rem;
    }
    .user-item{
      position: relative;
      height:$headerHeight;
      width:100%;
      margin-bottom: 1.25rem;
      .user-label{
        position: absolute;
        left: 0;
        top: 0;
        width: $headerHeight;
        height:$headerHeight;
        line-height: $headerHeight;
        background: #f3f3f3;
        font-size: 1.125rem;
        color: #d3d3d3;
        text-align: center;
        border-right: 0.0625rem solid #bbddbb;
      }
      .user-content{
        position: absolute; 
        left: $headerHeight;
        box-sizing: border-box;
        padding-left:0.5rem;
        width: calc(100% - 3.33rem);
        height: $headerHeight;
        line-height:$headerHeight;
        font-size: 15px;
        border: 1px solid #bdbdbd;
        outline: none;
      }
    }
    .btn-submit{
      box-sizing: border-box;
      padding:1rem;
      border-radius: 1rem;
      width:100%;
      margin: 2rem auto;
      text-align: center;
      font-size: 1.25rem;
      background:#fff;
      color:$bgColor;
    } 
    .link-item{
      width:100%;
      margin:2rem auto;
      height:1rem;
      .link_right{
        float: right;
        color:$bgColor;
      }
    }  
  }
 
}
</style>
