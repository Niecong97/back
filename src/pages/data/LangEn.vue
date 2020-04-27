<template>
  <div id="lang-en">
    英语...


    {{newMsg}}
  </div>



</template>

<script>
  export default {
    props: ['parentA'],
    name: "lang-en",
    data(){
      return{
         newMsg:null
      }
    },
    created(){
      this.newMsg = this.parentA
    }
  }
</script>

<style scoped>

</style>
