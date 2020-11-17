<template>
  <div
    v-if="$isPC() && searchColumns.length > 0"
    :class="['list_search', isShow && 'auto']">
    <a-form
      layout="inline"
      :form="form"
      @submit="handleSubmit">
      <a-form-item
        class="search_item_one"
        v-for="item in searchColumns"
        :key="item.dataIndex">
        <span slot="label">{{ item.title }}</span>
        <div class="text">
          <a-input
            v-if="item.typeFilter === 'input'"
            v-decorator="[item.dataIndex]"
            :placeholder="`${$t('placeholderInput')} ${item.title}`"
            @focus="inputFocus(item.dataIndex)"
            @change="inputChange" />
          <a-select
            :allowClear="true"
            :placeholder="`${$t('placeholderSelect')} ${item.title}`"
            v-decorator="[item.dataIndex]"
            v-if="item.typeFilter === 'select'"
            @focus="inputFocus(item.dataIndex)"
            @change="selectChange">
            <a-select-option
              v-for="one in item.options"
              :key="one.text"
              :value="one.value">{{ one.text }}
            </a-select-option>
          </a-select>
          <a-range-picker
            show-time
            :format="item.typeFilter === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'"
            v-if="item.typeFilter === 'datetime' || item.typeFilter === 'date'"
            v-decorator="[item.dataIndex]"
            :placeholder="[$t('placeholderStart'), $t('placeholderEnd')]" />
        </div>
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
import moment from 'moment';

export default {
  name: 'ListSearch',
  props: ['columns', 'searchParams'],
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
      focus: '',
      form: null,
      isShow: false,
    };
  },
  methods: {
    inputFocus(key) {
      this.focus = key;
    },
    inputChange(e) {
      this.searchParams[this.focus] = e.target.value;
    },
    selectChange(value) {
      this.searchParams[this.focus] = value;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        this.searchColumns.forEach((item) => {
          if (item.typeFilter === 'datetime') {
            if (values[item.dataIndex]) {
              values[`${item.dataIndex}Start`] = moment(values[item.dataIndex][0]).format('YYYY-MM-DD HH:MM:SS');
              values[`${item.dataIndex}End`] = moment(values[item.dataIndex][1]).format('YYYY-MM-DD HH:MM:SS');
              values[item.dataIndex] = null;
            }
          }
          if (item.typeFilter === 'date') {
            if (values[item.dataIndex]) {
              values[`${item.dataIndex}Start`] = moment(values[item.dataIndex][0]).format('YYYY-MM-DD');
              values[`${item.dataIndex}End`] = moment(values[item.dataIndex][1]).format('YYYY-MM-DD');
              values[item.dataIndex] = null;
            }
          }
        });
        !err && this.$emit('on-search', values);
      });
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
  .text { flex: 1; }
  .ant-form-item-label { min-width: 82px; text-overflow:ellipsis; }
  .ant-form-item-control { min-width: 172px; }
}
</style>
