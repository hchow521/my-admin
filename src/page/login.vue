<template>
    <div class="login">
        <img src="../assets/logo.png" alt="">
        <h2>{{welcome}}</h2>
        <el-form class="inputBox" :model="loginForm" ref="loginForm" :rules="rules" label-width="70px" label-position="left">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名" @keyup.enter.native="login"
                          :autofocus="true" :clearable="true" prefix-icon="el-icon-user"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="userpsw">
                <el-input type="password" v-model="loginForm.userpsw" placeholder="请输入登陆密码" @keyup.enter.native="login"
                          :clearable="true" :show-password="true" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-button type="primary" v-loading.fullscreen.lock="logining" @click="login">登陆</el-button>
        </el-form>
    </div>
</template>

<script>
  import secret from '@/utils/secret'

  export default {
    name: "index",
    data() {
      return {
        welcome: '欢迎访问Hchow后台管理，请先登陆',
        loginForm: {
          username: 'hchow',
          userpsw: '123456'
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          userpsw: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
        },
        logining: false,
      }
    },
    mounted() {
    },
    methods: {
      login() {
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            let password = secret.set(this.loginForm.userpsw);
            let req = {
              username: this.loginForm.username,
              password: password
            }
            this.logining = true;
            this.$http.post('/login', req).then(res => {
              this.logining = false;
              if (!res.data.state) {
                this.$message.error(res.data);
              } else {
                let data = res.data.data;
                this.$message.success(`欢迎登陆 ${data.username}先生`);
                this.$store.commit('login',data)
                this.$router.replace('/index');
              }
            })
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped lang="less">
    .login {
        text-align: center;
        color: #2c3e50;
        position: relative;
        top: 100px;
        h2，h3 {
            font-size: .18rem;
        }

        .inputBox {
            width: 300px;
            margin: 0 auto;
        }
    }
</style>