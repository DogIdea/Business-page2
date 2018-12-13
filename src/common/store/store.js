import Vue from 'vue';
import Vuex from 'vuex';
import {UserLogin,GetUserInfo} from '@/common/service/user-service.js';
import {GetProductList,GetProductDetail} from '@/common/service/product-service';
import {AddToCart,UpdateProduct,GetCartList} from '@/common/service/cart-service';
import {GetAddressList} from '@/common/service/address-service';
Vue.use(Vuex)

const state = {
    Userloginstate:{
      status:1,
      msg:'未登录'
    },
    GetUserInfostate:{
      status:1
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
    GetAddressListstate:{},
    EditorAddressststate:{
      addressindex:{},
      isjudge:'editor',
      listindex:0
    },
    AddressDefaultstate:{
      index:0
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
    GetUserInfomethod(ctx){
      return new Promise((resolve) =>{
        GetUserInfo().then((res) => {
          ctx.commit('GetUserInfoback',res.data);
          resolve();
        })
      })
    },
    UserLogout(ctx){
      ctx.commit('UserLogoutback',{
        status:1,
        msg:'未登录'
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
    GetAddressListmethod(ctx){
      return new Promise((resolve)=>{
        GetAddressList().then((res)=>{
          ctx.commit('GetAddressListback',res.data)
          resolve(); 
        })
      })
    },
    EditorAddressmethods(ctx,formDate) {
      ctx.commit('EditorAddressback',formDate)
    },
    AddressDefaultmethod(ctx,index) {
      ctx.commit('AddressDefaultback',index)
    }
}

const mutations = {
    Userloginback(state,res){
      state.Userloginstate = res;
    },
    GetUserInfoback(state,res){
      state.GetUserInfostate = res
    },
    UserLogoutback(state,res) {
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
    GetAddressListback (state,res){
      state.GetAddressListstate = res
    },
    EditorAddressback (state,res) {
      state.EditorAddressststate = res
      console.log(state.EditorAddressststate)
    },
    AddressDefaultback (state,index){
      state.AddressDefaultstate = index
    }
}

export default new Vuex.Store({
    state,
    actions,
    mutations
})