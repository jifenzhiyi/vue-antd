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
        v-model="current"
        :class="!$isPC() && 'mobile'">
        <a-menu-item
          v-for="item in routes"
          :key="item.name">
          <svg-icon :iconClass="item.icon" />
          <!-- <a-icon :type="item.icon" /> -->
          {{ item.name }}</a-menu-item>
      </a-menu>
    </nav>
    <!--仓库选择-->
    <a-select
      class="select"
      v-model="warehouseId"
      v-if="$isPC()"
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
  </header>
</template>

<script>
import { mapState } from 'vuex';
import role from '@/mixins/role';

export default {
  name: 'BaseHeader',
  mixins: [role],
  computed: mapState(['isFold', 'routes', 'headerCurrent']),
  data() {
    return {
      current: this.$storage.get('header_current') || ['首页'],
    };
  },
  watch: {
    current() {
      // 顶部导航选中
      this.$store.commit('SET_ROUTES_SELECT', this.current[0]);
      !this.$isPC() && this.$store.commit('CHANGE_ISFOLD', true);
    },
    headerCurrent() {
      this.current = this.headerCurrent;
    },
  },
  methods: {
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
  nav { flex: 1; height: 48px; overflow: auto; }
  .mobile { width: 70px; overflow: hidden; flex: inherit; }
  .icon { padding: 16px; font-size: 20px; }
  .select { width: 100px; }
  .setting { padding: 8px 16px; }
}
.anticon { padding-right: 5px; }
</style>
