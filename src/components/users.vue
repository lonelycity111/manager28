<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my_breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 栅格布局 -->
    <el-row>
      <el-col :span="6">
        <!-- 搜索栏 -->
        <el-input
          placeholder="请输入内容"
          class="input-with-select"
          v-model="sendData.query"
          @keyup.native.enter="search"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <!-- 添加按钮 -->
        <el-button type="success" @click="addFormVisiable = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- table表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="scope.row.mg_state" @change="statusChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="delone(scope.row)"
          ></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
    <!-- 添加用户弹出框 -->
    <el-dialog title="收货地址" :visible.sync="addFormVisiable">
      <el-form
        :model="addform"
        label-position="right"
        label-width="80px"
        class="my-form"
        :rules="rules"
        status-icon
        ref="addForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="addform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="addform.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisiable = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkemail = (rule, value, callback) => {
      setTimeout(() => {
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确邮箱"));
        }
      }, 1000);
    };
    var checkmobile = (rule, value, callback) => {
      setTimeout(() => {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确手机号"));
        }
      }, 1000);
    };
    return {
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      tableData: [],
      addFormVisiable: false,
      addform: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 新增的表单数据验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkemail, trigger: "blur" }],
        mobile: [{ validator: checkmobile, trigger: "blur" }]
      }
    };
  },
  methods: {
    async search() {
      let res = await this.$http.get("users", {
        params: this.sendData
      });
      // console.log(res);
      this.tableData = res.data.data.users;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$http.post("users", this.addform);
          if (res.data.meta.status == 201) {
            this.search();
            this.addFormVisiable = false;
          }
          // console.log(res);
        } else {
          this.$message.warning("请输入正确的数据");
          return false;
        }
      });
    },
    delone(item) {
      console.log(item);
      this.$confirm("你确定要干掉它吗?", "提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "你真好",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$http.delete(`users/${item.id}`);
          if (res.data.meta.status == 200) {
              this.search();
          }
        })
        .catch(() => {

        });
    },
    async statusChange(item){
      let res = await this.$http.put(`users/${item.id}/state/${item.mg_state}`)
    }
  },
  async created() {
    this.search();
  }
};
</script>
<style>
.my_breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #fff;
  padding-left: 10px;
}
.my-form {
  height: auto;
  padding: 0;
}
</style>