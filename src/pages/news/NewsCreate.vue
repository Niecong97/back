<template>
  <div class="news-create">
    <el-dialog title="新增新闻" :visible.sync="myData.dialogNewsCreate" :close-on-click-modal="false">
      <div class="news-create-wrap">
        <el-form :model="myData.formData" ref="myData.ruleForm" :rules="myData.formRule" label-width="120px"
                 class="normal-create-form">
          <el-row class="news-msg">
            <el-col :span="24">
              <el-form-item label="标题" prop="name">
                <el-input type="text" v-model="myData.formData.name" placeholder="新闻标题" :minlength="1"
                          :maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="新闻类型" prop="type">
                <el-radio-group v-model="myData.formData.type">
                  <el-radio-button label="0">系统</el-radio-button>
                  <el-radio-button label="1">公告</el-radio-button>
                  <el-radio-button label="2">新闻</el-radio-button>
                  <el-radio-button label="3">活动</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="作者" prop="name">
                <el-input type="text" v-model="myData.formData.author" placeholder="作者"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <!--富文本-->
              <el-form-item label="内容" prop="content">
                <quill-editor v-model="myData.formData.textContext" placeholder="请输入..." ref="myQuillEditor">
                </quill-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="btn-create-normal">
            <el-button type="primary">立即创建
            </el-button>
            <el-button>重置
            </el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import tool from '../../assets/js_/tool'
  import areaList from '../../assets/js/areaList'
  import {mixinCreate} from "../../mixins/mixinCreate";

  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  var myData = {
    /* 【common】 */
    module: 'news', //本模块名称
    own: 1, //是否只查询本商城

    /* 【prepare】 */
    requireList: {}, //请求的数据
    requireData: {}, //请求数据的容器
    /* 【form】 */
    formData: {
      //基础信息
      textContext:null,
      author:null,
      type: null,
      name: null,
      choice_spec: [],
      //首屏参数
      model: null,
      spec: null,
      min_amount: null,
      min_unit: null,
      package_amount: null,
      package_amount_unit: null,
      //图片资料
      thumbnail: null,
      gallery_image: [],
      detail_image: [],


      //【不提交的内容】
      // sort_type_id_input: null,
      supplier_id_input: null,
      shop_id_input: null,
    }, //表单数据，并非一定完整传递出去，可能需要再post之前处理
    fileName: ['thumbnail', 'gallery_image', 'detail_image'], //本页需要上传的文件名称
    dialogNewsCreate:false,

  };

  export default {
    props:['showNewsCreate'],
    name: "news-create",
    data() {
      return {
        myData,
      }
    },
    methods: {

    },
    created() {
    },
    watch:{
      showNewsCreate(){
        myData.dialogNewsCreate = true
      }
    },
    components:{
      quillEditor
    }
  }
</script>


<style>
  .news-create{
    padding: 30px;
  }
  .news-create .ql-editor{
    height: 350px;
  }
  .news-create .ql-snow .ql-picker{
    height: auto;
  }
  .btn-create-normal{
    text-align: right;
    margin-top: 30px;
  }
  .news-create .el-dialog{
    margin-top: 10vh !important;
    height: 80vh;
    overflow: auto;
  }
</style>
