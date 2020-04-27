<template>
  <div id="pageDetail">
    <el-container>
      <el-header class="page-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-file-o"></i>页面设计</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-info primary-color"></i><span class="primary-color">页面详情</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <el-row class="page-detail" :gutter="0">
          <!--组件库-->
          <section>
            <el-card class="box-card  component-lib" shadow="never">
              <div slot="header" class="clearfix">
                <span class="card-title">组件库</span>
              </div>
              <div class="card-component media">
                <span class="comp-title text-3">媒体组件</span>
                <div class="wrap-comp">
                  <nav class="special banner" @click="add('banner')">
                    <p class="fa fa-picture-o"></p>
                    <p class="comp-type">图片轮播</p>
                  </nav>
                  <!-- <nav class="special imageSingle" @click="add('image-single')">
                     <p class="fa fa-picture-o"></p>
                     <p class="comp-type">单图组</p>
                   </nav>-->
                  <nav class="special window" @click="add('phone-window')">
                    <p class="fa fa-picture-o"></p>
                    <p class="comp-type">图片橱窗</p>
                  </nav>
                  <nav class="special video" @click="add('phone-video')">
                    <p class="fa fa-play-circle"></p>
                    <p class="comp-type">视频组</p>
                  </nav>
                </div>
              </div>
              <div class="card-component shop">
                <span class="comp-title text-3">商城组件</span>
                <div class="wrap-comp">
                  <nav class="special search" @click="add('phone-search')">
                    <p class="fa fa-search"></p>
                    <p class="comp-type">搜索框</p>
                  </nav>
                  <nav class="special notice" @click="add('notice')">
                    <p class="fa fa-volume-up"></p>
                    <p class="comp-type">公告组</p>
                  </nav>
                  <nav class="special navBar" @click="add('navBar')">
                    <p class="fa fa-th-large"></p>
                    <p class="comp-type">导航组</p>
                  </nav>
                  <nav class="special goods" @click="add('goods')">
                    <p class="fa fa-shopping-bag"></p>
                    <p class="comp-type">商品组</p>
                  </nav>
                  <nav class="special coupon" @click="add('coupon')">
                    <p class="fa fa-money"></p>
                    <p class="comp-type">优惠券组</p>
                  </nav>
                  <nav class="special sharingGoods" @click="add('sharing-goods')">
                    <p class="fa fa-shopping-bag"></p>
                    <p class="comp-type">拼团商品</p>
                  </nav>
                </div>
              </div>
              <div class="card-component util">
                <span class="comp-title text-3">工具组件</span>
                <div class="wrap-comp">
                  <nav class="special blank" @click="add('blank')">
                    <p class="fa fa-stop"></p>
                    <p class="comp-type">辅助空白</p>
                  </nav>
                  <nav class="special guide" @click="add('guide')">
                    <p class="fa fa-minus"></p>
                    <p class="comp-type">辅助线</p>
                  </nav>
                  <nav class="special richText" @click="add('richText')">
                    <p class="fa fa-file-text"></p>
                    <p class="comp-type">富文本</p>
                  </nav>
                </div>
              </div>
              <div class="btn-save">
                <el-button size="small" @click="saveData">保存页面</el-button>
              </div>
            </el-card>
          </section>
          <!--小程序页面-->
          <section class="wrap-phone">
            <div id="phone-top" :style="{'background-color':formData.pageTop.bgColor}">
              <h4 :class="selectNum==0?'phone-title text-1 item-select':'phone-title text-1'">{{formData.pageTop.title}}</h4>
            </div>
            <!--主要内容-->
            <div id="phone-main">

              <draggable v-model="items" class="phone-wrap">
                <div v-for="(item,index) in items">
                  <!--<div v-if="item.compName==null"></div>-->
                  <PhoneSearch v-if="item.compName==='搜索框'" :selectComp="items[index]" :delNum="index" :key="index"
                               :id="item.comp" :class="index==selectNum?'item-select':''"
                               @delComp="delComponent" @click.native="selectItem(index)">
                  </PhoneSearch>
                  <Notice :class="index==selectNum?'item-select':''"
                          v-if="item.compName==='公告组'"
                          :selectComp="items[index]"
                          :delNum="index"
                          @delComp="delComponent"
                          :id="item.comp"
                          @click.native="selectItem(index)"></Notice>
                  <NavBar v-if="item.compName==='导航组'" :selectComp="items[index]" :delNum="index"
                          @delComp="delComponent" :id="item.comp" @click.native="selectItem(index)"
                          :class="index==selectNum?'item-select':''"></NavBar>
                  <Goods v-if="item.compName==='商品组'" :selectComp="items[index]" :delNum="index"
                         @delComp="delComponent" :id="item.comp" @click.native="selectItem(index)"
                         :class="index==selectNum?'item-select':''"></Goods>
                  <Coupon v-if="item.compName==='优惠券'" :selectComp="items[index]" :delNum="index"
                          @delComp="delComponent" :id="item.comp" @click.native="selectItem(index)"
                          :class="index==selectNum?'item-select':''"></Coupon>
                  <SharingGoods v-if="item.compName==='拼团商品'" :selectComp="items[index]" :delNum="index"
                                @delComp="delComponent" :id="item.comp" @click.native="selectItem(index)"
                                :class="index==selectNum?'item-select':''"></SharingGoods>
                  <Banner v-if="item.compName==='图片轮播'" :selectComp="items[index]" :delNum="index"
                          @delComp="delComponent" :id="item.comp" @click.native="selectItem(index)"
                          :class="index==selectNum?'item-select':''"></Banner>
                  <PhoneWindow
                    v-if="item.compName==='图片橱窗'" :selectComp="items[index]" :delNum="index"
                    @delComp="delComponent" :id="item.comp" @click.native="selectItem(index)"
                    :class="index==selectNum?'item-select':''"></PhoneWindow>
                  <PhoneVideo v-if="item.compName==='视频'" :selectComp="items[index]" :delNum="index"
                              @delComp="delComponent" :id="item.comp" @click.native="selectItem(index)"
                              :class="index==selectNum?'item-select':''"></PhoneVideo>
                  <Blank v-if="item.compName==='辅助空白'" :selectComp="items[index]" :delNum="index"
                         @delComp="delComponent" :id="item.comp" @click.native="selectItem(index)"
                         :class="index==selectNum?'item-select':''"></Blank>
                  <Guide v-if="item.compName==='辅助线'" :selectComp="items[index]" :delNum="index"
                         @delComp="delComponent" :id="item.comp" @click.native="selectItem(index)"
                         :class="index==selectNum?'item-select':''"></Guide>
                  <RichText v-if="item.compName==='富文本'" :selectComp="items[index]" :delNum="index"
                            @delComp="delComponent" :id="item.comp" @click.native="selectItem(index)"
                            :class="index==selectNum?'item-select':''"></RichText>
                </div>
              </draggable>

            </div>
          </section>

          <!--属性修改-->
          <div>
            <el-card class="box-card  component-style" shadow="never">
              <div slot="header" class="clearfix">
                <span class="card-title" v-if="selectNum!=0">{{items[selectNum].compName}}</span>
                <span class="card-title" v-else>页面设置</span>
              </div>
              <div class="component-edit">
                <div class="pageTop" v-show="selectNum==0">
                  <el-form label-width="100px">
                    <el-form-item label="页面标题">
                      <el-input v-model="formData.pageTop.title"></el-input>
                    </el-form-item>
                    <el-form-item label="标题栏背景">
                      <div class="dis-flex">
                        <el-color-picker v-model="formData.pageTop.bgColor" :predefine="predefineColors"
                                         color-format="hex" size="medium" @change="handleColorChange"></el-color-picker>
                        <el-button size="small" @click="resetColor('pageTopBg')">重置</el-button>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>

                <div v-if="selectNum==0"></div> <!--删除全部组件后，内容为空-->
                <SearchStyle :selectComp="items[selectNum]"
                             v-else-if="items[selectNum].component.name=='phone-search'"></SearchStyle>
                <NoticeStyle :selectComp="items[selectNum]"
                             v-else-if="items[selectNum].component.name=='notice'"></NoticeStyle>
                <NavBarStyle :selectComp="items[selectNum]"
                             v-else-if="items[selectNum].component.name=='nav-bar'"></NavBarStyle>
                <GoodsStyle :selectComp="items[selectNum]"
                            v-else-if="items[selectNum].component.name=='goods'"></GoodsStyle>
                <SharingGoodsStyle :selectComp="items[selectNum]"
                                   v-else-if="items[selectNum].component.name=='sharing-goods'"></SharingGoodsStyle>
                <BannerStyle :selectComp="items[selectNum]"
                             v-else-if="items[selectNum].component.name=='banner'"></BannerStyle>
                <WindowStyle :selectComp="items[selectNum]"
                             v-else-if="items[selectNum].component.name=='phone-window'"></WindowStyle>
                <VideoStyle :selectComp="items[selectNum]"
                            v-else-if="items[selectNum].component.name=='phone-video'"></VideoStyle>
                <CouponStyle :selectComp="items[selectNum]"
                             v-else-if="items[selectNum].component.name=='coupon'"></CouponStyle>
                <BlankStyle :selectComp="items[selectNum]"
                            v-else-if="items[selectNum].component.name=='blank'"></BlankStyle>
                <GuideStyle :selectComp="items[selectNum]"
                            v-else-if="items[selectNum].component.name=='guide'"></GuideStyle>
                <RichTextStyle :selectComp="items[selectNum]"
                               v-else-if="items[selectNum].component.name=='rich-text'"></RichTextStyle>

              </div>
            </el-card>
          </div>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>


  import draggable from 'vuedraggable'


  import tool from '../../assets/js_/tool'
  import Bus from '../../bus/bus'

  import PhoneSearch from '../phoneComponent/PhoneSearch'
  import Banner from '../phoneComponent/Banner'
  import ImageSingle from '../phoneComponent/ImageSingle'
  import PhoneWindow from '../phoneComponent/PhoneWindow'
  import PhoneVideo from '../phoneComponent/PhoneVideo'
  import Notice from '../phoneComponent/Notice'
  import NavBar from '../phoneComponent/NavBar'
  import Goods from '../phoneComponent/Goods'
  import Coupon from '../phoneComponent/Coupon'
  import SharingGoods from '../phoneComponent/SharingGoods'
  import Blank from '../phoneComponent/Blank'
  import Guide from '../phoneComponent/Guide'
  import RichText from '../phoneComponent/RichText'

  //组件样式
  import SearchStyle from '../phoneCompStyle/SearchStyle'
  import NoticeStyle from '../phoneCompStyle/NoticeStyle'
  import BannerStyle from '../phoneCompStyle/BannerStyle'
  import WindowStyle from '../phoneCompStyle/WindowStyle'
  import VideoStyle from '../phoneCompStyle/VideoStyle'
  import NavBarStyle from '../phoneCompStyle/NavBarStyle'
  import GoodsStyle from '../phoneCompStyle/GoodsStyle'
  import SharingGoodsStyle from '../phoneCompStyle/SharingGoodsStyle'
  import CouponStyle from '../phoneCompStyle/CouponStyle'
  import BlankStyle from '../phoneCompStyle/BlankStyle'
  import GuideStyle from '../phoneCompStyle/GuideStyle'
  import RichTextStyle from '../phoneCompStyle/RichTextStyle'

  export default {
    name: "page-detail1",
    data() {
      return {
        delNum: null, //删除最后一个组件后的序号
        compId: 0, //组件Id
        Num: 0,
        newMsg: {
          name: 'cong'
        },
        delComp: null, //要删除的组件
        selectNum: 1,
        items: [{}],
        predefineColors: ['#63B359', '#2C9F67', '#509FC9', '#5885CF', '#9062C0', '#D09A45', '#E4B138', '#EE903C', '#F08500', '#A9D92D', '#DD6549', '#CC463D', '#CF3E36', '#5E6671'],
        formData: {
          pageTop: {
            title: 'RedPaper 小程序',
            bgColor: '#ffffff',
          },
          phoneWindow: {
            radio: 12,
          }
        },
      }
    },

    methods: {

      add(component) {
        this.compId++
        var comp = 'component_' + this.compId
        if (component == 'phone-search') {  //搜索框
          this.items.push({
            'component': PhoneSearch,
            'compName': '搜索框',
            'title': '请输入关键字进行搜索',
            'inputStyle': 'search-normal', //1:方形 2：圆角 3.圆弧
            'positionText': 'search-left', //1.居左 2.居中 3.居右
            'comp': comp,  //组件id
          })
        } else if (component == 'banner') {  //图片轮播
          this.items.push({
            'component': Banner,
            'compName': '图片轮播',
            'bannerImg': [
              {
                img: 'https://yoshop.qunzu8.net/uploads/20180719122935b8e933975.jpg',
                page: 'pages/goods/index?goods_id=10002'  //链接地址
              },
              {
                img: 'https://yoshop.qunzu8.net/uploads/20180719122935b8e933975.jpg',
                page: 'pages/goods/index?goods_id=10002'  //链接地址,
              },
              {
                img: 'https://yoshop.qunzu8.net/uploads/20180719122935b8e933975.jpg',
                page: 'pages/goods/index?goods_id=10002'  //链接地址
              }
            ],
            'comp': comp,
          })
        } else if (component == 'image-single') { //单图组
          this.items.push({
            'component': ImageSingle,
          })
        } else if (component == 'phone-window') {  //图片橱窗
          this.items.push({
            'component': PhoneWindow,
            'compName': '图片橱窗',
            'windowSpan': 8,
            'paddingTop': 0, //上下边距
            'paddingLeft': 0, //左右边距
            'windowImg': [
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/banner/01.png',
                page: 'pages/goods/index?goods_id=10002',
              },
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/banner/01.png',
                page: 'pages/goods/index?goods_id=10002',
              },
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/banner/01.png',
                page: 'pages/goods/index?goods_id=10002',
              },
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/banner/01.png',
                page: 'pages/goods/index?goods_id=10002',
              },
            ],
            'comp': comp,
          })
        } else if (component == 'phone-video') { //视频
          this.items.push({
            'component': PhoneVideo,
            'compName': '视频',
            'comp': comp,
            'paddingTop': 0,
            'page': 'http://vjs.zencdn.net/v/oceans.mp4',  //视频地址
            'poster': 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-6.jpg',  //视频封面
          })
        } else if (component == 'notice') {  //公告组
          this.items.push({
            'component': Notice,
            'compName': '公告组',
            'paddingTop': 4,
            'bgColor': '#ffffff',
            'fontColor': '#000000',
            'title': '这是一条自定义公告标题',
            'comp': comp,  //组件id
          })
        } else if (component == 'navBar') {  //导航组
          this.items.push({
            'component': NavBar,
            'compName': '导航组',
            'bgColor': '#ffffff',
            'count': 6,
            'imgItem': [
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/navbar/01.png',
                text: '按钮文字1',
                fontColor: '#555',
                page: '',
              },
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/navbar/01.png',
                text: '按钮文字2',
                fontColor: '#555',
                page: '',
              },
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/navbar/01.png',
                text: '按钮文字3',
                fontColor: '#555',
                page: '',
              },
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/navbar/01.png',
                text: '按钮文字4',
                fontColor: '#555',
                page: '',
              },
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/navbar/01.png',
                text: '按钮文字4',
                fontColor: '#555',
                page: '',
              }
            ],
            'comp': comp,  //组件id
          })
        } else if (component == 'goods') { //商品组
          this.items.push({
            'component': Goods,
            'compName': '商品组',
            'comp': comp,  //组件id
            'bgColor': '#efefef',
            'paddingTop': 3,
            'paddingLeft': 3,
            'windowSpan': 12,
            'showMessage': ['商品名称', '商品价格'],
            'goodsItem': [
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/goods/01.jpg',
                name: '商品名称',
                price: '99.00',
              },
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/goods/02.jpg',
                name: '商品名称',
                price: '99.00',
              }
            ]
          })
        } else if (component == 'coupon') {  //优惠券
          this.items.push({
            'component': Coupon,
            'compName': '优惠券',
            'comp': comp,
            'bgColor': '#ffffff',
            'paddingTop': 3,
          })
        } else if (component == 'sharing-goods') {  //  拼团商品
          this.items.push({
            'component': SharingGoods,
            'compName': '拼团商品',
            'comp': comp,  //组件id
            'bgColor': '#ffffff',
            'paddingTop': 3,
            'paddingLeft': 3,
            'windowSpan': 12,
            'goodsItem': [
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/goods/01.jpg',
                name: '拼团商品1',
                current_price: '19.00',
                original_price: '79.00',
              },
              {
                img: 'https://demo.yiovo.com/assets/store/img/diy/goods/02.jpg',
                name: '拼团商品2',
                price: '99.00',
                current_price: '29.00',
                original_price: '79.00',
              },
              {
                img: 'https://img.yzcdn.cn/public_files/2018/01/30/585dae8447d80013ef9344adc973c6ee.png?imageView2/2/w/290/h/0/q/75/format/webp',
                name: '拼团商品3',
                price: '99.00',
                current_price: '39.00',
                original_price: '79.00',
              }
            ]
          })
        } else if (component == 'blank') { //辅助空白
          this.items.push({
            'component': Blank,
            'compName': '辅助空白',
            'comp': comp,
            'bgColor': '#ffffff',
            'height': 20,
          })
        } else if (component == 'guide') {
          this.items.push({
            'component': Guide,
            'compName': '辅助线',
            'comp': comp,
            'bgColor': '#ffffff',
            'lineStyle': 'solid',
            'lineColor': '#000000',
            'lineHeight': 1,
            'paddingTop': 10,

          })
        } else if (component == 'richText') {
          this.items.push({
            'component': RichText,
            'compName': '富文本',
            'comp': comp,
            'paddingTop': 0,
            'paddingLeft': 0,
            'bgColor': '#ffffff',
            'textContext': '这里是富文本的内容', //富文本内容
          })
        } else if (component == 'compNull') {
          this.items.push({
            'component': null,
            'compName': null,
            'comp': comp,
          })
        }

      },
      selectItem(index) {
        if (index - 1 == this.delNum) { //删除最后一个组件，选中为倒数第二个组件（也就是删除后items最后一项）
          this.selectNum = index - 1
          Bus.$emit('selectNum', this.selectNum)
          Bus.$emit('item', this.items[index - 1])
        } else {
          this.selectNum = index
          Bus.$emit('selectNum', this.selectNum)
          Bus.$emit('item', this.items[index])
        }
      },
      async delComponent(data) {
        /* var res = await tool.showModal(this, '确定删除?', true, '是的', '提示', 'warning')
         if (res[0] == 0) return false*/

        var lg = this.items.length - 1

        this.items.splice(data, 1)
        //this.items=[]
        console.log(this.items)

        if (lg == data) {
          this.delNum = data - 1
        }
      },
      //改变颜色
      handleColorChange(val) {
        console.log(val)
      },
      resetColor(val) {
        if (val == "pageTopBg") {
          this.formData.pageTop.bgColor = '#ffffff'
        }
      },
      changeRadio(val) {
        console.log(val)
        this.formData.phoneWindow.radio = val
      },
      //组件属性
      getSearchTitle(val) {
        //this.formData.
      },

      saveData() {
        console.log('items:', this.items)
      },

    },
    components: {
      draggable,
      //子组件
      PhoneSearch,
      Notice,
      Banner,
      PhoneWindow,
      PhoneVideo,
      NavBar,
      Goods,
      Coupon,
      SharingGoods,
      Blank,
      Guide,
      RichText,
      //子组件样式
      SearchStyle,
      NoticeStyle,
      BannerStyle,
      WindowStyle,
      VideoStyle,
      NavBarStyle,
      GoodsStyle,
      SharingGoodsStyle,
      CouponStyle,
      BlankStyle,
      GuideStyle,
      RichTextStyle,
    },
    watch: {},
    created() {

      /* this.items.push({
         'component': PhoneSearch,
         'select': null,
         'compName': '搜索框',
         'title': '请输入关键字进行搜索',
         'inputStyle': 'search-normal', //1:方形 2：圆角 3.圆弧
         'positionText': 'search-left', //1.居左 2.居中 3.居右
         'comp': 'component_0',  //组件id
       })*/

      // this.add('compNull')
      this.add('phone-search')
      this.add('banner')
      this.add('navBar')
      this.add('phone-video')
      this.add('notice')
      this.add('navBar')
    },
    mounted() {

    }
  }
