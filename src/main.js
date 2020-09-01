import Vue from 'vue';
import SvgIcon from 'comps/SvgIcon';
import App from './App.vue';
import router from './router';
import store from './store';
import './utils/antd';
import './icons';

Vue.config.productionTip = false;
Vue.component('svg-icon', SvgIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
