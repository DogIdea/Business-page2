<template>
 <div class="editor-address">
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
          <span class="user-title">收件人：</span>
          <div class="user-text">
            <input type="text" class="address-content" v-model='addressformdata.receiverName' ref="receiverName">
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
            <input type="text" class="address-content" v-model='addressformdata.receiverPhone' ref="receiverPhone">
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
            <input type="text" class="address-content" v-model='addressformdata.receiverZip' ref="receiverZip">
          </div>
        </div>
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <i class="iconfont icon-email"></i>
          </label>
          <span class="user-title">所在地区：</span>
          <div class="user-text" @click="citytlist">
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
            <input type="text" class="address-content" v-model='addressformdata.receiverAddress' ref="receiverAddress">
          </div>
        </div>
      </li>
      <li class="user_table">
        <div class="user-item">
          <label class="user-label">
              <span class="icon-default" :class="{'icon-default-show':ischeck.length>0}">默</span>
          </label>
          <span class="user-title">是否默认：</span>
          <div class="user-text">
            <p class="radio-beauty-container">
              <label class="switch-slide">
                  <input type="checkbox" id="menu-right" v-model='ischeck' hidden>
                  <label for="menu-right" class="switch-slide-label"></label>
              </label>
            </p>
          </div>
        </div>
      </li>
     </ul>
    <button class="save" @click="saveaddaddress" >保存地址</button>
    <transition name="fold">
      <div class="addresscity_list" v-show='listShow'>
        <div class="list_header">
          <h1 class="title">所在地区</h1>
          <span class="empty icon-error" @click="cityclose()"></span>
        </div>
        <ul class="list_nav">
          <li class="city" v-for="(item,index) in cityList" @click="tabClick(index)" :key="item.id" v-show="index == 0 || iscity" :class="{'activeT':nowIndex===index}">
            <i>{{item.name}}</i>
          </li>
        </ul>
        <swiper :options="swipercity" ref="citySwiper">
          <swiper-slide class="list_body">
            <div class="list_box" ref="provincelist">
              <ul class="province">
                <li v-for="item in province" :key="item.id" @click.stop.prevent="chooseprovince(item)">{{item}}</li>
              </ul>
            </div>
          </swiper-slide>
          <swiper-slide class="list_body">
            <div class="list_box" ref="citylist">
              <ul class="province">
                <li v-for="cityitem in city" :key="cityitem.id" @click.stop.prevent="choosecity(cityitem)">{{cityitem}}</li>
              </ul>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </transition>
 </div>
</template>

