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
import Detail from '@/components/page/detail';
import CartProduct from '@/components/page/cartproduct';
import Goodsdetail from '@/components/page-module/goodsdetail';
import Aboutdetail from '@/components/page-module/aboutdetail';
import UserInfo from '@/components/page-module/userinfo';
import UserInfoCard from '@/components/page-module/userinfocard'
import CartAddress from '@/components/page-module/cartaddress';
import EditorAddress from '@/components/page-module/editoraddress';
import ResetPassWord from '@/components/page-module/resetpassword';

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      path:'/cartproduct',
      name: 'CartProduct',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:CartProduct
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
      meta: {
        requireAuth: true,
      },
      component:UserCenter,
      children: [
        {
          path:'userinfo',
          name: 'UserInfo',
          component:UserInfo
        },
        {
          path:'userinfocard',
          name: 'UserInfoCard',
          component:UserInfoCard
        },
        {
          path:'resetpassword',
          name: 'ResetPassWord',
          component:ResetPassWord
        },
        {
          path:'cartaddress',
          name: 'CartAddress',
          component:CartAddress
        },
        {
          path:'editoraddress',
          name:'EditorAddress',
          component:EditorAddress
        }
      ]
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
      path:'/detail/',
      name: 'Detail',
      component:Detail,
      children: [
        {
          path:'/detail/goodsdetail/:id',
          name: 'Goodsdetail',
          component:Goodsdetail
        },
        {
          path:'/detail/aboutdetail/:id',
          name: 'Aboutdetail',
          component:Aboutdetail
        }
      ]
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
