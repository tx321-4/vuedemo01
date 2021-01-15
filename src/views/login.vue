<template>
  <div class="login-container">
    <div class="login_box">
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
      </div>
      <el-form
        :model="LoginData"
        class="login-form"
        ref="loginForm"
        :rules="Rules"
        auto-complete="on"
      >
        <el-form-item prop="username">
          <el-input
            placeholder="请输入账户"
            name="username"
            type="text"
            v-model.trim="LoginData.username"
          >
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            name="password"
            ref="password"
            :type="passwordType"
            v-model.trim="LoginData.password"
            min="6"
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
        <el-row class="identify" :gutter="20">
          <el-col style="width: 60%">
            <el-form-item prop="verifycode">
              <el-input
                ref="verifyCode"
                type="text"
                v-model.trim="LoginData.verifycode"
                placeholder="验证码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col style="display: flex">
            <div @click="refreshCode" style="margin-right: 5px">
              <identify :identify-code="identifyCode" />
            </div>
            <el-button type="text" @click="refreshCode" size="small"
              >看不清，换一张</el-button
            >
          </el-col>
        </el-row>
        <el-form-item style="display: flex; justify-content: center">
          <el-button type="primary" :loading="loading" @click="handleLogin"
            >登录</el-button
          >
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Identify from '@/components/identify'
export default {
  name: 'Login',
  components: {
    Identify
  },
  data () {
    const validateVerifycode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value !== this.identifyCode) {
        // console.log('validateVerifycode:', value)
        callback(new Error('验证码不正确'))
      } else {
        callback()
      }
    }
    return {
      LoginData: {
        username: 'admin',
        password: '123456',
        verifycode: ''
      },
      passwordType: 'password',
      identifyCodes: '1234567890',
      identifyCode: '1234',
      Rules: {
        username: [{ required: true, trigger: 'blur', message: '请输入账户' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        verifycode: [{ required: true, trigger: 'blur', validator: validateVerifycode }]
      },
      loading: false
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCode, 4)
  },
  methods: {
    showPwd () {
      var Type = this.passwordType === 'password' ? 'text' : 'password'
      this.passwordType = Type
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 生成随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成四位验证码
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      // console.log(this.identifyCode)
    },
    // 切换验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCode, 4)
      this.$refs.verifyCode.focus()
    },
    // 提交表单
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('login', this.LoginData).then(() => {
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.error('登录失败')
          return false
        }
      })
    },
    // 重置表单
    resetForm () {
      this.loading = false
      this.$refs.loginForm.resetFields()
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
    top: 50%;
    left: 50%;
    width: 380px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;

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
      .el-input__icon {
        color: #333;
      }
      .identify {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
