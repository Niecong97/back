<template>
  <div class="drag" @click="selectcomp">
    <div class="sharing-goods" :style="{'background-color':componentVal.bgColor}">
      <el-row class="sharing-goods-list">
        <el-col class="item-goods" :span="24" v-for="item in componentVal.goodsItem">
          <div class="goods-wrap">
            <div class="goods-img">
              <img :src="item.img" alt="">
              <div class="sharing-nums">5人已团</div>
            </div>
            <div class="goods-detail">
              <h4>{{item.name}}</h4>
              <div class="goods-price">
                <span class="sharing-tip">2人拼团价</span>
                <div class="current-price price-color"><span class="unit">￥</span>{{item.current_price}}</div>
                <div class="original-price text-3">
                  单买价 ￥{{item.original_price}}
                </div>
              </div>
              <div class="purchase">
                去开团
              </div>
            </div>
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
    name: "sharing-goods",
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
      },
      selectcomp(){
        this.componentVal = this.selectComp
      }
    }
  }
</script>

<style scoped>

  .goods-wrap{
    display: flex;
    margin: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #E4E7ED;
  }

  .goods-img{
    position: relative;
    width: 110px;
    height: 110px;
    margin-right: 10px;
  }

  .sharing-nums{
    position: absolute;
    left: 14px;
    padding: 2px;
    bottom: 4px;
    font-size: 12px;
    color: #ffffff;
    background: rgba(0,0,0,0.3);
  }

  .sharing-nums::before {
    content: "";
    position: absolute;
    left: -9px;
    width: 9px;
    height: 20px;
    background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAAXNSR0IArs4c6QAAAR5JREFUOBGdk1dLRDEUBmNDRbBgxYboi6AsigX9/z/F9iCIqIhinYEbiSG37YEhZb+5d3M2G8JwtT8yhHeAs9tHNHsIOxC6iuYGsK1kdRHNHMGmQqw2cZTgMaxHIY5NotIJrMVwOtaJY4ROYSUNp/OSqHQGy2kwn+fiOIFzWMyD+ToVlS5gIQ+V1lGcqKT5Uqi051vkEuZKgbo9W77XV/JhiltO+pai5+tdio+9LQR/7HfYgNhhpu2l+FqxythZVrSe4B68m53OHEXy4Q2uYRZmoLFS0eAX3MI3LEFt5WIMPjARz13MFDcr26bdgJd+utr7G5pEQ5+g7H3+969pE8mHH7Djz2DXvTTl7+8HhXph7w5s2mSXN6bP+GBxBVO/f0sb7TSHquAAAAAASUVORK5CYII=") 0 0/contain no-repeat
  }

  .goods-img img{
    width: 100%;
  }

  .goods-detail{
    position: relative;
    width: calc(100% - 120px);
  }

  .goods-price{
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .purchase{
    position: absolute;
    right: 12px;
    bottom: 4px;
    padding: 2px 8px;
    border: 1px solid  #f44;
    border-radius: 25px;
    font-size: 14px;
    color: #f44;
  }

  .goods-detail h4{
    font-weight: normal;
  }

  .sharing-tip{
    background: #f44;
    color: #ffffff;
    font-size: 12px;
    padding: 3px 6px;
    border-radius: 12px 0 0 12px;
  }

  .current-price{
    display: inline-block;
  }

  .current-price .unit{
    font-size: 12px;
  }

  .original-price{
    padding-top: 12px;
    font-size: 12px;
  }

</style>
