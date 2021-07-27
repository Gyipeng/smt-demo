<template>
    <div class="smt-home" style="padding: 24px">
        <el-col :span="12">
            <smt-load-plugin :plugins="plugins" @loadComplete="isLoad=true"></smt-load-plugin>
            <smt-plugins-table v-if="isLoad" :plugins="plugins"></smt-plugins-table>
            <smt-insert-plugins-table v-if="isLoad" :plugins="plugins"
                                      @insert="insertComponents"></smt-insert-plugins-table>
        </el-col>
        <el-col :span="12">
            <smt-plugins :componentList="componentList"></smt-plugins>
        </el-col>

    </div>
</template>

<script>
    import SmtLoadPlugin from './smt-loadPlugin.vue';
    import SmtPlugins from './smt-plugins.vue';
    import {SmtInsertPluginsTable, SmtPluginsTable} from './components/table';
    import {deepClone} from "./utlis/utils"
    let plugins = [
        {
        type:"vue",
        name: "my-chart",
        src: "http://localhost:3200/dist/my-chart.js",
        title: "柱图",
        tip: "柱图",
        img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        },
        {
            type:"vue",
            name: "pure-vue-chart",
            src: "https://cdn.jsdelivr.net/npm/pure-vue-chart/dist/pure-vue-chart.umd.js",
            title: "柱图",
            tip: "柱图",
            img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        },
        {
            type:"react",
            name: "smt-react",
            src: "http://localhost:3200/dist/smt-react.js",
            title: "柱图",
            tip: "柱图",
            img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        },
        {
            type:"jq",
            name: "smt-jq",
            src: "http://localhost:3200/dist/smt-jq.js",
            title: "柱图",
            tip: "柱图",
            img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        },


    ]
    export default {
        name: "index",
        components: {
            SmtLoadPlugin,
            SmtPlugins,
            SmtInsertPluginsTable,
            SmtPluginsTable
        },
        data() {
            return {
                componentList: [],
                plugins: plugins,
                isLoad: false
            }
        },
        methods: {
            insertComponents(component) {
                let newComponent=deepClone(component)
                this.componentList.push(newComponent)
            }
        },
    }
</script>
