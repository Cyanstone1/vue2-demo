<template>
  <div id="app">
    <el-container>
      <!-- 配置头部 -->
      <el-header class="header">
        <el-row type="flex" justify="space-between" align="middle">
          <el-col>
            <span class="header-title">人工智能工程技术实践平台</span>
          </el-col>
        </el-row>
      </el-header>

      <!-- 配置抽屉 -->
      <el-container>
        <el-aside width="200px" class="aside">
          <el-menu default-active="1">
            <el-menu-item index="1" @click="goTo('system-introduction')">
              <i class="el-icon-info"></i>
              <span slot="title">系统介绍</span>
            </el-menu-item>
            <el-menu-item index="2" @click="goTo('text-similarity')">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">语意相似度</span>
            </el-menu-item>
            <el-menu-item index="3" @click="goTo('text-sentiment')">
              <i class="el-icon-message"></i>
              <span slot="title">评论情感分析</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 配置页面容器 -->
        <el-main class="main-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  methods: {
    goTo(page) {
      if (this.$route.path !== `/${page}`) {
        this.$router.push(`/${page}`)
      }
    }
  }
}
</script>

<style scoped>
/* 重置浏览器默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: #409EFF;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 60px; /* 设置固定高度 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.header-title {
  font-size: 20px;
  font-weight: bold;
}

.aside {
  background-color: #f0f2f5;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.el-main {
  padding: 20px;
  overflow: auto; /* 确保内容溢出时出现滚动条 */
  height: calc(100vh - 60px); /* 减去头部的高度 */
  background-color: #fff; /* 背景颜色 */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1); /* 内部阴影效果 */
}

.main-content {
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px; /* 添加圆角 */
}
</style>
