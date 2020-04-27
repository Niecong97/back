<template>
  <el-card class="card-box box-wrapper" shadow="hover">
    <div class="card-top">
      <div class="card-icon"><i class="fa" :class="cardMsg.icon"></i>
        <p>{{cardMsg.cardTitle}}</p></div>
      <div class="card-name">
        <el-tooltip class="btn-tip" content="即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单" placement="top">
          <i class="fa fa-question-circle"></i>
        </el-tooltip>
      </div>
    </div>
    <div class="card-body">
      <div class="main-title">{{cardMsg.mainTitle}}</div>
      <div class="main-content">￥<span>{{cardMsg.num}}</span>
        <span class="num-change" v-if="cardMsg.up>0"><i class="fa fa-long-arrow-up"></i>2</span>
        <span class="num-change" v-if="cardMsg.down>0"><i class="fa fa-long-arrow-down"></i>2</span></div>
    </div>
    <div class="card-bottom">
      <div class="bottom-content" v-for="item in cardMsg.cardContent">
        <div class="sub-title">{{item.title}}</div>
        <div class="sub-content">￥<span>2009.60</span></div>
      </div>
    </div>
  </el-card>
</template>

<script>


  export default {
    props: ['cardTemp'],
    name: "card-block",
    data() {
      return {
        cardMsg: null,
      }
    },
    created() {
      this.cardMsg = this.cardTemp
    }
  }
</script>

<style>
  .num-change{
    font-size: 24px !important;
  }
</style>
