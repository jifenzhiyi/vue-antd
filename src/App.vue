<template>
  <a-config-provider :locale="language">
    <div id="app">
      <!-- <div id="nav">
        <router-link
          v-for="item in routes"
          :key="item.name"
          :to="item.path"><svg-icon :iconClass="item.ico" />{{ item.name }}</router-link>
      </div> -->
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: mapState(['language', 'routes']),
};
</script>
