<template>
  <div id="app">
    <el-container>
      <!-- 配置头部 -->
      <el-header class="header">
        <el-row type="flex" justify="space-between" align="middle">
          <el-col>
            <!-- 配置按钮，点击按钮时触发 toggleLeftDrawer 方法 -->
            <el-button icon="el-icon-menu" @click="toggleLeftDrawer"></el-button>
            <span>人工智能培训实验</span>
          </el-col>
        </el-row>
      </el-header>

      <!-- 配置抽屉 -->
      <el-container>
        <el-aside width="200px" v-show="leftDrawerOpen">
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
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    goTo(page) {
      if (this.$route.path !== `/${page}`) {
        this.$router.push(`/${page}`)
      }
    }
  }
}
</script>

<style scoped>
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

.el-aside {
  background-color: #f0f2f5;
}

.el-main {
  padding: 20px;
  overflow: auto; /* 确保内容溢出时出现滚动条 */
  height: calc(100vh - 60px); /* 减去头部的高度 */
}
</style>
