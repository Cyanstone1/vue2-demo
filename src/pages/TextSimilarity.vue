<template>
  <el-container class="my-page">
    <!-- 第一个卡片，用于文本相似度计算 -->
    <el-card class="my-card">
      <div slot="header" class="text-h6">文本相似度计算</div>
      <!-- 输入两个文本框，用于输入待比较的文本 -->
      <el-form>
        <el-form-item label="输入文本1">
          <el-input type="textarea" v-model="text1"></el-input>
        </el-form-item>
        <el-form-item label="输入文本2">
          <el-input type="textarea" v-model="text2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="calculateTextSimilarity">计算相似度</el-button>
        </el-form-item>
      </el-form>
      <!-- 显示文本相似度结果 -->
      <div v-if="textSimilarityResult !== null">
        <el-progress :percentage="textSimilarityResult * 100" :text-inside="true"></el-progress>
        <div class="text-subtitle2">相似度：{{ (textSimilarityResult * 100).toFixed(2) }}%</div>
      </div>
    </el-card>

    <!-- 第二个卡片，用于文件相似度计算 -->
    <el-card class="my-card">
      <div slot="header" class="text-h6">文件相似度计算</div>
      <!-- 文件上传部分 -->
      <div class="vertical-container">
        <!-- 文件1上传按钮 -->
        <el-upload
            class="upload-demo"
            action="#"
            :before-upload="handleFileUpload1"
            :show-file-list="false">
          <el-button slot="trigger" type="primary">{{ file1Uploaded ? '文件1已上传' : '上传文件1' }}</el-button>
        </el-upload>
        <div v-if="file1Uploaded">
          <span>{{ file1.name }}</span>
          <el-button type="danger" icon="el-icon-delete" @click="deleteFile1"></el-button>
        </div>

        <!-- 文件2上传按钮 -->
        <el-upload
            class="upload-demo"
            action="#"
            :before-upload="handleFileUpload2"
            :show-file-list="false">
          <el-button slot="trigger" type="primary">{{ file2Uploaded ? '文件2已上传' : '上传文件2' }}</el-button>
        </el-upload>
        <div v-if="file2Uploaded">
          <span>{{ file2.name }}</span>
          <el-button type="danger" icon="el-icon-delete" @click="deleteFile2"></el-button>
        </div>

        <el-button type="primary" @click="calculateFileSimilarity">计算文件相似度</el-button>
      </div>
      <!-- 显示文件相似度结果 -->
      <div v-if="fileSimilarityResult !== null">
        <el-progress :percentage="fileSimilarityResult * 100" :text-inside="true"></el-progress>
        <div class="text-subtitle2">文件相似度：{{ (fileSimilarityResult * 100).toFixed(2) }}%</div>
      </div>
    </el-card>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TextSimilarity',
  data() {
    return {
      text1: '', // 用户输入的第一个文本
      text2: '', // 用户输入的第二个文本
      textSimilarityResult: null, // 用于存储文本相似度计算结果

      file1: null, // 用户上传的第一个文件
      file2: null, // 用户上传的第二个文件
      file1Uploaded: false, // 第一个文件是否已上传的标志
      file2Uploaded: false, // 第二个文件是否已上传的标志
      fileSimilarityResult: null // 用于存储文件相似度计算结果
    }
  },
  methods: {
    async calculateTextSimilarity() {
      if (!this.text1 || !this.text2) {
        this.$message.error('请填写两个文本')
        return
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/text_comparison/text/', {
          sentence1: this.text1,
          sentence2: this.text2
        })
        this.textSimilarityResult = parseFloat(response.data.result)
      } catch (error) {
        this.$message.error('计算文本相似度时出错')
      }
    },
    handleFileUpload1(file) {
      this.file1 = file
      this.file1Uploaded = true
      return false
    },
    handleFileUpload2(file) {
      this.file2 = file
      this.file2Uploaded = true
      return false
    },
    deleteFile1() {
      this.file1 = null
      this.file1Uploaded = false
      this.fileSimilarityResult = null
    },
    deleteFile2() {
      this.file2 = null
      this.file2Uploaded = false
      this.fileSimilarityResult = null
    },
    async calculateFileSimilarity() {
      if (!this.file1 || !this.file2) {
        this.$message.error('请上传两个文件')
        return
      }

      const file1Text = await this.readFileContent(this.file1)
      const file2Text = await this.readFileContent(this.file2)

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/text_comparison/file/', {
          file1: file1Text,
          file2: file2Text
        })
        this.fileSimilarityResult = parseFloat(response.data.result)
      } catch (error) {
        this.$message.error('计算文件相似度时出错')
      }
    },
    readFileContent(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
      })
    }
  }
}
</script>

<style scoped>
.my-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.my-card {
  width: 45%;
  margin: 10px;
}

.vertical-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
