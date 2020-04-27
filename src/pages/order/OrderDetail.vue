<template>
  <div id="order_detail">
    <el-container>
      <el-header class="page-header">
        <!--<h1><i class="fa fa-info"></i>订单详情</h1>-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!--<el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>-->
          <el-breadcrumb-item><i class="fa fa-file-o"></i>订单</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-info primary-color"></i><span class="primary-color">全部订单</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-form :model="myData.formData" ref="myData.ruleForm" :rules="myData.formRule" label-width="120px"
                   class="create_form">
            <el-row>
              <div class="order-progress">
                <el-row>
                  <el-col :span="20">
                    <el-steps :active="2" align-center finish-status="success">
                      <el-step title="待付款" description="2018-11-08 15:49:22"></el-step>
                      <el-step title="待确认" description="2018-11-08 15:49:22"></el-step>
                      <el-step title="待发货" description="2018-11-08 15:49:22"></el-step>
                      <el-step title="待确认收货" description="2018-11-08 15:49:22"></el-step>
                      <el-step title="已完成" description="2018-11-08 15:49:22"></el-step>
                    </el-steps>
                  </el-col>
                  <el-col :span="4">
                    <div class="order-status-operate" style="width: 70px;">
                      <el-button size="small" type="primary" style="margin-left: 10px;margin-bottom: 5px;">确认
                      </el-button>
                      <el-button size="small" type="danger" style="margin-bottom: 5px;">退款</el-button>
                      <el-button size="small" type="warning" style="margin-bottom: 5px;">打印</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-row>

            <!--配送信息-->
            <card-form @edit="editDialog" :cardFormMsg="myData.deliveryMsg"></card-form>

            <!--发票信息-->
            <card-form @edit="editDialog" :cardFormMsg="myData.invoiceMsg"></card-form>

            <el-card shadow="never" class="card-wrap">
              <div slot="header">
                <span class="card-form-span">订单信息</span>
                <span class="edit primary-color" @click="editDelivery(2)">编辑</span>
              </div>
              <div class="box-container">
                <div class="box-container-block">
                  <div class="box-container-inner">
                    <div class="item-title text-2">商品总价</div>
                    <div class="item-content">￥11.00</div>
                  </div>
                </div>
                <div class="box-container-block">
                  <div class="box-container-inner">
                    <div class="item-title text-2">运费</div>
                    <div class="item-content">￥11.00</div>
                  </div>
                </div>
                <div class="box-container-block">
                  <div class="box-container-inner">
                    <div class="item-title text-2">优惠折扣</div>
                    <div class="item-content">￥11.00</div>
                  </div>
                </div>
                <div class="box-container-block">
                  <div class="box-container-inner">
                    <div class="item-title text-2">会员折扣</div>
                    <div class="item-content">￥11.00</div>
                  </div>
                </div>
                <div class="box-container-block">
                  <div class="box-container-inner">
                    <div class="item-title text-2">其它折扣</div>
                    <div class="item-content">￥11.00</div>
                  </div>
                </div>
                <div class="box-container-block">
                  <div class="box-container-inner">
                    <div class="item-title text-2">应付金额</div>
                    <div class="item-content price-color">￥77.00</div>
                  </div>
                </div>
              </div>
              <div class="box-order-detail">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="订单编号：" prop="name">
                      1111111111111
                    </el-form-item>
                    <el-form-item label="订单状态：" prop="name">
                      待付款
                    </el-form-item>
                    <el-form-item label="付款时间：" prop="name">
                      2018-11-08 15:49:22
                    </el-form-item>
                    <el-form-item label="下单时间：" prop="name">
                      2018-11-08 15:49:22
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="预定时间：" prop="name">
                      2018-11-08 15:49:22
                    </el-form-item>
                    <el-form-item label="使用优惠券：" prop="coupon">
                      未使用
                    </el-form-item>
                    <el-form-item label="积分：" prop="coupon">
                      未使用
                    </el-form-item>
                    <el-form-item label="付款时间：" prop="name">
                      2018-11-08 15:49:22
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-card>

            <div class="normal-msg-block">
              <h3 class="card-form-span">商品信息</h3>
              <el-card id="normal_detail" shadow="never">
                <div slot="header">
                  <!--<div class="card-form-span">商品信息</div>-->
                  <el-row class="card_title">
                    <el-col :span="12">商品</el-col>
                    <el-col :span="4">单价(元)</el-col>
                    <el-col :span="4">数量</el-col>
                    <el-col :span="4">小计(元)</el-col>
                  </el-row>
                </div>
                <div class="normal_list">
                  <el-row>
                    <el-col :span="12">
                      <div class="normal_msg">
                        <div class="normal_img"><img src="../../assets/img/img_pro_1.jpg" width="75"></div>
                        <div class="normal_name">
                          <div class="name_all text-1">零地排 零排 铜条 十字螺丝 10孔</div>
                          <div class="normal_spec text-2">3*15 黄铜十字</div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="normal_price price_color">￥77.00</div>
                    </el-col>
                    <el-col :span="4">
                      <div class="normal_num">
                        1
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="normal_sum price_color">
                        ￥77.00
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <div class="normal_msg">
                        <div class="normal_img"><img src="../../assets/img/img_pro_1.jpg" width="75"></div>
                        <div class="normal_name">
                          <div class="name_all text-1">零地排 零排 铜条 十字螺丝 10孔</div>
                          <div class="normal_spec text-2">3*15 黄铜十字</div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="normal_price price_color">￥77.00</div>
                    </el-col>
                    <el-col :span="4">
                      <div class="normal_num">
                        1
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="normal_sum price_color">
                        ￥77.00
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <div class="normal_msg">
                        <div class="normal_img"><img src="../../assets/img/img_pro_1.jpg" width="75"></div>
                        <div class="normal_name">
                          <div class="name_all text-1">零地排 零排 铜条 十字螺丝 10孔</div>
                          <div class="normal_spec text-2">3*15 黄铜十字</div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="normal_price price_color">￥77.00</div>
                    </el-col>
                    <el-col :span="4">
                      <div class="normal_num">
                        1
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="normal_sum price_color">
                        ￥77.00
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div class="normal_price_all" style="text-align: right">
                  商品总价：<span>￥777.00</span>
                </div>
              </el-card>
            </div>
          </el-form>
        </el-main>

        <el-dialog class="user-detail-dialog" title="修改信息" :visible.sync="myData.dialogFormVisible">
          <!--配送信息-->
          <el-form :model="myData.formData" v-if="myData.type_msg===0">
            <el-form-item label="收货人:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="专属客服:" class="dialog-item" label-width="100px">
              <el-select class="dialog-select detail" v-model="myData.formData.name" placeholder="请选择专属客服">
                <el-option label="Tony" value="Tony"></el-option>
                <el-option label="aaa" value="aaa"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="发货区域:" class="dialog-item" label-width="100px">
              <el-select class="dialog-select detail" v-model="myData.formData.name" placeholder="请选择发货区域">
                <el-option label="11" value="11"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="详细地址:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="星级:" class="dialog-item radio" label-width="100px">
              <el-radio-group v-model="myData.formData.radio">
                <el-radio-button label="1星"></el-radio-button>
                <el-radio-button label="2星"></el-radio-button>
                <el-radio-button label="3星"></el-radio-button>
                <el-radio-button label="4星"></el-radio-button>
                <el-radio-button label="5星"></el-radio-button>
              </el-radio-group>
            </el-form-item>

          </el-form>
          <!--发票信息-->
          <el-form :model="myData.formData" v-if="myData.type_msg===1">
            <el-form-item label="单位名:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="单位地址:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话号码:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="税号:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="开户银行:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="银行账户:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
          <!--订单信息-->
          <el-form :model="myData.formData" v-if="myData.type_msg===2">
            <el-form-item label="商品总价:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="运费:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="优惠折扣:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="会员折扣:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="其它折扣:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="应付金额:" class="dialog-item" label-width="100px">
              <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="myData.dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="modify_msg">确定修改</el-button>
          </div>
        </el-dialog>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {mixinDetail} from "../../mixins/mixinDetail";
  import tool from '../../assets/js_/tool'
  import CardForm from '../../components/CardForm'

  var myData = {
    //【common】
    module: 'order', //本模块名称
    own: 1, //是否只查询本商城
    //【prepare】
    disabled_modi: false,
    requireList: {}, //请求的数据
    requireData: {}, //请求数据的容器
    //【form】
    formData: { //基础信息
      order_id: null,  //订单编号
      pay_time: null,  //付款成功时间
      shop_id: null,   //分配商城编号
      user_id: null,   //用户编号
      pay_method: null,    //支付方式
      pay_id: null, //支付订单号
      sum: null, //货物总价
      status: null, //状态
      group_id: null,  //团购编号
      deliveryman_id: null,    //送货员编号
      dispatch_area_id: null,  //发货区域编号
      invoice_name: null,  //纳税人
      invoice_no: null,    //纳税识别号
      tip: null,   //备注
      sum: null,   //货物总价
      coupon_id: null, //消费优惠券编号
      points: null,    //消费积分
      require_time: null,  //请求送达时间
      confiem_time: null,  //订单确认时间
      prepare_time: null,  //备货时间
      package_time: null,  //打包时间
      delivery_time: null, //发货时间
      arrive_time: null,   //确认送达时间
      time_zone: [],    //时间区间（预定）
      apply_refund_time: null, //申请退款时间
      refund_time: null,   //退款成功时间
      dtime: null, //删除时间
      name: null,  //姓名
      phone: null, //手机号
      express_id: null,    //物流方式
      express_no: null,    //快递单号
      address_area_id: null,   //收获地址区域编号
      detail: null,    //详细地址


      //非空
      type: null,  //订单类型
      total_weight: null,  //总重
      total_kind: null,    //总商品种类
      total_amount: null,  //总商品数
      total: null, //订单总价值
      refund_money: null,  //已退款金额
      paid: null,  //已收款金额
      mtime: null, //最后修改时间
      money: null, //实际应付价格
      is_del: null,    //是否删除
      freight: null,   //运费
      discount: null,   //折扣金额
      ctime: null, //创建时间
      coupon_able: null,   //能否使用优惠券
      bonus: null, //奖励积分

      //不需要提交
      express_id_input: '', //物流信息搜索
      dispatch_area_id_: [],
      address_area_id_: [],
      status_: '',  //状态
      input_width: '100px',

      delivery_name: null,
      status: 0,
      coupon: 0,
    },
    formRule: {
      type: [{
        required: true,
      }],
      total_weight: [{
        required: true,
      }],
      total_kind: [{
        required: true,
      }],
      total_amount: [{
        required: true,
      }],
      total: [{
        required: true,
      }],
      refund_money: [{
        required: true,
      }],
      paid: [{
        required: true,
      }],
      mtime: [{
        required: true,
      }],
      money: [{
        required: true,
      }],
      is_del: [{
        required: true,
      }],
      freight: [{
        required: true,
      }],
      discount: [{
        required: true,
      }],
      ctime: [{
        required: true,
      }],
      coupon_able: [{
        required: true,
      }],
      bonus: [{
        required: true,
      }],
    },
    //【getDetail】
    primary_key_name: 'order_id', //主键名称
    primary_key_value: null, //主键值 来自get参数
    dialogFormVisible: false,
    type_msg: 0, //dialog对话框信息内容 0：配送信息 1：发票信息 2：订单信息
    deliveryVal:{
      consignee:'小孙',
      phone:'18100110011',
      address:'浙江省杭州市',
      delivery:'快递速运',
      d_time:'2018-11-08 15:49:22',
      express_no:'111111111111',
    },
    deliveryMsg:{ // 配送信息
      cardTitle:'配送信息',
      edit:0, // 编辑序号 0：配送信息
      formItem:[
        {
          title:'收货人',
          prop:'consignee',
          val:'小孙',
        },
        {
          title:'电话',
          prop:'phone',
          val:'18100110011',
        },
        {
          title:'地址',
          prop:'address',
          val:'浙江省杭州市',
        },
        {
          title:'配送方式',
          prop:'delivery',
          val:'快递速运'
        },
        {
          title:'配送时间',
          prop:'d_time',
          val:'2018-11-08 15:49:22',
        },
        {
          title:'物流单号',
          prop:'express_no',
          val:'111111111111',
        },
      ]
    },
    invoiceMsg:{  // 发票信息
      cardTitle:'发票信息',
      edit:1, // 编辑序号 1：发票信息
      formItem:[
        {
          title:'单位名',
          prop:'organization_name',
          val:'单位111',
        },
        {
          title:'税号',
          prop:'tax_no',
          val:'1111111111',
        },
        {
          title:'单位地址',
          prop:'organization_address',
          val:'浙江省杭州市',
        },
        {
          title:'电话号码',
          prop:'phone',
          val:'1111111111',
        },
        {
          title:'开户银行',
          prop:'bank',
          val:'工商银行'
        },
        {
          title:'银行账户',
          prop:'bank_no',
          val:'111111111',
        }
      ]
    }
  };
  export default {
    components:{
      'card-form':CardForm,
    },
    mixins: [mixinDetail],
    name: "order-detail",
    data() {
      return {
        myData
      }
    },
    methods: {
      //【提交】
      async submitForm(formName) {
        var that = this
        myData.loading = true
        myData.disabled = true
        // 处理post数据
        var postData = {
          express_id: myData.formData.express_id, //物流方式
          freight: myData.formData.freight,
          name: myData.formData.name,
          phone: myData.formData.phone,
          dispatch_area_id: myData.formData.dispatch_area_id,
          address_area_id: myData.formData.address_area_id,//收获地址区域编号
          detail: myData.formData.detail,   //详细地址
          express_no: myData.formData.express_no,
          invoice_no: myData.formData.invoice_no,
          invoice_name: myData.formData.invoice_name,
        }
        // detail 页面需要传入condition
        var condition = {}
        condition[myData.primary_key_name] = myData.primary_key_value
        var res = await tool.submitForm(that, myData.module + '/ajax_u', 'u', formName, postData, condition)
        await tool.sleep(500)
        myData.loading = false
        myData.disabled = true
      },
      handleAreaChange(value) {
        myData.formData.address_area_id = value[2]
      },
      handleDispatchAreaChange(value) {
        myData.formData.dispatch_area_id = value[2]
      },
      handleSortTypeChange(value) {
        console.log(value)
      },
      editDelivery(value){
        myData.dialogFormVisible = true
        switch (value) {
          case 0: //配送信息
            myData.type_msg = 0
            break;
          case 1: //发票信息
            myData.type_msg = 1
            break;
          case 2: //订单信息
            myData.type_msg = 2
            break;
        }

      },
      modify_msg: function () {
        myData.dialogFormVisible = false
        tool.showToast(this, '修改成功', 'success')
      },
      editDialog(data){
        // 打开编辑对话框   0:配送信息 1:发票信息
        this.editDelivery(data)
      }
    },
    created(){

    }
  }
