<template>
  <div id="app">
    <el-container>
      <!-- 配置头部 -->
      <el-header>
        <el-row type="flex"  align="middle">
          <el-col>
            <!-- 配置按钮，点击按钮时触发 toggleLeftDrawer 方法 -->
            <el-button icon="el-icon-menu" @click="toggleLeftDrawer"></el-button>
            <span>人工智能培训平台</span>
          </el-col>
          <el-col>
            <div>Element UI v{{ version }}</div>
          </el-col>
        </el-row>
      </el-header>

      <!-- 配置抽屉 -->
      <el-container>
        <el-aside width="200px" v-if="leftDrawerOpen">
          <el-menu default-active="1">
            <el-menu-item index="1" @click="goTo('system-introduction')">
              <i class="el-icon-info"></i>
              <span slot="title">系统介绍</span>
            </el-menu-item>
            <el-menu-item index="2" @click="goTo('text-similarity')">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">文本相似度</span>
            </el-menu-item>
            <el-menu-item index="3" @click="goTo('text-sentiment')">
              <i class="el-icon-message"></i>
              <span slot="title">文字情感分析</span>
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
      leftDrawerOpen: false,
      version: '2.15.6' // Element UI 的版本，你可以动态获取
    }
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    goTo(page) {
      this.$router.push(`/${page}`)
    }
  }
}
</script>

<style scoped>


.el-header {
  background-color: #409EFF;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.el-aside {
  background-color: #f0f2f5;
}

.el-main {
  padding: 20px;
}
</style>
