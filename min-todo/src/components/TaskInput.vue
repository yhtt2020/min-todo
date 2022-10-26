<template>
  <a-input size="small" v-model:value="newTask.title" @pressEnter="addNewTask" placeholder="输入待办，回车确认">
    <template #suffix>
      <calendar-outlined @click="this.dateTimePickerVisible=true" :style="{color:this.newTask.deadTime?'#4545fa':'rgba(0, 0, 0, 0.45)'}"/>
    </template>
  </a-input>
  <a-modal
      @ok="setDeadTime"
      @cancel="clearDeadTime"
      v-model:visible="dateTimePickerVisible"
      :title="null"
      centered
      ok-text="设置"
      cancel-text="清除"
      :width="300"
  >
    <a-tag @click="setToday">今天</a-tag>
    <a-tag @click="setTomorrow">明天</a-tag>
    <a-tag @click="setNextWeek">下周</a-tag>
    <a-tag @click="setNextYear">下月</a-tag>
    <a-divider style="margin-top: 5px;margin-bottom: 5px"></a-divider>
    <div>
      <a-row type="flex">
        <a-col flex="220px">
          <a-date-picker placeholder="选择日期" style="width: 100%" v-model:value="newTaskDeadDate"/>
          <a-time-picker @change="onTimePickerChange" style="width: 100%;margin-top: 10px"
                         v-model:value="newTaskDeadTime" placeholder="选择时间"
                         format="HH:mm"/>
        </a-col>
        <a-col flex="140px">

        </a-col>
      </a-row>
    </div>

  </a-modal>
</template>

<script>
import dayjs from "dayjs";
import {mapActions, mapState} from "pinia";
import {taskStore} from "../store";
import {CalendarOutlined} from '@ant-design/icons-vue'
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.locale('zh-cn')
dayjs.extend(objectSupport)
export default {
  name: "TaskInput",
  components: {
    CalendarOutlined
  },
  computed: {
    ...mapState(taskStore, ['currentTasks', 'tasks'])
  },
  data() {
    return {
      dateTimePickerVisible: false,
      newTask: {
        title: '',
        deadTime: null
      },
      newTaskDeadDate: null,
      newTaskDeadTime: null,
    }
  },
  mounted() {


  },
  methods: {
    onTimePickerChange() {
      if (this.newTaskDeadTime) {
        if (this.newTaskDeadDate === null) {
          this.newTaskDeadDate = dayjs()
        }
      }
    },
    ...mapActions(taskStore, ['addTask']),

    setToday() {
      this.newTaskDeadDate = dayjs()
    },
    setTomorrow() {
      this.newTaskDeadDate = dayjs().add(1, 'day')
    },
    setNextWeek() {
      this.newTaskDeadDate = dayjs().add(7, 'day')
    },
    setNextYear() {
      this.newTaskDeadDate = dayjs().add(1, 'year')
    },
    setDeadTime(){
      let deadTime
      if (this.newTaskDeadDate) {
        if (this.newTaskDeadTime === null) {
          this.newTaskDeadTime =new dayjs({
            hour: 23,
            minute: 59,
          })
        }
        deadTime = new dayjs({
          year: this.newTaskDeadDate.year(),
          month: this.newTaskDeadDate.month(),
          day: this.newTaskDeadDate.date(),
          hour: this.newTaskDeadTime.hour(),
          minute: this.newTaskDeadTime.minute(),
        })
      }
      console.log(deadTime)
      this.newTask.deadTime=deadTime.unix()
      this.dateTimePickerVisible=false
    },
    clearDeadTime(){
      this.newTaskDeadDate=null
      this.newTaskDeadTime=null
      this.deadTime=null
      this.dateTimePickerVisible=false
      this.newTask.deadTime=null
    },
    addNewTask() {
      console.log(this.newTaskDeadDate, this.newTaskDeadTime)

      let task = this.newTask
      task = Object.assign(this.newTask,{} )


      this.addTask(task)
      this.newTask.title = ''
      this.newTask.deadTime=null
    }
  }
}
</script>

<style scoped>

</style>
