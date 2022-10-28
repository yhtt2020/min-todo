<template>
  <a-input class="add-task-input"  size="small" v-model:value="newTask.title" @pressEnter="addNewTask" placeholder="输入待办，回车确认">
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
dayjs.locale('zh-cn')
dayjs.extend(objectSupport)
export default {
  name: "TaskInput",
  components: {
    TimerSelector,
    CalendarOutlined
  },
  computed: {
    ...mapState(taskStore, ['currentTasks', 'tasks'])
  },
  data() {
    return {
      newTask: {
        title: '',
        deadTime: null
      },

    }
  },
  mounted() {


  },
  methods: {

    ...mapActions(taskStore, {
      addTask:'add'
    }),

    addNewTask() {
      let task = this.newTask
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
