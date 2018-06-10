<template>
  <main>
    <header>
      <input type="checkbox" v-model="checkedAll" :style="checkStyle(checkedAll)">
      <div class="head-title">
        全选
      </div>
    </header>
    <ul class="list">
      <li v-for="good in goods"
      :key="good.id">
      <div>
        <input type="checkbox" v-model="good.buy" :value="good" :style="checkStyle(good.buy)">
      </div>
      <div>
        <h3>{{good.title}}</h3>
        <select v-model.number="good.selected">
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
          <p>{{ good.selectedCount }}</p>
          <button @touchend="selectedCountControl(good,'+')">+</button>
        </div>
        
      </div>
      </li>
    </ul>
    
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
      goods: [
        {
          id: 1,
          title: "铅笔",
          selected:0,
          selectedCount:1,
          buy:false,
          type: [
            {
              id: 1,
              stock:1000,
              desc: "2B铅笔",
              value: "0.50"
            },
            {
              id:2,
              stock:1500,
              desc:"HB铅笔",
              value:'0.60'
            }
          ]
        },{
          id:2,
          title:"文具盒",
          selected:0,
          selectedCount:1,
          buy:false,
          type:[{
            id:1,
            stock:200,
            desc:"小学生文具盒",
            value:"5.00"
          },{
            id:2,
            stock:300,
            desc:'基本款',
            value:"5.50"
          }]
        }
      ],
      
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
      return (good.type[good.selected].value * good.selectedCount).toFixed(2)
    },
    selectedCountControl(good,operator){
      if(operator === '-'){
        if(good.selectedCount <= 1){
          return
        }else{
          good.selectedCount--
        }

      }else{
        if(good.selectedCount >= good.type[good.selected].stock){
          return
        }else{
          good.selectedCount++
        }
      }
    },
    checkStyle(check){
      console.log(check)
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
  }

};
</script>
<style lang="scss" scoped>
$base: 100;
main {
  display: flex;
  flex-direction: column;
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
          p{
            padding:0 10px;
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