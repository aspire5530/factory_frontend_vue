<script setup lang="ts">
import { computed, onMounted } from 'vue'
import MonitorStatsCard from './MonitorStatsCard.vue'
import { useProductionStore } from '@/stores/production'

const productionStore = useProductionStore()

onMounted(async () => {
    await productionStore.fetchTodayTrend()
})

const now = new Date()
const currentHour = now.getHours()
const stats = computed(() => productionStore.trend) 
const validOutputs = computed(() => stats.value
    .filter(item => {
        const hour = Number(item.hour.split(':')[0])
        return hour <= currentHour
    })
)
const values = computed(() => validOutputs.value.map(item => item.total)) 


// 平均
const mean = computed(() => {
    if (values.value.length <= 0) return 0
    return (
        values.value.reduce((sum, value) => sum + value, 0)
        / values.value.length
    )
})

// 標準差
const standardDeviation = computed(() => {
    if (values.value.length <= 0) return 0
    return Math.sqrt(
        values.value.reduce(
            (sum, value) =>
                sum + Math.pow(value - mean.value, 2),
            0
        ) / values.value.length
    )
})

// 最大值
const maximum = computed(() => {
    if (values.value.length <= 0) return 0
    return Math.max(...values.value)
})

// 最小值
const minimum = computed(() => {
    if (values.value.length <= 0) return 0
    return Math.min(...values.value)
})

</script>

<template>
    <MonitorStatsCard
        :title="'Statistics'"
        :columns="2"
        :loading="productionStore.loadingTrend"
        :skeleton="4"
    >
        <el-statistic title="平均數" :value="mean" />
        <el-statistic title="標準差" :value="standardDeviation" />
        <el-statistic title="最大值" :value="maximum" />
        <el-statistic title="最小值" :value="minimum" />
    </MonitorStatsCard>
</template>