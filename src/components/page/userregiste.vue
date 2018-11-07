<template>
 <div class="user-registe">
    <userheader :header_title="header_title"></userheader>
    <div class="registebody">
      <div class="error-item" :class="!isshow ? error_hidden : ''">
          <i class="iconfont icon-jinzhi error-icon"></i>
          <p class="err-msg">{{showtext}}</p>
      </div>
      <div class="user-item" v-for="item in registe_list" :key="item.id">
        <label class="user-label" :for="item.for">
            <i class="iconfont" :class="item.icon"></i>
        </label>
        <input :type="item.type" class="user-content" :id="item.user_id" :placeholder="item.place_holder" autocomplete="off" ref="userItem">
      </div>
      <div class="btn-submit" @click.stop="RegisteSubmit">注册</div>
      <div class="link-item">
          <router-link to="/userlogin" class="link_right">已有账号去登录 >></router-link>
      </div>
    </div>
 </div>
</template>

<script>
import userheader from '../page-module/userheader'
import {Register,CheckUsername} from '@/common/service/user-service.js'
import {validate} from '@/common/util/http.js'
import registe from '../../../static/mock/registe.json';
export default {
  data() {
   return {
     header_title:'注册',
     registe_list:registe.registe_list,
     isshow:false,
     showtext:'',
     error_hidden:'error_hidden'
   }
  },
  methods: {
    RegisteSubmit: function () {
        let formDate = {
            username: this.$refs.userItem[0].value,
            password: this.$refs.userItem[1].value,
            passwordConfirm: this.$refs.userItem[2].value,
            phone: this.$refs.userItem[3].value,
            email:this.$refs.userItem[4].value,
            question: this.$refs.userItem[5].value,
            answer: this.$refs.userItem[6].value
        };
        let  validateResult = this.formValidate(formDate);
        if(validateResult.status && !this.isshow) {
            Register(formDate).then((res)=>{
              console.log(res.data.msg);
              this.$router.push('/userlogin')
            }).catch((err)=>{
              this.showtext=err.msg;
              this.isshow=true;
            })
        }else {
            this.showtext = validateResult.msg;
            this.isshow = true;
        }
    },
    formValidate: function(formDate) {
        let result = {
            status: false,
            msg: ''
        };
        if(!validate(formDate.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if(!validate(formDate.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        if(formDate.password.length <6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if(formDate.password !==formDate.passwordConfirm) {
            result.msg = '两次输入的密码不一致';
            return result; 
        }
        if(!validate(formDate.phone, 'phone')) {
            result.msg = '手机格式不正确';
            return result;
        }
        if(!validate(formDate.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if(!validate(formDate.question, 'require')) {
            result.msg = '密码提示不能为空';
            return result;
        }
        if(!validate(formDate.answer, 'require')) {
            result.msg = '密码提示答案不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
  },
  mounted() {
    let _this = this
    _this.$refs.userItem[0].addEventListener('blur',function(){
      let username = _this.$refs.userItem[0].value;
      if(!username) {
        return;
      } else {
        CheckUsername(username).then((res)=>{
            if(res.data.msg == "校验成功"){
              _this.isshow = false;
            } else if(res.data.status == 1 ) {
              _this.isshow = true;
              _this.showtext = res.data.msg;
            }else {
              _this.isshow = false;
            }
          }).catch((err)=>{
            _this.showtext=err.msg;
          })
      }
    });
  },
  components: {
    userheader
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
body,html{
  background:$bgColor;
}
.user-registe{
  width:100%;
  height:100%;
  background:$bgColor;
}

.registebody{
  margin-top:3rem;
  width:100%;
  .error-item{
    box-sizing: border-box;
    width:75%;
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
      width:calc(100% - 3.33rem);
      left:$headerHeight + 0.0625rem;  
      height:$headerHeight;
      line-height: 2.25rem;
      background: #f3f3f3;
      padding-left:1rem;
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
    .link_right{
      float: right;
    }
  }
}
</style>
