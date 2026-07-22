import request from '@/utils/request'

    export interface MachineItem {
        id: number
        name: string
        createdAt: string
        status: string
    }

export const fetchMachines = async (): Promise<MachineItem[]> => {
    return request({
        method: 'GET',
        url: '/api/machines'
    })
}

