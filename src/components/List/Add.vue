<template>
  <div class="middle addPop">
    <h3>{{ $t('addTitle') }}</h3>
    <div class="addList">
      <slot></slot>
    </div>
    <div class="addBtn">
      <a-button
        type="primary"
        @click="addSubmit">{{ $t('submit') }}</a-button>
    </div>
    <a @click="popHide"><a-icon type="close-circle" /></a>
  </div>
</template>

<script>
export default {
  name: 'ListAdd',
  methods: {
    addSubmit() {
      this.$emit('on-add');
    },
    popHide() {
      this.$emit('on-hide');
    },
  },
};
</script>

<style lang="less" scoped>
.addPop {
  z-index: 2;
  width: 700px;
  height: 320px;
  display: flex;
  position: fixed;
  padding: 20px 30px;
  border-radius: 6px;
  background: #fff;
  flex-direction: column;
  border: solid 2px #ddd;
  h3 {
    margin-bottom: 20px;
  }
  a {
    font-size: 24px;
    position: absolute;
    top: 5px; right: 10px;
  }
  .addList {
    flex: 1;
    margin-bottom: 10px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .addBtn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
