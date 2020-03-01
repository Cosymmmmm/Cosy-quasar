
<template>
  <div class="lower" id="lower" @scroll="onScroll">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "lower",
    props: {
      height: {
        type: String,
        default: ""
      },
      // 默认距离底部50触发
      gap: {
        type: Number,
        default: 50
      }
    },
    data() {
      return {
        onRpt: false
      };
    },
    methods: {
      // 滑动时
      onScroll() {
        // ele.scrollHeight 全文高度
        // ele.clientHeight 可见高度
        // ele.scrollTop 当前滑动的高度
        const ele = document.getElementById("lower");
        const num = ele.scrollHeight - ele.clientHeight - this.gap;
        const curNum = ele.scrollTop;
        if (curNum >= num && this.onRpt === false) {
          this.onRpt = true;
          this.$emit("lower");
        } else if (curNum < num && this.onRpt === true) {
          this.onRpt = false;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .lower {
    overflow-y: auto;
    height: 100%;
  }
</style>
