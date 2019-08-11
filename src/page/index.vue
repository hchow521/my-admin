<template>
    <div class="index">
        <img src="../assets/logo.png" alt="">
        <h2>{{welcome}}</h2>
    </div>
</template>

<script>
    export default {
        name: "index",
        data () {
            return {
                welcome: '欢迎访问hchow'
            }
        }
    }
</script>

<style scoped lang="less">
    .index {
        text-align: center;
        color: #2c3e50;
        margin-top: 1rem;
        h2 {
            font-size: .18rem;
        }
    }
</style>