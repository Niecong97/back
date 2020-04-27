<template>
  <div id="userPortrait" class="data_userPortrait">
    <el-container>
      <el-main v-loading="false">
        <el-form class="form " ref="myData.ruleForm" :model="myData.formData" :rules="myData.formRule">
          <h2 style="float:left;line-height:40px;font-size: 22px;">用户画像分布数据</h2>
          <div class="flush-top" style="margin-bottom: 50px;">
            <div class="select-time" style="margin:0 30px;">
              <el-radio-group v-model="myData.formData.user">
                <el-radio-button label="新增用户"></el-radio-button>
                <el-radio-button label="活跃用户"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="select-time" style="margin:0 30px;">
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

        <el-row class="info-block-4" :gutter="20" style="width: 90%;margin:0 auto 50px">
          <el-col :span="12">
            <div id="chart-5" style="width: 600px;height: 400px;padding-bottom: 30px"></div>
          </el-col>
          <el-col :span="12">
            <div id="chart-7" style="width: 600px;height: 400px;padding-bottom: 30px"></div>
          </el-col>


          <el-col :span="24" style="margin-bottom: 50px">
            <div id="chart-map" style="height: 500px;padding-bottom: 30px"></div>
          </el-col>


          <el-col :span="12">
            <div id="chart-6" style="width: 600px;height: 400px;padding-bottom: 30px"></div>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>热门机型</span>
                <el-button style="float: right; padding: 3px 0" type="text">刷新数据</el-button>
              </div>
              <el-row style="margin-bottom: 10px;">
                <el-col :span="6" class="progress-visit">iPhone XR</el-col>
                <el-col :span="16">
                  <el-progress :percentage="10" class="visited-count" color="#8e71c7"></el-progress>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 10px;">
                <el-col :span="6" class="progress-visit">iPhone 8</el-col>
                <el-col :span="16">
                  <el-progress :percentage="15" class="visited-count" color="#67C23A"></el-progress>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 10px;">
                <el-col :span="6" class="progress-visit">OPPO R9</el-col>
                <el-col :span="16">
                  <el-progress :percentage="30" class="visited-count" color="#67C23A"></el-progress>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 10px;">
                <el-col :span="6" class="progress-visit">小米8</el-col>
                <el-col :span="16">
                  <el-progress :percentage="20" class="visited-count" color="#E6A23C"></el-progress>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 10px;">
                <el-col :span="6" class="progress-visit">三星S9</el-col>
                <el-col :span="16">
                  <el-progress :percentage="20" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 10px;">
                <el-col :span="6" class="progress-visit">魅族 16Plus</el-col>
                <el-col :span="16">
                  <el-progress :percentage="30" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 10px;">
                <el-col :span="6" class="progress-visit">华为 P20</el-col>
                <el-col :span="16">
                  <el-progress :percentage="20" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 10px;">
                <el-col class="progress-visit">其它</el-col>
                <el-col :span="16">
                  <el-progress :percentage="20" class="visited-count" color="#F56C6C"></el-progress>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <!--
                      <el-col :span="24">
                        <div id="chart-map" style="height: 500px;padding-bottom: 30px"></div>
                      </el-col>-->
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
  //import china from '../../assets/js/china'

  var myData = {
    //【prepare】
    mainOperate: null, //页面主操作
    // 【form】
    formData: {
      date: null, //起讫日期
      radio: '昨天',
      visit: '访问次数',
      user: '新增用户',
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
        text: "用户所在地区数据",
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
          {start: 600, end: 800}, {start: 800,},
          {start: 500, end: 600}, {start: 400, end: 500},
          {start: 300, end: 400}, {start: 200, end: 300},
          {start: 100, end: 200}, {start: 0, end: 100},
        ],
        color: ['#f53416', '#9feaa5', '#85daef', '#74e2ca', '#e6ac53', '#9fb5ea','#b0f5db','#ff733c']
      },
      //配置属性
      series: [{
        name: '用户',
        type: 'map',
        mapType: 'china',
        roam: false,
        zoom: 1.2,
        label: {
          normal: {
            show: true  //省份名称
          },
        },
        data: [
          {name: '北京', value: '100'}, {name: '天津', value: '120'},
          {name: '上海', value: '200'}, {name: '重庆', value: '110'},
          {name: '河北', value: '199'}, {name: '河南', value: '120'},
          {name: '云南', value: '600'}, {name: '辽宁', value: '350'},
          {name: '黑龙江', value: '400'}, {name: '湖南', value: '500'},
          {name: '安徽', value: '200'}, {name: '山东', value: '100'},
          {name: '新疆', value: '1000'}, {name: '江苏', value: '1100'},
          {name: '浙江', value: '300'}, {name: '江西', value: '200'},
          {name: '湖北', value: '700'}, {name: '广西', value: '400'},
          {name: '甘肃', value: '900'}, {name: '山西', value: '600'},
          {name: '内蒙古', value: '200'}, {name: '陕西', value: '200'},
          {name: '吉林', value: '100'}, {name: '福建', value: '300'},
          {name: '贵州', value: '399'}, {name: '广东', value: '700'},
          {name: '青海', value: '300'}, {name: '西藏', value: '50'},
          {name: '四川', value: '200'}, {name: '宁夏', value: '320'},
          {name: '海南', value: '500'}, {name: '台湾', value: '500'},
          {name: '香港', value: '200'}, {name: '澳门', value: '100'}
        ],
      }]
    }
  };

  export default {
    mixins: [mixinAll],
    name: "data_userPortrait",
    data() {
      return {
        myData
      }
    },
    methods: {

      async submitForm(formName) {

      },

      drawMyCharts: function () {
        var myChart5 = echarts.init(document.getElementById('chart-5'))
        myChart5.setOption(myData.option_1);

        var myChart6 = echarts.init(document.getElementById('chart-6'))
        myChart6.setOption(myData.option_2)

        var myChart7 = echarts.init(document.getElementById('chart-7'))
        myChart7.setOption(myData.option_3)

        var myChart_map = echarts.init(document.getElementById('chart-map'))
        myChart_map.setOption(myData.option_map)
      },

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
    width: 90%;
    margin: 0 auto !important;
  }

  .flush-top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
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

  .info-block-3 .visited-count {

  }

  .progress-visit {
    width: 150px;
    text-align: right;
    margin-right: 10px;
    font-size: 14px;
  }
</style>
