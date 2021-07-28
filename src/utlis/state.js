import Vue from 'vue'
import {initGlobalState} from "./globalState"
const initialState = Vue.observable({
    user: {
        name: 'zhangsan'
    }
})
const actions = initGlobalState(initialState)

actions.onGlobalStateChange((newState, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('main change', JSON.stringify(newState), JSON.stringify(prev))

    for (const key in newState) {
        initialState[key] = newState[key]
    }
})

// 定义一个获取state的方法下发到子应用
actions.getGlobalState = (key) => {
    return key ? initialState[key] : initialState
}

export {
    actions
}