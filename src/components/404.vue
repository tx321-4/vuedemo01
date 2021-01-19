<template>
  <div>
    <div class="pic-404">
      <el-row>
        <img class="pic-404__parent" src="@/assets/404.png" alt="404" />
      </el-row>
      <el-row>
        <router-link to="/">
          <el-button type="primary" round style="margin-top: 50px"
            >回到主页</el-button
          >
        </router-link>
      </el-row>
    </div>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
.pic-404 {
  text-align: center;
  padding-top: 80px;
}
</style>
