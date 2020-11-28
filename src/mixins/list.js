import { mapState } from 'vuex';
import * as api from '@/views/api';

export default {
  computed: {
    ...mapState(['language']),
  },
  methods: {
    inputFocus(key) {
      this.inputKey = key;
    },
    inputVerifi(e) {
      this.listAddVerifi[this.inputKey] = !e.target.value;
    },
    selectVerifi(value) {
      this.listAddVerifi[this.inputKey] = !value;
    },
    // 新增表格数据
    async listAddSubmit() {
      Object.entries(this.listAddParams).forEach((item) => {
        this.listAddVerifi[item[0]] = !item[1];
      });
      const result = Object.values(this.listAddVerifi).every((one) => !one);
      if (result) {
        const res = await api.addList(this.ajaxConfig, this.listAddParams);
        if (res) {
          this.$message.success(res.msg);
          Object.keys(this.listAddParams).forEach((key) => {
            this.listAddParams[key] = null;
          });
          this.listAdd();
          this.getList();
        }
      }
    },
    // 弹出添加数据层
    listAdd() {
      this.listAddFlag = !this.listAddFlag;
    },
    // 列表导出
    async listExport(item) {
      const res = await api.exportList(this.ajaxConfig, this.searchParams, item.buttonType);
      if (res) {
        const blob = new Blob([res]);
        const name = this.language === 'zh-CN' ? item.name : item.nameEn || item.name;
        const fileName = `${name}.xlsx`; // 下载文件名称
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
