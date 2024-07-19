import Vue from 'vue'
import Router from 'vue-router'

// 导入页面组件
import SystemIntroduction from '@/pages/SystemIntroduction.vue'
import TextSimilarity from '@/pages/TextSimilarity.vue'
import TextSentiment from '@/pages/TextSentiment.vue'
import MainLayout from '@/layouts/MainLayout.vue'

Vue.use(Router)

// 定义路由数组
const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            { path: 'system-introduction', component: SystemIntroduction }, // 系统介绍页面
            { path: 'text-similarity', component: TextSimilarity }, // 文本相似度计算页面
            { path: 'text-sentiment', component: TextSentiment } // 文字情感分析页面
        ]
    },
    {
        path: '*',
        // component: ErrorNotFound
    }
]

// 导出路由配置
export default new Router({
    mode: 'history', // 使用 HTML5 history 模式
    routes
})
