<template>
  <el-container class="my-page">
    <!-- 第一部分：文字的情感分析 -->
    <el-card class="my-card">
      <div slot="header" class="text-h6">文字的情感分析</div>
      <el-form>
        <el-form-item label="输入句子">
          <el-input type="textarea" v-model="sentimentInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="analyzeSentiment">分析情感</el-button>
        </el-form-item>
      </el-form>
      <div v-if="sentimentResult">
        <div class="text-subtitle2">情感结果：{{ sentimentResult }}</div>
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
        <el-button type="primary" @click="generateWordCloud" :disabled="!fileUploaded">生成词云图</el-button>
        <el-progress v-if="loading" type="circle" :percentage="100" status="exception" />
      </div>
      <div v-if="wordCloudUrls.length" class="q-gutter-md">
        <div v-for="(url, index) in wordCloudUrls" :key="index" class="word-cloud-container">
          <img :src="url" alt="词云图" class="word-cloud-image" />
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
      loading: false // 加载状态
    }
  },
  methods: {
    analyzeSentiment() {
      const sentences = this.sentimentInput.split(';')
      if (sentences.length === 1) {
        axios.post('http://127.0.0.1:8000/api/text_classification/single_comment/', {
          text: this.sentimentInput
        })
            .then((response) => {
              console.log('API response:', response.data)
              this.sentimentResult = response.data.result
            })
            .catch((error) => {
              console.error('Error analyzing sentiment:', error)
            })
      } else {
        axios.post('http://127.0.0.1:8000/api/text_classification/multiple_comments/', {
          text_list: sentences
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
    generateWordCloud() {
      if (!this.file) {
        this.$message.error('请先上传一个文件')
        return
      }

      this.loading = true
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target.result
        const sentences = content.split('\n').filter((line) => line.trim())

        axios.post('http://127.0.0.1:8000/api/text_classification/multiple_comments/', {
          text_list: sentences
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
