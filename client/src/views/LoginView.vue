<template>
  <div class="login-box">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <h2>Login</h2>
      <el-form-item label="Username:">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Password:" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="submitForm(ruleFormRef)">Login</el-button>
      </el-form-item>
      <el-form-item>
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { LoginData } from '../type/login'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
import { login } from '../request/api'
import jwt_decode from 'jwt-decode'

export default defineComponent({
  setup () {
    const data = reactive(new LoginData())
    const ruleFormRef = ref<FormInstance>() // get the form Instance
    const router = useRouter()

    const validateUsername = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Please input a username'))
      } else {
        callback()
      }
    }

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else {
        if (data.ruleForm.password !== '') {
          if (!ruleFormRef.value) return
          ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
      }
    }

    const rules = reactive({
      username:[{ validator: validateUsername, trigger: 'blur' }],
      password: [{ validator: validatePass, trigger: 'blur' }]
    })

    // submit form method
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then((res) => {
            // console.log(res.data.token)
            localStorage.setItem("token", res.data.token)
            router.push('/home')
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    return { ...toRefs(data), rules, ruleFormRef, submitForm}
  }
})
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg");
  padding: 1px;
  text-align: center;

  .demo-ruleForm {
    width: 350px;
    margin: 180px auto;
    background-color: #fff;
    border-radius: 20px;
    padding: 30px;
  }

  .login-btn {
    width: 100%;
  }

  h2 {
    margin-bottom: 10px;
  }
}

</style>