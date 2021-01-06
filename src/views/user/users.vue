<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :xs="10" :sm="8" :md="7" :lg="5">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryParams.username"
            @clear="getUserList"
            @keyup.enter.native="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :xs="10" :sm="8" :md="7" :lg="5">
          <el-button type="primary" @click="create">添加用户</el-button>
        </el-col>
      </el-row>
      <users-table
        ref="userstable"
        :loading="loading"
        :userList="userList"
        @usersStatechanged="userStateChanged"
      >
        <el-table-column
          slot="column"
          label="操作"
          align="center"
          width="200px"
        >
          <template slot-scope="{ row, $index }">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="edit(row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="del(row, $index)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-setting"
                @click="setRole(row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </users-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.page"
        :limit.sync="queryParams.limit"
        @pagination="getUserList"
      />
    </el-card>
    <edit-dialog ref="editDialog" @updated="reload"></edit-dialog>
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleShow"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <div>
        <p>当前的用户：{{ userInfo.username }}</p>
        <p>当前的角色：{{ userInfo.role_name }}</p>
        <p>
          分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择" clearable>
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleShow = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import UsersTable from '@/components/users/table'
import editDialog from '@/components/users/editdialog'
import api from '@/api/users'
export default {
  name: 'Users',
  components: { UsersTable, editDialog, Pagination },
  data () {
    return {
      userList: [],
      total: 0,
      queryParams: {
        username: '',
        page: 1, // 当前页
        limit: 20 // 分页大小
      },
      loading: false,
      setRoleShow: false,
      rolesList: [], // 所有角色列表数组
      userInfo: {},
      selectedRoleId: '' // 已选中的角色id值
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    create () {
      this.$refs.editDialog.open().then(that => {

      })
    },
    edit (row) {
      this.$refs.editDialog.open().then(that => {
        that.initData(row)
      })
    },
    del (row, index) {
      const data = Object.assign({}, row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.del({ id: data.id }).then((res) => {
          if (res.code == 200) {
            this.$notify({

              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.userList.splice(index, 1)
          } else {
            this.$notify({

              message: '删除失败',
              type: 'error',
              duration: 2000
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getUserList () {
      this.loading = true
      api.getUser(this.queryParams).then((res) => {
        this.userList = res.list
        this.total = res.total
        this.loading = false
      }).catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    userStateChanged (row) {
      const userinfo = Object.assign({}, row)
      // console.log(userinfo)
      api.userStateChanged(userinfo).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: '操作Success',
            type: 'success'
          })
        } else {
          this.$message.error(
            '操作Success'
          )
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    reload (form) {
      const data = Object.assign({}, form)
      if (data.id) {
        const index = this.userList.findIndex(v => v.id === data.id)
        this.userList.splice(index, 1, data)
      } else {
        this.userList.unshift(data)
      }
    },
    setRole (userInfo) {
      // console.log(userInfo)
      this.userInfo = userInfo
      api.getRoles().then((res) => {
        this.rolesList = res.list
      })
      this.setRoleShow = true
    },
    editUserInfo () {
      if (!this.selectedRoleId) {
        return this.$message.error('请选择要分配的角色')
      }
      this.$message.success('分配角色成功！')
    },
    // 监听 分配角色对话框的关闭事件
    setRoleDialogClosed () {
      this.selectedRoleId = ''
      this.userInfo = {}
    }
  }
}
</script>

<style lang="scss" scoped >
</style>
