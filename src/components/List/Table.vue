<template>
  <div class="list_table">
    <a-table
      bordered
      :columns="columns"
      :data-source="tableData"
      :loading="loading"
      :pagination="false"
      :row-selection="rowSelection"
      @change="handleTableChange">
      <template
        v-for="col in ['name', 'age', 'address']"
        :slot="col"
        slot-scope="text, record">
        <div :key="col">
          <a-input
            v-if="record.editable"
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
        slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm
              title="Sure to cancel?"
              @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a
              :disabled="editingKey !== ''"
              @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default {
  name: 'ListTable',
  props: ['columns', 'tableData', 'loading'],
  data() {
    return {
      cacheData: null,
      editingKey: '',
      rowSelection,
    };
  },
  methods: {
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
    edit(key) {
      this.cacheData = this.tableData.map((item) => ({ ...item }));
      const newData = [...this.tableData];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.$emit('on-update', newData);
      }
    },
    save(key) {
      const newData = [...this.tableData];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.key)[0];
      const targetCache = newCacheData.filter((item) => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.$emit('on-update', newData);
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    cancel(key) {
      const newData = [...this.tableData];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.filter((item) => key === item.key)[0]);
        delete target.editable;
        this.$emit('on-update', newData);
      }
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
