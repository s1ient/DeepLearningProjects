<template>
  <div class="discussion-page">
    <!-- 标题栏 -->
    <div class="title-bar">
      <h3>全部话题</h3>
      <div class="search-bar">
        <el-input
          v-model="searchText"
          placeholder="搜索话题"
          class="search-input"
        ></el-input>
        <el-button
          class="search-btn"
          type="primary"
          icon="el-icon-search"
          @click="searchTopics"
        ></el-button>
      </div>
      <el-button
        class="add-topic-btn"
        type="primary"
        @click="showNewTopicDialog"
        >新建话题</el-button
      >
    </div>

    <!-- 讨论主题列表 -->
    <div class="topic-list">
      <div class="topic" v-for="(topic, index) in filteredTopics" :key="index">
        <!-- 发布人信息 -->
        <div class="topic-header">
          <el-avatar :src="topic.avatar"></el-avatar>
          <div class="topic-info">
            <span>{{ topic.author }} {{ topic.time }}</span>
          </div>
          <el-button
            type="text"
            icon="el-icon-arrow-down"
            @click="toggleCollapse(index)"
            class="collapse-button"
          ></el-button>
        </div>
        <h4>{{ topic.title }}</h4>
        <div v-if="!topic.collapsed">
          <p>{{ topic.description }}</p>
          <!-- 点赞或回复图标 -->
          <div class="topic-icons">
            <el-tooltip content="点赞">
              <el-button type="text" icon="el-icon-thumb"> </el-button>
            </el-tooltip>
            <el-tooltip content="回复">
              <el-button type="text" icon="el-icon-chat-line-round">
              </el-button>
            </el-tooltip>
          </div>
          <!-- 回复列表 -->
          <ul class="reply-list">
            <li
              class="reply"
              v-for="(reply, replyIndex) in topic.replies"
              :key="replyIndex"
            >
              <div class="reply-header">
                <el-avatar :src="reply.avatar"></el-avatar>
                <div class="reply-info">
                  <p>{{ reply.author }} 回复于 {{ reply.time }}</p>
                  <p>{{ reply.content }}</p>
                </div>
              </div>
              <!-- 点赞或回复图标 -->
              <div class="topic-icons">
                <el-tooltip content="点赞">
                  <el-button type="text" icon="el-icon-thumb"> </el-button>
                </el-tooltip>
                <el-tooltip content="回复">
                  <el-button type="text" icon="el-icon-chat-line-round">
                  </el-button>
                </el-tooltip>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 新建话题对话框 -->
    <el-dialog title="新建话题" :visible.sync="dialogVisible" width="50%">
      <el-form :model="newTopicForm" label-width="100px">
        <el-form-item label="发放对象">
          <el-select v-model="newTopicForm.target" placeholder="请选择发放对象">
            <el-option label="所有人" value="all"></el-option>
            <!-- 其他发放对象选项 -->
          </el-select>
        </el-form-item>
        <el-form-item label="话题主题">
          <el-input
            v-model="newTopicForm.title"
            placeholder="请输入话题主题"
          ></el-input>
        </el-form-item>
        <el-form-item label="话题描述">
          <el-input
            type="textarea"
            v-model="newTopicForm.description"
            placeholder="请输入话题描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="添加附件">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createTopic">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Discussion",
  props: {
    topic: Object, // 话题数据对象，包含发布人和发布时间等信息
  },
  data() {
    return {
      searchText: "",
      dialogVisible: false,
      newTopicForm: {
        target: "",
        title: "",
        description: "",
      },
      topics: [
        {
          author: "王老师",
          time: "2024/03/02",
          title: "讨论1",
          description: "描述287",
          avatar: "https://example.com/teacher_avatar1.jpg",
          collapsed: false,
          replies: [
            {
              author: "学生A",
              time: "2024/03/03",
              content: "回复1内容",
              avatar: "https://example.com/student_avatar1.jpg",
            },
            {
              author: "学生B",
              time: "2024/03/04",
              content: "回复2内容",
              avatar: "https://example.com/student_avatar2.jpg",
            },
          ],
        },
        {
          author: "李老师",
          time: "2024/03/02",
          title: "讨论2",
          description: "描述0254",
          avatar: "https://example.com/teacher_avatar2.jpg",
          collapsed: false,
          replies: [
            {
              author: "学生C",
              time: "2024/03/05",
              content: "回复1内容",
              avatar: "https://example.com/student_avatar3.jpg",
            },
            {
              author: "学生D",
              time: "2024/03/06",
              content: "回复2内容",
              avatar: "https://example.com/student_avatar4.jpg",
            },
          ],
        },
        // 其他话题数据
      ],
      filteredTopics: [], // 添加这个属性
    };
  },
  created() {
    // 初始化filteredTopics
    this.filteredTopics = this.topics;
  },
  methods: {
    searchTopics() {
      // 实现搜索功能
      this.filteredTopics = this.topics.filter((topic) => {
        return topic.title.includes(this.searchText);
      });
    },
    showNewTopicDialog() {
      this.dialogVisible = true;
    },
    createTopic() {
      // 处理创建话题逻辑
      console.log("创建话题", this.newTopicForm);
      // 将新话题添加到 topics 数组中
      this.topics.push({
        author: "王老师", // 示例数据，实际应该根据当前用户填入
        time: new Date().toLocaleString(), // 当前时间
        title: this.newTopicForm.title,
        description: this.newTopicForm.description,
        replies: [],
        avatar: "https://example.com/avatar_default.jpg", // 默认头像URL
      });
      // 清空表单
      this.newTopicForm = {
        target: "",
        title: "",
        description: "",
      };
      this.dialogVisible = false;
    },
    toggleCollapse(index) {
      this.topics[index].collapsed = !this.topics[index].collapsed;
      // 确保 Vue 侦测到状态变化
      this.$set(this.topics, index, { ...this.topics[index] });
    },
    submitReply(topic) {
      // 处理提交回复逻辑
      console.log("回复话题", topic.reply);
      // 清空回复输入框
      topic.reply = "";
    },
    beforeUpload(file) {
      // 实现上传文件前的操作，例如文件类型、大小的验证等
    },
    handleUploadSuccess(response, file, fileList) {
      // 处理上传成功的逻辑
      console.log("文件上传成功", response, file, fileList);
    },
  },
};
</script>

<style scoped>
.reply-list {
  margin-top: 10px;
}
.reply {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.reply-list .reply-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.reply-list .reply-info {
  margin-left: 10px;
}

.upload-demo .el-upload__tip {
  margin: 0;
}
.discussion-page {
  padding: 20px;
}

.title-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
}

.search-bar {
  display: flex;
  /* align-items: left; */
}

.search-input {
  width: 180px;
  margin-left: 10px; /* 调整搜索框与搜索按钮的间距 */
  /* margin-left: 0px; */
}

.search-btn {
  margin-left: 20px;
  margin-right: 650px;
}
.add-topic-button {
  margin-right: auto; /* 将按钮推到右侧 */
}
.topic {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}
.topic-header {
  display: flex;
  align-items: center; /* 使用 center 来垂直居中对齐 */
  justify-content: flex-start; /* 水平方向上的对齐方式 */
  margin-bottom: 5px;
  flex-direction: row;
}
.topic-header .collapse-button {
  margin-left: auto; /* 将按钮推到右侧 */
  color: blue;
}
.topic-content {
  margin-bottom: 10px;
}

.topic-icons {
  display: flex;
  justify-content: flex-end;
}
.topic-info {
  margin-left: 10px;
}
.topic-info .author {
  font-weight: bold;
}

.topic-info .time {
  color: #999;
}
</style>
