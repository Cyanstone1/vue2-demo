<template>
  <el-container class="page-container">
    <el-card class="my-card">
      <div slot="header" class="text-h6">实验与界面介绍</div>
      <div>
        <p>本实验是为人工智能工程技术培而设计，旨在考察学员对封装算法模型，后端接口设计的掌握程度。</p>
        <p>本平台属于国家专业技术人才知识更新工程的一部分，旨在为人工智能工程技术人员提供实践操作的平台。</p>
        <p>当前课程：<strong>人工智能工程技术初级</strong></p>
        <p>系统界面将展示以下补充结果：</p>
        <ul>
          <li><strong>语意相似度计算：</strong>用户输入文本或上传文本文件，通过用户补充后的后端计算两个文本的语义相似度。</li>
          <li><strong>评论情感分析：</strong>用户输入句子或上传文本文件，通过用户补充后的后端分析评论的情感并生成词云图。</li>
        </ul>
        <p>请在Jupyter端口上根据提示完成实践，启动后端项目后，在这个界面测试你所封装的接口效果</p>
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
