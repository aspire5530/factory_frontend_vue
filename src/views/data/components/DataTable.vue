<script setup lang="ts">
import { type ProductionItem } from '@/api/production'

const props = defineProps<{
    data: ProductionItem[]
    loading: Boolean

}>()

const formatDate = (date: string) => {
    return new Date(date).toLocaleString()
}
</script>

<template>
    <div class="production-table">
        <el-table
            :data="data"
            v-loading="loading"
        >
            <el-table-column fixed prop="id" label="ID" sortable />
            <el-table-column prop="machineId" label="Machine" sortable />
            <el-table-column label="Output">
                <el-table-column prop="total" label="Total" sortable />
                <el-table-column prop="good" label="Good" sortable />
                <el-table-column prop="defect" label="Defect" sortable />
            </el-table-column>
            <el-table-column prop="createdAt" label="Time" sortable>
                <template #default="{ row }">
                    {{  formatDate(row.createdAt) }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style>
.production-table .el-table {
    border-radius: 20px;
}

.production-table .el-table thead.is-group th.el-table__cell {
    border-color: transparent;
    color: #ffffff;
    background-color: #0e0038;
}

</style>