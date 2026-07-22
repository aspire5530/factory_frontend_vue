<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeIndex = computed(() => route.path)

const menus = computed(() => {
  const mainRoute = router.options.routes.find(
    route => route.path === '/'
  )

  return mainRoute?.children ?? []
})

const handleSelect = (path: string) => {
  router.push(path)
}

</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item 
        v-for="item in menus"
        :key="item.path"
        :index="`/${item.path}`"
    >
        {{ item.meta?.title }}
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu {
  width: 100%;
}
</style>
