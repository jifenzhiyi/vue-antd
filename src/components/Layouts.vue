<template>
  <div class="layouts">
    <base-aside />
    <div class="main">
      <base-header />
      <base-tab />
      <div
        class="content"
        @click="hideAside"><router-view /></div>
    </div>
  </div>
</template>

<script>
import baseHeader from 'comps/Base/Header';
import baseTab from 'comps/Base/Tab';
import baseAside from 'comps/Base/Aside';

export default {
  name: 'Layouts',
  components: {
    baseHeader,
    baseTab,
    baseAside,
  },
  methods: {
    hideAside() {
      console.log('hideAside');
      !this.$isPC() && this.$store.commit('CHANGE_ISFOLD', false);
    },
  },
};
</script>

<style lang="less" scoped>
.layouts {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  .main {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    .content {
      flex: 1;
      padding: 10px;
      background: #f8f8f8;
    }
  }
}
</style>
