import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/page/home';
import Search from '@/components/page/search';
import GoodsList from '@/components/page/goodslist';
import GoodsClass from '@/components/page/goodsclass';
import UserLogin from '@/components/page/userlogin';
import UserCenter from '@/components/page/usercenter';
import UserRegiste from '@/components/page/userregiste';
import UserPassReset from '@/components/page/userpassreset';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path:'/search',
      name: 'Search',
      component:Search
    },
    {
      path:'/goodslist/:id',
      name: 'GoodsList',
      component:GoodsList
    },
    {
      path:'/goodsclass',
      name: 'GoodsClass',
      component:GoodsClass
    },
    {
      path:'/userlogin',
      name:'UserLogin',
      component:UserLogin
    },
    {
      path:'/usercenter',
      name:'UserCenter',
      component:UserCenter
    },
    {
      path:'/userregiste',
      name:'UserRegiste',
      component:UserRegiste
    },
    {
      path:'/userpassreset',
      name:'UserPassReset',
      component:UserPassReset
    },
    { 
      path: '/', 
      redirect: '/home' 
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
