<template>
    <div id="lang-cn">
      中文...
      <el-button @click="deliveryMsg" >delivery</el-button>
    </div>
</template>

<script>
    export default {
        name: "lang-cn",
        data(){
          return{
            cnMsg:{
              name:'aaa',
              age:'22',
            }
          }
        },
      methods:{
          deliveryMsg(){
            this.$emit('emitaaa',this.cnMsg)
          }
      }
    }
</script>

<style scoped>

</style>
