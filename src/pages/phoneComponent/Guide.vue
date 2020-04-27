<template>
  <div class="drag">
    <div class="guide" :style="{'padding-top':componentVal.paddingTop + 'px','padding-bottom':componentVal.paddingTop + 'px','background-color':componentVal.bgColor}">  <!--:style="{'height':componentVal.lineHeight + 'px'}"-->
      <p class="line" :style="{'border-top-width':componentVal.lineHeight+'px','border-top-style':componentVal.lineStyle,'border-top-color':componentVal.lineColor}"></p>
    </div>
    <div class="btn-delete">
      <span class="del" @click="delComponent">删除</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['delNum', 'selectComp'],
    name: "guide",
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
