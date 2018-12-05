<template>
 <div class="user-center">
   <userheader :header_title="header_title"></userheader>
   <keep-alive>
     <router-view></router-view>
   </keep-alive>
 </div>
</template>

<script>
import userheader from '../page-module/userheader';
import {GetUserInfo} from '@/common/service/user-service.js';
import {mapState} from 'vuex';
export default {
 data() {
  return {
    userinfo:{},
    header_title:'个人中心'
  }
 },
 components: {
   userheader
 }
}
</script>

<style scoped lang="scss">
</style>
