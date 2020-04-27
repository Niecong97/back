<template>
  <div id="flush" class="data_flush">
    <el-container>
      <el-main v-loading="false">
        <el-form class="form" ref="myData.ruleForm" :model="myData.formData" :rules="myData.formRule">
          <!-- <el-form-item label='起讫日期' prop='date'>
             <el-date-picker  type="datetimerange" start-placeholder="开始日期"
                             end-placeholder="结束日期">
             </el-date-picker>
           </el-form-item>
           <el-form-item>
             <el-button type="primary" >查询
             </el-button>
             <el-tooltip class="btn-tip"
                         content="由于微信限制，本平台无法统计今天的流量信息，只能计算截止到昨天、近一周、近一月三种粒度的时间，无法查询指定区间内的流量信息，此接口会在将来得到升级"
                         placement="top">
               <i class="fa fa-question-circle"></i>
             </el-tooltip>
           </el-form-item>-->
          <h2>流量分析</h2>
          <div class="flush-top">
            <div class="select-time">
              <el-radio-group v-model="myData.formData.radio">
                <el-radio-button label="昨天"></el-radio-button>
                <el-radio-button label="近7天"></el-radio-button>
                <el-radio-button label="近30天"></el-radio-button>
              </el-radio-group>
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
        </el-form>
        <el-row class="block-info-1 card-flush" :gutter="10">
          <h3>数据概况</h3>
          <el-col :span="6" v-for="card in myData.cardBlockTemp">
            <card-block :cardTemp="card"></card-block>
          </el-col>

        </el-row>

        <el-row class="info-block-3 card-flush" :gutter="20">
          <h3>用户访问分布数据</h3>
          <el-col :span="12">
            <el-card class="box-card visit-time" shadow="hover">
              <div slot="header" class="clearfix">
                <!--<span>访问时长分布</span>-->
                <el-radio-group v-model="myData.formData.visit_Time" size="small" @change="handleChangeVisitTime">
                  <el-radio-button label="访问时长分布"></el-radio-button>
                  <el-radio-button label="访问深度分布"></el-radio-button>
                </el-radio-group>
              </div>
              <div id="chart-3" v-if="myData.formData.visit_Time==='访问时长分布'"></div>
              <div id="chart-4" v-if="myData.formData.visit_Time==='访问深度分布'"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card visit-source" shadow="hover">
              <div slot="header" class="clearfix">
                <span>访问来源分布</span>
              </div>
              <el-row class="visit-source-item">
                <el-col :span="6" class="progress-visit">长按小程序菜单圆点</el-col>
                <el-col :span="16">
                  <el-progress :percentage="10" class="visited-count" color="#8e71c7"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col :span="6" class="progress-visit">二维码</el-col>
                <el-col :span="16">
                  <el-progress :percentage="15" class="visited-count" color="#67C23A"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col :span="6" class="progress-visit">相册选取二维码</el-col>
                <el-col :span="16">
                  <el-progress :percentage="30" class="visited-count" color="#67C23A"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col :span="6" class="progress-visit">搜索</el-col>
                <el-col :span="16">
                  <el-progress :percentage="20" class="visited-count" color="#E6A23C"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col :span="6" class="progress-visit">顶部聊天</el-col>
                <el-col :span="16">
                  <el-progress :percentage="60" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col :span="6" class="progress-visit">小程序主页</el-col>
                <el-col :span="16">
                  <el-progress :percentage="40" class="visited-count" color="#909399"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col :span="6" class="progress-visit">公众号文章</el-col>
                <el-col :span="16">
                  <el-progress :percentage="30" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col :span="6" class="progress-visit">公众号主页</el-col>
                <el-col :span="16">
                  <el-progress :percentage="20" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col class="progress-visit">小程序内部卡券</el-col>
                <el-col :span="16">
                  <el-progress :percentage="20" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col class="progress-visit">app分享</el-col>
                <el-col :span="16">
                  <el-progress :percentage="0" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col class="progress-visit">小程序客服消息</el-col>
                <el-col :span="16">
                  <el-progress :percentage="0" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col class="progress-visit">搜索框快捷入口</el-col>
                <el-col :span="16">
                  <el-progress :percentage="0" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col class="progress-visit">聊天顶部</el-col>
                <el-col :span="16">
                  <el-progress :percentage="0" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
              <el-row class="visit-source-item">
                <el-col class="progress-visit">其它</el-col>
                <el-col :span="16">
                  <el-progress :percentage="0" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>

        <el-row class="info-block-6 card-flush" :gutter="20">
          <h3>用户访问页面数据</h3>
          <el-col :span="24">
            <el-radio-group v-model="myData.formData.visit" @change="handleChangeVisit">
              <el-radio-button label="访问次数"></el-radio-button>
              <el-radio-button label="访问人数"></el-radio-button>
              <el-radio-button label="均次停留时长"></el-radio-button>
              <el-radio-button label="进入页次数"></el-radio-button>
              <el-radio-button label="退出页次数"></el-radio-button>
              <el-radio-button label="转发次数"></el-radio-button>
              <el-radio-button label="转发人数"></el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="24">
            <div id="chart-8" v-if="myData.formData.visit==='访问次数'"></div>
          </el-col>
          <el-col :span="24">
            <div id="chart-9" v-if="myData.formData.visit==='访问人数'"></div>
          </el-col>
          <el-col :span="24">
            <div id="chart-10" v-if="myData.formData.visit==='均次停留时长'"></div>
          </el-col>
          <el-col :span="24">
            <div id="chart-11" v-if="myData.formData.visit==='进入页次数'"></div>
          </el-col>
          <el-col :span="24">
            <div id="chart-12" v-if="myData.formData.visit==='退出页次数'"></div>
          </el-col>
          <el-col :span="24">
            <div id="chart-13" v-if="myData.formData.visit==='转发次数'"></div>
          </el-col>
          <el-col :span="24">
            <div id="chart-14" v-if="myData.formData.visit==='转发人数'"></div>
          </el-col>
        </el-row>
        <div style="height: 130px;"></div>
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
    //【prepare】
    mainOperate: null, //页面主操作
    // 【form】
    formData: {
      date: null, //起讫日期
      radio: '昨天',
      visit: '访问次数',
      visit_Time: '访问时长分布',
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
      retain_info: {},
      visit_distribution: {},
      visit_page: {},
      visit_trend: {}
    },
    cardBlockTemp: [
      { // 累计用户
        cardTitle: '累计用户',
        icon: 'fa-file-text-o',
        num: 111,
        up: 12,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '',
        cardContent: [
          {
            title: '转发次数',
          },
          {
            title: '转发人数'
          }
        ]
      },
      { // 用户访问小程序留存
        cardTitle: '用户访问小程序留存',
        icon: 'fa-file-text-o',
        num: 78,
        up: 12,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '',
        cardContent: [
          {
            title: '新增用户留存',
          },
          {
            title: '活跃用户留存'
          }
        ]
      },
      { // 用户访问次数
        cardTitle: '用户访问次数',
        icon: 'fa-file-text-o',
        num: 111,
        up: 12,
        down: 0,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '',
        cardContent: [
          {
            title: '访问人数',
          },
          {
            title: '人均停留时长'
          },
        ]
      },
      { // 下单顾客数
        cardTitle: '下单顾客数',
        icon: 'fa-file-text-o',
        num: 77,
        up: 0,
        down: 22,
        tooltipContent: '即为今日、昨日、本周创建订单的总营业额，包含未确认、已确认、配送中、已完成、退款中，但不包含退款中、已取消的订单',
        mainTitle: '',
        cardContent: [
          {
            title: '下单转化率',
          },
          {
            title: '比前日'
          },
        ]
      }
    ],
    echartsOption: {
      visualMap: [
        {
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: 100,
        }
      ],
      title: [{
        left: 'center',
        text: '',
      }],
      xAxis: {
        type: 'category',
        data: ['长按小程序菜单圆点', '二维码', '搜索', '顶部聊天', '小程序主页', '公众号文章', '公众号主页', '小程序任务栏', '小程序客服消息', '其它小程序',]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [220, 72, 181, 94, 10, 300, 110, 112, 113, 114],
        type: 'bar'
      }]
    },
    visit_time_option: {
      title: {
        'text': '访问时长分布',
        x: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }]
    },
    visit_deep_option: {
      title: {
        'text': '访问深度分布',
        x: 'center'
      },
      tooltip: {
        axisPointer: {}
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [1201, 2001, 1510, 80, 70, 110, 130],
        type: 'bar'
      }]
    },
    option_1: {
      title: {
        text: '用户性别',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['男', '女', '未知']
      },
      series: [
        {
          name: '性别',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value: 335, name: '男'},
            {value: 310, name: '女'},
            {value: 34, name: '未知'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    },
    option_2: {
      title: {
        text: '终端类型',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['android', 'iPhone', '其他'],
      },
      series: [
        {
          name: '终端类型',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value: 335, name: 'android'},
            {value: 310, name: 'iPhone'},
            {value: 34, name: '其他'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    },
    option_3: {
      title: {
        text: '年龄',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['17岁以下', '18-24岁', '24-30岁', '30岁以上'],
      },
      series: [
        {
          name: '年龄',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value: 335, name: '17岁以下'},
            {value: 310, name: '18-24岁'},
            {value: 210, name: '30岁以上'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    },
    option_page_visit_pv: {
      title: {
        //text: '访问次数',
        x: 'center'
      },
      tooltip: {
        axisPointer: {}
      },
      xAxis: {
        type: 'category',
        data: ['首页', '页面一', '页面二', '页面三', '页面四', '页面五', '页面六']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [213429, 42195, 65011, 29953, 8928, 32145, 53132],
        type: 'bar',
        barWidth: '60%',
        name: '访问次数',
      }]
    },
    option_page_visit_uv: {
      title: {
        //text: '访问人数',
        x: 'center'
      },
      tooltip: {
        axisPointer: {}
      },
      xAxis: {
        type: 'category',
        data: ['首页', '页面一', '页面二', '页面三', '页面四', '页面五', '页面六']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [55423, 42195, 24716, 9695, 4017, 6232, 42312],
        type: 'bar',
        barWidth: '60%',
        name: '访问人数',
      }]
    },
    option_page_staytime_pv: {
      title: {
        //text: '均次停留时长',
        x: 'center'
      },
      tooltip: {
        axisPointer: {}
      },
      xAxis: {
        type: 'category',
        data: ['首页', '页面一', '页面二', '页面三', '页面四', '页面五', '页面六']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [8.1, 35.5, 6.9, 7.6, 9.2, 31.1, 17.7],
        type: 'bar',
        barWidth: '60%',
        name: '均次停留时长',
      }]
    },
    option_entrypage_pv: {
      title: {
        //text: '进入页次数',
        x: 'center'
      },
      tooltip: {
        axisPointer: {}
      },
      xAxis: {
        type: 'category',
        data: ['首页', '页面一', '页面二', '页面三', '页面四', '页面五', '页面六']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [117922, 21101, 1811, 1386, 748, 71701, 4212],
        type: 'bar',
        barWidth: '60%',
        name: '进入页次数',
      }]
    },
    option_exitpage_pv: {
      title: {
        //text: '退出页次数',
        x: 'center'
      },
      tooltip: {
        axisPointer: {}
      },
      xAxis: {
        type: 'category',
        data: ['首页', '页面一', '页面二', '页面三', '页面四', '页面五', '页面六']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [61304, 31101, 7811, 3386, 948, 41701, 7212],
        type: 'bar',
        barWidth: '60%',
        name: '退出页次数',
      }]
    },
    option_page_share_pv: {
      title: {
        //text: '转发次数',
        x: 'center'
      },
      tooltip: {
        axisPointer: {}
      },
      xAxis: {
        type: 'category',
        data: ['首页', '页面一', '页面二', '页面三', '页面四', '页面五', '页面六']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [180, 47, 0, 0, 0, 78, 43],
        type: 'bar',
        barWidth: '60%',
        name: '转发次数',
      }]
    },
    option_page_share_uv: {
      title: {
        //text: '转发人数',
        x: 'center'
      },
      tooltip: {
        axisPointer: {}
      },
      xAxis: {
        type: 'category',
        data: ['首页', '页面一', '页面二', '页面三', '页面四', '页面五', '页面六']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [166, 42, 0, 0, 0, 71, 121],
        type: 'bar',
        barWidth: '60%',
        name: '转发人数',
      }]
    },
    mapData: [
      {name: '北京', value: '100'}, {name: '天津', value: '100'},
      {name: '上海', value: '100'}, {name: '重庆', value: '100'},
      {name: '河北', value: '100'}, {name: '河南', value: '100'},
      {name: '云南', value: '100'}, {name: '辽宁', value: '100'},
      {name: '黑龙江', value: '100'}, {name: '湖南', value: '100'},
      {name: '安徽', value: '100'}, {name: '山东', value: '100'},
      {name: '新疆', value: '100'}, {name: '江苏', value: '100'},
      {name: '浙江', value: '100'}, {name: '江西', value: '100'},
      {name: '湖北', value: '100'}, {name: '广西', value: '100'},
      {name: '甘肃', value: '100'}, {name: '山西', value: '100'},
      {name: '内蒙古', value: '100'}, {name: '陕西', value: '100'},
      {name: '吉林', value: '100'}, {name: '福建', value: '100'},
      {name: '贵州', value: '100'}, {name: '广东', value: '100'},
      {name: '青海', value: '100'}, {name: '西藏', value: '100'},
      {name: '四川', value: '100'}, {name: '宁夏', value: '100'},
      {name: '海南', value: '100'}, {name: '台湾', value: '100'},
      {name: '香港', value: '100'}, {name: '澳门', value: '100'}
    ],
    option_map: {
      backgroundColor: "#FFFFFF",
      title: {
        text: "全国地图数据",
        x: 'center',
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: true,
        x: 'left',
        y: 'center',
        splitList: [
          {start: 500, end: 600}, {start: 400, end: 500},
          {start: 300, end: 400}, {start: 200, end: 300},
          {start: 100, end: 200}, {start: 0, end: 100},
        ],
        color: ['#5475f5', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea']
      },
      //配置属性
      series: [{
        name: '数据',
        type: 'map',
        mapType: 'china',
        roam: true,
        label: {
          normal: {
            show: true  //省份名称
          },
          emphasis: {
            show: false
          }
        },
        data: [
          {name: '北京', value: '100'}, {name: '天津', value: '100'},
          {name: '上海', value: '100'}, {name: '重庆', value: '100'},
          {name: '河北', value: '100'}, {name: '河南', value: '100'},
          {name: '云南', value: '100'}, {name: '辽宁', value: '100'},
          {name: '黑龙江', value: '100'}, {name: '湖南', value: '100'},
          {name: '安徽', value: '100'}, {name: '山东', value: '100'},
          {name: '新疆', value: '100'}, {name: '江苏', value: '100'},
          {name: '浙江', value: '100'}, {name: '江西', value: '100'},
          {name: '湖北', value: '100'}, {name: '广西', value: '100'},
          {name: '甘肃', value: '100'}, {name: '山西', value: '100'},
          {name: '内蒙古', value: '100'}, {name: '陕西', value: '100'},
          {name: '吉林', value: '100'}, {name: '福建', value: '100'},
          {name: '贵州', value: '100'}, {name: '广东', value: '100'},
          {name: '青海', value: '100'}, {name: '西藏', value: '100'},
          {name: '四川', value: '100'}, {name: '宁夏', value: '100'},
          {name: '海南', value: '100'}, {name: '台湾', value: '100'},
          {name: '香港', value: '100'}, {name: '澳门', value: '100'}
        ],
      }]
    }
  };

  export default {
    components: {
      'card-block': CardBlock,
    },
    mixins: [mixinAll],
    name: "data_flush",
    data() {
      return {
        myData
      }
    },
    methods: {

      async submitForm(formName) {

      },

      drawMyCharts: function () {

        var myChart3 = echarts.init(document.getElementById('chart-3'))
        myChart3.setOption(myData.visit_time_option)

        var myChart_page_pv = echarts.init(document.getElementById('chart-8'))
        myChart_page_pv.setOption(myData.option_page_visit_pv)
      },

      handleChangeVisit: function (value) {
        if (value === '访问次数') {
          var myChart8 = echarts.init(document.getElementById('chart-8'))
          myChart8.setOption(myData.option_page_visit_pv)
        } else if (value === '访问人数') {
          var myChart_page_uv = echarts.init(document.getElementById('chart-9'))
          myChart_page_uv.setOption(myData.option_page_visit_uv)
        } else if (value === '均次停留时长') {
          var myChart_page_staytime = echarts.init(document.getElementById('chart-10'))
          myChart_page_staytime.setOption(myData.option_page_staytime_pv)
        } else if (value === '进入页次数') {
          var myChart_entrypage_pv = echarts.init(document.getElementById('chart-11'))
          myChart_entrypage_pv.setOption(myData.option_entrypage_pv)
        } else if (value === '退出页次数') {
          var myChart_exitpage_pv = echarts.init(document.getElementById('chart-12'))
          myChart_exitpage_pv.setOption(myData.option_exitpage_pv)
        } else if (value === '转发次数') {
          var myChart_page_share_pv = echarts.init(document.getElementById('chart-13'))
          myChart_page_share_pv.setOption(myData.option_page_share_pv)
        } else if (value === '转发人数') {
          var myChart_page_share_uv = echarts.init(document.getElementById('chart-14'))
          myChart_page_share_uv.setOption(myData.option_page_share_uv)
        }
      },


      /*var myChart3 = echarts.init(document.getElementById('chart-3'))
      myChart3.setOption(myData.visit_time_option)

    var myChart4 = echarts.init(document.getElementById('chart-4'))
    myChart4.setOption(myData.visit_deep_option)*/

      handleChangeVisitTime: function (value) {
        console.log(value)
        if (value === '访问时长分布') {
          var myChart_visit_time_option = echarts.init(document.getElementById('chart-3'))
          myChart_visit_time_option.setOption(myData.visit_time_option)
        } else if (value === '访问深度分布') {
          var myChart_visit_deep_option = echarts.init(document.getElementById('chart-4'))
          myChart_visit_deep_option.setOption(myData.visit_deep_option)
        }
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

<style scoped>

  .block-info-1 {
    /*width: 90%;*/
    margin: 0 auto !important;
  }

  .flush-top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 30px;
  }

  .flush-top .select-time {
    margin: 0 30px;
  }

  .time-list li {
    display: table-cell;
    padding: 5px 12px;
    cursor: pointer;
    font-size: 14px;
    color: #409EFF;
  }

  .info-block-3 {
    /*width: 90%;*/
    margin: 20px auto 0 !important;
  }

  .progress-visit {
    width: 150px;
    text-align: right;
    margin-right: 10px;
    font-size: 14px;
  }

  h2 {
    float: left;
    line-height: 40px;
    font-size: 22px;
  }

  h3 {
    margin-left: 10px;
    margin-bottom: 20px;
  }

  .visit-source {
    padding-bottom: 10px;
  }

  .visit-source-item {
    margin-bottom: 10px;
  }

  /*.visit-source-button {
    float: right;
    padding: 3px 0;
  }*/

  .info-block-6 {
    position: relative;
    /*width: 90%;*/
    margin: 0 auto 50px !important;
  }

  #chart-8, #chart-9, #chart-10, #chart-11, #chart-12, #chart-13, #chart-14 {
    height: 500px;
  }
</style>


