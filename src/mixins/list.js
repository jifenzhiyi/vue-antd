import * as api from '@/views/api';

export default {
  methods: {
    // 新增数据
    async listAdd() {
      console.log('listAdd');
    },
    // 列表导出
    async listExport() {
      const res = await api.exportList(this.ajaxConfig, this.searchParams);
      const blob = new Blob([res]);
      const fileName = `${this.$storage.get('wms_aside_current')[0]}.xlsx`; // 下载文件名称
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        console.log('is IE');
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        console.log('is not IE');
        const elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      }
    },
    // 批量编辑更新列表
    async editMore(list) {
      const newList = [];
      list.forEach((one) => {
        const obj = {};
        this.columns.forEach((item) => {
          item.typeModify && (obj[item.dataIndex] = one[item.dataIndex]);
        });
        newList.push(obj);
      });
      await api.updateList(this.ajaxConfig, { products: newList });
      this.getList();
    },
    // 表格数据更新
    async tableUpdate(index) {
      this.tableData[index].isSelect = false;
      const obj = {};
      this.columns.forEach((item) => {
        item.typeModify && (obj[item.dataIndex] = this.tableData[index][item.dataIndex]);
      });
      await api.updateList(this.ajaxConfig, { products: [obj] });
      this.getList();
    },
    // 取消更新
    tableUpdateCanel(index) {
      this.tableDataCopy[index].isEdit = false;
      this.tableDataCopy[index].isSelect = false;
      this.$set(this.tableData, index, this.tableDataCopy[index]);
      this.tableDataCopy = JSON.parse(JSON.stringify(this.tableData));
    },
    // 清空数据初始化表格
    initList() {
      this.columns = [];
      this.tableData = [];
      this.getList();
    },
    // 查询表格
    search(obj) {
      this.searchParams = Object.assign(this.searchParams, obj);
      this.getList(obj);
    },
    // 排序查询
    tableSort(obj) {
      if (obj.sorter) {
        this.searchParams.sortName = obj.sorter.field;
        if (obj.sorter.order === 'descend') {
          this.searchParams.order = 'desc';
        } else if (obj.sorter.order === 'ascend') {
          this.searchParams.order = 'asc';
        } else {
          this.searchParams.sortName = null;
          this.searchParams.order = null;
        }
      }
      this.getList({ ...obj.filters });
    },
    // 分页跳转
    pageChange(num) {
      this.current = num;
      this.getList();
    },
    // 一页数量更新
    sizeChange(current, pageSize) {
      this.current = current;
      this.pageSize = pageSize;
      this.getList();
    },
  },
};