<script>
import {UpdateAddress,SaveAddress} from '@/common/service/address-service.js'
import cities from '../../common/util/cities.js';
import BScroll from 'better-scroll';
import {mapState} from 'vuex';
export default {
 data() {
  return {
     isshow:true,
     iscity:false,
     listindex:{
       index:0
     },
     city:[],
     ischeck:[],
     error_hidden:'error_hidden',
     addressformdata:{
       receiverName:'',
       receiverPhone:'',
       receiverZip:'',
       receiverProvince:'',
       receiverCity:'',
       receiverAddress:''
     },
     showtext:'',
     fold:true,
     cityList:[
        {name:'所在省市'},
        {name:'所在城市'}
     ],
     nowIndex:0,
     swipercity:{
       initialSlide:0,
       preventLinksPropagation : false,
       allowTouchMove: false,
       autoplay:false,
       keyboard:true,
       autoHeight:true,
       observer:true,
       observeParents:true,
       loop:false,
     }
  }
 },
 computed: {
  ...mapState(['AddressDefaultstate']),
  swiper:function() {
    return this.$refs.citySwiper.swiper
  },
  province:function() {
    return cities.gitProvinces()
  },
  listShow:function() {
    let show = !this.fold;
    return show;
  }
 },
 methods: {
    //地址保存判断
    saveaddaddress:function(){
      let receiverInfo = this.getreceiveinfo()
      console.log(receiverInfo.data)
      if(this.$route.params.isjudge == 'editor'){
        //更新地址
        UpdateAddress(receiverInfo.data).then((res)=>{
         if(res.data.status == 0) {
           if(this.ischeck.length > 0){
              this.$store.dispatch('AddressDefaultmethod',this.listindex)
            }
           this.$router.push('/usercenter/cartaddress');
         }
        })
      }else if(this.$route.params.isjudge == 'add'){
        //保存地址
        SaveAddress(receiverInfo.data).then((res)=>{
          if(this.ischeck.length > 0){
              this.$store.dispatch('AddressDefaultmethod',this.listindex)
            }
           this.$router.push('/usercenter/cartaddress');
        })
      }
      if(this.ischeck){
        localStorage.setItem('addressindex',this.addressformdata.id)
      }else{
        localStorage.removeItem('addressindex')
      }
    },
    //选项卡切换
    tabClick:function(index) {
      this.nowIndex = index;
      this.swiper.slideTo(index,1000,false);
    },
    //选择省份
    chooseprovince:function(item) {
      this.iscity = true;
      this.addressformdata.receiverProvince = item;
      this.city = cities.getCities(item)
    },
    //选择城市
    choosecity:function(item) {
      this.addressformdata.receiverCity = item;
      this.cityclose();
    },
    //城市菜单
    citytlist:function() {
      this.swiper.slideTo(0,1000,false)
      this.iscity = false;
      this.fold = false;
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    _initScroll:function() {
      if (!this.provinceScroll) {
        this.provinceScroll = new BScroll(this.$refs.provincelist, {
              click: true,
              scrollY: true,
              probeType: 3
          });
      }else{
        this.provinceScroll.refresh();
      };
      if (!this.cityScroll) {
        this.cityScroll = new BScroll(this.$refs.citylist, {
              click: true,
              scrollY: true,
              probeType: 3
          });
      }else{
        this.cityScroll.refresh();
      };
    },
    //是否显示city
    cityclose:function(){
      this.fold = !this.fold;
    },
    //获取信息并判断
    getreceiveinfo:function() {
      let receiverInfo = {},
      result = {
          status: false
      };
      receiverInfo.receiverName = this.$refs.receiverName.value;
      receiverInfo.receiverPhone = this.$refs.receiverPhone.value;
      receiverInfo.receiverAddress = this.$refs.receiverAddress.value;
      receiverInfo.receiverZip = this.$refs.receiverZip.value;
      receiverInfo.receiverProvince = this.addressformdata.receiverProvince;
      receiverInfo.receiverCity = this.addressformdata.receiverCity;
      receiverInfo.id = this.addressformdata.id
      console.log(receiverInfo)
      if(!receiverInfo.receiverName) {
          this.showtext = '请输入收件人姓名';
      }else if(!receiverInfo.receiverProvince) {
          this.showtext = '请选择收件人所在省份';
      }else if(!receiverInfo.receiverCity) {
          this.showtext = '请选择收件人所在城市';
      }else if(!receiverInfo.receiverAddress) {
          this.showtext = '请输入收件人详细地址';
      }else if(!receiverInfo.receiverPhone) {
          this.showtext = '请输入收件人手机号';
      }else {
          result.status = true;
          result.data = receiverInfo;
      };
      return result;
    }
 },
 created() {
    if(this.$route.params.isjudge == 'editor'){
      this.addressformdata = this.$route.params.addressindex;
    }
    this.listindex.index = this.$route.params.listindex;
    if(!(this.AddressDefaultstate.index == this.listindex.index)){
      this.ischeck = [];
    }else{
      this.ischeck.push('null') 
    }
 }
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
  overflow: hidden;
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
        .icon-default{
          width:1rem;
          height:1rem;
          border-radius: 100%;
          font-size:1rem;
          color:#fff;
          background: #666;
        }
        .icon-default-show{
          color:#fff;
          background: $bgColor;
        }
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
          border-bottom:0.0625rem solid #ededed;
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
        .radio-beauty-container{
          margin-left:1rem;
          .switch-slide-label {
            display: block;
            width: 2.125rem;
            height: 1.25rem;
            background: #ccc;
            border-radius: 1.875rem;
            position: relative;
            -webkit-transition: 0.3s ease;
            transition: 0.3s ease;
          } 
          .switch-slide-label:after {
              content: '';
              display: block;
              width: 1rem;
              height: 1.125rem;
              border-radius: 100%;
              background: #fff;
              box-shadow: 0 0.0625rem 0.0625rem rgba(0, 0, 0, .1);
              position: absolute;
              left: 0.0625rem;
              top: 0.0625rem;
              -webkit-transform: translateZ(0);
              transform: translateZ(0);
              -webkit-transition:0.3s ease;
              transition:0.3s ease;
          }
          .switch-slide input:checked+label {
              background: #34bf49;
              transition: 0.3s ease;
          }
          .switch-slide input:checked+label:after {
              left: 1.0625rem;
          }
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
    top:100%;
    left:0;
    z-index:10;
    width:100%;
    background:#fff;
    transition:all 0.5s;
    transform:translate3d(0,-100%,0);
    &.fold-enter,&.fold-leave-to{
      transform:translate3d(0,0,0)
    }
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
      width:100%;
      height:3rem;
      line-height:3rem;
      font-size:1rem;
      border-bottom:0.0625rem solid rgba(7,17,27,0.1);
      .city{
        float: left;
        margin-left:1.125rem;
      }
      .city i{
        font-style: normal;
        font-size: 1rem;
      }
      .activeT{
        color:$bgColor;
        padding-bottom: 0.3rem;
        border-bottom: 0.125rem solid $bgColor;
      }
    }
    .list_body{
      width:100%;
      height:0rem;
      padding-bottom:70%;
      overflow: hidden;
      .list_box{
        position: absolute;
        width:100%;
        top:0;
        left:0;
        bottom:0;
        overflow: hidden;
        .province {
          height:auto;
          li{
            padding-top:1rem;
            padding-left:1.125rem;
            width:100%;
            height:2rem;
            font-size:1rem;
            // color:#666;
            background:#fafafa;
            border-bottom:0.0625rem solid rgba(7,17,27,0.1);
          }
        }
      }
    }
  } 
}
</style>
