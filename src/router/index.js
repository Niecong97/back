import Vue from 'vue'
import Router from 'vue-router'
//import OverView from '../pages/data/OverView'

/*按需加载*/
//const UserLogin = () => require.ensure([], () => (require('../components/login/UserLogin')), 'UserLogin')
// 数据统计
const OverView = () => require.ensure([], () => (require('../pages/data/OverView')), 'OverView')
const OverFlush = () => require.ensure([],() => (require('../pages/data/Flush')),'OverFlush')
const Trade = () => require.ensure([],() => (require('../pages/data/Trade')),'Trade')
const UserPortrait = () => require.ensure([],() => (require('../pages/data/UserPortrait')),'UserPortrait')

// 订单
const OrderAll = () => require.ensure([], () => (require('../pages/order/OrderAll')), 'OrderAll')
const OrderDetail = () => require.ensure([], () => (require('../pages/order/OrderDetail')), 'OrderDetail')

// 单位
const OrganizationAll = () => require.ensure([], () => (require('../pages/organization/OrganizationAll')), 'OrganizationAll')
const OrganizationCreate = () => require.ensure([], () => (require('../pages/organization/OrganizationCreate')), 'OrganizationCreate')
const OrganizationDetail = () => require.ensure([], () => (require('../pages/organization/OrganizationDetail')), 'OrganizationDetail')

// 商品
const NormalAll = () => require.ensure([], () => (require('../pages/normal/NormalAll')), 'NormalAll')
const NormalCreate = () => require.ensure([], () => (require('../pages/normal/NormalCreate')), 'NormalCreate')
const NormalDetail = () => require.ensure([], () => (require('../pages/normal/NormalDetail')), 'NormalDetail')

// 职员
const StaffAll = () => require.ensure([], () => (require('../pages/staff/StaffAll')), 'StaffAll')
const StaffCreate = () => require.ensure([], () => (require('../pages/staff/StaffCreate')), 'StaffCreate')
const StaffDetail = () => require.ensure([], () => (require('../pages/staff/StaffDetail')), 'StaffDetail')

// 卡券
const CardAll = () => require.ensure([], () => (require('../pages/card/CardAll')), 'CardAll')
const CardCreate = () => require.ensure([], () => (require('../pages/card/CardCreate')), 'CardCreate')
const CardWriteOff = () => require.ensure([], () => (require('../pages/card/CardWriteOff')), 'CardWriteOff')
const CardGetQrcode = () => require.ensure([], () => (require('../pages/card/CardGetQrcode')), 'CardGetQrcode')
const CardDetail = () => require.ensure([], () => (require('../pages/card/CardDetail')), 'CardDetail')

// 用户
const UserAll = () => require.ensure([], () => (require('../pages/user/UserAll')), 'UserAll')
const UserDetail = () => require.ensure([], () => (require('../pages/user/UserDetail')), 'UserDetail')

// 页面设计
const PageList = () => require.ensure([], () => (require('../pages/pageDesign/PageList')), 'PageList')
const PageDetail = () => require.ensure([], () => (require('../pages/pageDesign/PageDetail')), 'PageDetail')

// 新闻
const NewsList = () => require.ensure([], () => (require('../pages/news/NewsList')), 'NewsList')
const NewsCreate = () => require.ensure([], () => (require('../pages/news/NewsCreate')), 'NewsCreate')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/data/overView',
      component:OverView,
    },
    { // --总览
      path: '/data/overView',
      component: OverView,
    },
    {// -流量
      path: '/data/flush',
      component: OverFlush,
    },
    {// --用户画像分布
      path:'/data/UserPortrait',
      component:UserPortrait
    },
    {// --交易量
      path:'/data/trade',
      component:Trade
    },
    {// --全部订单
      path:'/order/all',
      component:OrderAll
    },
    {// 只需要匹配id  不需要写入detail
      // path:'/order/detail/:id ×
      path: '/order/:id',
      component: OrderDetail,
    },
    {
      path: '/organization/all',
      component: OrganizationAll,
    },
    {
      path: '/organization/create',
      component: OrganizationCreate,
    },
    {
      path: '/organization/detail/:id',
      component: OrganizationDetail
    },
    {
      path: '/normal/all',
      component: NormalAll,
    },
    {
      path: '/normal/create',
      component: NormalCreate,
    },
    {
      path: '/normal/:id',
      component: NormalDetail,
    },
    { // --全部职员
      path: '/staff/all',
      component: StaffAll,
    },
    { // --新增职员
      path: '/staff/create',
      component: StaffCreate,
    },
    { // --职员详情
      path: '/staff/detail',
      component: StaffDetail,
    },
    { // 卡券列表
      path: '/card/all',
      component: CardAll,
    },
    { // 新增卡券
      path: '/card/create',
      component: CardCreate,
    },

    { // 核销卡券
      path: '/card/writeOff',
      component: CardWriteOff,
    },
    { // 投放卡券
      path: '/card/getCardsQrcode',
      component: CardGetQrcode,
    },
    {
      path: '/card/:id',
      component: CardDetail,
    },
    { // 用户列表
      path: '/user/all',
      component: UserAll,
    },
    { // 用户详情
      path: '/user/:id',
      component: UserDetail,
    },
    //页面设计
    {
      path: '/pageDesign/all',
      component: PageList,
    },
    {
      path: '/pageDesign/detail/:id',
      component: PageDetail
    },
    //新闻
    {
      path: '/news/all',
      component: NewsList,
    },
    {
      path: '/news/create',
      component: NewsCreate,
    }
  ]
})
