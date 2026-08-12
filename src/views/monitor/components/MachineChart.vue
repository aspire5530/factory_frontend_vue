<script setup lang="ts">
import { computed } from 'vue'
import VChart from  'vue-echarts'
import MonitorStatsCard from './MonitorStatsCard.vue'
import type { MonitorStats } from '@/types/device'

const props = defineProps<{
    stats: MonitorStats
    loading: boolean
}>()

const option = computed(() => ({
    legend: {
        bottom: '0%',
        left: 'center'
    },
    series:[
        {
            type:'pie',
            radius:['40%', '70%'],
            itemStyle: {
                borderRadius: 10
            },
            data:[
                {
                    value: props.stats.running,
                    name:'Running'
                },
                {
                    value: props.stats.alert,
                    name:'Alert'
                }
            ]
        }
    ]
}))
</script>

<template>
    <MonitorStatsCard 
        :title="'Ratio'"
        :columns="2"
        :loading="loading"
    >
        <v-chart
            :option="option"
        />
    </MonitorStatsCard>
</template>