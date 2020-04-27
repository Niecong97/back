<template>
  <div id="staff-create">
    <el-container>
      <el-header class="page-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-vcard"></i>职员</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-plus primary-color"></i><span class="primary-color">新增职员</span></el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-form :model="myData.formData" ref="myData.ruleForm" :rules="myData.formRule" label-width="120px"
                   class="create_form card-create-form">
            <el-row class="basic-msg" :gutter="30">
              <el-col :span="6">
                <h3 class="block-name">个人信息</h3>
              </el-col>
              <el-col :span="18">
                <el-form-item label="姓名" prop="type">
                  <el-input type="text" v-model="myData.formData.name" placeholder="职员姓名" style="width: auto;"></el-input>
                </el-form-item>
                <el-form-item label="照片" prop="name">
                  <el-upload drag action="/admin/Index/ajax_upload" name="logo_url_upload"
                             :on-success="uploadSuccess" :on-preview="handlePreview" :on-remove="handleRemove"
                             :file-list="fileList[0]" list-type="picture" multiple :disabled="disabled"
                             :multiple="false" :limit="1" :on-exceed="handleOverLimit">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="性别">
                  <el-radio-group v-model="myData.formData.name">
                    <el-radio-button label="0">男</el-radio-button>
                    <el-radio-button label="1">女</el-radio-button>
                    <el-radio-button label="2">未知</el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="用户组">
                  <el-radio-group v-model="myData.formData.name">
                    <el-radio-button label="0">未分配</el-radio-button>
                    <el-radio-button label="1">开发者</el-radio-button>
                    <el-radio-button label="2">超级管理员</el-radio-button>
                    <el-radio-button label="3">管理员</el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="区域">
                  <el-select v-model="myData.formData.name" placeholder="请选择地区">
                    <el-option v-for="item in myData.formData.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="地址">
                  <el-input type="textarea" v-model="myData.formData.name" placeholder="请填写详细地址"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input type="text" v-model="myData.formData.name" placeholder="请填写手机号" style="width: auto"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="basic-msg" :gutter="30">
              <el-col :span="6">
                <h3 class="block-name">账户信息</h3>
              </el-col>
              <el-col :span="18">
                <el-form-item label="账号" prop="type">
                  <el-input type="text" v-model="myData.formData.name" placeholder="职员账号" style="width: auto;"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="type">
                  <el-input type="text" v-model="myData.formData.name" placeholder="职员密码" style="width: auto;"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="btn-create">
              <el-button type="primary" :disabled="disabled">立即创建
              </el-button>
              <el-button :disabled="disabled">重置
              </el-button>
            </div>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import tool from '../../assets/js_/tool'
  import {mixinCreate} from "../../mixins/mixinCreate";

  var myData = {
    /* 【common】 */
    module: 'card', //本模块名称
    own: 1, //是否只查询本商城
    /* 【prepare】 */
    loading: true, //页面读取态
    disabled: true, //页面禁用态
    mainOperate: null, //getOptions后的主操作
    /* 【form】 */
    formData: {
      type:null,
      name:null,
      status:null,
      color_hex: null, //颜色的16进制值

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
      card_type: [{
        required: true,
        message: '请选择卡券类型',
        trigger: 'change'
      }]
    }, //表单验证规则
    fileList: [], //已上传文件列表
    fileName: [],//本页需要上传的文件名称

    predefineColors: ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
  }

  export default {
    mixins:[mixinCreate],
    data() {
      return{
        myData
      }
    },
    methods: {

    },
  }

  //app.prepare()
</script>
<style>
  @import "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css";
  @import '../../assets/css/style.css';

  .card-create-form{
    width: 80%;
    margin: 0 auto;
  }
  .card-create-form .el-form-item__label{
    width: 120px;
    text-align: left;
  }
  .card-create-form .el-textarea__inner{
    padding: 5px 15px;
    border:1px solid #dcdfe6;
  }
  .basic-msg{
    margin-top: 20px;
    border-bottom: 1px solid #ededed;
  }
</style>
