<template>
  <div class="error">
    <img src="@/assets/401.gif" />
    <p>{{ title }}</p>
    <div class="btn">
      <a @click="back">返回首页</a>
      <a @click="reset">重新登录 🔙</a>
    </div>
  </div>
</template>

<script>
import errorMixin from '@/mixins/error';
import role from '@/mixins/role';

export default {
  name: 'error',
  mixins: [errorMixin, role],
  data() {
    return {
      title: '系统错误，请联系管理员。。。',
    };
  },
  created() {
    this.$route.query.code === '0012' && (this.title = `(${this.$route.query.url})接口没有权限，请联系管理员!`);
  },
  methods: {
    appInit() {
      this.getDict();
      this.queryRoleMenu();
    },
  },
};
</script>

<style lang="less" scoped>
.error {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  p {
    font-size: 24px;
    padding-top: 20px;
  }
  .btn {
    width: 300px;
    display: flex;
    justify-content: space-between;
    a {
      padding: 0 20px;
      font-size: 20px;
      border-radius: 5px;
      border: solid 2px #f00;
    }
  }
}
</style>