</script>


<style scoped>
  .order_card {
    border: 1px solid #f8e5bb;
    background: #fefdee;
    margin-bottom: 20px;
  }

  .order_status {
    margin-bottom: 15px;

  }

  #normal_detail {
    text-align: center;
  }

  .normal_msg {
    display: flex;
    align-items: center;
  }

  .normal_name {
    margin-left: 20px;
    text-align: left;
  }

  .normal_num, .normal_price, .normal_sum {
    line-height: 79px;
  }

  #normal_detail .el-card__body {
    padding: 10px !important;
  }

  .order-progress {
    padding: 50px 0;
  }

  .normal_price_all {
    text-align: right;
    margin-top: 20px;
    margin-right: 5%;
    font-size: 18px;
  }

  .normal_price_all span {
    color: #F2642A !important
  }

  .order-status-operate {
    display: flex;
    flex-direction: column;
    margin-top: -20px;
  }

  .card-form-block .el-form-item {
    margin: 0;
  }

  .card-form-span {
    padding: 0 10px;
    border-left: 4px solid rgb(255, 102, 0);
    font-weight: bold;
  }

  .box-container-inner {
    display: inline-block;
    margin: 0 auto;
    text-align: left;
    padding: 0 20px;
  }

  .box-container-block {
    display: inline-block;
    padding: 0 30px;
    margin: 10px 0;
    border-right: 1px solid #DCDFE6;
  }

  .box-container-block:last-child {
    border: none;
  }

  .box-container-block .item-title {
    font-size: 14px;
    text-align: center;
  }

  .box-container-block .item-content {
    padding: 5px 10px;
    text-align: center;
  }

  .box-order-detail{
    margin-top: 30px;
  }

  .normal-msg-block{
    margin-top: 30px;
  }
  .normal-msg-block .card-form-span{
    margin: 10px 0;
  }
</style>
