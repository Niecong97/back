<template>
  <div id="card-writeoff">
    <el-container>
      <el-header class="page-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-vcard"></i>卡券</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-plus primary-color"></i><span class="primary-color">核销卡券</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-form :model="myData.formData" ref="myData.ruleForm" :rules="myData.formRule" label-width="100px"
                   class="create_form cardQrcode-form">

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="卡券号">
                  <el-input type="text" v-model="myData.formData.name" placeholder="请填写卡券号"
                            class="auto-width"></el-input>
                </el-form-item>
                <el-col class="col-max-width">
                  <li class="card-list-item">
                    <div class="card-item">
                      <div class="card-header">
                        <div class="member-card-img">
                          <img src="../../assets/img/card_logo.png" alt="" width="40">
                        </div>
                        <h3>中品会会员卡</h3>
                        <h4><i class="fa fa-vcard"></i>会员卡</h4>
                      </div>
                      <div class="card-detail equity">
                        <el-row>
                          <el-col :span="24" class="col-equity-item">
                            <el-col :span="8">
                              <div class="equitey-title">
                                <i class="fa fa-shopping-cart"></i>享受会员包邮
                              </div>
                            </el-col>
                            <el-col :span="16">
                              <div class="equitey-content"></div>
                            </el-col>
                          </el-col>
                          <el-col :span="24" class="col-equity-item">
                            <el-col :span="8">
                              <div class="equitey-title">
                                <i class="fa fa-credit-card"></i>会员9折优惠
                              </div>
                            </el-col>
                            <el-col :span="16">
                              <div class="equitey-content"></div>
                            </el-col>
                          </el-col>
                          <el-col :span="24" class="col-equity-item">
                            <el-col :span="6">
                              <div class="equitey-title">
                                <i class="fa fa-info-circle"></i>使用说明:
                              </div>
                            </el-col>
                            <el-col :span="18">
                              <div class="equitey-content">
                                中品会会员卡使用说明
                              </div>
                            </el-col>
                          </el-col>
                          <el-col :span="24" class="col-equity-item">
                            <el-col :span="6">
                              <div class="equitey-title">
                                <i class="fa fa-tag"></i>使用提醒:
                              </div>
                            </el-col>
                            <el-col :span="18">
                              <div class="equitey-content">
                                中品会会员卡使用提醒
                              </div>
                            </el-col>
                          </el-col>
                          <el-col :span="24" class="col-equity-item">
                            <el-col :span="6">
                              <div class="equitey-title">
                                <i class="fa fa-clock-o"></i>结束日期:
                              </div>
                            </el-col>
                            <el-col :span="18">
                              <div class="equitey-content">
                                2018-08-21 15:32:36
                              </div>
                            </el-col>
                          </el-col>
                        </el-row>
                      </div>
                      <div class="card-bottom">
                        <div class="state">
                          <span>库存数量: 9999</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </el-col>
              </el-col>
              <el-col class="basic-msg-right" :span="12">
                <h3>会员信息</h3>
                <el-form-item label="头像" prop="avatarUrl">
                  <img src="../../assets/img/avatar-1.jpg" alt="">
                </el-form-item>
                <el-form-item label="编号">
                  111111111111
                </el-form-item>
                <el-form-item label="昵称">
                  aaa
                </el-form-item>
                <el-form-item label="余额" prop="balance">
                  ￥111.11
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                  aaa
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  1111111111
                </el-form-item>

                <el-form-item class="btn-create">
                  <el-button type="primary" @click="submitForm('ruleForm')">立即核销</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>


          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  import tool from '../../assets/js_/tool'

  var myData = {
    /* 【common】 */
    module: 'card', //本模块名称
    own: 0, //是否只查询本商城
    /* 【prepare】 */
    loading: true, //页面读取态
    disabled: true, //页面禁用态
    requireList: {
      card_id_list: 1
    }, //请求的数据
    requireData: {
      card_id_list: []
    }, //请求数据的容器
    mainOperate: '', //getOptions后的主操作
    /* 【form】 */
    formData: {
      // 以下为共有 必填
      user_id: null,
      member_card_code: null,
      cards_: [],
      cards: [],
      name: null,
      type: 0,
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

    }, //表单数据，并非一定完整传递出去，可能需要再post之前处理
    formRule: {
      member_card_code: [{
        required: true,
        message: '请填写用户会员卡编号',
        trigger: 'blur'
      }],
      cards: [{
        required: true,
        message: '请填写卡券，总数量不得超过5张',
        trigger: 'blur'
      }]
    }, //表单验证规则
    userInfo: {
      user_id: null,
      avatarUrl: null,
      balance: null,
      nickName: null,
      name: null,
      phone: null
    }
  }

  export default {
    name: "card-get-qrcode",
    data() {
      return {
        myData
      }
    },
    methods: {},
    created() {
      //this.prepare()
    }
  }
</script>

<style scoped>

  .cardQrcode-form {
    width: 90%;
    margin: 0 auto;
  }

  .btn-create {
    text-align: left;
  }

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
    /*margin-left: 65px;*/
  }

  .col-max-width {
    max-width: 400px;
    margin-top: 30px;
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
    padding: 0 20px;
    color: #FFFFFF;
    font-size: 14px;
  }

  .col-equity-item {
    margin-bottom: 10px;
    line-height: 20px;
  }

  .card-header h3 {
    width: 100px;
    margin: 0 130px 0 10px;
    font-size: 16px;
  }

  .card-header h4 {
    font-size: 14px;
  }

  .card-bottom {
    display: flex;
    height: 35px;
    justify-content: flex-end;
    align-items: center;
    background-color: #f8f8f8;
  }
  .basic-msg-right h3{
    margin-bottom: 30px;
  }
</style>
