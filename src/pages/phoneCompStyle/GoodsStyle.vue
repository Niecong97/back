<template>
  <div class="comp-edit goods-style">
    <el-form class="goods" label-width="100px">
      <div class="goods-choice">
        <div class="item-form goods">
          <draggable v-model="componentVal.goodsItem">
            <div class="item-goods" v-for="(item,index) in componentVal.goodsItem">
              <div class="item-inner">
                <div class="goods-img">
                  <img :src="item.img" alt="">
                  <span class="remove" @click="deleteGoods(index)">×</span> <!--@click="groupRemove(index_spec,index_content)"-->
                </div>
              </div>
            </div>
          </draggable>
        </div>
        <div class="add-goods">
          <el-button @click="addgoods">选择商品</el-button>
        </div>
      </div>

      <el-form-item label="背景颜色">
        <div class="dis-flex">
          <el-color-picker v-model="componentVal.bgColor" :predefine="predefineColors"
                           color-format="hex" size="medium" @change="changeBgColor"></el-color-picker>
          <el-button size="small" @click="resetColor('bgColor')">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="分列数量">
        <el-radio-group v-model="componentVal.windowSpan" @change="changeWindowSpan">
          <el-radio :label="24">一列</el-radio>
          <el-radio :label="12">两列</el-radio>
          <el-radio :label="8">三列</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上下边距">
        <el-slider v-model="componentVal.paddingTop" :min="silderMin" :max="silderMax" @change="changeTop"></el-slider>
        <span class="notice-pix">{{selectComp.paddingTop}}(像素)</span>
      </el-form-item>
      <el-form-item label="左右边距">
        <el-slider v-model="componentVal.paddingLeft" :min="silderMin" :max="silderMax" @change="changeLeft"></el-slider>
        <span class="notice-pix">{{componentVal.paddingLeft}}(像素)</span>
      </el-form-item>

    </el-form>
  </div>
</template>


<script>

  import draggable from 'vuedraggable'
  import Bus from '../../bus/bus'

  export default {
    props: ['selectComp'],
    name: "goods-style",
    data() {
      return {
        predefineColors: ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
        componentVal:this.selectComp,
        silderMin: 0,
        silderMax: 20,
        formData: {
          windowSpan: null,
          windowImg: null,
          paddingTop: null,
          paddingLeft: null,
          showMessage: null,
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
      changeBgColor(val) {
        this.selectComp.bgColor = val
      },
      resetColor() {
        this.selectComp.bgColor = '#efefef'
      },
      addgoods() {
        var goods = {
          img: 'http://static.yoshop.xany6.com/20180717175657d4f120465.jpg',
          name: 'Apple iPhone X (A1903) 64GB 深空灰色 移动联通4G手机',
          price: '999.00',
        }
        this.selectComp.goodsItem.push(goods)
      },
      deleteGoods(index){
        this.selectComp.goodsItem.splice(index,1)
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
      draggable
    }
  }
</script>

<style scoped>


  .goods-img {
    display: inline-block;
    width: 50px;
    cursor: unset;
  }

  .goods-img .remove{
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

  .goods-img .remove:hover{
    background-color: #000;
  }

  .item-goods {
    position: relative;
    margin: 10px;
    padding: 10px;
    background: #f7fafc;
    float: left;
  }

  .goods-choice {
    margin-bottom: 20px;
    border-bottom: 1px dashed #ccc;
  }

  .add-goods {
    margin-bottom: 20px;
  }

  .add-goods .el-button {
    width: 100%;
    height: 36px;
  }

</style>

<style>

  .component-edit .el-form-item__label {
    width: 85px !important;
  }

  .component-edit .el-form-item__content {
    margin-left: 85px !important;
  }

  .goods .el-form-item {
    margin: 0;
  }

  .goods-style .el-slider__runway {
    width: 60%;
  }

  .notice-pix {
    position: absolute;
    right: 0;
    top: 0;
  }

  .goods .el-radio + .el-radio {
    margin-left: 12px;
  }

</style>

