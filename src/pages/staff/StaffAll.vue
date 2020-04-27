<template>
  <div id="user_all">
    <el-container>
      <el-header class="page-header">
        <!--<h1><i class="fa fa-table"></i>全部用户</h1>-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!--<el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>-->
          <el-breadcrumb-item><i class="fa fa-user"></i>职员</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-table primary-color"></i><span class="primary-color">全部职员</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main class="table-msg">
          <!--查询条件-->
          <FilterWrap></FilterWrap>

          <el-table class="goodsTable" :data="myData.tableData" v-loading="myData.tableLoading"
                    @selection-change="handleSelect" :row-class-name="tableRowClassName">
            <el-table class="goodsTable" :data="myData.tableData" v-loading="tableLoading"
                      @selection-change="handleSelect" :row-class-name="tableRowClassName">
              <el-table-column type="selection" width="36"></el-table-column>
              <el-table-column label="头像" width="180">
                <template slot-scope="props">
                  <img src="../../assets/img/avatar-1.jpg" alt="" width="48">
                </template>
              </el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column label="性别"></el-table-column>
              <el-table-column prop="repertory" label="用户组"></el-table-column>
              <el-table-column prop="repertory" label="添加时间"></el-table-column>
              <el-table-column width="180" label="操作">
                <template scope="props">
                  <el-button size="mini" @click="edit(1000)">编辑</el-button>
                  <el-button v-if="props.row.status == 0" size="mini" type="success"
                             @click="ban(1,props.row.goods_id)">启用
                  </el-button>
                  <el-button v-else size="mini" type="danger" @click="ban(0,props.row.goods_id)">
                    禁用
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--用户 card形式-->
            <!--<el-row>
              <el-col class="table-row" :span="8" v-for="item in myData.tableData">
                <el-card class="box-card">
                  <el-checkbox class="table-checkbox"></el-checkbox>
                  <el-col :span="7">
                    <img src="../../assets/img/avatar-1.jpg">
                    &lt;!&ndash;昵称&ndash;&gt;
                    <div class="table-msg-nick">
                      <span>小金</span>
                      <el-tag class="status-tag" size="small">可用</el-tag>
                    </div>
                  </el-col>
                  <el-col :span="17" :push="2">
                    <ul class="content-item">
                      &lt;!&ndash;<li>昵称 <span>小金</span></li>&ndash;&gt;
                      <li>id <span>100000000249</span></li>
                      <li>手机 <span>13873182173</span></li>
                      <li>地区 <span>未知，未知，未知</span></li>
                      <li>用户组 <span>个人消费</span></li>
                      <li>最后修改时间 <span>2018-11-08 12:17:18</span></li>
                      <li>最后登录时间 <span>2018-11-08 12:17:18</span></li>
                      <li>创建时间 <span>2018-11-08 11:57:19</span></li>
                    </ul>
                  </el-col>
                  <el-col style="margin-top:10px;margin-bottom:10px">
                    &lt;!&ndash; <el-tag>可用</el-tag>&ndash;&gt;
                    <el-button size="mini" @click="edit(1000)">编辑</el-button>
                    <el-button size="mini" type="warning">禁用</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                  </el-col>
                </el-card>
              </el-col>
            </el-row>-->
          </el-table>
          <el-row class="table-operate">
            <el-button type="" plain @click="getPage(0)" :disabled="disabled">重置列表</el-button>
            <!--<el-button type="" plain :indeterminate="myData.isIndeterminate" @change="handleCheckAllChange" :disabled="disabled">选择全部</el-button>-->
            <el-button type="success" plain @click="ban(1)" :disabled="disabled">批量启用</el-button>
            <el-button type="info" plain @click="ban(0)" :disabled="disabled">批量禁用</el-button>
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
  import areaList from '../../assets/js/areaList'
  import {mixinAll} from "../../mixins/mixinAll";
  import FilterWrap from '../../components/FilterSection'

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
        var url = '/staff/detail?id=' + id
        this.$router.push(url)
      }
    },
    created() {
      this.prepare()
    },
    components:{
      FilterWrap,
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

</style>
