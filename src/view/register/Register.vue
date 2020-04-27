<template>
  <!--创建平台-->
  <div id="register">
    <el-row>
      <el-col :span="12" class="container">
        <header class="platform-top">
          <div class="msg-left">
            <div class="logo">
              <img src="../../assets/img/logo.png" alt="" style="height: 65px;">
            </div>
            <div class="title">创建平台</div>
          </div>
          <div class="msg-right">
            <div class="phone">18100001718</div>
            <div class="exit-login">退出</div>
          </div>
        </header>
        <div class="add-msg">
          <el-steps :active="myData.active" simple>
            <el-step title="1 经营信息" icon="el-icon-edit"></el-step>
            <el-step title="2 平台信息" icon="el-icon-upload"></el-step>
            <el-step title="3 完成" icon="el-icon-success"></el-step>
          </el-steps>
          <!--步骤一-->
          <div class="choose-content" style="text-align: center;padding-top: 50px;" v-if="myData.active===0">
            <p style="margin-bottom: 20px">请选择你的行业</p>
            <el-select v-model="myData.value" placeholder="请选择类目" style="width: 40%;">
              <el-option v-for="item in myData.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>

            <div class="btn-next" style="margin-top: 50px;">
              <el-button type="primary" @click="nextStep">下一步</el-button>
            </div>
          </div>
          <!--步骤二-->
          <div class="choose-content" style="text-align: center;padding-top: 50px;" v-if="myData.active===1">
            <el-row>
              <el-col :span="12" style="margin: 0 auto">
                <el-form ref="ruleForm" :model="myData.formData" :rules="myData.formRule" label-width="80px">
                  <el-form-item prop='platform' label="平台名称:">
                    <el-input v-model="myData.formData.platformName" placeholder="请填写平台名称"></el-input>
                  </el-form-item>
                  <el-form-item prop='name' label="姓名:">
                    <el-input v-model="myData.formData.name" placeholder="请填写联系人姓名"></el-input>
                  </el-form-item>
                  <el-form-item prop='phone' label="手机号:">
                    <el-input v-model="myData.formData.phone" placeholder="请填写联系人手机号"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-top: 50px;margin-left: -20px;">
                    <el-button type="primary" v-on:click="returnPre" class="form_login">返回上一步</el-button>
                    <el-button type="primary" v-on:click="submit('ruleForm')" class="form_login">创建平台</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
          <!--步骤三-->
          <div class="choose-content" style="text-align: center;padding-top: 50px;" v-if="myData.active===3">
            <h3><i class="el-icon-success success-color" style="margin-right: 10px"></i>恭喜，你的平台已创建成功！</h3>
            <div style="margin-top: 50px;">
              <el-button type="primary" @click="toShopBack">进入店铺后台</el-button>
            </div>
          </div>

        </div>
        <!--版权信息-->
        <div class="copyright" style="position:absolute;width:100%;bottom: 5%;">
          <el-row>
            <el-col class="copyright_content warm_">
              <p style="text-align: center" class="text1 inline">Copyright © 2017-2018 Redpaper. ALL Rights
                Reserved </p>
              <p class="recordCode" style="text-align: center"><a
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002000001" target="_blank"
                class="text1"><i></i>京公网安备11000002000001号</a>
              </p>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import tool from '../../assets/js_/tool'

  var myData = {
    options: [{
      value: '选项1',
      label: '餐饮'
    }, {
      value: '选项2',
      label: '住房'
    }, {
      value: '选项3',
      label: '零售'
    }, {
      value: '选项4',
      label: '商城1'
    }, {
      value: '选项5',
      label: '商城2'
    }],
    value: '',
    active: 0,
    formData: {
      platformName: '',
      name: '',
      phone: '',
    }
  }

  export default {
    name: "register",
    data() {
      return {
        loading2: false,
        myData,
      }
    },
    methods: {
      async prepare() {
        myData.loadingTitle = 'GETING BROWSER INFO'
        myData.loading = true
        if (navigator.appVersion.indexOf('Chrome') == '-1') {
          tool.showModal(this, '请使用谷歌浏览器')
          return false
        }//浏览器的版本号
        if (!navigator.cookieEnabled) {
          tool.showModal(this, '请开启cookie功能')
          return false
        }
        setTimeout(function () {
          myData.loading = false
        }, 500)
      },
      async submit(formName) {
        myData.active = 3

        /*var res = await tool.submitForm(this, 'staff/ajax_login', 'r', formName, myData.formData)
        if (res[0] == 1) {
          tool.showToast(this, '登录成功', 'success')
          myData.loading = true
          myData.loadingTitle = myData.second + '秒后跳转到主界面'
          setInterval(function () {
            myData.second -= 1
            myData.loadingTitle = myData.second + '秒后跳转到主界面'
            if (myData.second <= 0) window.location = 'http://test.21b.cn/drp/main.html#/order/all'
          }, 1000)
        } else {
          myData.formData.password = null
          this.$refs[formName].clearValidate()
          this.refreshCheckCode()
        }*/
      },
      refreshCheckCode() {
        myData.checkCodeUrl = 'captcha.html' + '?' + Math.random()
      },
      loading() {
        this.loading2 = true;
        setTimeout(() => {
          this.loading2 = false;
        }, 2000)
      },
      backPage() {
        this.$router.go(-1)
      },
      getCode() {
        this.$message({
          message: '验证码发送成功',
          type: 'success'
        });
      },
      nextStep() {
        if (myData.active++ > 3) myData.active = 0
      },
      toShopBack() {
        //this.$router.push()
        window.open('./wrapper.html#/data/overView', '_self')
      },
      returnPre() {
        myData.active--;
      }
    },
    created() {
      this.prepare()
    }
  }
</script>

<style scoped>

</style>

<style>

  body {
    overflow: hidden;
  }

  /*文字*/
  .text1 {
    color: #303133;
  }

  .text2 {
    color: #606266;
    font-size: 14px;
  }

  .text3 {
    color: #909399;
  }

  .text4 {
    color: #C0C4CC;
  }

  .container {
    position: relative;
    margin: 0 auto;
    height: 100vh;
  }

  [class*=el-col-] {
    float: none;
  }

  .platform-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 0 0;
    border-bottom: 1px solid #DCDFE6;
  }

  .msg-left, .msg-right {
    display: flex;
    align-items: center;
  }

  .logo {
    padding-right: 10px;
  }

  .title {
    padding-left: 10px;
    border-left: 1px solid #DCDFE6;
  }

  .phone {
    padding-right: 10px;
    font-size: 14px;
  }

  .exit-login {
    padding-left: 10px;
    font-size: 14px;
    color: #409EFF;
    line-height: 20px;
    cursor: pointer;
  }

  .add-msg {
    padding-top: 20px;
  }

  .copyright_content {
    font-size: 14px;
  }

  .recordCode i {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 4px;
    background: url(/dist/ghs.png?d0289dc…) no-repeat;
    background-size: 90% 90%;
    vertical-align: middle;
  }

  .recordCode a {
    text-decoration: none;
  }
</style>
