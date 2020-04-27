<template>
  <div class="drag">
    <div class="goods" :style="{'background-color':componentVal.bgColor}">
      <el-row class="goods-list">
        <el-col class="item-goods"
                :style="{'padding-left':componentVal.paddingLeft+'px','padding-right':componentVal.paddingLeft+'px','padding-top':componentVal.paddingTop+'px','padding-bottom':componentVal.paddingTop+'px',}"
                :span="componentVal.windowSpan" v-for="(item,index) in componentVal.goodsItem">
          <div class="goods-img">
            <img :src="item.img" alt="">
          </div>
          <div class="goods-detail">
            <p class="goods-title text-1" > <!--v-if="componentVal.showMessage[0]=='商品名称'"-->
              {{item.name}}
            </p>
            <p class="goods-price price-color">  <!--v-if="componentVal.showMessage[1]=='商品价格'"-->
              <span>
                ￥{{item.price}}
              </span>
              <span class="icon-purchase">
                <i class="fa fa-shopping-cart"></i>
              </span>
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="btn-delete">
      <span class="del" @click="delComponent">删除</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['delNum', 'selectComp'],
    name: "goods",
    data() {
      return {
        componentVal: this.selectComp,
      }
    },
    created() {
      this.componentVal = this.selectComp
    },

    methods: {
      delComponent() {
        this.$emit('delComp', this.delNum)
      }
    }
  }
</script>

<style>
  /* .goods {
     background: #f3f3f3;
   }*/

  .goods .item-goods {
    padding: 0 3px;
  }

  .goods .goods-img img {
    display: block;
    width: 100%;
  }

  .goods .goods-detail {
    padding-bottom: 4px;
    background: #ffffff;
    font-size: 14px;
  }

  .goods .goods-detail p {
    padding: 3px;
    white-space: normal;
  }

  .goods .goods-detail .goods-title {
    height: 34px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }

  .goods .goods-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon-purchase {
    margin-right: 0.5rem;
    font-size: 1.1rem;
  }
</style>
