<template>
  <div id="pagelist-all">
    <el-container>
      <el-header class="page-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-user"></i>页面设计</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-table primary-color"></i><span class="primary-color">全部页面</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main class="table-msg">
          <!--<div class="filter-wrap">
            <el-form class="filter-form">
              <el-form-item class="select-item" label="关键词:" prop="name" label-width="80px">
                <el-input type="text" v-model="myData.formData.name" placeholder="手机号/微信昵称/姓名"
                          style="width: auto;"></el-input>
              </el-form-item>

              <el-form-item class="select-item" label="客户身份:" prop="name" label-width="80px">
                <el-input type="text" v-model="myData.formData.name" placeholder="全部" style="width: auto"></el-input>
              </el-form-item>

              <el-form-item class="select-item" label="会员卡:" prop="name" label-width="80px">
                <el-select v-model="myData.formData.name" placeholder="全部" style="width: 206px">
                  <el-option label="" value=""></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="select-item" label="用户组:" prop="name" label-width="80px">
                <el-select v-model="myData.formData.name" placeholder="全部" style="width: 206px">
                  <el-option label="" value=""></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="select-item" label="星级:" prop="name" label-width="80px">
                <el-select v-model="myData.formData.name" placeholder="全部" style="width: 206px">
                  <el-option label="" value=""></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="select-item" label="性别:" prop="name" label-width="80px">
                <el-select v-model="myData.formData.name" placeholder="全部" style="width: 206px">
                  <el-option label="" value=""></el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="select-item" label="地域:" prop="name" label-width="80px">
                <el-select v-model="myData.formData.name" placeholder="全部" style="width: 206px">
                  <el-option label="" value=""></el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="inte-item" label="积分:" prop="name" label-width="80px">
                <el-col :span="11">
                  <el-input type="text" v-model="myData.formData.name" placeholder="" style="width: 80px"></el-input>
                  <span style="margin-left: 10px">分</span>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-input type="text" v-model="myData.formData.name" placeholder="" style="width: 80px"></el-input>
                  <span style="margin-left: 10px">分</span>
                </el-col>
              </el-form-item>

              <el-form-item label="活动时间" label-width="80px" style="width: 500px;">
                <el-date-picker
                  v-model="myData.formData.date1"
                  type="datetimerange"
                  :picker-options="myData.pickerOptions2"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>
              </el-form-item>

              &lt;!&ndash; <el-form-item label="活动时间">
                 <el-col :span="11">
                   <el-date-picker type="date" placeholder="选择日期" v-model="myData.formData.name" style="width: 100%;"></el-date-picker>
                 </el-col>
                 <el-col class="line" :span="2">-</el-col>
                 <el-col :span="11">
                   <el-time-picker type="fixed-time" placeholder="选择时间" v-model="myData.formData.name" style="width: 100%;"></el-time-picker>
                 </el-col>
               </el-form-item>&ndash;&gt;

              <div class="form-search">
                <el-button type="primary" size="small">筛选</el-button>
                <el-button plain size="small">清空筛选条件</el-button>
              </div>
            </el-form>
          </div>-->
          <el-table class="goodsTable" :data="myData.tableData" v-loading="myData.tableLoading"
                    @selection-change="handleSelect" :row-class-name="tableRowClassName">
            <el-table class="goodsTable" :data="myData.tableData" v-loading="tableLoading"
                      @selection-change="handleSelect" :row-class-name="tableRowClassName">
              <el-table-column type="selection" width="36"></el-table-column>
              <el-table-column prop="name" label="页面名称"></el-table-column>
              <el-table-column prop="type" label="页面类型"></el-table-column>
              <el-table-column prop="ctime" label="添加时间"></el-table-column>
              <el-table-column prop="utime" label="更新时间"></el-table-column>
              <!-- <el-table-column label="积分">
                 <template slot-scope="props">
                   77
                 </template>
               </el-table-column>-->
              <!--<el-table-column prop="repertory" label="购买次数"></el-table-column>-->
              <el-table-column width="240" label="操作">
                <template scope="props">
                  <el-button size="mini" @click="edit(1000)">编辑</el-button>
                  <el-button size="mini" type="danger">删除</el-button>
                  <el-button size="mini">设为首页</el-button>
                  <!--<el-button v-if="props.row.status == 0" size="mini" type="success"
                             @click="ban(1,props.row.goods_id)">启用
                  </el-button>-->
                  <!-- <el-button v-else size="mini" type="danger" @click="ban(0,props.row.goods_id)">
                     禁用
                   </el-button>-->
                </template>
              </el-table-column>
            </el-table>
          </el-table>
          <el-row class="table-operate">
            <el-button type="" plain @click="getPage(0)" :disabled="disabled">重置列表</el-button>
            <el-button type="primary" plain :disabled="disabled">新增页面</el-button>
            <!--<el-button type="success" plain @click="ban(1)" :disabled="disabled">批量启用</el-button>
            <el-button type="info" plain @click="ban(0)" :disabled="disabled">批量禁用</el-button>-->
            <el-button type="danger" plain @click="deleteRows()" :disabled="disabled">批量删除</el-button>
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
  import tool from '../../assets/js_/tool'
  import {mixinAll} from "../../mixins/mixinAll";

  var myData = {
    // 【common】
    module: 'user', //本模块名称
    own: 1, //是否只查询本商城
    //【prepare】
    requireList: {}, //请求的数据
    requireData: {}, //请求数据的容器
    //【getPage】
    searchFieldList: [{ //可供搜索的字段, //可供搜索的字段,label-value的键值对
      label: '商城编号',
      value: 'shop_id'
    },
      {
        label: '商城名称',
        value: 'name'
      }
    ],
    primary_key: 'user_id', //主键名称
    tableData: [
      {
        name: "小程序首页",
        type: "自定义页面",
        ctime: "2018-09-28 17:02:09",
        utime: "2018-09-28 17:02:09",
      },
      {
        name: "aa",
        age: 11,
        avatar: '../../assets/img/avatar-1.jpg',
        intro: 'aaaaaaaaaaaaaaaaaaaaaa',
      },
      {
        name: "aa",
        age: 11,
        avatar: '../../assets/img/avatar-1.jpg',
        intro: 'aaaaaaaaaaaaaaaaaaaaaa',
      },
      {
        name: "aa",
        age: 11,
        avatar: '../../assets/img/avatar-1.jpg',
        intro: 'aaaaaaaaaaaaaaaaaaaaaa',
      },
      {
        name: "aa",
        age: 11,
        avatar: '../../assets/img/avatar-1.jpg',
        intro: 'aaaaaaaaaaaaaaaaaaaaaa',
      },
    ],
    tableLoading: false,
    isIndeterminate: true,
    formData: {
      name: '',
      date1: '',
      date2: '',
    },
    pickerOptions2: {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }]
    },
  };
  export default {
    mixins: [mixinAll],
    name: "user-all",
    data() {
      return {
        myData
      }
    },
    methods: {
      async prepare() {
        var that = this
        this.disabled = false
        myData.tableLoading = false

      },
      handleCheckAllChange(val) {
        console.log(val)
      },
      edit(id) {
        var url = '/pageDesign/detail/' + id
        this.$router.push(url)
      }
    },
    created() {
      this.prepare()
    }
  }
</script>

<style scoped>

  .content-item li {
    margin: 0 0 10px 0;
    color: #99a9bf;
  }

  .content-item li span {
    display: inline-block;
    margin-left: 10px;
    color: #000;
  }

  .table-checkbox {
    position: absolute;
    right: 1px;
    top: 0px;
  }

  .table-row {
    padding: 5px 5px;
  }

  .box-card {
    position: relative
  }

  .table-msg-nick {
    display: flex;
    margin-top: 10px;
    font-size: 16px;
    justify-content: center;
    align-items: center
  }

  .status-tag {
    margin-left: 5px;
  }

  .content-item {
    list-style: none;
  }

  /*  .filter-wrap {
      padding: 20px;
      margin-bottom: 15px;
    }

    .select-item {
      display: inline-block;
      min-width: 290px;
      margin: 0 50px 8px 0;
      font-size: 14px;
    }

    .filter-form {
      max-width: 1090px;
    }

    .inte-item {
      display: inline-block;
      width: 330px;
      margin-bottom: -15px;
    }

    .form-search {
      margin-left: 80px;
    }*/
</style>
