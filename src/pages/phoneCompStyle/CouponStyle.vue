<template>
  <div class="comp-edit window-style">
    <el-form class="window" label-width="100px">
      <el-form-item label="上下边距">
        <el-slider v-model="componentVal.paddingTop" :min="silderMin" :max="silderMax" @change="changeTop"></el-slider>
        <span class="notice-pix">{{componentVal.paddingTop}}(像素)</span>
      </el-form-item>
      <!--<el-form-item label="左右边距">
        <el-slider v-model="formData.paddingLeft" :min="silderMin" :max="silderMax" @change="changeLeft"></el-slider>
        <span class="notice-pix">{{formData.paddingLeft}}(像素)</span>
      </el-form-item>-->
      <el-form-item label="背景颜色">
        <div class="dis-flex">
          <el-color-picker v-model="componentVal.bgColor" :predefine="predefineColors"
                           color-format="hex" size="medium" @change="changeBgColor"></el-color-picker>
          <el-button size="small" @click="resetColor('bgColor')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'

  export default {
    props: ['selectComp'],
    name: "window-style",
    data() {
      return {
        Num: null,
        predefineColors: ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
        silderMin: 0,
        silderMax: 20,
        componentVal:this.selectComp,
        formData: {
          windowSpan: null,
          windowImg: null,
          paddingTop: null,
          paddingLeft: null,
        }
      }
    },
    methods: {
      changeTop(val) {
        this.componentVal.paddingTop = val
      },
      changeBgColor(val) {
        this.componentVal.bgColor = val
      },
      resetColor(val){
        this.componentVal.bgColor = '#ffffff'
      }
    },
    created() {
      /*this.formData.windowImg = this.selectComp.windowImg
      this.formData.windowSpan = this.selectComp.windowSpan
      this.formData.paddingTop = this.selectComp.paddingTop
      this.formData.paddingLeft = this.selectComp.paddingLeft*/
      this.componentVal = this.selectComp

    },
    mounted() {
      var that = this
      //选择了当前组件后， 更改组件样式的值
      Bus.$on('item', (data) => {
       /* that.formData.paddingLeft = data.paddingLeft
        that.formData.paddingTop = data.paddingTop
        that.formData.windowSpan = data.windowSpan
        that.formData.windowImg = data.windowImg*/
        this.componentVal = data
      })
    }
  }
</script>

<style scoped>
  .banner-img {
    height: 100px;
  }

  .banner-item {
    padding: 8px 0;
    margin: 8px 0;
    background: #f7fafc;
  }
</style>

<style>

  .component-edit .el-form-item__label {
    width: 85px !important;
  }

  .component-edit .el-form-item__content {
    margin-left: 85px !important;
  }

  .window .el-form-item {
    margin: 0;
  }

  .window-style .el-slider__runway {
    width: 60%;
  }

  .notice-pix {
    position: absolute;
    right: 0;
    top: 0;
  }

  .window .el-radio + .el-radio {
    margin-left: 12px;
  }

</style>
