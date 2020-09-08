<template>
  <header>
    <!--导航是否展开-->
    <a-icon
      class="icon"
      :type="isFold ? 'menu-fold' : 'menu-unfold'"
      @click="changeFold" />
    <!--1级菜单-->
    <nav>
      <a-menu
        v-model="current"
        mode="horizontal">
        <a-menu-item
          v-for="item in routes"
          :key="item.name">
          <a-icon :type="item.icon" />
          {{ item.name }}</a-menu-item>
      </a-menu>
    </nav>
    <!--仓库选择-->
    <a-select
      class="select"
      v-model="warehouseId"
      @change="warehouseChange">
      <a-select-option
        v-for="item in warehouseIds"
        :key="item"
        :value="item"> {{ item }}</a-select-option>
    </a-select>
    <!--用户设置-->
    <a-dropdown class="setting">
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
import storage from '@/utils/storage';

export default {
  name: 'BaseHeader',
  computed: mapState(['isFold', 'routes']),
  data() {
    return {
      name: storage.get('userName'),
      current: storage.get('header_current') || ['首页'],
      warehouseIds: storage.get('warehouseIds') || [],
      warehouseId: storage.get('warehouseId') || '',
    };
  },
  watch: {
    current() {
      this.$store.commit('SET_ROUTES_SELECT', this.current[0]);
    },
  },
  methods: {
    changeFold() {
      this.$store.commit('CHANGE_ISFOLD');
    },
    warehouseChange(val) {
      storage.set('warehouseId', val);
    },
    logout() {
      this.$notice_confirm({
        minfo: '是否确认退出？',
        func: () => {
          storage.clear();
          this.$router.push('/login');
        },
      });
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
  .icon { padding: 16px; font-size: 20px; }
  .select { width: 100px; }
  .setting { padding: 8px 16px; }
}
</style>
