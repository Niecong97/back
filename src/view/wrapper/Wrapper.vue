<template>
  <div id="wrapper">
    <el-container>
      <el-header class="block-link" v-show="blockLinkShow">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-row fixed :gutter="20">
              <img class="logo" src="../../assets/img/logo-white-250.png"/>
              <el-col>
                <h1>21st Business</h1>
                <h2>HANGZHOUREDPAPAER INFORMATION TECHNOLOGY Co.,Ltd</h2>
                <el-tooltip class="item" effect="dark" content="25320220" placement="bottom">
                  <el-button type="danger">QQ</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="LuLuLuHu" placement="bottom">
                  <el-button type="success">微信</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="+86 13115862777" placement="bottom">
                  <el-button type="info">电话</el-button>
                </el-tooltip>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="infomation" :span="8">
            <h1>业务范围</h1>
            <ul>
              <li>Web、App、小程序开发</li>
              <li>企业信息化解决方案</li>
              <li>"互联网+"营销策划</li>
              <li>广告投放</li>
            </ul>
          </el-col>
          <el-col class="infomation" :span="8">
            <h1>联系我们</h1>
            <ul>
              <li>
                <a href="http://21b.cn" target="_blank">
                  <i class="fa fa-home"></i> 官网：http://www.21b.cn
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-map-marker"></i> 地址：浙江省杭州市江干区白杨街道十号大街58号东方科技城2104室
                </a>
              </li>
              <li>
                <a href="tel:0574-27988063">
                  <i class="fa fa-phone"></i> 电话：0574-27988063
                </a>
              </li>
              <li>
                <a href="mailto:hujiayilu@21b.cn">
                  <i class="fa fa-envelope-o fa-fw"></i> 邮件：hujiayilu@21b.cn
                </a>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="main-content">
        <el-menu default-active="1-1" class="el-menu-vertical block-main-menu" :collapse="mainMenuShow"
                 background-color="#2C2E2F" text-color="#fff" active-text-color="#ffd04b" unique-opened>
          <div class="head">
            <img class="logo" :src="logoUrl"/>
            <i class="fa fa-comment" v-on:click="linkBlockToogle"></i>
          </div>
          <!--动态添加列表项-->
          <el-submenu :index="key.toString()" v-if="item.children" v-for="(item,key) in menuData"> <!--index为唯一值-->
            <template slot="title">
              <!--class="fa fa-vcard"-->
              <i v-bind:class="'fa '+item.icon"></i>
              <span>{{item.label}}</span>
            </template>
            <el-submenu v-if="itemList.children &&　itemList.children.length>0"
                        :index="(key+'-'+itemList_key).toString()" v-for="(itemList,itemList_key) in item.children">
              <!--判断是否有children-->
              <template slot="title">
                <i v-bind:class="'fa ' +itemList.icon"></i>
                <span>{{itemList.label}}</span>
              </template>
              <el-menu-item :index="(key+'-'+itemList_key+'-'+itemListRd_key).toString()" :url="itemListRd.url"
                            v-for="(itemListRd,itemListRd_key) in itemList.children" @click="changeUrl(itemListRd.url)">
                <i v-bind:class="'fa '+itemListRd.icon"></i>{{itemListRd.label}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="(key+'-'+itemList_key).toString()" :url="itemList.url"
                          @click="changeUrl(itemList.url)">
              <!--url="card/create?flag=0"-->
              <i v-bind:class="'fa '+itemList.icon"></i>{{itemList.label}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <el-container>
          <el-header class="block-infomation">
            <i class="fa fa-bars" v-on:click="mainMenuToggle"></i>
            <div class="options">
              <!--<el-select v-model="requireData['shopInfo']['shop_id']" placeholder="请选择商城"
                         @change="handleShopMenu">
                <el-option v-for="item in requireData['shop_id_list']" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>-->
              <el-select v-model="shop.value" placeholder="请选择商城"
              >  <!--@change="handleShopMenu"-->
                <el-option v-for="option,index in options" :key="option" :label="option"
                           :value="option">
                </el-option>
              </el-select>
              <el-dropdown class="staffInfo user">  <!--@command="handleAccountMenu"-->
                <span class="el-dropdown-link">
									    <i class="fa fa-user"></i> <!--{{requireData['staffInfo']['name']}}-->
									</span>
                <el-dropdown-menu slot="dropdown">
                  <!--<el-dropdown-item>个人信息</el-dropdown-item>  command="mine"
                  <el-dropdown-item divided>登出</el-dropdown-item> command="logOut"-->
                  <el-dropdown-item disabled>
                    个人信息
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    2018年8月11日 16:39:56
                  </el-dropdown-item>
                  <el-dropdown-item>
                    登出
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown class="staffInfo">
                <span class="el-dropdown-link">
									    <i class="fa fa-bell-o"></i>
									</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    通知1
                  </el-dropdown-item>
                  <el-dropdown-item>
                    通知2
                  </el-dropdown-item>
                  <el-dropdown-item>
                    通知3
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </div>
          </el-header>
          <el-main class="block-iframe">
            <router-view>

            </router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>

  export default {
    name: "wrapper",
    data() {
      return {
        sonNum: null,
        logoUrl: require('../../assets/img/hor-trans-white-200.png'),
        mainMenuShow: false,
        blockLinkShow: false, //顶部广告栏显示
        options: [
          '中品会',
          '中品会1'
        ],
        shop: {
          value: '中品会'
        },
        menuData: [
          {
            "icon": "fa-dashboard",
            "label": "数据统计",
            "children": [
              {
                "icon": "fa-eye", "label": "总览", "url": "/data/overView"
              },
              {
                "icon": "fa-signal", "label": "流量", "url": "/data/flush"
              },
              {
                "icon": "fa-signal", "label": "用户画像分布", "url": "/data/userPortrait"
              },
              /* {
                 "icon": "fa-signal", "label": "营业统计", "url": "/data/flushz"
               },*/
              {
                "icon": "fa-cny",
                "label": "交易量",
                "url": "/data/trade"

              }]
          },
          {
            "icon": "fa-file-text-o",
            "label": "订单",
            "children": [
              {
                "icon": "fa-table",
                "label": "全部订单",
                "url": "/order/all",
              }
            ]
          },
          {
            "icon": "fa-university",
            "label": "单位",
            "children": [
              {
                "icon": "fa-table",
                "label": "全部单位",
                "url": "/organization/all",
              },
              {
                "icon": "fa-plus",
                "label": "新增单位",
                "url": "/organization/create",
              }
            ]
          },
          {
            "icon": "fa-cubes",
            "label": "商品",
            "children": [
              {
                "icon": "fa-table",
                "label": "全部商品",
                "url": "/normal/all",
              },
              {
                "icon": "fa-plus",
                "label": "新增商品",
                "url": "/normal/create",
              }
            ]
          },
          /* {
             "icon": "fa-vcard",
             "label": "卡券",
             "children": [{
               "icon": "fa-vcard",
               "label": "会员卡",
               "children": [
                 {
                   "icon": "fa-table",
                   "label": "会员卡列表",
                   "url": "/card/all?flag=0"
                 },
                 {
                   "icon": "fa-plus",
                   "label": "创建会员卡",
                   "url": "/card/create?flag=0"
                 }]
             }, {
               "icon": "fa-money",
               "label": "优惠券",
               "children": [{"icon": "fa-table", "label": "优惠券列表", "url": "/card/all"}, {
                 "icon": "fa-plus",
                 "label": "创建优惠券",
                 "url": "/card/create"
               },
                 {
                   "icon": "fa-minus",
                   "label": "核销",
                   "url": "/card/writeOff"
                 },
                 {
                   "icon": "fa-qrcode", "label": "投放", "url": "/card/getCardsQrcode"

                 }]
             }]
           },*/
          {
            "icon": "fa-vcard",
            "label": "卡券",
            "children": [
              {
                "icon": "fa-vcard",
                "label": "全部卡券",
                "url": "/card/all",
              }, {
                "icon": "fa-money",
                "label": "新增卡券",
                "url": "/card/create",
              }, {
                "icon": "fa-plus",
                "label": "投放卡券",
                "url": "/card/getCardsQrcode",
              }, {
                "icon": "fa-minus",
                "label": "核销卡券",
                "url": "/card/writeOff",
              }
            ]
          },
          {
            "icon": "fa-user-secret",
            "label": "职员",
            "children": [
              {
                "icon": "fa-table",
                "label": "全部职员",
                "url": "/staff/all",
              },
              {
                "icon": "fa-plus",
                "label": "新增职员",
                "url": "/staff/create",
              },

            ]
          },
          {
            "icon": "fa-users",
            "label": "用户",
            "children": [
              {
                "icon": "fa-table",
                "label": "全部用户",
                "url": "/user/all"
              }
            ]
          },
          {
            "icon": "fa-file-text-o",
            "label": "工单",
            "children": [
              {
                "icon": "fa-question-circle",
                "label": "用户反馈",
                "url": "/feedback/all"
              },
              {
                "icon": "fa-gift",
                "label": "样品赠送",
                "url": "/wish_order/all"
              },
              {
                "icon": "fa-question",
                "label": "客服咨询",
                "url": "/question",
              }
            ]
          },
          {
            "icon": "fa-newspaper-o",
            "label": "新闻",
            "children": [
              {
                "icon": "fa-table",
                "label": "全部新闻",
                "url": "/news/all",
              },
            ]
          },
          {
            "icon": "fa-cogs",
            "label": "设置",
            "children": [
              {
                "icon": "fa-list-ul",
                "label": "分类标准",
                "children": [
                  {
                    "icon": "fa-table",
                    "label": "全部分类标准",
                    "url": "/sortType/all"
                  },
                  {
                    "icon": "fa-table",
                    "label": "新增分类标准",
                    "url": "/sortType/create"
                  }
                ]
              },
              {
                "icon": "fa-file-o",
                "label": "页面",
                "children": [
                  {
                    "icon": "fa-home",
                    "label": "首页",
                    "url": "/mini_page/index",
                  },
                  {
                    "icon": "fa-thumbs-up",
                    "label": "推荐",
                    "url": "/mini_page/recommend",
                  },
                  {
                    "icon": "fa-info",
                    "label": "商城详情",
                    "url": "/mini_page/shop_detail",
                  },
                  /* {
                     "icon": "fa-question",
                     "label": "购买须知",
                     "url": "/mini_page/attention",
                   },*/
                  {
                    "icon": "fa-info",
                    "label": "页面设计",
                    "url": "/pageDesign/all",
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {
      changeUrl(url) {
        console.log(url)
        if(url.lastIndexOf('flag')>0){
          this.$router.push({
            path:url,
            query:{flag:0}
          })
        }else {
          this.$router.push(url)
        }
        //vm.changeUrl_main(url)
      },
      //【显示和关闭左侧主菜单】
      mainMenuToggle: function () {
        if (this.mainMenuShow === true) {
          this.mainMenuShow = false;
          this.logoUrl = require('../../assets/img/hor-trans-white-200.png')
        } else {
          this.mainMenuShow = true;
          this.logoUrl = require('../../assets/img/hor-trans-white-64.png')
        }
      },
      //【显示和关闭顶部广告窗口】
      linkBlockToogle: function () {
        //return false
        this.blockLinkShow = !this.blockLinkShow;
      },
    },
  }
</script>

<style>
  @import "../../assets/css/style.css";

  body {
    overflow: hidden;
  }

  .wrapper {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
  }
</style>
