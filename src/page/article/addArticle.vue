<template>
    <div class="main addArticle">
        <el-form ref="articleForm" label-position="left" label-width="120px"
                 :rules="articleRules" :model="articleForm">

            <el-form-item label="作者" prop="author">
                <el-input v-model="articleForm.author" placeholder="请添加文章作者"></el-input>
            </el-form-item>
            <el-form-item label="文章标题图片" prop="headCover">
                <el-upload
                        class="avatar-uploader"
                        accept='image/jpeg,image/gif,image/png'
                        action="http://localhost:3000/upload"
                        :show-file-list="false"
                        :headers="httpHeaders"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :drag="true"
                >
                    <img v-if="articleForm.headCover" :src="articleForm.headCover" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="文章标题" prop="title">
                <el-input v-model="articleForm.title" placeholder="请填写文章标题"></el-input>
            </el-form-item>

            <el-form-item prop="content">
                <label slot="label">
                    <el-tooltip content="富文本基于 vue-quill-editor" placement="bottom-start">
                        <span>文章内容</span>
                    </el-tooltip>
                </label>
                <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>


    </div>
</template>

<script>
  import hljs from 'highlight.js'
    //图片拖拽设置大小模块
  import ImageResize from 'quill-image-resize-module'
  Quill.register('modules/imageResize', ImageResize)
  export default {
    name: "addArticle",
    data () {
      let validateAuthor = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请添加文章作者'));
          } else {
            if (value.length > 8) {
              callback(new Error('我靠你这ID也太强了吧'));
            }
            callback();
          }
        },
        validateTitle = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写文章标题'));
        } else {
          if (value.length < 5 || value.length > 20) {
            callback(new Error('标题长度不小于5且不大于20'));
          }
          callback();
        }
      },
        validateContent = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请填写文章内容'));
        } else {
          if (value.length < 20) {
            callback(new Error('你的文章像你的小鸡鸡一样短'));
          } else if (value.lenth > 20000) {
            callback(new Error('一寸长一寸强，骚年你已经突破天际了，内容能精短点吗我TM求你了'));
          }
          callback();
        }
      },
        validateImage = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请上传文章标题图片'));
        } else {
          callback();
        }
      };
      return {
        imgQuality: 0.5, //压缩图片的质量
        articleForm: {
          author: '',
          headCover: '',
          title: '',
          content:  ''
        },
        //自定义验证规则
        articleRules: {
          author: [
            { validator: validateAuthor, trigger: ['blur','change'] }
          ],
          headCover: [
            { validator: validateImage, trigger: ['blur','change'] }
          ],
          title: [
            { validator: validateTitle, trigger: ['blur','change'] }
          ],
          content: [
            { validator: validateContent, trigger: 'blur' }
          ]
        },
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image']
            ],
            syntax: {
              highlight: text => { return hljs.highlightAuto(text).value }
            },
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            }
          }
        },
      }
    },
    computed: {
      httpHeaders() {
        return {
          'Authorization': this.$store.getters.usertoken,
          'Cache-Control': 'no-cache'
        }
      },
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(res, file)
        if (res.state == 1) {
          this.articleForm.headCover = 'http://localhost:3000/' + res.data.path + res.data.filename;
        }
      },
      dataURItoBlob(dataURI, type) {
        let binary = atob(dataURI.split(',')[1]);
        let array = [];
        for(let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: type});
      },

      beforeAvatarUpload(param) {
        //对图片进行压缩
        const imgSize = param.size / 1024 / 1024
        if(imgSize > 1) {
          const _this = this
          return new Promise(resolve => {
            const reader = new FileReader()
            const image = new Image()
            image.onload = (imageEvent) => {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              const width = image.width * _this.imgQuality
              const height = image.height * _this.imgQuality
              canvas.width = width;
              canvas.height = height;
              context.clearRect(0, 0, width, height);
              context.drawImage(image, 0, 0, width, height);
              const dataUrl = canvas.toDataURL(param.type);
              const blobData = _this.dataURItoBlob(dataUrl, param.type);
              resolve(blobData)
            }
            reader.onload = (e => { image.src = e.target.result; });
            reader.readAsDataURL(param);
          })
        }
      },
      submitForm () {
        this.$refs['articleForm'].validate((valid) => {
          if (valid) {
            this.$http.post('/add_article', this.articleForm).then(res => {
              if (res.data.state == 1) {
                this.$message.success('文章发布成功');
                this.$refs['articleForm'].resetFields();
              } else {
                this.$message.error('文章发布失败')
              }
            })

          } else {
            return false;
          }
        });
      },
      resetForm () {
        this.$refs['articleForm'].resetFields();
      }
    },
    mounted () {
      this.articleForm.author = this.$store.getters.userinfo.username;
      this.articleForm.content += `<h1 class="ql-align-center">
                          <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
                        </h1>
                        <p><br></p>
                        <p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p>
                        <p><br></p>
                        <p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p>
                        <p><br></p>
                        <p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p>
                        <p><br></p>
                        <p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p>
                        <p><br></p>
                        <pre class="ql-syntax" spellcheck="false">const a = 10;<br>const editorOption = { highlight: text => hljs.highlightAuto(text).value };</pre>
                        <p><br></p>
                        <p><span class="ql-font-serif">Every flight begins with a fall.</span></p>
                        <p><br></p>
                        <p><a href="https://surmon.me/" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p>
                        <p><br></p>
                        <iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe>
                        <p><br></p>
                        <p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">The things we love destroy us every time.</span></p>`
    },
  }
</script>
<style>
    .quill-editor:not(.bubble) .ql-container,
    .quill-editor:not(.bubble) .ql-container .ql-editor {
        height: 30rem;
        padding-bottom: 1rem;
    }
</style>
<style lang="less">
    .main.addArticle{
        background: #fff;
        padding: 20px;
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .el-upload-dragger{
            width: initial;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>