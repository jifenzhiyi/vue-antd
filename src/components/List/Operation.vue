<template>
  <div
    v-if="$isPC()"
    class="list_operation">
    <div class="btn_list">
      <!--导入功能-->
      <!-- <a-upload
        name="file"
        :showUploadList="false"
        :before-upload="beforeUpload">
        <a-button><a-icon type="upload" />{{ $t('importFile') }}</a-button>
      </a-upload> -->
      <!--默认按钮-->
      <!-- <a-button><a-icon type="export" />{{ $t('listExport') }}</a-button> -->
      <a-button
        v-if="buttonList && addBtn"><a-icon type="plus" />添加</a-button>
      <a-button
        v-if="buttonList && updateBtn"
        :disabled="tableDataHasSelect.length === 0"
        @click="moreEdit"><a-icon type="edit" />批量更新</a-button>
    </div>
    <div class="hidden_table">
      <a
        class="ant-dropdown-link"
        @click="menuShow">
        {{ $t('columShowHide') }}<a-icon type="down" />
      </a>
      <a-menu
        class="menu"
        v-show="isShow">
        <a-menu-item
          v-for="(item, index) in columnsFilter"
          :key="index">
          <a-checkbox
            :checked="item.isShow"
            @focus="onFocus(index)"
            @change="onChange">{{ item.title }}</a-checkbox>
        </a-menu-item>
      </a-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ListOperation',
  props: ['columns', 'tableData'],
  computed: {
    ...mapState(['buttonList']),
    columnsFilter() {
      return this.columns.filter((o) => o.title !== '操作' && !o.fixed);
    },
    addBtn() {
      return this.buttonList.find((o) => o.buttonType === 'add');
    },
    updateBtn() {
      return this.buttonList.find((o) => o.buttonType === 'update');
    },
    tableDataHasSelect() {
      return this.tableData.filter((item) => item.isSelect);
    },
  },
  data() {
    return {
      index: 0,
      isShow: false,
    };
  },
  methods: {
    onFocus(index) {
      this.index = index;
    },
    beforeUpload(file) {
      console.log('handleChange file', file);
      return false;
    },
    menuShow() {
      this.isShow = !this.isShow;
    },
    onChange(e) {
      const index = this.columns.findIndex((item) => item.title === this.columnsFilter[this.index].title);
      this.$emit('on-change-col', { index, checked: e.target.checked });
    },
    moreEdit() {
      this.$emit('on-edit-more', this.tableDataHasSelect);
    },
  },
};
</script>

<style lang="less" scoped>
.list_operation {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-between;
  .btn_list {
    button { margin-right: 10px; }
  }
  .hidden_table {
    position: relative;
    .menu {
      z-index: 10;
      position: absolute;
      top: 30px; right: 0;
      border: solid 1px #ccc;
    }
  }
}
</style>
