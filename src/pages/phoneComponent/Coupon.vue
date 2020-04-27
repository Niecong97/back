<template>
  <div class="drag">
    <div class="coupon" :style="{'background-color':componentVal.bgColor,'padding-top':componentVal.paddingTop + 'px','padding-bottom':componentVal.paddingTop + 'px'}">
      <el-row class="coupon-list">
        <el-col :span="12" class="coupon-wrap">
          <div class="coupon-item">
            <div class="coupon-amount">
              <p>￥ <span class="coupon-price">10</span></p>
              <p>满100.00元可用</p>
            </div>
            <div class="coupon-receive">
              立即领取
            </div>
          </div>
        </el-col>
        <el-col :span="12" class="coupon-wrap">
          <div class="coupon-item">
            <div class="coupon-amount">
              <p>￥ <span class="coupon-price">10</span></p>
              <p>满100.00元可用</p>
            </div>
            <div class="coupon-receive">
              立即领取
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
    name: "coupon",
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

<style scoped>

  .coupon-list{
    padding: 8px 0;
  }

  .coupon-item{
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .coupon-amount{
    padding: 10px 8px;
    background: linear-gradient(-128deg, #ff6d6d, #ff3636);
    color: #ffffff;
  }

  .coupon-amount:nth-child(odd){
    background: linear-gradient(-128deg, #ff6d6d, #ff3636);
  }


  /*卡券左侧半圆*/
  /*.coupon-amount::before{
    content: '';
    position: absolute;
    z-index: 1;
    width: 1.3rem;
    height: 1.3rem;
    top: 50%;
    left: -0.6rem;
    border-radius: 100%;
    background: #ffffff;
    transform: translateY(-50%);
  }*/

  .coupon-receive{
    padding:10px 0;
    width: 45px;
    background: #4e4e4e;
    color: #ffffff;
  }
</style>
