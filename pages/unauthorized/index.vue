<script setup>
import { Warning } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <el-card class="max-w-md w-full text-center p-6 shadow-lg rounded-lg">
      <el-icon size="50" class="text-red-500 mb-3">
        <el-icon size="50" class="text-red-500">
          <Warning />
        </el-icon>
      </el-icon>
      <h1 class="text-2xl font-bold text-red-600">Unauthorized Access</h1>
      <p class="text-gray-600 mt-2">
        You do not have permission to access this page.
      </p>
      <el-button type="primary" class="mt-4 w-full" @click="goBack">
        Go Back
      </el-button>
    </el-card>
  </div>
</template>

<style scoped>
.el-card {
  background-color: white;
}
</style>
