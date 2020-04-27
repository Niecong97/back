<template>
  <div id="language">
    <el-container>
      <!-- &lt;!&ndash;多语言&ndash;&gt;
       <span>{{$t('message.text')}}</span>
       <el-select v-model="selectValue" @change="langChange">
         <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
         </el-option>
       </el-select>

       <section>
         {{emitaaa}}
       </section>

       <el-main>
         <router-link to="langCn" >to Cn</router-link>
         <router-link to="langEn" >to En</router-link>

         <router-view :parentA="newMsg" @emitaaa="updateA"/>
       </el-main>

       <FooterBar  :message1="aaa" v-if="isShow"></FooterBar>-->

     <!-- <el-row style="width: 100%;">
        <el-form labelPosition="top" ref="ruleForm">
          <el-col :span="12" :md="24">
            <div class="reg-block">
              <div class="reg-form">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="phone_number">
                      <el-input class="input-phone-country" type="text" v-model="formData.phone_number"></el-input>
                      <el-input class="input-phone" type="text" v-model="formData.phone_number"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>


        </el-form>
      </el-row>-->


      <!--拖拽-->
      <div class="color-list">
        <div :class="color_item" v-for="color in colors" v-dragging="{ item: color, list: colors, group: 'color' }"
             :key="color.text" :style="{'background-color':color.text}">
          {{color.text}}
        </div>
      </div>

    </el-container>
  </div>
</template>


<script>

  import FooterBar from './FooterBar'

  export default {
    components: {
      FooterBar: FooterBar
    },
    data() {
      return {
        color_item:'color-item',
        formData:{
          phone_number:null,
        },
        aaa: {
          msg1: 1,
          msg2: 2,
        },
        newMsg: {
          name: 'cong'
        },
        emitaaa: null,
        test1: 1,
        selectValue: '',
        options: [
          {
            value: 'cn',
            label: '中文',
          },
          {
            value: 'en',
            label: 'English'
          }
        ],
        colors: [{
          text: "Aquamarine"
        }, {
          text: "Hotpink"
        }, {
          text: "Gold"
        }, {
          text: "Crimson"
        }, {
          text: "Blueviolet"
        }, {
          text: "Lightblue"
        }, {
          text: "Cornflowerblue"
        }, {
          text: "Skyblue"
        }, {
          text: "Burlywood"
        }],

      }
    },
    methods: {
      langChange(e) {
        localStorage.setItem('lang', e)
        this.$i18n.locale = e
      },
      updateA(data) {
        this.emitaaa = data.name
      }
    },
    created() {
      this.selectValue = localStorage.lang == undefined ? 'cn' : localStorage.lang

      var data = {
        num: 111,
      }
      this.$emit('sendNum', data)
      //this.$store.dispatch('hideFooter')

    },
    mounted() {
      /*this.$dragging.$on('dragged', function(data) {
        console.log('dragged', data)
      })
      this.$dragging.$on('dragend', function(data) {
        console.log('dragend', data)
      })*/
    },
    computed: {
      isShow() {
        return this.$store.getters.isShow
      }
    },
    watch: {}

  }
</script>

<style>
  .color-item{
    width: 200px;
    height: 100px;
    transition: transform .3s;
  }
  .in-out-translate-fade-enter-active, .in-out-translate-fade-leave-active {
    transition: all .5s;
  }
  .in-out-translate-fade-enter, .in-out-translate-fade-leave-active {
    opacity: 0;
  }
  .in-out-translate-fade-enter {
    transform: translate3d(100%, 0, 0);
  }
  .in-out-translate-fade-leave-active {
    transform: translate3d(-100%, 0, 0);
  }

</style>
