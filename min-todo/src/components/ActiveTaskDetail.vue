<template>
  <a-empty style="margin-top: calc( 100vh / 2 - 90px )" v-if="!activeTask.createTime" description="点击代办查看详情">
  </a-empty>
  <template v-else>
    <div><span class="title-action"><span @click="toggleMenu"><menu-fold-outlined v-if="config.menuState===MenuState.UN_FOLD"/><menu-unfold-outlined v-else /></span></span> <a-checkbox v-model:checked="activeTask.completed"></a-checkbox>

      &nbsp;
      <span @click="selectTime">
      <template v-if="activeTask.deadTime">{{time}} <TimerSelector v-model="activeTask.deadTime"/></template>
      <template v-else>
       设置时间 <TimerSelector v-model="activeTask.deadTime"/>
      </template></span>
      <span class="extra-actions">
            <span class="action"><to-top-outlined /> 置顶</span>
            &nbsp;
            <span class="action"><more-outlined /></span>
          </span>
    </div>
    <a-divider style="margin-top: 10px;margin-bottom: 10px"></a-divider>
    <div>
      <a-input size="small" :bordered="false" v-model:value="activeTask.title"></a-input>
      <div>
        <a-textarea v-model:value="activeTask.description" placeholder="描述" :bordered="false" :autosize="false">
        </a-textarea>
      </div>
    </div>
  </template>
</template>

<script>
import {mapActions, mapState, mapWritableState} from "pinia";
import {taskStore} from "../store";
import {configStore} from "../store";
import {DataSourceTypes,MenuState} from '../consts'
import {AlertOutlined,CalendarOutlined,UserOutlined,TeamOutlined,MenuFoldOutlined,
  MenuUnfoldOutlined,ToTopOutlined,MoreOutlined} from '@ant-design/icons-vue'
import dayjs from "dayjs";
import TimerSelector from "./TimerSelector.vue";
export default {
  name: "TaskDetail",
  data(){
    return {
      MenuState
    }
  },
  mounted() {
  },
  components:{
    TimerSelector,
    AlertOutlined,CalendarOutlined,UserOutlined,TeamOutlined,MenuFoldOutlined,
    MenuUnfoldOutlined,ToTopOutlined,MoreOutlined
  },
  computed:{
    ...mapWritableState(taskStore,['activeTask','currentTasks','tasks']),
    ...mapWritableState(configStore,['config']),
    time(){
      if(this.activeTask.deadTime){
        if(dayjs.unix(this.activeTask.deadTime).year()===dayjs().year()){
          return dayjs.unix(this.activeTask.deadTime).format('HH:mm,MM月DD日') //同一年不显示年份
        }else{
          return dayjs.unix(this.activeTask.deadTime).format('HH:mm,YY年MM月DD日')
        }
      }else{
        return ''
      }

    }
  },
  methods:{
    ...mapActions(configStore,['toggleMenu'])
  }
}
</script>

<style scoped>
.extra-actions{
  float:right;

}
</style>
