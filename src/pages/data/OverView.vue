<template>
  <div id="over_view">
    <el-container>
      <el-header class="page-header">
        <h1><!--<i class="fa fa-eye"></i>-->概览</h1>
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
           <el-breadcrumb-item> &lt;!&ndash;:to="{ path: '/' }"&ndash;&gt;
             <i class="fa fa-home"></i>首页
           </el-breadcrumb-item>
           <el-breadcrumb-item>
             <i class="fa fa-dashboard"></i>
             数据
           </el-breadcrumb-item>
           <el-breadcrumb-item>
             <i class="fa fa-eye"></i>
             概览
           </el-breadcrumb-item>
         </el-breadcrumb>-->
      </el-header>
      <el-container>
        <el-main> <!-- v-loading="false"-->
          <el-row class="block-info-1" :gutter="10">
            <el-col :span="6" v-for="card in myData.cardBlockTemp">
              <card-block :cardTemp="card"></card-block>
            </el-col>
          </el-row>

          <el-row class="block-info-2" :gutter="20">
            <el-col :span="14">
              <el-card class="box-card usage" shadow="hover">
                <div slot="header">
                  使用量
                  <el-tooltip class="btn-tip"
                              content="根据不同的套餐，我们为您分配了免费的一些服务器资源当您的平台过于热门时会导致配比空间不足，未避免影响您的电商开展正常使用，请联系我们为您升级"
                              placement="top">
                    <i class="fa fa-question-circle"></i>
                  </el-tooltip>
                </div>
                <div>
                  <el-progress type="circle" :percentage="myData.info.expiration_remain_percent"
                               color="#8e71c7"></el-progress>
                  <h1>{{myData.info.expiration_remain}}天后到期</h1>
                  <h2>授权
                    <el-tooltip class="btn-tip" content="剩余授权日期，请务必在到期日之前联系我们为您续费升级，以免平台临时停止服务，为您带来不便"
                                placement="top">
                      <i class="fa fa-question-circle"></i>
                    </el-tooltip>
                  </h2>
                </div>
                <div>
                  <el-progress type="circle" :percentage="myData.info.storage_percent"></el-progress>
                  <h1>{{myData.info.storage_used}}/{{myData.info.storage_limit}}</h1>
                  <h2>OSS
                    <el-tooltip class="btn-tip" content="由“阿里云”提供的云存储服务，即云盘存储空间，主要用于存放商品信息、新闻信息等"
                                placement="top">
                      <i class="fa fa-question-circle"></i>
                    </el-tooltip>
                  </h2>
                </div>
                <div>
                  <el-progress type="circle" :percentage="myData.info.goods_used_percent"></el-progress>
                  <h1>{{myData.info.goods_total}}/{{myData.info.goods_amount_limit}}</h1>
                  <h2>商品总数
                    <el-tooltip class="btn-tip" content="不同的套餐可支持不同数目的最大商品总数，当您有额外需求时，请联系我们"
                                placement="top">
                      <i class="fa fa-question-circle"></i>
                    </el-tooltip>
                  </h2>
                </div>
                <!--<div>
                  <el-progress type="circle" :percentage="myData.info.cpu_used_percent"></el-progress>
                  <h1>{{myData.info.cpu_used_percent}}%</h1>
                  <h2>CPU
                    <el-tooltip class="btn-tip" content="cpu使用状态" placement="top">
                      <i class="fa fa-question-circle"></i>
                    </el-tooltip>
                  </h2>
                </div>-->
                <!--<div>
                  <el-progress type="circle" :percentage="myData.info.memory_used_percent"></el-progress>
                  <h1>{{myData.info.memory_used}}MB/{{myData.info.memory_total}}MB</h1>
                  <h2>内存
                    <el-tooltip class="btn-tip" content="内存使用状态" placement="top">
                      <i class="fa fa-question-circle"></i>
                    </el-tooltip>
                  </h2>
                </div>-->
              </el-card>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card version" shadow="hover">
                <div slot="header" style="color: #fff">套餐及版本</div>
                <div>
                  <h1><i class="fa fa-gift"></i>类型：</h1>
                  <h2>经典版 1年
                    <el-tooltip class="btn-tip" content="套餐目前分为三档：经典版、旗舰版、尊享版，您可以随时升级，更多情况请参阅21B官网"
                                placement="top">
                      <i class="fa fa-question-circle"></i>
                    </el-tooltip>
                  </h2>
                </div>
                <div>
                  <h1><i class="fa fa-clock-o"></i>起讫：</h1>
                  <h2>2018-11-05 &nbsp;/&nbsp; 2019-06-14</h2>
                </div>
                <div>
                  <h1><i class="fa fa-wechat"></i>小程序：</h1>
                  <h2>V1.0.0 </h2>
                  <el-popover class="btn-tip" placement="top-start" title="标题" trigger="hover"
                              content="最近更新日期 最近更新日期...">
                    <i slot="reference" class="fa fa-question-circle"></i>
                  </el-popover>
                </div>
                <div>
                  <h1><i class="fa fa-home"></i>控制台：</h1>
                  <h2>V1.0.6
                    <el-popover class="btn-tip" placement="top-start" title="标题" trigger="hover"
                                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                      <i slot="reference" class="fa fa-question-circle"></i>
                    </el-popover>
                  </h2>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row class="block-info-3">
            <el-col :span="24">
              <div class="block-news">
                <div class="block-news-title">
                  最近新闻
                </div>
                <div class="block-news-content">
                  <div class="timeline">
                    <ul class="news-list">
                      <li>
                        <div class="news-time">2018-11-16 6:00:00</div>
                        <div class="news-icon"><i class="fa fa-file-text-o"></i></div>
                        <div class="news-content">
                          <div class="news-author" style="color: #409EFF;font-weight: 600;">
                            管理员
                          </div>
                          <div class="news-detail">
                            即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单
                            即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单

                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="news-time">2018-11-16 6:00:00</div>
                        <div class="news-icon"><i class="fa fa-file-text-o"></i></div>
                        <div class="news-content">
                          <div class="news-author" style="color: #409EFF;font-weight: 600;">
                            管理员
                          </div>
                          <div class="news-detail">
                            即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单
                            即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单

                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="news-time">2018-11-16 6:00:00</div>
                        <div class="news-icon"><i class="fa fa-file-text-o"></i></div>
                        <div class="news-content">
                          <div class="news-author" style="color: #409EFF;font-weight: 600;">
                            管理员
                          </div>
                          <div class="news-detail">
                            即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单
                            即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单

                          </div>
                        </div>
                      </li>
                    </ul>
                    <!--<div class="read-more" style="position: absolute;left: 50%;bottom: 8px;margin-left: -32px;" >查看更多</div>-->
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import tool from '../../assets/js_/tool'
  import {mixinAll} from "../../mixins/mixinAll";
  import CardBlock from '../../components/CardBlock'

  var myData = {
    mixins: [mixinAll],
    module: 'data', //本模块名称
    own: 0, //是否只查询本商城
    //【getOptions相关】
    mainOperate: 'getInfo', //getOptions后的主操作
    info: {
      //【销售额】
      money_today: 0,
      money_yesterday: 0,
      money_week: 0,
      //【用户】
      user_total: 0, //用户总数
      user_today: 0, //今日新增
      user_uv_today: 0, //uv
      user_active_rate: 0, //日活跃
      user_uv_yesterday: 0, //人均停留时长
      //【商品】
      goods_total: 0, //商品总数
      goods_total_new: 0, //今日商品新增
      goods_sold_today: 0, //今日售出商品件数
      goods_sold_yesterday: 0, //今日售出商品件数
      goods_lack: 0, //今日售出商品数
      //【订单】
      order_today: 0, //今日订单数
      order_yesterday: 0, //昨日订单数
      order_average: 0, //客单价
      order_uv_rate: 0, //uv转化率
      //【套餐及版本】
      level: '未知',
      expiration: 0,
      start_time: '',
      end_time: '',
      mini_version: '',
      mini_date: '',
      console_version: '',
      console_date: '',
      //【使用量】
      expiration_remain: 0,
      expiration_remain_percent: 100,
      storage_used: 0,
      storage_limit: 0,
      storage_percent: 100,
      goods_amount_limit: 0,
      goods_used_percent: 100,
      cpu_used_percent: 100,
      memory_used: 0,
      memory_total: 0,
      memory_used_percent: 100,
      //【表单】
      pv_lastSevenDays: [],
      uv_lastSevenDays: [],
      money_lastSevenDays: [],

    },
    cardBlockTemp: [
      { // 成交额
        cardTitle: '成交额',
        icon:'fa-money',
        num: 77,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '今日成交',
        cardContent: [
          {
            title: '昨日成交',
          },
          {
            title: '本周成交'
          }
        ]
      },
      { // 用户
        cardTitle: '用户',
        icon:'fa-user',
        num: 162,
        up: 2,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '用户总数',
        cardContent: [
          {
            title: '今日UV',
          },
          {
            title: '日活跃'
          },
          {
            title: '昨日UV'
          }
        ]
      },
      { // 商品
        cardTitle: '商品',
        icon:'fa-cubes',
        num: 0,
        up:0,
        down:2,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '商品总数',
        cardContent: [
          {
            title: '今日售出',
          },
          {
            title: '缺货'
          },
          {
            title: '昨日售出'
          }
        ]
      },
      { // 订单
        cardTitle: '订单',
        icon:'fa-file-text-o',
        num: 77,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '今日总数',
        cardContent: [
          {
            title: '客单价',
          },
          {
            title: 'UV转化率'
          },
          {
            title: '昨日订单'
          }
        ]
      }
    ]
  };
  export default {
    components: {
      'card-block': CardBlock
    },
    name: "over-view",
    data() {
      return {
        myData
      }
    },
    methods: {
      async getInfo() {
        var that = this
        myData.loading = true
        var res = await tool.post('data/ajax_overView')
        if (res[0] == 0) return false
        for (var i in myData.info) myData.info[i] = res[1][i]
        that.drawChart_1()
        that.drawChart_2()
        myData.loading = false
      },
      drawChart_1() {
        var data = myData.info.pv_lastSevenDays
        var data_2 = myData.info.uv_lastSevenDays
        var option = {
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }],
          title: [{
            left: 'center',
            text: '近七天访问趋势与留存'
          }],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            data: data.map(function (item) {
              return item.label
            })
          }],
          yAxis: [{
            splitLine: {
              show: false
            }
          }],
          series: [{
            type: 'line',
            showSymbol: false,
            data: data.map(function (item) {
              return item.value
            })
          },
            {
              type: 'line',
              showSymbol: false,
              data: data_2.map(function (item) {
                return item.value
              })
            }]
        }
        // 使用刚指定的配置项和数据显示图表。
        echarts.init(document.getElementById('chart-1')).setOption(option)
      },
      drawChart_2() {
        var data = myData.info.money_lastSevenDays
        var option = {
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }],
          title: [{
            left: 'center',
            text: '近七天营业额柱状图'
          }],
          legend: {
            data: ['销量']
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            data: data.map(function (item) {
              return item.label
            })
          }],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [{
            type: 'bar',
            showSymbol: false,
            data: data.map(function (item) {
              return item.value
            })
          }]
        }
        // 使用刚指定的配置项和数据显示图表
        echarts.init(document.getElementById('chart-2')).setOption(option)
      }
    },
    created() {
      //this.prepare()
    },

  }
