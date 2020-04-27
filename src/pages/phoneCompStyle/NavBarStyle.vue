<template>
  <div class="comp-edit window-style">
    <el-form class="window" label-width="100px">

      <el-form-item label="背景颜色">
        <div class="dis-flex">
          <el-color-picker v-model="componentVal.bgColor" :predefine="predefineColors"
                           color-format="hex" size="medium" @change="changeBgColor"></el-color-picker>
          <el-button size="small" @click="resetColor('bgColor')">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="每行数量">
        <el-radio-group v-model="componentVal.count" @change="changeCount">
          <el-radio :label="8">3个</el-radio>
          <el-radio :label="6">4个</el-radio>
          <el-radio :label="5">5个</el-radio>
        </el-radio-group>
      </el-form-item>

      <div class="img-item" v-for="(item,index) in componentVal.imgItem">
        <el-form-item label="图片">
          <img class="nav-bar-img" :src="item.img" alt="" @click="changeImg">
        </el-form-item>
        <el-form-item label="文字内容">
          <el-input type="text" v-model="item.text" @change="changeText"/>
        </el-form-item>
        <el-form-item label="文字颜色">
          <div class="dis-flex">
            <el-color-picker v-model="item.fontColor" :predefine="predefineColors"
                             color-format="hex" size="medium" @change="changeColor"></el-color-picker>
            <el-button size="small" @click="resetColor('pageTopBg')">重置</el-button>
          </div>
        </el-form-item>
        <el-form-item label="链接">
          <el-input type="text" v-model="item.page"/>
        </el-form-item>
        <span class="remove" @click="deleteGoods(index)">×</span>
      </div>
      <div class="addItem">
        <el-button size="small" @click="addItem">添加一个</el-button>
      </div>

      <PhotoGallery :imgVisible="showImg"></PhotoGallery>

    </el-form>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'
  import tool from '../../assets/js_/tool'
  import PhotoGallery from '../phoneComponent/PhotoGallery'

  export default {
    props: ['selectComp'],
    name: "nav-bar-style",
    data() {
      return {
        predefineColors: ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
        showImg:1,
        componentVal: this.selectComp,
      }
    },
    methods: {
      changeBgColor(val) {
        this.selectComp.bgColor = val
      },
      changeCount(val) {  //改变图片布局
        this.selectComp.count = val
      },
      resetColor(val) {  //重置背景色
        this.selectComp.bgColor = '#ffffff'
      },
      changeText(val) {
        this.selectComp.text = val
      },
      changeColor(val) {
        this.selectComp.fontColor = val
      },
      async deleteGoods(index) {
        var res = await tool.showModal(this, '确定删除?', true, '是的', '提示', 'warning')
        if (res[0] == 0) return false
        this.selectComp.imgItem.splice(index, 1)
      },
      addItem(){
        var item={
          img: 'https://demo.yiovo.com/assets/store/img/diy/navbar/icon-1.png',
          text: '按钮文字',
          fontColor: '#555',
          page: '',
        }
        this.selectComp.imgItem.push(item)
      },
       changeImg(){
        this.showImg++;
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
    },
    components:{
      PhotoGallery,
    }
  }
</script>

<style scoped>
  .nav-bar-img {
    height: 50px;
  }

  .img-item {
    padding: 8px;
    margin: 8px 0;
    background: #f7fafc;
  }

  .addItem .el-button{
    width: 100%;
  }
</style>

<style>

  .navBar .el-col-5 {
    width: 20%;
  }

  .component-edit .el-form-item__label {
    width: 85px !important;
  }

  .component-edit .el-form-item__content {
    margin-left: 85px !important;
  }

  .window .el-form-item {
    margin: 0 0 8px 0;
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

  .img-item {
    position: relative;
  }

  .img-item .remove {
    width: 18px;
    height: 18px;
    position: absolute;
    top: -5px;
    right: -5px;
    border-radius: 10px;
    background: hsla(0, 0%, 60%, .6);
    color: #FFFFFF;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
  }

  .img-item .remove:hover {
    background-color: #000;
  }

</style>
