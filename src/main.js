import Vue from 'vue'
import app from './App'

new Vue({
  components:{
    app
  },
  render:h=>h(app)
}).$mount('#app')
