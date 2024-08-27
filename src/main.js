import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters

// dthml甘特图
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
import 'font-awesome/css/font-awesome.min.css'

// import MyCalendar from "@/components/Fullcalendar/my-calendar.vue";
// Vue.component("my-calendar", MyCalendar);

/** 常用flex组件 */
import {
  Flexbox,
  FlexboxItem
} from '@/components/Flexbox'
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
// amap
import VueAMap from '@vuemap/vue-amap'
import '@vuemap/vue-amap/dist/style.css'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'f21e73b7a55c99d53347342aae80dcfc'
})
import VueAmapThree from '@vuemap/vue-amap/dist/three'
Vue.use(VueAmapThree)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
Vue.use(Element, {
  size: Cookies.get('size') || 'mini' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})
// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
