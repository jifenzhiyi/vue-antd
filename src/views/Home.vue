<template>
  <div class="content">
    <h1>This is an home page</h1>
    <h2>当前访问设备：{{ $isPC() ? '电脑端' : '手机端' }}</h2>
    <h3>当前国际化：{{ $t('lang') }}</h3>
    <p>
      <a-date-picker v-model="value" />
    </p>
    <p>
      <a-button type="primary">addRoute</a-button>
      <a-button @click="showMessage">showMessage</a-button>
      <a-button type="dashed">Dashed</a-button>
      <a-button
        type="danger"
        @click="logout">退出登录</a-button>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: mapState(['routes']),
  data() {
    return {
      value: '',
    };
  },
  methods: {
    showMessage() {
      this.$message.info('This is a normal message');
    },
    logout() {
      this.$notice_confirm({
        minfo: '确认退出该系统？',
        func: () => {
          this.$storage.get.clear();
          this.$router.push('/login');
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
p {
  button {
    margin-right: 10px;
  }
}
</style>
