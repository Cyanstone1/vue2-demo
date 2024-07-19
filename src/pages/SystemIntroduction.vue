<template>
  <el-container class="page-container">
    <el-card class="my-card">
      <div slot="header" class="text-h6">系统介绍</div>
      <div>
        <p>本子系统是为人工智能培训平台线下培训设计的实验，本实验旨在考察学员对封装算法模型，后端接口设计的掌握程度。本子系统提供高效和用户友好的界面，以展示学员自己补充效果。系统主要包括以下功能：</p>
        <ul>
          <li><strong>文本语义相似度计算：</strong>允许用户输入文本或上传文件，并通过后端计算两个文本背后的语义的相似度。</li>
          <li><strong>情感分析：</strong>用户可以输入用分号分隔的句子或上传文件，系统将分析文本的情感并生成词云图。</li>
        </ul>
        <p>系统的设计考虑了用户体验和性能，确保能够快速响应用户的请求，并提供准确和有用的分析结果。</p>
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
