<script  lang="ts">

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {AlertOutlined,CalendarOutlined,UserOutlined,TeamOutlined,
  MenuUnfoldOutlined,ToTopOutlined,MoreOutlined} from '@ant-design/icons-vue'
import {mapActions, mapState} from "pinia";
import {useStore,databaseStore,} from './store'
import {TaskInfoInterface as TaskInfo} from "./interfaces";

export default {
  computed:{
    ...mapState(useStore,['currentTasks','tasks'])
  },
  components:{
    AlertOutlined,CalendarOutlined,UserOutlined,TeamOutlined,
      MenuUnfoldOutlined,ToTopOutlined,MoreOutlined
  },
  data(){
    return {
      newTask:<TaskInfo> {}
    }
  },
  async mounted() {
    await databaseStore().init()
  },
  methods:{
    ...mapActions(useStore,['addTask']),
    addNewTask(){
      let task=this.newTask
      this.addTask(task)
      task.title=''
    }
  }
}

</script>

<template>
    <a-layout theme="light" style="height: 100vh">
<!--      <a-layout-header theme="light">header</a-layout-header>-->
        <a-layout-sider :width="100" class="sidebar" theme="light">
          <ul class="nav-items">
            <li class="active"><div class="nav-wrapper"> <alert-outlined  style="font-size:16px"/> 今天</div></li>
            <li><div class="nav-wrapper"><calendar-outlined style="font-size:16px"/> 七天</div></li>
            <li><div class="nav-wrapper"><user-outlined style="font-size:16px"/> 个人</div></li>
            <li><div class="nav-wrapper"><team-outlined style="font-size:16px"/> 团队</div></li>
          </ul>
          <a-divider style="margin-top: -10px;margin-bottom: 5px" />
          <div class="small-title">清单</div>

        </a-layout-sider>

        <a-layout-content  style="background: white;padding-left: 10px;padding-top: 10px;padding-right: 10px">
          <div class="middle-title" >
            全部待办
            <span style="float:right">{{tasks.length}}</span>
          </div>
          <div style="margin-top: 5px;margin-bottom: 5px">
            <a-input size="small" v-model:value="newTask.title" @pressEnter="addTask" placeholder="输入待办，回车确认"></a-input>
          </div>
          <ul class="task-list">
            <li v-for="task in tasks">
              <a-checkbox>{{task.title}} </a-checkbox> 任务标题任务标题
            </li>
          </ul>

        </a-layout-content>
        <a-layout-sider :width="250" theme="light" style="padding-top: 10px;padding-left: 10px;padding-right: 10px;border-left: 1px solid #e1e1e1">
          <div><span class="title-action"><menu-unfold-outlined /></span> <a-checkbox></a-checkbox> 任务

          <span class="extra-actions">
            <span class="action"><to-top-outlined /> 置顶</span>
            &nbsp;
            <span class="action"><more-outlined /></span>
          </span>
          </div>
        </a-layout-sider>
<!--      <a-layout-footer>footer</a-layout-footer>-->
    </a-layout>
</template>
<style>
body{
  user-select: none;
}
</style>
<style scoped lang="scss">
.small-title{
  font-size: 12px;
  padding-left: 10px;
  color: grey;
}
.middle-title{
  font-size: 13px;
  color: grey;
}
.sidebar{
  background: rgba(238, 233, 233, 0.27);
  .nav-items{
    list-style: none;
    padding-left: 0;
    margin-top: 5px;
    li{
      .nav-wrapper{
        padding:5px 10px;
        margin-left:5px;
        margin-right:5px;
        margin-bottom: 2px;
        border-radius: 3px;
      }
      &.active,&:hover{
        .nav-wrapper{
          background: white;

        }
      }
      font-size: 13px;
    }

  }
}



.task-list{
  list-style: none;
  padding-left: 0;
  li{
    line-height: 28px;
  }
}
.extra-actions{
  float:right;

}
</style>
