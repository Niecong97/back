<template>
  <div class="comp-edit blank-style">
    <el-form class="blank" label-width="100px">
      <el-form-item label="背景颜色">
        <div class="dis-flex">
          <el-color-picker v-model="componentVal.bgColor" :predefine="predefineColors"
                           color-format="hex" size="medium" @change="changeBgColor"></el-color-picker>
          <el-button size="small" @click="resetColor('bgColor')">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="组件高度">
        <el-slider v-model="componentVal.height" :min="silderMin" :max="silderMax" @change="changeHeight"></el-slider>
        <span class="notice-pix">{{componentVal.height}}(像素)</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'

  export default {
    props: ['selectComp'],
    name: "blank-style",
    data() {
      return {
        Num: null,
        predefineColors: ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
        silderMin: 1,
        silderMax: 100,
        componentVal: this.selectComp,
      }
    },
    methods: {
      changeHeight(val) {
        this.selectComp.height = val
      },
      changeBgColor(val) {
        this.selectComp.bgColor = val
      },
      resetColor() {
        this.selectComp.bgColor = '#ffffff'
      }
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
    }
  }
</script>

<style scoped>
  .blank .el-form-item {
    margin: 0;
  }

  .notice-pix {
    position: absolute;
    right: 0;
    top: 0;
  }

  .blank .el-radio + .el-radio {
    margin-left: 12px;
  }
</style>

<style>
  .blank .el-slider__runway {
    width: 60%;
  }
</style>
