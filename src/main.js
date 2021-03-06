import Vue from 'vue';
import App from './App.vue';
import i18n from './locale';
import store from './store';
import router from './router';
import storage from './utils/storage.js';
import createComp from './utils/create.js';
import { isPC } from './utils/device.js';
import './styles/main.less';
import './styles/pop.less';
import './utils/antd.js';
import './icons';
import config from '../package.json';

Vue.config.productionTip = false;
Vue.prototype.$storage = storage;
Vue.prototype.$isPC = isPC;
Vue.use(createComp);

console.info(`%cv${config.version} (${new Date().toLocaleString()})`, 'color: red');

Vue.config.errorHandler = (err) => {
  console.log('errorHandler', err);
};

new Vue({
  i18n,
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
