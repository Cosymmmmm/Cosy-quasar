import Vue from "vue";
//映入echarts
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/gauge";
import 'echarts/lib/chart/radar';
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/visualMap";
Vue.component("v-charts", ECharts);
