import Vue from 'vue';
import Vuex from 'vuex';
import zhCN from 'ant-design-vue/es/locale-provider/zh_CN';
import enGB from 'ant-design-vue/es/locale-provider/en_GB';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    CNorEN: true, // 中英文
    language: zhCN,
  },
  mutations: {
    // 中英文切换
    CHANGE_LOCALE(state) {
      state.CNorEN = !state.CNorEN;
      state.CNorEN ? state.language = zhCN : state.language = enGB;
    },
  },
  actions: {
  },
  modules: {
  },
});
