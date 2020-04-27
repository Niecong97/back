<template>
  <el-card class="card-wrap" shadow="never">
    <div slot="header">
      <span style="border-left: 4px solid #f60;padding: 0 10px;">{{cardMsg.cardTitle}}</span>
      <!-- <span class="edit primary-color" @click="myData.dialogFormVisible = true">编辑</span>-->
      <span class="edit primary-color" @click="emitEdit()">编辑</span>

    </div>
    <el-row>
      <!--<el-col :span="3">
        <img :src="cardMsg.userAvatar" alt="" style="width: 100px">
      </el-col>
      <el-col :span="21">
        &lt;!&ndash;排成非一列&ndash;&gt;
        &lt;!&ndash; <el-form-item label="用户ID：" class="user-detail-item" prop="name" label-width="120px">
           10000000313
         </el-form-item>
         <el-form-item label="会员卡编号：" class="user-detail-item" prop="name" label-width="120px">
           010104340205
         </el-form-item>
         <el-form-item label="微信昵称：" class="user-detail-item" prop="name" label-width="120px">
           111
         </el-form-item>
         <el-form-item label="微信ID：" class="user-detail-item" prop="name" label-width="120px">
           owAp31MBTL3be6hzeEhcfGKJYLis
         </el-form-item>
         <el-form-item label="昵称：" class="user-detail-item" prop="name" label-width="120px">
           111
         </el-form-item>
         <el-form-item label="手机：" class="user-detail-item" prop="name" label-width="120px">
           18100111111
         </el-form-item>
         <el-form-item label="姓名：" class="user-detail-item" prop="name" label-width="120px">
           111
         </el-form-item>
         <el-form-item label="性别：" class="user-detail-item" prop="name" label-width="120px">
           男
         </el-form-item>
         <el-form-item label="区域：" class="user-detail-item" prop="name" label-width="120px">
           浙江省杭州市
         </el-form-item>
         <el-form-item label="专属客服：" class="user-detail-item" prop="name" label-width="120px">
           Tony
         </el-form-item>
         <el-form-item label="星级：" class="user-detail-item star" prop="name" label-width="120px">
           <el-rate v-model="myData.formData.star" disabled>
           </el-rate>
         </el-form-item>
         <el-form-item label="最近登录：" class="user-detail-item" prop="name" label-width="120px">
           2018-11-23 13:22:39
         </el-form-item>
         <el-form-item label="状态：" class="user-detail-item" prop="name" label-width="120px">
           未激活
         </el-form-item>&ndash;&gt;
        &lt;!&ndash;排为一列&ndash;&gt;
        <el-row>
          <el-col :span="24" v-for="item in cardMsg.formItem">
            <el-form-item :label="item.title+'：'" class="user-detail-item" :prop="item.prop" label-width="120px">

              <el-rate v-if="item.prop==='start'" v-model="item.val" disabled></el-rate>  &lt;!&ndash;星级评分&ndash;&gt;

              <div v-else>{{item.val}}</div>
            </el-form-item>
          </el-col>

          &lt;!&ndash;<el-col :span="24">
            <el-form-item label="星级：" class="user-detail-item star" prop="name" label-width="120px">
              <el-rate v-model="myData.formData.star" disabled>
              </el-rate>
            </el-form-item>
          </el-col>&ndash;&gt;


        </el-row>
      </el-col>-->

      <el-row :gutter="20">  <!--gutter -->
        <el-col class="user-info" :span="14">
          <el-col :span="12">
            <img class="user-avatar" :src="cardMsg.userAvatar" alt="">
          </el-col>
          <el-col :span="12">
            <el-col :span="12">
              <!--昵称-->
              <el-form-item label="" class="user-detail-item" prop="name" label-width="20px">
                Tony
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!--性别-->
              <el-form-item label="" class="user-detail-item" prop="name" label-width="20px">
                <div><i class="fa fa-mars"></i></div>
              </el-form-item>
            </el-col>
            <!--微信id-->
            <el-form-item label="" class="user-detail-item" prop="name" label-width="20px">
              owAp31MBTL3be6hzeEhcfGKJYLis
            </el-form-item>

          </el-col>
          <el-form-item label="姓名：" class="user-detail-item info-left" prop="name" label-width="120px">
            小孙
          </el-form-item>
          <el-form-item label="生日：" class="user-detail-item info-left" prop="name" label-width="120px">
            2018-11-23 13:22:39
          </el-form-item>
          <el-form-item label="生日：" class="user-detail-item info-left" prop="name" label-width="120px">
            2018-11-23 13:22:39
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="手机号：" class="user-detail-item" prop="name" label-width="120px">
            1111111111
          </el-form-item>
          <el-form-item label="住址：" class="user-detail-item" prop="name" label-width="120px">
            浙江省杭州市1111111111
          </el-form-item>
          <el-form-item label="邮箱：" class="user-detail-item" prop="name" label-width="120px">
            111111111111111
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-col :span="8">
        <el-form-item label="用户组：" class="user-detail-item" prop="name" label-width="120px">
          个人用户
        </el-form-item>
        <el-form-item label="星级：" class="user-detail-item star" prop="name" label-width="120px">
          <el-rate v-model="myData.formData.star" disabled>
          </el-rate>
        </el-form-item>
        <el-form-item label="最近登录：" class="user-detail-item" prop="name" label-width="120px">
          2018-11-23 13:22:39
        </el-form-item>
        <el-form-item label="创建时间：" class="user-detail-item" prop="name" label-width="120px">
          2018-11-23 13:22:39
        </el-form-item>
        <el-form-item label="状态：" class="user-detail-item" prop="name" label-width="120px">
          未激活
        </el-form-item>
      </el-col>-->
    </el-row>
  </el-card>
</template>

<script>

  var myData = {
    formData: {
      star: 4,
    }
  }

  export default {
    props: ['cardUserFormMsg'],
    name: "card-user-form",
    data() {
      return {
        myData,
        cardMsg: null,
      }
    },
    methods: {
      emitEdit() {
        this.$emit('edit')
      }
    },
    created() {
      this.cardMsg = this.cardUserFormMsg
    }
  }
</script>

<style>
  .user-avatar {
    width: 100px;
    margin-left: 60px;
    /* margin: 0 0 20px 120px;*/
    border-radius: 50px;
  }
  .info-left{
    margin-bottom: 16px;
  }

</style>

<style scoped>

</style>


