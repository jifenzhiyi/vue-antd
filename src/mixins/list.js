export default {
  methods: {
    // 表格数据更新
    tableUpdate(data) {
      this.tableData = data;
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
