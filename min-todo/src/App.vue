<script lang="ts">

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import './assets/index.css'
import {sortType} from './consts';
import {
  AlertOutlined, CalendarOutlined, UserOutlined, TeamOutlined,
  MenuUnfoldOutlined, ToTopOutlined, MoreOutlined, PlusOutlined,
  EllipsisOutlined, ClockCircleOutlined, SortAscendingOutlined, OrderedListOutlined, SwapLeftOutlined
} from '@ant-design/icons-vue'
import {mapActions, mapGetters, mapState} from "pinia";
import {databaseStore, configStore, listStore, taskStore} from './store'
import {MenuState} from './consts'
import {Empty} from 'ant-design-vue';
import {ITaskInfo as TaskInfo} from "./interfaces";
import ActiveTaskDetail from './components/ActiveTaskDetail.vue'
import dayjs from 'dayjs'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import TaskList from "./components/TaskList.vue";
import TaskInput from "./components/TaskInput.vue";
import ListList from './components/ListList.vue'
import VueCustomScrollbars from './components/VueScrollbar.vue'

export default {
  computed: {
    ...mapState(taskStore, ['activeTask', 'currentTasks', 'tasks', 'displayList']),
    ...mapState(configStore, ['config']),
    ...mapState(listStore, ['lists','activeList','displayLists']),
  },
  components: {
    VueCustomScrollbars,
    TaskInput,
    ActiveTaskDetail,
    TaskList,
    ListList,
    AlertOutlined, CalendarOutlined, UserOutlined, TeamOutlined,
    MenuUnfoldOutlined, ToTopOutlined, MoreOutlined, PlusOutlined,
    EllipsisOutlined, ClockCircleOutlined, SortAscendingOutlined, OrderedListOutlined, SwapLeftOutlined
  },
  data() {
    return {
      sortType,
      settings: {
        swipeEasing: true,
        suppressScrollY: false,
        suppressScrollX: true,
        wheelPropagation: false
      },
      zhCN,
      MenuState,
      addNewListVisible: false,
      newList: {},
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
    }
  },
  async mounted() {
    await databaseStore().init()
    databaseStore().$subscribe((mutation, state) => {
      databaseStore().save()
    })
  },
  methods: {
    ...mapActions(taskStore, ['setActiveTask']),
    ...mapActions(listStore, {
      addList: 'add',
    }),
    ...mapActions(configStore, ['showCompleted', 'hideCompleted','setSort']),
    showAddList() {
      this.addNewListVisible = true
    },
    getPopupContainer(el, dialogContext) {
      if (dialogContext) {
        return dialogContext.getDialogWrap();
      } else {
        return document.body;
      }
    },

    addNewList() {
      this.addList(this.newList)
      this.addNewListVisible = false
      this.newList.title = ''
    }
  }
}

</script>

