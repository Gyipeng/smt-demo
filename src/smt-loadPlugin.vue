<template>
    <div class="smt-loadPlugin">
        <el-row>
            <el-button size="small" @click="init">加载</el-button>
        </el-row>
    </div>
</template>
<script>
    import Vue from 'vue'

    export default {
        name: "smt-load-plugin",
        data() {
            return {}
        },
        props: {
            plugins: {
                type: Array,
                default: () => []
            },
        },
        methods: {
            async init() {
                let plugins = await this.loadPlugin(this.plugins)
                this.registerComponent(plugins, this.plugins)
                let newPlugins = this.receivePlugins(plugins, this.plugins)
                this.handlePluginComplete(newPlugins)
            },
            async loadPlugin(plugins) {
                let System = window.System
                let importList = plugins.map(plugin => System.import(plugin.src))
                let newPlugins = await Promise.all(importList)
                return newPlugins
            },
            registerComponent(newPlugins, plugins) {
                plugins.forEach((plugin, index) => {
                    if (plugin.type === "vue") {
                        let component = newPlugins[index]?.default?.default;
                        let name = plugin.name
                        Vue.component(name, component)
                    }
                })
            },
            handlePluginComplete(newPlugins) {
                console.log(newPlugins);
                this.$emit('loadComplete', newPlugins)
            },
            receivePlugins(newPlugins, plugins) {
                newPlugins.forEach((plugin, index) => {
                    let component = plugin?.default?.default;
                    if( plugins[index].type==="index"){
                        component = plugin?.default
                    }
                    plugins[index].component = component
                })
                return plugins
            }
        },
    }
</script>

