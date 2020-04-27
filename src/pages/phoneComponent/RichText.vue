<template>
  <div class="drag">
    <div v-html="componentVal.textContext" class="rich-text ql-editor"
         :style="{'background-color':componentVal.bgColor,'padding-top':componentVal.paddingTop +'px',
         'padding-bottom':componentVal.paddingTop+'px','padding-left':componentVal.paddingLeft+'px',
         'padding-right':componentVal.paddingLeft+'px',}">

    </div>
    <div class="btn-delete">
      <span class="del" @click="delComponent">删除</span>
    </div>
  </div>
</template>

<script>

  import Bus from '../../bus/bus'
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    props: ['delNum', 'selectComp'],
    name: "rich-text",
    data() {
      return {
        componentVal: this.selectComp,
        editorOption: {
          modules: {
            toolbar: [['bold', 'italic', 'underline', 'strike'],
              ['image'],
              [{'header': 1}, {'header': 2}],
              [{'color': []}, {'background': []}],
              [{'font': []}],
              [{'align': []}],
              [{'size': ['small', false, 'large', 'huge']}],
            ]
          },
          theme: 'snow'
        },
      }
    },
    created() {
      this.componentVal = this.selectComp
    },
    mounted() {
    },
    components: {
      quillEditor
    },
    watch: {},
    methods: {
      delComponent() {
        this.$emit('delComp', this.delNum)
      },

    },
  }
</script>

<style scoped>

  /*文字超出换行*/
  .rich-text {
    word-wrap: break-word;
  }
</style>

<style>
  .rich-text .ql-toolbar.ql-snow {
    display: none;
  }
</style>
