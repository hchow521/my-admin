<template>
    <div class="main">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统信息</span>
            </div>
            <div v-for="(item, key, index) of systemInfo" :key="index" class="text item">
                <template v-if="typeof item == 'object'">
                    <p>{{key}}：</p>
                    <p v-for="(value, key, index) of item" :key="index">{{value.model}}  {{value.speed}}</p>

                </template>
                <template v-else>
                    <p>{{key}}：  {{item}}</p>
                </template>
            </div>
        </el-card>
    </div>
</template>

<script>
  export default {
    name: "systemInfo",
    data() {
      return {
        systemInfo: {
          '操作系统': 'win10'
        }
      }
    },
    created() {
      this.$http.get('/getinfo').then(res => {
        this.$message.success((res.data.msg));
        this.systemInfo = res.data.data;
      })
    }
  }
</script>

<style scoped>
    .main {

    }
</style>