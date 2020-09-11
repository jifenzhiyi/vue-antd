<template>
  <div class="tab_list">
    <a-tabs
      hide-add
      type="editable-card"
      :activeKey="ajaxConfig"
      @edit="onEdit"
      @tabClick="tabClick">
      <a-tab-pane
        v-for="one in tabList"
        :key="one.key"
        :tab="one.title"
        :closable="one.closable" />
    </a-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BaseTab',
  computed: mapState(['tabList', 'ajaxConfig']),
  methods: {
    tabClick(url) {
      if (url !== this.ajaxConfig) {
        const item = this.tabList.find((one) => one.key === url);
        this.$store.commit('SET_ROUTES_SELECT', item.h);
        this.$store.commit('SET_HEADER_CURRENT', [item.h]);
        this.$store.commit('SET_ASIDE_CURRENT', [item.title]);
        this.$store.commit('SET_AJAX_CONFIG', url);
        this.$router.push(url);
        !this.$isPC() && setTimeout(() => this.$store.commit('CHANGE_ISFOLD', false), 0);
      }
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    remove(targetKey) {
      if (targetKey === this.ajaxConfig) {
        const index = this.tabList.findIndex((one) => one.key === targetKey);
        this.tabClick(this.tabList[index - 1].key);
      }
      this.$store.commit('REMOVE_TAB', targetKey);
    },
  },
};
</script>

<style lang="less" scoped>
.tab_list {
  height: 40px;
  overflow: hidden;
  border-bottom: solid 1px #eee;
  .list {
    height: 40px;
    display: flex;
    align-items: center;
    .one {
      padding: 0 20px;
      min-width: 100px;
      line-height: 40px;
    }
  }
}
</style>
