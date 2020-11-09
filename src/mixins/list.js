export default {
  methods: {
    // 批量编辑更新列表
    async editMore(list) {
      console.log('editMore list', list);
      // TODO 调用更新数据接口
      // const res = await edit();
      this.getList();
    },
    // 表格数据更新
    tableUpdate(index) {
      this.tableData[index].isSelect = false;
      console.log('tableUpdate index', index);
      // TODO 调用更新数据接口
      // const res = await edit();
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
