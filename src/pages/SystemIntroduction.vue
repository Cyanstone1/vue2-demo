<template>
  <el-container class="page-container">
    <el-card class="my-card">
      <div slot="header" class="text-h6">实验与界面介绍</div>
      <div>
        <p>本实验是为人工智能培训平台线下培训设计的实验，本实验旨在考察学员对封装算法模型，后端接口设计的掌握程度。</p>
        <p>系统界面将展示以下补充结果：</p>
        <ul>
          <li><strong>语意相似度计算：</strong>用户输入文本或上传文本文件，并通过用户补充后的后端计算两个文本的语义的相似度。</li>
          <li><strong>评论情感分析：</strong>用户输入句子或上传文本文件，并通过用户补充后的后端分析评论的情感以及生成词云图。</li>
        </ul>
<!--        <p>系统的设计考虑了用户体验和性能，确保能够快速响应用户的请求，并提供准确和有用的分析结果。</p>-->
      </div>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: 'SystemIntroduction' // 组件名称
}
</script>

<style scoped>

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.my-card {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
}

.text-h6 {
  font-size: 1.25rem;
  font-weight: bold;
}

</style>
