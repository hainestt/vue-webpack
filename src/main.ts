import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    preLoad: 1
})

Vue.config.productionTip = false

const app: Vue = new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

export default app
