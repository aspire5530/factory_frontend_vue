import { defineStore } from 'pinia'
import { fetchMachines as fetchMachinesApi, type MachineItem } from '@/api/machines'

interface MachineState {
    data: MachineItem[],
    loading: boolean,
    error: string
}

export const useMachineStore = defineStore('machine', {
    state: (): MachineState => ({
        data: [],
        loading: false,
        error: ''
    }),
    actions: {
        async fetchMachines() {
            this.loading = true
            this.error = ''

            try {
                this.data = await fetchMachinesApi()

            } catch (error: any) {
                this.error = '設備清單取得失敗'
                console.error(error.message)
            } finally {
                this.loading = false
            }
        }
    }
})