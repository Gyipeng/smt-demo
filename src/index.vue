<template>
    <div class="smt-home" style="padding: 24px">
        <el-col :span="12">
            <smt-load-plugin :plugins="plugins" @loadComplete="isLoad=true"></smt-load-plugin>
            <smt-plugins-table v-if="isLoad" :plugins="plugins"></smt-plugins-table>
            <smt-insert-plugins-table v-if="isLoad" :plugins="plugins"
                                      @insert="insertComponents"></smt-insert-plugins-table>
        </el-col>
        <el-col :span="12">
            <div>{{state}}</div>
            <el-button @click="changeColor">改变主题颜色</el-button>
            <el-button @click="reset">重置</el-button>
            <el-select v-model="checkedList" multiple placeholder="请选择">
                <el-option
                        v-for="item in ranges"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <smt-plugins :componentList="newComponentList" :ranges="ranges"
                         @changeNumber="changeNumber"></smt-plugins>
        </el-col>

    </div>
</template>

<script>
    import SmtLoadPlugin from './smt-loadPlugin.vue';
    import SmtPlugins from './smt-plugins.vue';
    import {SmtInsertPluginsTable, SmtPluginsTable} from './components/table';
    import {deepClone} from "./utlis/utils"
    import {actions} from "./utlis/state"

    let dataset = [
        {
            name: '苹果',
            value: 722,
            category: 0
        }, {
            name: '土豆',
            value: 84,
            category: 1
        }, {
            name: '西蓝花',
            value: 74,
            category: 1
        }, {
            name: '大米',
            value: 673,
            category: 2
        }, {
            name: '盐',
            value: 628,
            category: 3
        }, {
            name: '啤酒',
            value: 707,
            category: 4
        }, {
            name: '红酒',
            value: 507,
            category: 4
        }, {
            name: '炸鸡',
            value: 710,
            category: 5
        }, {
            name: '牛排',
            value: 610,
            category: 5
        }]
    let pieOption = {
        title: {
            text: '农产品',
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '农产品',
                type: 'pie',
                radius: '50%',
                data: JSON.parse(JSON.stringify(dataset)),
                itemStyle: {
                    color: "green"
                }
            }
        ]
    };
    let plugins = [
        {
            type: "vue",
            name: "my-chart",
            src: "http://localhost:3200/dist/my-chart.js",
            title: "柱图",
            tip: "柱图",
            img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        },
        {
            type: "react",
            name: "smt-react",
            src: "http://localhost:3200/dist/smt-react.js",
            title: "柱图",
            tip: "柱图",
            img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        },
        {
            type: "jq",
            name: "smt-jq",
            src: "http://localhost:3200/dist/smt-jq.js",
            title: "柱图",
            tip: "柱图",
            img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        },
        // {
        //     type: "index",
        //     name: "smt-jq",
        //     src: "http://localhost:3200/dist/index.js",
        //     title: "柱图",
        //     tip: "柱图",
        //     img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        // },
    ]
    export default {
        name: "index",
        components: {
            SmtLoadPlugin,
            SmtPlugins,
            SmtInsertPluginsTable,
            SmtPluginsTable,

        },
        data() {
            return {
                componentList: [],
                plugins: plugins,
                isLoad: false,
                checkedList: [],
                options: {
                    title: {text: '测试'},
                    tooltip: {},
                    xAxis: {
                        data: ['水果', '蔬菜', '粮油', '副食', '酒水', '肉类']
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20],
                        itemStyle: {
                            color: "green"
                        }
                    }]
                },
                state: actions.getGlobalState()
            }
        },
        methods: {
            insertComponents(component) {
                component.key = `图表${this.componentList.length}`
                if (component.type === "vue") {
                    component.options = JSON.parse(JSON.stringify(this.options))
                } else {
                    component.options = JSON.parse(JSON.stringify(pieOption))
                }
                let newComponent = deepClone(component)
                this.componentList.push(newComponent)
            },
            changeColor() {
                this.componentList = this.componentList.map((item) => {
                    if (this.checkedList.includes(item.key)) {
                        item.options.series[0].itemStyle.color = "red"
                    }
                    // else {
                    //     item.options = JSON.parse(JSON.stringify(this.options))
                    //     if (item.type !== "vue") {
                    //         item.options = JSON.parse(JSON.stringify(pieOption))
                    //     }
                    // }
                    return item
                })
            },
            reset() {
                this.componentList = this.componentList.map((item) => {
                    if (item.type !== "vue") {
                        item.options = JSON.parse(JSON.stringify(pieOption))
                    } else {
                        item.options = JSON.parse(JSON.stringify(this.options))
                    }
                    return item
                })
            },
            changeNumber() {

            },
            conditionFilter(item, condition, range) {
                if (condition === "" || !range || range.length === 0) {
                    if (item.type !== "vue") {
                        item.options = JSON.parse(JSON.stringify(pieOption))
                    }
                    return item
                }
                if (range.includes(item.key)) {
                    item.options.series[0].data = dataset.filter(item => item.category == condition)
                }
                return item
            },
            numberFilter(item, number,range) {
                if (!range.includes(item.key)) {
                    return item
                }
                let datas = JSON.parse(JSON.stringify(item.options.series[0].data))
                item.options.series[0].data = datas.map(data => {
                    if (typeof data === "object") {
                        data.value = data.value + number
                    } else {
                        data += number
                    }
                    return data
                })
                return item
            }
        },
        computed: {
            ranges() {
                return this.componentList.map((item, index) => {
                    return {label: `图表${index}`, value: `图表${index}`}
                });
            },
            newComponentList() {
                return this.componentList.map(item => {
                    for (let key in this.state) {
                        let {condition, range, number} = this.state[key]
                        if (Object.prototype.hasOwnProperty.call(this.state[key], "condition")) {
                            item = this.conditionFilter(item, condition, range)
                        }
                        if (Object.prototype.hasOwnProperty.call(this.state[key], "number")) {
                            item = this.numberFilter(item, number, range)
                        }else {
                            // if (item.type !== "vue") {
                            //     item.options = JSON.parse(JSON.stringify(pieOption))
                            // }else {
                            //     item.options = JSON.parse(JSON.stringify(this.options))
                            // }
                        }
                    }
                    return item
                })
            }
        },
    }
</script>
