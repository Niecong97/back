<template>
  <div class="drag">
    <div class="phone-window">
      <el-row class="window-list">
        <el-col v-for="(item,index) in componentVal.windowImg"  class="item-img" :span="componentVal.windowSpan"
                :style="{'padding-top':componentVal.paddingTop+'px','padding-bottom':componentVal.paddingTop+'px','padding-left':componentVal.paddingLeft+'px','padding-right':componentVal.paddingLeft+'px'}">
          <img :src="item.img" alt="">
        </el-col>
      </el-row>
    </div>
    <div class="btn-delete">
      <span class="del" @click="delComponent">删除</span>
    </div>
  </div>
</template>

<script>

  export default {
    props: ['delNum', 'selectComp'],
    name: "phone-window",
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

<style>
  .window-list .item-img img {
    display: block;
    width: 100%;
  }
</style>
