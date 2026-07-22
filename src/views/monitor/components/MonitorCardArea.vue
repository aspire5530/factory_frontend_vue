<script setup lang="ts">
import MonitorStatsCard from './MonitorStatsCard.vue'
import type { MonitorStats } from '@/types/device'

defineProps<{
    stats: MonitorStats
}>()
</script>

<template>
    <div class="monitor">
        <el-row :gutter="20">
            <MonitorStatsCard 
                :title="'Machines'"
                :value="stats.machines"
                :columns="4"
            />
            <MonitorStatsCard 
                :title="'Running'"
                :value="stats.running"
                :columns="4"
            />
            <MonitorStatsCard 
                :title="'Alert'"
                :value="stats.alert"
                :columns="4"
            />
            <MonitorStatsCard 
                :title="'Output'"
                :value="stats.output"
                :columns="4"
            />
        </el-row>
    </div>
</template>