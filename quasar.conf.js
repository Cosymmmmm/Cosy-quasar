// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

module.exports = function(ctx) {
  const isOnline = false;
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: ["i18n", "axios", "plugins", "echarts", "webview", "main"],
    /**
     * 来自/src/css/的全局CSS/Stylus/…文件，默认包含的主题文件除外
     */
    css: ["app.styl"],
    /**
     * 从quasar-extras包中导入什么内容
     */
    extras: ["material-icons"],
    /**
     * 导入哪个Quasar组件/指令/插件，选择哪个Quasar I18n语言包,使用Quasar组件的哪个图标
     */
    framework: {
      // iconSet: 'ionicons-v4',
      // lang: 'de', // Quasar language
      // all: true, // --- includes everything; for dev only!
      components: [
        "QLayout",
        "QPageContainer",
        "QPage",
        "QTabs",
        "QTab",
        "QRouteTab",
        "QTabPanels",
        "QTabPanel",
        "QIcon",
        "QToggle",
        "QCheckbox",
        "QSlideTransition",
        "QDialog",
        "QInfiniteScroll",
        "QBtn",
        "QDate",
        "QTime",
        "QCard",
        "QCardSection",
        "QCardActions",
        "QSpinnerDots",
        "QInput"
      ],

      directives: ["Ripple"],

      // Quasar plugins
      plugins: ["Notify", "LocalStorage", "Loading"],
      config: {
        notify: { position: "top", timeout: 500 },
        loading: {
          spinner: "QSpinnerDots",
          spinnerColor: "primary",
          spinnerSize: "50"
        }
      }
    },

    supportIE: true,
    /**
     *   构建配置
     */
    build: {
      scopeHoisting: true,
      //publicPath:'/', //部署时的公共路径
      // vueRouterMode: 'history', //设置Vue路由器模式：’hash’或’history’。 请明智选择。 历史记录模式也需要在部署Web服务器上进行配置。
      // vueCompiler: true,
      // gzip: true,
      analyze: false, //使用webpack-bundle-analyzer显示构建包的分析。 如果用作对象，则表示webpack-bundle-analyzer配置对象。
      // extractCSS: false, //从Vue文件中提取CSS
      //preloadChunks: true,	//(v0.16+) 默认为“true”。 浏览器空闲时预加载块以改善用户以后导航到其他页面的体验。
      //chainWebpack(chain): Function//(CLI v0.16.2+) 扩展Webpackk配置 由Quasar CLI生成。 等同于extendWebpack()，但改为使用webpack-chain。
      extendWebpack(cfg) {
        // cfg.module.rules.push({
        //   enforce: "pre",
        //   test: /\.(js|vue)$/,
        //   loader: "eslint-loader",
        //   exclude: /node_modules/,
        //   options: {
        //     formatter: require("eslint").CLIEngine.getFormatter("stylish")
        //   }
        // });
      } //由Quasar CLI生成的扩展Webpack配置。 等同于chainWebpack()，但您可以直接访问Webpack配置对象
    },

    /**
     * 作用于webpack-dev-server
     */
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
      proxy: {
        // "/shopweb-passengerflow/*": {
        //   changeOrigin: true,
        //   target: isOnline
        //     ? "http://www.ovopark.com/"
        //     : "http://121.199.19.240:8751/"
        // },
        "/service/*": {
          changeOrigin: true,
          target: isOnline
            ? "http://www.ovopark.com/"
            : "http://dev.ovopark.com/"
        },
      }
    },
    /**
     * 导入哪个CSS动画
     *  animations: 'all', // --- includes all animations
     */
    animations: ["slideInLeft", "slideInRight", "slideOutLeft", "slideInUp", "slideOutDown"],
    /**
     * ssr配置
     */
    ssr: {
      pwa: false
    },
    /**
     * pwa配置
     */
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'mobile-vue-product',
        // short_name: 'mobile-vue-product',
        // description: 'A Quasar Framework app',
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: []
      }
    }
  };
};
