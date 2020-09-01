import Vue from 'vue';
import SvgIcon from 'comps/SvgIcon';
import App from './App.vue';
import store from './store';
import router from './router';
import './utils/antd';
import './icons';

Vue.config.productionTip = false;
Vue.component('svg-icon', SvgIcon);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
