<template>
  <div id="app">
    <a-config-provider :locale="language">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import role from '@/mixins/role';

export default {
  name: 'App',
  mixins: [role],
  computed: mapState(['language', 'systemType']),
  created() {
    (this.$route.name !== 'login' && this.systemType === 'welcome') && this.queryRoleMenu();
    (this.$route.name !== 'login' && this.systemType === 'admin') && this.queryAdminRoleMenu();
  },
};
</script>
