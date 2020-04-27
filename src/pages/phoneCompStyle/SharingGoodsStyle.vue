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
    </el-form>
  </div>
</template>


<script>

  import draggable from 'vuedraggable'
  import Bus from '../../bus/bus'
  import tool from '../../assets/js_/tool'

  export default {
    props: ['selectComp'],
    name: "sharing-goods-style",
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
        this.componentVal.paddingTop = val
      },
      changeLeft(val) {
        this.componentVal.paddingLeft = val
      },
      changeWindowSpan(val) {  //改变图片布局
        this.componentVal.windowSpan = val
      },
      changeBgColor(val) {
        this.componentVal.bgColor = val
      },
      resetColor() {
        this.componentVal.bgColor = '#ffffff'
      },
      addgoods() {
        var goods = {
          img: 'http://static.yoshop.xany6.com/20180717175657d4f120465.jpg',
          name: 'Apple iPhone X (A1903) 64GB 深空灰色 移动联通4G手机',
          price: '999.00',
          current_price: '599.00',
          original_price:'799.00',
        }
        //this.formData.goodsItem.push(goods)
        this.componentVal.goodsItem.push(goods)
      },
      async deleteGoods(index){
        var res = await tool.showModal(this, '确定删除?', true, '是的', '提示', 'warning')
        if (res[0] == 0) return false
        this.componentVal.goodsItem.splice(index,1)
      }
    },
    created() {
     /* this.formData.goodsItem = this.selectComp.goodsItem
      this.formData.windowSpan = this.selectComp.windowSpan
      this.formData.paddingTop = this.selectComp.paddingTop
      this.formData.paddingLeft = this.selectComp.paddingLeft
      this.formData.bgColor = this.selectComp.bgColor
      this.formData.showMessage = this.selectComp.showMessage*/
     this.componentVal = this.selectComp
    },
    mounted() {
      var that = this
      //选择了当前组件后， 更改组件样式的值
      Bus.$on('item', (data) => {
      /*  that.formData.paddingLeft = data.paddingLeft
        that.formData.paddingTop = data.paddingTop
        that.formData.windowSpan = data.windowSpan
        that.formData.bgColor = data.bgColor
        that.formData.goodsItem = data.goodsItem*/
      that.componentVal = data
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

  .goods-img img{
    width:100%;
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

