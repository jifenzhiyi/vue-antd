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

Vue.config.productionTip = false;
Vue.prototype.$storage = storage;
Vue.prototype.$isPC = isPC;
Vue.use(createComp);

console.info(`%cv0.1.0 (${JSON.stringify(new Date().toLocaleString())})`, 'color: red', 'isPC', isPC());

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
