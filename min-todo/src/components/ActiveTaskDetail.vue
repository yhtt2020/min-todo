<template>
  <a-empty style="margin-top: calc( 100vh / 2 - 90px )" v-if="!activeTask" description="点击代办查看详情">
  </a-empty>
  <template v-else>
    <div><span class="title-action"><menu-unfold-outlined /></span> <a-checkbox></a-checkbox>
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
        <a-textarea placeholder="描述" :bordered="false" :autosize="false">
          {{activeTask.description}}
        </a-textarea>
      </div>
    </div>
  </template>
</template>

<script>
import {mapState} from "pinia";
import {useStore} from "../store";
import {AlertOutlined,CalendarOutlined,UserOutlined,TeamOutlined,
  MenuUnfoldOutlined,ToTopOutlined,MoreOutlined} from '@ant-design/icons-vue'
export default {
  name: "TaskDetail",
  components:{
    AlertOutlined,CalendarOutlined,UserOutlined,TeamOutlined,
    MenuUnfoldOutlined,ToTopOutlined,MoreOutlined
  },
  computed:{
    ...mapState(useStore,['activeTask','currentTasks','tasks'])
  },
}
</script>

<style scoped>
.extra-actions{
  float:right;

}
</style>
