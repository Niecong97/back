<template>
  <div id="card_create">
    <el-container>
      <el-header class="page-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-vcard"></i>卡券</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-plus primary-color"></i><span class="primary-color">创建卡券</span></el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-form :model="myData.formData" ref="myData.ruleForm" :rules="myData.formRule" label-width="120px"
                   class="create_form card-create-form">
            <el-row class="basic-msg" :gutter="30">
              <el-col :span="6">
                <h3 class="block-name">卡券详情</h3>
              </el-col>
              <el-col :span="18">
                <el-form-item label="卡券类型" prop="type">
                  <el-radio-group v-model="myData.formData.type">
                    <el-radio-button label="0">团购券</el-radio-button>
                    <el-radio-button label="1">兑换券</el-radio-button>
                    <el-radio-button label="2">会员卡</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="卡券名称" prop="name">
                  <el-input type="text" v-model="myData.formData.name" placeholder="卡券名称" :minlength="1"
                            :maxlength="50" :disabled="myData.disabled" class="auto-width"></el-input>
                </el-form-item>
                <el-form-item label="使用提醒" prop="name">
                  <el-input type="textarea" v-model="myData.formData.name"></el-input>
                </el-form-item>
                <el-form-item label="使用说明" prop="name">
                  <el-input type="textarea" v-model="myData.formData.name"></el-input>
                </el-form-item>
                <el-form-item label="库存数量" prop="name">
                  <el-input type="text" v-model="myData.formData.name" placeholder="库存数量" :minlength="1"
                            :maxlength="50" :disabled="myData.disabled" class="auto-width">
                    <template slot="append">张</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="特权说明" prop="name">
                  <el-input type="textarea" v-model="myData.formData.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="name">
                  <el-input type="text" v-model="myData.formData.name" placeholder="电话" :minlength="1"
                            :maxlength="50" :disabled="myData.disabled" class="auto-width"></el-input>
                </el-form-item>
                <el-form-item label="卡券状态" prop="status">
                  <el-switch v-model="myData.formData.status" :active-value="1" :inactive-value="0"
                             active-color="#13ce66" inactive-color="#ff4949"
                             :disabled="myData.disabled"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="basic-msg" :gutter="30">
              <el-col :span="6">
                <h3 class="block-name">卡券外观</h3>
              </el-col>
              <el-col :span="18">
                <el-form-item label="卡券颜色" prop="type">
                  <el-color-picker v-model="myData.formData.color_hex" :predefine="myData.predefineColors"
                                   color-format="hex"></el-color-picker>
                </el-form-item>
                <el-form-item label="卡券logo" prop="name">
                  <el-upload drag action="/admin/Index/ajax_upload" name="logo_url_upload"
                             :on-success="uploadSuccess" :on-preview="handlePreview" :on-remove="handleRemove"
                             :file-list="fileList[0]" list-type="picture" multiple :disabled="disabled"
                             :multiple="false" :limit="1" :on-exceed="handleOverLimit">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="basic-msg" :gutter="30">
              <el-col :span="6">
                <h3 class="block-name">条件及限制</h3>
              </el-col>
              <el-col :span="18">
                <el-form-item label="每人限领" prop="type">
                  <el-input type="text" v-model="myData.formData.name" :minlength="1"
                            :maxlength="50" :disabled="myData.disabled" class="auto-width">
                   <template slot="append">张</template>
                 </el-input>
                </el-form-item>
                <el-form-item label="日期类型" prop="name">
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
