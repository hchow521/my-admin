<template>
    <div class="main">
        <el-form ref="addForm" :rules="rules" :model="addInfo"
                 label-width="90px" style="width: 300px; text-align: center;margin: 20px auto">
            <el-form-item prop="username" label="用户名">
                <el-input v-model="addInfo.username" placeholder="输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="userpsw" label="密码">
                <el-input type="password" v-model="addInfo.userpsw" placeholder="输入密码"
                          :clearable="true" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item prop="userpsw2" label="确定密码">
                <el-input type="password" v-model="addInfo.userpsw2" placeholder="确定密码"
                          :clearable="true" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号">
                <el-input type="phone" v-model="addInfo.phone" placeholder="用户手机号"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input type="email" v-model="addInfo.email" placeholder="E-mail地址"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-loading.fullscreen.lock="logining" @click="submit">提交</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import secret from '@/utils/secret'
  export default {
    name: "addUser",
    data () {
      let validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入新密码'));
        } else if (value.toString().length < 6 || value.toString().length > 18) {
          callback(new Error('密码长度为6 - 18个字符'))
        } else {
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addInfo.userpsw) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        addInfo: {
          username: '',
          userpsw: '',
          userpsw2: '',
          phone: '',
          email: ''
        },
        rules: {
          username: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          userpsw: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          userpsw2:[
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请填写手机号', trigger: 'blur' }
          ],
        },
        logining: false
      }
    },
    methods: {
      reset () {
        this.$refs['addForm'].resetFields();
      },
      submit () {
       this.$refs['addForm'].validate((valid) => {
         if (valid) {
           this.logining = true;
           this.$http.post('/add_user', {
             username: this.addInfo.username,
             password: secret.set(this.addInfo.userpsw),
             phone: this.addInfo.phone,
             email: this.addInfo.email
           }).then(res => {
             if (res.data.state === 1) {
               this.$message.success('用户添加成功');
               this.reset();
             } else {
               this.$message.error(res.data.error)
             }
             this.logining = false;
           }).catch(err => {
             this.logining = false;
           })
         } else {
           return false;
         }
       })
      }
    }
  }
</script>

<style scoped lang="less">
    .main {

    }
</style>