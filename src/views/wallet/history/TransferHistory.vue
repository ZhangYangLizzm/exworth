<script setup>
import { getTransferstory } from "@/api/wallet"
import CurrencySelect from "@/components/Select/CurrencySelect.vue";

const filterOptions = reactive({
    createTime: undefined,
    withdrawOrderId: undefined,
    currency: undefined,
});

const { t } = useI18n()
const { fetch, list, loading, pageID, pageSize, totalCount, onPageChange } =
    useList(getTransferstory, filterOptions);
const columns = computed(() => [
    {
        title: t("CHgqidHNn6_bzPEAQ52Xu"),
        dataIndex: "createTime",
        key: "createTime",
    },
    {
        title: "記錄編號",
        dataIndex: "outOrderId",
        key: "outOrderId",
    },
    {
        title: "實際到帳",
        dataIndex: "amount",
        key: "amount",
        align: "right"

    },
    {
        title: "轉帳對象",
        dataIndex: "receiverAccountInfo",
        key: "receiverAccountInfo",

    },

    {
        title: "狀態",
        dataIndex: "status",
        key: "status",
    },
]);

onMounted(() => {
    fetch();
});
</script>

<template>
    <ComponentTitle text="轉帳記錄" class="mt-4" />

    <a-form class="mb-4" layout="inline">
        <a-form-item>
            <a-range-picker v-model:value="filterOptions.createTime" valueFormat="YYYY-MM-DDTHH:mm:ss.SSS[Z]">
            </a-range-picker>
        </a-form-item>
        <a-form-item class="w-40">
            <CurrencySelect v-model:currency="filterOptions.currency" />
        </a-form-item>
        <a-form-item class="w-1/6">
            <a-input v-model:value="filterOptions.withdrawOrderId" :addon-before="t('68cZ9T56Bq7_rLweZH-Nv')" />
        </a-form-item>
        <a-form-item>
            <a-button type="primary" @click="fetch">
                {{ t("5NZo0upHiGpgDPaM_E9iu") }}
            </a-button>
        </a-form-item>
    </a-form>
    <a-table :dataSource="list" :columns="columns" bordered :loading="loading" :pagination="false">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'amount'">
                <span>{{ record.amount + " " + record.currency }}</span>
            </template>
            <template v-if="column.key === 'receiverAccountInfo'">
                <div class="flex flex-col">
                    <div>PROUID: {{ JSON.parse(record.receiverAccountInfo).uuid }} </div>
                    <div>Email: {{ JSON.parse(record.receiverAccountInfo).email }}</div>
                </div>
            </template>
            <template v-if="column.key === 'status'">
                <span>{{ status === '1' ? "已完成" : "申請中" }}</span>
            </template>
        </template>
    </a-table>
    <a-pagination hideOnSinglePage class="py-2 float-right" size="small" :current="pageID" :pageSize="pageSize"
        :total="totalCount" show-less-items @change="onPageChange" />
</template>

<style scoped lang="less"></style>