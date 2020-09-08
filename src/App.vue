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
  computed: mapState(['language']),
  created() {
    this.$route.name !== 'login' && this.queryRoleMenu();
  },
};
</script>
