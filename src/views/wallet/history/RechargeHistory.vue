<script setup>
import { getDepositHistory } from "@/api/wallet"
import CurrencySelect from "@/components/Select/CurrencySelect.vue";

const filterOptions = reactive({
    createTime: undefined,
    chain: undefined,
    currency: undefined,
    transactionHash: undefined,
});

const { t } = useI18n()
const { fetch, list, loading, pageID, pageSize, totalCount, onPageChange } =
    useList(getDepositHistory, filterOptions);
const columns = computed(() => [
    {
        title: t('4Jogg03YNl3gG3ZgAQlml'),
        dataIndex: "transactionId",
        key: "transactionId",
    },
    {
        title: t("CHgqidHNn6_bzPEAQ52Xu"),
        dataIndex: "createTime",
        key: "createTime",
    },
    {
        title: t('yy1yXH9_kRAEgge-neEtR'),
        dataIndex: "amount",
        key: "amount",
    },
    {
        title: t('f4ngMoxswjtXR3cxuoIuO'),
        dataIndex: "chain",
        key: "chain",
    }, {
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
    <ComponentTitle :text="t('sS7varQIq515z7YNPBvaA')" class="mt-4" />

    <a-form class="mb-4" layout="inline">
        <a-form-item>
            <a-range-picker v-model:value="filterOptions.createTime" valueFormat="YYYY-MM-DDTHH:mm:ss.SSS[Z]">
            </a-range-picker>
        </a-form-item>


        <a-form-item class="w-48">
            <a-select v-model:value="filterOptions.chain" :placeholder="t('5T9IqkrF8DTnOiDZlrrIl')">
                <a-select-option :value="undefined">
                    <span>{{ t("T8jku5XFeq-1ZPcuDe_7B") }}</span>
                </a-select-option>
                <a-select-option value="ERC20">
                </a-select-option>
                <a-select-option value="TRC20">
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item class="w-40">
            <CurrencySelect v-model:currency="filterOptions.currency" />
        </a-form-item>
        <a-form-item class="w-1/6">
            <a-input v-model:value="filterOptions.transactionHash" :addon-before="t('4Jogg03YNl3gG3ZgAQlml')" />
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
            <template v-if="column.key === 'status'">
                <span>{{ status === '1' ? t('MZ7wxk5bd6rZILy4eQ2UK') : t('Applying') }}</span>
            </template>
        </template>
    </a-table>
    <a-pagination hideOnSinglePage class="py-2 float-right" size="small" :current="pageID" :pageSize="pageSize"
        :total="totalCount" show-less-items @change="onPageChange" />
</template>

<style scoped lang="less"></style>