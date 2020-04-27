<template>
  <div class="comp-edit notice-style">
    <el-form label-width="100px">
      <el-form-item label="上下边距">
        <el-slider v-model="componentVal.paddingTop" :min="silderMin" :max="silderMax"
                   @change="changePadding"></el-slider>
        <span class="notice-pix">{{componentVal.paddingTop}}(像素)</span>
      </el-form-item>
      <el-form-item label="背景颜色">
        <div class="dis-flex">
          <el-color-picker v-model="componentVal.bgColor" :predefine="predefineColors"
                           color-format="hex" size="medium" @change="changeBgColor"></el-color-picker>
          <el-button size="small" @click="resetColor('pageTopBg')">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="文字颜色">
        <div class="dis-flex">
          <el-color-picker v-model="componentVal.fontColor" :predefine="predefineColors"
                           color-format="hex" size="medium" @change="changeFontColor"></el-color-picker>
          <el-button size="small" @click="resetColor('pageTopBg')">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="公告内容">
        <el-input v-model="componentVal.title" @change="changeTitle"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'

  export default {
    props: ['selectComp'],
    name: "notice-style",
    data() {
      return {
        Num: null,
        predefineColors: ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
        silderMin: 0,
        silderMax: 20,
        componentVal: this.selectComp,
      }
    },
    methods: {
      changePadding(val) {
        this.selectComp.paddingTop = val
      },
      changeBgColor(val) {
        this.selectComp.bgColor = val
      },
      changeFontColor(val) {
        this.selectComp.fontcolor = val
      },
      changeTitle(val) {
        this.selectComp.title = val
      },
      resetColor() {
        this.selectComp.bgColor = '#ffffff'
      },
    },
    created() {
      this.componentVal = this.selectComp
    },
    mounted() {
      var that = this
      //选择了当前组件后， 更改组件样式的值
      Bus.$on('item', (data) => {
        this.componentVal = data
      })
    },

  }
</script>

<style>
  .notice-style .el-slider__runway {
    width: 60%;
  }

  .notice-pix {
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
