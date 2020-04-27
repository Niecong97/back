<template>
  <div id="user_detail">
    <el-container>
      <el-header class="page-header">
        <!--<h1>用户详情</h1>-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!--<el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>-->
          <el-breadcrumb-item><i class="fa fa-user"></i>用户</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-info primary-color"></i><span class="primary-color">用户详情</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-form :model="myData.formData" ref="ruleFom" :rules="myData.formRule" label-width="120px"
                   class="create_form">
            <el-card class="card-wrap" shadow="never">
              <div slot="header">
                <span style="border-left: 4px solid #f60;padding: 0 10px;">基本信息</span>
                <span class="edit primary-color" @click="editStaff(0)">编辑</span>
              </div>
              <el-row>
                <el-col :span="3">
                  <img src="../../assets/img/avatar-1.jpg" alt="" style="width: 100px">
                </el-col>
                <el-col :span="21">
                  <el-form-item label="职员编号：" class="user-detail-item" prop="name" label-width="120px">
                    10000000313
                  </el-form-item>
                  <el-form-item label="姓名：" class="user-detail-item" prop="name" label-width="120px">
                    aaa
                  </el-form-item>
                  <el-form-item label="性别：" class="user-detail-item" prop="name" label-width="120px">
                    男
                  </el-form-item>
                  <el-form-item label="手机号：" class="user-detail-item" prop="name" label-width="120px">
                    111111111111
                  </el-form-item>
                  <el-form-item label="用户组：" class="user-detail-item" prop="name" label-width="120px">
                    管理员
                  </el-form-item>
                  <el-form-item label="区域：" class="user-detail-item" prop="name" label-width="120px">
                    浙江省杭州市
                  </el-form-item>
                  <el-form-item label="地址：" class="user-detail-item" prop="name" label-width="120px">
                    浙江省杭州市西湖区
                  </el-form-item>
                  <el-form-item label="邮箱：" class="user-detail-item" prop="name" label-width="120px">
                    111@aa.com
                  </el-form-item>
                  <el-form-item label="最近登录：" class="user-detail-item" prop="name" label-width="120px">
                    2018-11-23 13:22:39
                  </el-form-item>
                  <el-form-item label="状态：" class="user-detail-item" prop="name" label-width="120px">
                    可用
                  </el-form-item>

                  <el-dialog class="user-detail-dialog" title="账户信息" :visible.sync="myData.dialogFormVisible">
                    <!--基本信息-->
                    <el-form :model="myData.formData" class="staff-detail-form" v-if="myData.formData.type_msg===0">
                      <el-form-item label="姓名:" class="dialog-item" label-width="100px">
                        <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="性别:" class="dialog-item" label-width="100px">
                        <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号:" class="dialog-item" label-width="100px">
                        <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="照片:" class="dialog-item" label-width="100px">
                        <el-upload drag action="/admin/Index/ajax_upload" name="logo_url_upload"
                                   :on-success="uploadSuccess" :on-preview="handlePreview" :on-remove="handleRemove"
                                   :file-list="fileList[0]" list-type="picture" multiple :disabled="disabled"
                                   :multiple="false" :limit="1" :on-exceed="handleOverLimit">
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
                        </el-upload>
                      </el-form-item>
                      <el-form-item label="用户组:" class="dialog-item" label-width="100px">
                        <el-select class="dialog-select detail" v-model="myData.formData.name" placeholder="请选择专属客服">
                          <el-option label="Tony" value="Tony"></el-option>
                          <el-option label="aaa" value="aaa"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="区域:" class="dialog-item" label-width="100px">
                        <el-select class="dialog-select detail" v-model="myData.formData.name" placeholder="请选择发货区域">
                          <el-option label="11" value="11"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="详细地址:" class="dialog-item" label-width="100px">
                        <el-input type="textarea" v-model="myData.formData.name" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>

                    <!--账号信息-->
                    <el-form :model="myData.formData" v-if="myData.formData.type_msg===1">
                      <el-form-item label="密码:" class="dialog-item" label-width="100px">
                        <el-input v-model="myData.formData.name" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="状态:" class="dialog-item" label-width="100px">
                        <el-switch v-model="myData.formData.status" :active-value="1" :inactive-value="0"
                                   active-color="#13ce66" inactive-color="#ff4949"
                                   :disabled="myData.disabled"></el-switch>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="myData.dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="modify_msg">确定修改</el-button>
                    </div>
                  </el-dialog>

                </el-col>
              </el-row>
            </el-card>

            <!--账号信息-->
            <el-card class="card-wrap" shadow="never">
              <div slot="header">
                <span style="border-left: 4px solid #f60;padding: 0 10px;">账号信息</span>
                <span class="edit primary-color" @click="editStaff(1)">编辑</span>
              </div>
              <el-row>
                <el-col :span="3">
                </el-col>
                <el-col :span="21">
                  <el-form-item label="账号：" class="user-detail-item" prop="name" label-width="120px">
                    10000000313
                  </el-form-item>
                  <el-form-item label="创建时间：" class="user-detail-item" prop="name" label-width="120px">
                    2018-11-23 13:22:39
                  </el-form-item>
                  <el-form-item label="状态：" class="user-detail-item" prop="name" label-width="120px">
                    可用
                  </el-form-item>

                </el-col>
              </el-row>
            </el-card>

          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {mixinDetail} from "../../mixins/mixinDetail";
  import areaList from '../../assets/js/areaList'
  import tool from '../../assets/js_/tool'

  var myData = {
    /* 【common】 */
    module: 'user', //本模块名称
    own: 1, //是否只查询本商城
    /* 【prepare】 */
    requireList: {
      shop_id_list: 1,
      service_id_list: 1,
    }, //请求的数据
    requireData: {
      shop_id_list: [],
      service_id_list: [],
    }, //请求数据的容器
    /* 【form】 */
    formData: {
      user_id: null,
      openid: null,
      shop_id: null,
      name: null,
      gender: 0,
      area_id: null,
      detail: null,
      tel: null,
      fax: null,
      phone: null,
      og_name: null,
      og_area_id: null,
      og_detail: null,
      og_tel: null,
      og_fax: null,
      points: null,
      beans: null,
      total_resume: null,
      level: 1,
      group: 0,
      status: 0,
      service_id: null,   //专属客服
      //以下不需要提交
      area_id_array: null,
      og_area_id_array: null,

      service_id_array: null,

      star: 4,
      radio: '1星',
      type_msg: 0,
    }, //表单数据，并非一定完整传递出去，可能需要再post之前处理
    formRule: {
      /*name: [{
        required: true,
        message: '请输入商城名称',
        trigger: 'blur'
      },
        {
          min: 1,
          max: 25,
          message: '长度在 1 到 25 个字符',
          trigger: 'blur'
        }
      ],*/
      area: [{
        required: true,
        message: '请选择区域',
        trigger: 'change'
      }],
      detail: [{
        required: true,
        message: '请输入详细地址',
        trigger: 'blur'
      },
        {
          min: 1,
          max: 100,
          message: '长度在 1 到 100 个字符',
          trigger: 'blur'
        }
      ],
      staff_id: [{
        required: true,
        message: '请选择管理员',
        trigger: 'change'
      }],
    }, //表单验证规则
    /* 【getDetail】 */
    primary_key_name: 'user_id', //主键名称
    primary_key_value: null, //主键值 来自get参数
    //add
    areaList: areaList,
    dialogFormVisible: false,
  };

  export default {
    mixins: [mixinDetail],
    name: "user-detail",
    data() {
      return {
        myData
      }
    },
    methods: {
      //【获取初始数据、权限信息等】
      async prepare() {
        console.log("uer_detail")
        var that = this
        that.loading = true //开启加载态
        that.disabled = true //开启禁用态
        //【1】检测登陆态
        var res = tool.checkLogin()
        if (res[0] == 0) return false
        //【2】获取options信息
        this.getOptions()
        await tool.sleep(500)
        that.disabled = false
        that.loading = false
        //write something
        tool.showToast(that, '用户信息应该由用户自己手动修改，请慎重操作', 'Waring')
      },
      //【提交】
      async submitForm(formName) {
        var that = this
        that.loading = true
        that.disabled = true
        // 处理post数据
        var postData = {
          user_id: myData.formData.user_id,
          oa_openid: myData.formData.oa_openid,
          shop_id: myData.formData.shop_id,
          name: myData.formData.name,
          gender: myData.formData.gender,
          area_id: myData.formData.area_id,
          detail: myData.formData.detail,
          tel: myData.formData.tel,
          fax: myData.formData.fax,
          phone: myData.formData.phone,
          og_id: myData.formData.og_id,
          points: myData.formData.points,
          total_resume: myData.formData.total_resume,
          level: myData.formData.level,
          group: myData.formData.group,
          status: myData.formData.status,
          service_id: myData.formData.service_id,    //专属客服id
        }
        // detail 页面需要传入condition
        var condition = {}
        condition[myData.primary_key_name] = myData.primary_key_value
        var res = await tool.submitForm(that, myData.module + '/ajax_u', 'u', formName, postData, condition)
        await tool.sleep(500)
        that.loading = false
        that.disabled = false
      },
      handleAreaChange: function (value) {
        var length = value.length;
        myData.formData.area_id = value[length - 1];
        console.log(myData.formData.area_id);
      },
      handleServiceChange: function (value) {
        console.log(value)
        var length = value.length;
        myData.formData.service_id = value
      },
      handleCoAreaChange: function (value) {
        var length = value.length;
        myData.formData.og_area_id = value[length - 1];
        console.log(myData.formData.og_area_id);
      },
      handleShopChange: function (value) {
        myData.formData.shop_id_input = value;
      },
      modify_msg: function () {
        myData.dialogFormVisible = false
        tool.showToast(this, '修改成功', 'success')
      },
      editStaff: function (val) {
        myData.dialogFormVisible = true
        switch (val) {
          //基本信息
          case 0:
            myData.formData.type_msg = 0
            break;
          //账号信息
          case 1:
            myData.formData.type_msg = 1
            break;
        }
      }
    }
  }
</script>

<style scoped>

  .user-detail-item {
    display: inline-block;
    width: 270px;
    margin-right: 50px;
  }

  .dialog-item {
    width: 350px;
  }

  .dialog-item.radio {
    width: 450px;
  }

  .dialog-select.detail {
    width: 250px;
  }




</style>
