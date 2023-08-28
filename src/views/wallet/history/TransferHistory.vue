<script setup>
import { getTransferstory } from "@/api/wallet"
import CurrencySelect from "@/components/Select/CurrencySelect.vue";
import { formatRangerPickerTime } from './formatRangerPickerTime'

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
        title: t('68cZ9T56Bq7_rLweZH-Nv'),
        dataIndex: "outOrderId",
        key: "outOrderId",
    },
    {
        title: t('AhZ8ItHb7nCGWMqoQNgDa'),
        dataIndex: "amount",
        key: "amount",
        align: "right"
    },
    {
        title: t('tOfYePGWd06TTHZ9HxG5V'),
        dataIndex: "receiverAccountInfo",
        key: "receiverAccountInfo",
    },
    {
        title: t('2azhTayaBBC1zqWCc8lq5'),
        dataIndex: "status",
        key: "status",
    },
]);

onMounted(() => {
    fetch();
});


</script>

<template>
    <!-- <ComponentTitle :text="t('jjnbgg59C6u1sYpfLLfTt')" class="mt-4" /> -->

    <a-form class="mb-4" layout="inline">
        <a-form-item>
            <a-range-picker :value="filterOptions.createTime" valueFormat="YYYY-MM-DD"
                @change="(value) => filterOptions.createTime = formatRangerPickerTime(value)" />

        </a-form-item>
        <a-form-item class="w-40">
            <CurrencySelect v-model:currency="filterOptions.currency" />
        </a-form-item>
        <a-form-item class="w-1/6">
            <a-input autocomplete="off" v-model:value="filterOptions.withdrawOrderId"
                :addon-before="t('68cZ9T56Bq7_rLweZH-Nv')" />
        </a-form-item>
        <a-form-item>
            <a-button type="primary" @click="fetch" :loading="loading">
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
                <span>{{ record.status === 2 ? t('Success') : t('Applying') }}</span>
            </template>
        </template>
    </a-table>
    <a-pagination hideOnSinglePage class="py-2 float-right" size="small" :current="pageID" :pageSize="pageSize"
        :total="totalCount" show-less-items @change="onPageChange" />
</template>

<style scoped lang="less"></style>