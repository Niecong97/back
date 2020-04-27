<template>
  <div class="news-view-dialog">
    <el-dialog align="center" title="Rsshuwre Sglil Xnuicfbc Mtnjzuqw Qpcbenpm Ukq" :visible.sync="dialogNewsView"
               :close-on-click-modal="false">
      <div class="news-view-wrap">
        <div class="news-info">
          <p>Donald</p>
          <p>1971-10-06 20:17</p>
        </div>
        <article class="content">
          import Vue from 'vue';
          import ElementUI from 'element-ui';
          import 'element-ui/lib/theme-chalk/index.css';
          import App from './App.vue';

          Vue.use(ElementUI);

          new Vue({
          el: '#app',
          render: h => h(App)
          });
          import Vue from 'vue';
          import ElementUI from 'element-ui';
          import 'element-ui/lib/theme-chalk/index.css';
          import App from './App.vue';

          Vue.use(ElementUI);

          new Vue({
          el: '#app',
          render: h => h(App)
          });
          import Vue from 'vue';
          import ElementUI from 'element-ui';
          import 'element-ui/lib/theme-chalk/index.css';
          import App from './App.vue';

          Vue.use(ElementUI);

          new Vue({
          el: '#app',
          render: h => h(App)
          });
          import Vue from 'vue';
          import ElementUI from 'element-ui';
          import 'element-ui/lib/theme-chalk/index.css';
          import App from './App.vue';

          Vue.use(ElementUI);

          new Vue({
          el: '#app',
          render: h => h(App)
          });
          import Vue from 'vue';
          import ElementUI from 'element-ui';
          import 'element-ui/lib/theme-chalk/index.css';
          import App from './App.vue';

          Vue.use(ElementUI);

          new Vue({
          el: '#app',
          render: h => h(App)
          });
          import Vue from 'vue';
          import ElementUI from 'element-ui';
          import 'element-ui/lib/theme-chalk/index.css';
          import App from './App.vue';

          Vue.use(ElementUI);

          new Vue({
          el: '#app',
          render: h => h(App)
          });
          import Vue from 'vue';
          import ElementUI from 'element-ui';
          import 'element-ui/lib/theme-chalk/index.css';
          import App from './App.vue';

          Vue.use(ElementUI);

          new Vue({
          el: '#app',
          render: h => h(App)
          });
          import Vue from 'vue';
          import ElementUI from 'element-ui';
          import 'element-ui/lib/theme-chalk/index.css';
          import App from './App.vue';

          Vue.use(ElementUI);

          new Vue({
          el: '#app',
          render: h => h(App)
          });
        </article>
        <section class="news-comment">
          <h3>全部评论</h3>
          <div class="comment-wrap item">
            <el-row>
              <el-col :span="4">
                <div class="news user-portrait">
                  <img src="https://avatars3.githubusercontent.com/u/34095604?s=40&v=4" alt="">
                </div>
              </el-col>
              <el-col :span="20">
                <div class="news comment-box">
                  <div class="comment-info">
                    <span>Donald</span>&nbsp;commented in
                    <span>1971-10-06 20:17</span>
                  </div>
                  <div class="comment-detail">
                      My issue relate to add and remove css animation.
                      Error: I must click 2 times on switch button then animation will be work.
                      Could you help me make an animation on row table when click switch buton?
                      Here my demo.
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="comment-wrap item">
            <el-row>
              <el-col :span="4">
                <div class="news user-portrait">
                  <img src="https://avatars3.githubusercontent.com/u/34095604?s=40&v=4" alt="">
                </div>
              </el-col>
              <el-col :span="20">
                <div class="news comment-box">
                  <div class="comment-info">
                    <span>Donald</span>&nbsp;commented in
                    <span>1971-10-06 20:17</span>
                  </div>
                  <div class="comment-detail">
                    My issue relate to add and remove css animation.
                    Error: I must click 2 times on switch button then animation will be work.
                    Could you help me make an animation on row table when click switch buton?
                    Here my demo.
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </section>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    props: ['showNewsView'],
    name: "news-view",
    data() {
      return {
        dialogNewsView: false
      }
    },
    methods: {},
    watch: {
      showNewsView() {
        this.dialogNewsView = true
      }
    }
  }
</script>

<style scoped>
  .content {
    padding: 30px;
    font-size: 16px;
  }
</style>
<style>
  .news-view-dialog .el-dialog__header {
    font-weight: bold;
  }

  .news-view-dialog .el-dialog__title{
    line-height: 24px;
    font-size: 18px;
    width: 500px;
    text-overflow: ellipsis;
    color: #303133;
    display: inline-block;
  }

  .news-view-dialog .el-dialog__body {
    padding: 6px 0;
  }

  .news-view-dialog .news-info {
    display: flex;
    justify-content: center;
  }

  .news-view-dialog .news-info > p {
    font-size: 16px;
    margin-right: 10px;
  }

  .news-view-dialog .el-dialog {
    margin-top: 10vh !important;
    height: 80vh;
    overflow: auto;
  }

  .news.user-portrait {
    width: 44px;
    height: 44px;
  }

  .user-portrait img {
    width: 100%;
  }
  .news.comment-box{
    border: 1px solid #DCDFE6;
    border-radius: 3px;
  }
  .news .comment-info{
    background: #f6f8fa;
    text-align: left;
    padding: 10px 15px;
    border-bottom: 1px solid #DCDFE6;
  }
  .comment-detail {
    padding: 15px;
    font-size: 14px;
    text-align: left;
  }
  .comment-wrap.item{
    margin-bottom: 20px;
  }
  .news-comment{
    border-top: 1px solid #EBEEF5;
    margin-top: 110px;
    padding: 20px 10px 30px 10px;
  }
  .news-comment h3 {
    text-align: left;
    margin-bottom: 20px;
    padding-left: 40px;
    font-size: 18px;
  }
</style>
