<template>
  <a-input
    class="add-task-input"
    :size="runtime.windowWidth >= 600 ? 'normal' : 'small'"
    v-model:value="newTask.title"
    @pressEnter="addNewTask"
    :placeholder="getPlaceholder()"
  >
    <template #suffix>
      <TimerSelector v-model="newTask.deadTime" />
    </template>
  </a-input>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { mapActions, mapState } from "pinia";
import { taskStore } from "../stores/task";
import { CalendarOutlined } from "@ant-design/icons-vue";
import objectSupport from "dayjs/plugin/objectSupport";
import TimerSelector from "./TimerSelector.vue";
import { configStore, listStore } from "../store";
dayjs.locale("zh-cn");
dayjs.extend(objectSupport);
export default {
  name: "TaskInput",
  components: {
    TimerSelector,
    CalendarOutlined,
  },
  computed: {
    ...mapState(taskStore, ["currentTasks", "tasks"]),
    ...mapState(listStore, ["activeList"]),
    ...mapState(configStore, ["runtime"]),
  },
  data() {
    return {
      newTask: {
        title: "",
        deadTime: null,
        listNanoid: 0,
      },
    };
  },
  mounted() {},
  methods: {
    getPlaceholder() {
      if (Object.keys(this.activeList).length > 0) {
        return "添加到「" + this.activeList.title + "」";
      } else {
        return "输入待办，回车确认";
      }
    },

    ...mapActions(taskStore, {
      addTask: "add",
    }),

    addNewTask() {
      let task = this.newTask;
      if (Object.keys(this.activeList).length > 0) {
        this.newTask.listNanoid = this.activeList.nanoid
          ? [this.activeList.nanoid]
          : [];
      } else {
        this.newTask.listNanoid = [];
      }

      task = Object.assign(this.newTask, {});
      this.addTask(task);
      this.newTask.title = "";
      this.newTask.deadTime = null;
      this.newTask.listNanoid = [];
    },
  },
};
</script>

<style lang="scss">
.add-task-input {
  input {
    font-size: 13px;
  }
}
</style>
