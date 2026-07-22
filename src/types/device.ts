export interface MonitorStats {
    machines: number
    running: number
    alert: number
    output: number
}

export interface Output {
    machineId: number
    value: number
    good: number
    defect: number
    date: string
}