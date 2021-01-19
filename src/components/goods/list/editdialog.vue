<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    :append-to-body="inDialog"
    @open="openDialog"
    @close="closeDialog"
    width="50%"
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
        <el-form-item label="商品名称" prop="goods_name">
          <el-input
            v-model.trim="form.goods_name"
            :disabled="isEdit"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goods_price">
          <el-input v-model.trim="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goods_number">
          <el-input v-model.trim="form.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" prop="goods_weight">
          <el-input v-model.trim="form.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" prop="goods_introduce">
          <el-input
            type="textarea"
            v-model.trim="form.goods_introduce"
            :rows="3"
          ></el-input>
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
import api from '@/api/goods'
const formInit = {
  id: null,
  goods_name: '',
  goods_price: '',
  goods_number: '',
  goods_weight: '',
  goods_introduce: '',
  goods_cat: []
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
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_introduce: [
          { required: true, message: '请输入商品介绍', trigger: 'blur' }
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
      let title = '商品'
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
