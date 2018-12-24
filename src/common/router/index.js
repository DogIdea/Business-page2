import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/page/home';
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
      component:resolve=>require(['@/components/page/search'],resolve)
    },
    {
      path:'/cartproduct',
      name: 'CartProduct',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve=>require(['@/components/page/cartproduct'],resolve)
    },
    {
      path:'/goodslist/:id',
      name: 'GoodsList',
      component:resolve=>require(['@/components/page/goodslist'],resolve)
    },
    {
      path:'/goodsclass',
      name: 'GoodsClass',
      component:resolve=>require(['@/components/page/goodsclass'],resolve)
    },
    {
      path:'/userlogin',
      name:'UserLogin',
      component:resolve=>require(['@/components/page/userlogin'],resolve)
    },
    {
      path:'/usercenter',
      name:'UserCenter',
      meta: {
        requireAuth: true,
      },
      component:resolve=>require(['@/components/page/usercenter'],resolve),
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
      component:resolve => require(['@/components/page/userregiste'],resolve)
    },
    {
      path:'/userpassreset',
      name:'UserPassReset',
      component:resolve => require(['@/components/page/userpassreset'],resolve)
    },
    {
      path:'/detail/',
      name: 'Detail',
      component:resolve => require(['@/components/page/detail'],resolve),
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
