<template>
 <div class="userinfo-card">
    <div class="error-item" v-show="!isshow">
        <i class="iconfont icon-jinzhi error-icon error-msg"></i>
        <p class="err-msg">{{showtext}}</p>
    </div>
    <ul :class="isshow ? error_hidden : ''">
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
            <span v-show="iseditor">{{userformdatastatus.phone}}</span>
            <input type="text" class="user-content" :value="userformdatastatus.phone" autocomplete="off" v-show="!iseditor" ref="phone">
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
            <span v-show="iseditor">{{userformdatastatus.email}}</span>
            <input type="text" class="user-content" :value="userformdatastatus.email" autocomplete="off" v-show="!iseditor" ref="email">
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
            <span v-show="iseditor">{{userformdatastatus.question}}</span>
            <input type="text" class="user-content" :value="userformdatastatus.question" autocomplete="off" v-show="!iseditor" ref="question">
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
            <span v-show="iseditor">{{userformdatastatus.answer}}</span>
            <input type="text" class="user-content" :value="userformdatastatus.answer" autocomplete="off" v-show="!iseditor" ref="answer">
          </div>
        </div>
      </li>
   </ul>
   <button class="editor" @click="usereditor($event)" data-type="editor" v-show="iseditor" >编 辑</button>
   <button class="editor" @click="usereditor($event)" data-type="confirm" v-show="!iseditor" >确 认</button>
 </div>
</template>

<script>
import {UpdateUserInfo} from '@/common/service/user-service.js';
import {mapState} from 'vuex';
import {validate} from '@/common/util/http.js';
export default {
 data() {
  return {
    isshow:true,
    iseditor:true,
    showtext:'',
    error_hidden:'error_hidden',
    userformdatastatus:{}
  }
 },
 computed:{
   ...mapState(['GetUserInfostate'])
 },
 methods:{
   usereditor:function(event){
     let formDate = {
        phone: this.$refs.phone.value,
        email:this.$refs.email.value,
        question: this.$refs.question.value,
        answer: this.$refs.answer.value
    };
     if(event.target.getAttribute('data-type') == "editor"){
        this.iseditor = !this.iseditor
     }else if(event.target.getAttribute('data-type') == "confirm"){
        let formdateupdate = this.formdateupdate(formDate);
        this.userformdatastatus = formDate;
        this.showtext = formdateupdate.msg;
        this.isshow = formdateupdate.status;
        this.iseditor = this.isshow ? !this.iseditor : this.iseditor

     }
   },
   formdateupdate:function(formDate){
    let result = {
        status: false,
        msg: ''
    };
    if(!validate(formDate.phone, 'phone')) {
        result.msg = '手机格式不正确';
        this.$refs.phone.value = '';
        return result;
    }
    if(!validate(formDate.email, 'email')) {
        result.msg = '邮箱格式不正确';
        this.$refs.email.value = '';
        return result;
    }
    if(!validate(formDate.question, 'require')) {
        result.msg = '密码提示不能为空';
        this.$refs.question.value = '';
        return result;
    }
    if(!validate(formDate.answer, 'require')) {
        result.msg = '密码提示答案不能为空';
        this.$refs.answer.value = '';
        return result;
    }
    UpdateUserInfo(formDate).then((res) => {
        if(!(res.data.status == 0)){
          result.msg = '信息更新失败';
          return result;
        }
    })
    result.status = true;
    result.msg = '验证通过';
    return result;
   }
 },
 created() {
   this.userformdatastatus = this.GetUserInfostate.data;
 },
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
  .error-item{
    width:75%;
    line-height:3rem;
    height:3rem;
    margin:2rem auto;
    padding: 0.2rem 0 0.2rem 0;
    border: 0.0625rem solid red;
    color: red;
    background: #fde9e9;
    .error-msg{
      margin-left:1rem;
      float:left;
    }
  }
  .error_hidden{
    margin-top:7.4rem;
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
        max-width:16rem;
        height:4rem;
        line-height:4rem;
        text-align: left;
        vertical-align: middle;
        span{
          margin-left:1rem;
        }
        .user-content{
          width:100%;
          height:3rem;
          line-height: 3rem;
          background: #f3f3f3;
          padding-left:1rem;
        }
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
