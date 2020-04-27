<template>
  <div id="register">
    <el-card class="card-info">
      <div class="back_hide" @click="backPage"></div>
      <div style="display: flex;justify-content: center;margin-bottom: -10px">
        <!--商户logo-->
        <!-- <div class="shop_logo">
           <img src="../assets/img/shop_logo.jpg" alt="logo" style="width: 50px;height: 50px;margin-right: 16px;">
         </div>-->
        <h3 style="line-height: 50px;">用户注册</h3>
      </div>
      <el-form ref="ruleForm" :model="myData.formData" :rules="myData.formRule" style="margin-top: 30px">
        <el-form-item prop='phone'>
          <el-input v-model="myData.formData.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop='checkCode'>
          <el-input v-model="myData.formData.checkCode" placeholder="短信验证码"></el-input>
          <div class="getCode" @click="getCode">获取验证码</div>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input v-model="myData.formData.password" placeholder="设置密码"></el-input>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-form-item label="" prop="checkCode">
      <el-input type="text" name='checkCode' class="checkCode" placeholder="CheckCode"
                v-model="myData.formData.checkCode">
          <template slot="append">
              <div class="wrap"><img class="verifyImg" :src="myData.checkCodeUrl" v-on:click="refreshCheckCode"/></div>
          </template>
      </el-input>
  </el-form-item>-->
        <el-form-item>
          <el-button type="primary" v-on:click="submit('ruleForm')" class="form_login">确认注册</el-button>
        </el-form-item>
      </el-form>
      <div class="login-content">
        <div class="login-content-item">
          <router-link to="/userlogin" class="text2">已有账号，立即登录</router-link>
          <!--<a href="#" class="text2">已有账号，立即登录</a>-->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>

  import tool from '../../assets/js_/tool'

  var myData = {
    loadingTitle: 'Loading', //加载态标题
    forbidden: true, //禁止操作
    requireList: {}, //向服务器请求的信息
    requireData: {}, //需要请求的数据汇总于此
    second: 3, //3秒后跳转到主界面
    checkCodeUrl: 'https://drp.21b.cn/admin/captcha.html',
    cookies: {},
    formData: { //本页面表单数据
      username: '',
      password: '',
      checkCode: '',
      phone: '',
    },
    formRule: { //本页面表单的验证规则
      username: [{
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      },
        {
          min: 4,
          max: 20,
          message: '长度在 4 到 20 个字符',
          trigger: 'blur'
        }
      ],
      phone: [
        {
          required: true,
          message: '请输入手机号',
        }
      ],
      checkCode: [
        {
          required: true,
          message: '请输入验证码',
        }
      ],
      password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      },
        {
          min: 8,
          max: 20,
          message: '长度在 8 到 20 个字符',
          trigger: 'blur'
        }
      ],
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

        tool.showToast(this,'注册成功','success')

        setTimeout(function(){
          window.open('./register.html#/','_self')
        },1500)

        /* var res = await tool.submitForm(this, 'staff/ajax_login', 'r', formName, myData.formData)
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
      }
    },
    created() {
      console.log(tool)
      this.prepare()
    }
  }
</script>

<style>
  .el-row {
    width: 100%;
  }

  .warm_ {
    position: relative;
    height: 1px;
  }

  .form_login {
    width: 100%;
  }

  .card-info .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }

  .card-info .el-tabs--card > .el-tabs__header .el-tabs__item {
    border: none;
  }

  .card-info .el-tabs--card > .el-tabs__header {
    border: none;
  }

  .card-info .el-tabs__nav {
    float: none;
  }

  .card-info .is-active .fa-user {
    color: #12b7f5;
  }

  .card-info .is-active .fa-wechat {
    color: #25be03;
  }

  .back_hide {
    width: 8px;
    height: 8px;
    position: absolute;
    top: 0;
    left: 0;
  }

  * {
    margin: 0;
    padding: 0;
  }

  @media (min-width: 576px) {
    .container {
      max-width: 100%;
    }
  }

  #app {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  #loginInfo {
    position: relative;
  }

  .login-container {
    position: relative;
  }

  .card-info {
    position: absolute;
    top: 60px;
    width: 100%;
    /*    width: 300px;*/
    padding: 24px 24px 24px 24px;
    text-align: center;
    background: rgba(255, 255, 255, 0.8);
  }

  .card-info h1 {
    font-weight: normal;
  }

  .mu-form-item .mu-button {
    width: 100%;
    margin: 0;
  }

  .from-checkCode {
    width: calc(100% - 135px) !important;
  }

  .from-check-wrap {
    height: 40px;
    line-height: 40px;
    position: absolute;
    right: 0px;
    top: -8px;
  }

  .from-check-wrap img {
    cursor: pointer;
  }

  #footer {
    position: absolute;
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-right: -10px;
    bottom: 80px;
  }

  .copyright {
    font-size: 14px;
    color: #e9edf2;
  }

  .copyright a {
    font-size: 14px;
    text-decoration: none;
  }

  /*tab切换样式*/
  @media (min-width: 960px) {
    .mu-tab {
      min-width: 72px;
    }
  }

  .mu-tabs-inverse {
    background: transparent;
  }

  #outside-login .fa {
    font-size: 24px;
  }

  .mu-tab-active .fa-wechat {
    color: #25be03;

  }

  .mu-tab-active .fa-user {
    color: #12b7f5;
  }

  .wechat {
    margin-bottom: 20px;
  }

  .outside-login-title {
    margin-bottom: 10px;
    color: #999;
    line-height: 20px;
  }

  .login-content-item {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    line-height: 20px;
  }

  .login-content-item:after {
    content: '';
    height: 100%;
    width: 1px;
    position: absolute;
    background-color: #e5e5e5;
    top: 0;
    left: -1px;
  }

  .login-content-item, .no-line:after {
    content: none;
  }

  .login-content-item {
    margin-top: 20px;
  }

  .login-content-item a {
    text-decoration: none;
  }

  .login-content-item a:hover {
    color: #00a4ff;
  }

  .flex-wrapper {
    width: 100%;
  }

  .recordCode {
    text-align: center;
  }

  .recordCode i {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 4px;
    background: url(../../assets/img/ghs.png) no-repeat;
    background-size: 90% 90%;
    vertical-align: middle;
  }

  .copyright_content {
    text-align: center;
  }

  .getCode {
    position: absolute;
    top: 0;
    right: 5px;
    cursor: pointer;
    color: #409EFF;
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

  .inline {
    display: inline-block;
  }

  @media (max-width: 1273px) and (min-width: 1200px) {
    .login-content-item {
      padding: 0 10px;
    }
  }

  @media (max-width: 1199px) {
    .main-content {
      display: none;
    }
  }

  @media (max-width: 575px ) {
    .card-info {
      top: 8px;
    }

    .copyright {
      border: none;
      text-align: center;
    }

    #footer {
      bottom: 80px;
      height: 35px;
      line-height: 35px;
    }
  }

  /*小于414px换样式*/
  @media (max-width: 414px) {
    .login-content-item {
      display: block;
      position: static;
      margin-top: 10px;
    }

    #footer {
      bottom: 55px;
      height: 25px;
      line-height: 25px;
    }

    .inline {
      display: block;
    }
  }

</style>
