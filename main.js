import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 服务器地址
Vue.prototype.serverUrl = 'http://169.254.170.10:8080'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
