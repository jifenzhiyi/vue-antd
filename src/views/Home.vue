<template>
  <div class="content">
    <h1>This is an home page</h1>
    <div id="nav">
      <router-link
        v-for="item in routes"
        :key="item.name"
        :to="item.path"><svg-icon :iconClass="item.ico" />{{ item.name }}</router-link>
    </div>
    <p>
      <a-radio-group
        :value="locale"
        @change="changeLocale">
        <a-radio-button
          key="en"
          value="English">English</a-radio-button>
        <a-radio-button
          key="cn"
          value="中文">中文</a-radio-button>
      </a-radio-group>
    </p>
    <p>
      <a-date-picker
        v-model="value"
        @change="onChange" />
    </p>
    <p>
      <a-button
        type="primary"
        @click="addRoute">addRoute</a-button>
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
import storage from '@/utils/storage';

export default {
  name: 'Home',
  computed: mapState(['routes']),
  data() {
    return {
      value: '',
      locale: '中文',
    };
  },
  methods: {
    changeLocale(e) {
      this.locale = e.target.value;
      this.$store.commit('CHANGE_LOCALE');
    },
    onChange(val) {
      console.log('onChange val', val);
    },
    showMessage() {
      this.$message.info('This is a normal message');
    },
    addRoute() {
      this.$store.commit('ADD_ROUTE', { path: '/about', name: 'About', ico: 'qq' });
    },
    logout() {
      this.$notice_confirm({
        minfo: '确认退出该系统？',
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
p {
  button {
    margin-right: 10px;
  }
}
</style>
