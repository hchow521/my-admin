<template>
    <div class="main">
        <template v-if="Object.keys(articleData).length > 0">
            <h1>{{articleData.title}} <em>{{articleData.email}}</em></h1>
            <h5>创建时间：{{formatDate(articleData.createDate)}}</h5>
            <div id="hljs" class="ql-container ql-snow">
                <div class="ql-editor" v-html="articleData.content"></div>
            </div>
        </template>
    </div>
</template>

<script>
  import hljs from 'highlight.js'
  export default {
    name: "articleView",
    data () {
      return {
        articleData: {}
      }
    },
    computed: {
      articleID () {
        return this.$route.query.id
      }
    },
    methods: {
      formatDate (DateString) {
        return new Date(parseInt(DateString));
      }
    },
    created() {
      this.$http.get('/get_article', { params: { articleID: this.articleID } }).then(res => {
        if (res.data.state == 1) {
          this.articleData = res.data.data;
          this.$nextTick(() => {
            hljs.highlightBlock(document.querySelectorAll('#hljs')[0]);
          })
        } else{
          this.$message.error('请求失败')
        }
      })
    }
  }
</script>

<style scoped lang="less">
    .main{
        background: #fff;
        padding: 20px;
        h1, h5{
            text-align: center;
        }
        h5{
            color: #999;
        }
    }
</style>