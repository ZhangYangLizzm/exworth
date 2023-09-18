<script setup lang="ts">
import { formatRangerPickerTime } from "@/utils/formatRangerPickerTime";
import CurrencySelect from "@/components/Select/CurrencySelect.vue";
import { useOrderType } from "@/hooks/useOrderType";
import { useAccountStore } from "@/stores/account";
import { useVModel } from "@vueuse/core";

const { FLOW_TYPE_GROUPS } = useOrderType();

const accountStore = useAccountStore();

const props = defineProps({
  options: Object,
  loading: Boolean,
});

const emit = defineEmits(["fetch", "update:options"]);

const filterOptions = useVModel(props, "options", emit);

const onRangeChange = (value: any[]) => {
  filterOptions.value!.createTime = formatRangerPickerTime(value);
};
</script>

<template>
  <div class="px-4 overflow-y-auto">
    <a-form layout="vertical">
      <a-form-item label="選擇日期">
        <a-range-picker
          class="w-full"
          valueFormat="YYYY-MM-DD"
          :value="filterOptions!.createTime"
          @change="onRangeChange"
        />
      </a-form-item>

      <a-form-item label="訂單類型">
        <a-select
          :placeholder="$t('xPOa-lYXJ2QlRzV5wTa0r')"
          :options="FLOW_TYPE_GROUPS"
          v-model:value="filterOptions!.type"
        >
        </a-select>
      </a-form-item>

      <a-form-item label="貨幣類型">
        <CurrencySelect
          :walletAccounts="accountStore.walletAccounts"
          v-model:currency="filterOptions!.currency"
        />
      </a-form-item>
      <a-form-item label="訂單號">
        <a-input
          autocomplete="off"
          placeholder="請輸入訂單號"
          v-model:value="filterOptions!.affectOrderNo"
        />
      </a-form-item>
      <a-form-item class="text-center">
        <a-button
          type="primary"
          @click="emit('fetch')"
          :loading="loading"
          class="w-40 h-8"
        >
          {{ $t("5NZo0upHiGpgDPaM_E9iu") }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
