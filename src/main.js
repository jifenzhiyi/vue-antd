import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import createComp from './utils/create';
import './styles/main.less';
import './styles/pop.less';
import './utils/antd';
import './icons';

Vue.config.productionTip = false;
Vue.use(createComp);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
