<template>
  <div 
    ref="tableChild"
    class="table_child">
    <div class="top">
      <span>列1</span>
      <span>列2</span>
      <span>列3列3列3列3列3列3列3列3列3列3列3列3列3列3列3</span>
      <span>列4</span>
      <span>列5</span>
    </div>
    <div class="center">
      <div class="one">
        <span>内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1</span>
        <span>内容2</span>
        <span>内容3</span>
        <span>内容4</span>
        <span>内容5</span>
      </div>
      <div class="one">
        <span>内容1</span>
        <span>内容2</span>
        <span>内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1</span>
        <span>内容4</span>
        <span>内容5</span>
      </div>
      <div class="one">
        <span>内容1</span>
        <span>内容2</span>
        <span>内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1内容1</span>
        <span>内容4</span>
        <span>内容5</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListTableChild',
};
</script>

<style lang="less" scoped>
.table_child {
  text-align: center;
  background: #fff;
  border-radius: 4px;
  display: inline-block;
  border: solid 1px #ccc;
  border-bottom: 0;
  .top {
    display: flex;
    border-bottom: solid 1px #ccc;
    span {
      width: 200px;
      display: flex;
      color: #333;
      padding: 10px;
      min-height: 20px;
      font-weight: bold;
      align-items: center;
      justify-content: center;
      border-right: solid 1px #ccc;
      &:last-child { border: 0; }
    }
  }
  .center {
    .one {
      color: #666;
      display: flex;
      border-bottom: solid 1px #ccc;
      span {
        width: 200px;
        display: flex;
        padding: 10px;
        min-height: 20px;
        align-items: center;
        justify-content: center;
        border-right: solid 1px #ccc;
        &:last-child { border: 0; }
      }
    }
  }
}
</style>
