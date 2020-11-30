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
      <div
        slot="expandedRowRender"
        class="expandedRowRender"
        v-if="expandedRowRender">
        <list-table-child />
      </div>
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
          <a-select
            v-else-if="record.isEdit && col.typeModify === 'select'"
            style="width: 100%;"
            :placeholder="record[`${col.dataIndex}_name`]"
            @change="value => handleChange(value, col, index)">
            <a-select-option
              v-for="one in col.options"
              :key="one.text"
              :value="one.value">{{ one.text }}
            </a-select-option>
          </a-select>
          <span v-else>{{ col.options ? record[`${col.dataIndex}_name`] : text }}</span>
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
                  ? (record.isEdit ? $t('tableUpdate') : $t('tableEdit'))
                  : item.text
            }}
          </a>
          <a
            v-if="record.isEdit"
            @click="cancelEdit(index)">{{ $t('tableUpdateCancel') }}</a>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ListTableChild from 'comps/List/TableChild';

export default {
  name: 'ListTable',
  props: ['columns', 'tableData', 'loading', 'expandedRowRender'],
  components: { ListTableChild },
  computed: {
    ...mapState(['buttonList', 'ajaxConfig', 'asideCurrent']),
    ...mapGetters(['asideList']),
    columnsFilter() {
      const arr = this.columns.filter((o) => o.isShow);
      return arr;
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
    columnsFilter: {
      immediate: true,
      deep: true,
      handler() {
        const len = this.columnsFilter.length;
        this.$nextTick(() => {
          if (len > 0 && this.$refs.list_table) {
            const clientWidth = this.$refs.list_table.clientWidth;
            const clientHeight = this.$refs.list_table.clientHeight;
            if (len * 200 > clientWidth) {
              this.scroll.x = len * 200;
            } else {
              this.scroll.x = 0;
            }
            this.scroll.y = clientHeight - 54;
          }
        });
      },
    },
  },
  data() {
    return {
      selectedRowKeys: [],
      scroll: { x: 0, y: 0 },
    };
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
      } else if (type === 'detail') {
        // TODO 根据当前查询订单的订单名称，找到对应的订单明细item进行跳转
        this.asideList.forEach((one) => {
          const item = one.children.find((o) => o.name === `${this.asideCurrent[0]}明细`);
          if (item) {
            this.$store.dispatch('routeTo', item);
            this.$router.push(`/list2?orderId=${record.orderId}`);
          }
        });
      }
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
.list_table { flex: 1; overflow: hidden; }
.editable-row-operations a { padding-right: 10px; }
.expandedRowRender { margin: 0; overflow: auto; }
</style>
