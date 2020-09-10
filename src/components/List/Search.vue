<template>
  <div class="list_search">
    <a-form
      layout="inline"
      :form="form"
      @submit="handleSubmit">
      <a-form-item
        v-for="item in searchColumns"
        :key="item.title"
        :label="item.title">
        <a-input
          :placeholder="`请输入${item.title}`"
          v-decorator="[ item.title ]" />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit">查询</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'ListSearch',
  props: ['columns'],
  computed: {
    searchColumns() {
      return this.columns.filter((o) => o.isSearch);
    },
  },
  created() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      form: null,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => !err && this.$emit('on-search', values));
    },
  },
};
</script>

<style lang="less" scoped>
.list_search {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: solid 1px #eee;
}
</style>
