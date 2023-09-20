<script setup lang="ts">
import { AccountInfo } from '@/stores/types/account';

defineProps<{
  currency: string;
  disabled?: boolean;
  walletAccounts: AccountInfo[];
}>();

const emit = defineEmits(["update:currency", "selectChange"]);

const handleChange = (value: string) => {
  emit("update:currency", value);
  emit("selectChange", value);
};
</script>

<template>
  <a-select
    :value="currency"
    @change="(value) => handleChange(value as string)"
    :placeholder="$t('AsHuYNM5Ic6nO-wMh23Fi')"
    :disabled="disabled"
  >
    <a-select-option v-for="asset in walletAccounts" :key="asset.currency">
      <div class="flex items-center">
        <SvgIcon class="w-4 h-4 mr-2" :name="`coin-${asset.currency}`" />
        <span>{{ asset.currency }}</span>
      </div>
    </a-select-option>
  </a-select>
</template>
