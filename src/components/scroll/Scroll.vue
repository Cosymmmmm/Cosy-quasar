<template>
  <div class="scroll-wrapper">
    <scroller
      ref="scroll"
      :onInfinite="pullingUpHandler"
      :onRefresh="pullingDownHandler"
      refreshText="松开立即刷新"
      :class="wrapperClass"
    >
      <slot></slot>
      <!-- <q-spinner-dots color="primary" size="40px" slot="refresh-spinner" /> -->
      <!-- 底部加载指示 -->
      <q-spinner-dots color="primary" size="40px" slot="infinite-spinner" />
    </scroller>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * 上拉加载更多函数
     */
    load: {
      type: Function
    },
    /**
     * 上拉加载更多函数
     */
    refresh: {
      type: Function
    },
    /**
     * 上拉加载更多函数
     */
    wrapperClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      index: 0,
      noMore: false,
      loading: false,
      refreshing: false
    };
  },
  computed: {
    scroll() {
      return this.$refs.scroll;
    }
  },
  methods: {
    /**
     * 初始化滚动插件
     */
    initScroll() {},
    /**
     * 初始化滚动插件
     */
    scrollTo(x, y, animate) {
      this.scroll.scrollTo(x, y, animate);
    },
    /**
     * 复位滚动设置
     */
    reset() {
      this.noMore = false;
    },

    /**
     * 下拉事件
     */
    pullingDownHandler(resolve) {
      if (!this.refresh) {
        resolve();
        return;
      }

      if (this.refreshing) return;

      this.refreshing = true;

      this.refresh({
        success: () => {
          this.reset();
          this.index = 1;
          this.refreshing = false;
          resolve();
        },
        end: () => {
          this.noMore = true;
          this.refreshing = false;
          resolve();
        },
        fail: () => {
          this.refreshing = false;
          resolve();
        }
      });
    },

    /**
     * 上拉加载
     */
    pullingUpHandler(resolve) {
      if (!this.load) {
        resolve(true);
        return;
      }

      if (this.noMore) {
        resolve(true);
        return;
      }

      if (this.loading) return;

      this.loading = true;
      this.index++;

      this.load(this.index, {
        success: () => {
          this.loading = false;
          resolve();
        },
        end: () => {
          this.noMore = true;
          this.loading = false;
          resolve(true);
        },
        fail: () => {
          this.loading = false;
          resolve();
        }
      });
    }
  }
};
</script>

<style scoped lang="stylus">
.scroll-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
}
</style>
