<template>
  <el-drawer title="工作台" :visible.sync="drawer" size="80%" :append-to-body="true" />
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    show() {
      this.drawer = true
    }
  }
}
</script>

<style></style>
