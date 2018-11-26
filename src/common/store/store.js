import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        UserInfo:{
          status: 1,
          msg:"未登录"
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
    },
    actions: {
        Userlogin(ctx,res) {
            ctx.commit('Userlogin', res)
        },
        SearchHistoryShow(ctx, searcharr) {
            ctx.commit('SearchHistoryShow', searcharr)
        },
        GoodsDetailContent(ctx, detailformdata) {
            ctx.commit('GoodsDetailContent', detailformdata)
        },
        GoodsBuyCount(ctx, buycount) {
            ctx.commit('GoodsBuyCount', buycount)
        }
    },
    mutations: {
        Userlogin (state, res) {
            state.UserInfo = res;
        },
        SearchHistoryShow (state, searcharr) {
           state.SearchHistory.searcharr = searcharr
        },
        GoodsDetailContent (state, detailformdata) {
           state.GoodsDetail.detailformdata = detailformdata
        },
        GoodsBuyCount (state, buycount) {
            state.GoodsBuy.buycount = buycount
        }
    }
})