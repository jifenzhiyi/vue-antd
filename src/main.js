import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import storage from './utils/storage';
import createComp from './utils/create';
import { isPC } from './utils/device';
import './styles/main.less';
import './styles/pop.less';
import './utils/antd';
import './icons';
import config from '../package.json';

Vue.config.productionTip = false;
Vue.prototype.$storage = storage;
Vue.prototype.$isPC = isPC;
Vue.use(createComp);

console.info(`%cv${config.version} (${JSON.stringify(new Date().toLocaleString())})`, 'color: red', 'isPC', isPC());

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
