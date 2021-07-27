<template>
  <div id="app">
    <smt-home></smt-home>
  </div>
</template>

<script>
import smtHome from './index.vue'
export default {
  name: 'App',
  components: {
      smtHome
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
