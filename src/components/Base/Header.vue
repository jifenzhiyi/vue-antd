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
          :key="item.name">{{ item.name }}</a-menu-item>
      </a-menu>
    </nav>
    <!--仓库选择-->
    <a-select
      class="select"
      default-value="test">
      <a-select-option value="test">
        test
      </a-select-option>
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
      current: ['Home'],
      name: storage.get('userName'),
    };
  },
  methods: {
    changeFold() {
      this.$store.commit('CHANGE_ISFOLD');
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
  .icon { padding: 16px; font-size: 20px; }
  nav { flex: 1; overflow: auto; }
  .select { width: 100px; }
  .setting { padding: 8px 16px; }
}
</style>
