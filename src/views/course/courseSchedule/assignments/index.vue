<template>
  <div class="homework-page">
    <!-- 标题栏 -->
    <div class="title-bar">
      <h3>作业界面</h3>
      <div class="right-buttons">
        <el-button type="primary" @click="showCreateHomeworkDialog"
          >新建</el-button
        >
        <el-button type="primary">作业库</el-button>
      </div>
    </div>
    <hr class="separator" />

    <!-- 分类下拉框 -->
    <div class="filter-bar">
      <el-select v-model="selectedCategory" placeholder="选择分类">
        <el-option
          v-for="item in categories"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <!-- 作业列表 -->
    <div class="homework-list">
      <div
        v-for="(homework, index) in homeworks"
        :key="index"
        class="homework-card"
      >
        <div class="homework-name">{{ homework.name }}</div>
        <div class="homework-start-time">
          开始时间: {{ formatDate(homework.startTime) }}
        </div>
        <div class="homework-end-time">
          截止时间: {{ formatDate(homework.endTime) }}
        </div>
        <div class="homework-submissions">
          提交数: {{ homework.submissions }}
        </div>
        <div
          class="homework-approval"
          :style="{ backgroundColor: 'lightblue' }"
        >
          <span>{{ homework.pendingApproval }} 份待审批</span>
          <div class="approval-buttons">
            <el-button type="text" @click="showReissueDialog(homework)"
              >重新发放</el-button
            >
            <el-button type="text" @click="viewHomework()">查看</el-button>
          </div>
        </div>
      </div>
      <div class="add-homework-card" @click="showCreateHomeworkDialog">
        <el-button type="text" icon="el-icon-plus" class="add-icon"></el-button>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="footer-bar">
      <el-button type="text" class="recycle-bin-button">
        <i class="el-icon-delete"></i> 回收站
      </el-button>
    </div>

    <!-- 新建作业对话框 -->
    <el-dialog title="新建作业" :visible.sync="createHomeworkDialogVisible">
      <el-form :model="newHomework">
        <el-form-item label="作业名称">
          <el-input v-model="newHomework.name"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="newHomework.startTime"
            type="datetime"
            placeholder="选择开始时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker
            v-model="newHomework.endTime"
            type="datetime"
            placeholder="选择截止时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createHomeworkDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createHomework">确认</el-button>
      </div>
    </el-dialog>
    <!--作业题目-->
    <el-dialog
      title="作业题目"
      :visible.sync="homeworkTopicDialogVisible"
      width="50%"
    >
      <!-- 选择题列表 -->
      <div class="question-list">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="question"
        >
          <p>{{ question.title }}</p>
          <p
            v-for="(option, optionIndex) in question.options"
            :key="optionIndex"
          >
            {{ option }}
          </p>
        </div>
      </div>
    </el-dialog>

    <!-- 重新发放作业对话框 -->
    <el-dialog title="重新发放作业" :visible.sync="reissueDialogVisible">
      <el-form :model="editingHomework">
        <el-form-item label="截止时间">
          <el-date-picker
            v-model="editingHomework.endTime"
            type="datetime"
            placeholder="选择新的截止时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reissueDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="reissueHomework">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createHomeworkDialogVisible: false,
      reissueDialogVisible: false,
      homeworkTopicDialogVisible: false,
      selectedCategory: "",
      categories: [
        { value: "category1", label: "未开始" },
        { value: "category2", label: "进行中" },
        { value: "category2", label: "已截止" },
        // 更多分类
      ],
      questions: [
        {
          title: "1.已知 x^2 = 16，那么 x 的值可以是？",
          options: ["A：4", "B：-4", "C：4或-4", "D：0"],
        },
        {
          title: "2.已知 y^2 = 25，那么 y 的值可以是？",
          options: ["A：5", "B：-5", "C：5或-5", "D：0"],
        },
        {
          title: "3.已知 z^2 = 9，那么 z 的值可以是？",
          options: ["A：3", "B：-3", "C：3或-3", "D：0"],
        },
      ],
      newHomework: {
        name: "",
        startTime: "",
        endTime: "",
      },
      editingHomework: {
        name: "",
        endTime: "",
      },
      homeworks: [
        {
          name: "作业1",
          startTime: new Date("2024-05-01 08:00"),
          endTime: new Date("2024-05-10 23:59"),
          submissions: 20,
          pendingApproval: 5,
        },
        {
          name: "作业2",
          startTime: new Date("2024-05-03 08:00"),
          endTime: new Date("2024-05-12 23:59"),
          submissions: 15,
          pendingApproval: 3,
        },
        // 更多作业
      ],
    };
  },
  methods: {
    showCreateHomeworkDialog() {
      this.createHomeworkDialogVisible = true;
    },
    createHomework() {
      if (
        !this.newHomework.name ||
        !this.newHomework.startTime ||
        !this.newHomework.endTime
      ) {
        this.$message.warning("请填写完整的作业信息");
        return;
      }
      this.homeworks.push({
        ...this.newHomework,
        startTime: new Date(this.newHomework.startTime),
        endTime: new Date(this.newHomework.endTime),
        submissions: 0,
        pendingApproval: 0,
      });
      this.createHomeworkDialogVisible = false;
      this.newHomework = {
        name: "",
        startTime: "",
        endTime: "",
      };
    },
    showReissueDialog(homework) {
      this.editingHomework = { ...homework };
      this.reissueDialogVisible = true;
    },
    reissueHomework() {
      const index = this.homeworks.findIndex(
        (h) => h.name === this.editingHomework.name
      );
      if (index !== -1) {
        this.$set(this.homeworks, index, { ...this.editingHomework });
      }
      this.reissueDialogVisible = false;
    },
    viewHomework() {
      this.homeworkTopicDialogVisible = true;
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      const hours = String(d.getHours()).padStart(2, "0");
      const minutes = String(d.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.homework-page {
  padding: 20px;
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.right-buttons {
  display: flex;
  gap: 10px;
}

.separator {
  border: 1px solid #ccc;
  margin: 10px 0;
}

.filter-bar {
  margin-bottom: 20px;
}

.homework-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.homework-card,
.add-homework-card {
  width: calc(33.3333% - 20px);
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.homework-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.homework-start-time,
.homework-end-time,
.homework-submissions {
  margin-bottom: 5px;
}

.homework-approval {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.approval-buttons {
  display: flex;
  gap: 10px;
}

.add-homework-card {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.add-icon {
  font-size: 30px;
}

.footer-bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.recycle-bin-button {
  color: lightblue;
  border: none;
  background-color: transparent;
}
</style>
