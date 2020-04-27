<template>
  <div class="comp-edit rich-text-style">
    <el-form class="blank" label-width="100px">
      <el-form-item label="上下边距">
        <el-slider v-model="componentVal.paddingTop" :min="silderMin" :max="silderMax"
                   @change="changePaddingTop"></el-slider>
        <span class="notice-pix">{{componentVal.paddingTop}}(像素)</span>
      </el-form-item>
      <el-form-item label="左右边距">
        <el-slider v-model="componentVal.paddingLeft" :min="silderMin" :max="silderMax"
                   @change="changePaddingLeft"></el-slider>
        <span class="notice-pix">{{componentVal.paddingLeft}}(像素)</span>
      </el-form-item>
      <el-form-item label="背景颜色">
        <div class="dis-flex">
          <el-color-picker v-model="componentVal.bgColor" :predefine="predefineColors"
                           color-format="hex" size="medium" @change="changeBgColor"></el-color-picker>
          <el-button size="small" @click="resetColor('bgColor')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>

    <!--富文本-->
    <quill-editor v-model="componentVal.textContext" ref="myQuillEditor" :options="editorOption"  @change="onEditorChange($event)"><!--@blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)" @ready="onEditorReady($event)"-->
    </quill-editor>

    <!--图片库-->
    <el-dialog custom-class="my-img-group" title="图片库" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-row>
        <el-col :span="4">
          <aside class="img-group">
            <ul class="group-all">
              <li class="item-group">全部</li>
              <li class="item-group">未分组</li>
              <li class="item-group">分组1</li>
            </ul>
            <div class="add-group primary-color">新增分组</div>
          </aside>
        </el-col>
        <el-col :span="20">
          <section class="img-operate">
            <div class="remove">
              <el-button type="primary" size="mini">移动至</el-button>
              <el-button icon="el-icon-delete" type="danger" size="mini">删除</el-button>
            </div>
            <div class="upload-operate">
              <el-button icon="el-icon-upload" type="primary" size="small">上传图片</el-button>
            </div>
          </section>
          <section class="upload-img-box">
            <div class="upload-list-item" v-for="item in 20">
              <div class="upload-img-wrap">
                <img src="http://static.yoshop.xany6.com/20180928170741995264498.png" alt="">
              </div>
              <p class="upload-img-name">201900000000.png</p>
            </div>
          </section>
          <section class="upload-page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 50]"
              :total="60">
            </el-pagination>
          </section>
          <div class="upload-dialog-operate">
            <el-button type="primary" size="mini">确定</el-button>
            <el-button size="mini">取消</el-button>
          </div>
        </el-col>
      </el-row>

    </el-dialog>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'


  export default {
    props: ['selectComp'],
    name: "rich-text-style",
    data() {
      return {
        groupActive:null,
        currentPage: 1,
        content: null,
        dialogVisible: false,
        editorOption: {
          placeholder: '请输入内容',
          modules: {
            toolbar: [['bold', 'italic', 'underline', 'strike'],
              ['image'],
             /* [{'header': 1}, {'header': 2}],*/
              [{'color': []}, {'background': []}],
              [{'font': []}],
              [{'align': []}],
                [{'size': ['small', false, 'large', 'huge']}],
            ]
          },
          theme: 'snow'
        },
        Num: null,
        predefineColors: ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
        silderMin: 0,
        silderMax: 20,
        componentVal: this.selectComp,
        formData: {
          bgColor: null,
          height: null,
        }
      }
    },
    methods: {
      changePaddingTop(val) {
        this.selectComp.paddingTop = val
      },
      changePaddingLeft(val) {
        this.selectComp.paddingLeft = val
      },
      changeBgColor(val) {
        this.selectComp.bgColor = val
      },
      resetColor() {
        this.selectComp.bgColor = '#ffffff'
      },

      showImageUI() {
        this.dialogVisible = true
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    created() {
      this.componentVal = this.selectComp
    },
    mounted() {
      var that = this
      //选择了当前组件后， 更改组件样式的值
      Bus.$on('item', (data) => {
        this.componentVal = data
      })

      //富文本 自定义图片上传
      this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.showImageUI)
    },
    components: {
      quillEditor
    }
  }
</script>

<style scoped>
  .blank .el-form-item {
    margin: 0;
  }

  .notice-pix {
    position: absolute;
    right: 0;
    top: 0;
  }

  .blank .el-radio + .el-radio {
    margin-left: 12px;
  }
</style>

<style>
  .blank .el-slider__runway {
    width: 60%;
  }
  .rich-text-style .quill-editor {
    height: 300px;
    margin-top: 20px;
  }

  .my-img-group .group-all {
    list-style: none;
  }

  .my-img-group .el-dialog__body {
    padding: 0;
  }

  .my-img-group.el-dialog {
    width: 850px;
  }

  .my-img-group .group-all li {
    padding: 10px 20px;
    margin-bottom: 1px;
  }

  .my-img-group .group-all li:hover {
    background: rgba(48, 145, 242, 0.1);;
    border-radius: 6px;
  }

  .my-img-group .add-group {
    padding: 15px 20px;
    cursor: pointer;
  }

  .my-img-group .upload-img-box {
    display: flex;
    flex-wrap: wrap;
    height: 335px;
    overflow-y: auto;
  }

  .my-img-group .add-group:hover {
    color: #007dff !important
  }

  .my-img-group .upload-list-item {
    padding: 10px;
    margin: 10px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    cursor: pointer;
    border-radius: 4px;
  }

  .my-img-group .upload-list-item:hover {
    border-color: #409EFF;
    transition: 0.5s;
  }

  .my-img-group .img-operate {
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
  }

  .upload-page {
    padding: 10px 0;
  }

  .upload-page .el-pagination {
    display: flex;
  }

  .upload-page .el-pagination__editor.el-input .el-input__inner {
    height: 24px;
  }

  .upload-dialog-operate {
    float: right;
    padding: 0 15px 10px;
  }
</style>
