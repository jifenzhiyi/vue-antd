import Vue from 'vue';
import SvgIcon from 'comps/SvgIcon';
import App from './App.vue';
import store from './store';
import router from './router';
import createComp from './utils/create';
import './utils/antd';
import './icons';
import './styles/main.less';
import './styles/pop.less';

Vue.config.productionTip = false;
Vue.use(createComp);
Vue.component('svg-icon', SvgIcon);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
