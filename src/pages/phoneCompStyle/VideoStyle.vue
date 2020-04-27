<template>
  <div class="comp-edit video-style">
    <el-form class="window" label-width="100px">
      <el-form-item label="上下边距">
        <el-slider v-model="componentVal.paddingTop" :min="silderMin" :max="silderMax" @change="changeTop"></el-slider>
        <span class="notice-pix">{{componentVal.paddingTop}}(像素)</span>
      </el-form-item>
        <el-form-item label="封面">
          <img class="banner-img" :src="componentVal.poster" alt="">
        </el-form-item>
        <el-form-item label="视频地址">
          <el-input type="text" v-model="componentVal.page"/>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'

  export default {
    props: ['selectComp'],
    name: "video-style",
    data() {
      return {
        Num: null,
        silderMin: 0,
        silderMax: 20,
        componentVal:this.selectComp,
        formData: {
          paddingTop: null,
          page:null,
          poster:null,
        }
      }
    },
    methods: {
      changeTop(val) {
        this.selectComp.paddingTop = val
        this.$emit('compVal',this.selectComp)
      },
      changeLeft(val) {
        //改变后的组件值传递给父组件
      },
      changeWindowSpan(val) {  //改变图片布局
      }
    },
    created() {
     /* this.formData.paddingTop = this.selectComp.paddingTop
      this.formData.page =this.selectComp.page
      this.formData.poster = this.selectComp.poster*/
      this.componentVal = this.selectComp
    },
    mounted() {
      //选择了当前组件后， 更改组件样式的值
      Bus.$on('item', (data) => {
        /*this.formData.paddingTop = data.paddingTop
        this.formData.page = data.page
        this.formData.poster = data.poster*/
        this.componentVal = data
      })
    }
  }

</script>

<style>
  .window .el-form-item {
    margin: 0;
  }

  .video-style .el-slider__runway {
    width: 60%;
  }

  .notice-pix {
    position: absolute;
    right: 0;
    top: 0;
  }

  .banner-img{
    height: 140px;
  }
</style>
