import { mapState } from 'vuex';

export default {
  computed: mapState(['tabList', 'systemType']),
  methods: {
    same() {
      this.$store.commit('SET_TAB_LIST', [
        {
          h: '首页',
          h_en: 'Home',
          title: '欢迎',
          title_en: 'Welcome',
          key: `/${this.systemType}`,
          closable: false,
        },
      ]);
    },
    back() {
      this.same();
      this.appInit();
      const item = this.tabList.find((one) => one.key === '/welcome');
      this.$store.commit('SET_MENUID', null);
      this.$store.commit('SET_ROUTES_SELECT', item.h);
      this.$store.commit('SET_HEADER_CURRENT', [item.h]);
      this.$store.commit('SET_ASIDE_CURRENT', [item.title]);
      this.$store.commit('SET_AJAX_CONFIG', '/welcome');
      this.$router.push('/home');
    },
    reset() {
      this.same();
      this.$storage.clear();
      this.$router.push('/login');
    },
  },
};
