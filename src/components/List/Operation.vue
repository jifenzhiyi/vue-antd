<template>
  <div class="list_operation">
    <!--导入功能-->
    <a-upload
      name="file"
      :showUploadList="false"
      :before-upload="beforeUpload">
      <a-button><a-icon type="upload" />导入文件</a-button>
    </a-upload>
    <!--默认按钮-->
    <a-button>Default</a-button>
  </div>
</template>

<script>
export default {
  name: 'ListOperation',
  methods: {
    beforeUpload(file) {
      console.log('handleChange file', file);
      return false;
    },
  },
};
</script>

<style lang="less" scoped>
.list_operation {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  button { margin-right: 10px; }
}
</style>
