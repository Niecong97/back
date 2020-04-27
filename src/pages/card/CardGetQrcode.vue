<template>
  <div id="card_getQrcode">
    <el-container>
      <el-header class="page-header">
        <!--<h1><i class="fa fa-plus"></i>投放卡券</h1>-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- <el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>-->
          <el-breadcrumb-item><i class="fa fa-vcard"></i>卡券</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-plus primary-color"></i><span class="primary-color">投放卡券</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-form :model="myData.formData" ref="myData.ruleForm" :rules="myData.formRule" label-width="100px"
                   class="create_form cardQrcode-form">

            <el-row class="basic-msg" :gutter="20">
              <el-col :span="12" class="basic-msg-left">
                <el-form-item label="是否指定用户" label-width="120px">
                  <el-radio-group v-model="myData.formData.name">
                    <el-radio-button label="0">指定用户</el-radio-button>
                    <el-radio-button label="1">不指定用户</el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="会员卡编号" v-if="myData.formData.name==0" label-width="120px">
                  <el-input type="text" v-model="myData.formData.member_card_code" placeholder="请填写用户会员卡编号"
                            class="auto-width"></el-input>
                </el-form-item>

                <el-form-item label="接收的卡券" label-width="120px">
                  <el-select v-model="myData.formData.cards" placeholder="请选择卡券">
                    <el-option v-for="item in myData.formData.options" :label="item.label"
                               :value="item.value"></el-option>
                  </el-select>
                  <el-input type="number" placeholder="数量" v-model="myData.formData.name" style="width: 180px;">
                    <template slot="append">张</template>
                  </el-input>
                </el-form-item>

                <el-form-item label="有效时间" prop="name" label-width="120px">
                  <el-radio-group v-model="myData.formData.type">
                    <el-radio-button label="0">固定日期区间</el-radio-button>
                    <el-radio-button label="1">固定时长</el-radio-button>
                    <el-radio-button label="2">永久</el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="日期区间" prop="name" v-if="myData.formData.type==0">
                  <el-date-picker
                    v-model="myData.formData.name"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="领取后生效" v-if="myData.formData.type==1">
                  <el-input type="text" v-model="myData.formData.name" placeholder="领取后几天生效" class="auto-width">
                    <template slot="append">天</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="领取后有效" v-if="myData.formData.type==1">
                  <el-input type="text" v-model="myData.formData.name" placeholder="领取后几天有效" class="auto-width">
                    <template slot="append">天</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="全部过期时间" v-if="myData.formData.type==1">
                  <el-date-picker v-model="myData.formData.name" type="datetime" placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12" class="basic-msg-right">
                <h3>会员信息</h3>
                <el-form-item label="头像" prop="avatarUrl">
                  <img src="../../assets/img/avatar-1.jpg" alt="">
                </el-form-item>
                <el-form-item label="编号">
                  11111111111111
                </el-form-item>
                <el-form-item label="昵称">
                  aaa
                </el-form-item>
                <el-form-item label="余额" prop="balance">
                  ￥111.11
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                  aa
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                  111111111
                </el-form-item>

                <el-form-item class="btn-create">
                  <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
  }

  .btn-create {
    text-align: left;
  }

  .basic-msg-left {
    padding-left: 60px;
  }

  .basic-msg-right h3 {
    margin-bottom: 30px;
  }

</style>
