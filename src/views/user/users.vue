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
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :xs="10" :sm="8" :md="7" :lg="5">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="userList"
        style="width: 100%"
        border
        stripe
        :header-row-style="{ background: ' #eef1f6', color: ' #1f2d3d' }"
      >
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
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
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

import api from '@/api/users'
export default {
  name: 'Users',
  data () {
    return {
      userList: [],
      total: 0,
      queryParams: {
        username: '',
        page: 1, // 当前页
        limit: 20 // 分页大小
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      api.getUser(this.queryParams).then((res) => {
        this.userList = res.list
        this.total = res.total
      })
    }
  }
}
</script>

<style lang="scss" scoped >
</style>
