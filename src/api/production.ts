import request from '@/utils/request'

export interface TodayTrendItem {
    hour: string
    total: number
}

export const fetchTodayTrend = async (): Promise<TodayTrendItem[]> => {
    return request({
        method: 'GET',
        url: '/api/production/trend'
    })
}

export interface ProductionQuery {
    page: number
    pageSize: 10 | 50 | 100
    startDate?: string
    endDate?: string
    machineId?: number
}

export interface ProductionItem {
    id: number
    machineId: number
    total: number
    good: number
    defect: number
    createdAt: string
}

export interface ProductionResponse {
    data: ProductionItem[],
    total: number,
    page: number,
    pageSize: number
}

export const fetchProduction = async (
    params: ProductionQuery
): Promise<ProductionResponse> => {
    return request({
        method: 'GET',
        url: '/api/production/data',
        params
    })
}
