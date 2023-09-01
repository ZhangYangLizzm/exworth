<script setup>
import SvgIcon from "@/libs/components/svgIcon";
import { Format } from "@/libs/hooks/useUtil.js";

defineProps({
  loading: Boolean,
  walletAccounts: Array,
});

const emit = defineEmits("click");
const onClick = (currency, type) => {
  emit("click", { currency, type });
};
</script>

<template>
  <a-list
    :loading="loading"
    item-layout="horizontal"
    :data-source="walletAccounts"
  >
    <template #renderItem="{ item }">
      <a-list-item class="rounded px-4 shadow mb-2">
        <a-list-item-meta>
          <template #title>
            <p>{{ item.currency }}</p>
          </template>
          <template #avatar>
            <SvgIcon :name="`coin-${item?.currency}`" class="w-10 h-10" />
          </template>
          <template #description>
            <p>{{ Format(item.balanceAmount) }}</p>
          </template>
        </a-list-item-meta>

        <template #actions>
          <div class="flex flex-col">
            <a-button
              @click="onClick(item?.currency, 'topup')"
              type="link"
              class="text-left"
            >
              {{ $t("p85LUkdtTlZNxvwxEVGX8") }}
            </a-button>
            <a-button
              type="link"
              @click="onClick(item?.currency, 'withdraw')"
              class="text-left"
            >
              {{ $t("mtzd-o04L2UDLaN81GSRl") }}
            </a-button>
            <a-button
              type="link"
              @click="onClick(item?.currency, 'transfer')"
              class="text-left"
            >
              {{ $t("_iMQNMQatEhTi4yWkEjxs") }}
            </a-button>
          </div>
        </template>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped lang="less"></style>
