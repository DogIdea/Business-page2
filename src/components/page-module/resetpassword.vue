<template>
 <div class="reset-password">
   <div class="error-item" v-show="!isshow">
        <i class="iconfont icon-jinzhi error-icon error-msg"></i>
        <p class="err-msg">{{showtext}}</p>
    </div>
    <ul :class="isshow ? error_hidden : ''">
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-denglushimima"></i>
          </label>
          <span class="user-title">原密码：</span>
          <div class="user-text">
            <input type="password" class="user-content" autocomplete="off" ref="oldpassword">
          </div>
        </div>
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-denglushimima"></i>
          </label>
          <span class="user-title">新密码：</span>
          <div class="user-text">
            <input type="password" class="user-content" autocomplete="off" ref="newpassword">
          </div>
        </div>
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-denglushimima"></i>
          </label>
          <span class="user-title">确认密码：</span>
          <div class="user-text">
            <input type="password" class="user-content" autocomplete="off" ref="againpassword">
          </div>
        </div>
      </li>
   </ul>
   <button class="editor" @click="revlsepassword()">修改密码</button>
 </div>
</template>

<script>
import {validate} from '@/common/util/http.js';
import {UpdatePassWord} from '@/common/service/user-service.js';
export default {
 data() {
  return {
    isshow:true,
    showtext:'',
    error_hidden:'error_hidden',
  }
 },
 methods:{
   revlsepassword:function(){
    let formDate = {
        password: this.$refs.oldpassword.value,
        passwordNew:this.$refs.newpassword.value,
        passwordConfirm: this.$refs.againpassword.value,
    };
    let passwordupdate = this.passwordupdate(formDate);
    this.isshow = passwordupdate.status;
    this.showtext = passwordupdate.msg;
   },
   passwordupdate:function(formDate){
     let result = {
        status: false,
        msg: ''
     };
     if(!validate(formDate.password, 'require')) {
        result.msg = '原密码不能为空';
        return result;
     }
     if(!formDate.passwordNew || formDate.passwordNew.length < 6) {
        result.msg = '新密码长度不得少于6位';
        return result;
     }
     if(formDate.passwordNew !== formDate.passwordConfirm) {
        result.msg = '两次的密码不一致';
        return result;
     }
     UpdatePassWord({
        passwordOld: formDate.password,
        passwordNew: formDate.passwordNew
     }).then((res) => {
        console.log(res)
        if(!(res.data.status == 0)){
          result.msg = '信息更新失败';
          return result;
        }
        this.$router.push('/usercenter/userinfo')
     })
     result.status = true;
     result.msg = '验证通过';
     return result;
   }
 }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.reset-password{
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
