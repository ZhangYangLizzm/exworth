<script setup>
import { useList } from "@/libs/hooks/useList";
import { getBalanceHistory } from "@/api/wallet";
import { useFlowType } from "@/utils/useFlowType.js";
import CurrencySelect from "@/components/Select/CurrencySelect.vue";
import { formatRangerPickerTime } from "@/utils/formatRangerPickerTime";
import { useAccountStore } from "@/stores/modules/accounts.js";
import { getDirectionClass } from "@/utils/styles";
const accountStore = useAccountStore();
const filterOptions = reactive({
  createTime: undefined,
  type: undefined,
  direction: undefined,
  currency: undefined,
  affectOrderNo: undefined,
});

const { fetch, list, loading, pageID, pageSize, totalCount, onPageChange } =
  useList(getBalanceHistory, filterOptions);

onMounted(() => {
  fetch();
});

const { t } = useI18n();
const { FlowTypeLable,  FLOW_TYPE_GROUPS } = useFlowType();

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
    align: "right",
  },
]);
</script>

<template>
  <a-form class="mb-4" layout="inline">
    <a-form-item>
      <a-range-picker
        :value="filterOptions.createTime"
        valueFormat="YYYY-MM-DD"
        @change="
          (value) => (filterOptions.createTime = formatRangerPickerTime(value))
        "
      />
    </a-form-item>

    <a-form-item class="w-48">
      <a-select
        v-model:value="filterOptions.type"
        :placeholder="$t('xPOa-lYXJ2QlRzV5wTa0r')"
        :options="FLOW_TYPE_GROUPS"
      >
      </a-select>
    </a-form-item>
    <a-form-item class="w-48">
      <a-select
        v-model:value="filterOptions.direction"
        :placeholder="$t('ef-fXqdN0JZ9J8CkUt2EK')"
      >
        <a-select-option :value="undefined">
          <span>{{ $t("T8jku5XFeq-1ZPcuDe_7B") }}</span>
        </a-select-option>
        <a-select-option value="0">
          <span>{{ $t("UcXeZv4zwJo26xSvvjT3y") }}</span>
        </a-select-option>
        <a-select-option value="1">
          <span>{{ $t("98tLYPO1x3wORFEIzES2N") }}</span>
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item class="w-40">
      <CurrencySelect
        :walletAccounts="accountStore.walletAccounts"
        v-model:currency="filterOptions.currency"
      />
    </a-form-item>
    <a-form-item class="w-1/6">
      <a-input
        autocomplete="off"
        v-model:value="filterOptions.affectOrderNo"
        :addon-before="$t('Lt2Yb3nacWIDdbk1RYlMf')"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="fetch" :loading="loading">
        {{ $t("5NZo0upHiGpgDPaM_E9iu") }}
      </a-button>
    </a-form-item>
  </a-form>

  <a-table
    :dataSource="list"
    :columns="columns"
    bordered
    :loading="loading"
    :pagination="false"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'type'">
        <span>{{ FlowTypeLable(record.type) }}</span>
      </template>
      <template v-if="column.key === 'operateAmount'">
        <span :class="[getDirectionClass(record.direction)]"
          >{{ record.operateAmount }} {{ record.currency }}</span
        >
      </template>
      <template v-if="column.key === 'currentBalanceAmount'">
        <span>{{ record.currentBalanceAmount }} {{ record.currency }}</span>
      </template>
    </template>
  </a-table>
  
  <a-pagination
    hideOnSinglePage
    class="py-2 float-right"
    size="small"
    :current="pageID"
    :pageSize="pageSize"
    :total="totalCount"
    show-less-items
    @change="onPageChange"
  />
</template>
