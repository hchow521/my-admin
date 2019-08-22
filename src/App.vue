<template>
    <div id="app">
        <transition name="el-fade-in-linear">
            <router-view/>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        height: 100%;
    }
</style>
