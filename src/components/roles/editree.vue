<template>
  <el-dialog
    title="分配权限"
    width="50%"
    :visible.sync="show"
    :append-to-body="inDialog"
    @open="openDialog"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
    <div v-loading="loading">
      <el-tree
        :data="Tree.rightsList"
        :props="treeProps"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="Tree.defKeys"
        ref="treeRef"
      ></el-tree>
    </div>
    <div slot="footer" v-loading="loading">
      <el-button type="primary" @click="allotRigths" :loading="loading"
        >保存</el-button
      >
      <el-button @click="show = false">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'EditTree',
  data () {
    return {
      resolve: null,
      show: false,
      updated: false,
      loading: false,
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      Tree: {
        rightsList: [],
        defKeys: []// 默认选中的节点ID值数组
      }

    }
  },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }

  },

  methods: {
    open () {
      this.show = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
      })
    },
    close () { },
    openDialog () {
      this.$nextTick(() => {
        if (this.resolve) {
          this.resolve(this)
        }
      })
    },
    closeDialog () {
      if (this.updated) {
        this.$emit('updated')
      }
      this.Tree.defKeys = []
    },
    initData (data) {
      this.assgin(data)
    },
    assgin (data) {
      this.Tree = { ...this.Tree, ...data }
    },
    allotRigths () {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      console.log(keys)
      // const idStr = keys.join(',')
      this.$message.success('更新角色权限成功！')
    }

  }

}
</script>

<style>
</style>
