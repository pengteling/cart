<template>
  <header>
    <div class="back"></div>
    <div class="title">购物车</div>
    <span @touchend.prevent.stop="toggleMenu">
      <i></i>
      <i></i>
      <i></i>
    </span>
    <ul class="nav" v-show="showNav">
      <li 
      v-for="item in menu"
      :key="item.id"
      >
        <a href="">
          <img :src="item.img">
          <span>{{item.text}}</span>
        </a>
      </li>
    </ul>
  </header>
</template>
<script>
export default {
  data(){
    return {
      menu:[
        {
          id:1,
          img:require('./img/home.png'),
          text:'首页'
        },{
          id:2,
          img:require('./img/category.png'),
          text:'分类搜索'
        },{
          id:3,
          img:require('./img/cart.png'),
          text:'购物车'
        },{
          id:4,
          img:require('./img/mime.png'),
          text:'我的'
        },{
          id:5,
          img:require('./img/footprint.png'),
          text:'足迹'
        }
      ],
      showNav:false
    }
  },
  // props:{
  //   nav:{
  //     require:true,
  //     default:false
  //   }
  // },
  methods:{
    toggleMenu(){
      this.showNav = !this.showNav
    },
    hideNav(){
      this.showNav = false
    }
  },
  mounted(){
    window.eventBus.$on('hideNav',()=>{
      this.hideNav()
    })

  }
}
</script>
<style lang="scss" scoped>
$base:100;
  header{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50 / $base + rem;
    padding: 0 10px;
    box-shadow: 0 0 5px rgba(20, 20, 20, 0.5);
    .back{
      height: 25 / $base + rem;
      width: 25 / $base + rem;
      background: url('./img/back.png') no-repeat center / 100% 100%;
    }
    .title{
      text-align: center;
      font-size: 23 / $base + rem;
    }
    &>span{
      height: 25 / $base + rem;
      width: 25 / $base + rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
     
      i{
        width: 5 / $base + rem;
        height: 5 / $base + rem;
        background: #666;
        border-radius: 50%;
      }
    }
    ul.nav{
      list-style: none;
      position: absolute;
      right: 10 / $base + rem;
      top: 55 / $base + rem;
      background: #666;
      &::after{
        position: absolute;
        content: "";
        border-width: 5px;
        border-color:transparent transparent #666 transparent;
        border-style: solid;
        top:-10px;
        right: 10px;
      }
      li{
        border-bottom: 1px solid #ccc;
        height: 30px;
        width: 110 / $base + rem;
        line-height: 30px;
        max-width: 150px;
        a{
          color: white;
          display: flex;
          align-items: center;
        }
        img{
          vertical-align: middle;
          height: 20px;
          margin-right: 10px;
        }

      }
    }
  }
</style>