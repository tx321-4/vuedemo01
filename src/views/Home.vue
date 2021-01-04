<template>
  <el-container class="home-container">
    <el-header>
      Header
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    logout () {
      this.$store.dispatch('logout', this.LoginData).then(() => { }).catch((err) => {
        console.log(err)
      })
    }
  }

}
</script>
<style scoped lang="scss">
.home-container {
  height: 100%;
}
.el-header {
  background: #373d41;
  color: #fff;
}
.el-aside {
  background: #333744;
}
.el-main {
  background: #eaedf1;
}
</style>
