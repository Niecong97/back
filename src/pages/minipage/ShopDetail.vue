<template>
  <div id="shop_detail">
    <el-container>
      <el-header class="page-header">
        <h1><i class="fa fa-info"></i>商城详情</h1>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-file-o"></i>页面</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-info"></i>商城详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <!--<el-container>
        <el-main>
          <el-form :model="formData" ref="ruleForm" :rules="formRule" label-width="120px" class="create_form">
            <el-row class="form-block">
              <el-form-item label="商城" prop="shop_id">
                <el-select v-model="formData.shop_id" placeholder="请选择商城" @change="handleShopChange"
                           :disabled="disabled">
                  <el-option v-for="item in requireData.shop_id_list" :key="item.value"
                             :label="item.label" :value="item.value"></el-option>
                </el-select>
                &lt;!&ndash;<el-input v-model="formData.shop_id_input" placeholder="商城编号"&ndash;&gt;
                &lt;!&ndash;style="width:auto;" :disabled="disabled">&ndash;&gt;
                &lt;!&ndash;<el-button slot="append" icon="el-icon-search"&ndash;&gt;
                &lt;!&ndash;@click="searchList('shop_id')"></el-button>&ndash;&gt;
                &lt;!&ndash;</el-input>&ndash;&gt;
              </el-form-item>
              <el-form-item label="滚动窗" prop="gallery_img">
                <el-upload drag action="/admin/Index/ajax_upload" name="index_gallery_upload"
                           :on-success="uploadSuccess" :on-preview="handlePreview" :on-remove="handleRemove"
                           :file-list="fileList[0]" list-type="picture" multiple :disabled="disabled">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="地址" prop="address">
                <el-input type="text" v-model="formData.address" placeholder="地址"></el-input>
              </el-form-item>


              <el-form-item label="简介" prop="desc">
                <el-input type="text" v-model="formData.desc" placeholder="简介"></el-input>
              </el-form-item>
              <el-form-item label="服务" prop="service">
                <el-input type="text" v-model="formData.service" placeholder="服务"></el-input>
              </el-form-item>


              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disabled">立即修改
                </el-button>
                <el-button @click="resetForm('ruleForm')" :disabled="disabled">重置
                </el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-main>
      </el-container>-->
    </el-container>
  </div>
</template>

<script>
  import {mixinDetail} from "../../mixins/mixinDetail";
  var myData = {
    /* 【common】 */
    module: 'mini_page', //本模块名称
    own: 1, //是否只查询本商城
    /* 【prepare】 */
    requireList: {
      shop_id_list: 1,
      sort_type_id_list: 1,
    }, //请求的数据
    requireData: {
      shop_id_list: [],
      sort_type_id_list: [],
      sort_id_list: []
    }, //请求数据的容器
    mainOperate: null, //getOptions后的主操作
    /* 【form】 */
    formData: {
      // 以下为共有 必填
      shop_id: null,
      title:null,
      newsListStyle:null,
      searchBar:false,
      gallery:null,
      card:null,
      menu:null,
      block:null,
      rushListStyle:null,
      saleListStyle:null,
      soldBoardStyle:null,
      //以下不提交
      gallery_page:null,
      menu_page:null,
      card_page:null
    }, //表单数据，并非一定完整传递出去，可能需要再post之前处理
    formRule: {
      shop_id: [{
        required: true,
        message: '请选择商城',
        trigger: 'change'
      }]
    }, //表单验证规则
    fileName: ['index_gallery'],//本页需要上传的文件名称
    //add
  }

  export default {
    mixins: [mixinDetail],
    name: "shop-detail",
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
        var gallery = []
        for (var i in myData.fileList[0]) {
          gallery.push({url: myData.fileList[0][i]['url'], page: ""})
        }
        myData.formData.service = JSON.parse(myData.formData.service)
        var json = {
          desc: myData.formData.desc,
          address: myData.formData.address,
          service: myData.formData.service,
          gallery: gallery
        }
        var postData = {
          value: JSON.stringify(json)
        }
        // detail 页面需要传入condition
        var condition = {}
        condition['page'] = 'shopDetail'
        var res = await tool.submitForm(that, myData.module + '/ajax_u', 'u', formName, postData, condition)
        await tool.sleep(500)
        myData.loading = false
        myData.disabled = false
      },
      async handleShopChange(value) {
        //查询该商城的分类标准编号
        var postData = {
          condition: {
            shop_id: value,
            page: 'shopDetail'
          }
        }
        var res = await tool.post('mini_page/ajax_r', postData)
        if (res[0] == 0) return false
        if (!tool.empty(res[1]['shopDetail']['gallery'])) {
          myData.fileList[0] = []
          res[1]['shopDetail'].gallery_page = []
          for (var i in res[1]['shopDetail']['gallery']) {
            var url = res[1]['shopDetail']['gallery'][i]['url']
            var temp = res[1]['shopDetail']['gallery'][i]['url'].split('/')
            var name = temp[temp.length - 1]
            myData.fileList[0].push({name: name, url, url})
            //分离锚点
            var page = res[1]['shopDetail']['gallery'][i]['page']
            var flag = res[1]['shopDetail']['gallery'][i]['flag']
            res[1]['shopDetail'].gallery_page.push({page: page, flag: flag})
          }
          res[1]['shopDetail'].gallery_page = JSON.stringify(res[1]['shopDetail'].gallery_page)
        }
        if (!tool.empty(res[1]['shopDetail']['service'])) res[1]['shopDetail']['service'] = JSON.stringify(res[1]['shopDetail']['service'])
        //if(!tool.empty(res[1]['shopDetail']['service']))res[1]['shopDetail']['service']=JSON.stringify(res[1]['shopDetail']['service'])
        myData.formData = res[1]['shopDetail']
        myData.formData.shop_id = value
        myData.disabled = false
      },
      handleSortTypeChange(value) {
        console.log(value)
      },
      handleSortChange(value) {
        console.log(value)
      },
      deleteBig: function () {
        myData.formData.blockArray.pop();
      },
      addBig: function () {
        var temp = {
          title: null,
          list: null
        }
        myData.formData.blockArray.push(temp);
      },
    }
  }
</script>

<style scoped>
  @import "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css";
  @import '../../assets/css/style.css';
</style>
