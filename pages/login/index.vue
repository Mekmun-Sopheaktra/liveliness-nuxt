<script setup>
import { useAuthStore } from '~/store/auth.js'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: 'auth',
  middleware: ['redirect-if-authenticated']
})

const authStore = useAuthStore()
const { login } = authStore

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await login({ email: email.value, password: password.value })
    navigateTo('/home')
  } catch (error) {
    console.error('Login failed:', error)
    ElMessage.error(error.message || 'Login failed')
  }
}
</script>

<template>
  <div class="relative w-full h-screen bg-home flex items-center justify-center">
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <div class="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg animate-slide-up z-10">
      <h1 class="text-3xl font-bold text-center mb-4">Welcome Back</h1>
      <p class="text-center text-gray-500 mb-6">Login to your account</p>

      <el-form @submit.prevent="handleLogin" label-position="top" class="space-y-4">
        <el-form-item label="Email" class="w-full">
          <el-input v-model="email" type="email" placeholder="Enter your email" clearable class="w-full" />
        </el-form-item>

        <el-form-item label="Password" class="w-full">
          <el-input v-model="password" type="password" placeholder="Enter your password" show-password class="w-full" />
        </el-form-item>

        <div class="flex justify-between items-center mt-1">
          <el-button type="primary" class="w-full h-10 rounded-lg" native-type="submit">Login</el-button>
        </div>
        <div class="flex justify-between items-center mt-1">
          <el-button type="danger" class="w-full h-10 rounded-lg">Login with Google</el-button>
        </div>
      </el-form>

      <p class="mt-4 text-center text-gray-600">
        Don't have an account?
        <a href="#" class="text-blue-500 font-semibold hover:underline">Sign up!</a>
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-in-out;
}

.bg-home {
  background: url('@/assets/image/home.png') no-repeat center center;
  background-size: cover;
}
</style>
