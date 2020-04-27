/*import {vm} from '../index_main'*/
import tool from '../../src/assets/js_/tool'

export const mixinAll = {
  data() {
    return {
      /* 【prepare】 */
      loading: true, //页面读取态
      disabled: true, //页面禁用态
      requireList: {}, //请求的数据
      requireData: {}, //请求数据的容器
      mainOperate: 'getPage', //getOptions后的主操作
      /* 【getPage】 */
      pageInfo: {
        now: 1, //当前页数
        size: 10, //每页记录数目
        rowvTotal: 0 //总记录数目（用于计算页数）
      },
      target: null, //选中的搜索字段
      keyword: null, //手动填入的搜索关键词
      selected: [], //已选中条目(存放主键)
      tableLoading: false, //表格读取态
      tableData: [
      ], //表数据
    }
  },
  methods: {
    //【获取初始数据、权限信息等】
    async prepare() {
     /* var that = this
     this.loading = true //开启加载态
     this.disabled = true //开启禁用态
      //【1】检测登陆态
      var res = tool.checkLogin()
      if (res[0] == 0) return false
      //【2】获取options信息
      this.getOptions()
      await tool.sleep(500)
      this.disabled = false
      this.loading = false*/

      var that = this
      this.disabled = false
      this.tableLoading = false



      //write something
    },
    //【获取参数 (options信息)】
   async getOptions() {
      var that=this
      if (!tool.empty(that.requireList)) {
        var res = await tool.post('option/ajax_getOptions',that.requireList)
        if (res[0] == 0) {
          tool.showToast(that, res[2])
          return false
        }
        var flag = tool.checkOptions(that, that.requireList, res[1])
        if (flag[0] == 1) for (var i in res[1]) myData['requireData'][i] = res[1][i]
      } else var flag = [1]
      if (flag[0] == 0) return false
      if (!tool.empty(this.mainOperate)) await eval('that.' + this.mainOperate + "()")
    },
    //【获取分页详情】
    async getPage() {
      var that = this
      that.tableLoading = true
      that.disabled = true
      var flag = tool.getUrlParam('flag')
      that.myData.condition = tool.empty(flag) ? null : {group: flag}
      var postData = {
        flag: that.myData.own, //查询本商城
        pageNow: that.pageInfo['now'], //当前页
        pageSize: that.pageInfo['size'], //每页条目
        condition: that.myData.condition, //搜索条件
      }
      console.log(postData)
      if (arguments[0] != undefined) {
        if (typeof(arguments[0]) == "number")
        //填写数字 跳页
          that.myData.keyword = null //重置
        else if (typeof(arguments[0]) == "object") {
          //鼠标点击事件 搜索
          if (that.myData.keyword == undefined) {
            that.$message.error('请填写搜索内容后，再点击搜索按钮')
            return false
          }
        }
      }
      //加入搜索条件
      tool.empty(that.keyword) ? null : (postData.target = that.target, postData.keyword = that.keyword)
      var res = await tool.post(that.myData.module + '/ajax_getPage', postData)
      res[0] == 1 ? (that.tableData = res[1]['rows'], that.pageInfo['rowTotal'] = parseInt(res[1]['count'])) : that.tableData = []
      await tool.sleep(500)
      that.tableLoading = false
      that.disabled = false
    },
    //【单条记录背景色】
    tableRowClassName({row, rowIndex}) {
      return row.status == 0 ? 'danger-row' : ''
    },
    //【单页记录数目变更】
    handleSizeChange(val) {
      this.pageInfo.size = val
      this.getPage()
    },
    //【搜索】
    search() {
      var that = this
      this.pageNow = 1
      that.getPage()
    },
    //【跳转页面】
    handleCurrentChange(val) {
      this.pageInfo.now = val
      this.getPage()
    },
    //【选中条目】
    handleSelect(val) {
      myData.selected = []
      for (var i in val) eval("myData.selected.push(val[i]." + myData.primary_key + ")")
    },
    //【跳转编辑页】
    /*editRow(id) {
      window.location.href = '/admin/' + myData.module + "/detail?id=" + id
    }, */
editRow(id) {
/*vm.getDetailUrl(id,this.myData.module)*/
console.log("链接..")
    },
    //【删除】
    async deleteRows() {
      var selected = myData.selected
      var that = this
      var res = await tool.showModal(that, '请确认删除的对象，删除后将无法复原， 是否继续?')
      if (res[0] == 0) return false
      var postData = {
        condition: {}
      }
      postData.condition[myData.primary_key] = ['in', selected.toString()]
      res = await tool.post(myData.module + '/ajax_d', postData)
      if (res[0] == 0) tool.showToast(that, res[2])
      else tool.showToast(that, '修改成功，共影响了' + res[1] + '条记录')
      that.getPage()
    },
    //【变更状态】
    async ban(flag) {
      var that = this
      //这里存在一个问题就是在confirm中写myData读取不到 故此先提出来
      var selected = myData.selected
      var info = flag == 0 ? '禁用' : '启用'
      var res = await tool.showModal(that, '确定' + info + '?', true, '是的', '提示', 'warning')
      if (res[0] == 0) return false
      var postData = {
        condition: {},
        data: {
          status: flag
        },
        scene: 'status'
      }
      if (res[0] == 0) return false
      //操作单个或批量
      postData.condition[myData.primary_key] = arguments[1] != undefined ? arguments[1] : ['in', selected.toString()]
      res = await tool.post(myData.module + '/ajax_u', postData, that)
      if (res[0] == 0) tool.showToast(that, res[2])
      else tool.showModal(app, '操作成功！本次修改共影响：' + res[1] + '条记录', false, '好的', null, 'success')
      that.getPage()
    },
  },
  created(){
    //this.prepare()
  }

}
