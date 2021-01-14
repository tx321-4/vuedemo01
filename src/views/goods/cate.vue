<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row style="margin-bottom: 20px">
        <el-col>
          <el-button type="primary" @click="create">添加分类</el-button>
        </el-col>
      </el-row>
      <tree-table
        v-loading="loading"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <template slot="isok" scope="scope">
          <i v-if="!scope.row.cat_deleted" class="el-icon-success"></i>
          <i v-else class="el-icon-error"></i>
        </template>
        <template slot="order" scope="scope">
          <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag v-else-if="scope.row.cat_level == 1" type="success"
            >二级</el-tag
          >
          <el-tag v-else type="warning">三级</el-tag>
        </template>
        <template slot="operate" scope="{ row, $index }">
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top"
            :enterable="false"
          >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="edit(row)"
              >编辑</el-button
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
        </template>
      </tree-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.page"
        :limit.sync="queryParams.limit"
        @pagination="getCateList"
      />
    </el-card>
    <edit-dialog ref="editDialog" @updated="reload"></edit-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import editDialog from '@/components/goods/cate/editdialog'
import api from '@/api/cate'
export default {
  name: 'Catescape',
  components: { editDialog, Pagination },
  data () {
    return {
      queryParams: {

        page: 1, // 当前页
        limit: 20 // 分页大小
      },
      cateList: [],
      total: 0,
      loading: false,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isok'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        }, {
          label: '操作',
          type: 'template',
          template: 'operate'
        }
      ]
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    getCateList () {
      this.loading = true
      api.getCate(this.queryParams).then((res) => {
        this.cateList = res.list
        this.total = res.total
        this.loading = false
      }).catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
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
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
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

    reload (form) {
      // const data = Object.assign({}, form)
      // if (data.id) {
      //   const index = this.userList.findIndex(v => v.id === data.id)
      //   this.userList.splice(index, 1, data)
      // } else {
      //   this.userList.unshift(data)
      // }
    }
  }
}
</script>

<style lang="scss" scoped >
.el-icon-success {
  color: lightgreen;
}
.el-icon-error {
  color: red;
}
</style>
