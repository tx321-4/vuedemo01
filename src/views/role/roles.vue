<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :xs="10" :sm="8" :md="7" :lg="5">
          <el-input
            placeholder="请输入角色名称"
            clearable
            v-model="queryParams.roleName"
            @clear="getRoleList"
            @keyup.enter.native="getRoleList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getRoleList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :xs="10" :sm="8" :md="7" :lg="5">
          <el-button type="primary" @click="create">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        :data="roleList"
        style="width: 100%"
        border
        stripe
        :header-row-style="{ background: ' #eef1f6', color: ' #1f2d3d' }"
      >
        <!--展开列-->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', i1 == 0 ? 'bdtop' : ' ']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row.children, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>

              <!-- 渲染二级权限和三级权限 -->
              <el-col :span="19">
                <!--通过for循环嵌套渲染二级权限-->
                <el-row
                  :class="[i2 == 0 ? '' : 'bdtop']"
                  v-for="(item2, i2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(item1.children, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      closable
                      @close="removeRightById(item2.children, item3.id)"
                      :key="item3.id"
                      type="warning"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>

        <el-table-column label="操作" align="center">
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
                >修改</el-button
              >
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
                >删除</el-button
              >
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-setting"
                @click="createRights(row)"
                >分配权限</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.page"
        :limit.sync="queryParams.limit"
        @pagination="getRoleList"
      />
    </el-card>
    <edit-dialog ref="editDialog" @updated="reload"></edit-dialog>
    <edit-tree ref="editTree"></edit-tree>
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import editDialog from '@/components/roles/editdialog'
import editTree from '@/components/roles/editree'
import api from '@/api/roles'
export default {
  name: 'Roles',
  components: { editDialog, Pagination, editTree },
  data () {
    return {
      roleList: [],
      total: 0,
      queryParams: {
        roleName: '',
        page: 1, // 当前页
        limit: 20 // 分页大小
      },
      loading: false,
      defKeys: []// 权限的id
    }
  },
  created () {
    this.getRoleList()
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
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
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
            this.roleList.splice(index, 1)
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
    getRoleList () {
      this.loading = true
      api.getRole(this.queryParams).then((res) => {
        this.roleList = res.list
        this.total = res.total
        this.loading = false
      }).catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    reload (form) {
      const data = Object.assign({}, form)
      if (data.id) {
        const index = this.roleList.findIndex(v => v.id === data.id)
        this.roleList.splice(index, 1, data)
      } else {
        this.roleList.unshift(data)
      }
    },
    // 删除权限标签
    removeRightById (row, id) {
      console.log(row)
      console.log(id)
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.rightsDel({ id: id }).then((res) => {
          if (res.code == 200) {
            this.$notify({
              message: '删除成功',
              type: 'success',
              duration: 2000
            })

            const index = row.findIndex(v => v.id === id)
            row.splice(index, 1)
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

    // 打开分配权限弹窗
    createRights (role) {
      this.$refs.editTree.open().then(that => {
        api.getRightree(role.id).then((res) => {
          this.getLeafKeys(role, this.defKeys)
          that.initData({ rightsList: res.list, defKeys: this.defKeys })
        })
      })
    },
    // 通过递归的形式，获取角色下所有三级权限的id，并保存到defKeys数组中
    getLeafKeys (node, arr) { // 节点 数组
      // 如果当前node节点不包含children属性，则是三级权限节点
      if (!node.children) {
        return arr.push(node.id)
      }
      // 循环node里的children数组，每循环一项拿到一个子节点item，在根据item再次调用递归函数getLeafKeys，
      // 然后把当前的item当做一个节点传进去，同时把arr传进去。只要递归完毕后，就把三级节点的id都保存到arr了
      node.children.forEach(item => this.getLeafKeys(item, arr))
    }

  }
}
</script>

<style lang="scss" >
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
