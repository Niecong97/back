<template>
  <div id="organization_detail">
    <el-container>
      <el-header class="page-header">
        <h1>单位详情</h1>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-university"></i>单位</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-info"></i>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <!--<el-main>
          <el-form :model="formData" ref="ruleForm" :rules="formRule" label-width="120px" class="form_create">
            <el-row class="form-block">
              <h1>单位信息</h1>
              <el-form-item label="单位名称" prop="og_name">
                <el-input type="text" v-model="formData.og_name" placeholder="单位名称" :minlength="1"
                          :maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="单位区域" prop="og_area">
                <el-cascader expand-trigger="hover" :options="areaList" v-model="formData.og_area_id_array"
                             @change="handleCoAreaChange" style="width:100%;" placeholder="单位地区"></el-cascader>
              </el-form-item>
              <el-form-item label="单位地址" prop="og_detail">
                <el-input type="text" v-model="formData.og_detail" placeholder="单位地址" :minlength="0"
                          :maxlength="200"></el-input>
              </el-form-item>
              <el-form-item label="单位座机" prop="og_tel">
                <el-input type="text" v-model="formData.og_tel" placeholder="单位座机" :minlength="0"
                          :maxlength="12"></el-input>
              </el-form-item>
              <el-form-item label="单位传真" prop="og_fax">
                <el-input type="text" v-model="formData.og_fax" placeholder="单位传真" :minlength="0"
                          :maxlength="12"></el-input>
              </el-form-item>
              <el-form-item label="法人代表" prop="lr">
                <el-input type="text" v-model="formData.lr" placeholder="法人代表" :minlength="0"
                          :maxlength="12"></el-input>
              </el-form-item>
              <el-form-item label="开户行" prop="bank">
                <el-input type="text" v-model="formData.bank" placeholder="开户行" :minlength="0"
                          :maxlength="12"></el-input>
              </el-form-item>
              <el-form-item label="开户行号" prop="bank_no">
                <el-input type="number" v-model="formData.bank_no" placeholder="开户行号"></el-input>
              </el-form-item>
              <el-form-item label="银行账号" prop="bank_account">
                <el-input type="text" v-model="formData.bank_account" placeholder="银行账号" :minlength="0"
                          :maxlength="12"></el-input>
              </el-form-item>
              &lt;!&ndash;<el-form-item label="税号" prop="og_invoice_no">
                                  <el-input type="text" v-model="formData.og_invoice_no" placeholder="纳统一社会信用代码" :minlength="0" :maxlength="50"></el-input>
                              </el-form-item>&ndash;&gt;
              <el-form-item label="税号" prop="og_invoice_no">
                <el-input type="text" v-model="formData.og_invoice_no" placeholder="单位纳税识别号" :minlength="0"
                          :maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="分组" prop="group">
                <el-radio-group v-model="formData.group">
                  <el-radio-button label="0">未分配</el-radio-button>
                  &lt;!&ndash;<el-radio-button label="1">开发单位</el-radio-button>&ndash;&gt;
                  <el-radio-button label="2">商城管理单位</el-radio-button>
                  &lt;!&ndash;<el-radio-button label="3">供货商单位</el-radio-button>&ndash;&gt;
                  <el-radio-button label="4">客户单位</el-radio-button>
                  &lt;!&ndash;<el-radio-button label="5">物流单位</el-radio-button>&ndash;&gt;
                  <el-radio-button label="6">其他</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="等级" prop="level">
                <el-radio-group v-model="formData.level">
                  <el-radio-button label="1">1级</el-radio-button>
                  <el-radio-button label="2">2级</el-radio-button>
                  <el-radio-button label="3">3级</el-radio-button>
                  <el-radio-button label="4">4级</el-radio-button>
                  <el-radio-button label="5">5级</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="来源" prop="origin">
                <el-radio-group v-model="formData.origin">
                  <el-radio-button label="0">后台上传</el-radio-button>
                  <el-radio-button label="1" disabled>用户上传</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-radio-group v-model="formData.status">
                  <el-radio-button label="0">禁用</el-radio-button>
                  <el-radio-button label="1">可用</el-radio-button>
                  <el-radio-button label="2" disabled>待审核</el-radio-button>
                  <el-radio-button label="3" disabled>已拒绝</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-row>
            <el-row class="form-block">
              <h1>联系人信息</h1>
              <el-form-item label="姓名" prop="name">
                <el-input type="text" v-model="formData.name" placeholder="姓名" :minlength="0"
                          :maxlength="25"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="formData.gender">
                  <el-radio-button label="0">未知</el-radio-button>
                  <el-radio-button label="1">男</el-radio-button>
                  <el-radio-button label="2">女</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="区域" prop="area">
                <el-cascader expand-trigger="hover" :options="areaList" v-model="formData.area_id_array"
                             @change="handleAreaChange" style="width:100%;" placeholder="请选择发货地区"></el-cascader>
              </el-form-item>
              <el-form-item label="地址" prop="detail">
                <el-input type="text" v-model="formData.detail" placeholder="地址" :minlength="0"
                          :maxlength="25"></el-input>
              </el-form-item>
              <el-form-item label="座机" prop="tel">
                <el-input type="text" v-model="formData.tel" placeholder="座机" :minlength="0" :maxlength="12"></el-input>
              </el-form-item>
              <el-form-item label="手机" prop="phone">
                <el-input type="text" v-model="formData.phone" placeholder="手机" :minlength="0"
                          :maxlength="11"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="formData.email" placeholder="邮箱" :minlength="0"
                          :maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="tip">
                <el-input type="text" v-model="formData.tip" placeholder="备注" :minlength="0"
                          :maxlength="65532"></el-input>
              </el-form-item>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-main>-->
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {mixinDetail} from "../../mixins/mixinDetail";
  import tool from '../../assets/js_/tool'

  var myData = {
    /* 【common】 */
    module: 'organization', //本模块名称
    own: 1, //是否只查询本商城
    /* 【prepare】 */
    loading: true, //页面读取态
    disabled: true, //页面禁用态
    requireList: {}, //请求的数据
    requireData: {}, //请求数据的容器
    mainOperate: 'getDetail', //getOptions后的主操作
    /* 【form】 */
    formData: {
      //单位信息
      og_name: null,
      og_area_id: null,
      og_detail: null,
      og_tel: null,
      og_fax: null,
      og_invoice_number: null,
      group: null,
      level: null,
      origin: 0,
      status: null,
      lr: null,    //法人代表
      bank: null,  //开户行
      bank_account: null,  //银行账号
      bank_no: null,   //开户行号
      //联系人信息
      name: null,
      gender: null,
      area_id: null,
      detail: null,
      tel: null,
      phone: null,
      email: null,
      tip: null,
      //以下不需要上传
      og_area_id_array: [],
      area_id_array: [],
    }, //表单数据，并非一定完整传递出去，可能需要再post之前处理
    formRule: {
      og_name: [{
        required: true,
        message: '请输入单位名称',
        trigger: 'blur'
      },
        {
          min: 1,
          max: 50,
          message: '长度在 1 到 50 个字符',
          trigger: 'blur'
        }
      ],
      group: [{
        required: true,
        message: '请选择分组',
        trigger: 'change'
      }],
      level: [{
        required: true,
        message: '请选择等级',
        trigger: 'change'
      }],
      origin: [{
        required: true,
        message: '请选择来源',
        trigger: 'change'
      }],
      status: [{
        required: true,
        message: '请选择状态',
        trigger: 'change'
      }],
    }, //表单验证规则
    fileList: [], //已上传文件列表
    fileName: [],//本页需要上传的文件名称
    /* 【getDetail】 */
    primary_key_name: 'og_id', //主键名称
    primary_key_value: null, //主键值 来自get参数
    oldData: [], //存放记录的旧数据
    //add
   	//区域列表
  };
  export default {
    mixins: [mixinDetail],
    name: "organization-detail",
    data() {
      return {
        myData
      }
    },
    methods: {
      //【提交】
      async submitForm(formName) {
        var that = this
        that.loading = true
        that.disabled = true
        // 处理post数据
        var postData = {
          //单位信息
          og_name: myData.formData.og_name,
          og_area_id: myData.formData.og_area_id,
          og_detail: myData.formData.og_detail,
          og_tel: myData.formData.og_tel,
          og_fax: myData.formData.og_fax,
          og_invoice_number: myData.formData.og_invoice_number,
          group: myData.formData.group,
          level: myData.formData.level,
          origin: 0,
          status: myData.formData.status,
          lr: myData.formData.lr,
          bank: myData.formData.bank,
          bank_account: myData.formData.bank_account,
          bank_no: myData.formData.bank_no,
          //联系人信息
          name: myData.formData.name,
          gender: myData.formData.gender,
          area_id: myData.formData.area_id,
          detail: myData.formData.detail,
          tel: myData.formData.tel,
          phone: myData.formData.phone,
          email: myData.formData.email,
          tip: myData.formData.tip
        }
        // detail 页面需要传入condition
        var condition = {}
        condition[myData.primary_key_name] = that.primary_key_value
        var res = await tool.submitForm(that, that.myData.module + '/ajax_u', 'u', formName, postData, condition)
        await tool.sleep(500)
        that.loading = false
        that.disabled = false
      },
      handleCoAreaChange: function (value) {
        //【地区选择】
        myData.formData.og_area_id_array = value
        myData.formData.og_area_id = value[2]
      },
      handleAreaChange: function (value) {
        //【地区选择】
        myData.formData.area_id_array = value
        myData.formData.area_id = value[2]
      },
    }
  }
</script>

