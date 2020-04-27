<template>
  <div class="drag" @click="selectcomp">
    <div class="banner">
      <el-carousel trigger="click" height="150px">
        <el-carousel-item v-for="(item,index) in formData.bannerImg" :key="index">
          <!--<h3>{{item.img}}</h3>-->
          <img class="banner-img" :src="item.img" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="wrap-cover"></div>
    <div class="btn-delete">
      <span class="del" @click="delComponent">删除</span>
    </div>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'

  export default {
    props: ['delNum', 'selectComp', 'selectNum'],
    name: "banner",
    data() {
      return {
        componentVal: null,
        formData:{
          bannerImg:null
        }
      }
    },
    methods: {
      delComponent() {
        this.$emit('delComp', this.delNum)
      },
      selectcomp() {
        console.log(this.selectComp)
        this.componentVal = this.selectComp
      }
    },
    created() {
      this.componentVal = this.selectComp
      this.formData.bannerImg = this.componentVal.bannerImg
    },
    mounted: function () {
      var that = this

      Bus.$on('item', (data) => {
        console.log(data)
      })
    }
  }
</script>

<style>
  .banner .el-carousel__container {
    height: 150px !important;
  }

  .banner .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .banner .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .banner .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
