<template>
    <div class="smt-home" style="padding: 24px">
        <el-col :span="12">
            <smt-load-plugin :plugins="plugins" @loadComplete="isLoad=true"></smt-load-plugin>
            <smt-plugins-table v-if="isLoad" :plugins="plugins"></smt-plugins-table>
            <smt-insert-plugins-table v-if="isLoad" :plugins="plugins"
                                      @insert="insertComponents"></smt-insert-plugins-table>
        </el-col>
        <el-col :span="12">
            <div ref="test"></div>
            <el-button @click="provideMenuItems">触发菜单</el-button>
            <!--<div>{{state}}</div>-->
            <!--<el-button @click="changeColor">改变主题颜色</el-button>-->
            <!--<el-button @click="reset">重置</el-button>-->
            <!--<el-select v-model="checkedList" multiple placeholder="请选择">-->
                <!--<el-option-->
                        <!--v-for="item in ranges"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                <!--</el-option>-->
            <!--</el-select>-->
            <smt-plugins :componentList="componentList" :ranges="ranges"
                        ></smt-plugins>
        </el-col>

    </div>
</template>

<script>
    import SmtLoadPlugin from './smt-loadPlugin.vue';
    import SmtPlugins from './smt-plugins.vue';
    import {SmtInsertPluginsTable, SmtPluginsTable} from './components/table';
    import {deepClone} from "./utlis/utils"
    import {actions} from "./utlis/state"
    import {https} from "./utlis/http"
<<<<<<< HEAD
    import myMixin from "./minxins/myMxinin"
    import Vue from 'vue'
    import  demo  from "./demo"
=======
>>>>>>> d873ce5a81ea427877ac04ec39ba9dbe18d07f59

    let dataset = [
        {
            name: '苹果',
            value: 722,
            category: 0,
            time:""
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
        data: dataset,
    };
    let plugins = [
        // {
        //     type: "vue",
        //     name: "my-chart",
        //     src: "http://localhost:3200/dist/my-chart.js",
        //     title: "柱图",
        //     tip: "柱图",
        //     img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        // },
        // {
        //     type: "react",
        //     name: "smt-react",
        //     src: "http://localhost:3200/dist/smt-react.js",
        //     title: "柱图",
        //     tip: "柱图",
        //     img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        // },
        // {
        //     type: "jq",
        //     name: "smt-jq",
        //     src: "http://localhost:3200/dist/smt-jq.js",
        //     title: "柱图",
        //     tip: "柱图",
        //     img: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
        // },
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
<<<<<<< HEAD
=======

>>>>>>> d873ce5a81ea427877ac04ec39ba9dbe18d07f59
        },
        data() {
            return {
                componentList: [],
                plugins: plugins,
                isLoad: false,
                checkedList: [],
                options: {
                    data: [{
                        name: '水果',
                        value: 50,
                        category: 0
                    }, {
                        name: '蔬菜',
                        value: 200,
                        category: 1
                    }, {
                        name: '粮油',
                        value: 360,
                        category: 2
                    }, {
                        name: '副食',
                        value: 100,
                        category: 3
                    }, {
                        name: '酒水',
                        value: 100,
                        category: 4
                    }, {
                        name: '肉类',
                        value: 200,
                        category: 5
                    }
                    ]
                },
<<<<<<< HEAD
                regComponents:[],
                menus:[]
            }
        },
        mixins:[myMixin],
=======
            }
        },
>>>>>>> d873ce5a81ea427877ac04ec39ba9dbe18d07f59
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
                actions.setGlobalState({
                    system: {
                        range: this.checkedList,
                        itemStyle: {
                            color: "red"
                        }
                    }
                })
            },
            reset() {
                actions.setGlobalState({
                    system: {
                        range: [],
                    }
                })
<<<<<<< HEAD
            },
            registerComponent() {
                return import("./test").then(component => {
                    console.log(demo);
                    // console.log(component);
                    // Object.assign(component.default,myMixin)

                    component.default.mixins=[demo]
                    console.log(component,Vue);

                    return Vue.extend(component.default);
                });
            },
            init(onInit) {
                this.registerComponent().then(Component => {
                    let component=new Component({
                        propsData:{pageProxy:this}
                    })
                    // console.log(Component);
                    this.regComponents.push(component)
                    component.$mount(this.$refs.test);
                    onInit()
                });
            },
            onInit(){
                this.regComponents.forEach(item=>{
                    item.onInit&&item.onInit()
                })
            },
            provideMenuItems(){
                //获取到某一个特定滴组件
                let component=this.regComponents[0]
                let menus=dataset
                let fn= component.provideMenuItems
                if (fn){
                    let newMenus =component.provideMenuItems(menus)
                    this.menus.push(...newMenus)
                }

=======
>>>>>>> d873ce5a81ea427877ac04ec39ba9dbe18d07f59
            }
        },
        computed: {
            ranges() {
                return this.componentList.map((item, index) => {
                    return {label: `图表${index}`, value: `图表${index}`}
                });
            },
            state() {
                return actions.getGlobalState()
            }
        },
       async created(){
<<<<<<< HEAD
           console.log(this);
           await this.init(this.onInit)
           let {data:{list}}=  await https.get("http://localhost:3200/file/getList")
=======
         let {data:{list}}=  await https.get("http://localhost:3200/file/getList")
>>>>>>> d873ce5a81ea427877ac04ec39ba9dbe18d07f59
           this.plugins=list
       }
    }
</script>
