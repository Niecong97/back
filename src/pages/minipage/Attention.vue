<template>
  <div id="minipage_attention">
    <el-container>
      <el-header class="page-header">
        <h1><i class="fa fa-info"></i>注意事项</h1>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-file-o"></i>页面</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-info"></i>注意事项</el-breadcrumb-item>
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

              <el-form-item label="注意事项" prop="desc">
                <el-input type="text" v-model="formData.desc" placeholder="注意事项"></el-input>
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
    //【common】
    module: 'mini_page', //本模块名称
    own: 1, //是否只查询本商城
    // 【prepare】
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
    //add
  }

  export default {
    mixins: [mixinDetail],
    name: "attention",
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
        var json={
          desc:myData.formData.desc
        }
        // 处理post数据
        var postData = {
          page:'attention',
          value:JSON.stringify(json)
        }
        console.log(postData)
        // detail 页面需要传入condition
        var condition = {}
        condition['page'] = 'attention'
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
            page: 'attention'
          }
        }
        var res = await tool.post('mini_page/ajax_r', postData)
        if (res[0] == 0) return false
        myData.formData = res[1]['attention']
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
