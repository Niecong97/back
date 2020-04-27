<template>
  <div class="drag">
    <div class="phone-video" :style="{'padding-top':componentVal.paddingTop+'px','padding-bottom':componentVal.paddingTop+'px'}">
      <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions">
      </video-player>
    </div>
    <div class="btn-delete">
      <span class="del" @click="delComponent">删除</span>
    </div>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'

  export default {
    props: ['delNum', 'selectComp'],
    name: "phone-video",
    data() {
      return {
        playerOptions: {
          autoplay: false,
          loop: false,
          preload: 'auto',
          language: 'zh-CN',
          aspectRatio: '16:9',
          fluid: false,
          sources: [{
            type: '',
            src: 'http://vjs.zencdn.net/v/oceans.mp4',
          }],
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-6.jpg",
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            fullscreenToggle: false  //全屏按钮
          }
        },
        componentVal:this.selectComp,
        paddingTop:null,
      }
    },
    methods:{
      delComponent(){
        this.$emit('delComp',this.delNum)
      }
    },
    created(){
      this.componentVal = this.selectComp
      this.playerOptions.poster = this.componentVal.poster
      this.playerOptions.sources[0].src = this.componentVal.page
    },
    mounted(){

    }
  }
</script>

<style>
  /*隐藏播放按钮*/
  .vjs-custom-skin > .video-js .vjs-big-play-button {
    display: none;
  }
</style>
