<template>
  <a-config-provider :locale="language">
    <div id="app">
      <div id="nav">
        <router-link
          v-for="item in routes"
          :key="item.name"
          :to="item.path"><svg-icon :iconClass="item.ico" />{{ item.name }}</router-link>
      </div>
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

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    color: #2c3e50;
    font-weight: bold;
    margin-right: 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
