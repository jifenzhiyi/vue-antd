<template>
  <div class="list_main">
    <list-search
      v-if="$isPC()"
      :columns="columns"
      @on-search="search" />
    <list-operation v-if="$isPC()" />
    <list-table
      :columns="columns"
      :loading="loading"
      :tableData="tableData"
      @on-sort="tableSort"
      @on-update="tableUpdate" />
    <list-pagination
      :total="total"
      :current="current"
      :pageSize="pageSize"
      @on-change-number="pageChange"
      @on-change-size="sizeChange" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ListSearch from 'comps/List/Search';
import ListOperation from 'comps/List/Operation';
import ListTable from 'comps/List/Table';
import ListPagination from 'comps/List/Pagination';

export default {
  name: 'ListIndex',
  computed: mapState(['ajaxConfig', 'warehouseId']),
  components: {
    ListSearch, ListOperation, ListTable, ListPagination,
  },
  data() {
    return {
      total: 0, // 总数
      current: 1, // 当前页
      pageSize: 10, // 显示条数
      columns: [], // 列元素
      tableData: [], // 表格数据
      loading: false, // 是否加载
      searchParams: {
        order: null,
        sort_name: null,
      }, // 查询条件
    };
  },
  watch: {
    ajaxConfig() {
      this.getList();
    },
    warehouseId() {
      this.getList();
    },
  },
  created() {
    this.getList();
  },
  methods: {
    search(obj) {
      console.log('search obj', obj);
      this.searchParams = Object.assign(this.searchParams, obj);
      this.getList(obj);
    },
    tableSort(obj) {
      const sorter = obj.sorter;
      if (sorter) {
        this.searchParams.sort_name = sorter.field;
        if (sorter.order === 'descend') {
          this.searchParams.order = 'desc';
        } else if (sorter.order === 'ascend') {
          this.searchParams.order = 'asc';
        } else {
          this.searchParams.sort_name = null;
          this.searchParams.order = null;
        }
      }
      this.getList({ ...obj.filters });
    },
    tableUpdate(data) {
      this.tableData = data;
    },
    async getList(filters = null) {
      console.log('getList filters', filters);
      this.tableData = [];
      this.loading = true;
      const params = { warehouseId: this.warehouseId, ...this.searchParams, ...filters };
      console.log('list params', params, 'config', this.ajaxConfig);
      // const res = await AJAX...();
      // TOTO 模拟数据
      setTimeout(() => {
        this.loading = false;
        this.test();
      }, 1000);
    },
    pageChange(num) {
      this.current = num;
      this.getList();
    },
    sizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getList();
    },
    // TODO 测试数据，以后删除
    test() {
      this.columns = [
        {
          title: 'name',
          dataIndex: 'name',
          sorter: true,
          isSearch: true,
          scopedSlots: { customRender: 'name' },
        },
        {
          title: 'age',
          dataIndex: 'age',
          filters: [
            { text: '未成年', value: '0' },
            { text: '成年', value: '1' },
          ],
          scopedSlots: { customRender: 'age' },
        },
        {
          title: 'address',
          dataIndex: 'address',
          sorter: true,
          isSearch: true,
          scopedSlots: { customRender: 'address' },
        },
        {
          fixed: 'right',
          title: 'operation',
          width: 150,
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ];
      const data = [];
      for (let i = (this.current - 1) * 10; i < 10 * this.current; i++) {
        data.push({
          key: i.toString(),
          name: `Edrward ${i}`,
          age: 32,
          address: `London Park no. ${i}`,
        });
      }
      this.total = 100;
      this.tableData = data;
    },
  },
};
</script>

<style lang="less" scoped>
.list_main {
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  padding: 20px;
  display: flex;
  overflow: hidden;
  position: absolute;
  background: #fff;
  border-radius: 4px;
  flex-direction: column;
  border: solid 1px #eee;
}
</style>
