<!--
<template>
  <div id="login">
    <div id="loginInfo">
      <el-container class="login-container">
        <el-row>
          <el-col :span="3" :xs="1" :sm="11" :md="13" :lg="3" class="warm_"></el-col>
          <el-col :span="13" :lg="13" class="main-content warm_"></el-col>
          <el-col :span="5" :xs="20" :sm="9" :md="7" :lg="5" class="warm_">
            <router-view ></router-view>
          </el-col>
          <el-col :span="3" :xs="3" :sm="4" :md="4" :lg="3" warm_></el-col>
        </el-row>
      </el-container>
    </div>
    <div id="footer">
      <div class="copyright">
        <el-row>
          <el-col :span="2" :xs="1" :sm="3" :md="3"  :lg="2" class="warm_"></el-col>
          <el-col :span="14" :xs="0" :sm="8" :md="10" :lg="14" class="warm_"></el-col>
          <el-col :span="6" :xs="21" :sm="10" :md="8" :lg="6" class="copyright_content warm_">
            <p class="text4 inline">Copyright © 2017-2018 Redpaper.</p>
            <p class="text4 inline">ALL Rights Reserved</p>
            <p class="recordCode"><a
              href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11000002000001" target="_blank"
              class="text4"><i></i>京公网安备11000002000001号</a>
            </p>
          </el-col>
          <el-col :span="2" :xs="1" :sm="3" :md="3" :lg="2" class="warm_"></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  var myData = {
    //【getOptions相关】
    loading: true, //加载态
    loadingTitle: 'Loading', //加载态标题
    forbidden: true, //禁止操作
    requireList: {}, //向服务器请求的信息
    requireData: {}, //需要请求的数据汇总于此
    second: 3, //3秒后跳转到主界面
    checkCodeUrl: 'captcha.html',
    cookies: {},
    formData: {
      username: '',
      password: '',
      checkCode: ''
    }, //本页面表单数据
    formRule: {
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
      checkCode: [{
        required: true,
        message: '请输入验证码',
        trigger: 'blur'
      }]
    } //本页面表单的验证规则
  };
  import tool from '../../assets/js_/tool'

  export default {
    data(){
      return{
        myData
      }
    },
    methods:{
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
        var res = await tool.submitForm(this, 'staff/ajax_login', 'r', formName, myData.formData)
        if (res[0] == 1) {
          tool.showToast(this, '登录成功', 'success')
          myData.loading = true
          myData.loadingTitle = myData.second + '秒后跳转到主界面'
          setInterval(function () {
            myData.second -= 1
            myData.loadingTitle = myData.second + '秒后跳转到主界面'
            if (myData.second <= 0) window.location = 'admin/Index/main'
          }, 1000)
        } else {
          myData.formData.password = null
          myData.formData.checkCode = null
          this.$refs[formName].clearValidate()
          this.refreshCheckCode()
        }
      },
      refreshCheckCode() {
        myData.checkCodeUrl = 'captcha.html' + '?' + Math.random()
      },
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
      loading() {
        this.loading2 = true;
        setTimeout(() => {
          this.loading2 = false;
        }, 2000)
      },
    },
    created(){
      //this.prepare()
    }
  }
</script>

<style>
  @import "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css";
  @import "../../assets/css/index.css";
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
  .login-content-item a{
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
  .el-row{
    width: 100%;
  }
  .warm_{
    /*position: relative;*/
    height: 1px;
  }
  .form_login{
    width: 100%;
  }
  .card-info .el-tabs&#45;&#45;card>.el-tabs__header .el-tabs__nav {
    border: none;
  }
  .card-info .el-tabs&#45;&#45;card>.el-tabs__header .el-tabs__item{
    border:none;
  }
  .card-info .el-tabs&#45;&#45;card>.el-tabs__header{
    border:none;
  }
  .card-info .el-tabs__nav{
    float: none;
  }
  .card-info .is-active .fa-user{
    color: #12b7f5;
  }
  .card-info .is-active .fa-wechat{
    color: #25be03;
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
-->
