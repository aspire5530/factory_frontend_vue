<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const title = computed(() => {
  return route.meta.title || ''
})
</script>

<template>
    <el-page-header>
    <template #content>
      <span class="text-large font-600 mr-3">{{ title }}</span>
    </template>
  </el-page-header>
</template>
<!-- 
<aside class="sidebar">
    <el-menu
        router
        :default-active="$route.path"    
    >
        <el-menu-item index="/dashboard">
            Dashboard
        </el-menu-item>
        <el-menu-item index="/report">
            Report
        </el-menu-item>
        <el-menu-item index="/assistant">
            Assistant
        </el-menu-item>
    </el-menu>
</aside> -->