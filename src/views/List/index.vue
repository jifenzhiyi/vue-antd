<template>
  <div class="list_main">
    <list-search
      :columns="columns"
      :searchParams="searchParams"
      @on-search="search" />
    <list-operation
      :columns="columns"
      :tableData="tableData"
      @on-change-col="changeCol"
      @on-edit-more="editMore"
      @on-export="listExport"
      @on-add="listAdd" />
    <list-table
      v-if="$isPC()"
      :columns="columns"
      :loading="loading"
      :tableData="tableData"
      @on-sort="tableSort"
      @on-update="tableUpdate"
      @on-update-cancel="tableUpdateCanel" />
    <list-table-mobile
      v-if="!$isPC()"
      :columns="columns"
      :ajaxConfig="ajaxConfig" />
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
import ListTableMobile from 'comps/List/TableMobile';
import ListPagination from 'comps/List/Pagination';
import list from '@/mixins/list';
import { queryPageUrl, getList, queryWareMenusButton } from '@/views/api';

export default {
  name: 'ListIndex',
  mixins: [list],
  computed: {
    ...mapState(['ajaxConfig', 'warehouseId', 'language', 'menuId', 'buttonList']),
  },
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
    this.tableDataCopy = []; // 表格数据备份
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
      const dictsArr = this.$storage.get('wms_dicts') || []; // 数据字典缓存列表
      const res = await queryPageUrl({ pageUrl: this.ajaxConfig });
      if (res) {
        let lang = 'lanCn'; // 默认中文
        this.language === 'zh-CN' && (lang = 'lanCn');
        this.language === 'en-US' && (lang = 'lanEn');
        this.language === 'fr_FR' && (lang = 'lanFr');
        this.language === 'ja_JP' && (lang = 'lanJa');
        this.columns = res.data.map((one) => {
          const obj = {};
          obj.isShow = true; // 默认显示列
          obj.title = one[lang]; // 列标题
          obj.dataIndex = one.keyId; // 列枚举
          obj.sorter = one.isSort === 1; // 是否需要排序
          // obj.slots = { title: one.keyId };
          obj.scopedSlots = { customRender: one.keyId };
          obj.typeFilter = one.typeFilter; // 查询样式
          one.typeFilter && (this.searchParams[one.keyId] = null);
          obj.typeAdd = one.typeAdd; // 添加样式
          obj.typeModify = one.typeModify; // 更新样式
          one.minWidth && (obj.width = one.minWidth); // 列宽度
          obj.fixed = one.typeFixed; // 是否固定列
          obj.fixed && (obj.width = 200);
          const dict = dictsArr.find((o) => o.code === one.dictCode);
          if (dict) {
            obj.options = Object.entries(dict.dict).map((item) => ({
              value: item[0],
              text: item[1][lang],
            })); // 是否需要按照数据字典格式化 依据：设置dictCode
          }
          return obj;
        });
        Promise.all([
          this.queryWareMenusButton(),
          this.getList(),
        ]);
      }
    },
    async queryWareMenusButton() {
      const res = await queryWareMenusButton({ menuId: this.menuId });
      if (!res) return;
      const data = res.data.buttonList.map((one) => {
        const obj = {};
        obj.buttonType = one.buttonType;
        obj.name = one.name;
        return obj;
      });
      console.log('queryWareMenusButton data', data);
      this.$store.commit('SET_BUTTON_LIST', data);
      const udpate = data.find((o) => o.buttonType === 'update');
      if (udpate) {
        this.columns.push({
          title: '操作',
          isShow: true,
          width: 150,
          fixed: 'right',
          dataIndex: 'operation',
          list: [
            { text: '编辑', type: 'edit' },
          ],
          scopedSlots: { customRender: 'operation' },
        });
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
        one.rowKey = `${this.ajaxConfig.split('/')[2]}-${index}`;
        one.isEdit = false; // 是否展开编辑模块
        one.isSelect = false; // 行是否被选中
        Object.keys(one).forEach((k) => {
          const item = this.columns.find((c) => c.dataIndex === k && c.options && c.options.length > 0);
          if (item) {
            const o = item.options.find((result) => result.value === one[k].toString());
            if (o) {
              one[k] = o.text;
            }
          }
        });
        return one;
      });
      this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData));
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
