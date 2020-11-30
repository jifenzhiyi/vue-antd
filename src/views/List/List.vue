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
    <list-add
      v-show="listAddFlag"
      @on-add="listAddSubmit"
      @on-hide="listAdd">
      <div class="addMain clearfix">
        <div
          class="addOne"
          v-for="item in columnsByAdd"
          :key="item.dataIndex">
          <span
            class="ellipsis"
            :title="item.title">{{ item.title }}：</span>
          <div class="text">
            <a-input
              v-if="item.typeAdd === 'input'"
              v-model="listAddParams[item.dataIndex]"
              :placeholder="`${$t('placeholderInput')} ${item.title}`"
              @focus="inputFocus(item.dataIndex)"
              @blur="inputVerifi" />
            <a-select
              :allowClear="true"
              :placeholder="`${$t('placeholderSelect')} ${item.title}`"
              v-if="item.typeAdd === 'select'"
              v-model="listAddParams[item.dataIndex]"
              @focus="inputFocus(item.dataIndex)"
              @change="selectVerifi">
              <a-select-option
                v-for="one in item.options"
                :key="one.text"
                :value="one.value">{{ one.text }}
              </a-select-option>
            </a-select>
          </div>
          <div
            v-if="listAddVerifi[item.dataIndex]"
            class="abs error">{{ item.title }}不能为空</div>
        </div>
      </div>
    </list-add>
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
    columnsByAdd() {
      return this.columns.filter((one) => one.typeAdd);
    },
  },
  components: {
    ListSearch, ListOperation, ListTable, ListTableMobile, ListPagination,
  },
  data() {
    return {
      total: 0, // 总数
      current: 1, // 当前页
      pageSize: 20, // 显示条数
      columns: [], // 列元素
      options: [], // 表格操作栏
      tableData: [], // 表格数据
      loading: false, // 是否加载
      searchParams: {
        order: null,
        orderId: null,
        sortName: null,
      }, // 查询条件
      listAddParams: {},
      listAddVerifi: {},
      inputKey: null,
      listAddFlag: false,
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
          if (obj.typeAdd) {
            this.$set(this.listAddParams, obj.dataIndex, null);
            this.$set(this.listAddVerifi, obj.dataIndex, false);
          }
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
        // TODO
        if (this.$route.query.orderId) {
          this.searchParams.orderId = this.$route.query.orderId;
        }
      }
      Promise.all([
        this.queryWareMenusButton(),
        this.getList(),
      ]);
    },
    async queryWareMenusButton() {
      const res = await queryWareMenusButton({ menuId: this.menuId });
      if (!res.data) {
        this.$store.commit('SET_BUTTON_LIST', []);
        return;
      }
      const data = res.data.buttonList.map((one) => {
        const obj = {};
        obj.buttonType = one.buttonType;
        obj.name = one.name;
        return obj;
      });
      this.$store.commit('SET_BUTTON_LIST', data);
      const udpate = data.find((o) => o.buttonType === 'update');
      const detail = data.find((o) => o.buttonType === 'detail');
      if (udpate || detail) {
        const newArr = [];
        udpate && newArr.push({ text: '编辑', type: 'edit' });
        detail && newArr.push({ text: '明细', type: 'detail' });
        this.columns.push({
          title: '操作',
          isShow: true,
          width: 150,
          fixed: 'right',
          dataIndex: 'operation',
          list: newArr,
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
      if (!res) return;
      this.total = res.data.total;
      this.tableData = res.data.rows.map((one, index) => {
        const obj = {};
        obj.rowKey = `${this.ajaxConfig.split('/')[2]}-${index}`;
        obj.isEdit = false; // 是否展开编辑模块
        obj.isSelect = false; // 行是否被选中
        this.columns.forEach((item) => {
          obj[item.dataIndex] = one[item.dataIndex];
          if (item.options) {
            const o = item.options.find((result) => result.value === one[item.dataIndex].toString());
            obj[`${item.dataIndex}_name`] = o.text;
          }
        });
        return obj;
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
.addMain {
  width: 100%;
  .addOne {
    width: 50%;
    float: left;
    display: flex;
    position: relative;
    align-items: center;
    padding-bottom: 30px;
    .text {
      flex: 1;
      .ant-select { width: 100%; }
    }
    span {
      width: 100px;
      color: #999;
      text-align: right;
      &::before {
        color: #f00;
        content: '* ';
      }
    }
    .error {
      width: 100%;
      color: #f00;
      position: absolute;
      left: 106px; bottom: 3px;
    }
  }
}
</style>
