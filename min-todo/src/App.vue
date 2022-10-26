<script  lang="ts">

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {AlertOutlined,CalendarOutlined,UserOutlined,TeamOutlined,
  MenuUnfoldOutlined,ToTopOutlined,MoreOutlined} from '@ant-design/icons-vue'
import {mapActions, mapState} from "pinia";
import {useStore,databaseStore,} from './store'
import {TaskInfoInterface as TaskInfo} from "./interfaces";
import ActiveTaskDetail from './components/ActiveTaskDetail.vue'
import dayjs from 'dayjs'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import TaskList from "./components/TaskList.vue";
import TaskInput from "./components/TaskInput.vue";
export default {
  computed:{
    ...mapState(useStore,['activeTask','currentTasks','tasks'])
  },
  components:{
    TaskInput,
    ActiveTaskDetail,
    TaskList,
    AlertOutlined,CalendarOutlined,UserOutlined,TeamOutlined,
      MenuUnfoldOutlined,ToTopOutlined,MoreOutlined
  },
  data(){
    return {
      zhCN,
    }
  },
  async mounted() {
    await databaseStore().init()
  },
  methods:{
    ...mapActions(useStore,['setActiveTask']),
    getPopupContainer(el, dialogContext) {
      if (dialogContext) {
        return dialogContext.getDialogWrap();
      } else {
        return document.body;
      }
    },

  }
}

</script>

<template>
  <a-config-provider  :locale="zhCN" :getPopupContainer="getPopupContainer">
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

        <div   style="width:190px !important;background: white;padding-left: 10px;padding-top: 10px;padding-right: 10px">
          <div class="middle-title" >
            全部待办
            <span style="float:right">{{tasks.length}}</span>
          </div>
          <div style="margin-top: 5px;margin-bottom: 5px">
           <TaskInput></TaskInput>
          </div>
          <TaskList :data="tasks">
          </TaskList>
        </div>
        <div   theme="light" style="min-width: auto !important;flex: auto !important;max-width: 800px !important;width: auto !important; padding-top: 10px;padding-left: 10px;padding-right: 10px;border-left: 1px solid #e1e1e1">
         <ActiveTaskDetail></ActiveTaskDetail>
        </div>
      <div>

      </div>
<!--      <a-layout-footer>footer</a-layout-footer>-->
    </a-layout>

  </a-config-provider>
</template>
<style>
body{
  user-select: none;
}

</style>
<style lang="scss">
.full-modal{
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
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






</style>
