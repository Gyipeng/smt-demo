/**
* hello on 2021/9/8
**/
<template>
    <div>
        1235544{{name}}
    </div>
</template>

<script>
    export default {
        name: "demo",
        data() {
        },
        created(){
            console.log(this.name,"demo");
        },
        computed: {
            name() {
                /* eslint-disable */
                console.log(this);
                return 123
            }
        },
    }
</script>
