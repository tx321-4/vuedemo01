<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <!--警告提示区域-->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      ></el-alert>

      <!--步骤条区域-->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!--tab栏区域-->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClicked"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <!--选择商品分类的级联选择框-->
              <!-- options用来指定数据源  props用来指定配置对象  value/v-model选中项绑定值-->
              <el-cascader
                v-model="addForm.goods_cat"
                :options="cateList"
                :props="cateProps"
                @change="cateChanged"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的item项 -->
            <el-form-item
              v-for="item in manyTableData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <!--复选框组-->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="cb"
                  v-for="(cb, i) in item.attr_vals"
                  :key="i"
                  border
                  size="small"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              v-for="item in onlyTableData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!--上传组件-->
            <!--action 表示图片要上传到的后台API地址-->
            <el-upload
              :action="uploadURL"
              list-type="picture"
              :headers="headerObj"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!--富文本编辑器组件-->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <!--添加商品按钮-->
            <el-button type="primary" @click="addGoods" class="btnAdd"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!--图片预览对话框-->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <!--内容主体区域-->
      <img width="100%" :src="picUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/goods'
import apiCate from '@/api/cate'
import apiAprams from '@/api/params'
export default {
  name: 'GoodsAdd',
  data () {
    return {
      activeIndex: '0', // 当前激活的索引
      // 添加商品的表单数据对象
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [], // 商品所属的分类数据,
        pics: [], // 图片的数组
        goods_introduce: '', // 商品的详情描述
        attrs: [] // 商品参数属性
      },
      // 添加商品表单的验证规则对象
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],

        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      cateList: [], // 商品分类列表数据
      // 指定级联选择框的配置对象
      cateProps: {
        expandTrigger: 'hover', // 次级菜单的展开方式 click / hover
        value: 'id', // 指定选中值的属性
        label: 'cat_name', // 指定选中标签的名称
        children: 'children' // 指定父子嵌套的属性
      },
      manyTableData: [], // 动态参数的数据列表
      onlyTableData: [], // 静态属性的数据列表
      // 图片上传组件的headers请求头对象
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      uploadURL: '/upload/img',
      previewVisible: false,
      picUrl: ''
    }
  },
  computed: {
    // 当前选中的三级分类ID
    cateId () {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    getCateList () {
      apiCate.getCate().then((res) => {
        this.cateList = res.list
      }).catch((err) => {
        console.log(err)
      })
    },
    // 级联选择框选中项变化，会触发这个函数
    cateChanged () {
      // 证明选中的不是三级分类
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [] // 清空级联选择框的数据
      }
      // 证明选中的是三级分类
      console.log(this.addForm.goods_cat)
    },
    // 阻止标签切换
    beforeTabLeave (activeName, oldActiveName) {
      //   console.log('即将离开的标签页名字是' + oldActiveName)
      //   console.log('即将进入的标签页名字是' + activeName)
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    // tab 被选中时触发
    tabClicked () {
      // console.log(this.activeIndex)
      // 证明访问的时动态参数面板
      if (this.activeIndex === '1') {
        apiAprams.getAttributes({ sel: 'many' }).then((res) => {
          // 循环data中的每一项，把attr_vals参数的字符串，重新赋值为item.attr_vals数组
          res.list.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(/\s+/) : []
          })
          this.manyTableData = res.list
        }).catch((err) => {
          console.log(err)
        })
      } else if (this.activeIndex === '2') {
        apiAprams.getAttributes({ sel: 'only' }).then((res) => {
          this.onlyTableData = res.list
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    // 监听图片上传成功的事件
    handleSuccess (response) {
      console.log(response)
      // 1.拼接得到一个图片信息对象
      const picInfo = { pic: response.data.tmp_path }
      // 2.将图片信息对象，push到pics组数中
      this.addForm.pics.push(picInfo)
      console.log(this.addForm)
    },
    // 处理移除图片的操作
    handleRemove (file) {
      // console.log(file)
      // 1.获取将要删除的图片的临时路径
      const filePaht = file.response.data.tmp_path
      // 2.从 pics 数组中，找到这个图片对应的索引值
      const i = this.addForm.pics.findIndex(x => x.pic === filePaht) // x 代表数组的每一项
      // 3.调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
      this.addForm.pics.splice(i, 1)
      console.log(this.addForm)
    },
    // 处理图片预览效果
    handlePreview (file) {
      console.log(file)
      this.picUrl = file.url
      this.previewVisible = true
    },
    addGoods () {
      this.$refs.addFormRef.validate(valid => {
        if (valid) {
          // 执行添加的业务逻辑

          this.addForm.goods_cat = this.addForm.goods_cat.join(',')

          this.manyTableData.forEach(item => {
            const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals.join(' ') }
            this.addForm.attrs.push(newInfo)
          })
          // 处理静态属性
          this.onlyTableData.forEach(item => {
            this.addForm.attrs.push({ attr_id: item.attr_id, attr_value: item.attr_vals })
          })
          console.log(this.addForm)
          api.Goodsave(this.addForm).then((res) => {
            this.$message.success('添加商品成功!')
            // 路由导航对象.push函数，跳转到指定的路由页面
            this.$router.push('/goods')
          }).catch((err) => {
            console.log(err)
          })
          // this.$store.dispatch('login', this.LoginData).then(() => {
          //   this.loading = false
          //   this.$router.push({ path: '/' })
          // }).catch((err) => {
          //   console.log(err)
          // })
        } else {
          this.$message.error('请填写必要的表单项')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.ql-editor {
  min-height: 300px;
}
</style>
<style lang="scss" scoped>
.el-steps {
  margin: 15px 0;
}
.el-step__title {
  font-size: 13px;
}
.el-checkbox {
  margin: 0 10px 0 0 !important;
}

.btnAdd {
  margin-top: 15px;
}
</style>
