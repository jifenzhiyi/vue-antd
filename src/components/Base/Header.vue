<template>
  <header>
    <!--导航是否展开-->
    <a-icon
      class="icon"
      :type="isFold ? 'menu-fold' : 'menu-unfold'"
      @click="changeFold" />
    <!--1级菜单-->
    <nav :class="!$isPC() && 'mobile'">
      <a-menu
        mode="horizontal"
        :class="!$isPC() && 'mobile_menu'"
        :selectedKeys="headerCurrent"
        :default-selected-keys="headerCurrent"
        @click="handleClick">
        <a-menu-item
          v-for="item in routes"
          :key="item.name">
          <svg-icon :iconClass="item.icon || 'fa-test'" />{{ item.name }}</a-menu-item>
      </a-menu>
    </nav>
    <!--仓库选择-->
    <a-select
      class="select"
      v-if="$isPC() && warehouseIds.length > 0"
      :value="warehouseId"
      @change="warehouseChange">
      <a-select-option
        v-for="item in warehouseIds"
        :key="item"
        :value="item"> {{ item }}</a-select-option>
    </a-select>
    <!--用户设置-->
    <a-dropdown
      class="setting"
      v-if="$isPC()">
      <a
        class="ant-dropdown-link"
        @click="e => e.preventDefault()">
        <a-icon
          slot="icon"
          type="user" />{{ name }}
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">
            <a-icon
              slot="icon"
              type="setting" />个人设置</a>
        </a-menu-item>
        <a-menu-item>
          <a @click="logout">
            <a-icon
              slot="icon"
              type="logout" />退出登录</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <!--语言设置-->
    <toggle-language />
  </header>
</template>

<script>
import { mapState } from 'vuex';
import role from '@/mixins/role';
import ToggleLanguage from 'comps/ToggleLanguage';

export default {
  name: 'BaseHeader',
  components: {
    ToggleLanguage,
  },
  mixins: [role],
  computed: mapState(['isFold', 'routes', 'headerCurrent', 'warehouseId']),
  methods: {
    handleClick(val) {
      !this.$isPC() && this.$store.commit('CHANGE_ISFOLD', true);
      this.$store.commit('SET_ROUTES_SELECT', val.key);
    },
    // 左边栏收起展开
    changeFold() {
      this.$store.commit('CHANGE_ISFOLD');
    },
  },
};
</script>

<style lang="less" scoped>
header {
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  justify-content: space-between;
  nav {
    flex: 1;
    height: 48px;
    display: flex;
    overflow: auto;
    &.mobile { overflow: hidden; }
    .mobile_menu { width: 100px; }
  }
  .icon { padding: 16px; font-size: 20px; }
  .select { width: 80px; }
  .setting { padding: 8px 12px; color: #666 !important; }
}
.anticon { padding-right: 5px; }
</style>
