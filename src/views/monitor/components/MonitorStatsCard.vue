<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  value?: string | number
  unit?: string

  // 單行數量
  columns?: 1 | 2 | 3 | 4

  height?: number
}>()

const lgSpan = computed(() => {
  return 24 / (props.columns ?? 4)
})

const smSpan = computed(() => {
  return 24 / (props.columns ?? 2)
})

const cardHeight = computed(() => {
  return props.height ? `${props.height}px` : undefined
})
</script>

<template>
    <el-col
        :xs="24"
        :sm="smSpan"
        :lg="lgSpan"
        class="card-col"
    >
        <el-card
            class="card"
            shadow="hover"
            body-class="stat-card-body"
            :style="{ height: cardHeight }"
            >
            <template #header>
                <div class="stat-card__title">
                {{ title }}
                </div>
            </template>
            <slot />
            <div class="stat-card__value">
                {{ value }}
                <span v-if="unit">
                    {{ unit }}
                </span>
            </div>
        </el-card>
    </el-col>
</template>

<style scoped>
.card-col {
    margin-bottom: 20px;
}

.stat-card__value{
    font-size: 2em;
}
</style>