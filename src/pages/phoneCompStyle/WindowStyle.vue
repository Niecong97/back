<template>
  <div class="comp-edit window-style">
    <el-form class="window" label-width="100px">
      <el-form-item label="上下边距">
        <el-slider v-model="componentVal.paddingTop" :min="silderMin" :max="silderMax" @change="changeTop"></el-slider>
        <span class="notice-pix">{{componentVal.paddingTop}}(像素)</span>
      </el-form-item>
      <el-form-item label="左右边距">
        <el-slider v-model="componentVal.paddingLeft" :min="silderMin" :max="silderMax" @change="changeLeft"></el-slider>
        <span class="notice-pix">{{componentVal.paddingLeft}}(像素)</span>
      </el-form-item>
      <el-form-item label="布局方式">
        <el-radio-group v-model="componentVal.windowSpan" @change="changeWindowSpan">
          <el-radio :label="24">一列</el-radio>
          <el-radio :label="12">两列</el-radio>
          <el-radio :label="8">三列</el-radio>
          <el-radio :label="6">四列</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="banner-item" v-for="(item,index) in componentVal.windowImg">
        <el-form-item label="图片">
          <img class="banner-img" :src="item.img" alt="">
          <span class="remove" @click="deleteGoods(index)">×</span>
        </el-form-item>
        <el-form-item label="链接">
          <el-input type="text" v-model="item.page"/>
        </el-form-item>
      </div>
      <div class="addItem">
        <el-button size="small" @click="addItem">添加一个</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'
  import tool from '../../assets/js_/tool'

  export default {
    props: ['selectComp'],
    name: "window-style",
    data() {
      return {
        Num: null,
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
        this.selectComp.paddingTop = val
      },
      changeLeft(val) {
        this.selectComp.paddingLeft = val
      },
      changeWindowSpan(val) {  //改变图片布局
        this.selectComp.windowSpan = val
      },
      async deleteGoods(index){
        // var res = await tool.showModal(this, '确定删除?', true, '是的', '提示', 'warning')
        // if (res[0] == 0) return false
        this.componentVal.windowImg.splice(index,1)
      },
      addItem(){
        var item={
          /*img: 'http://static.yoshop.xany6.com/2018092816212996ac02338.jpg',*/
          img:'http://static.yoshop.xany6.com/20180928164317523de3424.png',
          page: 'pages/goods/index?goods_id=10002',
        }
        this.selectComp.windowImg.push(item)
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
    }
  }
</script>

<style scoped>
  .banner-img {
    /*height: 100px;*/
    height: 50px;
    max-width: 240px;
  }

  .banner-item {
    padding: 8px 0;
    margin: 8px 0;
    background: #f7fafc;
  }
  .remove{
    width: 18px;
    height: 18px;
    position: absolute;
    top: -10px;
    right: -5px;
    border-radius: 10px;
    background: hsla(0, 0%, 60%, .6);
    color: #FFFFFF;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
  }

  .remove:hover{
    background-color: #000;
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

  .addItem .el-button{
    width: 100%;
  }

</style>
