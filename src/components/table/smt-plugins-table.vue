<template>
    <div class="smt-plugins-table">
        <div>已完成加载组件列表</div>
        <el-table
                :data="plugins"
                style="width:100%;margin-bottom: 50px">
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
                    label="组件缩略图">
                <template slot-scope="scope">
                    <img width="100px" :src="scope.row.img" alt="">
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "smt-plugins-table",
        data() {
            return {}
        },
        props: {
            plugins: {
                type: Array,
                default: () => []
            }
        }
    }
</script>

