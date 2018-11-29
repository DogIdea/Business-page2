import Vue from 'vue'
import Vuex from 'vuex'
import {UserLogin} from '@/common/service/user-service.js'
import {GetProductList} from '@/common/service/product-service';
Vue.use(Vuex)

const state = {
    Userloginstate:{
      status:1,
      msg:'未登录'
    },
    GetProductListstate:{
      keyword:''
    },
    SearchHistory:{
        searcharr:[]
    },
    GoodsDetail:{
        detailformdata:{}
    },
    GoodsBuy:{
        buycount:0
    }
    
}
const actions = {
    Userloginmethod(ctx,formDate){
      return new Promise((resolve) =>{
        UserLogin(formDate).then((res) => {
            ctx.commit('Userloginback',res.data);
            resolve();
        })
      })
    },
    GetProductListmethod(ctx,formDate){
      return new Promise((resolve)=>{
        GetProductList(formDate).then((res) => {
            ctx.commit('GetProductListback',res.data);
            resolve();  
        })
      })
    },
    SearchHistoryShow(ctx, searcharr) {
        ctx.commit('SearchHistoryShow', searcharr)
    },
    GoodsDetailContent(ctx, detailformdata) {
        ctx.commit('GoodsDetailContent', detailformdata)
    },
    GoodsBuyCount(ctx, buycount) {
        ctx.commit('GoodsBuyCount', buycount)
    },
    add(ctx){
        ctx.commit('addback')
    }
}

const mutations = {
    Userloginback(state,res){
      console.log(res,'mutations')
      state.Userloginstate = res;
    },
    GetProductListback(state,res){
      state.GetProductListstate = res
    },
    SearchHistoryShow (state, searcharr) {
        state.SearchHistory.searcharr = searcharr
        window.localStorage.setItem('searcharr',state.SearchHistory.searcharr)
    },
    GoodsDetailContent (state, detailformdata) {
        state.GoodsDetail.detailformdata = detailformdata
        window.localStorage.setItem('detailformdata',state.GoodsDetail.detailformdata)
    },
    GoodsBuyCount (state, buycount) {
        state.GoodsBuy.buycount = buycount
        window.localStorage.setItem('buycount',state.GoodsBuy.buycount)
    },
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})