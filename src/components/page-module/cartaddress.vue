<template>
 <div class="cart-address">
   <div class="addressbox">
     <ul class="addresslist">
       <li class="addressitem" v-for="(item,index) in addresslists" :key="item.id">
          <div class="addresstitle">
              <h1>收件人：{{item.receiverName}}</h1>
              <span>联系电话：{{item.receiverPhone}}</span>
              <span>邮政编码: {{item.receiverZip}}</span>
              <div class="iconfont icon-compile icon-editor" @click="editoraddress(item)" ></div>
              <div class="icon-default" v-show="index == 0 ? true : false">默</div>
          </div>
          <div class="addresscontent">
              <span>{{item.receiverProvince}}</span>
              <span>{{item.receiverCity}}</span>
              <span>{{item.receiverAddress}}</span>
          </div>
       </li>
     </ul>
   </div>
   <button class="editor" @click="addaddress" >新增地址</button>
 </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
 data() {
  return {
    addresslists:[]
  }
 },
 computed: {
    ...mapState(['GetAddressListstate'])
 },
 methods: {
    addaddress:function(){
      
    },
    editoraddress:function(item){
      this.$router.push({name: 'EditorAddress', params: {addressindex:item}})
    }
 },
 created() {
   this.$store.dispatch('GetAddressListmethod').then(()=>{
      if(this.GetAddressListstate.status == 0){
        this.addresslists = this.GetAddressListstate.data.list
      }
   })
 },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.cart-address{
  position: absolute;
  top:$headerHeight;
  left:0;
  bottom:0;
  width:100%;
  background:rgb(252, 248, 248);
  .addressbox{
    position: absolute;
    left:0;
    top:0;
    bottom:0;
    width:100%;
    .addresslist{
      width:100%;
      .addressitem{
        box-sizing: border-box;
        width:95%;
        margin:0 auto;
        height:6.5rem;
        line-height:1.5rem;
        padding:1rem;
        font-size:1rem;
        @include border-1px(rgba(7,17,27,0.1));
        .addresstitle{
          font-weight:bold;
          h1{
            font-size:1.125rem;
          }
          span{
             margin-left:0.0625rem;
          }
          .icon-default{
             float: right;
             margin-top:1rem;
             margin-right:2rem;
             width:1rem;
             height:1rem;
             line-height:1rem;
             border-radius: 1rem;
             font-size:1rem;
             color:#fff;
             background: $bgColor;
          }
          .icon-editor{
            float: right;
            margin-top:1rem;
            margin-right:0.5rem;
            width:1rem;
            height:1rem;
            line-height:1rem;
          }
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
