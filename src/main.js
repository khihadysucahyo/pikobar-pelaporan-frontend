// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Vue2Dragula } from 'vue2-dragula'
import VmBackTop from 'vue-multiple-back-top'
import VueBreadcrumbs from 'vue2-breadcrumbs'
import VueMoment from 'vue-moment'
import * as VeeValidate from 'vee-validate'
import moment from 'moment'
import infiniteScroll from 'vue-infinite-scroll'
import FlagIcon from 'vue-flag-icon'
import VueAnalytics from 'vue-ua'

moment.locale('id')

import vuetify from './plugins/vuetify'
Vue.config.performance = process.env.NODE_ENV === 'development'

import App from './App'
import store from './store'
import router from './router'

import './components' // include all components
import '@/styles' // include all css files
import './permission' // permission control
import '@/utils/vee-validate' // include all validate form
import i18n from './lang' // Internationalization
import '@/helpers/filters' // include all filters
// import './registerServiceWorker'

Vue.use(FlagIcon)
Vue.use(Vue2Dragula)
Vue.use(VueBreadcrumbs)
Vue.component(VmBackTop.name, VmBackTop)

Vue.config.productionTip = false

Vue.use(infiniteScroll)
Vue.use(VueMoment, {
  moment
})

Vue.use(VueAnalytics, {
  // [Required] The name of your app as specified in Google Analytics.
  appName: 'pelaporan-staging',
  // [Required] The version of your app.
  appVersion: '0.0.3',
  // [Required] Your Google Analytics tracking ID.
  trackingId: 'UA-140018658-10',
  // If you're using vue-router, pass the router instance here.
  vueRouter: router,

  // Global Dimensions and Metrics can optionally be specified.
  globalDimensions: [
    { dimension: 1, value: 'FirstDimension' },
    { dimension: 2, value: 'SecondDimension' }
    // Because websites are only 2D, obviously. WebGL? What's that?
  ],

  globalMetrics: [
    { metric: 1, value: 'MyMetricValue' },
    { metric: 2, value: 'AnotherMetricValue' }
  ]
})

Vue.use(VeeValidate, {
  i18n
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App)
})
