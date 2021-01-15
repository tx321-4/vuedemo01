<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :xs="10" :sm="8" :md="7" :lg="5">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryParams.order_number"
            @clear="getOrderList"
            @keyup.enter.native="getOrderList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrderList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        v-loading="loading"
        :data="orderList"
        style="width: 100%"
        border
        stripe
        :header-row-style="{ background: ' #eef1f6', color: ' #1f2d3d' }"
      >
        <el-table-column
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column
          label="订单编号"
          prop="order_number"
          width="300px"
        ></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status === '0'"
              >未付款</el-tag
            >
            <el-tag type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time" width="200px">
          <template slot-scope="scope">
            <!--通过作用域插槽的形式 调用时间过滤器-->
            {{ scope.row.create_time | parseTime("{y}-{m}-{d} {h}:{i}") }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="修改"
              placement="top"
              :enterable="false"
            >
              <!--修改按钮-->
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>
            <!--地址按钮-->
            <el-tooltip
              class="item"
              effect="dark"
              content="物流"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                size="mini"
                icon="el-icon-location"
                @click="setwuliuShow = true"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.page"
        :limit.sync="queryParams.limit"
        @pagination="getOrderList"
      />
    </el-card>
    <el-dialog title="物流进度" :visible.sync="setwuliuShow" width="400px">
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination'
import api from '@/api/order'
import { parseTime } from '@/utils'
export default {
  name: 'Order',
  components: { Pagination },
  filters: {
    parseTime: parseTime
  },
  data () {
    return {
      queryParams: {
        order_number: '',
        page: 1, // 当前页
        limit: 20 // 分页大小
      },
      orderList: [],
      total: 0,
      loading: false,
      setwuliuShow: false,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  },

  mounted () {

  },
  created () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      this.loading = true
      api.getOrder(this.queryParams).then((res) => {
        this.orderList = res.list
        this.total = res.total
        this.loading = false
      }).catch((err) => {
        this.loading = false
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped >
</style>
