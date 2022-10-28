import {defineStore} from "pinia";
import {IListInfo as ListInfo, ITaskInfo as TaskInfo} from "../interfaces";
import {nanoid} from "nanoid";
// @ts-ignore
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
            if(item.title.trim()===''){
                return false
            }
            let newTask = _.cloneDeep(Object.assign(item, {
                nanoid: nanoid(6),
                createTime: Date.now()
            }))
            this.lists.push(newTask)
        },
        remove(nanoid:string){
            if (this.activeList.nanoid === nanoid) {
                this.activeList={}
            }
            this.lists.splice(this.lists.findIndex(list => list.nanoid === nanoid), 1)
        }
    }
})
