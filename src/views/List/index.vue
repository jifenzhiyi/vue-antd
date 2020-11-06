<template>
  <div class="list_main">
    <list-search
      v-if="$isPC()"
      :columns="columns"
      @on-search="search" />
    <list-operation
      v-if="$isPC()"
      :columns="columns"
      @on-change-col="changeCol" />
    <list-table-mobile
      v-if="!$isPC()"
      :columns="columns"
      :ajaxConfig="ajaxConfig" />
    <list-table
      v-if="$isPC()"
      :columns="columns"
      :loading="loading"
      :tableData="tableData"
      @on-sort="tableSort"
      @on-update="tableUpdate" />
    <list-pagination
      v-if="$isPC()"
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
import ListTableMobile from 'comps/List/TableMobile';
import ListPagination from 'comps/List/Pagination';
import list from '@/mixins/list';
import { queryPageUrl, getList } from '@/views/api';

export default {
  name: 'ListIndex',
  mixins: [list],
  computed: mapState(['ajaxConfig', 'warehouseId', 'language']),
  components: {
    ListSearch, ListOperation, ListTable, ListTableMobile, ListPagination,
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
        sortName: null,
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
    changeCol(obj) {
      if (obj.checked) {
        this.columns[obj.index].isShow = obj.checked;
      } else {
        const len = this.columns.filter((o) => o.isShow).length;
        if (len < 3) {
          this.$message.error('表格列最少必须显示2个');
          return;
        }
        this.columns[obj.index].isShow = obj.checked;
      }
    },
    async pageConfig() {
      if (this.ajaxConfig === '/welcome') return;
      const dictsArr = this.$storage.get('wms_dicts') || [];
      const res = await queryPageUrl({ pageUrl: this.ajaxConfig });
      if (res) {
        this.columns = res.data.map((one) => {
          const obj = {};
          this.language === 'zh-CN' && (obj.title = one.lanCn);
          this.language === 'en-US' && (obj.title = one.lanEn);
          obj.ellipsis = true;
          obj.dataIndex = one.keyId;
          obj.sorter = one.isSort === 1;
          one.scopedSlots = { customRender: obj.keyId };
          obj.typeFilter = one.typeFilter;
          obj.isShow = true;
          const dict = dictsArr.find((o) => o.code === one.dictCode);
          if (dict) {
            obj.options = Object.entries(dict.dict).map((item) => ({ value: item[0], text: item[1].lanCn }));
          }
          return obj;
        });
        this.$isPC() && this.getList();
      }
    },
    async getList(filters = null) {
      this.loading = true;
      const params = { ...this.searchParams, ...filters };
      params.page = this.current;
      params.size = this.pageSize;
      const res = await getList(this.ajaxConfig, params);
      this.loading = false;
      this.total = res.data.total;
      this.tableData = res.data.rows.map((one, index) => {
        one.rowKey = this.ajaxConfig.split('/')[2] + index;
        Object.keys(one).forEach((k) => {
          const item = this.columns.find((c) => c.dataIndex === k && c.options && c.options.length > 0);
          if (item) {
            one[k] = item.options.find((result) => result.value === one[k].toString()).text;
          }
        });
        return one;
      });
    },
    // TODO 测试数据，以后删除
    // test() {
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
