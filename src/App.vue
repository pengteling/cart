<template>
  <div id="app" @touchend="hideNav">

    <cart-head></cart-head>
    <cart-main></cart-main>
    <cart-footer></cart-footer>

  </div>
</template>
<script>
import head from './components/head/head'
import main from './components/main/main'
import foot from './components/foot/foot'
export default {
  components:{
    'cart-head':head,
    'cart-main':main,
    'cart-footer':foot
  },
  methods:{
    hideNav(){
      window.eventBus.$emit('hideNav')
    }
  }
}
</script>

<style lang="scss">
$base:100;
*{
  margin: 0;
  padding: 0;
}
body,html{
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
body{
  font-size: 16px;
}
a{
  text-decoration: none;
}
#app{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

</style>