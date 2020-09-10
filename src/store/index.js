import Vue from 'vue';
import Vuex from 'vuex';
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';
import enGB from 'ant-design-vue/es/locale-provider/en_GB';
import storage from '@/utils/storage';
import { isPC } from '@/utils/device';
import localInit from './plugins/localInit';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    CNorEN: true, // 中英文
    language: zhCN, // 语言包
    isFold: isPC(), // 导航是否展开
    warehouseId: storage.get('warehouseId') || '', // 当前选中的仓库id
    headerCurrent: storage.get('header_current') || ['首页'],
    asideCurrent: storage.get('aside_current') || ['欢迎'],
    ajaxConfig: storage.get('ajax_config') || '/welcome',
    routes: [],
    tabList: [
      {
        h: '首页', title: '欢迎', key: '/welcome', closable: false,
      },
    ],
  },
  getters: {
    asideList(state) {
      return state.routes.length > 0 ? state.routes.filter((o) => o.isSelect)[0].children : [];
    },
  },
  mutations: {
    SET_WAREHOUSE_ID(state, id) {
      state.warehouseId = id;
    },
    SET_HEADER_CURRENT(state, current) {
      state.headerCurrent = current;
    },
    SET_ASIDE_CURRENT(state, current) {
      state.asideCurrent = current;
    },
    // 设置标签
    SET_TAB_LIST(state, list) {
      state.tabList = list;
    },
    // 添加标签
    ADD_TAB(state, key) {
      const headerCurrent = storage.get('header_current')[0];
      const asideCurrent = storage.get('aside_current')[0];
      const item = state.tabList.find((one) => one.key === key);
      !item && state.tabList.push({ h: headerCurrent, title: asideCurrent, key: state.ajaxConfig });
    },
    // 删除标签
    REMOVE_TAB(state, key) {
      const index = state.tabList.findIndex((o) => o.key === key);
      state.tabList.splice(index, 1);
    },
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
  },
  actions: {
  },
  modules: {
  },
  plugins: [localInit],
});
