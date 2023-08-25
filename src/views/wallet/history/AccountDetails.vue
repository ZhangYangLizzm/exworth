<script setup>
import { useList } from "@/libs/hooks/useList";
import { getBalanceHistory } from "@/api/wallet";
import { useAccountDetails } from "./enum.js";
import CurrencySelect from "@/components/Select/CurrencySelect.vue";
const filterOptions = reactive({
  createTime: undefined,
  type: undefined,
  direction: undefined,
  currency: undefined,
  affectOrderNo: undefined,
});

// TODO：完善搜索条件逻辑，当搜索值为空时不生效

const { fetch, list, loading, pageID, pageSize, totalCount, onPageChange } =
  useList(getBalanceHistory, filterOptions);

onMounted(() => {
  fetch();
});

const { t } = useI18n();
const { getText, getList } = useAccountDetails();

const columns = computed(() => [
  {
    title: t("CHgqidHNn6_bzPEAQ52Xu"),
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: t("10MvsZXdn3EOSKcFB4Fzf"),
    dataIndex: "type",
    key: "type",
  },
  {
    title: t("Lt2Yb3nacWIDdbk1RYlMf"),
    dataIndex: "affectOrderNo",
    key: "affectOrderNo",
  },
  {
    title: t("Mkm0fkecuM8cnOJaUOCP0"),
    dataIndex: "operateAmount",
    key: "operateAmount",
  },
  {
    title: t("bggAC96HS1OvTEKsh9rg_"),
    dataIndex: "currentBalanceAmount",
    key: "currentBalanceAmount",
  },
]);

</script>

<template>
  <ComponentTitle :text="t('ovLktXuIHMUA7a1STIy3X')" class="mt-4" />

  <a-form class="mb-4" layout="inline">
    <a-form-item>
      <a-range-picker v-model:value="filterOptions.createTime" valueFormat="YYYY-MM-DDTHH:mm:ss.SSS[Z]">
      </a-range-picker>
    </a-form-item>

    <a-form-item class="w-48">
      <a-select v-model:value="filterOptions.type" :placeholder="t('xPOa-lYXJ2QlRzV5wTa0r')">
        <a-select-option :value="key" v-for="[key, value] in getList()">
          <span>{{ value }}</span>
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item class="w-48">
      <a-select v-model:value="filterOptions.direction" :placeholder="t('ef-fXqdN0JZ9J8CkUt2EK')">
        <a-select-option :value="undefined">
          <span>{{ t("T8jku5XFeq-1ZPcuDe_7B") }}</span>
        </a-select-option>
        <a-select-option value="0">
          <span>{{ t("UcXeZv4zwJo26xSvvjT3y") }}</span>
        </a-select-option>
        <a-select-option value="1">
          <span>{{ t("98tLYPO1x3wORFEIzES2N") }}</span>
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item class="w-40">
      <CurrencySelect v-model:currency="filterOptions.currency" />
    </a-form-item>
    <a-form-item class="w-1/6">
      <a-input v-model:value="filterOptions.affectOrderNo" :addon-before="t('Lt2Yb3nacWIDdbk1RYlMf')" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="fetch">
        {{ t("5NZo0upHiGpgDPaM_E9iu") }}
      </a-button>
    </a-form-item>
  </a-form>

  <a-table :dataSource="list" :columns="columns" bordered :loading="loading" :pagination="false">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'type'">
        <span>{{ getText(record.type) }}</span>
      </template>
      <template v-if="column.key === 'operateAmount'">
        <span :class="[record.direction ? ' text-danger' : 'text-primary']">{{ record.direction ? "-" : "+" }}{{
          record.operateAmount }} {{ record.currency }}</span>
      </template>
      <template v-if="column.key === 'currentBalanceAmount'">
        <span>{{ record.currentBalanceAmount }} {{ record.currency }}</span>
      </template>
    </template>
  </a-table>
  <a-pagination hideOnSinglePage class="py-2 float-right" size="small" :current="pageID" :pageSize="pageSize"
    :total="totalCount" show-less-items @change="onPageChange" />
</template>
