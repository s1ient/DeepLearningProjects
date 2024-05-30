<template>
  <div class="my-courses">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>我的课程</span>
        <el-button
          style="float: right"
          type="primary"
          @click="showAddCourseDialog"
          >新建课程</el-button
        >
      </div>
      <el-table :data="courses" stripe style="width: 100%" height="400">
        <el-table-column
          prop="name"
          label="课程名称"
          width="180"
          fixed
        ></el-table-column>
        <el-table-column
          prop="id"
          label="课程编号"
          width="100"
        ></el-table-column>
        <el-table-column label="课程描述" min-width="180">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.description"
              placement="top"
            >
              <span>{{
                scope.row.description.length > 15
                  ? scope.row.description.slice(0, 15) + "..."
                  : scope.row.description
              }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="开始时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="end_time"
          label="截止时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="students_count"
          label="课程人数"
          width="180"
        ></el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="editCourse(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="confirmDeleteCourse(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加课程对话框 -->
    <el-dialog title="添加课程" :visible.sync="addDialogVisible">
      <el-form :model="newCourseData">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="newCourseData.name"></el-input>
        </el-form-item>
        <el-form-item label="课程编号D" :label-width="formLabelWidth">
          <el-input v-model="newCourseData.id"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" :label-width="formLabelWidth">
          <el-input v-model="newCourseData.description"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="newCourseData.start_time"
            type="datetime"
            placeholder="Select date and time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="newCourseData.end_time"
            type="datetime"
            placeholder="Select date and time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="学生人数" :label-width="formLabelWidth">
          <el-input-number
            v-model="newCourseData.students_count"
            :min="0"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addCourse">添加</el-button>
      </div>
    </el-dialog>

    <!-- 编辑课程对话框 -->
    <el-dialog title="编辑" :visible.sync="editDialogVisible">
      <el-form :model="editCourseData">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="editCourseData.name"></el-input>
        </el-form-item>
        <el-form-item label="课程编号" :label-width="formLabelWidth">
          <el-input v-model="editCourseData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="课程描述" :label-width="formLabelWidth">
          <el-input v-model="editCourseData.description"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="editCourseData.start_time"
            type="datetime"
            placeholder="Select date and time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="截止时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="editCourseData.end_time"
            type="datetime"
            placeholder="Select date and time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="学生人数" :label-width="formLabelWidth">
          <el-input-number
            v-model="editCourseData.students_count"
            :min="0"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveCourse">保存</el-button>
      </div>
    </el-dialog>

    <!-- 删除课程确认对话框 -->
    <el-dialog title="删除" :visible.sync="deleteDialogVisible" width="30%">
      <span>你确定要删除这门课程吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="deleteCourse">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MyCourses",
  data() {
    return {
      courses: [
        {
          id: "C001",
          name: "深度学习",
          description: "这个是深度学习这门课程的一个简单的描述.",
          start_time: "2024-01-01 09:00",
          end_time: "2024-06-01 18:00",
          students_count: 30,
        },
        {
          id: "C002",
          name: "机器学习",
          description: "这个是深度学习这门课程的一个简单的描述",
          start_time: "2024-02-01 10:00",
          end_time: "2024-07-01 17:00",
          students_count: 25,
        },
        // 可以添加更多课程数据
      ],
      addDialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible: false,
      newCourseData: {
        id: "",
        name: "",
        description: "",
        start_time: "",
        end_time: "",
        students_count: 0,
      },
      editCourseData: {},
      courseToDelete: null,
      formLabelWidth: "120px",
    };
  },
  methods: {
    showAddCourseDialog() {
      this.newCourseData = {
        id: "",
        name: "",
        description: "",
        start_time: "",
        end_time: "",
        students_count: 0,
      };
      this.addDialogVisible = true;
    },
    addCourse() {
      // 添加课程的方法
      if (this.newCourseData.id && this.newCourseData.name) {
        this.courses.push({ ...this.newCourseData });
        this.addDialogVisible = false;
      } else {
        this.$message.error("Please fill in all required fields.");
      }
    },
    editCourse(course) {
      // 编辑课程的方法
      this.editCourseData = { ...course }; // 深拷贝课程数据到编辑表单
      this.editDialogVisible = true;
    },
    saveCourse() {
      // 保存课程修改的方法
      const index = this.courses.findIndex(
        (c) => c.id === this.editCourseData.id
      );
      if (index !== -1) {
        this.$set(this.courses, index, { ...this.editCourseData });
      }
      this.editDialogVisible = false;
      console.log("Course saved", this.editCourseData);
    },
    confirmDeleteCourse(course) {
      // 确认删除课程的方法
      this.courseToDelete = course;
      this.deleteDialogVisible = true;
    },
    deleteCourse() {
      // 删除课程的方法
      const index = this.courses.findIndex(
        (c) => c.id === this.courseToDelete.id
      );
      if (index !== -1) {
        this.courses.splice(index, 1);
      }
      this.deleteDialogVisible = false;
      this.courseToDelete = null;
      console.log("Course deleted", this.courseToDelete);
    },
  },
};
</script>

<style scoped>
.my-courses {
  padding: 20px;
}

.el-tooltip__popper {
  white-space: normal;
}

.dialog-footer {
  text-align: right;
}
</style>
