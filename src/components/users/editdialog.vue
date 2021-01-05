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
        label-width="70px"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="form.username" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input
            ref="password"
            :type="passwordType"
            v-model.trim="form.password"
          >
            <i
              slot="suffix"
              class="el-input__icon"
              :class="
                passwordType === 'password' ? 'el-icon-lock' : 'el-icon-unlock'
              "
              @click="showPwd"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model.trim="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" v-loading="loading">
        <el-button type="primary" @click="save(0)" :loading="loading"
          >保存</el-button
        >
        <el-button @click="show = false">关 闭</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import api from '@/api/users'
const formInit = {
  id: null,
  username: '',
  password: '',
  email: '',
  mobile: ''
}
export default {
  name: 'EditDialog',
  data () {
    var checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-].)+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return callback()
      }
      callback(new Error('请输入合法的邮箱'))
    }
    // 验证手机的规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[0-9]{10}$/
      if (regMobile.test(value)) {
        // 合法的手机
        return callback()
      }
      callback(new Error('请输入合法的手机号'))
    }
    return {
      resolve: null,
      show: false,
      updated: false,
      loading: false,
      form: { ...formInit },
      passwordType: 'password',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
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
      let title = '用户'
      if (this.isEdit) {
        title += '修改'
      } else {
        title += '添加'
      }
      return title
    }
  },
  methods: {
    showPwd () {
      var Type = this.passwordType === 'password' ? 'text' : 'password'
      this.passwordType = Type
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
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
