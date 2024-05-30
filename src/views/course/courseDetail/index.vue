<template>
  <div class="course-detail">
    <div class="header">
      <div class="header-left">我教的课</div>
      <el-input
        placeholder="Search by course name"
        v-model="searchQuery"
        class="search-input"
        clearable
      >
        <template slot="prepend"><i class="el-icon-search"></i></template>
      </el-input>
    </div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="6" v-for="course in filteredCourses" :key="course.id">
        <el-card
          shadow="hover"
          class="course-card"
          @click.native="goToCourseSchedule(course.id)"
        >
          <img :src="course.image" class="course-image" />
          <div class="course-name">{{ course.name }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CourseDetail",
  data() {
    return {
      searchQuery: "",
      courses: [
        {
          id: "C001",
          name: "Course 1",
          image: "https://via.placeholder.com/150",
        },
        {
          id: "C002",
          name: "Course 2",
          image: "https://via.placeholder.com/150",
        },
        {
          id: "C003",
          name: "Course 3",
          image: "https://via.placeholder.com/150",
        },
        {
          id: "C004",
          name: "Course 4",
          image: "https://via.placeholder.com/150",
        },
        {
          id: "C005",
          name: "Course 5",
          image: "https://via.placeholder.com/150",
        },
        {
          id: "C006",
          name: "Course 6",
          image: "https://via.placeholder.com/150",
        },
        {
          id: "C007",
          name: "Course 7",
          image: "https://via.placeholder.com/150",
        },
        {
          id: "C008",
          name: "Course 8",
          image: "https://via.placeholder.com/150",
        },
      ],
    };
  },
  computed: {
    filteredCourses() {
      return this.courses.filter((course) =>
        course.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    goToCourseSchedule(courseId) {
      this.$router.push({ name: "courseSchedule", params: { id: courseId } });
    },
  },
};
</script>

<style scoped>
.course-detail {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  color: blue;
  font-size: 18px;
  font-weight: bold;
}

.search-input {
  width: 300px;
}

.course-card {
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer; /* 添加手型光标 */
}

.course-image {
  width: 100%;
  height: auto;
}

.course-name {
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}
</style>
