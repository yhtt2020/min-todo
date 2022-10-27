<template>
  <a-empty style="margin-top: calc( 100vh / 2 - 90px )" v-if="!activeTask.createTime" description="点击代办查看详情">
  </a-empty>
  <template v-else>
    <div><span class="title-action"><span @click="toggleMenu"><menu-fold-outlined
        v-if="config.menuState===MenuState.UN_FOLD"/><menu-unfold-outlined v-else/></span></span>
      <a-checkbox v-model:checked="activeTask.completed"></a-checkbox>

      &nbsp;
      <span @click="selectTime">
      <template v-if="activeTask.deadTime">{{ time }} <TimerSelector v-model="activeTask.deadTime"/></template>
      <template v-else>
       设置时间 <TimerSelector v-model="activeTask.deadTime"/>
      </template></span>
      <span class="extra-actions">
            <span @click="toggleTop" v-if="activeTask.isTop" class="action"><to-top-outlined
                style="transform: rotate(180deg)"/> 取消置顶</span>
            <span @click="toggleTop" v-else class="action"><to-top-outlined/> 置顶</span>
            &nbsp;
            <span class="action"><more-outlined/></span>
          </span>
    </div>
    <a-divider style="margin-top: 10px;margin-bottom: 10px"></a-divider>
    <div>
      <a-input size="small" :bordered="false" v-model:value="activeTask.title"></a-input>
      <div style="position: relative;padding: 10px">
        <template v-if="activeTask.descriptionType==='text'">
          <a-textarea style="background: white;height: calc( 100vh - 100px) ;" @focus="this.showFormatConvert=true" @blur="this.showFormatConvert=false"
                      v-model:value="activeTask.description" placeholder="描述" :bordered="false" :autosize="false">
          </a-textarea>
        </template>
        <div  v-if="activeTask.descriptionType==='rich'">
          <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
          />
          <Editor @onCreated="handleCreated"
              style="height: calc( 100vh - 141px) ; "
              v-model="activeTask.description"
              :defaultConfig="editorConfig"
              :mode="mode"
          />
        </div>
        <template v-show="activeTask.descriptionType==='markdown'">
          markdown
        </template>

        <div style="position: absolute ;right:  0px;top: -26px; " class="convert-editor">
<!--             :hidden="!showFormatConvert"-->

          <a-radio-group  buttonStyle="outline" size="small" v-model:value="activeTask.descriptionType">
            <a-radio-button style="background: none" title="纯文字模式" value="text">
              <align-left-outlined/>
            </a-radio-button>
            <a-radio-button style="background: none" title="图文编辑器" value="rich">
              <pic-left-outlined></pic-left-outlined>
            </a-radio-button>
<!--            <a-radio-button style="background: none" title="Markdown编辑器" value="markdown"><span class="icon-markdown">MD</span></a-radio-button>-->
          </a-radio-group>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {Editor, Toolbar} from '@wangeditor/editor-for-vue'
import {mapActions, mapState, mapWritableState} from "pinia";
import {taskStore} from "../store";
import {configStore} from "../store";
import {DataSourceTypes, MenuState} from '../consts'
import {
  AlertOutlined, CalendarOutlined, UserOutlined, TeamOutlined, MenuFoldOutlined,
  MenuUnfoldOutlined, ToTopOutlined, MoreOutlined, PicLeftOutlined, AlignLeftOutlined
} from '@ant-design/icons-vue'
import dayjs from "dayjs";
import TimerSelector from "./TimerSelector.vue";
import { shallowRef} from "vue";

export default {
  name: "TaskDetail",
  data() {
    return {
      MenuState,
      showFormatConvert: false,
      editorRef:{},
      toolbarConfig:{
        toolbarKeys:[
            'bold','italic','through','|','todo','bulletedList', 'numberedList',{key: 'group-more-style',title: '更多样式',menuKeys:['code', 'emotion', 'insertLink']},
            'fullScreen'
        ]
      },
      toolbar,
      editorConfig: { placeholder: '请输入描述...' ,height:'200px'},
      mode:'simple'
    }
  },

  mounted() {
    // 编辑器实例，必须用 shallowRef
    this.editorRef = shallowRef()
    if(!this.activeTask.descriptionType){
      this.activeTask.descriptionType='text'
    }
    // 内容 HTML

  },
  components: {
    TimerSelector,
    AlertOutlined, CalendarOutlined, UserOutlined, TeamOutlined, MenuFoldOutlined,
    MenuUnfoldOutlined, ToTopOutlined, MoreOutlined, PicLeftOutlined, AlignLeftOutlined,
    Editor, Toolbar
  },
  beforeUnmount() {
    const editor = this.editorRef.value
    if (editor == null) return
    editor.destroy()
  },
  computed: {
    ...mapWritableState(taskStore, ['activeTask', 'currentTasks', 'tasks']),
    ...mapWritableState(configStore, ['config']),
    time() {
      if (this.activeTask.deadTime) {
        if (dayjs.unix(this.activeTask.deadTime).year() === dayjs().year()) {
          return dayjs.unix(this.activeTask.deadTime).format('HH:mm,MM月DD日') //同一年不显示年份
        } else {
          return dayjs.unix(this.activeTask.deadTime).format('HH:mm,YY年MM月DD日')
        }
      } else {
        return ''
      }

    }
  },
  methods: {
    handleCreated(editor){
      this.editorRef=editor
    },
    ...mapActions(configStore, ['toggleMenu']),
    toggleTop() {
      this.activeTask.isTop = !this.activeTask.isTop
    }
  }
}
</script>

<style scoped>
.extra-actions {
  float: right;

}

.action {
  cursor: pointer;
}
</style>
<style>
</style>
