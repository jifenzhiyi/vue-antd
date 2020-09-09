import Vue from 'vue';
import Vuex from 'vuex';
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';
import enGB from 'ant-design-vue/es/locale-provider/en_GB';
import storage from '@/utils/storage';
import { isPC } from '@/utils/device';
// import routes from './routes';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    CNorEN: true, // 中英文
    language: zhCN, // 语言包
    isFold: isPC(), // 导航是否展开
    ajaxConfig: storage.get('ajax_config') || '/home',
    routes: [],
  },
  getters: {
    asideList(state) {
      return state.routes.length > 0 ? state.routes.filter((o) => o.isSelect)[0].children : [];
    },
  },
  mutations: {
    // 一级菜单选中
    SET_ROUTES_SELECT(state, name) {
      state.routes.forEach((one) => {
        one.isSelect = one.name === name;
      });
    },
    // 接口请求参数设置
    SET_AJAX_CONFIG(state, config) {
      state.ajaxConfig = config;
    },
    // 导航展开
    CHANGE_ISFOLD(state, flag) {
      console.log('CHANGE_ISFOLD falg', flag);
      flag == null ? state.isFold = !state.isFold : state.isFold = flag;
    },
    // 中英文切换
    CHANGE_LOCALE(state) {
      state.CNorEN = !state.CNorEN;
      state.CNorEN ? state.language = zhCN : state.language = enGB;
    },
    // 定制化路由
    SET_ROUTES(state, routeList) {
      state.routes = routeList;
    },
    ADD_ROUTE(state, route) {
      const item = state.routes.find((one) => one.name === route.name);
      if (!item) {
        state.routes.push(route);
      }
    },
    REMOVE_ROUTE(state, name) {
      const index = state.routes.findIndex((o) => o.name === name);
      state.routes.splice(index, 1);
    },
  },
  actions: {
  },
  modules: {
  },
});
