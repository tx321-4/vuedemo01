<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="6">
          <!--搜索区域-->
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryParams.query"
            @clear="getGoodsList"
            @keyup.enter.native="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="create">添加商品</el-button>
        </el-col>
      </el-row>
      <goods-table ref="goodstable" :loading="loading" :goodsList="goodsList">
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
          </template>
        </el-table-column>
      </goods-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.page"
        :limit.sync="queryParams.limit"
        @pagination="getGoodsList"
      />
    </el-card>
    <edit-dialog ref="editDialog" @updated="reload"></edit-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import GoodsTable from '@/components/goods/list/table'
import editDialog from '@/components/goods/list/editdialog'
import api from '@/api/goods'
export default {
  name: 'List',
  components: { GoodsTable, Pagination, editDialog },
  data () {
    return {
      queryParams: {
        query: '',
        page: 1, // 当前页
        limit: 20 // 分页大小
      },
      goodsList: [],
      total: 0,
      loading: false

    }
  },

  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      this.loading = true
      api.getGood(this.queryParams).then((res) => {
        this.goodsList = res.list
        this.total = res.total
        this.loading = false
      }).catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    create () {

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
            this.goodsList.splice(index, 1)
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
      const data = Object.assign({}, form)
      if (data.id) {
        const index = this.goodsList.findIndex(v => v.id === data.id)
        this.goodsList.splice(index, 1, data)
      } else {
        this.goodsList.unshift(data)
      }
    }
  }
}
</script>

<style lang="scss" scoped >
</style>
