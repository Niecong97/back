<template>
  <el-card shadow="never" class="card-wrap">
    <div slot="header">
      <span class="card-form-span">{{cardMsg.cardTitle}}</span>
      <!--<span class="edit primary-color" @click="editDelivery(0)">编辑</span>-->
      <span class="edit primary-color" @click="emitEdit(cardMsg.edit)">编辑</span>
    </div>
    <div class="card-form-block">
      <el-row>
        <el-col :span="24" v-for="item in cardMsg.formItem">
          <el-form-item :label="item.title+'：'" :prop="item.prop" :label-width="myData.formData.input_width">
            {{item.val}}
          </el-form-item>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>

  var myData={
    formData:{
      input_width: '100px',
    }
  }

  export default {
    props:['cardFormMsg'],
    name: "card-form",
    data() {
      return {
        myData,
        cardMsg:null,
      }
    },
    methods:{
      emitEdit(num){
        this.$emit('edit',num)
      }
    },
    created(){
      // 表单信息
      this.cardMsg = this.cardFormMsg
    }
  }
</script>

<style scoped>

  .card-form-block .el-form-item {
    margin: 0;
  }

  .card-form-span {
    padding: 0 10px;
    border-left: 4px solid rgb(255, 102, 0);
    font-weight: bold;
  }
</style>
