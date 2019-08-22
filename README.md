# my-blog-admin

> 一个 vue-cli + elementUI + vue-quill-editor 博客后台
>
******请搭配我搭建的后端服务器体验功能，不然你只能看个登陆页面，链接在下面↓******

###### 后台服务器node+express+mongoose [https://github.com/hchow521/my-app]
## 前台目录

``` bash
# 前台
在pageck.json文件目录下
npm install
npm run dev(默认端口：8000)


*目录结构
┌─build
├─config
├─dist(npm run build项目打包）
│
│     ┌─page(页面）
│     ├─router(路由）
├─src─┼─store(vuex仓库)
│     │       ┌─http.js(axios封装/拦截器)
│     └─utils─┤
│             └─secret.js(前端提交密码加密node-crypto模块)
└─index.html
```
## 个人demo，主要测试搭建的后台增删改查
## 技术总结？
##### 安装脚手架
`
npm install @vue/cli -g
`
##### 创建vue项目
``` bash
vue create my-project
cd my-project & npm install
```
##### 安装element-ui [https://element.eleme.cn/#/zh-CN/]
`npm i element-ui -S`
****
##### utils/secret.js封装
###### 当我F12点开network清晰看到用户登陆post的用户名密码，所以想加个简单的密码加密   
###### node-crypto模块AES加密[http://nodejs.cn/api/crypto.html]
###### 要不看廖雪峰老师总结的吧[https://www.liaoxuefeng.com/wiki/1022910821149312/1023025778520640]
****
#### 首页面包屑导航栏
##### 安装vuex方便管理一些全局状态
###### 自己看文档吧[https://vuex.vuejs.org/zh/]
###### 就几个属性state状态、getters计算属性、mutations提交更改、actions异步提交更改
```
npm install vuex --save
记得main.js添加
Vue.prototype.$store = store;
----------------------------------------
router/index.js 添加路由守卫

    router.beforeEach((to, from, next) => {
      if (!store.getters.usertoken && to.path !== '/login') { // 判断是否有token并需要登录
        next({path: '/login'});
      }
>>    store.commit('addRouter', { to, from });
      next();
    })
```
###### 添加token判断和每次进路由守卫都commit(addRouter)
###### store/index.js 添加相应mutations.addRouter
###### 接收得到的to和from路由信息，判断并添加到state.routernav状态
###### 在首页index.vue获取this.$store.state.routernav并在组件中遍历添加路由信息
#### vue-quill-editor富文本编辑器
[https://github.com/surmon-china/vue-quill-editor]
```
npm install vue-quill-editor --save
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor）
// require styles
import 'quill/dist/quill.snow.css'(默认风格）
```
###### 富文本功能扩展--图片拖拽放大缩小
###### quill-image-resize-module[https://github.com/kensnyder/quill-image-resize-module]
```
npm i quill-image-resize-module -S
>> import VueQuillEditor, {Quill} from 'vue-quill-editor'
window.Quill = Quill;
---------------------------------------------------
addArticle.vue
  import ImageResize from 'quill-image-resize-module'
  Quill.register('modules/imageResize', ImageResize)

#data.editorOption添加属性

    imageResize: {
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white'
      },
      modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
    }
```
###### 代码文本高亮--highlight.js
###### [https://github.com/highlightjs/highlight.js]
###### api:[https://highlightjs.readthedocs.io/en/latest/]
```$xslt
npm install highlight.js --save
import hljs from 'highlight.js';
--------------------------------------
#data.editorOption添加属性
    syntax: {
      highlight: text => { return hljs.highlightAuto(text).value }
    }
//高亮元素块
hljs.highlightBlock(dom);
```
****
# 还想看？给颗星咯
