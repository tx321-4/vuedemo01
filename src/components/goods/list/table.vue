<template>
  <el-table
    v-loading="loading"
    :data="goodsList"
    style="width: 100%"
    border
    stripe
    :header-row-style="{ background: ' #eef1f6', color: ' #1f2d3d' }"
  >
    <el-table-column type="index" label="#" align="center"></el-table-column>
    <el-table-column prop="goods_name" label="商品名称"></el-table-column>
    <el-table-column prop="goods_price" label="商品价格(元)"></el-table-column>
    <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
    <el-table-column prop="add_time" label="创建时间">
      <template slot-scope="scope">
        <!--通过作用域插槽的形式 调用时间过滤器-->
        {{ scope.row.add_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
      </template>
    </el-table-column>
    <!-- slot[column] -->
    <slot name="column"></slot>
    <!-- / slot[column] -->
  </el-table>
</template>

<script>

import { parseTime } from '@/utils'
export default {
  name: 'Table',
  filters: {
    parseTime: parseTime
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    goodsList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style>
</style>
