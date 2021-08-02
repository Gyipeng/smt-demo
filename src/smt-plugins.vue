<template>
    <div class="smt-plugins" id="smt-plugins">
        <smt-box v-for="(component,index)  in componentList" :key="component.key"
                 :ranges="getRanges(index)"
                 :type="component.type"
                 :keys="component.key"
                 @changeNumber="changeNumber"
                 :classNames="getClass(index)">
            <component
                    :className="getClass(index)"
                    v-if="component.type==='vue'"
                    :is="component.name"
                    :keys="component.key"
                    :options="component.options"
                    :actions="actions"
                    :Bus="Bus"
            ></component>
            <template v-else>
                {{createComponent(component,getClass(index))}}
            </template>
        </smt-box>
    </div>
</template>

<script>
    import smtBox from "./components/box/smt-box"
    import Bus from "./utlis/bus"
    import {actions} from "./utlis/state"
    export default {
        name: "smt-plugins",
        data() {
            return {
                componentInstanceList: [],
                Bus,
                actions
            }
        },
        components: {
            smtBox
        },
        props: {
            componentList: {
                type: Array,
                default: () => []
            },
            ranges: Array
        },
        computed: {
            getRanges() {
                return (index) => {
                    return this.ranges.filter((item, idx) => index !== idx)
                }
            }
        },
        methods: {
            changeNumber(item) {
                this.$emit('changeNumber', item)
            },
            getClass(index) {
                return `smt-plugins__${index}`
            },
            createComponent(component, className) {
                let div = this.createDiv()
                this.$nextTick(() => {
                    let dom = document.querySelector(`.${className}`)
                    dom.appendChild(div)
                    let componentInstance = null
                    if (component.type === "react") {
                        componentInstance = this.createReact(component, div, `.${className}`)
                    } else {
                        componentInstance = this.createJq(component, `.${className}`)
                    }
                    this.componentInstanceList.push(componentInstance)
                    return
                })

            },
            createReact(componentInstance, dom, className) {
                let {component, options: option} = componentInstance;
                let React = window.React
                let ReactDOM = window.ReactDOM;
                return ReactDOM.render(React.createElement(component, {
                    option,
                    Bus,
                    actions,
                    className

                }), dom);
            },
            createJq(componentInstance, className) {
                let {component,options: option} = componentInstance;
                return new component({
                    Bus,
                    option,
                    actions,
                    className
                })
            },
            createDiv() {
                return document.createElement('div')
            }
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
        },
    }
</script>
