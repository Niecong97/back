<template>
  <div id="organization_all">
    <el-container>
      <el-header class="page-header">
        <h1><i class="fa fa-table"></i>全部单位</h1>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-home"></i>首页</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-university"></i>单位</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-table"></i>全部单位</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-row class="table-search">
            <el-input v-model="keyword" placeholder="请输入搜索内容" clearable :disabled="disabled">
              <el-select v-model="target" slot="prepend" placeholder="请选择">
                <el-option v-for="item in myData.searchFieldList" :key="item.value" :label="item.label"
                           :value="item.value"
                           :disabled="disabled"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="search" :disabled="disabled"></el-button>
            </el-input>
          </el-row>
          <el-table class="goodsTable" :data="tableData" v-loading="tableLoading"
                    @selection-change="handleSelect"
                    :row-class-name="tableRowClassName">
            <el-table-column type="selection" width="36"></el-table-column>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="table-expand">
                  <el-form-item label="单位编号">
                    <span>{{ props.row.og_id }}</span>
                  </el-form-item>
                  <el-form-item label="单位地址">
                    <span>{{ props.row.detail }}</span>
                  </el-form-item>
                  <el-form-item label="单位电话">
                    <span>{{ props.row.tel }}</span>
                  </el-form-item>
                  <el-form-item label="税号">
                    <span>{{ props.row.og_invoice_no }}</span>
                  </el-form-item>
                  <el-form-item label="联系人座机">
                    <span>{{ props.row.tel }}</span>
                  </el-form-item>
                  <el-form-item label="联系人地址">
                    <span>{{ props.row.detail }}</span>
                  </el-form-item>
                  <el-form-item label="联系人邮箱">
                    <span>{{ props.row.email }}</span>
                  </el-form-item>
                  <el-form-item label="备注">
                    <span>{{ props.row.tip }}</span>
                  </el-form-item>
                  <el-form-item label="等级">
                    <span>{{ props.row.level }}</span>
                  </el-form-item>
                  <el-form-item label="来源">
                    <span>{{ props.row.origin_ }}</span>
                  </el-form-item>
                  <el-form-item label="创建时间">
                    <span>{{ props.row.ctime }}</span>
                  </el-form-item>
                  <el-form-item label="最后修改">
                    <span>{{ props.row.mtime }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column sortable prop="og_name" label="单位名称"></el-table-column>
            <el-table-column sortable prop="og_area_id_" label="单位地区"></el-table-column>
            <el-table-column sortable prop="og_tel" label="座机"></el-table-column>
            <el-table-column sortable prop="name" label="联系人"></el-table-column>
            <el-table-column sortable prop="gender_" label="性别"></el-table-column>
            <el-table-column sortable prop="phone" label="手机"></el-table-column>
            <el-table-column sortable prop="group_" label="分组"></el-table-column>
            <el-table-column width="80" sortable prop="status_" label="状态"></el-table-column>
            <el-table-column width="180" label="操作">
              <template slot-scope="props">
                <div class="table_btns">
                  <el-button v-if="props.row.status == 2" size="mini" type="success" @click="ban(1,props.row.og_id)">
                    通过
                  </el-button>
                  <el-button v-if="props.row.status == 2" size="mini" type="danger" @click="ban(3,props.row.og_id)">拒绝
                  </el-button>
                  <el-button size="mini" @click="editRow(props.row.og_id)">编辑</el-button>
                  <el-button v-if="props.row.status == 0" size="mini" type="success" @click="ban(1,props.row.og_id)">
                    启用
                  </el-button>
                  <el-button v-else size="mini" type="danger" @click="ban(0,props.row.og_id)">禁用</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-row class="table-operate">
            <el-button type="" plain @click="getPage(0)" :disabled="myData.disabled">重置列表</el-button>
            <el-button type="success" plain @click="ban(1)" :disabled="myData.disabled">批量启用</el-button>
            <el-button type="info" plain @click="ban(0)" :disabled="myData.disabled">批量禁用</el-button>
            <el-button type="danger" plain @click="deleteRows()" :disabled="myData.disabled">批量删除</el-button>
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
    //【common】
    module: 'organization', //本模块名称
    own: 1, //是否只查询本商城
    //【getPage】
    searchFieldList: [{
      label: '单位编号',
      value: 'og_id'
    },
      {
        label: '单位名称',
        value: 'co_name'
      },
      {
        label: '单位地区编号',
        value: 'co_area_id'
      }
    ], //可供搜索的字段 //可供搜索的字段,label-value的键值对
    primary_key: 'og_id', //主键名称
  };

  export default {
    mixins: [mixinAll],
    name: "organization-all",
    data() {
      return {
        myData
      }
    },
    methods: {

    },
    created() {
      this.prepare()
    }
  }
</script>
