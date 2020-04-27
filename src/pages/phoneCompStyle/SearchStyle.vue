<template>
  <div class="comp-edit search-style">
    <el-form label-width="100px">
      <el-form-item label="提示文字">
        <el-input v-model="componentVal.title" @change="changeTitle"> <!--@change="changeTitle"--> </el-input>
      </el-form-item>
      <el-form-item label="搜索框样式">
        <el-radio-group v-model="componentVal.inputStyle" @change="changeSearch">
          <el-radio label="search-normal">方形</el-radio>
          <el-radio label="search-radius">圆角</el-radio>
          <el-radio label="search-round">圆弧</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="文字对齐">
        <el-radio-group v-model="componentVal.positionText" @change="changePostionText">
          <el-radio label="search-left">居左</el-radio>
          <el-radio label="search-center">居中</el-radio>
          <el-radio label="search-right">居右</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>



  </div>
</template>

<script>

  import Bus from '../../bus/bus'


  export default {
    props: ['selectComp'],
    name: "search-style",
    data() {
      return {
        componentVal: this.selectComp,
        Num: null,
        formData: {
          title: '请输入关键字进行搜索',
          inputStyle: 'search-normal',
          positionText: 'search-left',
        }
      }
    },
    methods: {
      changeTitle(val) {
        //Bus.$emit('searchTitle',this.formData.title)
        this.selectComp.title = val
      },
      changeSearch(val) {
        this.selectComp.inputStyle = val
      },
      changePostionText(val) {
        this.selectComp.positionText = val
      },

    },
    created() {
      //获取值的属性
      this.componentVal = this.selectComp

    },
    mounted() {
      var that = this
      //选择了当前组件后， 更改组件样式的值
      Bus.$on('item', (data) => {
        /*that.formData.title = data.title
        that.formData.inputStyle = data.inputStyle
        that.formData.positionText = data.positionText*/
        this.componentVal = data
      })
    },


  }
</script>

<style scoped>


</style>

<style>

</style>
