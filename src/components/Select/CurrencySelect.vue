<script setup>
// 货币选择
import SvgIcon from "@/libs/components/svgIcon";
import { useAccountStore } from "@/stores/modules/accounts.js";

const { currency, disabled } = defineProps({
  currency: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:currency", "selectChange"]);

const accountStore = useAccountStore();

const handleChange = (value) => {
  emit("update:currency", value);
  emit("selectChange", value);
};
</script>

<template>
  <a-select
    :value="currency"
    @change="handleChange"
    :placeholder="$t('AsHuYNM5Ic6nO-wMh23Fi')"
    :disabled="disabled"
  >
    <a-select-option
      v-for="asset in accountStore.walletAccounts"
      :key="asset.currency"
    >
      <div class="flex items-center">
        <SvgIcon class="w-4 h-4 mr-2" :name="`coin-${asset.currency}`" />
        <span>{{ asset.currency }}</span>
      </div>
    </a-select-option>
  </a-select>
</template>
