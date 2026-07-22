<script setup lang="ts">
import TabNav from './components/TopNav.vue'

</script>

<template>
    <div class="layout">
      <header class="header">
        <TabNav />
        <h1>
          後台管理系統
        </h1>
      </header>
  
      <main class="content">
        <router-view />
      </main>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
}

.header {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    background: #fff;
    z-index: 1000;
}

.content {
  padding: 20px;
}
</style>