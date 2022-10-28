import {defineStore} from "pinia";
import {TaskInfoInterface as TaskInfo} from "../interfaces";
import {nanoid} from "nanoid";
import _ from 'lodash-es'
export const taskStore = defineStore('task', {
    state: () => {
        return {
            tasks: [] as TaskInfo[],
            currentTasks: [] as TaskInfo[],
            activeTask: <TaskInfo>{}
        }
    },
    actions: {
        add(item: TaskInfo) {
            if(item.title.trim()===''){
                return false
            }
            let newTask = _.cloneDeep(Object.assign(item, {
                nanoid: nanoid(6),
                createTime: Date.now(),
                description:'',
                descriptionType:'text'
            }))
            this.tasks.push(newTask)
        },
        setActiveTask(task: TaskInfo) {
            this.activeTask = task
            console.log(task)
        },
        removeTask(nanoid) {
            if (this.activeTask.nanoid === nanoid) {
                this.activeTask={}
            }
            this.tasks.splice(this.tasks.findIndex(task => task.nanoid === nanoid), 1)
        }
    }

})
