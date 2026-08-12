<script setup lang="ts">
import MonitorStatsCard from './MonitorStatsCard.vue'
import type { MonitorStats } from '@/types/device'

defineProps<{
    stats: MonitorStats
    loading: boolean
}>()
</script>

<template>
    <div class="monitor">
        <el-row :gutter="20">
            <MonitorStatsCard 
                :title="'Machines'"
                :value="stats.machines"
                :columns="4"
                :loading="loading"
                />
                <MonitorStatsCard 
                :title="'Running'"
                :value="stats.running"
                :columns="4"
                :loading="loading"
                />
                <MonitorStatsCard 
                :title="'Alert'"
                :value="stats.alert"
                :columns="4"
                :loading="loading"
                />
                <MonitorStatsCard 
                :title="'Output'"
                :value="stats.output"
                :columns="4"
                :loading="loading"
            />
        </el-row>
    </div>
</template>