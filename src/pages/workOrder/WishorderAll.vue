<template>
  <div id="wishorder_all">
    <el-container>
      <el-header class="page-header">
        <h1><i class="fa fa-table"></i>样品赠送</h1>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-file-text-o"></i>工单</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-gift"></i>样品赠送</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-row class="table-search">
            <el-input v-model="keyword" placeholder="请输入搜索内容" clearable :disabled="disabled">
              <el-select v-model="target" slot="prepend" placeholder="请选择">
                <el-option v-for="item in myData.searchFieldList" :key="item.value" :label="item.label"
                           :value="item.value" :disabled="disabled"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="search" :disabled="disabled"></el-button>
            </el-input>
          </el-row>
          <el-row class='table-menu' :gutter="8">
            <el-col :span="6">
              <div @click="handleOrderTypeChange(0)" :class="myData.replyStatus=='0'?'active':null">
                <div class="title">
                  <i class="fa fa-truck"></i>
                  <font>已关闭</font>
                </div>
                <h1>{{myData.statusArr[0]}}</h1>
              </div>
            </el-col>
            <el-col :span="6">
              <div @click="handleOrderTypeChange(1)" :class="myData.replyStatus=='1'?'active':null">
                <div class="title">
                  <i class="fa fa-inbox"></i>
                  <font>待处理</font>
                </div>
                <h1>{{myData.statusArr[1]}}</h1>
              </div>
            </el-col>
            <el-col :span="6">
              <div @click="handleOrderTypeChange(2)" :class="myData.replyStatus=='2'?'active':null">
                <div class="title">
                  <i class="fa fa-money"></i>
                  <font>已处理</font>
                </div>
                <h1>{{myData.statusArr[2]}}</h1>
              </div>
            </el-col>
            <el-col :span="6">
              <div @click="handleOrderTypeChange()" :class="myData.replyStatus=='9'?'active':null">
                <div class="title">
                  <i class="fa fa-truck"></i>
                  <font>全部</font>
                </div>
                <h1>{{myData.statusArr[3]}}</h1>
              </div>
            </el-col>
          </el-row>
          <el-table class="goodsTable" :data="tableData" v-loading="!tableLoading" @selection-change="handleSelect"
                    :row-class-name="tableRowClassName">
            <el-table-column type="selection" width="36"></el-table-column>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="table-expand">
                  <el-form-item label="单位名称">
                    <span>{{ props.row.og_name}}</span>
                  </el-form-item>
                  <el-form-item label="单位电话">
                    <span>{{ props.row.og_tel}}</span>
                  </el-form-item>
                  <el-form-item label="单位地址">
                    <span>{{ props.row.og_area_id_[0]}} {{ props.row.og_area_id_[1]}} {{ props.row.og_area_id_[2]}}</span>
                  </el-form-item>
                  <el-form-item label="单位详情">
                    <span>{{ props.row.og_detail}}</span>
                  </el-form-item>
                  <el-form-item label="内容" style="width: 100%;">
                    <span>{{ props.row.tip}}</span>
                  </el-form-item>
                  <el-form-item label="最后修改">
                    <span>{{ props.row.mtime}}</span>
                  </el-form-item>
                  <el-form-item label="确认时间">
                    <span>{{ props.row.confirm_time}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="头像" width="180">
              <template scope="props">
                <img class="thumbnail" v-if="props.row.avatarUrl" :src="props.row.avatarUrl"/>
              </template>
            </el-table-column>
            <el-table-column sortable prop="name" label="姓名"></el-table-column>
            <el-table-column sortable prop="phone" label="手机号"></el-table-column>
            <el-table-column sortable prop="status_" label="状态"></el-table-column>
            <el-table-column sortable prop="ctime" label="创建时间"></el-table-column>
            <el-table-column width="180" label="操作" v-if="myData.replyStatus !=0">
              <template slot-scope="props">
                <el-button v-if="props.row.status == 1" size="mini" type="success"
                           @click="reply(0,props.row.id)">处理
                </el-button>
                <el-button v-if="props.row.status == 2 || props.row.status == 1" size="mini"
                           @click="ban(0,props.row.id)">关闭
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="table-operate">
            <el-button v-if="myData.replyStatus == 1||myData.replyStatus==undefined" type="success" plain @click="reply(0)"
                       :disabled="disabled">批量处理
            </el-button>
            <el-button v-if="myData.replyStatus !=0" type="info" plain
                       @click="ban(0)" :disabled="disabled">批量关闭
            </el-button>
          </el-row>
          <el-row class="table-page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="pageInfo['now']" :page-sizes="[10, 20, 30, 40,50]"
                           :page-size="pageInfo['size']" :total="pageInfo['rowTotal']"
                           layout="total, sizes, prev, pager, next, jumper"></el-pagination>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {mixinAll} from "../../mixins/mixinAll";
  var myData = {
    /* 【common】 */
    module: 'wish_order', //本模块名称
    own: 0, //是否只查询本商城
    /* 【getPage】 */
    searchFieldList: [{
      'label': '姓名',
      'value': 'u.name'
    }],  //可供搜索的字段,label-value的键值对
    primary_key: 'id', //主键名称
    condition: {   //feedback_all页面显示的记录为status=1
      status: ['in', 1]
    },
    //**********添加的
    replyStatus: '1',
    statusArr: [0, 0, 0, 0],
    excelSpec: {},
    status,
  };

  export default {
    mixins: [mixinAll],
    name: "wishorder-all",
    data() {
      return {
        myData
      }
    },
    methods: {
      //【获取分页详情】
      async getPage() {
        var that = this
        myData.tableLoading = true
        myData.disabled = true
        var postData = {
          flag: myData.own, //查询本商城
          pageNow: myData.pageInfo['now'], //当前页
          pageSize: myData.pageInfo['size'], //每页条目
          condition: myData.condition, //搜索条件
        }
        if (arguments[0] != undefined) {
          if (typeof(arguments[0]) == "number")
          //填写数字 跳页
            myData.keyword = null //重置
          else if (typeof(arguments[0]) == "object") {
            //鼠标点击事件 搜索
            if (myData.keyword == undefined) {
              that.$message.error('请填写搜索内容后，再点击搜索按钮')
              return false
            }
          }
        }
        //加入搜索条件
        tool.empty(myData.keyword) ? null : (postData.target = myData.target, postData.keyword = myData.keyword)
        var res = await tool.post(myData.module + '/ajax_getPage', postData)
        res[0] == 1 ? (myData.tableData = res[1]['rows'], myData.pageInfo['rowTotal'] = parseInt(res[1]['count']), myData.statusArr = res[1]['status_arr']) : myData.tableData = []
        await tool.sleep(500)
        myData.tableLoading = false
        myData.disabled = false
      },
      //【已回复】
      async reply(flag) {
        var that = this
        //这里存在一个问题就是在confirm中写myData读取不到 故此先提出来
        var selected = myData.selected
        var res = await tool.showModal(that, '确定已处理?', true, '是的', '提示', 'warning')
        if (res[0] == 0) return false
        var postData = {
          condition: {},
          data: {
            status: 2
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
      handleOrderTypeChange(value) {
        myData.condition = {
          status: value
        }
        myData.pageInfo = {
          now: 1,
          size: 10,
          rowTotal: 0
        }
        console.log(value)
        myData.replyStatus = value
        this.getPage()
      },
    }
  }
</script>

<style scoped>
  @import "https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css";
  @import "../../assets/css/style.css";
</style>
