<template>
  <div id="minipage_index">
    <el-container>
      <el-header class="page-header">
        <h1><i class="fa fa-plus"></i>首页</h1>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-file-o"></i>页面设置</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-home"></i>商城首页</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <!--<el-container>
        <el-main>
          <el-form :model="myData.formData" ref="myData.ruleForm" :rules="myData.formRule" label-width="120px" class="create_form">
            <el-row class="form-block">
              <el-form-item label="商城" prop="shop_id">
                <el-select v-model="myData.formData.shop_id" placeholder="请选择商城" @change="handleShopChange"
                           :disabled="disabled">
                  <el-option v-for="item in requireData.shop_id_list" :key="item.value"
                             :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="显示搜索栏" prop="searchBar">
                <el-switch v-model="myData.formData.searchBar" active-color="#13ce66" inactive-color="#ff4949"
                           :disabled="disabled"></el-switch>
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
              <el-form-item label="新闻条数" prop="newsListStyle">
                <el-input type="text" v-model="formData.newsListStyle_amount" placeholder="新闻条数"
                          :disabled="disabled"></el-input>
              </el-form-item>
              <el-form-item label="滚动窗锚点" prop="gallery" v-show="false">
                <el-input type="text" v-model="formData.gallery_page" placeholder="滚动窗锚点" :minlength="1"
                          :disabled="disabled"></el-input>
              </el-form-item>
              <el-form-item label="滚动窗跳转商品" prop="card">
                <el-select v-for="(item,key) in formData.index_gallery" v-model="item.flag"
                           placeholder="滚动窗跳转商品" @change="handleCardPageChange"
                           :disabled="disabled">
                  <el-option v-for="item in myData.requireData.normal_goods_id_list" :key="item.value"
                             :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="菜单图标" prop="menu_img">
                <el-upload drag action="/admin/Index/ajax_upload" name="menu_thumbnail_upload"
                           :on-success="uploadSuccess" :on-preview="handlePreview" :on-remove="handleRemove"
                           :file-list="fileList[1]" list-type="picture" multiple :disabled="disabled">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="菜单锚点" prop="menu_page" v-show="false">
                <el-input type="text" v-for="(item,key) in formData.index_menu" v-model="item.page"
                          placeholder="菜单锚点" :minlength="1"
                          :disabled="disabled"></el-input>
              </el-form-item>
              <el-form-item label="卡片视图" prop="card" v-show="false">
                <el-upload drag action="/admin/Index/ajax_upload" name="index_card_upload"
                           :on-success="uploadSuccess" :on-preview="handlePreview" :on-remove="handleRemove"
                           :file-list="fileList[2]" list-type="picture" multiple :disabled="disabled">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="卡片跳转商品" prop="card" v-show="false">
                <el-select v-for="(item,key) in formData.index_card" v-model="item.flag"
                           placeholder="请选择卡片锚点" @change="handleCardPageChange"
                           :disabled="disabled">
                  <el-option v-for="item in requireData.normal_goods_id_list" :key="item.value"
                             :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row class="form-block rushListStyle-block">
              <h1>抢购列表配置</h1>
              <el-form-item label="是否显示" prop="rushListStyle_show">
                <el-switch v-model="formData.rushListStyle.show" active-color="#13ce66"
                           inactive-color="#ff4949"
                           :disabled="disabled"></el-switch>
              </el-form-item>
              <el-form-item label="类型" prop="rushListStyle_type" v-show="false">
                <el-radio-group v-model="formData.rushListStyle.type">
                  <el-radio-button label="1">1</el-radio-button>
                  <el-radio-button label="2">2</el-radio-button>
                  <el-radio-button label="3">3</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="标题" prop="rushListStyle_title" v-show="formData.rushListStyle.show">
                <el-input type="text" v-model="formData.rushListStyle.title" placeholder="标题"
                ></el-input>
              </el-form-item>
              <el-form-item label="图标" v-show="false">
                <el-input type="text" placeholder="图标"
                ></el-input>    &lt;!&ndash;v-model="formData.rushListStyle.icon"&ndash;&gt;
              </el-form-item>
              <el-form-item label="图标颜色" prop="rushListStyle" v-show="formData.rushListStyle.show">
                <el-color-picker v-model="formData.rushListStyle.iconColor" :predefine="predefineColors"
                                 @change="handleColorChange" color-format="hex"></el-color-picker>
              </el-form-item>
              <el-form-item label="背景颜色" prop="rushListStyle" v-show="formData.rushListStyle.show">
                <el-color-picker v-model="formData.rushListStyle.bgColor" :predefine="predefineColors"
                                 @change="handleColorChange" color-format="hex"></el-color-picker>
              </el-form-item>
              <el-form-item label="收缩显示条数" prop="rushListStyle_amount" v-show="formData.rushListStyle.show">
                <el-input type="text" v-model="formData.rushListStyle.amount" placeholder="收缩显示条数"
                ></el-input>
              </el-form-item>
            </el-row>

            <el-row class="form-block saleListStyle-block">
              <h1>促销榜配置</h1>
              <el-form-item label="是否显示" prop="saleListStyle_show">
                <el-switch v-model="formData.saleListStyle.show" active-color="#13ce66"
                           inactive-color="#ff4949"
                           :disabled="disabled"></el-switch>
              </el-form-item>
              <el-form-item label="类型" prop="saleListStyle_type" v-show="false">
                <el-radio-group v-model="formData.saleListStyle.type">
                  <el-radio-button label="1">1</el-radio-button>
                  <el-radio-button label="2">2</el-radio-button>
                  <el-radio-button label="3">3</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="标题" prop="saleListStyle_title" v-show="formData.saleListStyle.show">
                <el-input type="text" v-model="formData.saleListStyle.title" placeholder="标题"
                ></el-input>
              </el-form-item>
              <el-form-item label="图标" v-show="false">
                <el-input type="text" placeholder="图标"
                ></el-input>    &lt;!&ndash;v-model="formData.saleListStyle.icon"&ndash;&gt;
              </el-form-item>
              <el-form-item label="图标颜色" prop="saleListStyle" v-show="formData.saleListStyle.show">
                <el-color-picker v-model="formData.saleListStyle.iconColor" :predefine="predefineColors"
                                 @change="handleColorChange" color-format="hex"></el-color-picker>
              </el-form-item>
              <el-form-item label="背景颜色" prop="saleListStyle" v-show="formData.saleListStyle.show">
                <el-color-picker v-model="formData.saleListStyle.bgColor" :predefine="predefineColors"
                                 @change="handleColorChange" color-format="hex"></el-color-picker>
              </el-form-item>
              <el-form-item label="收缩显示条数" prop="saleListStyle_amount" v-show="formData.saleListStyle.show">
                <el-input type="text" v-model="formData.saleListStyle.amount" placeholder="收缩显示条数"
                ></el-input>
              </el-form-item>
            </el-row>


            <el-row class="form-block soldBoardStyle-block">
              <h1>热销榜配置</h1>
              <el-form-item label="是否显示" prop="soldBoardStyle_show">
                <el-switch v-model="formData.soldBoardStyle.show" active-color="#13ce66"
                           inactive-color="#ff4949"
                           :disabled="disabled"></el-switch>
              </el-form-item>
              <el-form-item label="类型" prop="soldBoardStyle_type" v-show="false">
                <el-radio-group v-model="formData.soldBoardStyle.type">
                  <el-radio-button label="1">1</el-radio-button>
                  <el-radio-button label="2">2</el-radio-button>
                  <el-radio-button label="3">3</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="标题" prop="soldBoardStyle_title" v-show="formData.soldBoardStyle.show">
                <el-input type="text" v-model="formData.soldBoardStyle.title" placeholder="标题"
                ></el-input>
              </el-form-item>
              <el-form-item label="图标" v-show="false">
                <el-input type="text" placeholder="图标"
                ></el-input>   &lt;!&ndash; v-model="formData.soldBoardStyle.icon"&ndash;&gt;
              </el-form-item>
              <el-form-item label="图标颜色" prop="soldBoardStyle" v-show="formData.soldBoardStyle.show">
                <el-color-picker v-model="formData.soldBoardStyle.iconColor" :predefine="predefineColors"
                                 @change="handleColorChange" color-format="hex"></el-color-picker>
              </el-form-item>
              <el-form-item label="背景颜色" prop="soldBoardStyle" v-show="formData.soldBoardStyle.show">
                <el-color-picker v-model="formData.soldBoardStyle.bgColor" :predefine="predefineColors"
                                 @change="handleColorChange" color-format="hex"></el-color-picker>
              </el-form-item>
              <el-form-item label="收缩显示条数" prop="soldBoardStyle_amount" v-show="formData.soldBoardStyle.show">
                <el-input type="text" v-model="formData.soldBoardStyle.amount" placeholder="收缩显示条数"
                ></el-input>
              </el-form-item>
            </el-row>

            <el-row class="form-block block-block">
              <h1>Block</h1>
              <el-form-item v-for="(item,index) in formData.block" label="block">
                <el-form-item label="标题" prop="block_title" style="margin:8px 0">
                  <el-input type="text" v-model="item.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="副标题" prop="block_subTitle" style="margin:8px 0">
                  <el-input type="text" v-model="item.subTitle" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="商品列表" style="margin:8px 0">
                  <el-select v-for="(goods,goods_key) in item.list" v-model="item.list[goods_key]"
                             placeholder="商品列表" @change="handleCardPageChange"
                             :disabled="disabled" style="margin:8px 8px 0 0">
                    <el-option v-for="item in requireData.normal_goods_id_list" :key="item.value"
                               :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  <el-form-item style="margin:8px 0">
                    <el-button type="danger" @click="deleteShop(index)" :disabled="disabled">删除商品</el-button>
                    <el-button type="primary" @click="addShop(index)" :disabled="disabled">添加商品</el-button>
                  </el-form-item>
                </el-form-item>
              </el-form-item>
              <el-form-item style="margin:55px 0">
                <el-button type="danger" @click="deleteBig()" :disabled="disabled">删除Block</el-button>
                <el-button type="primary" @click="addBig()" :disabled="disabled">添加Block</el-button>
              </el-form-item>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disabled">立即修改
              </el-button>
              <el-button @click="resetForm('ruleForm')" :disabled="disabled">重置
              </el-button>
            </el-form-item>
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
      sort_id_list: [],
      normal_goods_id_list: [],

    }, //请求数据的容器
    mainOperate: null, //getOptions后的主操作
    /* 【form】 */
    formData: {
      // 以下为共有 必填
      shop_id: null,
      title: null,
      newsListStyle: null,
      searchBar: false,
      index_gallery: null,
      index_card: null,
      index_menu: null,
      index_block: [],
      rushListStyle: {
        show: null,
        type: null,
        title: null,
        icon: "fa-clock-o",
        iconColor: null,
        bgColor: null,
        amount: null
      },
      /*促销榜配置*/
      saleListStyle: {
        show: null,
        type: null,
        title: null,
        icon: "fa-thumbs-up",
        iconColor: null,
        bgColor: null,
        amount: null
      },
      /*热销榜配置*/
      soldBoardStyle: {
        show: null,
        type: null,
        title: null,
        icon: "fa-bars",
        iconColor: null,
        bgColor: null,
        amount: null
      },
      block: [
        {
          'title': null,
          'subTitle': null,
          'list': [],
        }
      ],
      gallery_page: null,
      menu_page: null,
      //以下不提交

      card_page: null
    }, //表单数据，并非一定完整传递出去，可能需要再post之前处理
    formRule: {
      shop_id: [{
        required: true,
        message: '请选择商城',
        trigger: 'change'
      }]
    }, //表单验证规则
    page: [], //锚点集中
    fileList: [], //已上传文件列表
    fileName: ['index_gallery', 'menu', 'card'],//本页需要上传的文件名称
    //add
    predefineColors: ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],

  }

  export default {
    mixins: [mixinDetail],
    name: "index",
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

        /* 抢购列表、促销榜单*/
        if (myData.formData.saleListStyle.show == false) {
          myData.formData.saleListStyle = {}
        } else if (myData.formData.saleListStyle.amount == '') {
          myData.formData.saleListStyle.amount = 1
        }

        if (myData.formData.rushListStyle.show == false) {
          myData.formData.rushListStyle = {}
        } else if (myData.formData.rushListStyle.amount == '') {
          myData.formData.rushListStyle.amount = 1
        }

        if (myData.formData.soldBoardStyle.show == false) {
          myData.formData.soldBoardStyle = {}
        } else if (myData.formData.soldBoardStyle.amount == '') {
          myData.formData.soldBoardStyle.amount = 1
        }

        //菜单图标
        for (var i in myData.formData.menu) {
          if (myData.formData.menu[i].thumbnail == '') {
            myData.formData.menu[i].thumbnail = ""
          }
        }
        // 处理post数据
        var json = {
          // 以下为共有 必填
          shop_id: myData.formData.shop_id,
          title: myData.formData.title,
          newsListStyle: myData.formData.newsListStyle,
          searchBar: myData.formData.searchBar,
          gallery: myData.formData.index_gallery,
          card: myData.formData.index_card,
          menu: myData.formData.index_menu,
          block: myData.formData.block,
          rushListStyle: myData.formData.rushListStyle,
          saleListStyle: myData.formData.saleListStyle,
          soldBoardStyle: myData.formData.soldBoardStyle,
          /*滚动窗锚点*/
          gallery_page: myData.formData.gallery_page,
          menu_page: myData.formData.menu_page,

        }
        var postData = {
          value: JSON.stringify(json)
        }
        // detail 页面需要传入condition
        var condition = {}
        condition['page'] = 'index'
        var res = await tool.submitForm(that, myData.module + '/ajax_u', 'u', formName, postData, condition)
        await tool.sleep(500)
        myData.loading = false
        myData.disabled = false
      },
      handleColorChange(value) {
        var that = this
        var flag = myData.predefineColors.indexOf(value)
        if (flag == -1) {
          myData.formData.color_hex = null
          myData.formData.color = null
          tool.showModal(that, '抱歉，暂时不支持自定义，请从给出的十种色彩种选择一种')
        } else {
          myData.formData.color = myData.color_array[flag]
        }
      },
      handleCardTypeChange(value) {
        console.log(value)
      },
      handleDateChange(value) {
        console.log(value)
      },
      //【选取商城】
      async handleShopChange(value) {
        //取goods_id
        myData.requireList = {
          normal_goods_id_list: {
            shop_id: value
          }
        }
        this.prepare()
        //查询该商城的分类标准编号
        var postData = {
          condition: {
            shop_id: value,
            page: 'index'
          }
        }
        var res = await tool.post('mini_page/ajax_r', postData)
        if (res[0] == 0) return false
        if (!tool.empty(res[1]['index']['gallery'])) {
          myData.fileList[0] = []
          for (var i in res[1]['index']['gallery']) {
            var url = res[1]['index']['gallery'][i]['url']
            var temp = res[1]['index']['gallery'][i]['url'].split('/')
            var name = temp[temp.length - 1]
            myData.fileList[0].push({name: name, url, url})
          }

        }
        if (!tool.empty(res[1]['index']['menu'])) {
          myData.fileList[1] = []
          for (var i in res[1]['index']['menu']) {
            var url = res[1]['index']['menu'][i]['thumbnail']
            var label = res[1]['index']['menu'][i]['label']
            var temp = res[1]['index']['menu'][i]['thumbnail'].split('/')
            var name = temp[temp.length - 1]
            var page = res[1]['index']['menu'][i]['page']
            myData.fileList[1].push({name: name, url: url})
          }
        }

        if (!tool.empty(res[1]['index']['card'])) {
          myData.fileList[2] = []
          for (var i in res[1]['index']['card']) {
            var url = res[1]['index']['card'][i]['url']
            var temp = res[1]['index']['card'][i]['url'].split('/')
            var name = temp[temp.length - 1]
            myData.fileList[2].push({name: name, url: url})
          }
        }
        res[1]['index']['index_menu'] = res[1]['index']['menu']
        res[1]['index']['index_gallery'] = res[1]['index']['gallery']
        res[1]['index']['index_card'] = res[1]['index']['card']


        myData.formData = res[1]['index']
        myData.formData.shop_id = value

        /*rushListStyle 抢购列表配置*/
        if (!tool.empty(res[1]['index']['rushListStyle'])) {
          myData.formData.rushListStyle.show = res[1]['index']['rushListStyle']['show']
          myData.formData.rushListStyle.type = res[1]['index']['rushListStyle']['type']
          myData.formData.rushListStyle.title = res[1]['index']['rushListStyle']['title']
          /*myData.formData.rushListStyle.icon = "fa-clock-o"*/
          myData.formData.rushListStyle.iconColor = res[1]['index']['rushListStyle']['iconColor']
          myData.formData.rushListStyle.bgColor = res[1]['index']['rushListStyle']['bgColor']
          myData.formData.rushListStyle.amount = res[1]['index']['rushListStyle']['amount']
        }

        /*rushListStyle 抢购列表配置*/
        if (!tool.empty(res[1]['index']['saleListStyle'])) {
          myData.formData.saleListStyle.show = res[1]['index']['saleListStyle']['show']
          myData.formData.saleListStyle.type = res[1]['index']['saleListStyle']['type']
          myData.formData.saleListStyle.title = res[1]['index']['saleListStyle']['title']
          /*myData.formData.saleListStyle.icon = "fa-thumbs-up"*/
          myData.formData.saleListStyle.iconColor = res[1]['index']['saleListStyle']['iconColor']
          myData.formData.saleListStyle.bgColor = res[1]['index']['saleListStyle']['bgColor']
          myData.formData.saleListStyle.amount = res[1]['index']['saleListStyle']['amount']
        }

        /*rushListStyle 抢购列表配置*/
        if (!tool.empty(res[1]['index']['soldBoardStyle'])) {
          myData.formData.soldBoardStyle.show = res[1]['index']['soldBoardStyle']['show']
          myData.formData.soldBoardStyle.type = res[1]['index']['soldBoardStyle']['type']
          myData.formData.soldBoardStyle.title = res[1]['index']['soldBoardStyle']['title']
          /*myData.formData.soldBoardStyle.icon = "fa-bars"*/
          myData.formData.soldBoardStyle.iconColor = res[1]['index']['soldBoardStyle']['iconColor']
          myData.formData.soldBoardStyle.bgColor = res[1]['index']['soldBoardStyle']['bgColor']
          myData.formData.soldBoardStyle.amount = res[1]['index']['soldBoardStyle']['amount']
        }

        if (!tool.empty(res[1]['index']['block'])) {
          for (var i in res[1]['index']['block']) {
            myData.formData.block[i].title = res[1]['index']['block'][i]['title']
            myData.formData.block[i].subTitle = res[1]['index']['block'][i]['subTitle']
            myData.formData.block[i].list = res[1]['index']['block'][i]['list']
            //myData.formData.index_block=res[1]['index']['block'][i]
            myData.formData.index_block = res[1]['index']['block'][i]['list']
          }
        }

        /*newsListStyle*/
        myData.formData.newsListStyle_amount = myData.formData['newsListStyle'].amount
        /*gallery_page*/
        myData.formData.gallery_page = myData.formData['gallery'][0]['page']
        for (var i in res[1]['index']['menu']) {
          myData.formData.menu_page = myData.formData['menu'][i]['page']
        }
        myData.disabled = false
      },
      handleCardPageChange(value) {
        console.log(value)
      },
      handleSortTypeChange(value) {
        console.log(value)
      },
      handleSortChange(value) {
        console.log(value)
      },
      deleteBig: function () {
        myData.formData.block.pop();
      },
      deleteShop: function (index) {
        myData.formData.block[index].list.pop()
      },
      addBig: function () {
        var temp = {
          'title': null,
          'subTitle': null,
          'list': [],
        }
        myData.formData.block.push(temp);
      },
      addShop: function (index) {
        var temp = null
        myData.formData.block[index].list.push(temp)
      }
    },
  }
</script>

<style scoped>
  @import "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css";
  @import "../../assets/css/style.css";
</style>
