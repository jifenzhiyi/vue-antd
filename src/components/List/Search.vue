<template>
  <div
    v-if="$isPC()"
    :class="['list_search', isShow && 'auto']">
    <a-form
      layout="inline"
      :form="form"
      @submit="handleSubmit">
      <a-form-item
        class="search_item_one"
        v-for="item in searchColumns"
        :key="item.dataIndex"
        :label="item.title">
        <a-input
          v-if="item.typeFilter === 'input'"
          v-decorator="[item.dataIndex]"
          :placeholder="`请输入${item.title}`" />
        <a-select
          :allowClear="true"
          v-decorator="[item.dataIndex]"
          placeholder="请选择"
          v-if="item.typeFilter === 'select'">
          <a-select-option
            v-for="one in item.options"
            :key="one.text"
            :value="one.value">{{ one.text }}
          </a-select-option>
        </a-select>
        <a-range-picker
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          v-if="item.typeFilter === 'date'"
          v-decorator="[item.dataIndex]"
          :placeholder="['开始时间', '结束时间']" />
      </a-form-item>
      <a-form-item :class="['search_submit', searchColumns.length <= 2 && 'nobtn']">
        <a-button
          type="primary"
          class="search"
          html-type="submit">{{ $t('search') }}</a-button>
      </a-form-item>
    </a-form>
    <a-icon
      class="square"
      v-if="searchColumns.length > 2"
      :type="isShow ? 'minus-square' : 'plus-square'"
      @click="formShow" />
  </div>
</template>

<script>
export default {
  name: 'ListSearch',
  props: ['columns'],
  computed: {
    searchColumns() {
      return this.columns.filter((o) => o.typeFilter);
    },
  },
  created() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      form: null,
      isShow: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => !err && this.$emit('on-search', values));
    },
    formShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="less" scoped>
.list_search {
  height: 51px;
  display: flex;
  min-height: 51px;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 10px;
  padding-right: 150px;
  border-bottom: solid 1px #eee;
  form {
    width: 100%;
    .search_date_time {
      width: 100%;
      display: flex;
      align-items: center;
    }
  }
  &.auto { height: auto; }
  .square {
    color: #f00;
    font-size: 28px;
    position: absolute;
    top: 5px; right: 0;
  }
  .search_submit {
    margin: 0;
    top: 0; right: 40px;
    position: absolute;
    &.nobtn { right: 0; }
    .search {
      width: 100px;
    }
  }
}
</style>
<style lang="less">
.ant-form { overflow: hidden; }
.search_item_one {
  .ant-form-item-label { width: 82px; }
  .ant-form-item-control { min-width: 172px; }
}
</style>
