<template>
    <div class="smt-plugins" id="smt-plugins">
        <div v-for="(component,index)  in componentList" :key="index" :class="getClass(index)">
            <component
                    v-if="component.type==='vue'"
                    :is="component.name"
                    :points="[3,5,2,5,4]"
                    :width="400"
                    :height="200"
            ></component>
            <template v-else>
                {{createComponent(component)}}
            </template>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import {initGlobalState} from "./utlis/globalState"
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
        // 有key，表示取globalState下的某个子级对象
        // 无key，表示取全部

        return key ? initialState[key] : initialState
    }

    export default {
        name: "smt-plugins",
        data() {
            return {}
        },
        props: {
            componentList: {
                type: Array,
                default: () => []
            },
        },
        methods: {
            getClass(index) {
                return `smt-plugins__${index}`
            },
            createComponent(component) {
                if (component.isRender) {
                    return
                }
                let div = this.createDiv()
                let dom = document.querySelector(".smt-plugins")
                dom.appendChild(div)
                if (component.type === "react") {
                    this.createReact(component.component, div)
                } else {
                    this.createJq(component.component, div)
                }
                component.isRender = true
                return
            },
            createReact(component, div) {
                let React = window.React
                let ReactDOM = window.ReactDOM;
                ReactDOM.render(React.createElement(component), div);
            },
            createJq(component, div) {
                new component({
                    dom: div,
                    actions
                })
            },
            createDiv(width = "500px", height = "500px") {
                let div = document.createElement('div')
                div.style.width = width
                div.style.height = height
                return div
            }

        },

    }
</script>
