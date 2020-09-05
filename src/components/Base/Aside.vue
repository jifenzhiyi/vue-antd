<template>
  <aside :class="isFold ? 'fold' : ''">
    <div class="logo">LOGO</div>
    <a-menu
      class="menu"
      mode="inline"
      :inline-collapsed="!isFold">
      <template
        v-for="item in list">
        <a-sub-menu
          v-if="item.children"
          :key="item.title">
          <span slot="title">
            <a-icon type="mail" />
            <span>{{ item.title }}</span>
          </span>
          <a-menu-item
            v-for="one in item.children"
            :key="one.title">
            <a-icon type="pie-chart" />
            <span>{{ one.title }}</span></a-menu-item>
        </a-sub-menu>
        <a-menu-item
          v-else
          :key="item.title">
          <a-icon type="pie-chart" />
          <span>{{ item.title }}</span></a-menu-item>
      </template>
    </a-menu>
  </aside>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'BaseAside',
  computed: mapState(['isFold', 'routes']),
  data() {
    return {
      openKeys: ['sub1'],
      list: [
        {
          title: '数据概览',
          url: '/next',
        },
        {
          title: '仓库信息',
          children: [
            {
              title: '产品信息',
              url: '/next',
            },
            {
              title: '货主信息',
              url: '/next',
            },
          ],
        },
        {
          title: '仓库配置',
          children: [
            {
              title: '货架信息',
              url: '/next',
            },
            {
              title: '库位信息',
              url: '/next',
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleClick(e) {
      console.log('handleClick e', e);
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
