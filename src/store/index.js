import Vue from 'vue';
import Vuex from 'vuex';
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';
import enGB from 'ant-design-vue/es/locale-provider/en_GB';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    CNorEN: true, // 中英文
    language: zhCN,
    routes: [
      { path: '/', name: 'Home', ico: 'wx' },
      { path: '/about', name: 'About', ico: 'qq' },
    ],
  },
  mutations: {
    // 中英文切换
    CHANGE_LOCALE(state) {
      state.CNorEN = !state.CNorEN;
      state.CNorEN ? state.language = zhCN : state.language = enGB;
    },
    // 定制化路由
    SET_ROUTES(state, routes) {
      state.routes = routes;
      window.router.addRoutes(routes);
    },
    ADD_ROUTE(state, route) {
      const item = state.routes.find((one) => one.name === route.name);
      if (!item) {
        state.routes.push(route);
        window.router.addRoutes([{
          path: route.path,
          name: route.name,
          // eslint-disable-next-line prefer-template
          component: () => import(/* webpackChunkName: "page" */ '../views/' + route.name + '.vue'),
        }]);
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
