<template>
  <el-container class="index-container">
    <el-header class="index-header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="16" class="header-center">
          <div class="grid-content bg-purple-light">电商后台管理系统</div>
        </el-col>
        <el-col :span="4" class="header-right">
          <div class="grid-content bg-purple">
            <el-button type="danger" size="small" @click="loginout">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="index-aside">Aside</el-aside>
      <el-main class="index-main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    loginout() {
      this.$confirm("你确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.sessionStorage.removeItem('token');
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message.error("你真好");
          
        });
    }
  },
  
};
</script>
<style>
.index-container {
  height: 100%;
}
.index-header {
  height: 60px;
  background-color: #b3c0d1;
  line-height: 60px;
}
.index-aside {
}
.index-main {
  background-color: #e9eef3;
}
.header-center {
  text-align: center;
  font-size: 30px;
  color: #fff;
  font-weight: 700;
}
.header-right {
  text-align: right;
}
</style>