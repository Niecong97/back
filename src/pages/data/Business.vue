<template>
  <div id="flush" class="data_flush">
    <el-container>
      <el-header class="page-header">
        <h1><i class="fa fa-signal"></i>营业总额</h1>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <i class="fa fa-home"></i>首页
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <i class="fa fa-dashboard"></i>
            数据
          </el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-signal"></i>营业总额</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main v-loading="false">
          <el-form class="form bar-form" ref="myData.ruleForm" :model="myData.formData" :rules="myData.formRule">
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
          </el-form>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import tool from '../../assets/js_/tool'
  import {mixinAll} from "../../mixins/mixinAll";

  var myData = {
    //【prepare】
    mainOperate: null, //页面主操作
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
      retain_info: {},
      visit_distribution: {},
      visit_page: {},
      visit_trend: {}
    }
  };

  export default {
    mixins:[mixinAll],
    name: "data_flush",
    data() {
      return {
        myData
      }
    },
    methods: {
      async getInfo() {
        var now = new Date()
        now.setTime(now.getTime() - 24 * 60 * 60 * 1000)
        var start = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
        var end = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + ' 23:59:59'
        myData.formData['date'] = [start, end]
        this.submitForm('ruleForm')
      },
      //【提交表单】
      async submitForm(formName) {
        var that = this
        myData.loading = true
        // 处理post数据
        var postData = tool.empty(myData.formData.date) ? null : {
          start_date: tool.dateObj2String(myData.formData.date[0], 'yyyy-MM-dd hh:mm:ss'),
          end_date: tool.dateObj2String(myData.formData.date[1], 'yyyy-MM-dd hh:mm:ss'),
        }
        var res = await tool.submitForm(that, 'data/ajax_flush', 'r', formName, postData)
        myData.loading = false
        if (res[0] == 0) return false
        console.log(res)
        console.log(myData.info)
        for (var i in myData.info) myData.info[i] = res[1][i]
        that.drawChart_1() //访问来源分布
        that.drawChart_2()
        that.drawChart_3()
      },
      //访问来源分布
      drawChart_1() {
        var temp = myData.info.visit_distribution.access_source_session_cnt
        var data = []
        var labelArr = ['小程序历史列表', '搜索', '会话', '二维码', '公众号主页', '聊天顶部', '系统桌面', '小程序主页', '附近的小程序', '其他', '模板消息', '客服消息', '公众号菜单', 'APP分享', '支付完成页', '长按识别二维码', '相册选取二维码', '公众号文章', '钱包', '卡包', '小程序内卡券', '其他小程序', '其他小程序返回', '卡券适用门店列表', '搜索框快捷入口', '小程序客服消息', '公众号下发', '会话左下角菜单', '小程序任务栏', '长按小程序菜单圆点', '连wifi成功页', '城市服务', '微信广告', '其他移动应用'];
        for (var i in temp) data.push({label: labelArr[i], value: temp[i]})
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
            text: '访问分布'
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
              type: 'value',
              axisLabel: {
                margin: 200,
                width: 10,
                interval: 0
              },
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
        console.log('chart1', option)
        // 使用刚指定的配置项和数据显示图表
        echarts.init(document.getElementById('chart-1')).setOption(option)
      },
      drawChart_2() {
        var temp = myData.info.visit_distribution.access_staytime_info
        var data = []
        var labelArr = ['', '0-2s', '3-5s', '6-10s', '11-20s', '20-30s', '30-50', '50-100s', '100s']
        for (var i in temp) data.push({label: labelArr[i], value: temp[i]})
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
            text: '访问时长'
          }],
          legend: {
            data: ['秒']
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
              type: 'value',
              axisLabel: {
                margin: 2,
                interval: 0
              },
            }
          ],
          grid: {
            left: 0
          },
          series: [{
            type: 'bar',
            showSymbol: false,
            data: data.map(function (item) {
              return item.value
            })
          }]
        }
        console.log('chart2', option)
        // 使用刚指定的配置项和数据显示图表
        echarts.init(document.getElementById('chart-2')).setOption(option)
      },
      drawChart_3() {
        var temp = myData.info.visit_distribution.access_depth_info
        var data = []
        var labelArr = ['', '1页', '2页', '3页', '4页', '5页', '6-10页', '>10页']
        for (var i in temp) data.push({label: labelArr[i], value: temp[i]})
        var option = {
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 100
          }],
          title: [{
            left: 'center',
            text: '访问时长'
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
              type: 'value',
              axisLabel: {
                margin: 2
              },
            }
          ],
          grid: {
            left: 0
          },
          series: [{
            type: 'bar',
            showSymbol: false,
            data: data.map(function (item) {
              return item.value
            })
          }]
        }
        console.log('chart3', option)
        // 使用刚指定的配置项和数据显示图表
        echarts.init(document.getElementById('chart-3')).setOption(option)
      },
    },
    created() {
      //this.prepare()
    }
  }
</script>

<style scoped>
  @import "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css";
  @import "../../assets/css/style.css";
</style>
