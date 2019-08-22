// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import store from './store'
Vue.prototype.$store = store;
import router from './router';
import axios from './utils/http';
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.prototype.$http = axios;

import VueQuillEditor, {Quill} from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'
window.Quill = Quill;
Vue.use(VueQuillEditor);
import 'highlight.js/styles/github.css';

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
