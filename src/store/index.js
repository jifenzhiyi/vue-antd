import Vue from 'vue';
import Vuex from 'vuex';
import { Modal } from 'ant-design-vue';
import { loadLanguageAsync } from '@/locale';
import storage from '@/utils/storage';
import { isPC } from '@/utils/device';
import localInit from './plugins/localInit';
import admin from './admin';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: storage.get('wms_lang') || 'zh-CN',
    isFold: isPC(), // 导航是否展开
    systemType: storage.get('wms_system_type') || 'welcome', // welcome = 默认管理后台 admin = 超级管理员的管理后台 other = 其他管理后台
    warehouseId: storage.get('wms_warehouse_id') || '', // 当前选中的仓库id
    headerCurrent: storage.get('wms_header_current') || ['首页'], // 一级菜单选中
    asideCurrent: storage.get('wms_aside_current') || ['欢迎'], // 左边栏菜单选中
    openKeys: storage.get('wms_open_keys') || [], // 左边栏展开的菜单
    ajaxConfig: storage.get('wms_ajax_config') || '/welcome', // ajax 接口请求参数
    tabList: storage.get('wms_tab_list') || [],
    menuId: storage.get('wms_menuId') || null, // 记录当前访问的列表menuId
    buttonList: [],
    routes: [],
  },
  getters: {
    asideList(state) {
      return state.routes.length > 0 ? state.routes.filter((o) => o.isSelect)[0].children : [];
    },
  },
  mutations: {
    // 设置buttonList
    SET_BUTTON_LIST(state, list) {
      state.buttonList = list;
    },
    // 设置menuId
    SET_MENUID(state, menuId) {
      state.menuId = menuId;
    },
    // 设置系统类型
    SET_SYSTEM_TYPE(state, type) {
      state.systemType = type;
    },
    // 设置仓库ID
    SET_WAREHOUSE_ID(state, id) {
      state.warehouseId = id;
    },
    // 顶部导航选中
    SET_HEADER_CURRENT(state, current) {
      state.headerCurrent = current;
    },
    // 侧边栏导航选中
    SET_ASIDE_CURRENT(state, current) {
      state.asideCurrent = current;
    },
    // 侧边栏展开
    SET_OPEN_KEYS(state, keys) {
      state.openKeys = keys;
    },
    // 设置导航标签
    SET_TAB_LIST(state, list) {
      state.tabList = list;
    },
    ADD_TAB(state, item) {
      !state.tabList.find((one) => one.name === item.name) && state.tabList.push(item);
    },
    // 删除导航标签
    REMOVE_TAB(state, url) {
      const index = state.tabList.findIndex((o) => o.url === url);
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
      flag == null ? (state.isFold = !state.isFold) : (state.isFold = flag);
    },
    // 定制化路由
    SET_ROUTES(state, routeList) {
      state.routes = routeList;
    },
    // 设置语言
    SET_LANG(state, lang) {
      state.language = lang;
    },
  },
  actions: {
    SetLang({ commit }, lang) {
      return new Promise((resolve) => {
        commit('SET_LANG', lang);
        loadLanguageAsync(lang);
        resolve();
      });
    },
    routeTo({ commit }, item) {
      if (!item.url) {
        Modal.error({ title: '错误', content: '接口url未配置' });
        return;
      }
      commit('SET_MENUID', item.menuId); // 设置menuId
      commit('SET_AJAX_CONFIG', item.url); // 接口请求参数设置
      commit('SET_ROUTES_SELECT', item.h); // 一级菜单选中
      commit('SET_HEADER_CURRENT', [item.h, item.h_En]); // 设置顶部导航名称
      commit('SET_ASIDE_CURRENT', [item.name, item.nameEn]); // 设置侧边栏导航名称
      commit('ADD_TAB', item); // 添加导航标签
      !isPC() && setTimeout(() => commit('CHANGE_ISFOLD', false), 0); // 导航展开
      `/${item.type}` !== window.location.pathname && window.router.push(`/${item.type}`);
    },
  },
  modules: { admin },
  plugins: [localInit],
});
