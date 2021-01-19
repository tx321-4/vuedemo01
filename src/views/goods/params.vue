<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--警告区域-->
      <el-alert
        title="注意：只允许为第三季分类设置相关参数！"
        type="warning"
        show-icon
        :closable="false"
      ></el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!--选择商品分类的级联选择框-->
          <el-cascader
            v-model="selectedCateKeys"
            :options="cateList"
            :props="cateProps"
            @change="cateChanged"
            clearable
          ></el-cascader>
        </el-col>
        <el-col>
          <el-tabs v-model="activeName" @tab-click="handleTabClick">
            <el-tab-pane label="动态参数" name="many">
              <!--添加参数的按钮-->
              <el-button
                type="primary"
                size="mini"
                style="margin-bottom: 20px"
                :disabled="isBtnDisabled"
                @click="create"
                >添加参数</el-button
              >
              <!--动态参数表格-->
              <el-table :data="manyTableData" border stripe>
                <!--展开列-->
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-tag
                      v-for="(item, i) in scope.row.attr_vals"
                      :key="i"
                      closable
                      @close="handleClosed(scope.row, i)"
                      >{{ item }}</el-tag
                    >
                    <!--输入文本框-->
                    <el-input
                      class="input-new-tag"
                      v-if="scope.row.inputVisible"
                      v-model="scope.row.inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm(scope.row)"
                      @blur="handleInputConfirm(scope.row)"
                    ></el-input>
                    <!--添加的按钮-->
                    <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click="showInput(scope.row)"
                      >+ New Tag</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="参数名称" prop="attr_name">
                </el-table-column>
                <el-table-column label="操作">
                  <!-- 作用域插槽 -->
                  <template scope="{ row, $index }">
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-edit"
                      @click="edit(row)"
                      >编辑</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      @click="del(row, $index)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only">
              <!--添加属性的按钮-->
              <el-button
                type="primary"
                size="mini"
                style="margin-bottom: 20px"
                :disabled="isBtnDisabled"
                @click="create"
                >添加属性</el-button
              >
              <!--静态属性表格-->
              <el-table :data="onlyTableData" border stripe>
                <!--展开列-->
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-tag
                      v-for="(item, i) in scope.row.attr_vals"
                      :key="i"
                      closable
                      @close="handleClosed(scope.row, i)"
                      >{{ item }}</el-tag
                    >
                    <!--输入文本框-->
                    <el-input
                      class="input-new-tag"
                      v-if="scope.row.inputVisible"
                      v-model="scope.row.inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm(scope.row)"
                      @blur="handleInputConfirm(scope.row)"
                    ></el-input>
                    <!--添加的按钮-->
                    <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click="showInput(scope.row)"
                      >+ New Tag</el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column
                  label="属性名称"
                  prop="attr_name"
                ></el-table-column>
                <el-table-column label="操作">
                  <!-- 作用域插槽 -->
                  <template scope="{ row, $index }">
                    <el-button
                      size="mini"
                      type="primary"
                      icon="el-icon-edit"
                      @click="edit(row)"
                      >编辑</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      icon="el-icon-delete"
                      @click="del(row, $index)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
    <edit-dialog ref="editDialog" @updated="reload"></edit-dialog>
  </div>
</template>

