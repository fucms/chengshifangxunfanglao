<template>
  <div class="tabPane-container">
    <el-tabs
      v-model="activeValue"
      class="tabClass"
      type="card"
      style="margin-top: 10px"
      @tab-click="tabClick"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <span
          slot="label"
        >{{ item.label }}
          <el-badge v-if="item.badgeNum" :value="item.badgeNum" />
        </span>
        <slot :name="item.name" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: {
    active: {
      type: String,
      default: ''
    },
    tabList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeValue: this.active
    }
  },
  methods: {
    tabClick() {
      this.$emit('update:active', this.activeValue)
    }
  }
}
</script>