</script>

<style>

  .page-detail {
    display: flex;
    padding: 20px 0;
    align-items: flex-start;
    justify-content: space-between;
  }

  /*组件库*/
  .page-detail .el-card.component-lib {
    width: 320px;
  }

  .page-detail .el-card__header {
    padding: 10px 20px !important;
  }

  .card-title {
    padding-left: 8px;
    border-left: 3px solid #409EFF;
  }

  .comp-title {
    font-size: 14px
  }

  .wrap-comp {
    display: flex;
    flex-wrap: wrap;
  }

  .wrap-comp .special {
    width: 65px;
    margin: 10px 5px;
    padding: 4px 8px;
    background-color: #f4f4f4;
    text-align: center;
    border: 1px solid #DCDFE6;
    cursor: pointer;
  }

  .wrap-comp .special:hover {
    border-color: #409EFF;
    background-color: #FFFFFF;
    transition: 0.5s;
  }

  .wrap-comp .comp-type {
    padding: 5px 3px;
    font-size: 14px;
  }

  .wrap-comp .special .fa {
    padding-top: 8px;
    font-size: 20px;
  }

  .box-card .util {
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
  }

  .btn-save {
    margin-top: 10px;
    text-align: right;
  }

  /*手机显示*/
  .wrap-phone {
    width: 370px;
    min-width: 370px;
    margin-bottom: 100px;
    border-radius: 3px;
    box-shadow: 0 3px 10px #dcdcdc;
    border: 1px solid #ddd;
  }

  #phone-top {
    position: relative;
    width: 100%;
    height: 66px;
    background: url("../../assets/img/phone-top-black.png") no-repeat;
    background-size: cover;
    text-align: center;
    font-weight: normal;
    background-color: #FFFFFF;
  }

  .wrap-phone .phone-title {
    line-height: 98px;
  }

  #phone-main {
    position: relative;
  }

  .drag {
    position: relative;
    cursor: move;
  }

  .item-select::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    border: 2px dashed #409EFF;
    z-index: 9;
  }

  .drag:hover::before, .item-select .drag::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    border: 2px dashed #409EFF;
    cursor: move !important;
    z-index: 9;
  }

  .drag:hover .btn-delete, .drag.item-select .btn-delete {
    display: block;
    z-index: 10;
  }

  /*手机顶部样式*/


  /*组件属性*/
  .page-detail .el-card.component-style {
    width: 400px;
  }

  .el-card.component-style .el-card__body {
    margin-bottom: 50px;
  }

  .component-edit .el-input__inner {
    height: 34px;
    line-height: 34px;
  }

  .page-detail .el-color-picker--medium .el-color-picker__trigger {
    width: 60px;
  }

  .phone-wrap {
    height: 550px;
    overflow: auto;
  }

  #pageDetail .page-header {
    padding-top: 10px;
  }

</style>
