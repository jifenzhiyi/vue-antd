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
        :key="one.url"
        :tab="language === 'zh-CN' ? one.name : one.nameEn"
        :closable="one.closable" />
    </a-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BaseTab',
  computed: {
    ...mapState(['tabList', 'ajaxConfig', 'language']),
  },
  methods: {
    tabClick(url) {
      if (url && url !== this.ajaxConfig) {
        const item = this.tabList.find((one) => one.url === url);
        item && this.$store.dispatch('routeTo', item);
      }
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    remove(targetKey) {
      if (targetKey === this.ajaxConfig) {
        const index = this.tabList.findIndex((one) => one.url === targetKey);
        this.tabClick(this.tabList[index - 1].url);
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
