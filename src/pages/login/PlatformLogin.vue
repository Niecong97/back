<template>
  <div id="platformLogin">
    <el-card class="card-info" v-loading="cardLoading">
      <!--<div style="display: flex;justify-content: space-around;margin-bottom: -10px" v-if="active3===0">
        &lt;!&ndash;商户logo&ndash;&gt;
        <div class="shop_logo">
          <img src="./assets/img/qrcode.jpg" alt="验证码" style="width: 50px;height: 50px;">
        </div>
        &lt;!&ndash;商户名&ndash;&gt;
        <el-col :span="16">
          <el-input v-model="input1" disabled style="line-height: 50px;"></el-input>
        </el-col>
      </div>-->
      <h1 v-if="active3===0">平台登录</h1>
      <h1 v-if="active3===1">微信扫码登录</h1>
      <el-form ref="form" :model="validateForm" style="margin-top: 30px" v-if="active3===0">
        <el-form-item>
          <el-input v-model="validateForm.shop_id" placeholder="商户号"></el-input>
        </el-form-item>
        <el-form-item>
          <!--<router-link to="/userlogin">-->
          <el-button type="primary" @click="openLoading" class="form_login">
            进入
          </el-button>
          <!--</router-link>-->
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
        <div class="login-content-item no-line"><a href="#" class="text2">立即注册</a></div>
        <div class="login-content-item "><a href="#" class="text2">忘记账号</a></div>
        <div class="login-content-item"><a href="#" class="text2">忘记密码</a></div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "user-login",
    data() {
      return {
        shop_id: [
          {validate: (val) => !!val, message: '必须填写商户名'},
          {validate: (val) => val.length >= 3, message: '商户名长度大于3'}
        ],
        validateForm: {
          shop_id: '',
        },
        active3: 0,
        cardLoading:false,
      }
    },
    methods: {
      submit() {
        this.$refs.form.validate().then((result) => {
          console.log('form valid: ', result)
        });
      },
      clear() {
        this.$refs.form.clear();
        this.validateForm = {
          username: '',
          password: '',
          checkCodeRules: '',
        };
      },
      openLoading() {
        this.cardLoading = true;
        setTimeout(() => {
          this.cardLoading = false;
          //进入登录页
          this.$router.push({path:'userLogin'})
        }, 1000)
      },
      changeTabClick(tab, event) {
        console.log(tab._uid)
        console.log(tab.$el.id)
        if (tab.$el.id === 'pane-0') {
          this.active3 = 0
          console.log(this.active3)
        } else if (tab.$el.id === 'pane-1') {
          this.active3 = 1
          console.log(this.active3)
        }
      },
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
