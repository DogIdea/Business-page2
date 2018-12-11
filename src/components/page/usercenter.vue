<template>
 <div class="user-center">
   <userheader :header_title="header_title" :header_show="header_show"></userheader>
   <keep-alive>
     <router-view></router-view>
   </keep-alive>
 </div>
</template>

<script>
import userheader from '../page-module/userheader';
import {GetUserInfo} from '@/common/service/user-service.js';
export default {
 data() {
  return {
    userinfo:{},
  }
 },
 computed:{
   header_title:function(){
     let header_name=''
     let router_name=this.$route.name
     switch(router_name){
       case "UserInfo":
         header_name = '个人中心';
         break;
       case "UserInfoCard":
         header_name = '信息卡片';
         break;
       case "CartAddress":
         header_name = '地址管理';
         break;
       case "EditorAddress":
         header_name = '地址编辑';
         break;
       case "ResetPassWord":
         header_name = '重置密码';
         break;
     }
     return header_name;
   },
   header_show:function(){
     let header_name=''
     let router_name=this.$route.name
     if(router_name == 'EditorAddress'){
       return true;
     }else{
       return false;
     }
   }
 },
 components: {
   userheader
 }
}
</script>

<style scoped lang="scss">
</style>
