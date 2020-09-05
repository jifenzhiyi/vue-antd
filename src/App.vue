<template>
  <div id="app">
    <a-config-provider :locale="language">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: mapState(['language']),
};
</script>
