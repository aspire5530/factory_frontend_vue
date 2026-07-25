<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductionStore } from '@/stores/production'
import { useMachineStore } from '@/stores/machine'
import DataTable from './components/DataTable.vue'

const productionStore = useProductionStore()
const machineStore = useMachineStore()

const dateRange = ref<[string, string] | []>([])

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
        <el-form-item label="Date">
            <el-date-picker 
                v-model="dateRange"
                type="daterange"
                value-format="YYYY-MM-DD"
                start-placeholder="Start"
                end-placeholder="End"
            /> 
        </el-form-item>
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
            <el-button class="search-button" @click="handleSearch" type="success">
                Search
            </el-button>
        </el-form-item>
    </el-form>
    <div class="production-table">
        <data-table 
            :data="productionStore.data.data"
            :loading="productionStore.loadingData"
        />
    </div>
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
    background: #fbf9e5;
}

:deep(.el-date-editor:hover) {
    background-color: #ffffff;
    border: 1px dotted #957070;
}

:deep(.monitor-select .el-select__wrapper) {
    min-width: 140px;
    border-radius: 999px;
    background: #e9efff;
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