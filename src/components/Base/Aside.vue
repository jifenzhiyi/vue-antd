<template>
  <aside :class="isFold ? 'fold' : ''">
    <div class="logo">LOGO</div>
    <a-menu
      class="menu"
      mode="inline"
      v-model="current"
      :default-open-keys="openKeys"
      :inline-collapsed="!isFold"
      @openChange="openChange"
      @select="select">
      <template
        v-for="item in asideList">
        <a-sub-menu
          v-if="item.children"
          :key="item.url">
          <span slot="title">
            <a-icon :type="item.icon" />
            <span>{{ item.name }}</span>
          </span>
          <a-menu-item
            v-for="one in item.children"
            :key="one.url"
            @click="itemClick(one.type)">
            <a-icon :type="one.icon" />
            <span>{{ one.name }}</span></a-menu-item>
        </a-sub-menu>
        <a-menu-item
          v-else
          :key="item.url"
          @click="itemClick(item.type)">
          <a-icon :type="item.icon" />
          <span>{{ item.name }}</span></a-menu-item>
      </template>
    </a-menu>
  </aside>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import storage from '@/utils/storage';

export default {
  name: 'BaseAside',
  computed: {
    ...mapState(['isFold', 'routes']),
    ...mapGetters(['asideList']),
  },
  data() {
    return {
      current: storage.get('aside_current') || [],
      openKeys: storage.get('aside_openKeys') || [],
    };
  },
  watch: {
    current() {
      const item = this.routes.filter((o) => o.isSelect)[0];
      storage.set('header_current', [item.name]);
      storage.set('aside_current', this.current);
      storage.set('aside_openKeys', this.openKeys);
    },
  },
  methods: {
    openChange(val) {
      this.openKeys = val;
    },
    select(val) {
      storage.set('ajax_config', val.key);
      this.$store.commit('SET_AJAX_CONFIG', val.key);
    },
    itemClick(type) {
      `/${type}` !== this.$route.path && this.$router.push(`/${type}`);
    },
  },
};
</script>

<style lang="less" scoped>
aside {
  width: 80px;
  display: flex;
  align-items: center;
  transition: all 0.5s;
  flex-direction: column;
  border-right: solid 1px #f0f0f0;
  &.fold { width: 180px; }
  .logo {
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
  }
  .menu {
    border-right: 0;
  }
}
</style>
