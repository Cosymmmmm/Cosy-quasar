<template>
  <div id="q-app" class="app">
    <transition appear enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
      <router-view />
    </transition>
  </div>
</template>

<script>
import apis from './api/common/index';
import {mapMutations} from 'vuex';

export default {
  name: "App",
  created() {
    // this.getMyInfo();
  },
  mounted() {
    
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    async getMyInfo() {
      try {
        const res = await apis.getMyInfo();
        this.setUserInfo(res);
      } catch(err) {
        console.error(err);
      }
    }
  }
};
</script>

<style>
html {
  height: 100%;
  background: #F7F7F7;
}
body {
  height: 100%;
}
  .app {
    height: 100%;
  }
</style>
