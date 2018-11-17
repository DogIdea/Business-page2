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
        Shopcount:{
          buyconut: 0,
        }
    },
    actions: {
        Userlogin(ctx,res) {
            ctx.commit('Userlogin', res)
        },
        SearchHistoryShow(ctx, searcharr) {
            ctx.commit('SearchHistoryShow', searcharr)
        },
        ShopBuyCount(ctx, buycount) {
            ctx.commit('ShopBuyCount', buycount)
        }

    },
    mutations: {
        Userlogin (state, res) {
            state.UserInfo = res;
        },
        SearchHistoryShow (state, searcharr) {
           state.SearchHistory.searcharr = searcharr
        },
        ShopBuyCount (state, buycount) {
           state.ShopBuyCount.buycount =  buycount
        }
    }
})