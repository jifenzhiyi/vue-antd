<template>
  <div class="list_table">
    <a-table
      bordered
      :columns="columns"
      :data-source="tableData"
      :loading="loading"
      :pagination="false"
      :rowKey="(row) => row.id"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      @change="handleTableChange">
      <template
        slot-scope="text, record"
        v-for="col in colList"
        :slot="col">
        <div
          class="ellipsis"
          :title="text"
          :key="col">
          <a-input
            v-if="record.isEdit && col.indexOf('At') === -1"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"/>
          <template v-else>
            {{ text }}
          </template>
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
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>

export default {
  name: 'ListTable',
  props: ['columns', 'tableData', 'loading'],
  computed: {
    options() {
      const operationList = this.columns.find((item) => item.dataIndex === 'operation');
      return operationList ? operationList.list : [];
    },
    colList() {
      return this.columns.map((o) => o.dataIndex);
    },
  },
  data() {
    return {
      selectedRowKeys: [],
    };
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    operate(type, record, index) {
      if (type === 'edit') {
        console.log('options', this.options);
        this.tableData[index].isEdit = !this.tableData[index].isEdit;
        return;
      }
      type === 'disable' && (this.tableData[index].disable = !this.tableData[index].disable);
      type === 'delete' && this.$notice_confirm({
        minfo: '确认删除该条数据？',
        func: () => this.tableData.splice(index, 1),
      });
      this.$emit('on-update', this.tableData);
    },
    handleTableChange(pagination = null, filters = null, sorter = null) {
      this.$emit('on-sort', { pagination, filters, sorter });
    },
    handleChange(value, key, column) {
      const newData = [...this.tableData];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.$emit('on-update', newData);
      }
    },
    // edit(key) {
    //   this.cacheData = this.tableData.map((item) => ({ ...item }));
    //   const newData = [...this.tableData];
    //   const target = newData.filter((item) => key === item.key)[0];
    //   this.editingKey = key;
    //   if (target) {
    //     target.editable = true;
    //     this.$emit('on-update', newData);
    //   }
    // },
    // save(key) {
    //   const newData = [...this.tableData];
    //   const newCacheData = [...this.cacheData];
    //   const target = newData.filter((item) => key === item.key)[0];
    //   const targetCache = newCacheData.filter((item) => key === item.key)[0];
    //   if (target && targetCache) {
    //     delete target.editable;
    //     this.$emit('on-update', newData);
    //     Object.assign(targetCache, target);
    //     this.cacheData = newCacheData;
    //   }
    //   this.editingKey = '';
    // },
    // cancel(key) {
    //   const newData = [...this.tableData];
    //   const target = newData.filter((item) => key === item.key)[0];
    //   this.editingKey = '';
    //   if (target) {
    //     Object.assign(target, this.cacheData.filter((item) => key === item.key)[0]);
    //     delete target.editable;
    //     this.$emit('on-update', newData);
    //   }
    // },
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
