import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store(
  {
    state: {
      token: window.localStorage.getItem('token') || '',
      username: window.localStorage.getItem('username') || '',
      routernav: [],
      apiURL: 'https://www.hchow521.xyz:3000'
    },
    getters: {
      usertoken: state => { return state.token },
      userinfo: state => {
        return {
          username: state.username
        }
      }
    },
    mutations: {
      login (state, data) {
        state.token = data.token;
        state.username = data.username;
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('username', data.username);
      },
      loginout (state) {
        state.token = null;
        state.username = null;
        window.localStorage.clear();
      },
      addRouter (state, data) {//添加首页面包屑导航
        //过滤路由(登录页和没有标题页都不添加到导航)
        if (data.to.meta.title == '登陆' || data.to.meta.path == '/' || !data.to.meta.title) return false;
        const router = state.routernav,
          to = data.to,
          from = data.from;
        let i = null;
        //遍历路由是否已存在 ? 讲路由移动至尾部 : 直接添加路由
        router.forEach((item, index) => {
          if (item.title === to.meta.title) {
            i = index
          }
        })
        if (i === null) {
          if (router.length === 0 ) {
            router.push({
              title: to.meta.title,
              path: to.path
            })
            state.routernav = router
          } else {
            //判断from路由是否 == 最后一个路由
            if (router[router.length - 1]['title'] === from.meta.title) {
              router.push({
                title: to.meta.title,
                path: to.path
              })
              state.routernav = router
            }
          }
        } else {
          router.push(router[i]);
          router.splice(i, 1);
          state.routernav = router
        }
      }
    },
    actions: {

    }
  }
)
