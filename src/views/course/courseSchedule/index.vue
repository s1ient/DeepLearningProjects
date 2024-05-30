<template>
  <div class="course-schedule">
    <!-- 上部分：导航栏 -->
    <div class="nav-bar">
      <div class="left">
        <h2>{{ courseName }}</h2>
      </div>
      <div class="right">
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          @select="handleMenuSelect"
          class="el-menu-horizontal"
        >
          <el-menu-item index="home">首页</el-menu-item>
          <el-menu-item index="resource">资料</el-menu-item>
          <el-menu-item index="notices">通知</el-menu-item>
          <el-menu-item index="assignments">作业</el-menu-item>
          <el-menu-item index="exams">考试</el-menu-item>
          <el-menu-item index="grades">成绩</el-menu-item>
          <el-menu-item index="discuss">讨论</el-menu-item>
          <el-menu-item index="student-management">学生管理</el-menu-item>
        </el-menu>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="divider"></div>

    <!-- 下部分：内容区域 -->
    <div class="content">
      <component :is="currentView"></component>
    </div>
  </div>
</template>

<script>
import Home from "./home/index.vue";
import Notices from "./teaNotice/index.vue";
import Assignments from "./assignments/index.vue";
import Exams from "./exams/index.vue";
import Grades from "./grades/index.vue";
import StudentManagement from "./stuManage/index.vue";
import Discuss from "./discuss/index.vue";
import Resource from "./resource/index.vue";

export default {
  name: "CourseSchedule",
  data() {
    return {
      courseName: "课程名称",
      activeMenu: "home",
      currentView: "Home",
    };
  },
  components: {
    Home,
    Notices,
    Assignments,
    Exams,
    Grades,
    StudentManagement,
    Discuss,
    Resource,
  },
  methods: {
    handleMenuSelect(key) {
      this.activeMenu = key;
      this.currentView = this.getComponentName(key);
    },
    getComponentName(key) {
      switch (key) {
        case "home":
          return "Home";
        case "notices":
          return "Notices";
        case "assignments":
          return "Assignments";
        case "exams":
          return "Exams";
        case "grades":
          return "Grades";
        case "student-management":
          return "StudentManagement";
        case "discuss":
          return "Discuss";
        case "resource":
          return "Resource";
        default:
          return "Home";
      }
    },
  },
};
</script>

<style scoped>
.course-schedule {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5;
}

.nav-bar .left h2 {
  margin: 0;
}

.nav-bar .right {
  display: flex;
  align-items: center;
}

.divider {
  height: 1px;
  background-color: #d3d3d3;
  margin: 10px 0;
}

.content {
  flex: 1;
  padding: 20px;
}

.el-menu-horizontal {
  background-color: transparent;
  border-bottom: none;
}

.el-menu-item {
  color: black;
}

.el-menu-item.is-active {
  background-color: gray !important;
  color: white !important;
}
</style>
