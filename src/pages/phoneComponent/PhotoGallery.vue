<template>
  <div class="photo-gallery">
    <el-dialog custom-class="my-img-group" title="图片库" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-row>
        <el-col :span="4">
          <aside class="img-group">
            <ul class="group-all">
              <li class="item-group">全部</li>
              <li class="item-group">未分组</li>
              <!--<li class="item-group">分组1</li>-->
              <li class="item-group group-num" v-for="(item,index) in groupItem">
                <i class="group-edit el-icon-edit" @click="editGroup(index)"></i>
                {{item.groupName}}
                <span class="group-remove" @click="deleteGroup(index)">×</span>
              </li>
            </ul>
            <div class="add-group primary-color" @click="addGroup">新增分组</div>
          </aside>
        </el-col>
        <el-col :span="20">
          <section class="img-operate">
            <div class="remove">
              <!-- <el-button type="primary" size="mini">移动至</el-button>-->
              <el-dropdown trigger="click" @command="handleCommand">
                <el-button type="primary" size="mini">
                  移动至<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="index" v-for="(item,index) in groupItem">{{item.groupName}}
                  </el-dropdown-item>
                  <!--<el-dropdown-item command="b">分组2</el-dropdown-item>-->
                </el-dropdown-menu>
              </el-dropdown>
              <el-button icon="el-icon-delete" type="danger" size="mini">删除</el-button>
            </div>
            <div class="upload-operate">
              <el-upload class="upload-demo" ref="upload" :auto-upload="false" action=""
                         :on-preview="handlePreview" :on-remove="handleRemove"
                         :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed">
                <!--<el-button icon="el-icon-upload" type="primary" size="small">上传图片</el-button>-->
                <el-button icon="el-icon-upload" size="mini" @click="submitUpload">上传图片</el-button>
              </el-upload>
            </div>
          </section>
          <section class="upload-img-box">
            <div class="upload-list-item"
                 v-for="(item,index) in imgItem" @click="chooseImg(index)">  <!--@click="chooseImg"-->
              <!--:class="selectImg==true&&selectIndex==index?'upload-list-item active':'upload-list-item'"-->
              <div class="upload-img-wrap">
                <img :src="item.img" alt="" title="201900000000.png">
              </div>
              <p class="upload-img-name">201900000000.png</p>
              <div class="select-mask" v-show="item.selectImg">
                <!--v-show="selectImg==true&&selectIndex==index"-->
                <img src="../../assets/img/chose.png" alt="">
              </div>
            </div>
          </section>
          <section class="upload-page">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 50]"
              :total="60">
            </el-pagination>
          </section>
          <div class="upload-dialog-operate">
            <el-button type="primary" size="mini" @click="dialogVisible=false">确定</el-button>
            <el-button size="mini" @click="dialogVisible=false">取消</el-button>
          </div>
        </el-col>
      </el-row>

    </el-dialog>

  </div>
</template>

