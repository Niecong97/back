const MODULE = "https://drp.21b.cn/admin/";
const platFailCode = '70000' //平台未选择的返回码
const loginFailCode = '60000' //登录态错误的返回码

class Tool {
    /**
     此处填写各种美妙的方法
     很多方法需要传入vue-app对象
     方便直接调用诸如app.$alert等通知函数
     简化每个单独js的篇幅
     **/
    empty(data) {
        switch (typeof data) {
            case 'object':
                if (data == null) return true
                if (data instanceof Date) return false
                var arr = Object.keys(data)
                if (arr.length == 0) return true
                else return false
                break;
            case 'array':
                if (data == null) return true
                if (data.length == 0) return true
                else return false
                break;
            case 'string':
                if (data == null || data == undefined || data == '') return true
                else return false
                break;
            case 'undefined':
                return true
                break;
            case 'boolean':
                if (data == false) return true
                else return false
                break;
            case 'number':
                //if (data == 0) return true
                return false
                break;
            default:
                console.warn(data, '未被收录的数据类型', typeof data)
                return true
                break;
        }
    }

    async post(url, postData) {
	console.log(url)
   if(url!='staff/ajax_login'){  //不为登录时，检测登录态
      var res = this.checkLogin()
      if (res[0] == 0) return false
    }
        postData.debug = true
        var that = this
        var res = await fetch(MODULE + url, {
            method: 'POST',
            credentials: 'same-origin', // 强制加入凭据头
            headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       // 'Access-Control-Allow-Origin': '*' ,
      //  'Access-Control-Allow-Method':'POST',
       // 'Access-Control-Allow-Credentials':true
            },
            mode: 'cors',
            body: JSON.stringify(postData)
        }).then((resolve) => {
            return resolve.text().then((resolve) => {
                //将resolve进行json解码
                return JSON.parse(resolve)
            })
        }).catch((reject) => {
            return [0, reject]
        })
console.log(res)
        //错误返回 false
        if (res.code == undefined) return [0, false]
        //登录态错误
        if (res.code == loginFailCode || res.code == platFailCode) {
            console.warn("Here's no login info , try again")
            await this.getSessionId()
        }
        //判断code是否为1,否则报错并返回false
        if (res.code != '1') {
            if (!that.empty(arguments[2])) that.showToast(arguments[2], '请求数据失败！')
            return [0, res.msg, res.cn]
        }
        return [1, res.msg, res.cn]


    }


    async getSessionId() {
        location.href('/admin')
    }

    getUrlParam(paramName) {
        var paramValue = "", isFound = !1;
        if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
            var arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&"),
                i = 0;
            while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
        }
        return paramValue == "" && (paramValue = null), paramValue
    }


  getUrlParamDetail(paramName) {
    var paramValue = "", isFound = !1;
    var zz = window.location.hash.lastIndexOf('/')
    var arrSource = window.location.hash.substring(zz+1)
    console.log(zz)
    console.log(arrSource)
    return arrSource
  }

    sleep(time) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve()
            }, time)
        })
    }

    checkLogin() {
        return [1]
        var staffInfo = sessionStorage.getItem('staffInfo')
        var platformInfo = sessionStorage.getItem('platformInfo')
        var shopInfo = sessionStorage.getItem('shopInfo')
        if (this.empty(staffInfo)) return [0]
        if (staffInfo['status'] != 1) return [0]
        return [1]
    }

    checkOptions(app, requireList, data) {
        var that = this
        if (this.empty(requireList)) return [1]
        var errorReport = {
            'bubble': [
                '无法获取气泡参数'
            ],
            'platformInfo': [
                "获取平台信息失败,请联系『21B.cn』纠错",
                "您的平台已被禁用,如需操作请联系管理员或超级管理员"
            ],
            'staffInfo': [
                "获取用户信息失败,请联系『21B.cn』纠错",
                "您的帐户已被禁用,如需操作请联系管理员或超级管理"
            ],
            'shopInfo': [
                "获取当前商城信息失败,请联系『21B.cn』纠错",
                "尚未选择商城,请选择后刷新页面",
                "当前商城已被禁用,如需启用请联系管理员"
            ],
            'shop_id_list': [
                "无可用商城,请先创建商城或联系管理员指派"
            ],
            'supplier_id_list': [
                "无可用供货商,请先添加供货商再尝试货物添加操作"
            ],
            'sort_type_id_list': [
                "无可用分类标准,请先创建/启用分类标准,后创建商城"
            ],
            'og_id_list': [
                "获取单位信息失败，请联系『21B.cn』纠错"
            ],
            'common_goods_id_list': [
                '无可用公共商品模板，请先前往【商品】-【添加公共商品'
            ],
            'monthly': [
                '获取每月销售额情况失败'
            ],
            'staff_id_list': [
                '获取职员列表失败，请联系『21B.cn』纠错'
            ],
            'this_month': [
                '获取当月信息失败，请联系『21B.cn』纠错'
            ],
            'express_id_list': [
                '获取物流信息失败，请联系『21B.cn』纠错'
            ],
 'card_id_list':[
        '获取卡券信息失败，请联系『21B.cn』纠错'
      ],
            'default': [
                '未设置审核标准'
            ],
        }
        var msg = [null, 'error']
        for (var i in requireList) {
            //有返回
            switch (i) {
                case 'debug':
                    break;
                case 'platformInfo': {
                    //【当前平台信息】
                    if (tool.empty(data.platformInfo)) msg[0] = errorReport['platformInfo'][0]
                    if (data.platformInfo.status == 0) msg[0] = errorReport['platformInfo'][1]
                }
                    break;
                case 'bubble': {
                    //【气泡信息】
                    if (tool.empty(data.bubble)) msg[0] = errorReport['bubble'][0]
                }
                    break;
                case 'staffInfo': {
                    //【登录职员信息】
                    if (data.staffInfo == undefined) msg[0] = errorReport['staffInfo'][0]
                    else if (data.staffInfo.status == 0) msg[0] = errorReport['staffInfo'][1]
                }
                    break;
                case 'shopInfo': {
                    //【当前商城信息】
                    if (data.shopInfo == undefined) msg[0] = errorReport['shopInfo'][0]
                    else if (data.shopInfo.shop_id == undefined) msg = [errorReport['shopInfo'][1], 'waring']
                    else if (data.shopInfo.status == 0) msg = [errorReport['shopInfo'][2], 'waring']
                }
                    break;
                case 'shop_id_list': {
                    //【商城列表】
                    if (data.shop_id_list.length == 0) msg = [errorReport['shop_id_list'][0], 'waring']
                }
                    break;
                case 'supplier_id_list': {
                    //【供货商列表】
                    if (data.supplier_id_list.length == 0) msg = [errorReport['supplier_id_list'][0], 'waring']
                }
                    break;
                case 'sort_type_id_list': {
                    //【分类标准列表】
                    if (data.sort_type_id_list.length == 0) msg = [errorReport['sort_type_id_list'][0], 'waring']
                }
                    break;
                case 'sort_id_list': {
                    //【分类列表】
                    if (data.sort_id_list.length == 0) msg = [errorReport['sort_id_list'][0], 'waring']
                }
                    break;
                case 'common_goods_id_list': {
                    //【商城列表】
                    if (data.common_goods_id_list.length == 0) msg = [errorReport['common_goods_id_list'][0], 'waring']
                }
                    break;
                case 'manager_id_list': {
                    //【商城列表】
                    if (data.manager_id_list.length == 0) msg = [errorReport['manager_id_list'][0], 'waring']
                }
                    break;
                case 'og_id_list': {
                    //【当前商城信息】
                    if (data.organization_id_list.length == 0) msg = [errorReport['og_id_list'][0], 'waring']
                }
                    break;
                case 'staff_id_list': {
                    //【当前商城信息】
                    if (data.organization_id_list.length == 0) msg = [errorReport['staff_id_list'][0], 'waring']
                }
                    break;
                case 'monthly': {
                    //【当前商城信息】
                    if (data.monthly.length == 0) msg = [errorReport['monthly'][0], 'waring']
                }
                    break;
                case 'this_month': {
                    //【当前商城信息】
                    if (data.this_month.length == 0) msg = [errorReport['this_month'][0], 'waring']
                }
                    break;
                case 'express_id_list': {
                    //【物流信息】
                    if (data.express_id_list.length == 0) msg = [errorReport['express_id_list'][0], 'waring']
                }
                    break;
 case 'service_id_list': {
          //【专属客服信息】
          if (data.service_id_list.length == 0) msg = [errorReport['service_id_list'][0], 'waring']
        }
          break;
        case 'card_id_list': {
          if (data.card_id_list.length == 0) msg = [errorReport['card_id_list]'][0], 'waring']
        }
         break;
                default: {
                    //请求的信息没有返回
                    msg = [errorReport['default'][0] + i, 'error']
                }
                    break;
            }
            if (msg[0] !== null) break;
        }
        if (msg[0] === null) return [1]
        this.showToast(app, msg[0], msg[1])
        return [0]
    }

    async showModal(app, msg) {
        msg = this.empty(msg) ? '发生未知错误' : (typeof msg == 'object' ? msg : msg.toString())
        var showCancel = this.empty(arguments[2]) ? false : arguments[2]
        var confirmText = this.empty(arguments[3]) ? '好的' : arguments[3].toString()
        var title = this.empty(arguments[4]) ? '抱歉' : arguments[4].toString()
        var type = this.empty(arguments[5]) ? 'error' : arguments[5].toString()
        var res = await app.$alert(msg, title, {
            confirmButtonText: confirmText,
            showCancelButton: showCancel,
            type: type
        }).then((resolve) => {
            return true
        }).catch((reject) => {
            return false
        })
        if (res) return [1, true]
        else return [0, false]
    }

    showToast(app, msg) {
        app.$message({
            message: this.empty(msg) ? '发生未知错误' : (typeof msg == 'object' ? msg : msg.toString()),
            type: this.empty(arguments[2]) ? 'error' : arguments[2].toString()
        });
    }

    showNotify(app, msg) {
        var that = this
        app.$notify({
            title: that.empty(arguments[2]) ? '错误' : arguments[2].toString(),
            message: that.empty(msg) ? '发生未知错误' : msg.toString(),
            type: that.empty(arguments[3]) ? 'error' : arguments[3].toString(),
            duration: arguments[4] == undefined ? 5000 : parseInt(arguments[4])
        })
    }

    async submitForm(app, url, type, formName, formData) {
        console.log('postData:', formData)
        var that = this
        var condition = this.empty(arguments[5]) ? null : arguments[5] //加入条件
        var res = await app.$refs[formName].validate().then((resolve) => {
            return true
        }).catch((reject) => {
            return false
        })
        console.log('element check:', res)
        var postData = this.empty(condition) ? formData : {condition: condition, data: formData}
        // if (res) for (var i in postData) if (that.empty(postData[i])) res = false
        // console.log('empty check:',res)
        if (!res) {
            that.showToast(app, '表单填写有误，请检查仔细检查～')
            return [0]
        }
        var res = await that.post(url, postData)
        if (res[0] == 0) {
            that.showToast(app, res[2])
            return false
        }
        switch (type) {
            case 'c':
                await that.showModal(app, '操作成功！本次添加项目编号为：' + res[1], false, '好的', null, 'success')
                app.resetForm(formName)
                break;
            case 'r':
                break;
            case 'u':
                await that.showModal(app, '操作成功！本次修改共影响：' + res[1] + '条记录', false, '好的', null, 'success')
                break;
            case 'd':
                await that.showModal(app, '操作成功！本次删除了：' + res[1] + '条记录', false, '好的', null, 'success')
                break;
            default:
                break;
        }
        return res
    }

    getWindowHeight() {
        var clientHeight = 0
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        } else {
            var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
        }
        return clientHeight;
    }

    dateObj2String(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }


}

//tool是个工具类，会在本页面进行直接实例化，只需在页面中直接调用tool即可
const tool = new Tool()

export default tool