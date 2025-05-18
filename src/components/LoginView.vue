<template>
  <div class="flex items-center justify-center min-h-screen">
    <n-form
      v-if="!localToken"
      class="w-1/2"
      ref="loginRef"
      :label-width="80"
      :model="loginForm"
      :rules="rules"
    >
      <n-form-item label="用户" path="loginUser">
        <n-input v-model:value="loginForm.loginUser" placeholder="输入用户" />
      </n-form-item>
      <n-form-item label="密码" path="loginPass">
        <n-input type="password" v-model:value="loginForm.loginPass" placeholder="输入密码" />
      </n-form-item>
      <n-form-item class="flex! justify-center">
        <n-button @click="handleValidateClick">登录</n-button>
      </n-form-item>
    </n-form>
    <span v-else>{{ localToken }}</span>
  </div>
  <pre>
  {{ JSON.stringify(loginForm, null, 2) }}
</pre
  >
</template>

<script setup lang="ts">
import { FormInst, useMessage } from 'naive-ui'
import { ref, toRaw, unref } from 'vue'

const loginRef = ref<FormInst | null>(null)
const message = useMessage()
const localToken = ref('')

const rules = ref({
  loginUser: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  loginPass: {
    required: true,
    message: '请输入密码',
    trigger: ['blur']
  }
})

const loginForm = ref({
  loginUser: '',
  loginPass: ''
})

const handleValidateClick = async (e: MouseEvent) => {
  console.log('click')
  e.preventDefault()
  try {
    await loginRef.value?.validate()

    const url = `https://www.yuce2.com/api/user/login`
    console.log(unref(loginForm))
    const formData = unref(loginForm)
    const params = new URLSearchParams(Object.entries(formData) as string[][])

    const userResp = await fetch(url, {
      method: 'post',
      body: params,
      headers: {
        ContentType: 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    })
    if (userResp.ok) {
      const data = await userResp.json()
      console.log('data', data)
      if (data.success) {
        // todo save token
        const token = data.data
        localToken.value = token
        console.log('token', token)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
