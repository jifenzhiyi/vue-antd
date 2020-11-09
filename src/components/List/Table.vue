<template>
  <div
    ref="list_table"
    class="list_table">
    <a-table
      bordered
      v-bind="$attrs"
      :columns="columnsFilter"
      :data-source="tableData"
      :loading="loading"
      :pagination="false"
      :scroll="scroll"
      :row-key="(row) => row.rowKey"
      :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
      @change="handleTableChange">
      <template
        slot-scope="text, record, index"
        v-for="col in columnsFilter"
        :slot="col.dataIndex">
        <div
          :title="text"
          :key="col.dataIndex">
          <a-input
            v-if="record.isEdit && col.typeModify === 'input'"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, col, index)"/>
          <span v-else>{{ text }}</span>
        </div>
      </template>
      <template
        slot="operation"
        slot-scope="text, record, index">
        <div class="editable-row-operations">
          <a
            v-for="item in options"
            :key="item.type"
            @click="() => operate(item.type, record, index)">
            {{
              item.type === 'disable'
                ? (record.disable ? '禁用' : '启用')
                : item.type === 'edit'
                  ? (record.isEdit ? '更新' : '编辑')
                  : item.text
            }}
          </a>
          <a
            v-if="record.isEdit"
            @click="cancelEdit(index)">取消更新</a>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ListTable',
  props: ['columns', 'tableData', 'loading'],
  computed: {
    ...mapState(['buttonList']),
    columnsFilter() {
      return this.columns.filter((o) => o.isShow);
    },
    options() {
      const operationList = this.columns.find((item) => item.dataIndex === 'operation');
      return operationList ? operationList.list : [];
    },
    updateBtn() {
      return this.buttonList.find((o) => o.buttonType === 'update');
    },
  },
  watch: {
    tableData() {
      const count = this.tableData.filter((item) => item.isSelect).length;
      count === 0 && (this.selectedRowKeys = []);
    },
  },
  data() {
    return {
      selectedRowKeys: [],
      scroll: { x: 0 },
    };
  },
  mounted() {
    const clientWidth = this.$refs.list_table.clientWidth;
    this.scroll.x = clientWidth + 500;
  },
  methods: {
    rowKeyChange(idx) {
      const index = this.selectedRowKeys.findIndex((o) => parseInt(o.split('-')[1], 10) === idx);
      this.selectedRowKeys.splice(index, 1);
    },
    // edit 更新
    operate(type, record, idx) {
      if (type === 'edit') {
        this.rowKeyChange(idx);
        this.tableData[idx].isEdit = !this.tableData[idx].isEdit;
        !this.tableData[idx].isEdit && this.$emit('on-update', idx);
      }
      // type === 'disable' && (this.tableData[index].disable = !this.tableData[index].disable);
      // type === 'delete' && this.$notice_confirm({
      //   minfo: '确认删除该条数据？',
      //   func: () => this.tableData.splice(index, 1),
      // });
    },
    // 取消更新
    cancelEdit(idx) {
      this.rowKeyChange(idx);
      this.$emit('on-update-cancel', idx);
    },
    goDetails(url) {
      this.$router.push(url);
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
      this.tableData.forEach((item, idx) => {
        item.isSelect = false;
        this.updateBtn && (item.isEdit = false);
        const one = selectedRowKeys.find((o) => parseInt(o.split('-')[1], 10) === idx);
        one && (item.isSelect = true);
        (one && this.updateBtn) && (item.isEdit = true);
      });
      this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData));
    },
    handleChange(value, column, index) {
      this.tableData[index][column.dataIndex] = value;
    },
    handleTableChange(pagination = null, filters = null, sorter = null) {
      this.$emit('on-sort', { pagination, filters, sorter });
    },
  },
};
</script>

<style lang="less" scoped>
.list_table {
  flex: 1;
  overflow: auto;
}
.editable-row-operations a { padding-right: 10px; }
</style>