<script>
import api from '@/api/cate'
import editDialog from '@/components/goods/params/editdialog'
import apiAprams from '@/api/params'
export default {
  name: 'Params',
  components: { editDialog },
  data () {
    return {
      cateList: [],
      // 指定级联选择框的配置对象
      cateProps: {
        expandTrigger: 'hover', // 次级菜单的展开方式 click / hover
        value: 'id', // 指定选中值的属性
        label: 'cat_name', // 指定选中标签的名称
        children: 'children' // 指定父子嵌套的属性
      },
      selectedCateKeys: [], // 级联选择框双向绑定 选中的商品分类的ID数组
      // 被激活的标签的名称，默认为many
      activeName: 'many',
      manyTableData: [], // 动态参数的数据列表
      onlyTableData: [], // 静态属性的数据列表
      inputVisible: false, // 控制按钮与文本框的切换显示
      inputValue: '' // 文本框中输入的内容
    }
  },
  computed: {
    // 如果按钮需要被禁用 则返回true，否则返回false
    isBtnDisabled () {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    getCateList () {
      api.getCate(this.queryParams).then((res) => {
        this.cateList = res.list
      }).catch((err) => {
        console.log(err)
      })
    },
    create () {
      this.$refs.editDialog.open().then(that => {
        that.initData({ activeName: this.activeName })
      })
    },
    edit (row) {
      this.$refs.editDialog.open().then(that => {
        that.initData(row, { activeName: this.activeName })
      })
    },
    // 级联选择框选中项变化，会触发这个函数
    cateChanged () {
      // 证明选中的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }
      // 证明选中的是三级分类
      console.log(this.selectedCateKeys)
      this.getParamsList()
    },
    // tab标签的点击事件处理函数
    handleTabClick () {
      // console.log(this.activeName)
      this.getParamsList()
    },
    getParamsList () {
      apiAprams.getAttributes({ sel: this.activeName }).then((res) => {
        // 循环data中的每一项，把attr_vals参数的字符串，重新赋值为item.attr_vals数组
        res.list.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(/\s+/) : []
          // 控制文本框的显示与隐藏
          item.inputVisible = false
          // 文本框中输入的值
          item.inputValue = ''
        })
        if (this.activeName === 'many') {
          this.manyTableData = res.list
        } else {
          this.onlyTableData = res.list
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    del (row, index) {
      const data = Object.assign({}, row)
      this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiAprams.del({ id: data.id }).then((res) => {
          if (res.code == 200) {
            this.$notify({
              message: '删除成功',
              type: 'success',
              duration: 2000
            })

            if (this.activeName === 'many') {
              this.manyTableData.splice(index, 1)
            } else {
              this.onlyTableData.splice(index, 1)
            }
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
      const data2 = {
        id: data.id ? data.id : 'xxx',
        attr_name: data.attr_name,
        sel: data.activeName ? data.activeName : data.sel
      }

      if (data2.sel === 'many') {
        const index = this.manyTableData.findIndex(v => v.id == data2.id)

        if (index !== -1) {
          this.manyTableData.splice(index, 1, data2)
        } else {
          this.manyTableData.push(data2)
        }
      } else {
        const index = this.onlyTableData.findIndex(v => v.id == data2.id)

        if (index !== -1) {
          this.onlyTableData.splice(index, 1, data2)
        } else {
          this.onlyTableData.push(data2)
        }
      }
    },
    // 文本框失去焦点或按下回车键时都会触发
    handleInputConfirm (row) {
      // trim() 去除字符串两端的空格
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
      }
      // 如果没有return，则证明输入的内容，需要做后续处理
      // console.log('ok')
      this.saveAttrVals(row)
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
    },
    // 根据索引删除对应参数的可选项
    handleClosed (row, i) {
      // console.log(row)
      // console.log(i)
      row.attr_vals.splice(i, 1)
      // 发起请求保存操作
      this.saveAttrVals(row)
    },
    saveAttrVals (row) {
      apiAprams.saveTag({ attr_name: row.attr_name, attr_sel: row.attr_sel, attr_vals: row.attr_vals.join(' ') }).then((res) => {
        if (res.code == 200) {
          this.$notify({
            message: '添加修改参数项成功！',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({

            message: '添加修改参数项失败！',
            type: 'error',
            duration: 2000
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '添加修改参数项失败！'
        })
      })
    },
    // 点击按钮展示文本输入框
    showInput (row) {
      row.inputVisible = true
      // 让文本框自动获得焦点
      // $nextTick 方法的作用：就是当页面上元素被重新渲染之后，才会执行回调中的代码
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped >
.cat_opt {
  margin: 15px 0;
}
.input-new-tag {
  width: 120px;
}
</style>
