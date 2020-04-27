<template>
  <div id="card_all">
    <el-container>
      <el-header class="page-header">
        <!--<h1><i class="fa fa-vcard"></i>全部卡券</h1>-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!--<el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>-->
          <el-breadcrumb-item><i class="fa fa-vcard"></i>卡券</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-table primary-color"></i><span class="primary-color">全部卡券</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>

          <el-collapse v-model="myData.activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <h3 style="font-size: 18px">会员卡
                  <el-tooltip class="btn-tip" content="商家可通过链接或二维码的方式进行发卡，不需要任何消费门槛，用户领取后即可享受会员权益"
                              placement="right">
                    <i class="fa fa-question-circle"></i>
                  </el-tooltip>
                </h3>
              </template>
              <!--会员卡内容-->
              <div class="container-card">
                <ul class="content-card">
                  <el-row :gutter="10">
                    <el-col :span="6" class="col-max-width" v-for="item in myData.card_data">
                      <li class="card-list-item">
                        <div :class="item.status==0? 'card-item active' : 'card-item'">  <!--卡券不可用时更改背景色-->
                          <div class="card-header">
                            <div class="member-card-img">
                              <img src="../../assets/img/card_logo.png" alt="" width="40">
                            </div>
                            <h3 class="card-name">{{item.name}}</h3>
                            <h4><i class="fa fa-vcard"></i>{{item.type}}</h4>
                          </div>
                          <div class="card-detail equity">
                            <el-popover
                              placement="bottom-start"
                              width="250"
                              trigger="click">
                              <el-row>
                                <el-col :span="24" class="col-equity-item">
                                  <div class="equitey-title">
                                    <i class="fa fa-shopping-cart"></i>{{item.equity_express}}
                                  </div>
                                  <div class="equitey-content">
                                  </div>
                                </el-col>
                                <el-col :span="24" class="col-equity-item">
                                  <div class="equitey-title">
                                    <i class="fa fa-credit-card"></i>{{item.equity_discount}}
                                  </div>
                                  <div class="equitey-content">
                                  </div>
                                </el-col>
                                <el-col :span="24" class="col-equity-item">
                                  <div class="equitey-title">
                                    <i class="fa fa-info-circle"></i>使用说明:
                                  </div>
                                  <div class="equitey-content">
                                    {{item.equity_state}}
                                  </div>
                                </el-col>
                                <el-col :span="24" class="col-equity-item">
                                  <div class="equitey-title">
                                    <i class="fa fa-tag"></i>使用提醒:
                                  </div>
                                  <div class="equitey-content">
                                    {{item.equity_remind}}
                                  </div>
                                </el-col>
                                <el-col :span="24" class="col-equity-item">
                                  <div class="equitey-title">
                                    <i class="fa fa-clock-o"></i>结束日期：
                                  </div>
                                  <div class="equitey-content">
                                    {{item.end_time}}
                                  </div>
                                </el-col>
                              </el-row>
                              <el-button size="small" slot="reference" icon="el-icon-search">查看会员权益</el-button>
                            </el-popover>
                          </div>
                          <div class="card-bottom">
                            <div class="operate">
                              <span class="primary-color card-edit" @click="edit(1000)">编辑</span>
                              <span class="primary-color">禁用</span>
                            </div>
                            <div class="state">
                              <span>库存数量:{{item.inve}}</span>
                            </div>
                          </div>
                        </div>
                        <!--禁用状态-->
                        <i v-if="item.status===0" class="fa fa-ban icon-ban"></i>
                      </li>
                    </el-col>
                    <!--新增会员卡-->
                    <el-col :span="6" class="col-max-width">
                      <li class="card-list-item">
                        <router-link to="/card/create" class="create-card-link">
                          <h2>+</h2>
                          <h3 class="primary-color">新建会员卡</h3>
                        </router-link>
                      </li>
                    </el-col>
                  </el-row>
                </ul>
              </div>

            </el-collapse-item>
            <el-collapse-item name="2">
              <template slot="title">
                <h3 style="font-size: 18px">优惠券
                  <el-tooltip class="btn-tip" content="商家可通过链接或二维码的方式进行发卡，不需要任何消费门槛，用户领取后即可享受会员权益"
                              placement="right">
                    <i class="fa fa-question-circle"></i>
                  </el-tooltip>
                </h3>
              </template>
              <!--会员卡内容-->
              <div class="container-card">
                <ul class="content-card">
                  <el-row :gutter="10">
                    <el-col :span="6" class="col-max-width" v-for="item in myData.card_data">
                      <li class="card-list-item">
                        <div :class="item.status==0? 'card-item active' : 'card-item'">  <!--卡券不可用时更改背景色-->
                          <div class="card-header">
                            <div class="member-card-img">
                              <img src="../../assets/img/card_logo.png" alt="" width="40">
                            </div>
                            <h3 class="card-name">{{item.name}}</h3>
                            <h4><i class="fa fa-vcard"></i>{{item.type}}</h4>
                          </div>
                          <div class="card-detail equity">
                            <el-popover
                              placement="bottom-start"
                              width="250"
                              trigger="click">
                              <el-row>
                                <el-col :span="24" class="col-equity-item">
                                  <div class="equitey-title">
                                    <i class="fa fa-shopping-cart"></i>{{item.equity_express}}
                                  </div>
                                  <div class="equitey-content">
                                  </div>
                                </el-col>
                                <el-col :span="24" class="col-equity-item">
                                  <div class="equitey-title">
                                    <i class="fa fa-credit-card"></i>{{item.equity_discount}}
                                  </div>
                                  <div class="equitey-content">
                                  </div>
                                </el-col>
                                <el-col :span="24" class="col-equity-item">
                                  <div class="equitey-title">
                                    <i class="fa fa-info-circle"></i>使用说明:
                                  </div>
                                  <div class="equitey-content">
                                    {{item.equity_state}}
                                  </div>
                                </el-col>
                                <el-col :span="24" class="col-equity-item">
                                  <div class="equitey-title">
                                    <i class="fa fa-tag"></i>使用提醒:
                                  </div>
                                  <div class="equitey-content">
                                    {{item.equity_remind}}
                                  </div>
                                </el-col>
                                <el-col :span="24" class="col-equity-item">
                                  <div class="equitey-title">
                                    <i class="fa fa-clock-o"></i>结束日期：
                                  </div>
                                  <div class="equitey-content">
                                    {{item.end_time}}
                                  </div>
                                </el-col>
                              </el-row>
                              <el-button size="small" slot="reference" icon="el-icon-search">查看会员权益</el-button>
                            </el-popover>
                          </div>
                          <div class="card-bottom">
                            <div class="operate">
                              <span class="primary-color card-edit" @click="edit(1000)">编辑</span>
                              <span class="primary-color">禁用</span>
                            </div>
                            <div class="state">
                              <span>库存数量:{{item.inve}}</span>
                            </div>
                          </div>
                        </div>
                        <!--禁用状态-->
                        <i v-if="item.status===0" class="fa fa-ban icon-ban"></i>
                      </li>
                    </el-col>
                    <!--新增优惠券-->
                    <el-col :span="6" class="col-max-width">
                      <li class="card-list-item">
                        <a href="#" class="create-card-link">
                          <h2>+</h2>
                          <h3 class="primary-color">新建优惠券</h3>
                        </a>
                      </li>
                    </el-col>
                  </el-row>

                </ul>
              </div>


            </el-collapse-item>
          </el-collapse>

          <!--<el-row class="table-operate">
            <el-button type="" plain>重置列表</el-button>
            <el-button type="success" plain>批量启用</el-button>
            <el-button type="info" plain>批量禁用</el-button>
            <el-button type="danger" plain>批量删除</el-button>
          </el-row>-->
          <!-- <el-row class="table-page">
             <el-pagination
               :current-page="2" :page-sizes="[10, 20, 30, 40,50]"
               :page-size="15" :total="16"
               layout="total, sizes, prev, pager, next, jumper"></el-pagination>
           </el-row>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

  import tool from '../../assets/js_/tool'
  import {mixinAll} from "../../mixins/mixinAll";

  var myData = {
    /* 【common】 */
    module: 'card', //本模块名称
    own: 1, //是否只查询本商城
    /* 【prepare】 */
    loading: true, //页面读取态
    disabled: true, //页面禁用态
    requireList: {}, //请求的数据
    requireData: {}, //请求数据的容器
    mainOperate: 'getPage', //getOptions后的主操作
    /* 【getPage】 */
    pageInfo: {
      now: 1, //当前页数
      size: 10, //每页记录数目
      rowTotal: 0 //总记录数目（用于计算页数）
    },
    searchFieldList: [], //可供搜索的字段,label-value的键值对
    target: null, //选中的搜索字段
    keyword: null, //手动填入的搜索关键词
    selected: [], //已选中条目(存放主键)
    tableLoading: true, //表格读取态
    tableData: [], //表数据
    primary_key: 'id', //主键名称
    activeNames: ['1', '2'],

    card_data: [
      {
        name: '中品会会员卡',
        type: '会员卡',
        inve: 9999, //库存数量
        equity_express: '享受会员包邮',  //会员权益
        equity_discount: '会员9折优惠',
        equity_state: '中品会会员卡使用说明',
        equity_remind: '中品会会员卡使用提醒',
        end_time: '2018-08-21 15:32:36',
        status: 1, //可用
      },
      {
        name: '中品会会员卡',
        type: '会员卡',
        inve: 8888, //库存数量
        equity_express: '享受会员包邮',  //会员权益
        equity_discount: '会员9折优惠',
        equity_state: '中品会会员卡使用说明',
        equity_remind: '中品会会员卡使用提醒',
        end_time: '2018-08-21 15:32:36',
        status: 0, //禁用
      },
      {
        name: '中品会会员卡',
        type: '会员卡',
        inve: 77777, //库存数量
        equity_express: '享受会员包邮',  //会员权益
        equity_discount: '会员9折优惠',
        equity_state: '中品会会员卡使用说明',
        equity_remind: '中品会会员卡使用提醒',
        end_time: '2018-08-21 15:32:36',
        status: 1, //可用
      }
    ]
  };
  export default {
    mixins: [mixinAll],
    data() {
      return {
        myData
      }
    },
    methods: {
      async prepare() {
        var that = this
        myData.loading = true //开启加载态
        myData.disabled = true //开启禁用态
        var flag = that.$route.query.flag
        console.log(flag)
        if (!tool.empty(flag)) myData.condition = {type: 0}
        else myData.condition = {type: ['neq', 0]}
        // 获取到flag参数
        /*var a = tool.getUrlParam('flag')
        if (!tool.empty(a)) myData.condition = {type: 0}
        else myData.condition = {type: ['neq', 0]}*/
        //【1】检测登陆态
        var res = tool.checkLogin()
        if (res[0] == 0) return false
        //【2】获取options信息
        that.getOptions()
        await tool.sleep(500)
        myData.disabled = false
        myData.loading = false
        //write something
      },
      async getPage() {
        var that = this
        myData.tableLoading = true
        myData.disabled = true
        var postData = {
          flag: myData.own, //查询本商城
          pageNow: myData.pageInfo['now'], //当前页
          pageSize: myData.pageInfo['size'], //每页条目
          condition: myData.condition, //搜索条件
        }
        if (arguments[0] != undefined) {
          if (typeof(arguments[0]) == "number")
          //填写数字 跳页
            myData.keyword = null //重置
          else if (typeof(arguments[0]) == "object") {
            //鼠标点击事件 搜索
            if (myData.keyword == undefined) {
              that.$message.error('请填写搜索内容后，再点击搜索按钮')
              return false
            }
          }
        }
        //加入搜索条件
        //if (!tool.empty(tool.getUrlParam('flag'))) postData.condition.type = 0
        var flag = that.$route.query.flag
        console.log(flag + " getPage_flag")
        if (!tool.empty(flag)) postData.condition.type = 0

        tool.empty(myData.keyword) ? null : (postData.target = myData.target, postData.keyword = myData.keyword)
        var res = await tool.post(myData.module + '/ajax_getPage', postData)
        res[0] == 1 ? (myData.tableData = res[1]['rows'], myData.pageInfo['rowTotal'] = parseInt(res[1]['count'])) : myData.tableData = []
        await tool.sleep(500)
        myData.tableLoading = false
        myData.disabled = false
      },
      edit: function (id) {
        var url = '/card/detail?id=' + id
        this.$router.push(url)
      }
    }
  }
