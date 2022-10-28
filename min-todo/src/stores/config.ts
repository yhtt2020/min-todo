import {defineStore} from "pinia";
import {DataSourceTypes, MenuState} from "../consts";

export const configStore = defineStore('config', {
    state: () => {
        return {
            dataSourceType: DataSourceTypes.LOCAL_STORAGE, //cloud
            config: {
                menuState: MenuState.FOLD,
                showComplete:false,
            },
        }
    },
    actions: {
        toggleMenu() {
            if (typeof this.config.menuState === 'undefined') {
                this.config.menuState = MenuState.FOLD
            }
            this.config.menuState = this.config.menuState === MenuState.FOLD ? MenuState.UN_FOLD : MenuState.FOLD
            console.log(this.config.menuState)
        },
        showCompleted(){
            this.config.showComplete=true
        },
        hideCompleted(){
            this.config.showComplete=false
        },

    }
})