</script>


<style scoped>

  .block-news {
    position: relative;
    border: 1px solid #dbe1e8;
  }

  .block-news-title {
    padding: 10px 20px;
    border-bottom: 1px solid #dbe1e8;
    background-color: #f2f6fc;
  }

  .news-list {
    list-style: none;
    margin: 0;
    padding: 20px 0 0 0;
  }

  .news-list:after {
    position: absolute;
    display: block;
    width: 2px;
    background-color: #f0f0f0;
    top: 0;
    left: 235px;
    bottom: 0;
    content: "";
    z-index: 1;
  }

  .news-list li {
    position: relative;
    padding: 10px 0;
    margin-bottom: 20px;
  }

  .news-list li:last-child {
    margin: 0;
    padding-bottom: 50px;
  }

  .timeline {
    position: relative;
    /* height: 100%;
     border-left: 2px solid #ededed;*/
  }

  .news-time {
    width: 200px;
    float: left;
    text-align: right;
  }

  .news-icon {
    position: absolute;
    left: 220px;
    top: 5px;
    width: 30px;
    height: 30px;
    font-size: 16px;
    background-color: #409EFF;
    color: #FFFFFF;
    border-radius: 22px;
    text-align: center;
    line-height: 28px;
    z-index: 2;
  }

  .news-icon i {
    margin-left: 5px;
  }

  .news-content {
    margin-left: 280px;
    letter-spacing: 1px;
  }

  .news-detail {
    width: 90%;
    margin-top: 10px;
    /*font-family: "Didot LT W02 Roman", Didot, "Hoefler Text", Garamond, "Times New Roman", serif;*/
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #000000;
  }

  .card-icon {
    display: flex;
    align-items: center;
    font-size: 22px;
  }

  .card-icon p {
    display: inline-block;
    color: #818a91;
    font-size: 18px;
    letter-spacing: 1px;
    margin: 0 0 0 8px;
  }

</style>
