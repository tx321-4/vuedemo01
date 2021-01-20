# vuedemo01

[线上Demo](http://sp.liumianti.top)

### 参考链接：
[原文转载：https://www.cnblogs.com/joe235/tag/elementUI/](https://www.cnblogs.com/joe235/tag/elementUI/)  

### 环境
* nodeJs 14.7.0
* vue 2.6
* vue-cli 3.0

### 项目介绍
vue 电商管理系统，主要用于学习、完善vue前端开发电商系统的基本流程以及功能，旨在了解vue前端开发中所遇到的问题，加强对vue、vuex、vue-router知识点的复习与巩固，


### 技术亮点
* 采用vue-cli3.0项目脚手架，结合elementUI 组件库 开发整套系统，可扩展性强
* 开启vue-router History 模式
* axios 封装统一处理接口，请求头部添加 token 验证，针对后端返回不同的状态码做出反馈
* 引入 MockJS 模拟后端接口，解决后端无开发、后端开发未同步的烦恼
* 安装丰富的依赖 用来完善页面上的功能
  * 【vue-table-with-tree-grid  树形表格】
  * 【Vue-Quill-Editor  富文本编辑器】
* 引入 echarts 数据可视化插件，显示数据报表
* webpack优化 引入  【compression-webpack-plugin 】打包文件体积压缩

### 功能
* 用户管理
  * 用户 【新增】、【修改】、【删除】、【分配角色】
* 权限管理
  * 角色 【新增】、【修改】、【删除】、【分配权限】
  * 权限 【查看】
* 商品管理
  * 商品 【新增】、【修改】、【删除】
  * 参数
    * 动态参数
    * 静态属性
  * 分类 【新增】、【修改】、【删除】
* 订单管理
  * 订单 【修改】、【物流】
* 数据统计
  * 报表

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```


