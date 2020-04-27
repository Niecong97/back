<template>
  <div class="drag">
    <div class="imageSingle">
      <div class="item-img">
        <img src="https://demo.yiovo.com/assets/store/img/diy/banner_01.jpg" alt="">
        <img src="https://demo.yiovo.com/assets/store/img/diy/banner_02.jpg" alt="">
      </div>
    </div>
    <div class="btn-delete">
      <span class="del" @click="delComponent">删除</span>
    </div>
  </div>

</template>

<script>
  export default {
    props:['delNum'],
    name: "image-single",
    methods:{
      delComponent(){
        this.$emit('delComp',this.delNum)
      }
    }
  }
</script>

<style>

  .imageSingle .item-img img {
    display: block;
    width: 100%;
    height: 200px;
  }
</style>
