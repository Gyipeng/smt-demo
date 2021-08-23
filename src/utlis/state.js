import Vue from 'vue'
import {initGlobalState} from "./globalState"

// let demo1 = {
//     "发出事件的组件Key": {"筛选条件": 1, "范围": ["图表2", "图表1"]}
// }
// let demo2={
//     "受影响的组件":{
//         "筛选条件":[]
//     }
// }


const initialState = Vue.observable({
    "图表0": {
        condition: {}, range: ["图表2", "图表1"]
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