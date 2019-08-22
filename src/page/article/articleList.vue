<template>
    <div class="main">
        <el-table
                :data="articleList"
                :stripe="true"
                style="width: 100%">
            <el-table-column
                    prop="_id"
                    label="唯一ID"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="author"
                    label="作者"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="Email邮箱">
            </el-table-column>
            <el-table-column
                    prop="createDate"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="文章标题">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="250">
                <template slot-scope="scope">
                    <el-button @click="editArticle(scope.row['_id'])">编辑</el-button>
                    <el-button @click="articleView(scope.row['_id'])">预览</el-button>
                    <el-button type="danger" @click="deleteArticle(scope.row['_id'])">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="删除文章"
                :visible.sync="dialogVisible"
                width="30%">
            <el-alert title="删除文章无法找回，请确认操作" type="error"></el-alert>
            <p>{{checkArticleID}}</p>
            <el-input v-model="deleteArticleID" placeholder="请确认要删除的文章ID"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" v-loading.fullscreen.lock="logining" @click="onsubmit" :disabled="logining">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "ArticleList",
    data () {
      return {
        articleList: [],
        logining: false,
        dialogVisible: false,
        deleteArticleID: '',
        checkArticleID: ''
      }
    },
    methods: {
      onsubmit () {
        if (this.deleteArticleID === this.checkArticleID) {
          this.logining = true;
          this.$http.post('/delete_article', { articleID: this.checkArticleID }).then(res => {
            if (res.data.state == 1) {
              this.$message.success('文章已删除');
              this.dialogVisible = false;
              this.getArticleList();
            }
            this.logining = false;
          }).catch(err => {
            this.logining = false;
          })
        } else {
          this.$message.error('删除文章ID与当前操作文章ID不一致')
        }
      },
      editArticle (id) {
        this.$message('跟发布文章一样，我不想写了，要体验修改功能找用户列表');
      },
      deleteArticle (id){
        this.dialogVisible = true;
        this.checkArticleID = id;
      },
      articleView (id) {
        this.$router.push({
          path: '/articleView',
          query: { id }
        })
      },
      getArticleList () {
        this.$http.get('/get_articlelist').then(res => {
          if (res.data.state == 1) {
            this.articleList = res.data.data
          } else {
            this.$message.error('文章列表获取失败')
          }
        })
      }
    },
    created() {
      this.getArticleList();
    }
  }
</script>

<style scoped>

</style>