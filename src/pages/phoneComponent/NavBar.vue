<template>
  <div class="drag">
    <div class="navBar" :style="{'background-color':componentVal.bgColor}">
      <el-row class="nav-bar-list">
        <el-col class="item-nav-bar" :span="componentVal.count" v-for="item in componentVal.imgItem">
          <div class="navBar-img">
            <img :src="item.img" alt="">
          </div>
          <p class="navBar-text" :style="{'color':item.fontColor}">{{item.text}}</p>
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
    name: "nav-bar",
    data() {
      return {
        componentVal: this.selectComp,
      }
    },
    created(){
      this.componentVal = this.selectComp
    },
    methods:{
      delComponent(){
        this.$emit('delComp',this.delNum)
      },
    }
  }
</script>

<style>

  .navBar .nav-bar-list {
    padding: 12px 5px 0px 5px;
  }

  .navBar .item-nav-bar {
    padding-bottom: 12px;
    text-align: center;
  }

  .navBar .navBar-img img {
    width: 48px;
    height: 48px;
  }

  .navBar .navBar-text {
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    word-wrap: normal;
  }
</style>
