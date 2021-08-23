<template>
    <div class="smt-box">
        <el-select v-model="range" multiple placeholder="请选择" @change="handleChange">
            <el-option
                    v-for="item in ranges"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button @click="reset">重置</el-button>
        <div :class="classNames" style="width: 500px;height: 300px">
            <slot :range="range"></slot>
        </div>
    </div>
</template>

<script>
    import {actions} from "../../utlis/state"

    export default {
        name: "smt-box",
        data() {
            return {
                range: [],
                condition: {},
                state: actions.getGlobalState(),
                time: ""
            }
        },
        props: {
            classNames: String,
            ranges: Array,
            type: String,
            keys: String
        },
        methods: {
            handleChange() {
                this.$emit("changeRange", this.range)
            },
            reset() {
                actions.setGlobalState({
                    [this.keys]: {
                        range: [],
                    }
                })
            },
            changeNumber() {
                actions.setGlobalState({
                    system: {
                        range: [],
                    }
                })
            },
        },
        mounted() {

        },


    }
</script>
<style>
    .smt-box {
        border: 1px solid black;
        box-sizing: border-box;
        padding: 20px;
        margin: 20px;

    }
</style>

