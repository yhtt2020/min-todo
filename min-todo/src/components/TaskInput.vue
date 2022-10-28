<template>
  <a-input class="add-task-input"  size="small" v-model:value="newTask.title" @pressEnter="addNewTask" :placeholder="getPlaceholder()">
    <template #suffix>
      <TimerSelector v-model="newTask.deadTime"/>
    </template>
  </a-input>

</template>

<script>
import dayjs from "dayjs";
import {mapActions, mapState} from "pinia";
import {taskStore} from "../stores/task";
import {CalendarOutlined} from '@ant-design/icons-vue'
import objectSupport from "dayjs/plugin/objectSupport";
import TimerSelector from "./TimerSelector.vue";
import {listStore} from "../store";
dayjs.locale('zh-cn')
dayjs.extend(objectSupport)
export default {
  name: "TaskInput",
  components: {
    TimerSelector,
    CalendarOutlined
  },
  computed: {
    ...mapState(taskStore, ['currentTasks', 'tasks']),
    ...mapState(listStore,['activeList'])
  },
  data() {
    return {
      newTask: {
        title: '',
        deadTime: null,
        listNanoid:0,
      },

    }
  },
  mounted() {


  },
  methods: {
    getPlaceholder(){
      if(this.activeList){
        return '添加到「'+this.activeList.title+"」"
      }else{
        return '输入待办，回车确认'
      }
    },

    ...mapActions(taskStore, {
      addTask:'add'
    }),

    addNewTask() {
      let task = this.newTask
      this.newTask.listNanoid=[this.activeList.nanoid]||0
      task = Object.assign(this.newTask,{} )
      this.addTask(task)
      this.newTask.title = ''
      this.newTask.deadTime=null

    }
  }
}
</script>

<style  lang="scss">
.add-task-input{
  input{
    font-size: 13px;
  }
}
</style>
