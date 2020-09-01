<template>
  <a-config-provider :locale="language">
    <div id="app">
      <div id="nav">
        <router-link to="/"><svg-icon iconClass="wx" />Home</router-link> |
        <router-link to="/about"><svg-icon iconClass="qq" />About</router-link>
      </div>
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: mapState(['language']),
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
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
