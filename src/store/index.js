import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//导出store
export default new Vuex.Store({
    state:{
        hasLogin:false
    },
    mutations:{
        hasLogin(state){
            alert("hasLogin");
            state.hasLogin=true
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