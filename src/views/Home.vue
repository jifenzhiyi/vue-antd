<template>
  <div class="home">
    <h1>This is an home page</h1>
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
      <a-button type="primary">Primary</a-button>
      <a-button @click="showMessage">showMessage</a-button>
      <a-button type="dashed">Dashed</a-button>
      <a-button type="danger">Danger</a-button>
    </p>
  </div>
</template>

<script>

export default {
  name: 'Home',
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
