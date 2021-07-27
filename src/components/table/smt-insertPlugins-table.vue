<template>
    <div class="smt-insertPlugins-table">
        <div>可插入组件列表</div>
        <el-table
                :data="plugins"
                style="width:100%">
            <el-table-column
                    prop="name"
                    label="组件名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="src"
                    label="组件链接"
                    width="280">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="组件标题">
            </el-table-column>
            <el-table-column
                    label="可插入组件">
                <template slot-scope="scope">
                    <el-button size="small" @click="insertComponent(scope.row)">插入组件</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "smt-insertPlugins-table",
        data() {
            return {
            }
        },
        props: {
            plugins: {
                type: Array,
                default: () => []
            }
        },
    methods: {
        insertComponent(component) {
            this.$emit("insert",component)
        }
    },
    }
</script>
