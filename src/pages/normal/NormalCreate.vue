/*
<template>
  <div id="normal_create">
    <el-container>
      <el-header class="page-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-cubes"></i>普通商品</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-plus primary-color"></i><span class="primary-color">新增普通商品</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-form :model="myData.formData" ref="myData.ruleForm" :rules="myData.formRule" label-width="120px"
                   class="create_form normal-create-form">
            <el-row class="basic-msg" :gutter="30">
              <el-col :span="6">
                <h3 class="block-name">基础信息</h3>
              </el-col>
              <el-col :span="18">
                <el-form-item label="商城" prop="shop_id">
                  <el-select v-model="myData.formData.shop_id" placeholder="请选择商城">
                    <el-option v-for="item in myData.requireData.shop_id_list" :key="item.value"
                               :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品类型" prop="type">
                  <el-radio-group v-model="myData.formData.type">
                    <el-radio-button label="0">普通商品</el-radio-button>
                    <el-radio-button label="2">卡券商品</el-radio-button>
                    <el-radio-button label="3">积分商品</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="分类标准" prop="sort_type_id_input">
                  <el-select v-model="myData.formData.sort_type_id" placeholder="请选择分类标准">
                    <el-option v-for="item in myData.requireData.sort_type_id_list" :key="item.value"
                               :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="商品名称" prop="name">
                  <el-input type="text" v-model="myData.formData.name" placeholder="商品名称" :minlength="1"
                            :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="绑定卡券" prop="quantity" v-if="myData.formData.type==2">
                  <el-select v-model="myData.formData.tip" placeholder="请选择卡券">
                    <el-option v-for="item in myData.requireData.card_id_list" :key="item.value"
                               :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="副标题" prop="sub_title" v-if="myData.formData.type==2">
                  <el-input type="text" v-model.number="myData.formData.sub_title" placeholder="副标题" min="1"
                            max="9999999" step="1" class="auto-width"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description" v-if="myData.formData.type==2">
                  <el-input type="text" v-model.number="myData.formData.description" placeholder="描述" min="1"
                            max="9999999" step="1" class="auto-width"></el-input>
                </el-form-item>
                <el-form-item label="上架" prop="status">
                  <el-switch v-model="myData.formData.status" :active-value="1" :inactive-value="0"
                             active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="price-msg" :gutter="30">
              <el-col :span="6">
                <h3 class="block-name">价格信息</h3>
              </el-col>
              <el-col :span="18">
                <el-form-item label="参加促销" prop="join_sale">
                  <el-switch v-model="myData.formData.join_sale" :active-value="1" :inactive-value="0"
                             active-color="#13ce66" inactive-color="#ff4949"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="参加每日抢购" prop="join_daily">
                  <el-switch v-model="myData.formData.join_daily" :active-value="1" :inactive-value="0"
                             active-color="#13ce66" inactive-color="#ff4949"
                  ></el-switch>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="img-msg" :gutter="30">
              <el-col :span="6">
                <h3 class="block-name">图片信息</h3>
              </el-col>
              <el-col :span="18">
                <el-form-item label="缩略图" prop="">
                  <el-upload drag action="/admin/Index/ajax_upload" name="normal_thumbnail_upload"
                             list-type="picture"
                             :multiple="false" :limit="1">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="滚动窗" prop="">
                  <el-upload drag action="/admin/Index/ajax_upload" name="normal_gallery_image_upload"
                             list-type="picture" multiple >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="详情图" prop="">
                  <el-upload drag action="/admin/Index/ajax_upload" name="normal_detail_image_upload"
                             list-type="picture" multiple >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
                  </el-upload>
                </el-form-item>
                <el-form-item label="商品选型图" prop="">
                  <el-upload drag action="/admin/Index/ajax_upload" name="normal_detail_image_upload"
                             list-type="picture" multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="img-msg" :gutter="30">
              <el-col :span="6">
                <h3 class="block-name">首屏参数</h3>
              </el-col>
              <el-col :span="18">
                <el-form-item label="产品型号" prop="name">
                  <el-input type="text" v-model="myData.formData.name" placeholder="产品型号"></el-input>
                </el-form-item>
                <el-form-item label="产品规格" prop="name">
                  <el-input type="text" v-model="myData.formData.name" placeholder="产品规格"></el-input>
                </el-form-item>
                <el-form-item label="最少起售" prop="name">
                  <el-input v-model="myData.formData.min_amount" placeholder="最少起售" type="number" min="0" max="99999"
                            class="auto-width"></el-input>
                  <el-input v-model="myData.formData.min_unit" placeholder="单位/件" :maxlength="10" class="auto-width"></el-input>
                </el-form-item>
                <el-form-item label="装箱数量" prop="name">
                  <el-input v-model="myData.formData.min_amount" placeholder="装箱数量" type="number" min="0" max="99999"
                            class="auto-width"></el-input>
                  <el-input v-model="myData.formData.min_unit" placeholder="单位/件" :maxlength="10" class="auto-width"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="spec-msg"
                    :gutter="30">
              <el-col :span="4">
                <h3 class="block-name">选型信息</h3>
              </el-col>
              <!--<el-col :span="18">
                &lt;!&ndash;商品选型&ndash;&gt;
                <el-form-item label="是否有选型" prop="join_sale">
                  <el-switch v-model="myData.formData.join_sale" :active-value="1" :inactive-value="0"
                             active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </el-form-item>
                <el-row class="normal-choice-spec" v-for="item in myData.formData.normal_choice">
                  <el-col class="choice-spec-detail" :span="4">
                    <p class="choice-spec-name">属性名称</p>
                    <el-input class="choice-spec-content" type="text" v-model.number="myData.formData.sub_title"
                              placeholder="如：颜色"></el-input>
                  </el-col>
                  <el-col :span="18">
                    <p class="choice-spec-type">属性细分 </p>
                    <el-input class="choice-spec-type-detail" type="text" v-model.number="myData.formData.sub_title"
                              placeholder="如：红色"></el-input>
                    <el-input class="choice-spec-type-detail" type="text" v-model.number="myData.formData.sub_title"
                              placeholder="如：红色"></el-input>
                    <el-input class="choice-spec-type-detail" type="text" v-model.number="myData.formData.sub_title"
                              placeholder="如：红色"></el-input>
                    <el-input class="choice-spec-type-detail" type="text" v-model.number="myData.formData.sub_title"
                              placeholder="如：红色"></el-input>
                    <p class="remove-spec">
                      <i class="fa el-icon-remove-outline"></i>移除
                    </p>
                  </el-col>
                </el-row>
                <p class="add-spec"><i class="fa el-icon-circle-plus-outline"></i>添加选型，最多5个</p>
                <h3 class="spec-title">组合</h3>
                &lt;!&ndash;选型价格信息&ndash;&gt;
                <el-row class="spec-img" v-for="item in myData.formData.price_choice">
                  <el-col :span="12">
                    &lt;!&ndash;缩略图&ndash;&gt;
                    <div class="choice-img">
                      <span class="choice-img-title">图片：</span>
                      <el-select v-model="value" placeholder="请选择图片">
                        <el-option
                          v-for="item in myData.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="preview-img">
                      <img src="../../assets/img/img_pro_1.jpg" alt="" width="128">
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="price-wrap">
                      &lt;!&ndash;选型价格&ndash;&gt;
                      <div class="normal-spec-price">
                        <span class="spec-price-name">选型:&nbsp;</span>
                        <el-cascader
                          :options="myData.specPriceOptions"
                          change-on-select
                        ></el-cascader>
                        <div class="price-all">
                          <span>价格:&nbsp;</span>
                          <el-input class="price-input" type="text" v-model.number="myData.formData.sub_title"
                                    placeholder="价格一"></el-input>
                          <el-input class="price-input" type="text" placeholder="价格二"
                                    v-model.number="myData.formData.sub_title"></el-input>
                          <el-input class="price-input" type="text" placeholder="价格三"
                                    v-model.number="myData.formData.sub_title"></el-input>
                          <el-input class="price-input" type="text" v-model.number="myData.formData.sub_title"></el-input>
                          <el-input class="price-input" type="text" v-model.number="myData.formData.sub_title"></el-input>
                        </div>
                        <div class="price-all">
                          <span>抢购价:&nbsp;</span>
                          <el-input type="text" v-model.number="myData.formData.sub_title" placeholder="抢购价格" style="width: 60px;margin-bottom: 2px;"></el-input>
                        </div>
                        <div class="price-all">
                          <span>促销价:&nbsp;</span>
                          <el-input type="text" v-model.number="myData.formData.sub_title" placeholder="促销价格" style="width: 60px;margin-bottom: 2px;"></el-input>

                        </div>
                        <p class="remove-spec price">
                          <i class="fa el-icon-remove-outline"></i>移除
                        </p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <span class="price-add-spec"><i class="fa el-icon-circle-plus-outline"></i>添加选型，最多5个</span>
              </el-col>-->
              <el-col :span="20">
                <el-row class="normal-spec-wrap">
                  <!--<el-col :span="2">
                    <h3>商品规格:</h3>
                  </el-col>-->
                  <el-col class="normal-spec-wrap" :span="22">
                    <div class="normal-spec-item" v-for="(item_spec,index_spec) in myData.formData.choice_spec">
                      <el-form-item class="spec-item-name" label="规格名:" prop="name" label-width="80px">
                        <el-input type="text" v-model="item_spec.name" class="auto-width" placeholder="颜色"></el-input>
                        <!--删除整个规格-->
                        <span class="group-remove spec-name" @click="groupItemRemove(index_spec)">×</span>
                      </el-form-item>
                      <el-form-item label="规格值:" prop="content" label-width="80px">
                        <el-col :span="4" v-for="(item_content,index_content) in item_spec.content"
                                class="spec-item-wrap">
                          <el-input type="text" v-model="item_content.spec_value" class="auto-width spec-item-input"
                                    @change="handleChangeInput">
                          </el-input>
                          <!--删除-->
                          <span class="group-remove" @click="groupRemove(index_spec,index_content)">×</span>
                        </el-col>
                        <span class="add-spec primary-color" @click="groupAdd(index_spec)">添加规格值</span>
                      </el-form-item>
                    </div>
                    <div class="add-spec-item">
                      <el-button plain size="small" @click="addSpecItem"><span>添加规格项目</span></el-button>
                      <p style="margin-top: 10px;font-size: 12px" class="text-3">如有颜色、尺码等多种规格，请添加商品规格</p>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <!--规格明细-->
            <el-row class="normal-spec-wrap">
              <el-col :span="2">
                <h3>规格明细:</h3>
              </el-col>
              <el-col class="normal-spec-wrap" :span="22">
                <el-table :data="myData.tableData" border :span-method="objectSpanMethod"
                          class="normal-detail-table">
                  <el-table-column :prop="'spec_'+index" v-for="(item,index) in myData.formData.choice_spec"
                                   :label="item.name" width="100"></el-table-column>
                  <el-table-column prop="price" label="价格（元）">
                    <template scope="scope">
                      <el-input type="text" v-model="scope.row.price" class="auto-width">
                        <template slot="prepend">￥</template>
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="inve" label="库存">
                    <template scope="scope">
                      <el-input type="text" v-model="scope.row.inve" class="auto-width"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sales" label="销量"></el-table-column>
                </el-table>
              </el-col>
            </el-row>

            <div class="btn-create-normal">
              <el-button type="primary" >立即创建
              </el-button>
              <el-button>重置
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
  import areaList from '../../assets/js/areaList'
  import {mixinCreate} from "../../mixins/mixinCreate";

  var myData = {
    /* 【common】 */
    module: 'normal', //本模块名称
    own: 1, //是否只查询本商城

    /* 【prepare】 */
    requireList: {}, //请求的数据
    requireData: {}, //请求数据的容器
    /* 【form】 */
    formData: {
      //基础信息
      type: null,
      name: null,
      shop_id: null,
      supplier_id: null,
      sort: [],
      sort_id: null,
      dispatch_area: [],
      dispatch_area_id: null,
      status: 1,
      //价格信息
      sale_time: null,
      join_daily: 0,
      join_sale: 0,
      //选型信息
      choice_title_1: null,
      choice_title_2: null,
      choice_title_3: null,
      choice_title_4: null,
      choice_title_5: null,
      sale_start: null,
      sale_end: null,
      price_1: null,
      quantity: null,
      tip: null,
      description: null,
      sub_title: null,
      choice: [
        {
          'choice_value_1': null,
          'choice_value_2': null,
          'choice_value_3': null,
          'choice_value_4': null,
          'choice_value_5': null,
          'price_1': null,
          'price_2': null,
          'price_3': null,
          'price_4': null,
          'price_5': null,
          'weight': null,
          'tip': null
        }
      ],


      choice_spec: [

      ],

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
   /* formRule: {
      name: [{
        required: true,
        message: '请输入商品名称',
        trigger: 'blur'
      },
        {
          min: 1,
          max: 50,
          message: '长度在 1 到 50 个字符',
          trigger: 'blur'
        }
      ],
      type: [{
        required: true,
        message: '请选择商品类型',
        trigger: 'change'
      }],
      shop_id: [{
        required: true,
        message: '请选择商城',
        trigger: 'change'
      }],
      supplier_id: [{
        required: true,
        message: '请选择供货商',
        trigger: 'change'
      }],
      sort_type_id: [{
        required: true,
        message: '请选择分类标准',
        trigger: 'change'
      }],
      // sort_type_id_input: [{
      //     required: true,
      //     message: '请选择分类标准',
      //     trigger: 'blur'
      // }],
      sort: [{
        required: true,
        message: '请选择分类',
        trigger: 'change'
      }],
      dispatch_area_id_: [{
        required: true,
        message: '请选择发货区域',
        trigger: 'change'
      }],
      status: [{
        required: true,
        message: '请选择状态',
        trigger: 'change'
      }],
      min_amount: [{
        required: true,
        message: '请填写最少起售件数',
        trigger: 'blur'
      }],
      package_amount: [{
        required: true,
        message: '请填写装箱数量',
        trigger: 'blur'
      }],
      tip: [{
        required: false,
        message: '请填写卡券号',
        trigger: 'change'
      }],
      description: [{
        required: false,
        message: '请填写文字描述',
        trigger: 'blur'
      }],
      quantity: [{
        required: true,
        message: '请填写库存',
        trigger: 'blur'
      }],
      price_1: [{
        required: true,
        message: '请填写价格',
        trigger: 'blur'
      }],
      sub_title: [{
        required: false,
        message: '请填写副标题',
        trigger: 'blur'
      }]
    }, *///表单验证规则
    fileName: ['thumbnail', 'gallery_image', 'detail_image'], //本页需要上传的文件名称
    //add
    show_sale: false,
    show_daily: false,
    areaList: areaList,
    sale_switch: true,
    daily_switch: false,
    specPriceOptions: [{
      value: 'zhinan',
      label: '指南',
      children: [{
        value: 'shejiyuanze',
        label: '设计原则',
        children: [{
          value: 'yizhi',
          label: '一致'
        }, {
          value: 'fankui',
          label: '反馈'
        }, {
          value: 'xiaolv',
          label: '效率'
        }, {
          value: 'kekong',
          label: '可控'
        }]
      }, {
        value: 'daohang',
        label: '导航',
        children: [{
          value: 'cexiangdaohang',
          label: '侧向导航'
        }, {
          value: 'dingbudaohang',
          label: '顶部导航'
        }]
      }]
    }, {
      value: 'zujian',
      label: '组件',
      children: [{
        value: 'basic',
        label: 'Basic',
        children: [{
          value: 'layout',
          label: 'Layout 布局'
        }, {
          value: 'color',
          label: 'Color 色彩'
        }, {
          value: 'typography',
          label: 'Typography 字体'
        }, {
          value: 'icon',
          label: 'Icon 图标'
        }, {
          value: 'button',
          label: 'Button 按钮'
        }]
      }, {
        value: 'form',
        label: 'Form',
        children: [{
          value: 'radio',
          label: 'Radio 单选框'
        }, {
          value: 'checkbox',
          label: 'Checkbox 多选框'
        }, {
          value: 'input',
          label: 'Input 输入框'
        }, {
          value: 'input-number',
          label: 'InputNumber 计数器'
        }, {
          value: 'select',
          label: 'Select 选择器'
        }, {
          value: 'cascader',
          label: 'Cascader 级联选择器'
        }, {
          value: 'switch',
          label: 'Switch 开关'
        }, {
          value: 'slider',
          label: 'Slider 滑块'
        }, {
          value: 'time-picker',
          label: 'TimePicker 时间选择器'
        }, {
          value: 'date-picker',
          label: 'DatePicker 日期选择器'
        }, {
          value: 'datetime-picker',
          label: 'DateTimePicker 日期时间选择器'
        }, {
          value: 'upload',
          label: 'Upload 上传'
        }, {
          value: 'rate',
          label: 'Rate 评分'
        }, {
          value: 'form',
          label: 'Form 表单'
        }]
      }, {
        value: 'data',
        label: 'Data',
        children: [{
          value: 'table',
          label: 'Table 表格'
        }, {
          value: 'tag',
          label: 'Tag 标签'
        }, {
          value: 'progress',
          label: 'Progress 进度条'
        }, {
          value: 'tree',
          label: 'Tree 树形控件'
        }, {
          value: 'pagination',
          label: 'Pagination 分页'
        }, {
          value: 'badge',
          label: 'Badge 标记'
        }]
      }, {
        value: 'notice',
        label: 'Notice',
        children: [{
          value: 'alert',
          label: 'Alert 警告'
        }, {
          value: 'loading',
          label: 'Loading 加载'
        }, {
          value: 'message',
          label: 'Message 消息提示'
        }, {
          value: 'message-box',
          label: 'MessageBox 弹框'
        }, {
          value: 'notification',
          label: 'Notification 通知'
        }]
      }, {
        value: 'navigation',
        label: 'Navigation',
        children: [{
          value: 'menu',
          label: 'NavMenu 导航菜单'
        }, {
          value: 'tabs',
          label: 'Tabs 标签页'
        }, {
          value: 'breadcrumb',
          label: 'Breadcrumb 面包屑'
        }, {
          value: 'dropdown',
          label: 'Dropdown 下拉菜单'
        }, {
          value: 'steps',
          label: 'Steps 步骤条'
        }]
      }, {
        value: 'others',
        label: 'Others',
        children: [{
          value: 'dialog',
          label: 'Dialog 对话框'
        }, {
          value: 'tooltip',
          label: 'Tooltip 文字提示'
        }, {
          value: 'popover',
          label: 'Popover 弹出框'
        }, {
          value: 'card',
          label: 'Card 卡片'
        }, {
          value: 'carousel',
          label: 'Carousel 走马灯'
        }, {
          value: 'collapse',
          label: 'Collapse 折叠面板'
        }]
      }]
    }, {
      value: 'ziyuan',
      label: '资源',
      children: [{
        value: 'axure',
        label: 'Axure Components'
      }, {
        value: 'sketch',
        label: 'Sketch Templates'
      }, {
        value: 'jiaohu',
        label: '组件交互文档'
      }]
    }],
  };

  export default {
    name: "normal-create",
    data() {
      return {
        myData
      }
    },
    methods: {
      objectSpanMethod: function ({row, column, rowIndex, columnIndex}) {
        var spec_mount_0, spec_mount_1, spec_mount_2;
        var spec_all = myData.formData.choice_spec.length  //所有选型种类
        for (var i = 0; i < spec_all; i++) {
          //每种选型数量
          switch (i) {
            case 0:
              spec_mount_0 = myData.formData.choice_spec[i].content.length;
              break;
            case 1:
              spec_mount_1 = myData.formData.choice_spec[i].content.length;
              break;
            case 2:
              spec_mount_2 = myData.formData.choice_spec[i].content.length;
              break;
          }
        }

        if (spec_all === 1) { //共1种选型
          var num0 = spec_mount_1

          if (columnIndex === 0) {    //columnIndex===0 第一列选型
            if (rowIndex % 1 === 0) {
              return {
                rowspan: 1,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }


        }
        if (spec_all === 2) { //共2种选型
          var num0 = spec_mount_1
          var num1 = 1

          if (columnIndex === 0) {    //columnIndex===0 第一列选型
            if (rowIndex % num0 === 0) {
              return {
                rowspan: num0,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

          if (columnIndex === 1) {    //columnIndex===1 颜色（第二列的选型）
            if (rowIndex % num1 === 0) {   //rowIndex%2===0 2种种类（第三列）
              return {
                rowspan: num1,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

        }
        if (spec_all === 3) { //共3种选型
          var num0 = spec_mount_1 * spec_mount_2
          var num1 = spec_mount_2
          var num2 = 1

          if (columnIndex === 0) {    //columnIndex===0 第一列选型
            if (rowIndex % num0 === 0) {
              return {
                rowspan: num0,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

          if (columnIndex === 1) {    //columnIndex===1 颜色（第二列的选型）
            if (rowIndex % num1 === 0) {   //rowIndex%2===0 2种种类（第三列）
              return {
                rowspan: num1,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

        }
      },
      groupRemove: function (value1, value2) {
        //删除点击的规格值
        myData.formData.choice_spec[value1].content.splice(value2, 1)

        this.calcSpec()
      },
      groupAdd: function (value) {
        console.log(value)
        //最多五个选型值
        if (myData.formData.choice_spec[value].content.length < 5) {
          myData.formData.choice_spec[value].content.push({})
        } else {
          tool.showToast(this,'最多添加5种选型值')
        }

      },
      addSpecItem: function (value) {
        if(myData.formData.choice_spec.length<3){
          var obj = {
            "name": '',
            "content": [
              {}
            ]
          }
          myData.formData.choice_spec.push(obj)
        }else { //最多三种规格项目
          tool.showToast(this,'最多添加3种规格项目')
        }

      },
      groupItemRemove: function (value) {
        myData.formData.choice_spec.splice(value, 1)

        this.calcSpec()
      },
      handleChangeInput: function (value) {

        this.calcSpec()
      },

      //商品选型
      calcSpec: function () {

        myData.tableData = []

        var le = myData.formData.choice_spec.length  //选型种类

        var count = 1 //计算选型总数
        for (var i = 0; i < le; i++) {
          var le_name = "le_" + i
          le_name = myData.formData.choice_spec[i].content.length
          count *= le_name
        }


        for (var i = 0; i < count; i++) {
          var spec_obj = {
            "spec_0": null,
            "spec_1": null,
            "spec_2": null,
            "spec_3": null,
            "spec_4": null,
            "spec_5": null,
            "inve": null,
            "price": null,
            sales: null,
          }
          myData.tableData.push(spec_obj)
        }


        var count_spec_value00, count_spec_value0, count_spec_value1, count_spec_value2, count_spec_value3,
          count_spec_value4; //选型0 的种类
        var count_spec_0, count_spec_1, count_spec_2, count_spec_3, count_spec_4; //选型0 每种值的数量


        var flag = 0;  //选型的种类之一
        var spec_0_flag = 0, spec_1_flag = 0, spec_2_flag = 0, spec_3_flag = 0, spec_4_flag = 0
        var index_0 = 0, index_1 = 0, index_2 = 0, index_3 = 0, index_4 = 0;


        for (var i = 0; i < count; i++) {
          if (le - 1 >= 0) {
            //最后一个选型的种类
            count_spec_value0 = myData.formData.choice_spec[le - 1].content.length
            //最后一个选型的数量
            count_spec_0 = count / myData.formData.choice_spec[le - 1].content.length
            //选型名
            var spec_name = "spec_" + parseInt(le - 1)

            if (flag == count_spec_value0) {  //选型种类之一
              flag = 0
            }
            myData.tableData[i][spec_name] = myData.formData.choice_spec[le - 1].content[flag].spec_value
            flag++
          }


          //倒数第二个选型
          if (le - 2 >= 0) {
            //选型名
            var spec_name = "spec_" + parseInt(le - 2)
            //种类
            count_spec_value1 = myData.formData.choice_spec[le - 2].content.length
            //数量
            count_spec_1 = count / myData.formData.choice_spec[le - 2].content.length

            var max_flag_1 = count_spec_value0

            if (index_1 == max_flag_1) {  //一种选型的值赋值完
              spec_1_flag++
              index_1 = 0
            }
            if (spec_1_flag == count_spec_value1) {  //选型种类之一
              spec_1_flag = 0
            }
            myData.tableData[i][spec_name] = myData.formData.choice_spec[le - 2].content[spec_1_flag].spec_value
            index_1++;
          }

          //倒数第三个选型
          if (le - 3 >= 0) {
            //选型名
            var spec_name = "spec_" + parseInt(le - 3)
            //种类
            count_spec_value2 = myData.formData.choice_spec[le - 3].content.length
            //数量
            count_spec_2 = count / myData.formData.choice_spec[le - 3].content.length

            var max_flag_2 = count_spec_value1

            if (index_2 == count_spec_2) {  //一种选型的值赋值完
              spec_2_flag++
              index_2 = 0
            }
            if (spec_2_flag == count_spec_value2) {  //选型种类之一
              spec_2_flag = 0
            }
            myData.tableData[i][spec_name] = myData.formData.choice_spec[le - 3].content[spec_2_flag].spec_value
            index_2++;
          }

          /* //倒数第四个选型
           if (le - 4 >= 0) {
             //选型名
             var spec_name = "spec_" + parseInt(le - 4)
             //种类
             count_spec_value3 = myData.formData.choice_spec[le - 4].content.length
             //数量
             count_spec_3 = count / myData.formData.choice_spec[le - 4].content.length

             var max_flag_3 = count_spec_value2

             if (index_3 == count_spec_3) {  //一种选型的值赋值完
               spec_3_flag++
               index_3 = 0
             }
             if (spec_3_flag == count_spec_value3) {  //选型种类之一
               spec_3_flag = 0
             }
             myData.tableData[i][spec_name] = myData.formData.choice_spec[le - 4].content[spec_3_flag].spec_value
             index_3++;
           }

           //倒数第五个选型
           if (le - 5 >= 0) {
             //选型名
             var spec_name = "spec_" + parseInt(le - 5)
             //种类
             count_spec_value4 = myData.formData.choice_spec[le - 5].content.length
             //数量
             count_spec_4 = count / myData.formData.choice_spec[le - 5].content.length

             var max_flag_4 = count_spec_value3

             if (index_4 == count_spec_4) {  //一种选型的值赋值完
               spec_4_flag++
               index_4 = 0
             }
             if (spec_4_flag == count_spec_value4) {  //选型种类之一
               spec_4_flag = 0
             }
             myData.tableData[i][spec_name] = myData.formData.choice_spec[le - 5].content[spec_4_flag].spec_value
             index_4++;
           }*/

        }

      }
    },
    created(){
      this.calcSpec()
    }
  }
</script>

<style scoped>

  .normal-spec .el-input {
    width: 100px;
    margin-bottom: 2px;
  }

  .fa {
    margin-right: 5px;
  }

  .basic-msg, .price-msg, .img-msg, .spec-msg {
    width: 80%;
    margin: 0 auto 20px !important;
    border-bottom: 1px solid #ededed;
  }

  .block-name {
    text-align: right;
    margin-top: 6px;
    margin-right: 50px;
  }

  .normal-choice-spec {
    position: relative;
    margin-bottom: 10px;
    border-bottom: 1px solid #ededed;
    padding-bottom: 20px;
  }

  .choice-spec-detail {
    margin-right: 20px;
  }

  .choice-spec-name {
    font-size: 12px;
    margin-left: 2px;
    margin-bottom: 2px;
  }

  .choice-spec-content {
    width: 100px;
  }

  .choice-spec-type {
    font-size: 12px;
    margin-left: 2px;
    margin-bottom: 2px;
  }

  .choice-spec-type-detail {
    width: 80px;
    margin-bottom: 2px;
  }

  .add-spec {
    color: #409EFF;
    margin-bottom: 15px;
    cursor: pointer;
    margin-top: 10px
  }

  .spec-title {
    position: relative;
    left: -150px;
    top: 40px;
  }

  .spec-img {
    padding: 20px 0;
    margin-bottom: 20px;
    border-top: 1px solid #ededed;
    position: relative;
    left: -50px;
  }

  .price-add-spec {
    display: inline-block;
    color: #409EFF;
    margin-bottom: 15px;
    cursor: pointer;
  }

  .choice-img-title {
    display: inline-block;
    width: 57px;
  }

  .preview-img img {
    width: 128px;
    margin-top: 20px;
    margin-left: 60px;
  }

  .price-wrap {
    position: relative;
    left: 30px;
  }

  .btn-create-normal {
    text-align: right;
    margin-top: 30px;
    margin-right: 200px;
  }

  .spec-price-name {
    display: inline-block;
    width: 57px;
  }

  .price-all {
    min-width: 400px;
    margin-top: 10px;
  }

  .price-all span {
    display: inline-block;
    width: 57px;
  }

  .price-all .price-input {
    width: 60px;
    margin-bottom: 2px;
  }

  .remove-spec {
    position: absolute;
    right: -10px;
    bottom: 20px;
    font-size: 14px;
    cursor: pointer;
  }

  .remove-spec.price {
    position: relative;
    left: 400px;
    bottom: 100px;
    font-size: 14px;
    cursor: pointer;
  }


  .card-form-span {
    padding: 0 10px;
    border-left: 4px solid rgb(255, 102, 0);
    font-weight: bold;
  }

  .normal-spec-item {
    border-bottom: 1px solid #ededed;
    margin-bottom: 15px;
  }

  .normal-spec-item:last-child {
    border: none;
  }

  .normal-spec-item:hover .group-remove.spec-name {
    display: inline-block;
  }

  .add-spec {
    display: inline-block;
    cursor: pointer;
    font-size: 12px;
  }

  .normal-spec-wrap {
    margin-bottom: 30px;
  }

  .normal-spec-wrap h3 {
    margin-left: 20px;
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: normal;
  }

  .add-spec-item {
    margin-left: 60px;
  }

  .normal-detail-table {
    width: 100%;
    margin-left: 10px;
  }

  .spec-item-input {
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .spec-item-wrap {
    position: relative;
  }

  .group-remove {
    display: none;
    width: 18px;
    height: 18px;
    position: absolute;
    top: -6px;
    right: 3px;
    border-radius: 10px;
    background: hsla(0, 0%, 60%, .6);
    color: #FFFFFF;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
  }

  .group-remove.spec-name {
    right: 10px;
    top: 10px;
  }

  .spec-item-wrap:hover .group-remove {
    display: inline-block;
  }

  .group-remove:hover {
    background: #000;
  }

  .spec-item-name {
    background: #f8f8f8;
    padding: 8px 0;
  }

  /*选型*/
  .normal-spec .el-input {
    width: 100px;
    margin-bottom: 2px;
  }

  .fa {
    margin-right: 5px;
  }

  .basic-msg, .price-msg, .img-msg, .spec-msg {
    width: 80%;
    margin: 0 auto 20px !important;
    border-bottom: 1px solid #ededed;
  }

  .block-name {
    text-align: right;
    margin-top: 6px;
    margin-right: 50px;
  }

  .normal-choice-spec {
    position: relative;
    margin-bottom: 10px;
    border-bottom: 1px solid #ededed;
    padding-bottom: 20px;
  }

  .choice-spec-detail {
    margin-right: 20px;
  }

  .choice-spec-name {
    font-size: 12px;
    margin-left: 2px;
    margin-bottom: 2px;
  }

  .choice-spec-content {
    width: 100px;
  }

  .choice-spec-type {
    font-size: 12px;
    margin-left: 2px;
    margin-bottom: 2px;
  }

  .choice-spec-type-detail {
    width: 80px;
    margin-bottom: 2px;
  }

  .add-spec {
    color: #409EFF;
    margin-bottom: 15px;
    cursor: pointer;
    margin-top: 10px
  }

  .spec-title {
    position: relative;
    left: -150px;
    top: 40px;
  }

  .spec-img {
    padding: 20px 0;
    margin-bottom: 20px;
    border-top: 1px solid #ededed;
    position: relative;
    left: -50px;
  }

  .price-add-spec {
    display: inline-block;
    color: #409EFF;
    margin-bottom: 15px;
    cursor: pointer;
  }

  .choice-img-title {
    display: inline-block;
    width: 57px;
  }

  .preview-img img {
    width: 128px;
    margin-top: 20px;
    margin-left: 60px;
  }

  .price-wrap {
    position: relative;
    left: 30px;
  }

  .btn-create-normal {
    text-align: right;
    margin-top: 30px;
    margin-right: 200px;
  }

  .spec-price-name {
    display: inline-block;
    width: 57px;
  }

  .price-all {
    min-width: 400px;
    margin-top: 10px;
  }

  .price-all span {
    display: inline-block;
    width: 57px;
  }

  .price-all .price-input {
    width: 60px;
    margin-bottom: 2px;
  }

  .remove-spec {
    position: absolute;
    right: -10px;
    bottom: 20px;
    font-size: 14px;
    cursor: pointer;
  }

  .remove-spec.price {
    position: relative;
    left: 400px;
    bottom: 100px;
    font-size: 14px;
    cursor: pointer;
  }

</style>

