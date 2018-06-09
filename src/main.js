
import Vue from 'vue'
import app from './App'

// 移动设备适配
function formatDevice(){

  const width = window.innerWidth || document.documentElement.clientWidth
  const html = document.documentElement || document.querySelector('html')
  html.style.fontSize = width / 3.75 + "px"

}
formatDevice()
window.onresize = formatDevice
window.eventBus = new Vue()
new Vue({
  components:{
    app
  },
  render:h=>h(app)
}).$mount('#app')
