import {defineStore} from "pinia";
import {TaskInfoInterface as TaskInfo} from './interfaces'
import {nanoid} from 'nanoid'
import _ from 'lodash-es'
import {DataSourceTypes,MenuState} from './consts'
import {Menu} from "ant-design-vue";
export const databaseStore = defineStore('database', {
    state: () => {
        return {
            database: {
                tasks: [] as TaskInfo[],
                config:{

                },
            }
        }
    },
    actions: {
        async getFromDataSource(){
            if(configStore().dataSourceType===DataSourceTypes.LOCAL_STORAGE)
           return JSON.parse(<string>localStorage.getItem('database'))
        },
        async saveToDataSource(){
            if(configStore().dataSourceType===DataSourceTypes.LOCAL_STORAGE) {
                localStorage.setItem('database', JSON.stringify(this.database))
                console.info('saved to localstorage')
            }
        },
        async init() {
            try {
                this.database = await this.getFromDataSource()
                if(this.database===null){
                    this.database={
                        tasks:[],
                        config:{},
                    }
                }
                this.loadTasks()
                this.loadConfigs()
            } catch (e) {
                console.warn(e)
                return false
            }
        },
        async loadTablesObject(tableName:any){
            let data
            if (typeof this.database[tableName] === 'undefined') {
                this.database[tableName]={}
            }
            data= this.database[tableName]
            return data
        },
        async loadConfigs(){
            await this.loadTablesObject('config')
            configStore().config =this.database.config
        },
        async loadTasks() {
            if (typeof this.database.tasks === 'undefined') {
                this.database.tasks = []
                taskStore().tasks = []
            } else {
                taskStore().tasks = this.database.tasks
            }
        },
        async save(){
            this.saveToDataSource()
        }
    }
})
export const taskStore = defineStore('task', {
    state: () => {
        return {
            tasks: [] as TaskInfo[],
            currentTasks: [] as TaskInfo[],
            activeTask:<TaskInfo>{}
        }
    },
    actions: {
        addTask(task:TaskInfo){
            let newTask=_.cloneDeep(Object.assign(task,{
                nanoid:nanoid(6),
                createTime:Date.now()
            }))
            this.tasks.push(newTask)
        },
        setActiveTask(task:TaskInfo){
            this.activeTask=task
            console.log(task)
        },
        removeTask(nanoid){
          this.tasks.splice(this.tasks.findIndex(task=>task.nanoid===nanoid),1)
        }
    }

})


export const configStore = defineStore('config', {
    state: () => {
        return {
            dataSourceType: DataSourceTypes.LOCAL_STORAGE, //cloud
            config:{
                menuState:MenuState.FOLD
            },
        }
    },
    actions:{
        toggleMenu(){
            if( typeof this.config.menuState ==='undefined'){
                this.config.menuState=MenuState.FOLD
            }
            this.config.menuState=this.config.menuState===MenuState.FOLD?MenuState.UN_FOLD:MenuState.FOLD
            console.log(this.config.menuState)
        }
    }
})

