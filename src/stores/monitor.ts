import { defineStore } from 'pinia'
import type { MonitorStats } from '@/types/device'
import { fetchMonitorStats, type MonitorResponse } from '@/api/monitor'

interface MonitorState {
    stats: MonitorStats
    outputs: number | null
    loading: boolean
    error: string
}

export const useMonitorStore = defineStore('monitor', {
    state: (): MonitorState => ({
        stats: {
            machines: 0,
            running: 0,
            alert: 0,
            output: 0,
        },
        outputs: null,
        loading: false,
        error: '',
    }),
    actions: {
        async fetchMonitorStats() {
            this.loading = true
            this.error = '' 

            try {
                const res = await fetchMonitorStats() as MonitorResponse

                this.stats = {
                    machines: res.totalMachines,
                    running: res.runningMachines,
                    alert: res.alertMachines,
                    output: 0 // 之後接  
                }
                console.log('stats',this.stats)
            } catch (error: any) {
                this.error = error.message ?? 'Unknown Error'
                console.error(error)
            } finally {
                this.loading = false
            }
        }
    } 

    }
)