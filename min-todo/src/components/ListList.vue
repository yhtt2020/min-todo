<script lang="ts">
import {ListInfoInterface} from "../interfaces";
import dayjs from "dayjs";
import {mapActions, mapState} from "pinia";
import {listStore} from "../stores/list";

export default {
  name: 'ListList',
  props: {
    data: [] as ListInfoInterface[]
  },
  data(){
    return {
      ellipsis:{
        rows:1,
      }
    }
  },
  computed:{
    ...mapState(listStore,['activeList'])
  },
  methods: {
    ...mapActions(listStore, {
      removeList:'remove'
    }),
  }

}
</script>

<template>
  <ul class="nav-items">
    <a-dropdown :trigger="['contextmenu']" v-for="list in data">
    <li :title="list.name" :class="{'active':list===activeList}" @click="setActiveList(list)" >
      <div class="nav-wrapper">
        <div style="display: flex">
          <div style="min-width: 22px">
            <a-avatar :size="18" shape="square" ></a-avatar>
          </div>
          <div  style="flex: auto;text-wrap: normal;word-break: break-all;width: 0" >
            <div :class="{'completed':list.completed}" style="word-break: break-all;text-overflow:ellipsis;overflow:hidden;white-space: nowrap;">
             <span
             >{{list.name}}</span>
            </div>
          </div>
        </div>
      </div>

    </li>
      <template #overlay>
        <a-menu>
          <a-menu-item  @click="removeList(list.nanoid)">删除</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </ul>
</template>
<style scoped lang="scss">
.nav-items{
  font-size: 12px;
  .nav-wrapper{
    padding-bottom: 2px;
    padding-top: 2px;
    padding-left: 3px;
    padding-right:3px;
  }
}

</style>
