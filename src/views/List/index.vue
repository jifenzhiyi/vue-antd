<template>
  <div class="main">
    列表页 {{ ajaxConfig }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ListIndex',
  computed: mapState(['ajaxConfig']),
};
</script>

<style lang="less" scoped>
.main {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  border: solid 1px #eee;
}
</style>
