<template>
  <!--查询条件组件-->
  <div class="filter-wrap">
    <el-form class="filter-form">
      <el-form-item class="select-item" label="关键词:" prop="name" label-width="80px">
        <el-input type="text" v-model="myData.formData.name" placeholder="手机号/微信昵称/姓名"
                  style="width: auto;"></el-input>
      </el-form-item>

      <el-form-item class="select-item" label="客户身份:" prop="name" label-width="80px">
        <el-input type="text" v-model="myData.formData.name" placeholder="全部" style="width: auto"></el-input>
      </el-form-item>

      <el-form-item class="select-item" label="会员卡:" prop="name" label-width="80px">
        <el-select class="cir-select" v-model="myData.formData.name" placeholder="全部" style="width: 206px">
          <el-option label="" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="select-item" label="用户组:" prop="name" label-width="80px">
        <el-select class="cir-select" v-model="myData.formData.name" placeholder="全部" style="width: 206px">
          <el-option label="" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="select-item" label="星级:" prop="name" label-width="80px">
        <el-select class="cir-select" v-model="myData.formData.name" placeholder="全部" style="width: 206px">
          <el-option label="" value=""></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="select-item" label="性别:" prop="name" label-width="80px">
        <el-select class="cir-select" v-model="myData.formData.name" placeholder="全部" style="width: 206px">
          <el-option label="" value=""></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="select-item" label="地域:" prop="name" label-width="80px">
        <el-select class="cir-select" v-model="myData.formData.name" placeholder="全部" style="width: 206px">
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

      <!-- <el-form-item label="活动时间">
         <el-col :span="11">
           <el-date-picker type="date" placeholder="选择日期" v-model="myData.formData.name" style="width: 100%;"></el-date-picker>
         </el-col>
         <el-col class="line" :span="2">-</el-col>
         <el-col :span="11">
           <el-time-picker type="fixed-time" placeholder="选择时间" v-model="myData.formData.name" style="width: 100%;"></el-time-picker>
         </el-col>
       </el-form-item>-->

      <div class="form-search">
        <el-button type="primary" size="small">筛选</el-button>
        <el-button plain size="small">清空筛选条件</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

  var myData={
    formData:{
      name:null,
    }
  }

    export default {
        name: "filter-section",
        data(){
          return{
            myData
          }
        }
    }
</script>

<style scoped>

</style>
