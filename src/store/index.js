import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//导出store
export default new Vuex.Store({
    state:{
        accessToken:window.sessionStorage.getItem("operationToken")? JSON.parse(window.sessionStorage.getItem("operationToken")) : null,
        defualtKeyFromVuex:window.sessionStorage.getItem("alarmStrageSelectedKey")? JSON.parse(window.sessionStorage.getItem("alarmStrageSelectedKey"))['key'] : '1',
    },
    mutations:{
        hasLogin(state){
            alert("hasLogin");
            state.hasLogin=true
        },
        changeDefualtKey(state,key){
            console.log('vuex',key)
            window.sessionStorage.setItem('alarmStrageSelectedKey',JSON.stringify({key}))
        }
    },
    actions:{
        asyncHasLogin(store){
            alert("async")
                store.commit("hasLogin")
        }
    },
    getters: {
        ifLogin(){
            return window.sessionStorage.getItem("operationToken")===null
        }
    },
})