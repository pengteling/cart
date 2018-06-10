<template>
  <footer>
    <div class="money-box">
      总计：<span>￥{{ totalMoney }}</span>
    </div>
    <div class="buyIt" 
    :style="style"
    @touchend="doBuy">
      <div>
        购买
        <small>（共{{count}}件）</small>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data(){
    return {
      list:null
    }
  },
  created(){
    window.eventBus.$on('sendChecked',(e)=>{
      this.list = e
    })
  },
  computed:{
    totalMoney(){
      if(this.list == null || this.list.length == 0){
        return 0
      }
      let money = 0;
      this.list.forEach(item => {
        money += item.type[item.selectedIndex].value * item.selectedCount
      });
      return money.toFixed(2)
    },
    count(){
      if(this.list == null || this.list.length == 0){
        return 0
      }
      let count = 0
      this.list.forEach(item => {
        count += item.selectedCount
      });
      return count
    },
    style(){
      if(this.count){
        return{
          color:'#fff',
          background:'#e4393c'
        }
      }else{
        return{
          color:'#999',
          background:'#ddd'
        }
      }
    }
  },
  methods:{
    doBuy(){
      if(this.count){
        alert('购买成功')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$base:100;
footer{
  height: 50px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .money-box{
    width: 120px;
    span{
      color: red;
    }
  }
  .buyIt{
    width: 110px;
    height: 100%;
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    line-height: 50px;
    small{
      font-size: 12px;
      font-weight: normal;
    }
  }

}
</style>