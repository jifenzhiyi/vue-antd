<template>
  <div id="app">
    <a-config-provider :locale="antLocale">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import role from '@/mixins/role';
import { getLocaleMessage, defaultLanguage } from '@/locale';

export default {
  name: 'App',
  data() {
    return {
      locale: {},
    };
  },
  mixins: [role],
  computed: {
    ...mapState(['language', 'systemType']),
    antLocale() {
      return getLocaleMessage(this.language).antLocale || defaultLanguage;
    },
  },
  created() {
    (this.$route.name !== 'login' && this.systemType === 'welcome') && this.appInit();
    (this.$route.name !== 'login' && this.systemType === 'admin') && this.queryAdminRoleMenu();
  },
  methods: {
    appInit() {
      this.getDict();
      this.queryRoleMenu();
    },
  },
};
</script>
