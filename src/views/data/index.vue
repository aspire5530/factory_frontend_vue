<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductionStore } from '@/stores/production'
import { useMachineStore } from '@/stores/machine'

const productionStore = useProductionStore()
const machineStore = useMachineStore()

const dateRange = ref<[string, string] | []>([])

const formatDate = (date: string) => {
    return new Date(date).toLocaleString()
}

const handleSearch = () => {
    productionStore.query.page = 1
    if (dateRange.value.length === 2) {
        productionStore.query.startDate = dateRange.value[0]
        productionStore.query.endDate = dateRange.value[1]
    } else {
        productionStore.query.startDate = undefined
        productionStore.query.endDate = undefined
    }

    productionStore.fetchProduction()
}

const handlePageSizeChange = () => {
    productionStore.query.page = 1
    productionStore.fetchProduction()
}

onMounted(() => {
    productionStore.fetchProduction()
    machineStore.fetchMachines()
})

</script>

<template>
    <h1>Report</h1>
    <el-form inline>
        <!-- <el-form-item label="Date">
            <el-date-picker 
                v-model="dateRange"
                type="daterange"
                value-format="YYYY-MM-DD"
                start-placeholder="Start"
                end-placeholder="End"
            /> 
        </el-form-item> -->
        <el-form-item label="Machine">
            <el-select 
                class="monitor-select"
                v-model="productionStore.query.machineId"
                clearable
                placeholder="All"
                :loading="machineStore.loading"
            >
                <el-option 
                    v-for="machine in machineStore.data"
                    :key="machine.id"
                    :label="machine.name"
                    :value="machine.id"
                >
                    {{ machine.name }}
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button class="search-button" @click="handleSearch">
                Search
            </el-button>
        </el-form-item>
    </el-form>

    <el-table
        :data="productionStore.data.data"
        v-loading="productionStore.loadingData"
    >
        <el-table-column fixed prop="id" label="ID" sortable />
        <el-table-column prop="machineId" label="Machine" sortable />
        <el-table-column label="Output">
            <el-table-column prop="total" label="Total" sortable />
            <el-table-column prop="good" label="Good" sortable />
            <el-table-column prop="defect" label="Defect" sortable />
        </el-table-column>
        <el-table-column prop="createdAt" label="CreatedAt" sortable>
            <template #default="{ row }">
                {{  formatDate(row.createdAt) }}
            </template>
        </el-table-column>
    </el-table>
    <el-pagination 
        class="data-pagination"
        v-model:current-page="productionStore.query.page"
        v-model:page-size="productionStore.query.pageSize"
        :page-sizes="[10, 50, 100]"
        layout="prev, pager, next"
        :total="productionStore.data.total"
        @current-change="productionStore.fetchProduction"
        @size-change="handlePageSizeChange"
    />
</template>

<style scoped>
:deep(.el-date-editor) {
    border-radius: 999px;
}

:deep(.monitor-select .el-select__wrapper) {
    min-width: 140px;
    border-radius: 999px;
    background: #fff;

}

.search-button {
    border-radius: 999px;
}

.data-pagination {
    margin-top: 24px;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>