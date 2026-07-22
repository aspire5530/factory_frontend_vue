import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VChart from 'vue-echarts'

import { use } from 'echarts/core'

import {
    GridComponent,
    TooltipComponent,
    LegendComponent
  } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart } from 'echarts/charts'
import './styles/main.css'

use([
    CanvasRenderer,
    LineChart,
    PieChart,
    GridComponent,
    TooltipComponent,
    LegendComponent
])
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.component('VChart', VChart)

app.mount('#app')
