<template>
  <div id="order_all">
    <el-container>
      <el-header class="page-header">
        <!--<h1><i class="fa fa-table"></i>全部订单</h1>-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!--<el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>-->
          <el-breadcrumb-item><i class="fa fa-file-o"></i>订单</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-table primary-color"></i><span class="primary-color">全部订单</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main class="table-msg">
           <el-table class="goodsTable" :data="myData.tableData" v-loading="myData.tableLoading"
                     @selection-change="handleSelect"
                     :row-class-name="tableRowClassName">
             <el-row>
               <!--<el-card class="order-status-operate" shadow="never">
                 <el-form>
                   <el-row>
                     <el-col :span="12">
                       <el-form-item label="订单状态" prop="type">
                         <el-radio-group size="small" v-model="myData.formData.status">
                           <el-radio-button label="9">全部</el-radio-button>
                           <el-radio-button label="0">待付款</el-radio-button>
                           <el-radio-button label="1">待确认</el-radio-button>
                           <el-radio-button label="2">待发货</el-radio-button>
                           <el-radio-button label="3">待确认收货</el-radio-button>
                           <el-radio-button label="4">已完成</el-radio-button>
                         </el-radio-group>
                       </el-form-item>
                     </el-col>
                     <el-col :span="12">
                       <el-form-item label="下单时间" prop="time">
                         <el-date-picker
                           v-model="myData.formData.dateTimer"
                           type="datetimerange"
                           :picker-options="pickerOptions2"
                           range-separator="至"
                           start-placeholder="开始日期"
                           end-placeholder="结束日期"
                           align="right">
                         </el-date-picker>
                       </el-form-item>
                     </el-col>
                     <el-col>
                       <el-row>
                         <el-col :span="12">
                           <el-form-item label="订单类型" prop="type">
                             <el-radio-group size="small" v-model="myData.formData.status">
                               <el-radio-button label="9">全部</el-radio-button>
                               <el-radio-button label="0">普通商品订单</el-radio-button>
                               <el-radio-button label="1">订单1</el-radio-button>
                               <el-radio-button label="2">订单2</el-radio-button>
                               <el-radio-button label="3">订单3</el-radio-button>
                               <el-radio-button label="3">订单4</el-radio-button>
                             </el-radio-group>
                           </el-form-item>
                         </el-col>
                         <el-col :span="12">
                           <el-form-item label="订单搜索" prop="type">
                             <el-input v-model="keyword" placeholder="" style="width: auto">
                               <el-select v-model="target" slot="prepend" placeholder="请选择">
                                 <el-option v-for="item in searchFieldList" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
                               </el-select>
                               <el-button slot="append" icon="el-icon-search" @click="search">筛选</el-button>
                             </el-input>
                           </el-form-item>
                         </el-col>
                       </el-row>
                     </el-col>
                   </el-row>


                   &lt;!&ndash;<div class="order-operate" style="margin-bottom: 10px;">
                     <p>订单状态：</p>
                     <ul class="status" style="margin-left: 15px;">
                       <li v-for="(item,index) in myData.statusList" @click="addClass(index)" :class="{active:index==myData.current}" class="no-select">{{item.title}}</li>
                     </ul>
                   </div>&ndash;&gt;


                   <div class="order-sort">
                     <p style="width: 70px;text-align: right">订单排序：</p>
                     <ul class="sort">
                       <li v-for="(item,index) in myData.sortList" @click="addSortClass(index)"
                           :class="{active:index==myData.sortCurrent}" class="no-select">
                         {{item.title}}
                         <span class="caret-wrapper">
                           <i class="sort-caret ascending"
                              :class="{asActive:myData.sortCount==0&&index==myData.sortCurrent}"></i>
                           <i class="sort-caret descending"
                              :class="{asActive:myData.sortCount==1&&index==myData.sortCurrent}"></i>
                         </span>
                       </li>
                     </ul>
                   </div>


                   &lt;!&ndash; <el-form-item label="排序" prop="type" class="order-sort">
                      <el-radio-group v-model="myData.formData.sort">
                        <el-radio-button label="0">下单时间
                          <span class="caret-wrapper">
                            <i class="sort-caret ascending"></i>
                            <i class="sort-caret descending"></i>
                          </span>
                        </el-radio-button>
                        <el-radio-button label="1">姓名
                          <span class="caret-wrapper" id="sort-name">
                            <i class="sort-caret ascending zz"></i>
                            <i class="sort-caret descending"></i>
                          </span>
                        </el-radio-button>
                        <el-radio-button label="2">物流方式
                          <span class="caret-wrapper">
                            <i class="sort-caret ascending"></i>
                            <i class="sort-caret descending"></i>
                          </span>
                        </el-radio-button>
                        <el-radio-button label="3">实付金额
                          <span class="caret-wrapper">
                            <i class="sort-caret ascending"></i>
                            <i class="sort-caret descending"></i>
                          </span>
                        </el-radio-button>
                        <el-radio-button label="4">状态
                          <span class="caret-wrapper">
                            <i class="sort-caret ascending"></i>
                            <i class="sort-caret descending"></i>
                          </span>
                        </el-radio-button>
                      </el-radio-group>
                    </el-form-item>&ndash;&gt;
                 </el-form>
               </el-card>-->

               <!--查询条件-->
               <FilterWrap></FilterWrap>


               <el-col class="table-row" :span="24" v-for="item in myData.tableData">
                 <el-card class="box-card" id="order_box" shadow="never">
                   <div slot="header" class="card_top">
                     <el-checkbox class="table-checkbox" v-model="item.check_order_id"></el-checkbox>
                     <div class="order_ctime">下单时间:<span>2018-11-08 12:17:18</span></div>
                     <div class="order_id">订单号:<span>674209081714129943012385041056</span></div>
                     <div class="order_status" style="color: #409EFF">待发货</div>
                   </div>
                   <el-row>
                     <el-col class="card_order_msg" :span="6">
                       <el-col :span="24">
                         <el-col :span="4">
                           <img class="order_avatar" src="../../assets/img/avatar-1.jpg" width="48">
                         </el-col>
                         <el-col :span="20">
                           <div class="user_info">
                             <div class="content-item">
                               <el-col class="user_name" :span="24">
                                 <el-col :span="10">
                                   <div><span class="text-1" style="font-size: 16px;">小金</span></div>
                                 </el-col>
                                 <el-col :span="14">
                                   <div><i class="fa fa-mars"></i></div>
                                 </el-col>
                               </el-col>
                               <el-col class="user_star" :span="24">
                                 <el-col :span="10">
                                   <div><span class="text-2" style="font-size: 14px">个人消费</span></div>
                                 </el-col>
                                 <el-col :span="14">
                                   <div>
                                     <el-rate disabled v-model="myData.star_value"></el-rate>
                                   </div>
                                 </el-col>
                               </el-col>
                               <div style="clear: both;"></div>
                             </div>
                           </div>
                         </el-col>
                       </el-col>
                       <el-col :span="24">
                         <div class="user_info_msg">
                           <div class="content-item_msg">
                             <div class="receiving-msg">
                               <div class="receiving-name">小金</div>
                               <div class="receiving-phone">13873182173</div>
                               <div class="address">
                                 北京市，北京市，东城区，
                                 <span>江干区下沙街道1111号</span>
                               </div>
                               <div style="clear: both;"></div>
                             </div>
                           </div>
                         </div>
                       </el-col>
                     </el-col>
                     <el-col :span="18">
                       <el-scrollbar class="normal_scroll">
                         <el-row>
                           <el-col :span="11" class="normal-wrap" v-for="item in myData.formData.msg">
                             <div class="normal_msg">
                               <div><img src="../../assets/img/img_pro_1.jpg"></div>
                               <div class="normal_name">
                                 <div class="name_all text-1">零地排 零排 铜条 十字螺丝 10孔</div>
                                 <div class="normal_spec text-2">3*15 黄铜十字</div>
                               </div>
                               <div class="normal_price">
                                 <div class="normal_price_num">
                                   <span>￥77.00</span>
                                 </div>
                                 <div class="normal_num text-2">
                                   ×<span>150</span>
                                 </div>
                               </div>
                             </div>
                           </el-col>
                         </el-row>
                       </el-scrollbar>
                     </el-col>
                   </el-row>
                   <div class="card_bottom">
                     <div class="delivery_time text-2">
                       预计送达时间：<span class="text-1">2018-11-08 12:17:18</span>
                     </div>
                     <div class="total_price text-2 text-right">总价：<span class="total_price_num text-1">￥777</span>
                     </div>
                     <div style="clear: both;"></div>
                   </div>
                 </el-card>

                 <div class="order_operate"><!--box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);-->
                   <el-button size="mini" @click="edit(1000)">编辑</el-button>
                   <el-button size="mini" type="primary">确认</el-button>
                   <el-button size="mini" type="danger">删除</el-button>
                 </div>
               </el-col>

             </el-row>
           </el-table>
          <!--  <el-dialog title="提示" :visible.sync="myData.dialogFormVisible" width="30%" center>
              <el-form :model="myData.formData" id="dialogRefund">
                <el-form-item label="请输入退款金额" :label-width="myData.formLabelWidth">
                  <el-input v-model="myData.formData.formRefund_money" :placeholder="myData.holder"
                            auto-complete="off"></el-input>
                  &lt;!&ndash;:placeholder="refund_money"&ndash;&gt;
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="formCancel()">取 消</el-button>
                <el-button type="primary" @click="formRefund()">确 定</el-button>
              </div>
            </el-dialog>

            <el-dialog title="提示" :visible.sync="myData.dialogFormVisible2" width="30%" center id="dialogRefundVerify">
              <span>确定退款？</span>
              <div slot="footer" class="dialog-footer">
                <el-button @click="formCancel()">取 消</el-button>
                <el-button type="primary" @click="formRefundVerify()">确 定</el-button>
              </div>
            </el-dialog>

            <el-row class="table-operate">
              <el-button type="success" plain @click="ban(1)" :disabled="myData.disabled">批量确认</el-button>
              <el-button type="info" plain @click="ban(0)" :disabled="myData.disabled">批量取消</el-button>
            </el-row>-->


          <el-row class="table-operate">
            <el-button type="" plain @click="selectedAll">选择全部</el-button>
            <el-button type="" plain @click="getPage(0)">重置列表</el-button>
            <el-button type="success" plain @click="ban(1)">批量启用</el-button>
            <el-button type="info" plain @click="ban(0)">批量禁用</el-button>
            <el-button type="danger" plain @click="deleteRows()">批量删除</el-button>
          </el-row>

          <el-row class="table-page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="pageInfo['now']" :page-sizes="[10, 20, 30, 40,50]"
                           :page-size="pageInfo['size']" :total="pageInfo['rowTotal']"
                           layout="total, sizes, prev, pager, next, jumper"></el-pagination>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import tool from '../../assets/js_/tool'
  import {mixinAll} from "../../mixins/mixinAll";

  import FilterWrap from '../../components/FilterSection'

  var check_flag = 0;

  var myData = {

    /* 【common】 */
    module: 'order', //本模块名称
    own: 0, //是否只查询本商城
    searchFieldList: [{
      'label': '订单编号',
      'value': 'order_id',
    }, {
      'label': '姓名',
      'value': 'name',
    }, {
      'label': '纳税人',
      'value': 'invoice_name',
    }],
    primary_key: 'order_id', //主键名称
    condition: {
      status: ['in', '1,2']
    },
    //**********添加的
    orderStatus: '1,2',
    statusArr: [0, 0, 0, 0, 0, 0],
    excelSpec: {},
    formData: {
      formRefund_money: null,
      msg: [
        {
          nickName: 'aa',
          phone: '11111',
          normal_name: 'LA38系列按钮 LA38-11',
          normal_spec: 'JRD-100W 220V',
          num: 150,
        },
        {
          nickName: 'aa',
          phone: '11111',
          normal_name: '信号灯（指示灯） AC AD16-22DS',
          normal_spec: 'JRD-100W 220V',
          num: 151,
        },
        {
          nickName: 'aa',
          phone: '11111',
          normal_name: 'LA38系列按钮 LA38-11',
          normal_spec: 'JRD-100W 220V',
          num: 152,
        },
        {
          nickName: 'aa',
          phone: '11111',
          normal_name: '信号灯（指示灯） AC AD16-22DS',
          normal_spec: 'JRD-100W 220V',
          num: 153,
        },
        {
          nickName: 'aa',
          phone: '11111',
          normal_name: 'LA38系列按钮 LA38-11',
          normal_spec: 'JRD-100W 220V',
          num: 154,
        },
      ],
      type: 0,
      value: '11',
      searchValue: '',
      status: 1,
      sort: 1,
      dateTimer: null,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    },
    formOrder_id: null,
    money: null,
    holder: null,
    dialogTableVisible: false,  //弹窗
    dialogFormVisible: false,   //输入退款金额
    dialogFormVisible2: false,   //确认是否退款
    formLabelWidth: '120px',
    tableData: [
      {
        name: '11',
        order_id: '001',
        check_order_id: false,
      },
      {
        name: '11',
        order_id: '002',
        check_order_id: false,
      },
      {
        name: '11',
        order_id: '003',
        check_order_id: false,
      },
      {
        name: '11',
        order_id: '004',
        check_order_id: false,
      }
    ],
    star_value: 4,
    isIndeterminate: true,
    current: 0,
    statusList: [
      {title: '全部'},
      {title: '待付款'},
      {title: '待确认'},
      {title: '待发货'},
      {title: '待确认收货'},
      {title: '待发货'},
    ],
    sortCurrent: 0,
    sortCount: 0,
    sortList: [
      {title: '下单时间'},
      {title: '物流方式'},
      {title: '实付金额'},
      {title: '状态'},
    ]
  };
  export default {
    mixins: [mixinAll],
    name: "order-all",
    data(){
      return{
       myData,
      }

    },
    methods: {
      async prepare() {
        var that = this
        myData.tableLoading = false
        console.log(myData.tableData)
      },

      async getPage() {
        var that = this
        myData.tableLoading = true
        myData.disabled = true
        var postData = {
          flag: myData.own, //查询本商城
          pageNow: that.pageInfo['now'], //当前页
          pageSize: that.pageInfo['size'], //每页条目
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

        tool.empty(that.keyword) ? null : (postData.target = that.target, postData.keyword = that.keyword)
        var res = await tool.post(myData.module + '/ajax_getPage', postData)
        res[0] == 1 ? (that.tableData = res[1]['rows'], that.pageInfo['rowTotal'] = parseInt(res[1]['count']), myData.statusArr = res[1]['status_arr']) : that.tableData = []
        await tool.sleep(500)
        that.tableLoading = false
        that.disabled = false
      },

      handleOrderTypeChange(value) {
        myData.condition = {
          status: value
        }
        myData.pageInfo = {
          now: 0,
          size: 10,
          rowTotal: 0
        }
        myData.orderStatus = value
        this.getPage()
      },

      async print(order_id) {
        // console.log(order_id)
        // myData.excelSpec={}
        // //这里存在一个问题就是在confirm中写myData读取不到 故此先提出来
        // var selected = myData.selected
        // var that = this
        // var info = "通过"
        // const h = this.$createElement
        // myData.excelSpec = {
        //     order_id: order_id
        // }
        // var wrapper = h('div', {}, [])
        // var temp = h('el-input', {
        //     attrs: {
        //         name: 'contract_number', //这里要求是字符串
        //         placeholder: '合同编号'
        //     },
        //     nativeOn: {
        //         change: function (e) {
        //             myData.excelSpec.contract_number = e.target.value
        //         }
        //     },
        // })
        // wrapper.children.push(temp)
        //
        // var temp = h('el-input', {
        //     attrs: {
        //         name: 'bank', //这里要求是字符串
        //         placeholder: '甲方开户行',
        //     },
        //     nativeOn: {
        //         change: function (e) {
        //             console.log(e)
        //             myData.excelSpec.bank = e.target.value
        //         }
        //     },
        // }, [])
        //
        // wrapper.children.push(temp)
        //
        // var temp = h('el-input', {
        //     attrs: {
        //         name: 'account', //这里要求是字符串
        //         placeholder: '甲方账号',
        //     },
        //     nativeOn: {
        //         change: function (e) {
        //             console.log(e)
        //             myData.excelSpec.account = e.target.value
        //         }
        //     },
        // }, [])
        //
        // wrapper.children.push(temp)
        //
        // temp = h('el-input', {
        //     attrs: {
        //         name: 'opening_bank', //这里要求是字符串
        //         placeholder: '客户开户行'
        //     },
        //     nativeOn: {
        //         change: function (e) {
        //             myData.excelSpec.opening_bank = e.target.value
        //         }
        //     },
        // })
        // wrapper.children.push(temp)
        // temp = h('el-input', {
        //     attrs: {
        //         name: 'account_number', //这里要求是字符串
        //         placeholder: '客户账户'
        //     },
        //     nativeOn: {
        //         change: function (e) {
        //             myData.excelSpec.account_number = e.target.value
        //         }
        //     },
        // })
        // wrapper.children.push(temp)
        // temp = h('el-input', {
        //     attrs: {
        //         name: 'zip_code', //这里要求是字符串
        //         placeholder: '客户邮政编码'
        //     },
        //     nativeOn: {
        //         change: function (e) {
        //             myData.excelSpec.zip_code = e.target.value
        //         }
        //     },
        // })
        // wrapper.children.push(temp)
        // temp = h('el-input', {
        //     attrs: {
        //         name: 'start_date', //这里要求是字符串
        //         placeholder: '合同起始时间'
        //     },
        //     nativeOn: {
        //         change: function (e) {
        //             myData.excelSpec.start_date = e.target.value
        //         }
        //     },
        // })
        // wrapper.children.push(temp)
        // temp = h('el-input', {
        //     attrs: {
        //         name: 'end_date', //这里要求是字符串
        //         placeholder: '合同结束时间'
        //     },
        //     nativeOn: {
        //         change: function (e) {
        //             myData.excelSpec.end_date = e.target.value
        //         }
        //     },
        // })
        // wrapper.children.push(temp)
        // var insideNode = h('p', null, [h('div', null, '请填写以下信息，合同编号，客户开户银行，客户对公账户，客户邮政编码,合同起始时间，结束时间'), wrapper])
        // var res = await tool.showModal(that, insideNode, true, null, '提示', 'info')
        // if (res[0] == 1) {
        var url = 'https://drp.21b.cn/admin/order/getExcel?order_id=' + order_id
        // for (var i in myData.excelSpec) {
        //     url += i + '=' + myData.excelSpec[i] + "&"
        // }
        //     console.log(url)
        //通过单个或批量
        window.open(url)
        // }
      },

      async refund(refund_money, status) {
        console.log("refund_money:" + refund_money)
        console.log("status:" + status)
        //这里存在一个问题就是在confirm中写myData读取不到 故此先提出来
        var selected = myData.selected
        var that = this
        var info = "通过"
        const h = this.$createElement
        myData.excelSpec = {
          refund_money: refund_money
        }
        var wrapper = h('div', {}, [])
        myData.excelSpec.tk_money = null
        var temp = h('el-input', {
          attrs: {
            name: 'data_money', //这里要求是字符串
            placeholder: refund_money,
            id: 'fun_money',
          },
          nativeOn: {
            change: function (e) {
              myData.excelSpec.tk_money = e.target.value
              console.log("excelSpec.tk_money" + myData.excelSpec.tk_money)
            }
          },
        })

        wrapper.children.push(temp)
        var insideNode = h('p', null, [h('div', null, '请填写退款金额'), wrapper])
        var res = await tool.showModal(that, insideNode, true, null, '提示', 'info')
        var postData = {
          condition: {},
          data: {
            status: 6,
            money: myData.excelSpec.tk_money
          },
          scene: 'status'
        }
        if (res[0] == 0) {
          that.getPage()
          return false
        }
        postData.condition[myData.primary_key] = arguments[2] != undefined ? arguments[2] : ['in', selected.toString()]
        var res = await tool.post(myData.module + '/ajax_u', postData, that)

        if (res[0] == 0) tool.showToast(that, res[2])
        else tool.showModal(app, '操作成功！本次修改共影响：' + res[1] + '条记录', false, '好的', null, 'success')
        that.getPage()

      },

      async refund1(refund_money, status, order_id, pay_method) {
        myData.formOrder_id = order_id    //订单id
        myData.holder = refund_money
        if (pay_method == 1 || pay_method == 5) {   //微信支付、余额支付
          myData.dialogFormVisible = true //打开嵌套的表单
        } else {
          myData.dialogFormVisible2 = true
        }

      },

      async formCancel() {
        //输入框中值置为空
        myData.formData.formRefund_money = ''
        myData.dialogFormVisible = false
        myData.dialogFormVisible2 = false
      },
      //输入退款金额
      async formRefund() {
        var that = this
        var postData = {
          condition: {},
          data: {
            status: 6,
            money: myData.formData.formRefund_money
          },
          scene: 'status'
        }
        postData.condition[myData.primary_key] = myData.formOrder_id
        var res = await tool.post(myData.module + '/ajax_u', postData, that)

        //输入框中值置为空
        myData.formData.formRefund_money = ''
        myData.dialogFormVisible = false

        if (res[0] == 0) tool.showToast(that, res[2])
        else tool.showModal(app, '操作成功！本次修改共影响：' + res[1] + '条记录', false, '好的', null, 'success')
        that.getPage()
      },
      //确认退款
      async formRefundVerify() {
        var that = this
        var postData = {
          condition: {},
          data: {
            status: 6,
          },
          scene: 'status'
        }
        postData.condition[myData.primary_key] = myData.formOrder_id
        var res = await tool.post(myData.module + '/ajax_u', postData, that)
        myData.dialogFormVisible2 = false
        if (res[0] == 0) tool.showToast(that, res[2])
        else tool.showModal(app, '操作成功！本次修改共影响：' + res[1] + '条记录', false, '好的', null, 'success')
        that.getPage()
      },

      selectedAll() {
        if (check_flag == 0) {  //选择全部
          for (var i in myData.tableData) {
            myData.tableData[i].check_order_id = true
          }
          check_flag = 1
        } else {
          for (var i in myData.tableData) {
            myData.tableData[i].check_order_id = false
          }
          check_flag = 0
        }

      },

      addClass: function (index) {
        myData.current = index
      },
      addSortClass: function (index) {
        myData.sortCurrent = index

        if (myData.sortCount >= 2) {
          myData.sortCount = -1
        }
        myData.sortCount++;

      },
      edit(id) {
        /*var url='/order/detail?id='+id
        this.$router.push(url)*/


        const {href} = this.$router.resolve({
          path: '/order/detail?id=' + id,
        })
        window.open(href, '_blank')

      },

      addB: function () {
        this.testValB++;
      },
      addA:function () {
        this.testValA++;
      }
    },
    created() {
      this.prepare()
    },
    components:{
      FilterWrap
    }


  }
</script>


<style scoped>
  .card_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .table-row {
    margin-bottom: 20px;
    /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);*/
  }

  .table-row:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }

  .content-item {
    margin-left: 10px;
  }

  .content-item li {
    float: left;
    /*padding: 7px 5px;*/
    /*padding: 0 20px 10px 4px;*/
  }

  .content-item span {
    color: #000;
  }

  .content-item_msg {
    margin: 8px 8px 0 0;
    background: #f2f6fc;
    padding: 5px;
  }

  .content-item_msg li {
    padding: 4px 0;
  }

  .content-item_msg span {
    color: #000;
  }

  .normal_msg {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 20px;
  }

  .normal_price {
    width: 80px;
  }

  .normal-wrap {
    margin: 0 15px
  }

  .name_all {
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .normal_spec {
    height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .order_ctime {
    color: #99a9bf;
  }

  .order_ctime span {
    margin-left: 10px;
    color: #000;
  }

  .order_id {
    width: 70%;
    color: #99a9bf;
  }

  .order_id span {
    margin-left: 10px;
    color: #000;
  }

  .card_order_msg {
    border-right: 1px solid #ebeef5;
  }

  .normal_scroll {
    height: 150px;
  }

  .normal_msg .normal_name {
    width: 100%;
    margin-left: 5px;
  }

  .normal_msg span {
    font-size: 14px;
  }

  .normal_msg img {
    width: 48px;
  }

  .normal_num {
    /*max-width: 48px;*/
    text-align: right;
  }

  .order_status {
    font-size: 16px;
  }

  .order_operate {
    display: flex;
    justify-content: flex-end;
    padding: 12px;
    border: 1px solid #ebeef5;
  }

  .card_bottom {
    position: relative;
    margin: 0 10px;
  }

  .total_price {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 16px;
  }

  .order_avatar {
    border-radius: 24px;
  }

  .user_name {
    line-height: 26px;
  }

  .user_star {
    line-height: 22px;
  }

  .receiving-msg {
    margin: 0 8px
  }

  .receiving-name {
    float: left;
    height: 20px;
  }

  .receiving-phone {
    float: right;
    height: 20px;
  }

  .address {
    float: left;
    height: 40px;
    margin-top: 5px;
  }

  .normal_price_num {
    text-align: right;
    color: rgb(242, 100, 42) !important;
  }

  .total_price_num {
    color: #F2642A !important
  }

  .order-search {
    margin-bottom: 20px;
  }

  .info-card {
    display: flex;
    background-color: #46be8a;
    color: #fff;
    padding: 1.2rem 2rem;
    border-radius: 3px;
    margin-bottom: 1.5rem;
  }

  .info-card-digit {
    margin-right: 1.5rem;
    margin-top: -0.5rem;
    width: 4rem;
    text-align: center;
    font-weight: bold;
    font-size: 3rem;
  }

  .info-card-desc {
    display: flex;
    flex-direction: column;
    font-size: 18px;
    text-align: center;
  }

  /*#sort-name .caret-wrapper .el-table .sort-caret.ascending{
    border-bottom-color: #409EFF;
  }*/

  .order-operate {
    display: flex;
  }

  .order-operate p {
    line-height: 30px;
  }

  .status li {
    display: table-cell;
    padding: 5px 12px;
    cursor: pointer;
  }

  .status li.active {
    color: #409EFF;
  }

  .status li.active {
    background-color: #ddedf8;
  }

  .order-sort {
    display: flex;
  }

  .order-sort p {
    line-height: 32px;
  }

  .sort li {
    display: table-cell;
    padding: 0 12px;
    cursor: pointer;
  }

  .sort li.active {
    color: #409EFF;
  }

  .order-status-operate {
    margin-bottom: 10px;
    box-shadow: none;
  }
</style>

