<template>
  <div id="userlogin">
    <el-card class="card-info">
      <div class="back_hide" @click="backPage"></div>
      <div style="display: flex;justify-content: center;margin-bottom: -10px" v-if="active3===0">
        <!--商户logo-->
        <div class="shop_logo">
          <!--<img src="../assets/img/shop_logo.jpg" alt="logo" style="width: 50px;height: 50px;margin-right: 16px;">-->
        </div>
        <h3 style="line-height: 50px;">用户登录</h3>
      </div>
      <h1 v-if="active3===1">微信扫码登录</h1>
      <el-form ref="ruleForm" :model="myData.formData" :rules="myData.formRule" v-if="active3===0"
               style="margin-top: 30px">
        <el-form-item prop='phone'>
          <el-input v-model="myData.formData.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input v-model="myData.formData.password" placeholder="密码"></el-input>
        </el-form-item>

        <!--<div id="captcha">
          <div id="text">
            行为验证™ 安全组件加载中
          </div>
          <div id="wait" class="show">
            <div class="loading">
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
            </div>
          </div>
        </div>-->

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
          <el-button id="btn" type="primary" v-on:click="submit('ruleForm')" class="form_login">登录</el-button>
        </el-form-item>
      </el-form>
      <div v-if="active3===1" style="margin: 20px 0">
        <img src="../../assets/img/qrcode.jpg" alt="" style="width: 188px;height: 188px;">
      </div>
      <div id="outside-login">
        <div class="outside-login-title"><span class="text2">其他登录方式</span></div>
        <el-tabs type="card" @tab-click="changeTabClick">
          <el-tab-pane>
            <span slot="label"><i class="fa fa-user text2"></i></span>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="fa fa-wechat text2"></i></span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="login-content">
        <div class="login-content-item no-line">
          <router-link to="/register" class="text2">立即注册</router-link>
        </div>
        <div class="login-content-item">
          <router-link to="/retrieve-pass" class="text2">忘记密码</router-link>
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
    },
    formRule: { //本页面表单的验证规则
      phone: [{
        required: true,
        message: '请输入手机号',
        trigger: 'blur'
      },
        /*{
          min: 4,
          max: 20,
          message: '长度在 4 到 20 个字符',
          trigger: 'blur'
        }*/
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
    name: "user-login",
    data() {
      return {
        loading2: false,
        active3: 0,
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

        window.open('./wrapper.html#/data/overView', '_self')


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
      changeTabClick(tab, event) {

        console.log(tab._uid)
        if (tab.$el.id === 'pane-0') {
          this.active3 = 0
          console.log(this.active3)
        } else if (tab.$el.id === 'pane-1') {
          this.active3 = 1
          console.log(this.active3)
        }
      },
      backPage() {
        this.$router.go(-1)
      },
      confirmImg() {
        var handler = function (captchaObj) {
          captchaObj.appendTo('#captcha');
          captchaObj.onReady(function () {
            $("#wait").hide();
          });
          $('#btn').click(function () {
            var result = captchaObj.getValidate();
            if (!result) {
              return alert('请完成验证');
            }
            $.ajax({
              url: '',
              type: 'POST',
              dataType: 'json',
              data: {
                username: '',
                password: '',
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode
              },
              success: function (data) {
                if (data.status === 'success') {
                  alert('登录成功');
                } else if (data.status === 'fail') {
                  alert('登录失败，请完成验证');
                  captchaObj.reset();
                }
              }
            });
          })
          // 更多接口说明请参见：http://docs.geetest.com/install/client/web-front/
          window.gt = captchaObj;
        };

        $.ajax({
          url: "gt/register-slide?t=" + (new Date()).getTime(), // 加随机数防止缓存
          type: "get",
          dataType: "json",
          success: function (data) {

            $('#text').hide();
            $('#wait').show();
            // 调用 initGeetest 进行初始化
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
            initGeetest({
              // 以下 4 个配置参数为必须，不能缺少
              gt: data.gt,
              challenge: data.challenge,
              offline: !data.success, // 表示用户后台检测极验服务器是否宕机
              new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机

              product: "popup", // 产品形式，包括：float，popup
              width: "300px",
              https: true

              // 更多配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
            }, handler);
          }
        })
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
