<script  lang="ts">
import {TaskInfoInterface} from "../interfaces";
import dayjs from "dayjs";

export default {
  name:'TaskList',
  props:{
    data:[] as TaskInfoInterface[]
  },
  methods:{
    getDistance(deadTime){
      let now= dayjs().unix()
      let distance=deadTime-now
      let displayText=''
      function distanceToText(distance:number){
        let displayText=''
        if(distance>31536000){
          displayText= String(Math.floor(distance / 31536000)) +'年'
        }
        else if(distance>86400){
          displayText= String(Math.floor(distance / 86400)) +'天'
        }else if(distance>3600){
          displayText=String(Math.floor(distance / 3600) +'小时')
        }else if(distance>60){
          displayText=String(Math.floor(distance / 60) +'分钟')
        }
        return displayText
      }
      if(distance>0){
        displayText=distanceToText(distance)
      }else{
        displayText='已过期' + distanceToText(-distance)
      }
      return displayText
    }
  }

}
</script>

<template>
  <ul class="task-list">
    <li v-for="task in data">
      <a-checkbox></a-checkbox>&nbsp;{{task.title}} <span class="dead-time" v-if="task.deadTime">{{getDistance(task.deadTime)}}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.dead-time{
  color: #999;
  float:right;
  font-size: 12px;
}

.task-list{

  list-style: none;
  padding-left: 0;
  li{
    &:hover,.active{
      background: rgba(30, 30, 231, 0.26);
    }
    border-bottom: 1px solid #f1f1f1;
    line-height: 28px;
    padding-left: 3px;
    padding-right: 3px;
  }
}
</style>
