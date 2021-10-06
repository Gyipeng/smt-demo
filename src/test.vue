<template>
    <div>5455451221</div>
</template>
<script>
    import myMxinin from  "./minxins/myMxinin"
    import  Vue from  "vue"
    export default {
        name: "test",
        data() {
            return {

            }
        },
        // mixins:[myMxinin],
        mounted(){
            console.log(Vue);
            console.log(myMxinin);
            console.log(this.name);
            console.log(this);
        },
    }
</script>

