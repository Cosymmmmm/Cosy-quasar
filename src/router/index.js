import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import Navigation from "vue-navigation";
import store from "../store/index"

Vue.use(VueRouter);
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  // 实现前进刷新，后退不刷新
  // Vue.use(Navigation, { router: Router });

  Router.beforeEach((to, from, next) => {
    // loading.show();
    next();
  });

  Router.afterEach(() => {});

  return Router;
}
