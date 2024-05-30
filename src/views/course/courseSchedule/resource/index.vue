<template>
  <div class="resources-page">
    <!-- 标题 -->
    <h2>课程资料</h2>
    <hr />

    <!-- 搜索和操作栏 -->
    <div class="search-bar">
      <div class="left-section">
        <el-input
          v-model="searchText"
          placeholder="搜索资料"
          class="search-input"
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchResources"
        ></el-button>
      </div>

      <div class="right-section">
        <el-dropdown trigger="click" @command="handleAddResource">
          <el-button type="primary">添加资料</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="local">本地上传</el-dropdown-item>
            <el-dropdown-item command="cloud">云盘资源</el-dropdown-item>
            <el-dropdown-item command="url">添加网址</el-dropdown-item>
            <el-dropdown-item command="library">在线图书</el-dropdown-item>
            <el-dropdown-item command="video">在线视频</el-dropdown-item>
            <el-dropdown-item command="special">收藏的专题</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" @click="showCreateFolderDialog"
          >新建文件夹</el-button
        >
      </div>
    </div>

    <!-- 资料表格 -->
    <el-table
      :data="filteredResources"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      ref="resourceTable"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="文件名" width="200">
        <template slot-scope="scope">
          <el-icon :class="getFileIcon(scope.row.name)"></el-icon>
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小" width="100"></el-table-column>
      <el-table-column
        prop="uploader"
        label="上传者"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="创建日期"
        width="150"
      ></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="deleteResource(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-download"
            @click="downloadResource(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-folder-add"
            @click="saveResource(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 批量操作 -->
    <div class="bulk-actions">
      <el-checkbox v-model="selectAll" @change="handleSelectAll"
        >全选</el-checkbox
      >
      <span class="bulk-action" @click="bulkDelete">批量删除</span>
      <span class="bulk-action" @click="bulkDownload">批量下载</span>
      <span class="bulk-action" @click="bulkMove">批量移动</span>
    </div>

    <!-- 新建文件夹对话框 -->
    <el-dialog title="新建文件夹" :visible.sync="createFolderDialogVisible">
      <el-input
        v-model="newFolderName"
        placeholder="请输入文件夹名称"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createFolderDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createFolder">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      addResourceVisible: false,
      createFolderDialogVisible: false,
      newFolderName: "",
      selectAll: false,
      selectedRows: [],
      resources: [
        {
          name: "文件夹1",
          size: "-",
          uploader: "王老师",
          date: "2024-05-01",
          type: "folder",
        },
        {
          name: "文档.docx",
          size: "10MB",
          uploader: "李老师",
          date: "2024-05-02",
          type: "doc",
        },
        {
          name: "文本.txt",
          size: "5KB",
          uploader: "张老师",
          date: "2024-05-03",
          type: "txt",
        },
        // 其他资料
      ],
      filteredResources: [],
    };
  },
  created() {
    this.filteredResources = this.resources;
  },
  methods: {
    searchResources() {
      this.filteredResources = this.resources.filter((resource) => {
        return resource.name.includes(this.searchText);
      });
    },
    showAddResourceDialog() {
      this.addResourceVisible = true;
    },
    handleAddResource(command) {
      console.log(`添加资料方式: ${command}`);
      // 根据不同的命令执行不同的操作
    },
    showCreateFolderDialog() {
      this.createFolderDialogVisible = true;
    },
    createFolder() {
      if (this.newFolderName.trim() === "") {
        this.$message.warning("文件夹名称不能为空");
        return;
      }
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

      this.resources.push({
        name: this.newFolderName,
        size: "-",
        uploader: "当前用户", // 替换为实际的当前用户
        date: formattedDate,
        type: "folder",
      });
      this.newFolderName = "";
      this.createFolderDialogVisible = false;
      this.searchResources(); // 更新过滤后的资源列表
    },
    deleteResource(index, row) {
      this.resources.splice(index, 1);
      this.searchResources();
    },
    downloadResource(row) {
      console.log(`下载资料: ${row.name}`);
      // 下载资料的逻辑
    },
    saveResource(row) {
      console.log(`保存资料: ${row.name}`);
      // 保存资料的逻辑
    },
    handleSelectAll(value) {
      this.$refs.resourceTable.toggleAllSelection();
    },
    handleSelectionChange(val) {
      this.selectedRows = val;
    },
    bulkDelete() {
      console.log("批量删除");
      this.selectedRows.forEach((row) => {
        const index = this.resources.indexOf(row);
        if (index > -1) {
          this.resources.splice(index, 1);
        }
      });
      this.searchResources();
    },
    bulkDownload() {
      console.log("批量下载");
      this.selectedRows.forEach((row) => {
        this.downloadResource(row);
      });
    },
    bulkMove() {
      console.log("批量移动");
      // 批量移动逻辑
    },
    getFileIcon(filename) {
      if (filename.includes("folder")) return "el-icon-folder";
      if (filename.endsWith(".docx")) return "el-icon-document";
      if (filename.endsWith(".txt")) return "el-icon-tickets";
      return "el-icon-document"; // 默认图标
    },
  },
};
</script>

<style scoped>
.resources-page {
  padding: 20px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.left-section {
  display: flex;
  align-items: center;
}

.search-input {
  width: 200px;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bulk-actions {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.bulk-actions .el-checkbox {
  margin-right: 20px;
}

.bulk-actions .bulk-action {
  margin-right: 20px;
  cursor: pointer;
  color: #409eff;
}
</style>
