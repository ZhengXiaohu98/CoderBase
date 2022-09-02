<template>
  <div class="register-box">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
      <h2>Register</h2>
      <el-form-item label="Username:" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Password:" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Confirm:" prop="rePassword">
        <el-input v-model="ruleForm.rePassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Email:">
        <el-input v-model="ruleForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="reg-btn" @click="submitForm(ruleFormRef)">Register</el-button>
        <el-button class="reg-btn" @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { RegisterData } from '../type/register'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { register } from '../request/api'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const data = reactive(new RegisterData())
    const ruleFormRef = ref<FormInstance>()
    const router = useRouter()

    // reset form method
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    const validateUsername = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Please input a username'))
      } else if (value.length < 4) {
        callback(new Error('The length needs to be greater than 4!'))
      } else {
        callback()
      }
    }

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else if (value.length < 4) {
        callback(new Error('The length needs to be greater than 4!'))
      } else {
        if (data.ruleForm.password !== '') {
          if (!ruleFormRef.value) return
          ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
      }
    }
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('Please re-enter password again'))
      } else if (value !== data.ruleForm.password) {
        callback(new Error("Two inputs don't match!"))
      } else {
        callback()
      }
    }

    const rules = reactive({
      password: [{ validator: validatePass, trigger: 'blur' }],
      rePassword: [{ validator: validatePass2, trigger: 'blur' }],
      username:[{ validator: validateUsername, trigger: 'blur' }]
    })

    // submit form method
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          register(data.ruleForm).then((res) => {
            ElMessage({
              message: 'Succesfully registered!',
              type: 'success',
            })
            console.log(res)
            router.push('/login')
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    return { ...toRefs(data), resetForm, rules, ruleFormRef, submitForm }
  }
})
</script>

<style lang="scss" scoped>
.register-box {
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
    width: 47%;
  }

  h2 {
    margin-bottom: 10px;
  }
}
</style>