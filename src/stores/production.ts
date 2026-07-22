import { defineStore } from 'pinia'
import { fetchTodayTrend as fetchTodayTrendApi, fetchProduction as fetchProductionApi, 
    type TodayTrendItem, type ProductionItem, type ProductionResponse, type ProductionQuery } from '@/api/production'

interface ProductionState {
    trend: TodayTrendItem[],
    data: ProductionResponse,
    query: ProductionQuery,
    loadingTrend: boolean,
    loadingData: boolean,
    error: string | null
}

export const useProductionStore = defineStore('production', {
    state: (): ProductionState => ({
        trend: [],
        data: {
            data: [],
            page: 1,
            pageSize: 10,
            total: 0
        },
        query: {
            page: 1,
            pageSize: 10,
        },
        loadingTrend: false,
        loadingData: false,
        error: null
    }),

    actions: {
        async fetchTodayTrend() {
            this.loadingTrend = true
            this.error = null

            try {
                this.trend = await fetchTodayTrendApi()
            } catch (err) {
                this.error = '取得趨勢失敗'
                console.error(err)
            } finally {
                this.loadingTrend = false
            }
        },
        async fetchProduction() {
            this.loadingData = true
            this.error = null

            try {
                this.data = await fetchProductionApi(this.query)
            } catch(error) {
                this.error = '取得產量失敗'
                console.error(error)
            } finally {
                this.loadingData = false
            }
        }
    }
})