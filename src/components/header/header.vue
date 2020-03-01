<template>
  <div class="header">
    <div class="header-left"><q-icon name="arrow_back_ios" class="back-icon" @click="handleBack" /></div>
    <div class="header-title">{{ title }}</div>
    <div class="header-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: () => '客流分析',
      type: String,
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleBack() {
      if(this.$route.name === 'home') {
        this.backToApp();
      } else {
        this.$router.back();
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  width: 100%;
  height: 44px;
  border-bottom: 2px solid #F2F2F2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4%;
  text-align: center;
  position: fixed;
  top: 0px;
  bottom: 0px;
  z-index 10
  background #fff
  &-left
    width: 60px;
    text-align: left;
    .back-icon
      font-size: 22px;
      color: #f90;
  &-title
    font-size: 15px;
  &-right
    width: 60px;
    text-align: right;
    color: #f90;
</style>
