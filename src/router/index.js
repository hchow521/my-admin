import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import systemInfo from "../page/systemInfo";
Vue.use(Router);

const Index = () => import(/* webpackChunkName: "router" */ '@/page/index');
const Login = () => import(/* webpackChunkName: "router" */ '@/page/login');
const SystemInfo = () => import(/* webpackChunkName: "router" */ '@/page/systemInfo');
//user
const AddUser = () => import(/* webpackChunkName: "router" */ '@/page/user/addUser');
const UserList = () => import(/* webpackChunkName: "router" */ '@/page/user/userList');

//article
const AddArticle = () => import(/* webpackChunkName: "router" */ '@/page/article/addArticle')
const ArticleList = () => import(/* webpackChunkName: "router" */ '@/page/article/articleList')
const ArticleView = () => import(/* webpackChunkName: "router" */ '@/page/article/articleView')
// const index = resolve => require(['@/page/index'], resolve);


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      redirect: '/systemInfo',
      meta: {
        title: '首页'
      },
      children: [
        {
          path: '/systemInfo',
          name: 'systemInfo',
          component: SystemInfo,
          meta: {
            title: '系统信息'
          }
        },
        //user
        {
          path: '/addUser',
          name: 'addUser',
          component: AddUser,
          meta: {
            title: '添加用户'
          }
        },
        {
          path: '/userList',
          name: 'userList',
          component: UserList,
          meta: {
            title: '用户列表'
          }
        },
        {
          path: '/addArticle',
          name: 'addArticle',
          component: AddArticle,
          meta: {
            title: '发布文章'
          }
        },
        {
          path: '/articleList',
          name: 'articleList',
          component: ArticleList,
          meta: {
            title: '文章列表'
          }
        },
        {
          path: '/articleView',
          name: 'articleView',
          component: ArticleView
        }
      ]
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (!store.getters.usertoken && to.name !== 'login') { // 判断是否有token并需要登录
    next('/');
  }
  if (store.getters.usertoken && to.name === 'login') {
    next('/index');
  }
  store.commit('addRouter', { to, from });
  next();
})


export default router

