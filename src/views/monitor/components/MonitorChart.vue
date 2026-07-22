<script setup lang="ts">
import { computed, onMounted } from 'vue'
import VChart from  'vue-echarts'
import MonitorStatsCard from './MonitorStatsCard.vue'
import { useProductionStore } from '../../../stores/production'

const productionStore = useProductionStore()

onMounted(async() => {
    await productionStore.fetchTodayTrend()
})

const option = computed(() => ({
    tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: productionStore.trend.map(item => item.hour)
    }, 
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: productionStore.trend.map(item => item.total),
            type: 'line',
            smooth: true,
            areaStyle: {}
        }
    ]

}))

</script>

<template>
    <MonitorStatsCard 
        :title="'Output'"
        :columns="1"
    >
        <div class="box">
            <v-chart 
                class="chart"
                :option="option"
                autoresize
                height=""
            />
        </div>
    </MonitorStatsCard>
</template>

<style scoped>
.box {
    display: flex;
    align-items: center;
    height: 100%;
}

.chart {
    height: 300px;
}
</style>