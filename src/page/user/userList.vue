<template>
    <div class="main">
        <el-table
                :data="userList"
                :stripe="true"
                style="width: 100%">
            <el-table-column
                    prop="_id"
                    label="用户ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="Email邮箱">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <el-button @click="editUser(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="deleteUser(scope.row['_id'])">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑用户信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="editData" :rules="rules" ref="editForm">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="editData.username" placeholder="用户名" disabled="true"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号">
                    <el-input type="phone" v-model="editData.phone" placeholder="请填写手机号"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input type="email" v-model="editData.email" placeholder="请填写E-mail地址"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" v-loading.fullscreen.lock="logining" @click="onsubmit" :disabled="logining">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "userList",
    data() {
      return {
        userList: [],
        dialogVisible: false,
        logining: false,
        editData: {
          username: '',
          phone: ''
        },
        rules: {
          username: [
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请填写手机号', trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      getUserList() {
        this.$http.get('/get_userlist').then(res => {
          if (res.data.state) {
            this.userList = res.data.data
          } else {
            this.$message.error(res.data.error)
          }
        })
      },
      deleteUser(id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/delete_user', {id}).then(res => {
            if (res.data.state) {
              this.$message.success('操作成功');
              this.dialogVisible = false;
              this.getUserList();
            } else {
              this.$message.error(res.data.error || '操作失败')
            }
          })
        }).catch(() => {
          this.$message('操作取消');
        });
      },
      editUser(item) {
        this.editData = Object.assign({}, item);
        this.dialogVisible = true;
      },
      handleClose(done) {
        this.$confirm('取消修改？')
          .then(() => {
            done();
          })
          .catch(() => {});
      },
      onsubmit() {
        this.$refs['editForm'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$http.post('/edit_user', this.editData).then(res => {
              this.loading = false;
              if(res.data.state == 1) {
                this.$message.success('修改成功');
                this.dialogVisible = false;
                this.getUserList();
              }
            }).catch(err => {
              this.loading = false
            })

          } else {
            return false;
          }
        })
      }
    },
    created() {
      this.getUserList();
    }
  }
</script>

<style scoped>

</style>