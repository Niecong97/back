import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Wrapper from './Wrapper.vue'
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import router from '../../router'

Vue.use(ElementUI)
Vue.use(VideoPlayer)

var myData = {
  //【prepare】
  loading: false, //信息获取态
  disabled: true, //禁止操作
  requireList: {
    'platformInfo': 1,
    'shopInfo': 1,
    'staffInfo': 1,
    'shop_id_list': 1,
    'bubble': 1
  }, //向服务器请求的信息
  requireData: {
    platformInfo: {
      name_cn: '平台名称'
    },
    staffInfo: {
      'name': '职员姓名',
      'staff_id': null,
      'identity': '职员身份',
      'status': null
    }, //职员名称
    shopInfo: {
      'name': '请选择商城',
      'shop_id': null,
      'status': null
    }, //当前商城信息
    shop_id_list: [], //商城列表
    bubble: {
      order_wait_mine: 0,
      order_wait_all: 0,
      order_total: 0,
      og_check: 0,
      og_total: 0,
      user_check: 0,
      user_total: 0,
      common_check: 0,
      normal_check: 0,
      normal_lack_all: 0,
      normal_lack_mine: 0,
      user_check_all: 0,
      user_check_mine: 0,
      goods_total: 0,
    } //冒泡信息
  },
  //add
  blockLinkShow: false, //顶部广告栏显示
  mainMenuShow: false, //左侧菜单显示
  logoUrl: '', //图标地址 /src/assets/img/hor-trans-white-200.png
  iframe: {
    width: 0,
    height: 0
  }
}

new Vue({
  el: '#wrapper',
  router,
  render: h => h(Wrapper)
})
