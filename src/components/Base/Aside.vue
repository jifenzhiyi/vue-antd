<template>
  <aside :class="[isFold ? 'fold' : '', $isPC() ? 'isPC' : 'isMobile']">
    <div class="logo">
      <img
        v-show="isFold"
        src="@/assets/images/maluLogo.png" />
    </div>
    <a-menu
      class="menu"
      mode="inline"
      :selectedKeys="asideCurrent"
      :default-selected-keys="asideCurrent"
      :default-open-keys="openKeys"
      :inline-collapsed="!isFold"
      @openChange="openChange">
      <template
        v-for="item in asideList">
        <a-sub-menu
          v-if="item.children"
          :key="item.name">
          <span slot="title">
            <a-icon :type="item.icon" />
            <span>{{ item.name }}</span>
          </span>
          <a-menu-item
            v-for="one in item.children"
            :key="one.name"
            @click="itemClick(one)">
            <a-icon :type="one.icon" />
            <span>{{ language === 'zh-CN' ? one.name : one.nameEn }}</span>  
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item
          v-else
          :key="item.name"
          @click="itemClick(item)">
          <a-icon :type="item.icon" />
          <span>{{ language === 'zh-CN' ? item.name : item.nameEn }}</span>
        </a-menu-item>
      </template>
    </a-menu>
    <!--仓库选择-->
    <div
      v-show="isFold"
      v-if="!$isPC()"
      class="label">
      <span>仓库：</span>
      <a-select
        class="select"
        :value="warehouseId"
        @change="warehouseChange">
        <a-select-option
          v-for="item in warehouseIds"
          :key="item"
          :value="item">
          {{ item.name }}
        </a-select-option>
      </a-select>
    </div>
    <!--用户设置-->
    <div
      v-show="isFold"
      v-if="!$isPC()"
      class="userInfo">
      <span>用户：manager</span>
      <a @click="logout">
        <a-icon
          slot="icon"
          type="logout" />退出登录</a>
      </div>
  </aside>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import role from '@/mixins/role';

export default {
  name: 'BaseAside',
  mixins: [role],
  computed: {
    ...mapState(['isFold', 'routes', 'asideCurrent', 'openKeys', 'warehouseId', 'language']),
    ...mapGetters(['asideList']),
  },
  methods: {
    openChange(val) {
      this.$store.commit('SET_OPEN_KEYS', val);
    },
    currentUpdate(one) {
      const item = this.routes.filter((o) => o.isSelect)[0];
      this.$store.commit('SET_HEADER_CURRENT', [item.name, item.nameEn]);
      this.$store.commit('SET_ASIDE_CURRENT', [one.name, one.nameEn]);
      this.$store.commit('ADD_TAB', one.url);
    },
    itemClick(item) {
      this.$store.commit('SET_MENUID', item.menuId);
      this.$store.commit('SET_AJAX_CONFIG', item.url);
      this.currentUpdate(item);
      `/${item.type}` !== this.$route.path && this.$router.push(`/${item.type}`);
      !this.$isPC() && setTimeout(() => this.$store.commit('CHANGE_ISFOLD', false), 0);
    },
  },
};
</script>

<style lang="less" scoped>
aside {
  display: flex;
  overflow: hidden;
  align-items: center;
  transition: all 0.5s;
  flex-direction: column;
  border-right: solid 1px #f0f0f0;
  &.isPC { width: 80px }
  &.isMobile {
    width: 0px;
    z-index: 10;
    background: #fff;
    position: absolute;
    top: 0; left: 0; bottom: 0;
  }
  &.fold { width: 180px; }
  .logo {
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    img {
      height: 44px;
    }
  }
  .menu {
    flex: 1;
    border-right: 0;
  }
  .label {
    width: 100%;
    padding-left: 20px;
    .select { width: 100px; }
  }
  .userInfo {
    width: 100%;
    height: 84px;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    span { height: 32px; line-height: 32px;}
    a {
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 8px;
      border: solid 1px #f00;
      .anticon { padding-right: 10px; }
    }
  }
}
</style>
