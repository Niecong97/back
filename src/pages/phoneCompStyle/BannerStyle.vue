<template>
  <div class="comp-edit notice-style">
    <el-form class="banner" label-width="100px">
      <div class="banner-item" v-for="item in componentVal.bannerImg">
        <el-form-item label="图片">
          <img class="banner-img" :src="item.img" alt="">
        </el-form-item>
        <el-form-item label="链接">
          <el-input type="text" v-model="item.page" />
        </el-form-item>
      </div>

    </el-form>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'

  export default {
    props: ['selectComp'],
    name: "banner-style",
    data() {
      return {
        Num: null,
        componentVal:this.selectComp,
        formData: {
          bannerImg: null,
        }
      }
    },
    methods: {},
    created() {
      // this.formData.bannerImg = this.selectComp.bannerImg
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

<style scoped>
  .banner-img {
    height: 100px;
  }
  .banner-item{
    padding: 8px 0;
    margin: 8px 0;
    background: #f7fafc;
  }
</style>

<style>
  .banner .el-form-item{
    margin: 0;
  }
</style>
