<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    :append-to-body="inDialog"
    @open="openDialog"
    @close="closeDialog"
    width="400px"
    :close-on-click-modal="false"
  >
    <div v-loading="loading">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="90px"
        status-icon
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model.trim="form.roleName" :disabled="isEdit"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model.trim="form.roleDesc"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" v-loading="loading">
      <el-button type="primary" @click="save(0)" :loading="loading"
        >保存</el-button
      >
      <el-button @click="show = false">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import api from '@/api/roles'
const formInit = {
  id: null,
  roleName: '',
  roleDesc: ''
}
export default {
  name: 'EditDialog',
  data () {
    return {
      resolve: null,
      show: false,
      updated: false,
      loading: false,
      form: { ...formInit },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isEdit () {
      return !!this.form.id
    },
    title () {
      let title = '角色'
      if (this.isEdit) {
        title += '修改'
      } else {
        title += '添加'
      }
      return title
    }
  },
  methods: {

    save (state = 0) {
      this.$refs.form.validate(valid => {
        if (valid) {
          api.save(this.form).then((res) => {
            this.$message.success('提交成功')
            this.updated = true
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.$message.error('提交失败')
          return false
        }
      })
    },
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
        this.$emit('updated', this.form)
      }
      this.resetFields()
    },
    initData (data) {
      this.assgin(data)
      this.clearValidate()
    },
    assgin (data) {
      this.form = { ...this.form, ...data }
      return this
    },
    resetFields () {
      this.updated = false
      this.form = { ...formInit }
      this.clearValidate()
      return this
    },
    clearValidate () {
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    }
  }
}
</script>

<style>
</style>
