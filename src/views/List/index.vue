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
// import { formatTime } from '@/utils/help';
import list from '@/mixins/list';
import { queryPageUrl } from '@/views/api';

export default {
  name: 'ListIndex',
  mixins: [list],
  computed: mapState(['ajaxConfig', 'warehouseId', 'language']),
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
    language() {
      this.pageConfig();
    },
    ajaxConfig() {
      this.pageConfig();
    },
    warehouseId() {
      this.pageConfig();
    },
  },
  created() {
    this.pageConfig();
  },
  methods: {
    async pageConfig() {
      const dictsArr = this.$storage.get('wms_dicts') || [];
      const res = await queryPageUrl({ pageUrl: this.ajaxConfig });
      this.columns = res.data.map((one) => {
        const obj = {};
        this.language === 'zh-CN' && (obj.title = one.lanCn);
        this.language === 'en-US' && (obj.title = one.lanEn);
        obj.typeFilter = one.typeFilter;
        const dict = dictsArr.find((o) => o.code === one.dictCode);
        if (dict) {
          obj.filters = Object.entries(dict.dict).map((item) => ({ value: item[0], text: item[1].lanCn }));
        }
        return obj;
      });
    },
    async getList(filters = null) {
      // this.loading = true;
      const params = { warehouseId: this.warehouseId, ...this.searchParams, ...filters };
      params.page = this.current;
      params.size = this.pageSize;
      params.config = this.ajaxConfig;
      console.log('getList params', params);
      // const res = await queryPageUrl(params);
      // this.loading = false;
      // this.total = res.data.total;
      // this.tableData = res.data.rows.map((one) => {
      //   one.createAt = formatTime(one.createAt);
      //   return one;
      // });
    },
    // TODO 测试数据，以后删除
    // test() {
    //   this.columns = [
    //     {
    //       title: '用户名',
    //       dataIndex: 'name',
    //       searchType: 'input',
    //       sorter: true,
    //       ellipsis: true,
    //       scopedSlots: { customRender: 'name' },
    //     },
    //     {
    //       title: '年龄',
    //       dataIndex: 'age',
    //       searchType: 'select',
    //       filters: [
    //         { text: '未成年', value: '0' },
    //         { text: '成年', value: '1' },
    //       ],
    //       ellipsis: true,
    //       scopedSlots: { customRender: 'age' },
    //     },
    //     {
    //       title: '地址',
    //       dataIndex: 'address',
    //       searchType: 'input',
    //       sorter: true,
    //       ellipsis: true,
    //       scopedSlots: { customRender: 'address' },
    //     },
    //     {
    //       title: '创建时间',
    //       dataIndex: 'createAt',
    //       searchType: 'date',
    //       sorter: true,
    //       ellipsis: true,
    //       scopedSlots: { customRender: 'createAt' },
    //     },
    //   ];
    //   // TOTO 编辑，删除等
    //   this.columns.push({
    //     title: '操作',
    //     dataIndex: 'operation',
    //     ellipsis: true,
    //     list: [
    //       { text: '编辑', type: 'edit' },
    //       { text: '删除', type: 'delete' },
    //       { text: '禁用', type: 'disable' },
    //     ],
    //     scopedSlots: { customRender: 'operation', text: '111' },
    //   });
    // },
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
