<template>

</template>

<script>
  export default {
    name: "question",
    beforeCreate() {
      //打开新页面 客服咨询页面
      window.open('https://mpkf.weixin.qq.com/')
      //主页面返回上一页
      history.go(-1)
    }
  }
</script>

<style scoped>

</style>
