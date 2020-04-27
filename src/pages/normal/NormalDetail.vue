<template>
  <div id="normal_detail">
    <el-container>
      <el-header class="page-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-cubes"></i>普通商品</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-info primary-color"></i><span class="primary-color">商品详情</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-form :model="myData.formData" ref="myData.ruleForm" label-width="120px" class="create_form">
            <!--商品基本信息-->
            <el-card shadow="never" class="card-wrap">
              <div slot="header">
                <span class="card-form-span">基本信息</span>
                <span class="edit primary-color" @click="editDelivery(0)">编辑</span>
              </div>
              <div class="card-form-block">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="商品名称:" prop="name" :label-width="myData.formData.input_width">
                      1KV母排热缩管 低压热缩管 Φ6
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="商品类型:" prop="name" :label-width="myData.formData.input_width">
                      普通商品
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="分类:" prop="name" :label-width="myData.formData.input_width">
                      热缩管 / 母排热缩管 / 1KV母排热缩管
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发货区域:" prop="name" :label-width="myData.formData.input_width">
                      浙江省 / 温州市 / 乐清市
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="上架:" prop="name" :label-width="myData.formData.input_width">
                      <el-switch v-model="myData.formData.status" :active-value="1" :inactive-value="0"
                                 active-color="#13ce66" inactive-color="#ff4949"
                                 disabled></el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="商品序号:" prop="name" :label-width="myData.formData.input_width">
                      2
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-card>
            <!--商品价格信息-->
            <el-card shadow="never" class="card-wrap">
              <div slot="header">
                <span class="card-form-span">价格信息</span>
                <span class="edit primary-color" @click="editDelivery(0)">编辑</span>
              </div>
              <div class="card-form-block">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="参加促销:" prop="name" :label-width="myData.formData.input_width">
                      <el-switch v-model="myData.formData.status" :active-value="1" :inactive-value="0"
                                 active-color="#13ce66" inactive-color="#ff4949"
                                 disabled></el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="促销起讫:" prop="name" :label-width="myData.formData.input_width">
                      2018-09-20 12:39:25 - 2018-08-30 16:00:00
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="参加每日抢购:" prop="name" :label-width="myData.formData.input_width">
                      <el-switch v-model="myData.formData.status" :active-value="1" :inactive-value="0"
                                 active-color="#13ce66" inactive-color="#ff4949"
                                 disabled></el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-card>
            <!--选型信息-->
            <el-card shadow="never" class="card-wrap">
              <div slot="header">
                <span class="card-form-span">选型信息</span>
              </div>
              <div class="card-form-block">
                <el-row class="normal-spec-wrap">
                  <el-col :span="2">
                    <h3>商品规格:</h3>
                  </el-col>
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

                <!--规格明细-->
                <el-row class="normal-spec-wrap">
                  <el-col :span="2">
                    <h3>规格明细:</h3>
                  </el-col>
                  <el-col class="normal-spec-wrap" :span="22">
                    <el-table :data="myData.tableData" border :span-method="objectSpanMethod"
                              class="normal-detail-table">  <!--:span-method="objectSpanMethod"-->
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
              </div>
            </el-card>
            <div class="btn-create-normal">
              <el-button type="primary" >立即修改
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
  import {mixinDetail} from "../../mixins/mixinDetail";
  import tool from '../../assets/js_/tool'

  var myData = {
    /* 【common】 */
    module: 'normal', //本模块名称
    own: 1, //是否只查询本商城
    /* 【prepare】 */
    requireList: {
      staffInfo: 1,
      supplier_id_list: 1,
      sort_type_id_list: 1,
      shop_id_list: 1,
      card_id_list: 1
    }, //请求的数据
    requireData: {
      staffInfo: [],
      supplier_id_list: [],
      sort_type_id_list: [],
      shop_id_list: [],
      sort_id_list: [],
      card_id_list: []
    }, //请求数据的容器
    /* 【form】 */
    formData: {
      //基础信息
      name: null,
      type: null,
      shop_id: null,
      common_goods_id: null,
      supplier_id: null,
      sort_type_id: null,
      sort_id: null,
      sort_id_array: [],
      dispatch_area_id_array: [],
      dispatch_area_id: null,
      status: 1,
      //价格信息
      sale_time: null,
      join_daily: 0,
      join_sale: 0,
      sub_title: null,
      tip: null,
      description: null,
      quantity: null,
      //选型信息
      choice_title_1: null,
      choice_title_2: null,
      choice_title_3: null,
      choice_title_4: null,
      choice_title_5: null,
      sale_start: null,
      sale_end: null,
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
        {
          "name": '尺寸',
          "content": [
            {
              "spec_value": '小',
            },
            {
              "spec_value": '大',
            },
          ]
        },
        {
          "name": '颜色',
          "content": [
            {
              "spec_value": '红色',
            },
            {
              "spec_value": '绿色',
            },
            {
              "spec_value": '蓝色',
            },
            {
              "spec_value": '黄色',
            },
          ]
        },
        {
          "name": '种类',
          "content": [
            {
              "spec_value": '1',
            },
            {
              "spec_value": '2',
            },
          ]
        }
      ],

      spec_detail: {},

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
      sort_type_id_input: null,
      supplier_id_input: null,
      shop_id_input: null,
      sale_date: null,
      common_goods_id_input: null,
    }, //表单数据，并非一定完整传递出去，可能需要再post之前处理
    formRule: {
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
      sort_id_array: [{
        required: true,
        message: '请选择分类',
        trigger: 'change'
      }],
      dispatch_area: [{
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
      sub_title: [{
        required: false,
        message: '请填写副标题',
        trigger: 'blur'
      }]
    }, //表单验证规则
    fileName: ['thumbnail', 'gallery_image', 'detail_image'], //本页需要上传的文件名称
    /* 【getDetail】 */
    primary_key_name: 'goods_id', //主键名称
    primary_key_value: null, //主键值 来自get参数
    show_sale: false,
    show_daily: false,
    tableData: [
      {
        spec_0: '小',  //尺寸
        spec_1: "红",  //颜色
        price: null,
        inve: null,
        sales: null,
      },
      {
        spec_0: '小',
        spec_1: "绿",
        price: null,
        inve: null,
        sales: null,
      },
      {
        spec_0: '小',
        spec_1: "蓝",
        price: null,
        inve: null,
        sales: null,
      },
      {
        spec_0: '小',
        spec_1: "黄",
        price: null,
        inve: null,
        sales: null,
      },
      {
        spec_0: '大',
        spec_1: "红",
        price: null,
        inve: null,
        sales: null,
      },
      {
        spec_0: '大',
        spec_1: "绿",
        price: null,
        inve: null,
        sales: null,
      },
      {
        spec_0: '大',
        spec_1: "蓝",
        price: null,
        inve: null,
        sales: null,
      },
      {
        spec_0: '大',
        spec_1: "黄",
        price: null,
        inve: null,
        sales: null,
      },
    ]
  };
  export default {
    mixins: [mixinDetail],
    name: "normal-detail",
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
    created() {
      this.calcSpec()
    }
  }
</script>

<style scoped>

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
