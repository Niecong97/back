<template>
  <div id="user_all">
    <el-container>
      <el-header class="page-header">
        <!--<el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-user"></i>新闻</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-table primary-color"></i><span class="primary-color">全部新闻</span>
          </el-breadcrumb-item>
        </el-breadcrumb>-->
        <div class="btn-addnews">
          <h2>全部新闻</h2>
          <el-button size="mini" type="primary" icon="el-icon-plus" plain @click="editNews">新增新闻</el-button>
        </div>

      </el-header>
      <el-container>
        <el-main class="table-msg">
          <section class="news-wrap">
            <ul class="news-list">
              <li class="news-item" v-for="item in 5">  <!-- newItem-->
                <el-row>
                  <el-col :span="16">
                    <h4 class="new-title" @click="viewNews">Rsshuwre Sglil Xnuicfbc Mtnjzuqw Qpcbenpm Ukq</h4>
                    <div class="news-info text-3">
                      <p><i class="fa fa-clock-o"></i>发布时间：1971-10-06 20:17</p>
                      <p><i class="fa fa-user"></i>作者：Donald</p>
                      <p><i class="fa fa-eye"></i>111 浏览 &nbsp;&nbsp;<i class="fa fa-comment"></i> 0 评论</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="news-operate">
                      <el-button type="primary" plain size="small" @click="editNews">编辑</el-button>
                      <el-button type="warning" plain size="small">禁用</el-button>
                      <el-button type="danger" plain size="small">删除</el-button>
                    </div>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </section>

          <el-row class="table-page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="pageInfo['now']" :page-sizes="[10, 20, 30, 40,50]"
                           :page-size="pageInfo['size']" :total="pageInfo['rowTotal']"
                           layout="total, sizes, prev, pager, next, jumper"></el-pagination>
          </el-row>
        </el-main>
      </el-container>
    </el-container>

    <NewsView :showNewsView="myData.showNews"></NewsView>
    <NewsCreate :showNewsCreate="myData.newsCreate"></NewsCreate>
  </div>
</template>

<script>
  import tool from '../../assets/js_/tool'
  import areaList from '../../assets/js/areaList'
  import {mixinAll} from "../../mixins/mixinAll";
  import NewsView from './NewsView'
  import NewsCreate from './NewsCreate'

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
    showNews:0,
    dialogNewsView:false,
    dialogNewsCreate:false,
    newsCreate:0,
    newItem:[{}]
  };
  export default {
    mixins: [mixinAll],
    name: "news-list",
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
      editNews(){
        myData.newsCreate++
      },
      handleCheckAllChange(val) {
        console.log(val)
      },
      edit(id) {
        var url = '/user/detail?id=' + id
        this.$router.push(url)
      },
      viewNews(){
        myData.showNews++
       /*myData.dialogNewsView = true*/
      }
    },
    created() {
      this.prepare()
    },
    components:{
      NewsView,
      NewsCreate,
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

  .news-wrap {
    margin: 0 100px;
    padding: 20px 30px 30px;
   /* box-shadow: 0 1px 5px 0 rgba(122, 146, 159, 0.2);*/
  }

  .news-list {
    list-style: none;
  }

  .news-info {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    font-size: 14px;
  }

  .news-item {
    border-bottom: 1px solid #DCDFE6;
    padding: 15px 6px;
  }
  .news-item h4:hover{
    text-decoration: underline;
    cursor: pointer;
  }
  .news-operate{
    text-align: right;
  }

  .new-title{
    font-size: 18px;
    line-height: 1.5rem;
  }
  .btn-addnews{
    display: flex;
  }
  .btn-addnews .el-button{
    margin-left: 100px;
  }

</style>