<script>

  import tool from '../../assets/js_/tool'

  export default {
    props: ['imgVisible'],
    name: "photo-gallery",
    data() {
      return {
        imgItem: [
          {
            img: 'http://static.yoshop.xany6.com/20180928170741995264498.png',
            selectImg: false,
          }, {
            img: 'http://static.yoshop.xany6.com/20180928170741995264498.png',
            selectImg: false,
          }, {
            img: 'http://static.yoshop.xany6.com/20180928170741995264498.png',
            selectImg: false,
          }, {
            img: 'http://static.yoshop.xany6.com/20180928170741995264498.png',
            selectImg: false,
          }, {
            img: 'http://static.yoshop.xany6.com/20180928170741995264498.png',
            selectImg: false,
          }, {
            img: 'http://static.yoshop.xany6.com/20180928170741995264498.png',
            selectImg: false,
          }, {
            img: 'http://static.yoshop.xany6.com/201809281707414ac716924.png',
            selectImg: false,
          }, {
            img: 'http://static.yoshop.xany6.com/201809281707414ac716924.png',
            selectImg: false,
          }, {
            img: 'http://static.yoshop.xany6.com/201809281707414ac716924.png',
            selectImg: false,
          }, {
            img: 'http://static.yoshop.xany6.com/201809281707414ac716924.png',
            selectImg: false,
          }, {
            img: 'http://static.yoshop.xany6.com/201809281707414ac716924.png',
            selectImg: false,
          },
        ],
        groupItem: [
          {
            groupName: '分组1',
          },
          {
            groupName: '分组2',
          }
        ],
        selectIndex: null,
        groupActive: null,
        currentPage: 1,
        content: null,
        dialogVisible: false,
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      chooseImg(val) {
        this.imgItem[val].selectImg = !this.imgItem[val].selectImg
        /* this.selectImg = !this.selectImg
         this.selectIndex = val*/

      },
      handleCommand(command) {
        console.log("button click" + command)
      },
      addGroup() {
        this.$prompt('', '新分组名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          var obj = {
            groupName: value,
          }
          this.groupItem.push(obj)
        }).catch(() => {

        })
      },
      async deleteGroup(index) {
        var res = await tool.showModal(this, '确定删除?', true, '是的', '提示', 'warning')
        if (res[0] == 0) return false
        this.groupItem.splice(index, 1)
      },
      editGroup(index) {
        this.$prompt('', '修改分组名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: this.groupItem[index].groupName
        }).then(({value}) => {
          console.log("提示" + value)
          this.groupItem[index].groupName = value
        }).catch(() => {

        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      submitUpload() {
        this.$refs.upload.submit()
      }
    },
    mounted() {
    },
    watch: {
      imgVisible() {
        console.log(this.imgVisible)
        this.dialogVisible = true
        //this.dialogVisible = this.imgVisible
      }
    }
  }
</script>

<style scoped>
  .my-img-group .group-all {
    list-style: none;
  }

  /*.my-img-group.el-dialog {
    width: 850px;
  }*/

  .my-img-group .group-all li {
    padding: 10px 25px;
    margin-bottom: 1px;
  }

  .my-img-group .group-all li:hover {
    background: rgba(48, 145, 242, 0.1);;
    border-radius: 6px;
  }

  .my-img-group .add-group {
    padding: 15px 20px;
    cursor: pointer;
  }

  .my-img-group .upload-img-box {
    display: flex;
    flex-wrap: wrap;
    height: 335px;
    overflow-y: auto;
  }

  .my-img-group .add-group:hover {
    color: #007dff !important
  }

  .my-img-group .upload-list-item {
    position: relative;
    padding: 10px;
    margin: 10px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    cursor: pointer;
    border-radius: 4px;
  }

  .my-img-group .select-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
  }

  .my-img-group .select-mask img {
    position: absolute;
    top: 50px;
    left: 45px;
  }

  .my-img-group .upload-list-item.active {

  }

  .my-img-group .upload-list-item:hover {
    border-color: #409EFF;
    transition: 0.5s;
  }

  .my-img-group .img-operate {
    display: flex;
    padding: 0 15px;
    justify-content: space-between;
  }

  .upload-page {
    padding: 10px 0;
  }

  .upload-page .el-pagination {
    display: flex;
  }

  .upload-page .el-pagination__editor.el-input .el-input__inner {
    height: 24px;
  }

  .upload-dialog-operate {
    float: right;
    padding: 0 15px 10px;
  }

  .item-group {
    position: relative;
  }

  .group-remove {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 10px;
    right: 2px;
    border-radius: 10px;
    background: hsla(0, 0%, 60%, .6);
    color: #FFFFFF;
    line-height: 18px;
    text-align: center;
    cursor: pointer;
  }

  .group-remove:hover {
    background-color: #000;
  }

  .group-edit {
    position: absolute;
    display: none;
    left: 7px;
    top: 12px;
    cursor: pointer;
    color: #409EFF;
  }

  .group-remove {
    display: none;
  }

  .item-group:hover .group-edit {
    display: inline-block;
  }

  .item-group:hover .group-edit:hover {
    color: #000000;
  }

  .item-group:hover .group-remove {
    display: inline-block;
  }

  .upload-img-wrap {
    width: 120px;
    height: 120px;
  }

  .upload-img-wrap img {
    width: 100%;
    height: 100%;
  }

</style>

<style>
  .my-img-group.el-dialog {
    width: 850px;
    margin-top: 10vh !important;
  }

  .my-img-group .el-dialog__body {
    padding: 0 0 30px 0;
  }

  .photo-gallery .el-upload-list {
    display: none;
  }

</style>
