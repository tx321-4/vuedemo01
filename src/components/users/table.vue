<template>
  <el-table
    v-loading="loading"
    :data="userList"
    style="width: 100%"
    border
    stripe
    :header-row-style="{ background: ' #eef1f6', color: ' #1f2d3d' }"
  >
    <el-table-column type="index" label="#" align="center"></el-table-column>
    <el-table-column prop="username" label="姓名"></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column prop="role_name" label="角色"></el-table-column>
    <el-table-column prop="mg_state" label="状态">
      <template slot-scope="scope">
        <el-switch
          v-model="scope.row.mg_state"
          @change="userStateChanged(scope.row)"
        ></el-switch>
      </template>
    </el-table-column>
    <!-- slot[column] -->
    <slot name="column"></slot>
    <!-- / slot[column] -->
  </el-table>
</template>

<script>

export default {
  name: 'UsersTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    userList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    userStateChanged (row) {
      this.$emit('usersStatechanged', row)
    }
  }
}
</script>

<style>
</style>
