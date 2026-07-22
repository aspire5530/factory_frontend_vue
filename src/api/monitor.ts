import request from '@/utils/request'

export interface MonitorResponse {
    totalMachines: number
    runningMachines: number
    alertMachines: number
    output: number
}

export const fetchMonitorStats = async (): Promise<MonitorResponse> => {
    return request({
        method: 'GET',
        url: '/api/monitor/stats'
    })
}

