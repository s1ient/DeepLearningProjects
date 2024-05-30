<template>
  <div class="exam-page">
    <!-- 标题栏 -->
    <div class="title-bar">
      <h3>考试界面</h3>
      <div class="right-buttons">
        <el-button type="primary" @click="showCreateexamDialog">新建</el-button>
        <el-button type="primary">考试库</el-button>
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

    <!-- 考试列表 -->
    <div class="exam-list">
      <div v-for="(exam, index) in exams" :key="index" class="exam-card">
        <div class="exam-name">{{ exam.name }}</div>
        <div class="exam-start-time">
          考试时间: {{ formatDate(exam.startTime) }}至{{
            formatDate(exam.endTime)
          }}
        </div>
        <div class="exam-end-time">考试占比: {{ exam.persent }}%</div>
        <div class="exam-submissions">
          提交数: {{ exam.submissions }}/{{ exam.totals }}
        </div>
        <div class="exam-state">状态: {{ exam.state }}</div>
        <div class="exam-approval" :style="{ backgroundColor: 'lightblue' }">
          <span>{{ exam.pendingApproval }} 份待审批</span>
          <div class="approval-buttons">
            <el-button type="text" @click="viewexam()">查看</el-button>
          </div>
        </div>
      </div>
      <div class="add-exam-card" @click="showCreateexamDialog">
        <el-button type="text" icon="el-icon-plus" class="add-icon"></el-button>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="footer-bar">
      <el-button type="text" class="recycle-bin-button">
        <i class="el-icon-delete"></i> 回收站
      </el-button>
    </div>

    <!-- 新建考试对话框 -->
    <el-dialog title="新建考试" :visible.sync="createexamDialogVisible">
      <el-form :model="newexam">
        <el-form-item label="考试名称">
          <el-input
            v-model="newexam.name"
            style="display: inline-block; width: 400px"
          ></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="newexam.startTime"
            type="datetime"
            placeholder="选择开始时间"
            style="display: inline-block"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker
            v-model="newexam.endTime"
            type="datetime"
            placeholder="选择截止时间"
            style="display: inline-block"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="考试占比">
          <el-input
            v-model="newexam.persent"
            style="display: inline-block; width: 100px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createexamDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createexam">确认</el-button>
      </div>
    </el-dialog>

    <!--考试题目-->
    <el-dialog
      title="考试题目"
      :visible.sync="examTopicDialogVisible"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      createexamDialogVisible: false,
      reissueDialogVisible: false,
      examTopicDialogVisible: false,
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
      newexam: {
        name: "",
        startTime: "",
        endTime: "",
        persent: "",
      },
      editingexam: {
        name: "",
        endTime: "",
      },
      exams: [
        {
          name: "考试1",
          startTime: new Date("2024-05-01 08:00"),
          endTime: new Date("2024-05-10 23:59"),
          submissions: 20,
          totals: 50,
          persent: 20,
          state: "未开始",
          pendingApproval: 5,
        },
      ],
    };
  },
  methods: {
    showCreateexamDialog() {
      this.createexamDialogVisible = true;
    },
    createexam() {
      if (
        !this.newexam.name ||
        !this.newexam.startTime ||
        !this.newexam.endTime
      ) {
        this.$message.warning("请填写完整的作业信息");
        return;
      }
      this.exams.push({
        ...this.newexam,
        startTime: new Date(this.newexam.startTime),
        endTime: new Date(this.newexam.endTime),
        submissions: 0,
        pendingApproval: 50,
        totals: 50,
        state: "进行中",
      });
      this.createexamDialogVisible = false;
      this.newexam = {
        name: "",
        startTime: "",
        endTime: "",
        persent: "",
      };
    },
    showReissueDialog(exam) {
      this.editingexam = { ...exam };
      this.reissueDialogVisible = true;
    },
    reissueexam() {
      const index = this.exams.findIndex(
        (h) => h.name === this.editingexam.name
      );
      if (index !== -1) {
        this.$set(this.exams, index, { ...this.editingexam });
      }
      this.reissueDialogVisible = false;
    },
    viewexam() {
      this.examTopicDialogVisible = true;
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
.exam-page {
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

.exam-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.exam-card,
.add-exam-card {
  width: calc(33.333% - 20px);
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.exam-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.exam-start-time,
.exam-end-time,
.exam-submissions,
.exam-state {
  margin-bottom: 5px;
  font-size: 15px;
}

.exam-approval {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.approval-buttons {
  display: flex;
  gap: 10px;
}

.add-exam-card {
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
.inline-item.el-form-item {
  display: flex;
  align-items: center;
}
</style>
