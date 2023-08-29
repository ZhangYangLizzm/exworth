<script setup>
import SvgIcon from "@/libs/components/svgIcon";
import { Format } from "@/libs/hooks/useUtil.js";

const props = defineProps({
  loading: Boolean,
  walletAccounts: Array,
});

const emits = defineEmits("click");
const onClick = (currency, type) => {
  emits("click", { currency, type });
};
</script>

<template>
  <a-list :loading="props.loading" item-layout="horizontal" :data-source="props.walletAccounts">
    <template #renderItem="{ item }">
      <a-list-item class="rounded px-2 shadow mb-2">
        <a-list-item-meta>
          <template #title>
            <p>{{ item.currency }}</p>
          </template>
          <template #avatar>
            <SvgIcon :name="`coin-${item?.currency}`" class="w-8 h-8" />
          </template>
          <template #description>
            <p>{{ Format(item.balanceAmount) }}</p>
          </template>
        </a-list-item-meta>

        <template #actions>
          <a-button @click="onClick(item?.currency, 'topup')" type="link">
            {{ $t("p85LUkdtTlZNxvwxEVGX8") }}
          </a-button>
          <a-button type="link" @click="onClick(item?.currency, 'withdraw')">
            {{ $t("mtzd-o04L2UDLaN81GSRl") }}
          </a-button>
          <a-button type="link" @click="onClick(item?.currency, 'transfer')">
            {{ $t("_iMQNMQatEhTi4yWkEjxs") }}
          </a-button>
        </template>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped lang="less"></style>