<template>
  <a-config-provider :locale="zhCN" :getPopupContainer="getPopupContainer">
    <a-layout theme="light" style="height: 100vh">
      <!--      <a-layout-header theme="light">header</a-layout-header>-->
      <a-layout-sider v-show="config.menuState===MenuState.UN_FOLD" class="sidebar left-sidebar" theme="light">
        <ul class="nav-items">
          <li class="active">
            <div class="nav-wrapper">
              <user-outlined style="font-size:16px"/>
              个人 <span style="float:right;color: #999;">{{ tasks.length }}</span></div>
          </li>
          <li>
            <div class="nav-wrapper">
              <alert-outlined style="font-size:16px"/>
              今天
            </div>
          </li>
          <li>
            <div class="nav-wrapper">
              <calendar-outlined style="font-size:16px"/>
              最近7天
            </div>
          </li>
          <li>
            <div class="nav-wrapper">
              <team-outlined style="font-size:16px"/>
              团队
            </div>
          </li>
        </ul>
        <a-divider style="margin-top: -10px;margin-bottom: 5px"/>
        <a-modal
            v-model:visible="addNewListVisible"
            title="创建清单"
            :width="300"
            centered
            @ok="addNewList()"
        >
          <a-input @pressEnter="addNewList()" placeholder="清单名称" v-model:value="newList.title"/>
        </a-modal>
        <div class="small-title">清单
          <span @click="showAddList()" style="float:right;padding-right: 10px"> <plus-outlined/></span>
        </div>
        <div>
          <a-empty v-if="displayLists.length===0" :image="simpleImage"/>
          <VueCustomScrollbars :settings="settings" style="position:relative;height: calc(100vh - 167px)">
            <ListList :data="displayLists"></ListList>
          </VueCustomScrollbars>
        </div>
      </a-layout-sider>

      <div class="main-content" v-show="config.menuState===MenuState.UN_FOLD" style="">
        <div class="middle-title">
          <span v-if="!activeList">
            全部待办
          </span>
          <span v-else>
            {{activeList.title}}
          </span>
          <a-dropdown :trigger="['click']"><span class="hover-action"
                                                 style="float:right;font-size: 18px;cursor: pointer;color: #666"><ellipsis-outlined/></span>
            <template #overlay>
              <a-menu>
                <a-menu-item v-if="!config.showComplete" @click="showCompleted" key="showCompleted">显示已完成</a-menu-item>
                <a-menu-item v-else @click="hideCompleted" key="hideCompleted">隐藏已完成</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <a-dropdown :trigger="['click']">
            <span style="float:right;font-size: 18px;cursor: pointer;margin-right: 5px;color: #666">
             <span class="hover-action"
                   style="display: inline-block;margin-right: 5px;vertical-align: middle;margin-top: -5px">
               <swap-left-outlined
                 style="transform: rotate(270deg) ;font-size: 12px;margin-right: -3px"/><clock-circle-outlined
                 style="font-size: 12px"/></span>
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="setSort(activeList,sortType.TIME)" key="time">
                  <clock-circle-outlined/>
                  时间排序
                </a-menu-item>
                <a-menu-item @click="setSort(activeList,sortType.TITLE)" key="title">
                  <sort-ascending-outlined/>
                  标题排序
                </a-menu-item>
                <a-menu-item @click="setSort(activeList,sortType.LIST)" key="list">
                  <ordered-list-outlined/>
                  清单排序
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <div style="margin-top: 5px;margin-bottom: 5px">
          <TaskInput></TaskInput>
        </div>
        <VueCustomScrollbars :settings="settings" style="position:relative;height: calc(100vh - 67px)">
          <TaskList :data="displayList"></TaskList>
        </VueCustomScrollbars>
      </div>
      <div theme="light"
           style="min-width: auto !important;flex: auto !important;max-width: 999999px !important;width: auto !important; padding-top: 10px;padding-left: 10px;padding-right: 10px;border-left: 1px solid #e1e1e1">
        <ActiveTaskDetail @addList="showAddList"></ActiveTaskDetail>
      </div>
      <div>

      </div>
      <!--      <a-layout-footer>footer</a-layout-footer>-->
    </a-layout>

  </a-config-provider>
</template>
<style>
body {
  user-select: none;
  overflow: hidden;
}

</style>
<style lang="scss">
.nav-items {
  list-style: none;
  padding-left: 0;
  margin-top: 5px;

  li {
    .nav-wrapper {
      padding: 5px 10px;
      margin-left: 5px;
      margin-right: 5px;
      margin-bottom: 2px;
      border-radius: 3px;
    }

    &.active, &:hover {
      .nav-wrapper {
        background: white;
      }
    }

    font-size: 13px;
  }
}

.full-modal {
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

.small-title {
  font-size: 12px;
  padding-left: 10px;
  color: grey;
}

.middle-title {
  font-size: 13px;
  color: grey;
}

.sidebar {
  background: rgba(238, 233, 233, 0.27);

}
</style>
