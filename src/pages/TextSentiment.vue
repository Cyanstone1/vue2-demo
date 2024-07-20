<template>
  <el-container class="my-page">
    <!-- 第一部分：文字的情感分析 -->
    <el-card class="my-card">
      <div slot="header" class="text-h6">评论情感分析</div>
      <el-form>
        <el-form-item label="输入评论">
          <el-input type="textarea" v-model="sentimentInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="analyzeSentiment">分析情感</el-button>
        </el-form-item>
      </el-form>
      <div v-if="sentimentResult">
        <div class="text-subtitle2">分析结果：{{ sentimentResult }}</div>
      </div>
    </el-card>

    <!-- 第二部分：文件情感分析和词云图生成 -->
    <el-card class="my-card">
      <div slot="header" class="text-h6">上传文件分析词云</div>
      <div class="vertical-container">
        <el-upload
            class="upload-demo"
            action="#"
            :before-upload="handleFileUpload"
            :show-file-list="false">
          <el-button slot="trigger" type="primary">{{ fileUploaded ? '文件已上传' : '上传文件' }}</el-button>
        </el-upload>
        <div v-if="fileUploaded">
          <span>{{ file.name }}</span>
          <el-button type="danger" icon="el-icon-delete" @click="deleteFile"></el-button>
        </div>
        <el-button type="primary" @click="generateWordCloud" :disabled="true">生成词云图</el-button>
        <!--        <el-button type="primary" @click="generateWordCloud" :disabled="!fileUploaded">生成词云图</el-button>-->
        <el-progress v-if="loading" type="circle" :percentage="100" status="exception"/>
      </div>
      <div v-if="wordCloudUrls.length" class="q-gutter-md">
        <div v-for="(url, index) in wordCloudUrls" :key="index" class="word-cloud-container">
          <img :src="url" alt="词云图" class="word-cloud-image"/>
        </div>
      </div>
    </el-card>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TextSentiment',
  data() {
    return {
      sentimentInput: '', // 输入的句子
      sentimentResult: null, // 情感分析结果
      file: null, // 上传的文件
      fileProgress: null, // 文件上传进度
      fileUploaded: false, // 文件是否已上传
      wordCloudUrls: [], // 词云图的 URL 数组
      loading: false, // 加载状态
      experimentUrl: null // 实验URL
    }
  },
  methods: {
    async getExperimentUrl() {
      const courseId = localStorage.getItem('course_id')
      const userId = localStorage.getItem('user_id')

      // 创建一个 FormData 对象
      const formData = new FormData()
      formData.append('course_id', courseId)
      formData.append('user_id', userId)

      try {
        // 使用 FormData 对象作为请求体
        const response = await axios.post('/student/get_exp_url', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (response.data.errno === 10000) {
          this.experimentUrl = response.data.data.experiment_url
          return true
        } else {
          this.$message.error(response.data.msg)
          return false
        }
      } catch (error) {
        this.$message.error('实验 URL 查找失败')
        return false
      }
    },
    async analyzeSentiment() {
      const sentences = this.sentimentInput.split(';')

      const urlFound = await this.getExperimentUrl()
      if (!urlFound) {
        return
      }

      const apiUrl = this.experimentUrl
      const formData = new FormData()

      if (sentences.length === 1) {
        formData.append('text',this.sentimentInput)
        axios.post(`http://${apiUrl}/api/text_classification/single_comment/`, formData,{
          headers: {'Content-Type' : 'multipart/form-data'}
        })
            .then((response) => {
              console.log('API response:', response.data)
              this.sentimentResult = response.data.result
            })
            .catch((error) => {
              console.error('Error analyzing sentiment:', error)
            })
      } else {
        const formData = new formData()
        formData.append('text_list',sentences)
        axios.post(`http://${apiUrl}/api/text_classification/multiple_comments/`, formData,{
          headers:{'Content-Type':'multipart/form-data'}
        })
            .then((response) => {
              console.log('API response:', response.data)
              this.sentimentResult = '生成词云图'
              this.wordCloudUrls = [
                response.data.positive_comments_wordcloud_url,
                response.data.negative_comments_wordcloud_url
              ].filter((url) => url !== null)
            })
            .catch((error) => {
              console.error('Error analyzing sentiment:', error)
            })
      }
    },
    handleFileUpload(file) {
      this.file = file
      if (this.file && this.file.type === 'text/plain') {
        console.log('File selected:', this.file)
        this.fileUploaded = true
      } else {
        this.$message.error('只能上传txt格式的文件')
        this.file = null
      }
      return false
    },
    deleteFile() {
      this.file = null
      this.fileProgress = null
      this.fileUploaded = false
      this.wordCloudUrls = []
      this.$refs.fileInput.value = ''
      console.log('File deleted')
    },
    async generateWordCloud() {
      if (!this.file) {
        this.$message.error('请先上传一个文件')
        return
      }

      const urlFound = await this.getExperimentUrl()
      if (!urlFound) {
        return
      }

      this.loading = true
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target.result
        const sentences = content.split('\n').filter((line) => line.trim())
        const formData = new FormData()
        formData.append('text_list',sentences)

        axios.post(`http://${this.experimentUrl}/api/text_classification/multiple_comments/`,formData, {
          headers: {'Content-Type':'multipart/form-data'}
        })
            .then((response) => {
              console.log('API response:', response.data)
              this.wordCloudUrls = [
                response.data.positive_comments_wordcloud_url,
                response.data.negative_comments_wordcloud_url
              ].filter((url) => url !== null)
            })
            .catch((error) => {
              console.error('Error generating word cloud:', error)
            })
            .finally(() => {
              this.loading = false
            })
      }
      reader.readAsText(this.file)
    }
  }
}
</script>

<style scoped>
.my-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.my-card {
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.vertical-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.word-cloud-container {
  display: flex;
  justify-content: center;
}

.word-cloud-image {
  max-width: 100%;
  height: auto;
}
</style>
