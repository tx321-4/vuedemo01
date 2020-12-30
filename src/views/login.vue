<template>
  <div class="login-container">
    <div class="login_box">
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form :model="LoginData" class="login-form">
        <el-form-item>
          <el-input
            placeholder="请输入账户"
            name="username"
            type="text"
            v-model.trim="LoginData.username"
          >
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入密码"
            name="password"
            ref="password"
            :type="passwordType"
            v-model.trim="LoginData.password"
          >
            <i slot="prefix" class="el-input__icon el-icon-key"></i>
            <i
              slot="suffix"
              class="el-input__icon"
              :class="
                passwordType === 'password' ? 'el-icon-lock' : 'el-icon-unlock'
              "
              @click="showPwd"
            ></i>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      LoginData: {
        username: '',
        password: ''
      },
      passwordType: 'password'
    }
  },
  methods: {
    showPwd () {
      var Type = this.passwordType === 'password' ? 'text' : 'password'
      this.passwordType = Type
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(91deg, #f1eefc, #9dc6ff 70%, #a5bcff);
  .login_box {
    border-radius: 5px;
    margin: auto;
    position: fixed;
    top: 0;
    bottom: 0;
    box-sizing: border-box;
    right: 10%;
    height: 288px;
    width: 330px;
    padding: 20px 35px 20px;
    background: #fff;
    border: 1px solid #eaeaea;
    .logo {
      width: 100px;
      height: 100px;
      position: absolute;
      top: -50px;
      right: 50%;
      left: 50%;
      margin-left: -50px;
      overflow: hidden;
      background: #fff;
      border-radius: 50%;
      border: 5px solid #fff;
      box-sizing: border-box;
      box-shadow: 0 4px 4px #ddd;
      img {
        width: 100%;
      }
    }
    .login-form {
      padding-top: 48px;
    }
  }
}
</style>
