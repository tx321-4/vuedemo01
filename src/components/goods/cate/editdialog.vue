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
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model.trim="form.cat_name" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" prop="password">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChanged"
            clearable
            style="width: 100%"
          ></el-cascader>
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
import api from '@/api/cate'
const formInit = {
  id: null,
  cat_name: '', // 将要添加的分类名称
  cat_pid: 0, // 父分类的ID
  cat_level: 0 // 要添加分类的等级，默认要添加的是一级分类
}
export default {
  name: 'EditDialog',
  data () {
    return {
      resolve: null,
      show: false,
      updated: false,
      loading: false,
      parentCateList: [],
      cascaderProps: {
        expandTrigger: 'hover', // 次级菜单的展开方式 click / hover
        checkStrictly: true, // 允许选择任意一级的选项
        value: 'id', // 指定选中值的属性
        label: 'cat_name', // 指定选中标签的名称
        children: 'children' // 指定父子嵌套的属性
      },
      // 选中的父级分类的ID数组
      selectedKeys: [],
      form: { ...formInit },

      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
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
      let title = '商品分类'
      if (this.isEdit) {
        title += '编辑'
      } else {
        title += '添加'
      }
      return title
    }
  },
  methods: {
    // 选择项发生变化时触发这个函数
    parentCateChanged () {
      // 如果 selectedKeys 数据中的 length 大于0，则证明选中了父级分类
      // 反之，就说明没有选中任何父级分类
      if (this.selectedKeys.length > 0) {
        // 选择最后一项当作父分类ID赋值
        this.form.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        // 为当前要添加的分类的等级赋值
        this.form.cat_level = this.selectedKeys.length
      } else {
        // 父分类ID赋值
        this.form.cat_pid = 0
        // 为当前要添加的分类的等级赋值
        this.form.cat_level = 0
      }
      console.log(this.form)
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
    getCateList () {
      api.getCate(this.queryParams).then((res) => {
        this.parentCateList = res.list
      }).catch((err) => {
        console.log(err)
      })
    },
    open () {
      this.show = true
      this.getCateList()
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
