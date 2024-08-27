<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.is-disabled .el-input__inner {
  color: #737373;
}
.el-table .nameClass {
  color: #1890ff;
  cursor: pointer;
  border-bottom: 1px solid cadetblue;
}
.tabClass {
  padding: 0 20px;
}
.cardClass {
  margin: 10px 20px;
}
.cardClass {
  margin: 10px 20px;
}
.cardClass .el-card__body {
  padding: 16px 20px !important;
}
.noBorder {
  border-top: none;
  border-bottom: none;
}
.noBorder .el-collapse-item__wrap {
  border-bottom: none !important;
}
</style>
