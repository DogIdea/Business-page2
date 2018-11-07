import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        UserInfo:{
          status: 1,
          msg:"未登录"
        }
    },
    actions: {
        Userlogin(ctx,res) {
            console.log(res)
            ctx.commit('Userlogin', res)
        }
    },
    mutations: {
        Userlogin (state, res){
            state.UserInfo = res
        }
    }
})