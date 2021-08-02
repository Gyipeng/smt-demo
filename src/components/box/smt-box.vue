<template>
    <div class="smt-box">
        <el-button v-if="type==='react'" @click="changeNumber(10)">增加数值</el-button>
        <el-button v-if="type==='jq'" @click="changeNumber(-10)">减少数值</el-button>

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
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Bus from "../../utlis/bus"
    import {actions} from "../../utlis/state"

    export default {
        name: "smt-box",
        data() {
            return {
                range: [],
                condition: {},
                state: actions.getGlobalState()
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
                this.setState()
                this.$emit("changeRange", this.range)
            },
            reset() {
                this.$set(this.state, this.keys, {})
                this.$emit("changeRange", [])
            },
            changeNumber(number) {
                this.$set(this.state, this.keys, {number,range:this.range})
            },
            setState() {
                let condition = this.condition[this.keys]||{}
                this.$set(condition, "range",this.range)
                this.$set(this.state, this.keys, condition)
            }
        },
        mounted() {
            Bus.$on("message", (newState) => {
                if (newState[this.keys]) {
                    this.condition = newState
                }
            })
        },
        watch: {
            condition(newVal, oldVal) {
                if (newVal === oldVal) {
                    return null
                }
                this.setState()
            },
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

