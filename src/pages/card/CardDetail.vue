<template>
  <div id="order_detail">
    <el-container>
      <el-header class="page-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-file-o"></i>卡券</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-info primary-color"></i><span class="primary-color">卡券详情</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-form :model="myData.formData" ref="myData.ruleForm" :rules="myData.formRule" label-width="120px"
                   class="create_form">

            <!--卡券详情-->
            <card-form @edit="editDialog" :cardFormMsg="myData.cardDetailMsg"></card-form>

            <el-card shadow="never" class="card-wrap">
              <div slot="header">
                <span class="card-form-span">卡券外观</span>
                <span class="edit primary-color" @click="editCard(1)">编辑</span>
              </div>
              <div class="card-form-block">
                <div class="card-img">
                  <div class="card-header">
                    <div class="card-logo">
                      <img src="../../assets/img/card_logo.png" alt="" width="40">
                    </div>
                    <div class="card-title">
                      中品会会员卡
                    </div>
                  </div>
                </div>
              </div>
            </el-card>

            <!--条件及限制-->
            <card-form @edit="editDialog" :cardFormMsg="myData.limitMsg"></card-form>

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
          <!--卡券外观-->
          <el-form :model="myData.formData" v-if="myData.type_msg===1">
            <el-form-item label="卡券颜色:" class="dialog-item" label-width="100px">
              <el-color-picker v-model="myData.formData.color_hex" :predefine="myData.predefineColors"
                               color-format="hex"></el-color-picker>
            </el-form-item>
            <el-form-item label="卡券logo:" class="dialog-item" label-width="100px">
              <el-upload drag action="/admin/Index/ajax_upload" name="logo_url_upload"
                         :on-success="uploadSuccess" :on-preview="handlePreview" :on-remove="handleRemove"
                         :file-list="fileList[0]" list-type="picture" multiple :disabled="disabled"
                         :multiple="false" :limit="1" :on-exceed="handleOverLimit">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
              </el-upload>
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
      name: null,
      status_: '',  //状态
      input_width: '100px',

      delivery_name: null,
      status: 0,
      coupon: 0,
      color_hex: null, //颜色的16进制值
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
    predefineColors: ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
    cardDetailMsg:{ //卡券详情
      cardTitle:'卡券详情',
      edit:0, // 编辑序号 0:卡券详情
      formItem:[
        {
          title:'卡券类型',
          prop:'card_type',
          val:'会员卡',
        },
        {
          title:'商户名称',
          prop:'card_type',
          val:'中品会',
        },
        {
          title:'卡券名称',
          prop:'card_type',
          val:'中品会会员卡',
        },
        {
          title:'使用提醒',
          prop:'card_type',
          val:'中品会会员卡使用提醒',
        },
        {
          title:'使用说明',
          prop:'card_type',
          val:'中品会会员卡使用说明',
        },
        {
          title:'库存数量',
          prop:'card_type',
          val:'9999',
        },
        {
          title:'特权说明',
          prop:'card_type',
          val:'特权说明',
        },
        {
          title:'电话',
          prop:'card_type',
          val:'11111111111',
        },
        {
          title:'卡券状态',
          prop:'card_type',
          val:'使用中',
        }
      ]
    },
    limitMsg:{  //条件及限制
      cardTitle:'条件及限制',
      edit:0, // 编辑序号 2:条件及限制
      formItem:[
        {
          title:'每人限领',
          prop:'card_type',
          val:'1张',
        },
        {
          title:'日期类型',
          prop:'card_type',
          val:'永久',
        },
      ]
    }
  };
  export default {
    components:{
      'card-form':CardForm
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
      editCard: function (value) {
        myData.dialogFormVisible = true

        switch (value) {
          case 0: //卡券详情
            myData.type_msg = 0
            break;
          case 1: //卡券外观
            myData.type_msg = 1
            break;
          case 2: //条件及限制
            myData.type_msg = 2
            break;
        }

      },
      modify_msg: function () {
        myData.dialogFormVisible = false
        tool.showToast(this, '修改成功', 'success')
      },
      editDialog(data){
        // 打开编辑对话框   0:卡券详情
        this.editDelivery(data)
      }
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

  .order-steps {

  }

  .order-progress {
    /* position: relative;
     display: table;
     margin: 20px 0 40px;
     padding-bottom: 60px;
     width: 100%;
     border-radius: 8px;
     background-color: #f8f8f8;*/

    padding: 50px 0;
  }

  .order-status {
    position: relative;
    display: table-cell;
    text-align: center;
    line-height: 4em;
  }

  .order-status.active {
    color: #0089dc;
  }

  .order-status::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin: 0 0 -9px -9px;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
    border: 5px solid #f8f8f8;
    border-radius: 50%;
    background-color: #ddd;
    content: "";
    z-index: 2;
  }

  .order-status.active::after {
    background-color: #0089dc;
  }

  .status-line {
    position: absolute;
    bottom: 98px;
    left: 4%;
    width: 92%;
    height: 1px;
    z-index: 1;
    background-color: #ededed;
  }

  .order-time {
    position: relative;
    top: -105px;
    display: table;
    width: 100%;
    font-size: 14px;
    /*letter-spacing: 0.05rem;*/
  }

  .order-time span {
    display: block;
    line-height: 0;
    margin-top: -10px;
  }

  .time-item {
    position: relative;
    display: table-cell;
    text-align: center;
    line-height: 4em;
  }

  .time-item:nth-child(1) {
    left: -1.3%;
  }

  .time-item:nth-child(2) {
    left: -3.5%;
  }

  .time-item:nth-child(3) {
    left: -6%;
  }

  .time-item:nth-child(4) {
    left: -2.5%;
  }

  .time-item:nth-child(5) {
    left: 1%;
  }

  .order-operate {
    margin-bottom: 20px;
  }

  .msg-top {
    margin-bottom: 30px;
  }

  .msg-top .box-card {
    /* min-height: 300px;*/
  }

  .delivery-msg {
    padding: 10px 20px;
    border-right: 1px solid #ededed;
  }

  .invoice-msg {
    padding: 10px 20px;
    border-right: 1px solid #ededed;
  }

  .order-msg {
    padding: 10px 20px;
  }

  .msg-top h3 {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .msg-top i {
    font-size: 1rem;
    margin-right: 0.25rem;
  }

  .msg-top .el-form-item__label {
    width: 100px !important;
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

  .normal-msg-block .card-form-span {
    margin: 10px 0;
  }

  .card-img {
    width: 300px;
    background-color: #cc463d;
    border-radius: 8px;
  }

  .card-header {
    display: flex;
    align-items: center;
    padding: 10px 0 100px 10px;
  }

  .card-logo {
    height: 40px;
    background: #fff;
    border-radius: 20px;
  }

  .card-title {
    margin-left: 10px;
    color: #FFFFFF;
  }

</style>
