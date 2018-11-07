<template>
 <div class="container">

 </div>
</template>

<script>
import {GetUserInfo} from '@/common/service/user-service.js';
export default {
 data() {
  return {

  }
 },
 components: {

 },
 created() {
    GetUserInfo().then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
}
</script>

<style scoped lang="scss">

</style>
