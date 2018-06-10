<template>
  <main>
    <header>
      <input type="checkbox" v-model="checkedAll" :style="checkStyle(checkedAll)">
      <div class="head-title">
        全选
      </div>
    </header>
    <ul class="list" v-if="goods.length > 0">
      <li v-for="good in goods"
      :key="good.id">
      <div>
        <input type="checkbox" v-model="good.buy" :value="good" :style="checkStyle(good.buy)">
      </div>
      <div>
        <h3>{{good.title}}</h3>
        <select v-model.number="good.selectedIndex">
          <option v-for="(p,index) in good.type"
            :key="p.id" :value="index">{{p.desc}}</option>
        </select>
      </div>
      <div class="type-button">
        <div class="price-box">
          {{ typeMoney(good) }}
        </div>
        <div class="type-control">
          <button @touchend="selectedCountControl(good,'-')">-</button>
          <input type="number" v-count="good">
          <button @touchend="selectedCountControl(good,'+')">+</button>
        </div>
        
      </div>
      </li>
    </ul>
    <div v-else>
      购物车空空如也
    </div>
    
  </main>
</template>
<script>
export default {
  data() {
    return {
      checkboxBg: {
        false: require("./img/uncheck.png"),
        true: require("./img/checked.png")
      },
      goods:require('../../data/data.json')
    }
  },
  computed:{
    checkedAll:{
      get(){
        return this.goods.filter(element=>{
          return element.buy == false
        }).length > 0 ? false : true
        
      },
      set(value){
        if(value){
          this.goods.forEach(element=>{
            element.buy = true
            return true
          })

        }else{
          this.goods.forEach(element=>{
            element.buy = false
            return true
          })
        }
      }
    },
    checkList(){

      return this.goods.filter(element=>{
        return element.buy
      })
    }
  },
  methods:{
    typeMoney(good){
      return (good.type[good.selectedIndex].value * good.selectedCount).toFixed(2)
    },
    selectedCountControl(good,operator){
      if(operator === '-'){
        if(good.selectedCount <= 1){
          return
        }else{
          good.selectedCount--
        }

      }else{
        if(good.selectedCount >= good.type[good.selectedIndex].stock){
          return
        }else{
          good.selectedCount++
        }
      }
    },
    checkStyle(check){
      
      if(check){
        return{
          backgroundImage:`url(${this.checkboxBg.true})`
        }
      }else{
        return{
          backgroundImage:`url(${this.checkboxBg.false})`
        }
      }
    },
  },
  updated(){
    // 重要接口
    // 通过事件总线发送选择的商品信息
    window.eventBus.$emit('sendChecked',this.checkList)
  },
  directives:{
    count:{
      bind(el,binding){
        
        el.value = binding.value.selectedCount

        el.addEventListener('change',(e)=>{
          let max = binding.value.type[binding.value.selectedIndex].stock
          if(e.target.value <= 1){
            // e.target.value = 1
            binding.value.selectedCount = 1
          }else if(e.target.value >= max){
            // e.target.value = max
            binding.value.selectedCount = max
          }else{
            binding.value.selectedCount = Math.round(e.target.value)
          }
        })
      },
      update(el,binding){
        el.value = binding.value.selectedCount
      }
    }
  },
  watch:{
    
  }

};
</script>
<style lang="scss" scoped>
$base: 100;
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  input[type="checkbox"]{
      appearance: none;
      width: 30px;
      height: 30px;
      background: center / 100% 100%;
  }
  header {
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    
  }
  .list{
    li{
      display: flex;
      flex-wrap: wrap;
      margin: 10px 0;
      border-bottom: 1px solid #ccc;
      &>div{
        width: 50%;
      }
      .type-button{
      
        margin: 20px 0 ;
        width: 100%;
        display: flex;
        justify-content: space-around;
        .price-box{
          width: 100px;
          color:red;
        }
        .type-control{
          display: flex;
          button{
            appearance: none;
            width: 30px;
            height: 30px;
            background: #ccc;
          }
          input{
            appearance: none;
            // padding:0 10px;
            // display: inline;
            width: 25px;
            padding: 0 10px;
            text-align: center;
          }
        }
      }
    }
  }
  select{
    width: 150 / $base + rem;
    option{
      width: 100%;
      font-size: inherit;
    }
  }
}
</style>