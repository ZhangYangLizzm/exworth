<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { Format } from "@/utils/formatUtil.js";

import { AccountInfo } from "@/stores/types/account";

defineProps<{
  loading: boolean;
  walletAccounts: AccountInfo[];
}>();
</script>

<template>
  <a-list
    :loading="loading"
    item-layout="horizontal"
    :data-source="walletAccounts"
  >
    <template #renderItem="{ item }">
      <a-list-item class="rounded !px-2 !py-0">
        <a-list-item-meta>
          <template #title>
            <p class="text-base">{{ item.currency }}</p>
          </template>
          <template #avatar>
            <SvgIcon :name="`coin-${item?.currency}`" class="w-10 h-10 mt-6" />
          </template>
          <template #description>
            <p class="tracking-wider">{{ Format(item.balanceAmount) }}</p>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
