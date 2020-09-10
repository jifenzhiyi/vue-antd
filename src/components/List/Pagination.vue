<template>
  <div class="list_pagination">
    <a-pagination
      size="small"
      show-size-changer
      show-quick-jumper
      :total="total"
      :page-size="pageSize"
      :show-total="total => `共${total}条`"
      :page-size-options="pageSizeOptions"
      @change="onChange"
      @showSizeChange="onShowSizeChange" />
  </div>
</template>

<script>
export default {
  name: 'ListPagination',
  props: ['total', 'pageSize'],
  data() {
    return {
      pageSizeOptions: ['10', '20', '50', '100'],
    };
  },
  methods: {
    onChange(pageNumber) {
      this.$emit('on-change-number', pageNumber);
    },
    onShowSizeChange(current, pageSize) {
      // this.pageSize = pageSize;
      this.$emit('on-change-size', current, pageSize);
    },
  },
};
</script>

<style lang="less" scoped>
.list_pagination { padding-top: 20px; text-align: center;}
</style>