</script>
<style scoped>

  .card-header {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    height: 40px;
    color: #FFFFFF;
  }

  .card-header h3, h4 {
    font-weight: normal;
  }

  .card-list-item {
    position: relative;
    list-style: none;
    margin-bottom: 20px;
  }

  .card-list-item .operate span {
    display: inline-block;
    padding: 10px 8px;
    cursor: pointer;
  }

  .card-list-item .operate .card-edit {
    margin-left: 5px;
  }

  .card-list-item .state span {
    padding: 10px 8px;
  }

  .equitey-list-item i {
    font-size: 16px;
    color: #FFFFFF;
    cursor: pointer;
  }

  .equitey-title {
    float: left;
  }

  .equitey-content {
    margin-left: 65px;
  }

  .col-max-width {
    max-width: 315px;
  }

  .card-item {
    background-color: #cc463d;
    border-radius: 8px 8px 0 0;
  }

  .card-item.active {
    /* background: rgba(204,70,61,0.5);*/
    filter: grayscale(1);
  }

  .card-item.active .card-detail.equity .el-button {
    background: rgba(204, 70, 61, 0.0);
  }

  .member-card-img {
    height: 40px;
    background: #fff;
    border-radius: 20px;
  }

  .card-detail {
    height: 60px;
  }

  .col-equity-item {
    margin-bottom: 10px;
  }

  .content-card {
    margin-top: 20px;
  }

  .card-name {
    width: 100px;
    margin: 0 50px 0 10px;
  }

  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8f8;
  }

  .create-card-link {
    display: block;
    height: 163px;
    background: #f0f0f0;
    text-decoration: none;
    text-align: center;
  }

  .create-card-link h2 {
    font-size: 85px;
    font-weight: 100;
    line-height: 100px;
    color: #FFFFFF;
  }

  .create-card-link h3 {
    font-weight: normal;
  }

  .icon-ban {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -60px;
    font-size: 120px;
    color: #e13429;
    opacity: 0.6;
  }
</style>
