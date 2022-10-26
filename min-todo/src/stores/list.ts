import {defineStore} from "pinia";
import {ListInfoInterface as ListInfo, TaskInfoInterface as TaskInfo} from "../interfaces";
import {nanoid} from "nanoid";
import _ from "lodash-es";

export const  listStore=defineStore('list',{
    state: ()=>{
        return {
            lists:[] as ListInfo[],
            activeList:<ListInfo>{}
        }
    },
    actions:{
        add(item: ListInfo) {
            let newTask = _.cloneDeep(Object.assign(item, {
                nanoid: nanoid(6),
                createTime: Date.now()
            }))
            this.lists.push(newTask)
        },
        remove(nanoid){
            if (this.activeList.nanoid === nanoid) {
                this.activeList={}
            }
            this.lists.splice(this.lists.findIndex(list => list.nanoid === nanoid), 1)
        }
    }
})
