<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container style="overflow: auto">
      <el-aside :width="isCollapse ? '64px' : '200px'" style="overflow: hidden">
        <div class="toggle-button" @click="toggleCollapse">
          <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
        </div>
        <el-scrollbar class="_scroll">
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
            :default-active="$route.path"
          >
            <el-submenu
              :index="item.id + ''"
              v-for="item in menuList"
              :key="item.id"
            >
              <template slot="title">
                <i :class="iconsObject[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item
                :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import api from '@/api/menu'
export default {
  name: 'Home',
  data () {
    return {
      menuList: [],
      iconsObject: { // 一级菜单图标对象 125 103这些是menuList一级菜单的id
        125: 'el-icon-user-solid',
        103: 'el-icon-lock',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-platform'
      },
      isCollapse: false
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    getMenuList () {
      api.getMenu().then((res) => {
        this.menuList = res.list
      }).catch((err) => {
        console.log(err)
      })
    },
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      border-radius: 50px;
      overflow: hidden;
      border: 1px solid #373d41;
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background: #333744;

  .el-menu {
    border-right: none;
    i {
      margin-right: 10px;
    }
  }
  .toggle-button {
    background: #4a5064;
    color: #fff;
    font-size: 20px;
    line-height: 45px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }
}
.el-main {
  background: #eaedf1;
}

._scroll {
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: auto;
  }
}
</style>
