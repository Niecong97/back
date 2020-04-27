<template>
  <div id="normal_all">
    <el-container>
      <el-header class="page-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><i class="fa fa-cubes"></i>普通商品</el-breadcrumb-item>
          <el-breadcrumb-item><i class="fa fa-table primary-color"></i><span class="primary-color">全部普通商品</span></el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-container>
        <el-main>
          <el-row class="table-search">
            <!--查询条件-->
            <FilterWrap></FilterWrap>
            <!--<div class="filter-wrap">
              <el-form class="filter-form">
                <el-form-item class="select-item" label="关键词:" prop="name" label-width="80px">
                  <el-input type="text" v-model="myData.formData.name" placeholder="手机号/微信昵称/姓名" class="auto-width"></el-input>
                </el-form-item>

                <el-form-item class="select-item" label="客户身份:" prop="name" label-width="80px">
                  <el-input type="text" v-model="myData.formData.name" placeholder="全部" class="auto-width"></el-input>
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

                <el-form-item class="select-item" label="地区:" prop="name" label-width="80px">
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
                <div class="form-search">
                  <el-button type="primary" size="small">筛选</el-button>
                  <el-button plain size="small">清空筛选条件</el-button>
                </div>
              </el-form>
            </div>-->


            <el-col :span="4" style="margin-top: 10px;">
              <el-input
                placeholder="输入关键字进行过滤"
                v-model="myData.filterText">
              </el-input>
              <el-tree
                :data="myData.data2"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="myData.defaultProps"
                :filter-node-method="filterNode"
                ref="tree2">
              </el-tree>
              <div class="buttons">
                <el-button type="small">查询</el-button>
                <el-button type="small">清空</el-button>
              </div>
            </el-col>
            <el-col :span="20" style="margin-top: 10px;">
              <el-table class="goodsTable" :data="myData.tableData" v-loading="tableLoading"
                        @selection-change="handleSelect" :row-class-name="tableRowClassName">
                <el-table-column type="selection" width="36"></el-table-column>
                <el-table-column label="缩略图" width="180">
                  <template slot-scope="props">
                    <img src="../../assets/img/avatar-1.jpg" alt="" width="48">
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column label="价格">
                  <template slot-scope="props">
                    ￥{{props.row.price}}
                  </template>
                </el-table-column>
                <el-table-column prop="repertory" label="库存"></el-table-column>
                <el-table-column width="180" label="操作">
                  <template scope="props">
                    <el-button size="mini" @click="editNormal(1000)">编辑</el-button>
                    <el-button v-if="props.row.status == 0" size="mini" type="success"
                               @click="ban(1,props.row.goods_id)">启用
                    </el-button>
                    <el-button v-else size="mini" type="danger" @click="ban(0,props.row.goods_id)">
                      禁用
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>

          <div class="normal-operate" style="margin-top: 10px;">
            <!-- <el-button-group>-->
            <el-button plain>沽清</el-button>
            <el-button plain>置满</el-button>
            <el-button plain>上架</el-button>
            <el-button plain>下架</el-button>
            <el-button plain>启用</el-button>
            <el-button plain>禁用</el-button>
            <el-button plain>删除</el-button>
            <!--<el-dropdown id="normal-operate-more">
              <el-button>
                更多<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>操作一</el-dropdown-item>
                <el-dropdown-item>操作二</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>-->
            <!--</el-button-group>-->
          </div>
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
  import FilterWrap from '../../components/FilterSection'

  var myData = {
    /* 【common】 */
    module: 'normal', //本模块名称
    own: 1, //是否只查询本商城
    /* 【getPage】 */
    searchFieldList: [{
      'label': '公共商品编号',
      'value': 'normal_goods_id'
    },
      {
        'label': '商品名称',
        'value': 'name'
      },
      {
        'label': '地区编号',
        'value': 'dispatch_area_id'
      }
    ], //可供搜索的字段,label-value的键值对
    primary_key: 'goods_id', //主键名称
    // add
    tableData: [{
      date: '2016-05-02',
      name: '商品1',
      repertory: '9999',
      price: '77',
      thumbnail: "../../assets/img/avatar-1.jpg",
    }, {
      date: '2016-05-02',
      name: '商品1',
      repertory: '9999',
      price: '77',
      thumbnail: "../../assets/img/avatar-1.jpg",
    }, {
      date: '2016-05-02',
      name: '商品1',
      repertory: '9999',
      price: '77',
      thumbnail: "../../assets/img/avatar-1.jpg",
    }, {
      date: '2016-05-02',
      name: '商品1',
      repertory: '9999',
      price: '77',
      thumbnail: "../../assets/img/avatar-1.jpg",
    }, {
      date: '2016-05-02',
      name: '商品1',
      repertory: '9999',
      price: '77',
      thumbnail: "../../assets/img/avatar-1.jpg",
    }, {
      date: '2016-05-02',
      name: '商品1',
      repertory: '9999',
      price: '77',
      thumbnail: "../../assets/img/avatar-1.jpg",
    }],

    data2: [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }],
    defaultProps: {
      children: 'children',
      label: 'label'
    },
    filterText:'',
    formData: {
      name: '',
      date1: '',
      date2: '',
    },
  };
  export default {
    mixins: [mixinAll],
    name: "normal-all",
    data() {
      return {
        myData
      }
    },
    methods: {

      //--------------------------需要定义的地方--------------------------
      searchChecked: function () {
        var that = this
        var checked = this.$refs.tree.getCheckedNodes()
        //查询的话只要知道三级分类就可以了 三级分类的children为undefined
        var arr = []
        for (var i in checked) {
          if (checked[i].children === undefined) {
            arr.push(checked[i].value)
          }
        }
        if (arr.length == 0) {
          myData.condition = null
        } else if (arr.length == 1) {
          myData.condition = {
            sort_id: arr[0]
          };
        } else {
          myData.condition = {
            sort_id: ['in', arr.toString()]
          }
        }
        that.getPage()
      },
      resetChecked: function () {
        var that = this
        that.$refs.tree.setCheckedKeys([])
        myData.condition = null;
        that.getPage();
      },
      filterNode(value,data){
        if(!value) return true;
        return data.label.indexOf(value)!==-1;
      },
      editNormal:function (id) {
        var url = '/normal/detail/?id='+id
        this.$router.push(url)
      }
    },
    components:{
      FilterWrap,
    },
    watch:{
      filterText(val){
        this.$refs.tree2.filter(val)
      }
    }
  }
</script>

<style scoped>

  .el-dropdown {
    position: static;
  }
  .table-search{
    background-color: #fff;
  }
</style>
