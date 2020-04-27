import areaList from '../assets/js/areaList'
import tool from '../../src/assets/js_/tool'

export const mixinCreate = {
  data() {
    return {
      /* 【prepare】 */
      loading: false, //页面读取态
      disabled: false, //页面禁用态
      mainOperate: null, //getOptions后的主操作
      fileList: [], //已上传文件列表
      fileName: [],//本页需要上传的文件名称
    }
  },
  methods: {
    //【获取初始数据、权限信息等】
    async prepare() {
      var that = this
      that.loading = true //开启加载态
      that.disabled = true //开启禁用态
      //【1】检测登陆态
      var res = tool.checkLogin()
      if (res[0] == 0) return false
      //【2】获取options信息
      that.getOptions()
      await tool.sleep(500)
      that.disabled = false
      that.loading = false
      //write something
    },
    //【获取参数 (options信息)】
    async getOptions() {
      var that = this
      if (!tool.empty(that.myData.requireList)) {
        var res = await tool.post('option/ajax_getOptions', that.myData.requireList)
        if (res[0] == 0) {
          tool.showToast(that, res[2])
          return false
        }
        var flag = tool.checkOptions(that, that.myData.requireList, res[1])
        if (flag[0] == 1) for (var i in res[1]) that.myData['requireData'][i] = res[1][i]
      } else var flag = [1]
      if (flag[0] == 0) return false
      if (!tool.empty(that.mainOperate)) await eval('that.' + that.mainOperate + "()")
    },
    //【提交】
    async submitForm(formName) {
      var that = this
      that.loading = true
      that.disabled = true
      // 处理post数据
      var postData = that.formData
      // detail 页面需要传入condition
      var condition = {}
      condition[that.myData.primary_key_name] = that.myData.primary_key_value
      var res = await tool.submitForm(that, that.myData.module + '/ajax_c', 'c', formName, postData)
      await tool.sleep(500)
      that.loading = false
      that.disabled = false
    },
    //【重置表单】
    resetForm(formName) {
      if (myData.mainOperate != 'getDetail') {
        this.$refs[formName].resetFields()
        return false
      }
      var that = this
      that.$refs[formName].resetFields();
      //对象的复制
      var data = JSON.parse(JSON.stringify(myData.oldData))
    },
    //【按输入的编号在sortTypeList中搜索管理员】
    searchList(name) {
      var that = this
      var flag = 0
      var targetList = eval('myData.' + name + "_list") //targetList=sort_id_list
      var inputId = eval('myData.formData.' + name + "_input") //inputId=sort_id_input
      for (var i in targetList) {
        if (targetList[i].value == inputId) {
          flag = 1
          //---------------------自定义的地方---------------------
          if (name == "sort_type_id") {
            that.handleSortTypeChange(inputId)
          } else eval("myData.formData." + name + "=inputId")
        } else continue
      }
      if (flag == 0) {
        eval("myData.formData" + name + "=undefined")
        this.$message.error("没有找到对应的项目，请确认输入的编号是否正确")
      }
      this.$refs['ruleForm'].clearValidate()
    },
    //【上传成功回调】成功一张 回调一次】
    uploadSuccess(response, file, fileList) {
      var that = this
      if (tool.empty(response.code)) {
        tool.showToast(this, '上传失败')
        return false
      }
      if (response.code != '1') {
        tool.showToast(this, fileList[i]['response']['cn'])
        return false
      }
      // file.url=file.url.indexOf("blob:") != -1?file.response.msg[0]:file.url
      file.url = file.response.msg['url'][0]
      var arr = file.url.split("/")
      var name = file.response.msg['name'] //从url中获取文件键名
      if (parseInt(name) > 0) name = arr[arr.length - 3]
      console.log(name)
      var i = 0
      for (var j in myData.fileName) {
        if (myData.fileName[j] == name) {
          i = j //找到fileList键值 i
          break
        }
      }
      myData.fileList[i] = [] //初始化文件列表
      myData.formData[myData.fileName[i]] = [] //表单里的字段
      var temp = [] //存放纯地址 之后转成json格式存入表单字段
      for (var j in fileList) {
        var obj = {
          name: fileList[j]['name'],
          url: fileList[j]['url']
        }
        myData.fileList[i].push(obj)
        temp.push(fileList[j].url)
      }
      myData.formData[name] = temp
    },
    //【上传失败】
    uploadError(err, file, fileList) {
      tool.showToast(this, file['name'] + "上传失败啦～")
    },
    //【超过限制】
    handleOverLimit() {
      tool.showToast(this, '文件数目超过限制！')
    },
    //【点击文件列表中的文件预览】打开新窗口
    handlePreview: function (file) {
      window.open(file.url)
    },
    //【点击文件列表中删除】
    handleRemove: function (file, fileList) {
      console.log(file);
      if (file.status == "uploading") return false
      //file对象中有url
      var arr = file.url.split("/")
      var name = arr[arr.length - 2] //从url中获取文件键名
      if (parseInt(name) > 0) name = arr[arr.length - 3]
      for (var i in myData.fileName) if (myData.fileName[i] == name) break //找到fileList键值 i
      myData.fileList[i] = [] //初始化文件列表
      myData.formData[name] = [] //表单里的字段
      var temp = []; //存放纯地址 之后转成json格式存入表单字段
      for (var j in fileList) {
        var obj = {
          name: fileList[j]['name'],
          url: fileList[j]['url']
        }
        myData.fileList[i].push(obj)
        temp.push(fileList[j].url)
      }
      myData.formData[name] = temp
    },
/*    handleColorChange(value) {
      console.log("mixColor:" +value)
      var that = this
      var flag = myData.predefineColors.indexOf(value)
      if (flag == -1) {
        myData.formData.color_hex = null
        myData.formData.color = null
        tool.showModal(that, '抱歉，暂时不支持自定义，请从给出的十种色彩种选择一种')
      } else {
        myData.formData.color = myData.color_array[flag]
      }
    },*/
  },
  created() {
    this.prepare()
  }
}
