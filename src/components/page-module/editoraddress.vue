<template>
 <div class="editor-address">
    <div class="error-item" v-show="!isshow">
        <i class="iconfont icon-jinzhi error-icon error-msg"></i>
        <!-- <p class="err-msg">{{showtext}}</p> -->
    </div>
     <ul :class="isshow ? error_hidden : ''">
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-yonghu"></i>
          </label>
          <span class="user-title">收件人：</span>
          <div class="user-text">
            <input type="text" class="address-content" :value='addressformdata.receiverName'>
          </div>
        </div>
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-weibiaoti-1"></i>
          </label>
          <span class="user-title">联系电话：</span>
          <div class="user-text">
            <input type="text" class="address-content" :value='addressformdata.receiverPhone'>
          </div>
        </div>
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-email"></i>
          </label>
          <span class="user-title">邮政编码：</span>
          <div class="user-text">
            <input type="text" class="address-content" :value='addressformdata.receiverZip'>
          </div>
        </div>
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-email"></i>
          </label>
          <span class="user-title">所在地区：</span>
          <div class="user-text">
            <div class="address-select">
               <span>{{addressformdata.receiverProvince}}</span>
               <span>{{addressformdata.receiverCity}}</span>
            </div>
          </div>
          <div class="user-right">
           <i>....</i>
          </div>
        </div>  
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-chengshi"></i>
          </label>
          <span class="user-title">详细地址：</span>
          <div class="user-text">
            <input type="text" class="address-content" :value='addressformdata.receiverAddress'>
          </div>
        </div>
      </li>
     </ul>
    <button class="save" @click="saveaddaddress" >保存地址</button>
        <div class="addresscity_list">
          <div class="list_header">
            <h1 class="title">所在地区</h1>
            <span class="empty icon-error"></span>
          </div>
          <div class="list_nav">
            <div class="city">所在省市</div>
            <div class="city">所在城市</div>
          </div>
          <div class="list_body">
            <div class="province"></div>
            <div class="city"></div>
          </div>
        </div>
 </div>
</template>

<script>
import cities from '../../common/util/cities.js'
export default {
 data() {
  return {
     isshow:true,
     error_hidden:'error_hidden',
     addressformdata:{},
     fold:true
  }
 },
 methods: {
    saveaddaddress:function(){
        
    }
 },
 created() {
    this.addressformdata = this.$route.params.addressindex
    console.log(cities.gitProvinces())
 },
}
</script>

<style scoped lang="scss">
@import '@/assets/css/varibles.scss';
.editor-address{
  position: absolute;
  top:$headerHeight;
  left:0;
  bottom:0;
  width:100%;
  color:#000;
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
      background:#fff;
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
        height:1rem;
        text-align: left;
        vertical-align: middle;
        .address-content{
          width:90%;
          height:1.8rem;
          line-height:1rem;
          padding-left:1rem;
          border-bottom:1px solid #ededed;
        }
        .address-select{
          min-width:16rem;
          font-size:1rem;
          color:#666;
          height:1.8rem;
          line-height:1.8rem;
          padding-left:1rem;
          overflow: hidden;
        }
      }
      .user-right{
        display: table-cell;
        font-size:2rem;
        color:#666;
      }
    }
  }
  .save{
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
  .addresscity_list{
      position:absolute;
      bottom:5rem;
      left:0;
      width:100%;
      background:#fff;
      .list_header{
        height:3rem;
        line-height:3rem;
        padding:0 1.125rem;
        background:#f3f5f7;
        border-bottom:0.0625rem solid rgba(7,17,27,0.1);
        color:#000;
        font-size:1rem;
        .title{
          float:left;
          font-size:0.875rem;
          color:rgb(7,17,27);
        }
        .empty{
          float:right;
          font-size:1.5rem;
          color:$bgColor; 
        }
      }
      .list_nav{
        width:70%;
        padding:0 1.125rem;
        height:3rem;
        line-height:3rem;
        font-size:1rem;
        border-bottom:0.0625rem solid rgba(7,17,27,0.1);
        .city{
          float: left;
          width:50%;
        }
      }
      .list_body{
        width:100%;
        height:0;
        padding-bottom:50%;
        overflow: hidden;
      }
    } 
}
</style>
