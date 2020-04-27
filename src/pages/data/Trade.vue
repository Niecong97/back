<template>
  <div id="data_trade">
    <el-container>
      <el-main>
        <el-row class="block-info-1 business-all" :gutter="10">
          <h2>今日营业总览</h2>
          <el-col :span="6" v-for="(card,index) in myData.cardBlockTemp">
            <card-block :cardTemp="myData.cardBlockTemp[index]"></card-block>
          </el-col>
        </el-row>

        <el-row class="info-block-3" :gutter="10">
          <el-col :span="12">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>今日营业额走势图</span>
                <el-button style="float: right; padding: 3px 0" type="text">刷新数据</el-button>
              </div>
              <div id="chart-1"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>今日有效订单走势图</span>
                <el-button style="float: right; padding: 3px 0" type="text">刷新数据</el-button>
              </div>
              <div id="chart-2"></div>
            </el-card>
          </el-col>
        </el-row>

        <el-row class="block-info-1 history-business" :gutter="10">
          <div style="margin-bottom: 20px;margin-left: 5px;display: flex;align-items: center">
            <h2>历史营业总览</h2>
            <div class="select-time" style="margin:0 30px;">  <!--style="margin-left: 200px;margin-right: 30px;"-->
              <ul class="time-list">
                <li style="  background-color: #ddedf8;">昨天</li>
                <li>近7天</li>
                <li>近30天</li>
                <li>近90天</li>
              </ul>
            </div>
            <el-date-picker
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <el-row>
            <!--营业数据-->
            <el-col :span="24">
              <div class="business-msg">
                <div class="msg-title" style="display: flex;align-items: center;justify-content: space-between">
                  <h3 style="font-size: 16px;">营业数据</h3>
                  <el-button size="small" icon="el-icon-upload2">导出营业报表</el-button>
                </div>
                <div class="msg-content" style="margin-top: 30px;">
                  <el-row :gutter="10">
                      <el-col :span="12" v-for="cardBusiness in myData.cardBlockBusiness">
                        <card-block :cardTemp="cardBusiness"></card-block>
                      </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <!--订单数据-->
            <el-col :span="24">
              <div class="order-msg" style="margin-top: 50px;margin-bottom: 100px">
                <div class="msg-title" style="display: flex;align-items: center;justify-content: space-between">
                  <h3 style="font-size: 16px;">订单数据</h3>
                  <el-button size="small" icon="el-icon-upload2">导出订单报表</el-button>
                </div>
                <div class="msg-content" style="margin-top: 30px;">
                  <el-row :gutter="10">
                    <el-col :span="6" v-for="cardOrder in myData.cardBlockOrder">
                      <card-block :cardTemp="cardOrder"></card-block>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>


        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>

  import tool from '../../assets/js_/tool'
  import {mixinAll} from "../../mixins/mixinAll";
  import echarts from 'echarts'
  import CardBlock from '../../components/CardBlock'

  var myData = {
    module: 'data',
    //【prepare】
    mainOperate: 'getInfo', //页面主操作
    // 【form】
    formData: {
      date: null, //起讫日期
    }, //表单数据
    formRule: {
      date: [{
        required: true,
        message: '请选择起讫日期',
        trigger: 'change'
      }]
    }, //验证规则
    //add
    info: {
      monthly: {},
      this_month: {}
    },
    cardBlockTemp: [
      { // 营业员
        cardTitle: '营业额（元）',
        icon: 'fa-money',
        num: 77.00,
        up: 0,
        down: 12.11,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '比昨日同时段',
        cardContent: [
          {
            title: '昨日成交',
          },
          {
            title: '本周成交'
          }
        ]
      },
      { // 预计收入
        cardTitle: '预计收入（元）',
        icon: 'fa-money',
        num: 77.00,
        up: 11.11,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '比昨日同时段',
        cardContent: [
          {
            title: '昨日成交',
          },
          {
            title: '本周成交'
          }
        ]
      },
      { // 有效订单
        cardTitle: '有效订单',
        icon: 'fa-file-text-o',
        num: 111,
        up: 12,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '比昨日同时段',
        cardContent: [
          {
            title: '昨日成交',
          },
          {
            title: '本周成交'
          },
        ]
      },
      { // 无效订单
        cardTitle: '无效订单',
        icon: 'fa-file-text-o',
        num: 88,
        up: 11,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '比昨日同时段',
        cardContent: [
          {
            title: '昨日成交',
          },
          {
            title: '本周成交'
          },
        ]
      }
    ],
    cardBlockBusiness: [
      { // 营业额
        cardTitle: '营业额（元）',
        icon: 'fa-money',
        num: '88.00',
        up: 12.11,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '比昨日',
        cardContent: [
          {
            title: '昨日成交',
          },
          {
            title: '本周成交'
          }
        ]
      },
      { // 预计收入
        cardTitle: '预计收入（元）',
        icon: 'fa-money',
        num: '77.00',
        up: 11.77,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '比昨日',
        cardContent: [
          {
            title: '昨日成交',
          },
          {
            title: '本周成交'
          }
        ]
      },
      ],
    cardBlockOrder: [
      { // 有效订单
        cardTitle: '有效订单',
        icon: 'fa-file-text-o',
        num: 111,
        up: 12,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '比昨日',
        cardContent: [
          {
            title: '昨日成交',
          },
          {
            title: '本周成交'
          },
        ]
      },
      { // 无效订单
        cardTitle: '无效订单',
        icon: 'fa-file-text-o',
        num: 88,
        up: 11,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '比昨日',
        cardContent: [
          {
            title: '昨日成交',
          },
          {
            title: '本周成交'
          },
        ]
      },
      { // 客单价
        cardTitle: '客单价（元）',
        icon: 'fa-money',
        num: '77.00',
        up: 11.11,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '比昨日',
        cardContent: [
          {
            title: '昨日成交',
          },
          {
            title: '本周成交'
          }
        ]
      },
      { // 预计损失
        cardTitle: '预计损失（元）',
        icon: 'fa-money',
        num: '111.00',
        up: 0,
        down: 11.77,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '比昨日',
        cardContent: [
          {
            title: '昨日成交',
          },
          {
            title: '本周成交'
          },
        ]
      },
    ],
    echartsOption: {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['昨天', '今天']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '昨天',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '今天',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
      ]
    },
  };

  export default {
    components: {
      'card-block': CardBlock,
    },
    mixins: [mixinAll],
    name: "over-view",
    data() {
      return {
        myData
      }
    },
    methods: {
      drawMyCharts: function () {
        var myChart = echarts.init(document.getElementById('chart-1'));
        var myChart2 = echarts.init(document.getElementById('chart-2'));
        myChart.setOption(myData.echartsOption)
        myChart2.setOption(myData.echartsOption)
      }
    },
    created() {
      //this.prepare()

    },
    mounted() {
      this.drawMyCharts()
    }
  }
</script>

<style>

  .summary .el-card {
    margin-bottom: 12px;
    background-color: #f2f6fc;
  }

  .summary .el-card__body {
    display: flex;
    justify-content: space-between;
    align-items: center
  }

  .summary .left {
    font-size: 2rem;
    min-width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form {
    margin-top: 12px;
  }

  .right {
    width: 100%;
  }

  .right h2 {
    font-weight: normal;
    font-size: 1rem;
  }

  .time-list li {
    display: table-cell;
    padding: 5px 12px;
    cursor: pointer;
    font-size: 14px;
    color: #409EFF;

  }

  .info-block-3 {
    width: 90%;
    margin: 20px auto 0 !important;
  }

  .block-info-1.business-all, .block-info-1.history-business {
    width: 90%;
    margin: 0 auto !important;
  }

  .block-info-1 h2 {
    font-size: 22px;
    margin: 20px 0 20px -55px;
  }
</style>
