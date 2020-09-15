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
import { formatTime } from '@/utils/help';
// import { queryList } from '@/views/api';

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
      options: [], // 表格操作栏
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
      this.initList();
    },
    warehouseId() {
      this.initList();
    },
  },
  created() {
    this.initList();
  },
  methods: {
    tableUpdate(data) {
      this.tableData = data;
    },
    // 清空数据初始化表格
    initList() {
      this.columns = [];
      this.tableData = [];
      return this.getList();
    },
    // 查询表格
    search(obj) {
      this.searchParams = Object.assign(this.searchParams, obj);
      this.getList(obj);
    },
    // 排序查询
    tableSort(obj) {
      if (obj.sorter) {
        this.searchParams.sort_name = obj.sorter.field;
        if (obj.sorter.order === 'descend') {
          this.searchParams.order = 'desc';
        } else if (obj.sorter.order === 'ascend') {
          this.searchParams.order = 'asc';
        } else {
          this.searchParams.sort_name = null;
          this.searchParams.order = null;
        }
      }
      this.getList({ ...obj.filters });
    },
    async getList(filters = null) {
      this.loading = true;
      const params = { warehouseId: this.warehouseId, ...this.searchParams, ...filters };
      params.page = this.current;
      params.size = this.pageSize;
      console.log('list params', params, 'config', this.ajaxConfig);
      // const res = await queryList('/roles', params);
      // console.log('res', res);
      // this.loading = false;
      // this.total = res.data.total;
      // this.tableData = res.data.rows;
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
          title: '用户名',
          dataIndex: 'name',
          searchType: 'input',
          sorter: true,
          ellipsis: true,
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '年龄',
          dataIndex: 'age',
          searchType: 'select',
          filters: [
            { text: '未成年', value: '0' },
            { text: '成年', value: '1' },
          ],
          ellipsis: true,
          scopedSlots: { customRender: 'age' },
        },
        {
          title: '地址',
          dataIndex: 'address',
          searchType: 'input',
          sorter: true,
          ellipsis: true,
          scopedSlots: { customRender: 'address' },
        },
        {
          title: '创建时间',
          dataIndex: 'createAt',
          searchType: 'date',
          sorter: true,
          ellipsis: true,
          scopedSlots: { customRender: 'createAt' },
        },
      ];
      // TOTO 编辑，删除等
      this.columns.push({
        title: '操作',
        dataIndex: 'operation',
        ellipsis: true,
        list: [
          { text: '编辑', type: 'edit' },
          { text: '删除', type: 'delete' },
          { text: '禁用', type: 'disable' },
        ],
        scopedSlots: { customRender: 'operation', text: '111' },
      });
      const data = [];
      for (let i = (this.current - 1) * 10; i < 10 * this.current; i++) {
        data.push({
          id: i.toString(),
          name: `Edrward ${i}`,
          age: 32,
          address: `London Park no. ${i}`,
          createAt: formatTime(Date.parse(new Date()) - i * 1000),
          disable: false,
          isEdit: false,
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
