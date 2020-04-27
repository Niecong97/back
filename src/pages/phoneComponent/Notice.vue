<template>
  <div class="drag">
    <div class="notice dis-flex" :style="{'padding-top':componentVal.paddingTop +'px','padding-bottom':componentVal.paddingTop + 'px','background-color':componentVal.bgColor,'color':componentVal.fontColor,}">
      <div class="notice-icon"><i class="fa fa-volume-up"></i></div>
      <div class="notice-text">{{componentVal.title}}</div>
    </div>
    <div class="btn-delete">
      <span class="del" @click="delComponent">删除</span>
    </div>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'

  export default {
    props: ['delNum', 'selectComp'], //要删除的组件  父组件传来的所有组件数据  选中的当前组件id
    name: "notice",
    data() {
      return {
        componentVal: this.selectComp,
      }
    },
    methods: {
      delComponent() {
        this.$emit('delComp', this.delNum)
      }
    },
    created() {
      this.componentVal = this.selectComp
    },

  }
</script>

<style>
  .notice {
    align-items: center;
    padding: 8px 10px;
  }

  .notice-icon {
    padding-top: 1px;
  }

</style>
