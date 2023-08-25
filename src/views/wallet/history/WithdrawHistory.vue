<script setup>
import { getWithdrawHistory } from "@/api/wallet"
import { useOrderStatus } from "./enum"
import CurrencySelect from "@/components/Select/CurrencySelect.vue";

const filterOptions = reactive({
    createTime: undefined,
    type: undefined,
    status: undefined,
    currency: undefined,
    transactionId: undefined,
});

const { t } = useI18n()
const { getOrderStatusLabel, getOrderStatusList } = useOrderStatus()
const { fetch, list, loading, pageID, pageSize, totalCount, onPageChange } =
    useList(getWithdrawHistory, filterOptions);
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
        title: "扣減數量",
        dataIndex: "frozenBalance",
        key: "frozenBalance",
        align: "right"

    },
    {
        title: "手續費",
        dataIndex: "fee",
        key: "fee",
        align: "right"
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
    <ComponentTitle text="提現記錄" class="mt-4" />
    <a-form class="mb-4" layout="inline">
        <a-form-item>
            <a-range-picker v-model:value="filterOptions.createTime" valueFormat="YYYY-MM-DDTHH:mm:ss.SSS[Z]">
            </a-range-picker>
        </a-form-item>
        <a-form-item class="w-48">
            <a-select v-model:value="filterOptions.status" :placeholder="t('KA634HBkYSrLFNgGwVCX8')">
                <a-select-option :value="undefined">
                    <span>{{ t('T8jku5XFeq-1ZPcuDe_7B') }}</span>
                </a-select-option>
                <a-select-option :value="key" v-for="{ key, value } in getOrderStatusList()">
                    <span>{{ value }}</span>
                </a-select-option>
            </a-select>
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
            <template v-if="column.key === 'frozenBalance'">
                <span>{{ record.frozenBalance + " " + record.currency }}</span>
            </template>
            <template v-if="column.key === 'fee'">
                <span>{{ record.fee + " " + record.currency }}</span>
            </template>
            <template v-if="column.key === 'receiverAccountInfo'">
                <span>{{ record.receiverAccountInfo }}</span>
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