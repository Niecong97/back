<template>
  <div class="drag">
    <div class="blank" :style="{'height':componentVal.height+'px','background-color':componentVal.bgColor}">
    </div>
    <div class="btn-delete">
      <span class="del" @click="delComponent">删除</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['delNum', 'selectComp'],
    name: "blank",
    data() {
      return {
        componentVal: this.selectComp,
      }
    },
    created() {
      this.componentVal = this.selectComp
    },

    methods: {
      delComponent() {
        this.$emit('delComp', this.delNum)
      },

    },
  }
</script>

<style scoped>

</style>
