<template>
  <div id="app">
      {{footerNum}} {{footerMsg}} <!--{{message1}}-->
    <el-button @click="add">我是footer bar</el-button>
  </div>
</template>

<script>
    export default {
      props:['message1'],
      data(){
        return{
          footerNum:0,
          footerMsg:this.message1.msg1
        }
      },
      methods:{
        add(){
          this.footerNum = this.footerMsg;
        }
      },
      watch:{
        footerNum(newNum,oldNum){
          console.log("newNum:" + newNum);
          console.log("oldNum:" + oldNum);
        }
      }
    }
</script>

<style scoped>

</style>
