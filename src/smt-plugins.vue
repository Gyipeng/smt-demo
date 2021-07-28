<template>
    <div class="smt-plugins" id="smt-plugins">
        <div v-for="(component,index)  in componentList" :key="index" :class="getClass(index)">
            <component
                    v-if="component.type==='vue'"
                    :is="component.name"
                    v-bind="chartData"
            ></component>
            <template v-else>
                {{createComponent(component)}}
            </template>
        </div>

    </div>
</template>

<script>
    import Bus from "./utlis/bus"
    import {actions} from "./utlis/state"

    export default {
        name: "smt-plugins",
        data() {
            return {
                componentInstanceList: [],
                chartData: {
                    points: [3, 5, 2, 5, 4],
                    width: 400,
                    height: 200,
                }
            }
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
                let componentInstance = null
                if (component.type === "react") {
                    componentInstance = this.createReact(component.component, div)
                } else {
                    componentInstance = this.createJq(component.component, div)
                }
                this.componentInstanceList.push(componentInstance)
                component.isRender = true
                return
            },
            createReact(component, div) {
                let React = window.React
                let ReactDOM = window.ReactDOM;
                return ReactDOM.render(React.createElement(component, {
                    data: [
                        {type: '未知', value: 654, percent: 0.02},
                        {type: '17 岁以下', value: 654, percent: 0.02},
                        {type: '18-24 岁', value: 4400, percent: 0.2},
                        {type: '25-29 岁', value: 5300, percent: 0.24},
                        {type: '30-39 岁', value: 6200, percent: 0.28},
                        {type: '40-49 岁', value: 3300, percent: 0.14},
                        {type: '50 岁以上', value: 1500, percent: 0.06},
                    ],
                    Bus,
                    actions
                }), div);
            },
            createJq(component, div) {
                return new component({
                    dom: div,
                    Bus,
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
        mounted() {
            Bus.$on('message', (e) => {
                this.chartData = {
                    points: [4, 6, 9, 2, 8],
                    width: 500,
                    height: 300,
                }
                console.log(e);
            })
        },
        watch: {
            componentList() { //获取组件实例
                this.$nextTick(() => {
                    const componentInstanceList = this.componentInstanceList.concat(this.$children);
                    let componentTemps = {};
                    this.componentInstanceList = componentInstanceList.reduce((prev, cur) => {
                        if (cur._uid) {
                            componentTemps[cur._uid] ? '' : componentTemps[cur._uid] = true && prev.push(cur);
                        } else {
                            prev.push(cur)
                        }
                        return prev
                    }, []);
                })

            }
        }

    }
</script>
