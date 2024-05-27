### 管理员权限

**3. 内容管理**
   - `ResourceList`：显示所有课程资源的列表。
   - `AddResource`：添加新的课程资源（视频、文档等）。
   - `EditResource`：编辑现有课程资源。
   - `AnnouncementList`：显示所有公告的列表。
   - `AddAnnouncement`：发布新的公告。

**4. 统计分析**
   - `UsageStatistics`：查看系统的总体使用情况统计。
   - `UserActivity`：查看用户活跃度数据。
   - `CourseCompletion`：查看课程完成情况的统计数据。

### 系统管理模块  system

- **系统配置**：管理员可以配置平台的各种参数和设置。
- **日志管理**：记录系统操作日志，便于系统维护和问题排查。
- **备份与恢复**：支持系统数据的备份与恢复，保障数据安全。

### 老师权限

**1. 课程管理  course**
   - `courseDetail`：显示老师所创建的所有课程。
   - `courseAdd`：创建新的课程,。
   - `courseSchedule`：组织和管理课程结构（章节、模块等）。

**2. 作业和考试  homework**
   - `assignments`：显示老师布置的所有作业,有按钮点击可以批改作业，允许布置作业。
   - `exams`：显示老师创建的所有考试，有按钮点击可以批改考试，允许创建新的考试。
   - `publishResults`：发布作业和考试成绩。

**3. 学生管理  stuManage**
   - `stulist`：显示注册课程的学生列表。
   - `stuProgress`：跟踪学生的学习进度和表现。
   - `stuInteraction`：与学生互动（答疑、讨论等）。

**4. 通知和公告 teaNotice**
   - `teaNotice`：发布课程相关的通知和公告。

**5. 统计分析  analysis**
   - `courseEngagement`：查看课程的参与度统计。
   - `stuPerformance`：查看学生的学习情况和表现统计。

### 学生权限

**1. 课程学习  stuCourse**
   - `myCourse`：查看我的课程。
   - `courseDetails`：查看课程内容。

**2. 作业和考试 stuHomework**
   - `stuAssignments`：查看已布置的作业，点击可以显示作业内容，并可以提交。
   - `stuExams`：查看已布置的考试，点击可以进入考试，并可以提交。
   - `viewGrades`：查看作业和考试成绩。

**4. 通知和公告 stuNotice** 
   - `stuNotice`：接收课程和系统相关的通知。

**5. 互动交流 stuDiscuss**
   - `stuDiscuss`：参与课程讨论区。      
 
`
client
├── src
│   ├── components
│   │   ├── Layout
│   │   │   ├── Sidebar.vue         # 侧边栏组件
│   │   │   ├── Navbar.vue          # 顶部导航栏组件
│   │   │   ├── AppMain.vue         # 主要内容区域组件
│   │   ├── layout.vue              # 布局组件
│   ├── views                       # 各个视图页面
│   │   ├── home                    # 主页
│   │   │   ├── index.vue
│   │   ├── courses                 # 课程管理模块
│   │   │   ├── CourseList.vue
│   │   │   ├── CourseDetail.vue
│   │   │   ├── CourseForm.vue
│   │   ├── cases                   # 案例库管理模块
│   │   │   ├── CaseLibrary.vue
│   │   │   ├── CaseDetail.vue
│   │   │   ├── CaseForm.vue
│   │   ├── profile                 # 个人资料模块
│   │   │   ├── index.vue
│   │   ├── admin                   # 管理模块
│   │   │   ├── index.vue
│   │   │   ├── UserManagement.vue
│   │   │   ├── RoleManagement.vue
│   │   ├── reports                 # 报表管理模块
│   │   │   ├── Statistics.vue
│   │   │   ├── Usage.vue
│   ├── router
│   │   ├── index.js                # 路由配置
│   ├── App.vue                     # 主应用组件
│   ├── main.js                     # Vue 应用入口文件
`

1. 项目文件夹：
   - `src`：存放项目源代码的地方，通常包括以下子文件夹：
       - `assets`：存放项目所需的资源文件，如图片、音频、文本等。
       - `components`：存放项目所需的Vue组件。
       - `views`：存放项目所需的Vue视图。
       - `router`：存放项目路由配置。
       - `store`：存放项目状态管理配置。
       - `App.vue`：项目的主组件。
       - `main.js`：项目的JavaScript入口文件。
   - `public`：存放项目的静态资源文件，如HTML、CSS、JavaScript等。
       - `index.html`：项目的入口文件。
   - `tests`：存放项目测试代码。
   - `package.json`：项目的npm包文件。
   - `README.md`：项目 README 文件。
   - `.gitignore`：项目gitignore文件。

2. 项目源代码文件夹结构：
   - `src/assets`：存放项目所需的资源文件，如图片、音频、文本等。
   - `src/components`：存放项目所需的Vue组件。
   - `src/views`：存放项目所需的Vue视图。
   - `src/router`：存放项目路由配置。
   - `src/store`：存放项目状态管理配置。
   - `src/App.vue`：项目的主组件。
   - `src/main.js`：项目的JavaScript入口文件。
   - `public`：存放项目的静态资源文件，如HTML、CSS、JavaScript等。
   - `public/index.html`：项目的入口文件。
   - `tests`：存放项目测试代码。
   - `package.json`：项目的npm包文件。
   - `README.md`：项目 README 文件。
   - `.gitignore`：项目gitignore文件。

## 安装依赖

```bash
npm install
```

## 运行项目

```bash
npm run dev
```