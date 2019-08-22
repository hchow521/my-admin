<template>
    <div class="index">
<!--        头部-->
        <el-header>
            <el-row>
                <el-col :span="12" :offset="6">
                    <h2 style="margin: 0;text-align: center">后台管理</h2>
                </el-col>
                <el-col :span="6" style="text-align: right;">
                    <el-dropdown>
                        <el-link icon="el-icon-s-tools">{{userinfo.username}}</el-link>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="$message.warning('敬请期待')">个人设置</el-dropdown-item>
                            <el-dropdown-item @click.native="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>
        <el-container style="padding-top: 20px;">

<!--            侧边栏-->
            <el-aside style="width: 200px;overflow-y: auto;overflow-x: hidden">
                <el-menu :default-openeds="['1', '2', '3']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>系统管理</template>
                        <el-menu-item>
                            <router-link to="/systemInfo" class="el-link el-link--default">系统信息</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>内容管理</template>
                        <el-menu-item-group>
                            <template slot="title"><i class="el-icon-document-copy"></i>文章管理</template>
                            <el-menu-item>
                                <router-link to="/addArticle" class="el-link el-link--default">发布文章</router-link>
                            </el-menu-item>
                            <el-menu-item>
                                <router-link to="/articleList" class="el-link el-link--default">文章列表</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title"><i class="el-icon-coffee-cup"></i>心情管理</template>
                            <el-menu-item>添加心情</el-menu-item>
                            <el-menu-item>心情列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title"><i class="el-icon-receiving"></i>侧边栏</template>
                            <el-menu-item>管理侧边栏</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-s-custom"></i>用户管理</template>
                        <el-menu-item-group>
                            <el-menu-item>
                                <router-link to="/addUser" class="el-link el-link--default">添加用户</router-link>
                            </el-menu-item>
                            <el-menu-item>
                                <router-link to="/userList" class="el-link el-link--default">用户列表</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-setting"></i>其他</template>
                        <el-menu-item-group>
                            <template slot="title"><i class="el-icon-position"></i>友链推广</template>
                            <el-menu-item>添加链接</el-menu-item>
                            <el-menu-item>链接列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

<!--            container-->
            <el-container>
                <el-header>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item><router-link to="/">首页</router-link></el-breadcrumb-item>
                        <el-breadcrumb-item v-for="(item, index) in routernav" :key="index"><router-link :to="item.path">{{item.title}}</router-link></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-header>
            <!--主体内容-->
                <el-main>
                    <transition name="el-fade-in-linear">
                        <router-view></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  export default {
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters(['userinfo']),
      ...mapState(['routernav'])
    },
    methods: {
      loginout () {
        this.$store.commit('loginout');
        this.$router.replace('/login');
      }
    },
    mounted() {

    }
  };
</script>


<style scoped lang="less">
    .index {
        height: 100%;
        overflow: hidden;
        background-color: rgb(238, 241, 246);

    }
</style>
<style lang="less">
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
        overflow: hidden;
    }

    .el-aside {
        color: #333;
    }

    .el-container {
        height: calc(100% - 60px);
    }
    .el-menu-item {
        box-sizing: content-box;
        >a {
            display: inline-block;
            width: 100%;
        }
    }
    .el-breadcrumb{
        line-height: inherit;
    }
    .el-breadcrumb__separator{
        color: #333333;
    }
</style>