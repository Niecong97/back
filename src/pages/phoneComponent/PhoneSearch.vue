<template>
  <!--搜索框-->
  <div class="drag" draggable="false">
    <div class="phone-search" :class="[componentVal.positionText,componentVal.inputStyle]"> <!--:class="[inputStyle,positionText]"-->
      <el-input :placeholder="componentVal.title">
        <el-button slot="prepend" icon="el-icon-search"></el-button>
      </el-input>

    </div>
    <!--覆盖父级元素 pointer:move-->
    <div class="wrap-cover"></div>
    <div class="btn-delete">
      <span class="del" @click="delComponent">删除</span>
    </div>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'
  import tool from '../../assets/js_/tool'

  export default {
    props: ['delNum', 'selectComp','selectNum'], //要删除的组件  父组件传来的所有组件数据  选中的当前组件id
    name: "phone-search",
    data() {
      return {
        componentVal: null,
        Num:null, //选中的组件
        searchPh: null,
        inputStyle: null, //1:方形 2：圆角 3.圆弧
        positionText: null, //1.居左 2.居中 3.居右
      }
    },
    methods: {
      delComponent() {
        this.$emit('delComp', this.delNum)
      },
    },
    created() {
      this.componentVal = this.selectComp
      //this.searchPh = this.componentVal.title

     /* Bus.$on('selectNum',(data)=>{
        this.Num = data
      })*/

      //初始值
     /* this.searchPh = this.componentVal[0].title
      this.inputStyle = this.componentVal[0].inputStyle
      this.positionText = this.componentVal[0].positionText*/
    },


  mounted: function () {
    var that = this

  /*  Bus.$on('searchTitle', (data) => {   //标题
      that.searchPh = data
      that.componentVal[that.Num].title = data
    })
    Bus.$on('search', (data) => {  //搜索框样式
      that.inputStyle = data
      that.componentVal[that.Num].inputStyle = data
    })
    Bus.$on('positionText', (data) => {  //文字位置
      that.positionText = data
      that.componentVal[that.Num].positionText = data


    })

    if(tool.empty(that.Num)){
      that.componentVal[0].positionText = that.positionText
    }else {
      that.componentVal[that.Num].positionText = that.positionText
    }*/

    //that.positionText = that.componentVal[that.Num].positionText

  }
  ,
  }
</script>

<style>
  @import '../../assets/css/phone.css';

  .phone-search {
    padding: 10px 10px;
    background-color: #f1f1f2;
  }

  .phone-search .el-input__inner {
    height: 36px !important;
  }

  .banner-img {
    height: 180px;
  }


</style>
