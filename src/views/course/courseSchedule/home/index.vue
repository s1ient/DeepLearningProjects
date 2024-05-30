<template>
  <div class="home-page">
    <div class="header">
      <h3>{{ courseName }}</h3>
      <el-button type="primary" @click="openEditDialog">编辑目录</el-button>
    </div>
    <el-divider></el-divider>
    <div class="course-outline-box">
      <el-tree
        :data="courseOutline"
        :props="defaultProps"
        node-key="id"
        :expand-on-click-node="false"
        :highlight-current="true"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          {{ data.label }}
        </span>
      </el-tree>
    </div>

    <el-dialog title="编辑课程目录" :visible.sync="dialogVisible" width="50%">
      <el-tree
        :data="courseOutline"
        :props="defaultProps"
        node-key="id"
        :expand-on-click-node="false"
        :highlight-current="true"
        @node-click="handleNodeClick"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <el-input v-model="data.label" size="mini"></el-input>
          <el-button
            type="text"
            icon="el-icon-plus"
            @click.stop="addNode(data)"
          ></el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click.stop="removeNode(data)"
          ></el-button>
        </span>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveOutline">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      courseName: "课程名称", // 替换为实际课程名称
      courseOutline: [
        {
          id: 1,
          label: "第1章 第一单元",
          children: [
            { id: 1.1, label: "1.1 第一课时" },
            { id: 1.2, label: "1.2 第二课时" },
          ],
        },
        {
          id: 2,
          label: "第2章 第二单元",
          children: [
            { id: 2.1, label: "2.1 第一课时" },
            { id: 2.2, label: "2.2 第二课时" },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      dialogVisible: false,
    };
  },
  methods: {
    openEditDialog() {
      this.dialogVisible = true;
    },
    handleNodeClick(data) {
      console.log("node clicked", data);
    },
    addNode(data) {
      if (!data.children) {
        this.$set(data, "children", []);
      }
      const newId = Date.now();
      data.children.push({
        id: newId,
        label: `新课时 ${newId}`,
      });
    },
    removeNode(data) {
      const removeNodeRecursively = (nodes, id) => {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].id === id) {
            nodes.splice(i, 1);
            return true;
          }
          if (nodes[i].children && nodes[i].children.length) {
            if (removeNodeRecursively(nodes[i].children, id)) {
              return true;
            }
          }
        }
        return false;
      };
      removeNodeRecursively(this.courseOutline, data.id);
    },
    saveOutline() {
      console.log("保存课程目录", this.courseOutline);
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
.home-page {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-outline-box {
  border: 1px solid #dcdcdc;
  padding: 20px;
  border-radius: 5px;
}

.custom-tree-node {
  display: flex;
  align-items: center;
}

.custom-tree-node .el-input {
  margin-right: 10px;
}

.custom-tree-node .el-button {
  margin-left: 5px;
}
</style>
