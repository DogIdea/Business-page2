<template>
 <div class="about-body">
    <div>
      <div class="aboutcontent" v-html="GetProductDetailstate.data.detail" v-show="GetProductDetailstate.data.detail"></div>
      <div v-show="!GetProductDetailstate.data.detail">
        <h1>该商品无详细介绍</h1>
      </div>
    </div>
 </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
 data() {
  return {

  }
 },
 computed:{
   ...mapState(['GetProductDetailstate'])
 },
 methods: {
    aboutload:function(){
        if(this.GetProductDetailstate.status == 0){
            console.log(this.GetProductDetailstate.data)
        }
    }
 },
 created() {
   this.aboutload()
 }
}
</script>

<style scoped lang="scss">
.about-body{
  width:100%;
  position: absolute;
  top:4.33rem;
  left:0;
  bottom:3.33rem;
  .aboutcontent{
    width:100%;
    overflow: auto;
    p{
      font-size:1rem;
      img{
          width:100%;
      }
    }
  }
  h1{
    font-size:2rem;
    text-align: center;
    line-height: 2rem;
  }
}


</style>
