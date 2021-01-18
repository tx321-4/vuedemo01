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
        label-width="100px"
        status-icon
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model.trim="form.attr_name"></el-input>
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
import api from '@/api/params'
const formInit = {
  id: null,
  attr_name: '' // 将要添加的分类名称

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
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
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
    // 动态计算添加参数对话框标题的文本
    titleText () {
      if (this.form.activeName === 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
    },
    title () {
      let title = this.titleText

      if (this.isEdit) {
        title += '编辑'
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
