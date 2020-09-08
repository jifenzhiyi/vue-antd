<template>
  <div class="layouts">
    <base-aside />
    <div class="main">
      <base-header />
      <div class="content"><router-view /></div>
    </div>
  </div>
</template>

<script>
import baseHeader from 'comps/Base/Header';
import baseAside from 'comps/Base/Aside';

export default {
  name: 'Layouts',
  components: {
    baseHeader,
    baseAside,
  },
};
</script>

<style lang="less" scoped>
.layouts {
  width: 100%;
  height: 100%;
  display: flex;
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    .content { flex: 1; padding: 10px; }
  }
}
</style>
