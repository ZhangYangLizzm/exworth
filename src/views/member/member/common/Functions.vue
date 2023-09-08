<script setup>
import { useAppStore } from "@/libs/stores/modules/app";
const appStore = useAppStore();
defineProps({
  functions: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div
    class="flex items-center gap-x-4"
    :class="[!appStore.isMobile ? 'justify-center' : '']"
  >
    <span :class="[functions?.transfer ? 'text-black' : 'text-gray-400']">
      <swap-outlined />

      {{ $t("pGrhTXj8A84ieJpHf6k3L") }}</span
    >
    <span :class="[functions?.ppc ? 'text-black' : 'text-gray-400']">
      <credit-card-filled />

      {{ $t("OnPSpwMATKuG2io4jQP3a") }}
    </span>

    <span :class="[functions.vcc ? 'text-black' : 'text-gray-400']">
      <credit-card-outlined />
      {{ $t("S2OrYOKW-4S0okv_ixAu-") }}
    </span>
  </div>
</template>

<style scoped lang="less"></style>
