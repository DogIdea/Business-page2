import Vue from 'vue';
import Vuex from 'vuex';
import {UserLogin} from '@/common/service/user-service.js';
import {GetProductList,GetProductDetail} from '@/common/service/product-service';
import {AddToCart,UpdateProduct,GetCartList} from '@/common/service/cart-service';
Vue.use(Vuex)

const state = {
    Userloginstate:{
      status:1,
      msg:'未登录'
    },
    GetProductListstate:{},
    GetProductDetailstate:{},
    AddToCartstate:{},
    GetCartListstate:{},
    UpdateProducstate:{
        data:{
          cartProductVoList:[]
        }
    },
    SearchHistory:{
      searcharr:[]
    },
    ProductIdstate:{
      productid:0
    },
    // GoodsDetail:{
    //     detailformdata:{}
    // },
    // GoodsBuy:{
    //     buycount:0
    // }
    
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
    GetProductDetailmethod(ctx,formDate){
      return new Promise((resolve)=>{
        GetProductDetail(formDate).then((res) => {
            ctx.commit('GetProductDetailback',res.data);
            resolve();  
        })
      })
    },
    AddToCartmethod(ctx,formDate){
      return new Promise((resolve)=>{
        AddToCart(formDate).then((res) => {
            ctx.commit('AddToCartback',res.data);
            resolve();  
        })
      })
    },
    UpdateProducmethod(ctx,formDate){
      return new Promise((resolve)=>{
        UpdateProduct(formDate).then((res) => {
            ctx.commit('UpdateProductback',res.data);
            resolve();  
        })  
      })
    },
    GetCartListmethod(ctx){
        return new Promise((resolve)=>{
          GetCartList().then((res)=>{
              ctx.commit('GetCartListback',res.data)
              resolve();  
          })
        })
    },
    SearchHistoryShow(ctx, searcharr) {
      ctx.commit('SearchHistoryShow', searcharr)
    },
    ProductIdmethod(ctx, id) {
      ctx.commit('ProductIdback', id)
    },
    // GoodsDetailContent(ctx, detailformdata) {
    //     ctx.commit('GoodsDetailContent', detailformdata)
    // },
    // GoodsBuyCount(ctx, buycount) {
    //     ctx.commit('GoodsBuyCount', buycount)
    // }
}

const mutations = {
    Userloginback(state,res){
      state.Userloginstate = res;
    },
    GetProductListback(state,res){
      state.GetProductListstate = res
    },
    GetProductDetailback(state,res){
      state.GetProductDetailstate = res
    },
    AddToCartback(state,res){
      state.AddToCartstate = res
    },
    UpdateProductback(state,res){
      state.UpdateProducstate = res 
    },
    GetCartListback(state,res){
      state.GetCartListstate = res
    },
    SearchHistoryShow (state, searcharr) {
      state.SearchHistory.searcharr = searcharr
      window.localStorage.setItem('searcharr',state.SearchHistory.searcharr)
    },
    ProductIdback (state, productid){
      state.ProductIdstate.productid = productid
      window.localStorage.setItem('productid',state.ProductIdstate.productid)
    },
    // GoodsDetailContent (state, detailformdata) {
    //   state.GoodsDetail.detailformdata = detailformdata
    //   window.localStorage.setItem('detailformdata',state.GoodsDetail.detailformdata)
    // },
    // GoodsBuyCount (state, buycount) {
    //     state.GoodsBuy.buycount = buycount
    //     window.localStorage.setItem('buycount',state.GoodsBuy.buycount)
    // },
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})