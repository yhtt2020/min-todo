import {defineStore} from "pinia";
import {TaskInfoInterface as TaskInfo} from './interfaces'
import {nanoid} from 'nanoid'
import _ from 'lodash-es'
export const databaseStore = defineStore('database', {
    state: () => {
        return {
            database: {
                tasks: [] as TaskInfo[]
            }
        }
    },
    actions: {
        async getFromDataSource(){
            if(configStore().dataSourceType===DataSourceTypes.LOCAL_STORAGE)
           return JSON.parse(<string>localStorage.getItem('database'))
        },
        async init() {
            try {
                this.database = await this.getFromDataSource()
                if(this.database===null){
                    this.database={
                        tasks:[]
                    }
                }
                this.loadTasks()
            } catch (e) {
                console.warn(e)
                return false
            }
        },
        async loadTasks() {
            if (typeof this.database.tasks === 'undefined') {
                this.database.tasks = []
                useStore().tasks = []
            } else {
                useStore().tasks = this.database.tasks
            }
        }
    }
})
export const useStore = defineStore('task', {
    state: () => {
        return {
            tasks: [] as TaskInfo[],
            currentTasks: [] as TaskInfo[],
        }
    },
    actions: {
        addTask(task:TaskInfo){
            let newTask=_.cloneDeep(task,{
                nanoid:nanoid(6)
            })
            this.tasks.push(newTask)
        }
    }
})
const DataSourceTypes={
    LOCAL_STORAGE:'localStorage'
}



export const configStore = defineStore('config', {
    state: () => {
        return {
            dataSourceType: DataSourceTypes.LOCAL_STORAGE //cloud
        }
    }
})

