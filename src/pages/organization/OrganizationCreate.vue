<template>
  <div id="organization_create">
    <el-container>
      <el-header class="page-header">
        <h1><i class="fa fa-plus"></i>新增单位</h1>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-university"></i>单位</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-plus"></i>新增单位</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>

         <!-- <el-form :model="myData.formData" ref="ruleForm" :rules="myData.formRule" label-width="120px">
            <el-form-item label="背景颜色" >
              <el-color-picker v-model="myData.formData.rushListStyle.iconColor" :predefine="myData.predefineColors"
                               @change="handleColorChange" color-format="hex"></el-color-picker>
            </el-form-item>
          </el-form>-->

          <el-form :model="myData.formData" ref="ruleForm" :rules="myData.formRule" label-width="120px"
                   class="create_form">
            <el-row class="form-block" v-for="(item,index) in myFormData">
              <h1>{{item.h1}}</h1>
              <el-form-item v-for="(form_item,form_index) in item.children" :label="form_item.label"
                            v-show="form_item.v_show" :prop="form_item.prop">
                <!--输入框-->
                <el-input v-if="form_item.type==='input'" v-model="myData.formData[form_item.val]"
                          :placeholder="form_item.placeholder"></el-input>

                <div v-if="form_item.type==='div'" :class="form_item.class">{{form_item.content}}
                </div>
                <!--选择器-->
                <el-select v-if="form_item.type==='select'" v-model="form_item.val" :disabled="form_item.disabled">
                  <el-option v-for="(item_selectOp,index_selectOp) in form_item.children" :label="item_selectOp.label"
                             :value="item_selectOp.val"></el-option>
                </el-select>
                <!--级联菜单-->
                <el-cascader v-if="form_item.type==='cascader'" expand-trigger="hover" :options="myData.areaList"
                             v-model="myData.formData[form_item.val]"
                             @change="handleAreaChange(form_item.prop,myData.formData[form_item.val])"
                             placeholder="请选择发货地区"></el-cascader>
                <!--开关-->
                <el-switch v-if="form_item.type==='switch'" v-model='myData.formData[form_item.val]'
                           :disabled="form_item.disabled" :active-value="1" :inactive-value="0"
                           active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <!--多选框-->
                <el-form-item v-if="form_item.type==='checkbox'" v-model='form_item.val'>
                  <el-checkbox-button v-for="(item_checkbox,index_checkbox) in form_item.children"
                                      :label="item_checkbox.label">
                  </el-checkbox-button>
                </el-form-item>
                <!--单选框-->
                <el-radio-group v-if="form_item.type==='radio'" v-model="myData.formData[form_item.val]">
                  <el-radio-button v-for="(item_radio,index_radio) in form_item.children" :label="item_radio.label"
                                   :disabled="item_radio.disabled">
                    {{item_radio.value}}
                  </el-radio-button>
                </el-radio-group>
                <!--日期时间-->
                <el-date-picker v-if="form_item.type==='datetime'" :type="form_item.type" v-model="form_item.val"
                                :placeholder="item.placeholder">
                </el-date-picker>
                <!--颜色选择器-->
                <!--<el-color-picker v-if="form_item.type==='color'" v-model="myData.formData[form_item.val]"
                                 :predefine="form_item.predefineColors"
                                 :color-formate="form_item.color_formate" @change="form_item.handleColorChange"></el-color-picker>-->
                <el-color-picker v-if="form_item.type==='color'" v-model="myData.formData[form_item.prop][form_item.val]"
                                 :predefine="myData.predefineColors"
                                 color-formate="hex" @change="form_item.handleColorChange"></el-color-picker>

                <!--图片上传-->
                <el-upload drag v-if="form_item.type==='upload'" :action="form_item.action" :name="form_item.name"
                           :on-success="form_item.uploadSuccess"
                           :on-preview="form_item.on_preview" :on-remove="form_item.on_remove"
                           :file-list="form_item.file_list"
                           :list-type="form_item.list_type" :multiple="form_item.multiple"
                           :disabled="form_item.disabled" :limit="form_item.limit" :on-exceed="form_item.on_exceed">
                  <!--:on-success="item.on_success"-->
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
                </el-upload>
              </el-form-item>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import tool from '../../assets/js_/tool'
  import areaList from '../../assets/js/areaList'
  import {mixinCreate} from "../../mixins/mixinCreate";

  var myData = {
    //【common】
    module: 'organization', //本模块名称
    own: 1, //是否只查询本商城
    // 【prepare】
    mainOperate: null, //getOptions后的主操作
    // 【form】
    formData: {
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
      //联系人信息
      name: null,
      gender: null,
      area_id: null,
      detail: null,
      tel: null,
      phone: null,
      email: null,
      tip: null,

      rushListStyle:{
        iconColor:null,
        bgColor:null,
      },
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
    //add
    areaList: areaList,	//区域列表
    predefineColors: ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
  };
  export default {
    mixins: [mixinCreate],
    name: "organization-create",
    data() {
      return {
        myData,
        myFormData: [
          {
            h1: '单位信息',
            children: [
              { //input
                "type": "input",
                "label": "单位名称",
                "prop": "og_name",
                "v_show": true,
                "placeholder": "单位名称",
                "val": 'og_name',
              },
              { //cascader
                "label": "单位区域",
                "type": "cascader",
                "v_show": true,
                "prop": "og_area_id",
                "disabled": false,
                "placeholder": "请选择单位区域",
                "val": 'og_area_id_array',
                "areaList": myData.areaList,
              },
              {
                "type": "div",
                "class": "el-form-item__error color_text_third",
                "content": "Tips : 此为在小程序商品列表中......",
                "v_show": true, //需要加上v_show
              },
              {
                "type": "input",
                "label": "单位地址",
                "prop": "og_detail",
                "v_show": true,
                "placeholder": "单位地址",
                "val": 'og_detail',
                "name": "og_detail",
              },
              {
                "type": "input",
                "label": "单位座机",
                "prop": "og_tel",
                "v_show": true,
                "placeholder": "单位座机",
                "val": "og_tel",
                "name": "og_tel",
              },
              {
                "type": "input",
                "label": "单位传真",
                "prop": "og_fax",
                "v_show": true,
                "placeholder": "单位传真",
                "val": "og_fax",
                "name": "og_fax",
              },
              {
                "type": "input",
                "label": "法人代表",
                "prop": "lr",
                "v_show": true,
                "placeholder": "法人代表",
                "val": "lr",
                "name": "lr",
              },
              {
                "type": "input",
                "label": "户名",
                "prop": "bank_name",
                "v_show": true,
                "placeholder": "户名",
                "val": "bank_name",
                "name": "bank_name",
              },
              {
                "type": "input",
                "label": "开户行",
                "prop": "bank",
                "v_show": true,
                "placeholder": "开户行",
                "val": "bank"
              },
              {
                "type": "input",
                "label": "开户行号",
                "prop": "bank_no",
                "v_show": true,
                "placeholder": "开户行号",
                "val": "bank_no"
              },
              {
                "type": "input",
                "label": "银行账号",
                "prop": "bank_account",
                "v_show": true,
                "placeholder": "银行账号",
                "val": "bank_account"
              },
              {
                "type": "input",
                "label": "税号",
                "prop": "og_invoice_no",
                "v_show": true,
                "placeholder": "单位纳税识别号",
                "val": "og_invoice_no"
              },
              /*{ //select
                "type": "select",
                "label": "活动区域",
                "v_show": true,
                "val": "3",
                children: [
                  {
                    "label": "区域zz",
                    "val": "区域zz",
                  },
                  {
                    "label": "区域xx",
                    "val": "区域xx"
                  },
                ]
              },*/
              /*{ //switch
                "label": "即时配送",
                "type": "switch",
                "v_show": true,
                "val": true,
              },*/
              { //checkbox
                "label": "分组",
                "type": "radio",
                "prop": "group",
                "v_show": true,
                "name": "group",
                "val": "group",
                children: [
                  {
                    "label": "0",
                    "value": "未分配"
                  },
                  {
                    "label": "2",
                    "value": "商城管理单位"
                  },
                  {
                    "label": "4",
                    "value": "客户单位"
                  },
                  {
                    "label": "6",
                    "value": "其他"
                  },
                ]
              },
              { //checkbox
                "label": "等级",
                "type": "radio",
                "prop": "level",
                "v_show": true,
                "name": "level",
                "val": "level",
                children: [
                  {
                    "label": "1",
                    "value": "1级"
                  },
                  {
                    "label": "2",
                    "value": "2级"
                  },
                  {
                    "label": "3",
                    "value": "3级"
                  },
                  {
                    "label": "4",
                    "value": "4级"
                  },
                  {
                    "label": "5",
                    "value": "5级"
                  },
                ]
              },
              { //checkbox
                "label": "来源",
                "type": "radio",
                "prop": "origin",
                "v_show": true,
                "name": "origin",
                "val": "origin",
                children: [
                  {
                    "label": "0",
                    "value": "后台上传",
                    "disabled": false,
                  },
                  {
                    "label": "1",
                    "value": "用户上传",
                    "disabled": true,
                  },
                ]
              },
              { //checkbox
                "label": "状态",
                "type": "radio",
                "prop": "status",
                "v_show": true,
                "name": "status",
                "val": "status",
                children: [
                  {
                    "label": "0",
                    "value": "禁用"
                  },
                  {
                    "label": "1",
                    "value": "可用",
                  },
                  {
                    "label": "2",
                    "value": "待审核",
                    "disabled": true,
                  },
                  {
                    "label": "3",
                    "value": "已拒绝",
                    "disabled": true,
                  },
                ]
              },
              /*{ //单选框
                "label": "特殊资源",
                "type": "radio",
                "v_show": true,
                "val": '',
                children: [
                  {
                    "label": "线上品牌商赞助",
                    "disabled": false,
                  }, {
                    "label": "线下场地免费",
                    "disabled": false,
                  },
                  {
                    "label": "线下场地免费",
                    "disabled": true,
                  }
                ]
              },
              { //日期时间选择器
                "label": "日期时间",
                "type": "datetime",
                "v_show": true,
                "val": '',
                "placeholder": "选择日期时间",
              },
              { //颜色选择器
                "label": "颜色",
                "type": "color",
                "val": '#409EFF',
                "v_show": true,
                "predefineColors": ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
                "color_formate": 'hex',
              },
              { //图片上传
                "label": "图片",
                "type": "upload",
                "v_show": true,
                "action": 'https://jsonplaceholder.typicode.com/posts/',
                "name": '',
                "on_success": function () {

                },
                "on_preview": function () {

                },
                "on_remove": function () {

                },
                "file_list": [],
                "list_type": 'picture',
                "multiple": 'multiple',
                "disabled": false,
              },*/
            ],
          },
          {
            h1: '联系人信息',
            children: [
              { //input
                "type": "input",
                "label": "姓名",
                "prop": "name",
                "v_show": true,
                "name": "name",
                "placeholder": "姓名",
                "val": ""
              },
              { //单选框
                "label": "性别",
                "type": "radio",
                "prop": "gender",
                "name": "gender",
                "v_show": true,
                "val": 'gender',
                children: [
                  {
                    "label": "0",
                    "value": "未知",
                    "disabled": false,
                  }, {
                    "label": "1",
                    "value": "男",
                    "disabled": false,
                  },
                  {
                    "label": "2",
                    "value": "女",
                    "disabled": false,
                  }
                ]
              },
              { //cascader
                "label": "区域",
                "type": "cascader",
                "v_show": true,
                "prop": "area_id",
                "disabled": false,
                "placeholder": "请选择发货区域",
                "val": 'area_id_array',
                "areaList": myData.areaList,
              },
              { //input
                "type": "input",
                "label": "地址",
                "prop": "detail",
                "name": "detail",
                "v_show": true,
                "placeholder": "地址",
                "val": ""
              },
              { //input
                "type": "input",
                "label": "座机",
                "prop": "tel",
                "name": "tel",
                "v_show": true,
                "placeholder": "座机",
                "val": ""
              },
              { //input
                "type": "input",
                "label": "手机",
                "prop": "phone",
                "v_show": true,
                "placeholder": "手机",
                "name": "phone",
                "val": ""
              },
              { //input
                "type": "input",
                "label": "邮箱",
                "prop": "email",
                "v_show": true,
                "placeholder": "邮箱",
                "name": "email",
                "val": ""
              },
              { //input
                "type": "input",
                "label": "备注",
                "prop": "tip",
                "v_show": true,
                "name": "tip",
                "placeholder": "备注",
                "val": ""
              },
              { //switch
                "label": "上架",
                "prop": "status1",
                "type": "switch",
                "v_show": true,
                "disabled": false,
                "val": "status1",
              },
              /*{ //select
                "type": "select",
                "label": "活动区域",
                "v_show": true,
                "val": "3",
                children: [
                  {
                    "label": "区域zz",
                    "val": "区域zz",
                  },
                  {
                    "label": "区域xx",
                    "val": "区域xx"
                  },
                ]
              },
              { //checkbox
                "label": "活动性质",
                "type": "checkbox",
                "v_show": true,
                "val": [],
                children: [
                  {
                    "label": "美食",
                  },
                  {
                    "label": "地推活动",
                  },
                  {
                    "label": "线下主题活动",
                  },
                ]
              },
              { //日期时间选择器
                "label": "日期时间",
                "type": "datetime",
                "v_show": true,
                "val": '',
                "placeholder": "选择日期时间",
              },
              { //颜色选择器
                "label": "颜色",
                "type": "color",
                "val": '#409EFF',
                "v_show": true,
                "predefineColors": ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
                "color_formate": 'hex',
              },*/
            ],
          },
          {
            h1: '图像资料',
            children: [
              { //图片上传
                "label": "缩略图",
                "type": "upload",
                "v_show": true,
                "action": 'https://jsonplaceholder.typicode.com/posts/',
                "name": 'normal_thumbnail_upload',
                "on_success": this.uploadSuccess,
                "on_preview": this.handlePreview,
                "on_remove": this.handleRemove,
                //"file_list": this.fileList[0],
                "list_type": 'picture',
                "disabled": false,
                "multiple": false,
                "limit": "1",
                "on_exceed": this.handleOverLimit,
              },
            ]
          },
          {
            h1: '抢购列表配置',
            children: [
              { //图标颜色
                "type":"color",
                "label": "图标颜色",
                "prop": "rushListStyle",
                "v_show": true,
                "val": "iconColor",
                "predefineColors": myData.predefineColors,
                "handleColorChange": this.handleColorChange,
                "color_formate": "hex",
              },
              { //bgcolor
                "type":"color",
                "label":"背景颜色",
                "prop":"rushListStyle",
                "v-show":true,
                "val":"bgColor",
                "predefineColors":myData.predefineColors,
                "handleColorChange":this.handleColorChange,
                "color_formate":"hex",

              }
            ]
          },
        ]
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
          //联系人信息
          name: myData.formData.name,
          gender: myData.formData.gender,
          area_id: myData.formData.area_id,
          detail: myData.formData.detail,
          tel: myData.formData.tel,
          phone: myData.formData.phone,
          email: myData.formData.email,
          tip: myData.formData.tip,

          //test
          status1: myData.formData.status1,
          rushListStyle:myData.formData.rushListStyle,
        }
        console.log(myData.formData.rushListStyle)
        // detail 页面需要传入condition
        var condition = {}
        condition[myData.primary_key_name] = myData.primary_key_value
        var res = await tool.submitForm(that, myData.module + '/ajax_c', 'c', formName, postData)
        await tool.sleep(500)
        myData.loading = false
        myData.disabled = false
      },

      //------------------------------要定义的地方------------------------------
      handleAreaChange: function (prop, value) {
        if (prop === 'og_area_id') {  //单位区域
          myData.formData.og_area_id_array = value
          myData.formData.og_area_id = value[2]
        } else if (prop === 'area_id') { //区域
          myData.formData.area_id_array = value
          myData.formData.area_id = value[2]
        }
      },
      handleColorChange(value) {
        console.log("Color:" +value)
        var that = this
        var flag = myData.predefineColors.indexOf(value)
        if (flag == -1) {
          myData.formData.color_hex = null
          myData.formData.color = null
          tool.showModal(that, '抱歉，暂时不支持自定义，请从给出的十种色彩种选择一种')
        } else {
          //myData.formData.color = myData.color_array[flag]
          myData.formData.color = myData.predefineColors[flag]
        }
      },

    },
  }
</script>
