<template>
 <div class="recommend">
     <div class="title">热销推荐</div>
     <ul class="recommend-list">
         <li class="floor-lists" v-for="(names,index) of floorName" :key="index">
             <div class="floor-bottom"></div>
             <div class="floor-wrap">
                 <h1 class="floor-title">{{names}}</h1>
                  <ul class="floor-list clearfix">
                      <li class="floor-item" v-for="item of floorWrap[index]" :key="item.id" @click='floorlist(item.floor_text)'>
                            <span class="floor-text">{{item.floor_text}}</span>
                            <img class="floor-img" :src="item.floor_img_url" alt="">
                      </li>
                  </ul>
             </div>
         </li>
     </ul>
 </div>
</template>

<script>
export default {
 props: {
    floorName: Array,
    floorWrap: Array
 },
 data() {
  return {

  }
 },
 methods: {
   floorlist:function(goodsitem) {
    let goodslist='/goodslist/'+ 'keyword='+ goodsitem
    this.$router.push(goodslist)
   }
 },
 components: {

 }
}
</script>

<style scoped lang="scss" type="text/css">
.title{
  line-height:2rem;
  background:#fff;
  margin-top:.2rem;
  text-indent:.2rem;
  font-size:1.2rem;
}
.recommend-list{
    width:100%;
    background:#fff;
    .floor-lists{
      width:100%;
      height:13rem;
      .floor-bottom{
        height:1rem;
        background:#EDEDED;
      }
      .floor-wrap{
        margin:0 auto;
        width:calc(100% - 1.2rem);
        .floor-title{
          margin:0 auto;
          height:2rem;
          line-height:2rem;
          background:#fff;
          color: #d58717;
          font-weight: normal;
          font-size:1rem;
          border-bottom: .0625rem solid #d58717;
        }
        .floor-list{
          overflow: hidden;
          margin:0 auto;
          margin-top:0.625rem;
          background:#EDEDED;
          .floor-item{
            position: relative;
            width:calc((100% - 0.375rem)/4);
            height:9rem;
            float: left;
            margin:.125rem .125rem .125rem 0;
            background:#fff;
            .floor-text{
              position:absolute;
              top: .75rem;
              left: .125rem;
              font-size: .25rem;
              color: #555;
            }
            .floor-img{
              position: absolute;
              right: .937rem;
              bottom: .625rem;
              width: 70%;
              height: 65%;
            }
          }
          .floor-item:nth-child(4n){
              margin-right:0;
          }
        }
      }
    }
    .floor-lists:nth-child(1) .floor-bottom{
      height: 0;
      background: #fff;
    }
    .floor-lists:nth-child(2) .floor-title{
      color: #3b838c;
      border-bottom: .0625rem solid #3b838c;
    }
    .floor-lists:nth-child(3) .floor-title{
      color: #a93931;
      border-bottom: .0625rem solid #a93931;
    }
    .floor-lists:nth-child(4) .floor-title{
      color: #488bad;
      border-bottom: .0625rem solid #488bad;
    }
    .floor-lists:nth-child(5) .floor-title{
      color: #642663;
      border-bottom: .0625rem solid #642663;
    }  
}

</style>

